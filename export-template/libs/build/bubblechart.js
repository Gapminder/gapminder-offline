// https://github.com/vizabi/bubblechart#readme v3.11.1 build 1625689243109 Copyright 2021 Gapminder Foundation and contributors
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('VizabiSharedComponents'), require('mobx')) :
  typeof define === 'function' && define.amd ? define(['VizabiSharedComponents', 'mobx'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BubbleChart = factory(global.VizabiSharedComponents, global.mobx));
}(this, (function (VizabiSharedComponents, mobx) { 'use strict';

  class PanZoom {

    constructor(context) {
      this.context = context;

      this.dragRectangle = d3.drag();
      this.zoomer = d3.zoom();

      // this.dragLock = false;

      this.dragRectangle
        .subject(this.dragSubject())
        .on("start", this.drag().start)
        .on("drag", this.drag().go)
        .on("end", this.drag().stop);

      this.zoomer
        .filter(this.zoomFilter())
        .scaleExtent([0.0625, +Infinity])
        .on("start", this.zoom().start)
        .on("zoom", this.zoom().go)
        .on("end", this.zoom().stop);

      this.zoomer.ratioX = 1;
      this.zoomer.ratioY = 1;

      this.context._zoomedXYMinMax = {
        x: { zoomedMin: null, zoomedMax: null },
        y: { zoomedMin: null, zoomedMax: null }
      };
    }

    dragSubject() {
      const _this = this.context;

      return function(event) {
        /*
         * Do not drag if the Ctrl key, Meta key, or plus cursor mode is
         * not enabled. Also do not drag if zoom-pinching on touchmove
         * events.
         */
        if (!(event.sourceEvent.ctrlKey || event.sourceEvent.metaKey ||
          _this.ui.cursorMode === "plus") || (_this.ui.cursorMode === "minus") ||
          (event.sourceEvent.type === "touchmove" || event.sourceEvent.type === "touchstart") &&
          (event.sourceEvent.touches.length > 1 || event.sourceEvent.targetTouches.length > 1)) {
          return null;
        }

        return {
          x: d3.pointer(event)[0],
          y: d3.pointer(event)[1]
        };
      };
    }

    drag() {
      const _this = this.context;
      const self = this;

      return {
        start(event) {
          /*
           * Do not drag if the Ctrl key, Meta key, or plus cursor mode is
           * not enabled. Also do not drag if zoom-pinching on touchmove
           * events.
           */
          //   if(!(event.sourceEvent.ctrlKey || event.sourceEvent.metaKey ||
          //          _this.ui.cursorMode === "plus") ||
          //          (event.sourceEvent.type === "touchmove" || event.sourceEvent.type === "touchstart") &&
          //          (event.sourceEvent.touches.length > 1 || event.sourceEvent.targetTouches.length > 1)) {
          //         return;
          //     }

          // self.dragLock = true;
          this.origin = {
            x: d3.pointer(event)[0],
            y: d3.pointer(event)[1]
          };
          _this.DOM.zoomRect.classed("vzb-invisible", false);
        },

        go(event) {
          const origin = this.origin;
          const mouse = {
            x: event.x,
            y: event.y
          };

          _this.DOM.zoomRect
            .attr("x", Math.min(mouse.x, origin.x))
            .attr("y", Math.min(mouse.y, origin.y))
            .attr("width", Math.abs(mouse.x - origin.x))
            .attr("height", Math.abs(mouse.y - origin.y));
        },

        stop(event) {
          // if (!self.dragLock) return;
          // self.dragLock = false;

          _this.DOM.zoomRect
            .attr("width", 0)
            .attr("height", 0)
            .classed("vzb-invisible", true);

          this.target = {
            x: d3.pointer(event)[0],
            y: d3.pointer(event)[1]
          };
          if (Math.abs(this.origin.x - this.target.x) < 10 || Math.abs(this.origin.y - this.target.y) < 10) return;

          /*
           * Only compensate for dragging when the Ctrl key or Meta key
           * are pressed, or if the cursorMode is not in plus mode.
           */
          const compensateDragging = event.sourceEvent.ctrlKey ||
            event.sourceEvent.metaKey ||
            _this.ui.cursorMode === "plus";

          self._zoomOnRectangle(
            d3.select(this),
            this.origin.x,
            this.origin.y,
            this.target.x,
            this.target.y,
            compensateDragging, 500
          );
        }
      };
    }

    zoomFilter() {
      const _this = this.context;

      return function(event) {

        if (event.ctrlKey || event.metaKey) return false;

        // Cancel drag lock when zoom-pinching via touchmove events.
        if ((event.type === "touchmove" || event.type === "touchstart") &&
          (event.touches.length > 1 || event.targetTouches.length > 1)) return true;

        if ((event.type === "wheel" || event.type === "mousewheel") &&
          _this.ui.zoomOnScrolling) {
          // if (_this.scrollableAncestor) {
          //   _this.scrollableAncestor.scrollTop -= (event.deltaY || -event.wheelDelta);
          // }
          // event.scale = null;
          //zoomer.scale(this.savedScale);
          return true;
        }

        if ((event.type === "mousedown" || event.type === "touchstart") &&
          (_this.ui.cursorMode !== "plus") && (_this.ui.cursorMode !== "minus") &&
          (_this.ui.panWithArrow || _this.ui.cursorMode === "hand")) return true;

        return false;
      };
    }

    zoom() {
      const _this = this.context;
      const zoomer = this.zoomer;
      const self = this;

      return {
        start() {
          //this.savedScale = zoomer.scale;
          if ((_this.ui.cursorMode !== "plus") && (_this.ui.cursorMode !== "minus")) {
            _this.DOM.chartSvg.classed("vzb-zooming", true);
          }

        },
        go(event) {

          const sourceEvent = event.sourceEvent;

          let zoom = event.transform.k;

          let pan = [event.transform.x, event.transform.y];//event.translate;
          let ratioY = zoomer.ratioY;
          let ratioX = zoomer.ratioX;

          _this.draggingNow = true;

          //value protections and fallbacks
          if (isNaN(zoom) || zoom == null) zoom = zoomer.scale;
          if (isNaN(zoom) || zoom == null) zoom = 1;

          //TODO: this is a patch to fix #221. A proper code review of zoom and zoomOnRectangle logic is needed
          /*
           * Mouse wheel and touchmove events set the zoom value
           * independently of axis ratios. If the zoom event was triggered
           * by a mouse wheel event scrolling down or touchmove event with
           * more than 1 contact that sets zoom to 1, then set the axis
           * ratios to 1 as well, which will fully zoom out.
           */
          if (zoom === 1 && sourceEvent !== null &&
            ((sourceEvent.type === "wheel" || sourceEvent.type === "mousewheel") && (sourceEvent.deltaY || -sourceEvent.wheelDelta) > 0 ||
            sourceEvent.type === "touchmove" && sourceEvent.touches.length > 1)) {
            zoomer.ratioX = 1;
            ratioX = 1;
            zoomer.ratioY = 1;
            ratioY = 1;
          }

          if (isNaN(pan[0]) || isNaN(pan[1]) || pan[0] == null || pan[1] == null) pan = [0, 0];

          // limit the zooming, so that it never goes below min value of zoom for any of the axes
          const minZoomScale = zoomer.scaleExtent()[0];
          if (zoom * ratioY < minZoomScale) {
            ratioY = minZoomScale / zoom;
            zoomer.ratioY = ratioY;
          }
          if (zoom * ratioX < minZoomScale) {
            ratioX = minZoomScale / zoom;
            zoomer.ratioX = ratioX;
          }

          const zoomXOut = zoom * ratioX < 1;
          const zoomYOut = zoom * ratioY < 1;

          //limit the panning, so that we are never outside the possible range
          if (!zoomXOut) {
            if (pan[0] > 0) pan[0] = 0;
            if (pan[0] < (1 - zoom * ratioX) * _this.width) pan[0] = (1 - zoom * ratioX) * _this.width;
          } else {
            if (pan[0] < 0) pan[0] = 0;
            if (pan[0] > (1 - zoom * ratioX) * _this.width) pan[0] = (1 - zoom * ratioX) * _this.width;
          }

          if (!zoomYOut) {
            if (pan[1] > 0) pan[1] = 0;
            if (pan[1] < (1 - zoom * ratioY) * _this.height) pan[1] = (1 - zoom * ratioY) * _this.height;
          } else {
            if (pan[1] < 0) pan[1] = 0;
            if (pan[1] > (1 - zoom * ratioY) * _this.height) pan[1] = (1 - zoom * ratioY) * _this.height;
          }

          //limit zoom translate
          self.zoomSelection.property("__zoom", d3.zoomIdentity.translate(pan[0], pan[1]).scale(zoom));

          const xPanOffset = _this.width * zoom * ratioX;
          const yPanOffset = _this.height * zoom * ratioY;

          const xRange = [0 * zoom * ratioX + pan[0], xPanOffset + pan[0]];
          const yRange = [yPanOffset + pan[1], 0 * zoom * ratioY + pan[1]];

          const xRangeBumped = _this._rangeBump(xRange);
          const yRangeBumped = _this._rangeBump(yRange);

          /*
           * Shift xRange and yRange by the difference between the bumped
           * ranges, which is scaled by the zoom factor. This accounts for
           * the range bump, which controls a gutter around the
           * bubblechart, while correctly zooming.
           */
          const xRangeMinOffset = (xRangeBumped[0] - xRange[0]) * zoom * ratioX;
          const xRangeMaxOffset = (xRangeBumped[1] - xRange[1]) * zoom * ratioX;

          const yRangeMinOffset = (yRangeBumped[0] - yRange[0]) * zoom * ratioY;
          const yRangeMaxOffset = (yRangeBumped[1] - yRange[1]) * zoom * ratioY;

          xRange[0] += xRangeMinOffset;
          xRange[1] += xRangeMaxOffset;

          yRange[0] += yRangeMinOffset;
          yRange[1] += yRangeMaxOffset;

          // Calculate the maximum xRange and yRange available.
          const xRangeBounds = [0, _this.width];
          const yRangeBounds = [_this.height, 0];

          const xRangeBoundsBumped = _this._rangeBump(xRangeBounds);
          const yRangeBoundsBumped = _this._rangeBump(yRangeBounds);

          /*
           * Set the pan to account for the range bump by subtracting
           * offsets and preventing panning past the range bump gutter.
           */
          if (!zoomXOut) {
            if (xRange[0] > xRangeBoundsBumped[0]) pan[0] = xRangeBoundsBumped[0] - xRangeMinOffset;
            if (xRange[1] < xRangeBoundsBumped[1]) pan[0] = xRangeBoundsBumped[1] - xRangeMaxOffset - xPanOffset;
          } else {
            if (xRange[0] < xRangeBoundsBumped[0]) pan[0] = xRangeBoundsBumped[0] - xRangeMinOffset;
            if (xRange[1] > xRangeBoundsBumped[1]) pan[0] = xRangeBoundsBumped[1] - xRangeMaxOffset - xPanOffset;
          }

          if (!zoomYOut) {
            if (yRange[0] < yRangeBoundsBumped[0]) pan[1] = yRangeBoundsBumped[0] - yRangeMinOffset - yPanOffset;
            if (yRange[1] > yRangeBoundsBumped[1]) pan[1] = yRangeBoundsBumped[1] - yRangeMaxOffset;
          } else {
            if (yRange[0] > yRangeBoundsBumped[0]) pan[1] = yRangeBoundsBumped[0] - yRangeMinOffset - yPanOffset;
            if (yRange[1] < yRangeBoundsBumped[1]) pan[1] = yRangeBoundsBumped[1] - yRangeMaxOffset;
          }

          //zoomer.translate = pan;
          //self.zoomSelection.property("__zoom", d3.zoomIdentity.translate(pan[0], pan[1]).scale(zoom));

          /*
           * Clamp the xRange and yRange by the amount that the bounds
           * that are range bumped.
           *
           * Additionally, take the amount clamped on the end of the range
           * and either subtract or add it to the range's other end. This
           * prevents visible stretching of the range when only panning.
           */
          if (!zoomXOut) {
            if (xRange[0] > xRangeBoundsBumped[0]) {
              xRange[1] -= Math.abs(xRange[0] - xRangeBoundsBumped[0]);
              xRange[0] = xRangeBoundsBumped[0];
            }

            if (xRange[1] < xRangeBoundsBumped[1]) {
              xRange[0] += Math.abs(xRange[1] - xRangeBoundsBumped[1]);
              xRange[1] = xRangeBoundsBumped[1];
            }
          } else {
            if (xRange[0] < xRangeBoundsBumped[0]) {
              xRange[1] += Math.abs(xRange[0] - xRangeBoundsBumped[0]);
              xRange[0] = xRangeBoundsBumped[0];
            }

            if (xRange[1] > xRangeBoundsBumped[1]) {
              xRange[0] -= Math.abs(xRange[1] - xRangeBoundsBumped[1]);
              xRange[1] = xRangeBoundsBumped[1];
            }
          }

          if (!zoomYOut) {
            if (yRange[0] < yRangeBoundsBumped[0]) {
              yRange[1] += Math.abs(yRange[0] - yRangeBoundsBumped[0]);
              yRange[0] = yRangeBoundsBumped[0];
            }

            if (yRange[1] > yRangeBoundsBumped[1]) {
              yRange[0] -= Math.abs(yRange[1] - yRangeBoundsBumped[1]);
              yRange[1] = yRangeBoundsBumped[1];
            }
          } else {
            if (yRange[0] > yRangeBoundsBumped[0]) {
              yRange[1] -= Math.abs(yRange[0] - yRangeBoundsBumped[0]);
              yRange[0] = yRangeBoundsBumped[0];
            }

            if (yRange[1] < yRangeBoundsBumped[1]) {
              yRange[0] += Math.abs(yRange[1] - yRangeBoundsBumped[1]);
              yRange[1] = yRangeBoundsBumped[1];
            }
          }

          if (_this.MDL.x.scale.type === "ordinal") {
            _this.xScale.rangeBands(xRange);
          } else {
            _this.xScale.range(xRange);
          }

          if (_this.MDL.y.scale.type === "ordinal") {
            _this.yScale.rangeBands(yRange);
          } else {
            _this.yScale.range(yRange);
          }

          const formatter = function(n) {
            return VizabiSharedComponents.LegacyUtils.isDate(n) ? n : +n.toFixed(2);
          };

          const zoomedXRange = xRangeBoundsBumped;
          const zoomedYRange = yRangeBoundsBumped;

          /*
           * Set the zoomed min/max to the correct value depending on if the
           * min/max values lie within the range bound regions.
           */
          /*
           if(!zoomXOut) {
           zoomedXRange[0] = xRangeBounds[0] > xRange[0] ? xRangeBounds[0] : xRange[0];
           zoomedXRange[1] = xRangeBounds[1] < xRange[1] ? xRangeBounds[1] : xRange[1];
           }

           if(!zoomYOut) {
           zoomedYRange[0] = yRangeBounds[0] < yRange[0] ? yRangeBounds[0] : yRange[0];
           zoomedYRange[1] = yRangeBounds[1] > yRange[1] ? yRangeBounds[1] : yRange[1];
           }
           */

          _this._zoomedXYMinMax = {
            x: {
              zoomedMin: formatter(_this.xScale.invert(zoomedXRange[0])),
              zoomedMax: formatter(_this.xScale.invert(zoomedXRange[1]))
            },
            y: {
              zoomedMin: formatter(_this.yScale.invert(zoomedYRange[0])),
              zoomedMax: formatter(_this.yScale.invert(zoomedYRange[1]))
            }
          };

          //TODO/*avoid storing it in URL*/
          if (!zoomer.dontFeedToState) {
            // _this.ui.panzoom = {
            //   x: Object.assign({}, _this._zoomedXYMinMax.x),
            //   y: Object.assign({}, _this._zoomedXYMinMax.y),          
            // }
            _this.MDL.x.scale.zoomed = [_this._zoomedXYMinMax.x.zoomedMin, _this._zoomedXYMinMax.x.zoomedMax];
            _this.MDL.y.scale.zoomed = [_this._zoomedXYMinMax.y.zoomedMin, _this._zoomedXYMinMax.y.zoomedMax];
          }

          const optionsY = _this.yAxis.labelerOptions();
          const optionsX = _this.xAxis.labelerOptions();
          optionsY.limitMaxTickNumber = zoom * ratioY < 1.5 ? 8 : zoom * ratioY * 8;
          optionsX.limitMaxTickNumber = zoom * ratioX < 1.5 ? 8 : zoom * ratioX * 8;
          optionsY.transitionDuration = zoomer.duration;
          optionsX.transitionDuration = zoomer.duration;

          _this.DOM.xAxisEl.call(_this.xAxis.labelerOptions(optionsX));
          _this.DOM.yAxisEl.call(_this.yAxis.labelerOptions(optionsY));
          _this.redrawData(zoomer.duration);
          //_this._trails.run("resize", null, zoomer.duration);

          zoomer.duration = 0;
        },

        stop() {
          _this.DOM.chartSvg.classed("vzb-zooming", false);
          // if (this.quitZoom) return;

          //Force the update of the URL and history, with the same values
          if (!zoomer.dontFeedToState) {
            // _this.ui.panzoom = {
            //   x: Object.assign({}, _this._zoomedXYMinMax.x),
            //   y: Object.assign({}, _this._zoomedXYMinMax.y),          
            // }
            _this.MDL.x.scale.zoomed = [_this._zoomedXYMinMax.x.zoomedMin, _this._zoomedXYMinMax.x.zoomedMax];
            _this.MDL.y.scale.zoomed = [_this._zoomedXYMinMax.y.zoomedMin, _this._zoomedXYMinMax.y.zoomedMax];
            //_this.model.marker.set(_this._zoomedXYMinMax, true, true);
          }
          zoomer.dontFeedToState = null;

          _this.draggingNow = false;
        }
      };
    }

    expandCanvas(duration) {
      const _this = this.context;
      if (!duration) duration = _this.duration;

      //d3 extent returns min and max of the input array as [min, max]
      const mmX = d3.extent(VizabiSharedComponents.LegacyUtils.values(_this.frame.x));
      const mmY = d3.extent(VizabiSharedComponents.LegacyUtils.values(_this.frame.y));

      //protection agains unreasonable min-max results -- abort function
      if (!mmX[0] && mmX[0] !== 0 || !mmX[1] && mmX[1] !== 0 || !mmY[0] && mmY[0] !== 0 || !mmY[1] && mmY[1] !== 0) {
        return VizabiSharedComponents.LegacyUtils.warn("panZoom.expandCanvas: X or Y min/max are broken. Aborting with no action");
      }
      /*
       * Use a range bumped scale to correctly accommodate the range bump
       * gutter.
       */
      const suggestedFrame = {
        x1: _this.xScale(mmX[0]),
        y1: _this.yScale(mmY[0]),
        x2: _this.xScale(mmX[1]),
        y2: _this.yScale(mmY[1])
      };
      const xBounds = [0, _this.width];
      const yBounds = [_this.height, 0];

      // Get the current zoom frame based on the current dimensions.
      const frame = {
        x1: xBounds[0],
        x2: xBounds[1],
        y1: yBounds[0],
        y2: yBounds[1]
      };

      const TOLERANCE = 0.0;

      /*
       * If there is no current zoom frame, or if any of the suggested frame
       * points extend outside of the current zoom frame, then expand the
       * canvas.
       */
      if (!_this.isCanvasPreviouslyExpanded ||
        suggestedFrame.x1 < frame.x1 * (1 - TOLERANCE) || suggestedFrame.x2 > frame.x2 * (1 + TOLERANCE) ||
        suggestedFrame.y2 < frame.y2 * (1 - TOLERANCE) || suggestedFrame.y1 > frame.y1 * (1 + TOLERANCE)) {
        /*
         * If there is already a zoom frame, then clamp the suggested frame
         * points to only zoom out and expand the canvas.
         *
         * If any of x1, x2, y1, or y2 is within the current frame
         * boundaries, then clamp them to the frame boundaries. If any of
         * the above values will translate into a data value that is outside
         * of the possible data range, then clamp them to the frame
         * coordinate that corresponds to the maximum data value that can
         * be displayed.
         */
        if (_this.isCanvasPreviouslyExpanded) {
          /*
           * Calculate bounds and bumped scale for calculating the data boundaries
           * to which the suggested frame points need to be clamped.
           */
          const xBoundsBumped = _this._rangeBump(xBounds);
          const yBoundsBumped = _this._rangeBump(yBounds);

          if (suggestedFrame.x1 > xBoundsBumped[0]) suggestedFrame.x1 = xBoundsBumped[0];
          if (suggestedFrame.x2 < xBoundsBumped[1]) suggestedFrame.x2 = xBoundsBumped[1];
          if (suggestedFrame.y1 < yBoundsBumped[0]) suggestedFrame.y1 = yBoundsBumped[0];
          if (suggestedFrame.y2 > yBoundsBumped[0]) suggestedFrame.y2 = yBoundsBumped[1];
        }

        _this.isCanvasPreviouslyExpanded = true;
        this._zoomOnRectangle(_this.element, suggestedFrame.x1, suggestedFrame.y1,
          suggestedFrame.x2, suggestedFrame.y2, false, duration);
      } else {
        _this.redrawDataPoints(duration);
      }
    }

    zoomToMaxMin(zoomedMinX, zoomedMaxX, zoomedMinY, zoomedMaxY, duration, dontFeedToState) {
      const _this = this.context;
      let minX = zoomedMinX;
      let maxX = zoomedMaxX;
      let minY = zoomedMinY;
      let maxY = zoomedMaxY;

      const xDomain = _this.xScale.domain();
      const yDomain = _this.yScale.domain();

      /*
       * Prevent zoomout if only one of zoom edges set outside domain
       */
      if (minX < xDomain[0] && maxX < xDomain[1]) minX = xDomain[0];
      if (minX > xDomain[0] && maxX > xDomain[1]) maxX = xDomain[1];
      if (minY < yDomain[0] && maxY < yDomain[1]) minY = yDomain[0];
      if (minY > yDomain[0] && maxY > yDomain[1]) maxY = yDomain[1];


      const xRange = [_this.xScale(minX), _this.xScale(maxX)];
      const yRange = [_this.yScale(minY), _this.yScale(maxY)];


      this._zoomOnRectangle(_this.element, xRange[0], yRange[0], xRange[1], yRange[1], false, duration, dontFeedToState);
    }

    _zoomOnRectangle(element, zoomedX1, zoomedY1, zoomedX2, zoomedY2, compensateDragging, duration, dontFeedToState) {
      const _this = this.context;
      const zoomer = this.zoomer;
      const transform = d3.zoomTransform(this.zoomSelection.node());

      const x1 = zoomedX1;
      const y1 = zoomedY1;
      const x2 = zoomedX2;
      const y2 = zoomedY2;

      /*
       * When dragging to draw a rectangle, the translate vector has (x2 - x1)
       * added to zoomer.translate()[0], and (y2 - 1) added to
       * zoomer.translate()[1].
       *
       * We need to compensate for this addition when
       * zooming with a rectangle, because zooming with a rectangle will
       * update the translate vector with new values based on the rectangle
       * dimensions.
       */
      if (compensateDragging) {
        transform.translate(
          x1 - x2,
          y1 - y2
        );
      }

      const xRangeBounds = [0, _this.width];
      const yRangeBounds = [_this.height, 0];

      const xRangeBoundsBumped = _this._rangeBump(xRangeBounds);
      const yRangeBoundsBumped = _this._rangeBump(yRangeBounds);

      const minZoom = zoomer.scaleExtent()[0];
      const maxZoom = zoomer.scaleExtent()[1];
      let zoom, ratioX, ratioY;

      if (x1 == x2 || y1 == y2 || xRangeBoundsBumped[0] == xRangeBoundsBumped[1] || yRangeBoundsBumped[0] == yRangeBoundsBumped[1]) {
        return VizabiSharedComponents.LegacyUtils.warn("_zoomOnRectangle(): can not proceed because this may result in infinity zooms");
      }

      if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
        zoom = Math.abs(yRangeBoundsBumped[0] - yRangeBoundsBumped[1]) / Math.abs(y1 - y2) * transform.k;

        /*
         * Clamp the zoom scalar to the maximum zoom allowed before
         * calculating the next ratioX and ratioY.
         */
        if (zoom < minZoom) {
          zoomer.ratioY *= zoom / transform.k;
          zoom = minZoom;
        }
        if (zoom > maxZoom) zoom = maxZoom;

        ratioX = Math.abs(xRangeBoundsBumped[0] - xRangeBoundsBumped[1]) / Math.abs(x1 - x2) * transform.k / zoom * zoomer.ratioX;
        ratioY = zoomer.ratioY;
      } else {
        zoom = Math.abs(xRangeBoundsBumped[0] - xRangeBoundsBumped[1]) / Math.abs(x1 - x2) * transform.k;

        /*
         * Clamp the zoom scalar to the maximum zoom allowed before
         * calculating the next ratioX and ratioY.
         */
        if (zoom < minZoom) {
          zoomer.ratioX *= zoom / transform.k;
          zoom = minZoom;
        }
        if (zoom > maxZoom) zoom = maxZoom;

        ratioY = Math.abs(yRangeBoundsBumped[0] - yRangeBoundsBumped[1]) / Math.abs(y1 - y2) * transform.k / zoom * zoomer.ratioY;
        ratioX = zoomer.ratioX;
      }

      const pan = [
        (transform.x - Math.min(x1, x2)) / transform.k / zoomer.ratioX * zoom * ratioX + (xRangeBoundsBumped[0] - xRangeBounds[0]),
        (transform.y - Math.min(y1, y2)) / transform.k / zoomer.ratioY * zoom * ratioY + (yRangeBoundsBumped[1] - yRangeBounds[1])
      ];

      zoomer.dontFeedToState = dontFeedToState;
      zoomer.ratioY = ratioY || 1; //NaN defaults to 1
      zoomer.ratioX = ratioX || 1; //NaN defaults to 1
      zoomer.duration = duration ? duration : 0;

      this.zoomSelection.call(zoomer.transform, d3.zoomIdentity.translate(pan[0], pan[1]).scale(zoom));
    }

    /*
     * Incrementally zoom in or out and pan the view so that it never looses the point where click happened
     * this function is a modified d3's own zoom behavior on double click
     * for the original code see https://github.com/mbostock/d3/blob/master/src/behavior/zoom.js
     * function dblclicked() and what it refers to
     */
    zoomByIncrement(event, direction, duration) {
      const transform = d3.zoomTransform(this.zoomSelection.node());

      let ratio = transform.k;
      const pan = [transform.x, transform.y];

      const mouse = d3.pointer(event);
      let k = Math.log(ratio) / Math.LN2;

      //change factor direction based on the input. default is no direction supplied
      if (direction == "plus" || !direction) k = Math.floor(k) + 1;
      if (direction == "minus") k = Math.ceil(k) - 1;

      //decode panning
      let locus = [(mouse[0] - pan[0]) / ratio, (mouse[1] - pan[1]) / ratio];

      //recalculate zoom ratio
      const scaleExtent = this.zoomer.scaleExtent();
      if (ratio == scaleExtent[0]) {
        this.zoomer.ratioY = 1;
        this.zoomer.ratioX = 1;
      }
      ratio = Math.max(scaleExtent[0], Math.min(scaleExtent[1], Math.pow(2, k)));

      //recalculate panning
      locus = [locus[0] * ratio + pan[0], locus[1] * ratio + pan[1]];
      pan[0] += mouse[0] - locus[0];
      pan[1] += mouse[1] - locus[1];

      this.zoomer.duration = duration || 0;
      this.zoomSelection.call(this.zoomer.transform, d3.zoomIdentity.translate(pan[0], pan[1]).scale(ratio));

    }

    /*
     * Reset zoom values without triggering a zoom event.
     */
    resetZoomState(element) {
      this.zoomer.ratioY = 1;
      this.zoomer.ratioX = 1;
      (element || this.zoomSelection).property("__zoom", d3.zoomIdentity);
    }

    reset(element, duration) {
      const _this = this.context;
      _this.isCanvasPreviouslyExpanded = false;

      this.zoomer.ratioY = 1;
      this.zoomer.ratioX = 1;
      this.zoomer.duration = duration || 0;
      (element || this.zoomSelection).call(this.zoomer.transform, d3.zoomIdentity);
    }

    rerun(element) {
      (element || this.zoomSelection).call(this.zoomer.scaleBy, 1);
    }

    zoomSelection(element) {
      this.zoomSelection = element;
    }

  }

  class BCDecorations{
    constructor(){
    }
    
    update(duration) {
      const _this = this;

      const uiSetting = this.ui.decorations;
      const layoutProfile = this.services.layout.profile;
      const margin = this.profileConstants.margin;
      
      // x axis groups used for incomes
      const showxAxisGroups = uiSetting.xAxisGroups 
        && uiSetting.xAxisGroups[this.MDL.x.data.concept] 
        && uiSetting.enabled
        && layoutProfile !== "SMALL";
      
      this.DOM.xAxisGroupsEl.classed("vzb-invisible", !showxAxisGroups);
      if (showxAxisGroups) {
        const axisGroupsData = VizabiSharedComponents.Utils.injectIndexes(uiSetting.xAxisGroups[this.MDL.x.data.concept]);
        let xAxisGroups = this.DOM.xAxisGroupsEl.selectAll(".vzb-bc-x-axis-group").data(axisGroupsData);
        
        xAxisGroups.exit().remove();
        xAxisGroups = xAxisGroups.enter().append("g").attr("class", "vzb-bc-x-axis-group")
          .each(function(){
            const view = d3.select(this);
            view.append("text").attr("class", "vzb-bc-x-axis-group-line").text("◆").style("text-anchor","middle");
            view.append("text").attr("class", "vzb-bc-x-axis-group-text");
          })
          .merge(xAxisGroups);
        
        const xAxisGroups_calcs = [];
        let useShorterLabels = false;
        
        // first pass: calculate label text sizes and margins
        xAxisGroups.each(function(d, i){
          const view = d3.select(this);
          
          const text = view.select("text.vzb-bc-x-axis-group-text")
            .text(_this.localise(d.label));
          
          const calcs = {min: d.min, max: d.max};
          
          calcs.textHeight = text.node().getBBox().height;
          calcs.textWidth = text.node().getBBox().width;
          
          calcs.boundaryMinX_px = _this.xScale(d.min || d.min === 0? d.min : d3.min(_this.xScale.domain())) || 0;
          calcs.boundaryMaxX_px = _this.xScale(d.max || d.max === 0? d.max : d3.max(_this.xScale.domain())) || 0;
          
          calcs.centerX_px = (calcs.boundaryMinX_px + calcs.boundaryMaxX_px) / 2;
          calcs.marginX_px = (Math.abs(calcs.boundaryMinX_px - calcs.boundaryMaxX_px) - calcs.textWidth) / 2;
          
          if (calcs.marginX_px - calcs.textHeight < 0) useShorterLabels = true;
          
          xAxisGroups_calcs[i] = calcs;
        });
        
        // second pass: if at least one of labels doesn't fit, switch to compact mode and recalculate text sizes and margins
        if (useShorterLabels) {
          xAxisGroups.each(function(d, i){
            const view = d3.select(this);

            const text = view.select("text.vzb-bc-x-axis-group-text")
              .text(_this.localise(d.label_short));

            const calcs = xAxisGroups_calcs[i];

            calcs.textWidth = text.node().getBBox().width;
            calcs.marginX_px = (Math.abs(calcs.boundaryMinX_px - calcs.boundaryMaxX_px) - calcs.textWidth) / 2;

            xAxisGroups_calcs[i] = calcs;
          });
        }
        
        // third pass: actually put labels in places
        xAxisGroups.each(function(d, i){
          const view = d3.select(this);
          
          const isFirst = (i == 0);
          const isLast = (i == xAxisGroups_calcs.length - 1);
          const calcs = xAxisGroups_calcs[i];
          const minMargin = calcs.textHeight/4;
          let x = calcs.centerX_px;
          
          if (isFirst) x = xAxisGroups_calcs[i+1].boundaryMinX_px - Math.max(xAxisGroups_calcs[i+1].marginX_px, minMargin);
          if (isLast) x = xAxisGroups_calcs[i-1].boundaryMaxX_px + Math.max(xAxisGroups_calcs[i-1].marginX_px, minMargin);
          
          view.select("text.vzb-bc-x-axis-group-text")
            .style("text-anchor", isFirst ? "end" : isLast ? "start" : "middle")
            .transition()
            .duration(duration || 0)
            .attr("dy", "-0.2em")
            .attr("y", calcs.textHeight)
            .attr("x", x);
          
          view.select("text.vzb-bc-x-axis-group-line")
            .classed("vzb-invisible", isLast)
            .transition()
            .duration(duration || 0)
            .attr("dy", "-0.2em")
            .attr("y", calcs.textHeight * 0.9)
            .attr("x", calcs.boundaryMaxX_px);
        });
        
        xAxisGroups.select("text.vzb-bc-x-axis-group-text").on("mouseenter", function(event, d) {
          const calcs = xAxisGroups_calcs[d.i];
          const parentView = d3.select(this.parentNode);
    
          d3.select(this).attr("font-weight", "bold");
          parentView.append("rect").lower()
            .attr("x", calcs.boundaryMinX_px)
            .attr("width", calcs.boundaryMaxX_px - calcs.boundaryMinX_px)
            .attr("y", - margin.top)
            .attr("height", _this.height + margin.top);
    
          if (calcs.min || calcs.min === 0) parentView.append("line").lower()
            .attr("x1", calcs.boundaryMinX_px)
            .attr("x2", calcs.boundaryMinX_px)
            .attr("y1", - margin.top)
            .attr("y2", _this.height);
    
          if (calcs.max || calcs.max === 0) parentView.append("line").lower()
            .attr("x1", calcs.boundaryMaxX_px)
            .attr("x2", calcs.boundaryMaxX_px)
            .attr("y1", - margin.top)
            .attr("y2", _this.height);
    
        }).on("mouseleave", function() {
          const parentView = d3.select(this.parentNode);
    
          d3.select(this).attr("font-weight", null);
          parentView.selectAll("rect").remove();
          parentView.selectAll("line").remove();
        });
      }    
      
      // diagonal line that is used when the same idicator ID is used for both axis X and Y
      const showLineEqualXY = 
        this.MDL.x.data.concept == this.MDL.y.data.concept 
        && uiSetting.enabled
        && layoutProfile !== "SMALL";
      
      this.DOM.lineEqualXY.classed("vzb-invisible", !showLineEqualXY);
      if (showLineEqualXY) {
        const min = d3.min(this.yScale.domain().concat(this.xScale.domain()));
        const max = d3.max(this.yScale.domain().concat(this.xScale.domain()));

        this.DOM.lineEqualXY
          .transition()
          .duration(duration || 0)
          .attr("y1", this.yScale(min) || 0)
          .attr("y2", this.yScale(max) || 0)
          .attr("x1", this.xScale(min) || 0)
          .attr("x2", this.xScale(max) || 0);
      }
    }
  }

  const {ICON_QUESTION} = VizabiSharedComponents.Icons;
  const COLOR_WHITEISH = "rgb(253, 253, 253)";

  const marginScaleH = (marginMin, ratio = 0) => height => marginMin + height * ratio;
  const marginScaleW = (marginMin, ratio = 0) => width => marginMin + width * ratio;

  function isTrailBubble(d){
    return !!d[Symbol.for("trailHeadKey")];
  }

  const MAX_RADIUS_EM = 0.05;

  const PROFILE_CONSTANTS = (width, height) => ({
    SMALL: {
      margin: { top: 30, bottom: 35, left: 30, right: 10},
      leftMarginRatio: 1,
      padding: 2,
      minRadiusPx: 0.5,
      maxRadiusPx: Math.max(0.5, MAX_RADIUS_EM * VizabiSharedComponents.LegacyUtils.hypotenuse(width, height)),
      infoElHeight: 16,
      yAxisTitleBottomMargin: 6,
      xAxisTitleBottomMargin: 4
    },
    MEDIUM: {
      margin: { top: 15, bottom: 40, left: 40, right: 15},
      leftMarginRatio: 1.6,
      padding: 2,
      minRadiusPx: 1,
      maxRadiusPx: Math.max(0.5, MAX_RADIUS_EM * VizabiSharedComponents.LegacyUtils.hypotenuse(width, height)),
      infoElHeight: 20,
      yAxisTitleBottomMargin: 3,
      xAxisTitleBottomMargin: 4
    },
    LARGE: {
      margin: { top: 15, bottom: marginScaleH(30, 0.03)(height), left: marginScaleW(31, 0.015)(width), right: 20},
      leftMarginRatio: 1.8,
      padding: 2,
      minRadiusPx: 1,
      maxRadiusPx: Math.max(0.5, MAX_RADIUS_EM * VizabiSharedComponents.LegacyUtils.hypotenuse(width, height)),
      infoElHeight: 22,
      yAxisTitleBottomMargin: 3,//marginScaleH(4, 0.01)(height),
      xAxisTitleBottomMargin: marginScaleH(0, 0.01)(height),
      hideSTitle: true
    }
  });

  const PROFILE_CONSTANTS_FOR_PROJECTOR = (width, height) => ({
    MEDIUM: {
      margin: { top: 20, bottom: 55, left: 50, right: 20 },
      yAxisTitleBottomMargin: 3,
      xAxisTitleBottomMargin: 4,
      infoElHeight: 26,
    },
    LARGE: {
      margin: { top: 30, bottom: marginScaleH(45, 0.03)(height), left: marginScaleW(35, 0.025)(width), right: 30 },
      yAxisTitleBottomMargin: 3,//marginScaleH(4, 0.01)(height),
      xAxisTitleBottomMargin: marginScaleH(-10, 0.01)(height),
      infoElHeight: 32,
      hideSTitle: true
    }
  });

  // BUBBLE CHART COMPONENT
  class _VizabiBubbleChart extends VizabiSharedComponents.Chart {

    constructor(config) {
      config.subcomponents = [{
        type: VizabiSharedComponents.Labels,
        placeholder: ".vzb-bc-labels",      
        options: {
          CSS_PREFIX: "vzb-bc",
          LABELS_CONTAINER_CLASS: "vzb-bc-labels",
          LINES_CONTAINER_CLASS: "vzb-bc-lines",
          SUPPRESS_HIGHLIGHT_DURING_PLAY: false
        },
        name: "labels"
      },{
        type: VizabiSharedComponents.DynamicBackground,
        placeholder: ".vzb-bc-year"
      }];

      config.template = `
      <svg class="vzb-bubblechart-svg vzb-bubblechart-svg-back vzb-export">
          <g class="vzb-bc-graph">
              <g class="vzb-bc-year"></g>
              <svg class="vzb-bc-axis-x"><g></g></svg>
              <svg class="vzb-bc-axis-y"><g></g></svg>
              <line class="vzb-bc-projection-x"></line>
              <line class="vzb-bc-projection-y"></line>
          </g>
      </svg>
      <svg class="vzb-bubblechart-svg vzb-bubblechart-svg-main vzb-export">
          <g class="vzb-bc-graph">
              <g class="vzb-bc-axis-x-title"><text></text></g>
              <g class="vzb-bc-axis-x-info vzb-noexport"></g>

              <g class="vzb-bc-axis-y-title"><text></text></g>
              <g class="vzb-bc-axis-y-info vzb-noexport"></g>
              <svg class="vzb-bc-bubbles-crop">
                  <g class="vzb-zoom-selection"></g>
                  <rect class="vzb-bc-eventarea"></rect>
                  <g class="vzb-bc-trails"></g>
                  <g class="vzb-bc-bubbles"></g>
                  <rect class="vzb-bc-forecastoverlay vzb-hidden" x="0" y="0" width="100%" height="100%" fill="url(#vzb-bc-pattern-lines)" pointer-events='none'></rect>
              </svg>

              <g class="vzb-bc-axis-y-subtitle"><text></text></g>
              <g class="vzb-bc-axis-x-subtitle"><text></text></g>
              <g class="vzb-bc-axis-s-title"><text></text></g>
              <g class="vzb-bc-axis-c-title"><text></text></g>

              <rect class="vzb-bc-zoom-rect"></rect>
          </g>
          <g class="vzb-datawarning-button vzb-noexport"></g>
      </svg>
      <svg class="vzb-bubblechart-svg vzb-bubblechart-svg-front vzb-export">
          <g class="vzb-bc-graph">
              <svg class="vzb-bc-bubbles-crop">
                  <g class="vzb-bc-decorations">
                      <line class="vzb-bc-line-equal-xy vzb-invisible"></line>
                      <g class="vzb-bc-x-axis-groups"></g>
                  </g>   
                  <g class="vzb-bc-lines"></g>
                  <g class="vzb-bc-bubble-crown vzb-hidden">
                      <circle class="vzb-crown-glow"></circle>
                      <circle class="vzb-crown"></circle>
                  </g>        
              </svg>
              <svg class="vzb-bc-labels-crop">
                  <g class="vzb-bc-labels"></g>
              </svg>
          </g>
      </svg>
      <svg width="0" height="0">
          <defs>
              <filter id="vzb-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur>
              </filter>
            <pattern id="vzb-bc-pattern-lines" x="0" y="0" patternUnits="userSpaceOnUse" width="50" height="50" viewBox="0 0 10 10"> 
                <path d='M-1,1 l2,-2M0,10 l10,-10M9,11 l2,-2' stroke='black' stroke-width='3' opacity='0.08'/>
              </pattern> 
          </defs>
      </svg>
      <!-- This could possibly be another component -->
      <div class="vzb-tooltip vzb-hidden vzb-tooltip-mobile"></div>
    `;

      super(config);
    }

    setup() {

      this.DOM = {
        element: this.element,
        chartSvg: this.element.select("svg.vzb-bubblechart-svg-main"),
        chartSvgFront: this.element.select("svg.vzb-bubblechart-svg-front"),
        chartSvgBack: this.element.select("svg.vzb-bubblechart-svg-back"),
        chartSvgAll: this.element.selectAll("svg.vzb-bubblechart-svg"),
        graphAll: this.element.selectAll(".vzb-bc-graph"),
        bubbleContainerCropAll: this.element.selectAll(".vzb-bc-bubbles-crop"),
        zoomRect: this.element.select(".vzb-bc-zoom-rect"),
        eventArea: this.element.select(".vzb-bc-eventarea"),
        forecastOverlay: this.element.select(".vzb-bc-forecastoverlay"),
        tooltipMobile: this.element.select(".vzb-tooltip-mobile")
      };
      this.DOM.chartSvg.select(".vzb-bc-graph").call(graph => 
        Object.assign(this.DOM, {
          graph: graph,
          ySubTitleEl: graph.select(".vzb-bc-axis-y-subtitle"),
          xSubTitleEl: graph.select(".vzb-bc-axis-x-subtitle"),
          yTitleEl: graph.select(".vzb-bc-axis-y-title"),
          xTitleEl: graph.select(".vzb-bc-axis-x-title"),
          sTitleEl: graph.select(".vzb-bc-axis-s-title"),
          cTitleEl: graph.select(".vzb-bc-axis-c-title"),
          yInfoEl: graph.select(".vzb-bc-axis-y-info"),
          xInfoEl: graph.select(".vzb-bc-axis-x-info"),
          trailsContainer: graph.select(".vzb-bc-trails"),
          bubbleContainer: graph.select(".vzb-bc-bubbles"),
          bubbleContainerCrop: graph.select(".vzb-bc-bubbles-crop"),
          zoomSelection: graph.select(".vzb-zoom-selection"),
        })
      );
      this.DOM.chartSvgFront.select(".vzb-bc-graph").call(graphFront => {
        Object.assign(this.DOM, {
          graphFront: graphFront,
          labelsContainer: graphFront.select(".vzb-bc-labels"),
          labelsContainerCrop: graphFront.select(".vzb-bc-labels-crop"),
          linesContainer: graphFront.select(".vzb-bc-lines"),
          bubbleCrown: graphFront.select(".vzb-bc-bubble-crown"),
          decorationsEl: graphFront.select(".vzb-bc-decorations"),
        });
        this.DOM.lineEqualXY = this.DOM.decorationsEl.select(".vzb-bc-line-equal-xy");
        this.DOM.xAxisGroupsEl = this.DOM.decorationsEl.select(".vzb-bc-x-axis-groups");
      });
      this.DOM.chartSvgBack.select(".vzb-bc-graph").call(graphBack => {
        Object.assign(this.DOM, {
          yAxisElContainer: graphBack.select(".vzb-bc-axis-y"),
          xAxisElContainer: graphBack.select(".vzb-bc-axis-x"),
          yearEl: graphBack.select(".vzb-bc-year"),
          projectionX: graphBack.select(".vzb-bc-projection-x"),
          projectionY: graphBack.select(".vzb-bc-projection-y"),
        });
        this.DOM.yAxisEl = this.DOM.yAxisElContainer.select("g");
        this.DOM.xAxisEl = this.DOM.xAxisElContainer.select("g");
      });

      //set filter
      this.DOM.bubbleCrown.selectAll(".vzb-crown-glow")
        .attr("filter", "url(" + location.pathname + "#vzb-glow-filter)");

      this._year = this.findChild({type: "DynamicBackground"});
      this._labels = this.findChild({type: "Labels"});
      this._panZoom = new PanZoom(this);    
      this.decorations = new BCDecorations(this);
      this._initInfoElements();
    
      this.scrollableAncestor = VizabiSharedComponents.LegacyUtils.findScrollableAncestor(this.element);

      this.xAxis = VizabiSharedComponents.axisSmart("bottom");
      this.yAxis = VizabiSharedComponents.axisSmart("left");

      this.axisTitleComplimentStrings = {Y: "", X: "", S: "", C: ""};

      this.isCanvasPreviouslyExpanded = false;
      this.draggingNow = null;

      this.hoverBubble = false;

      const _this = this;
      //keyboard listeners
      d3.select("body")
        .on("keydown", (event) => {
          if (_this.ui.cursorMode !== "arrow" && _this.ui.cursorMode !== "hand") return;
          if (event.metaKey || event.ctrlKey) _this.DOM.chartSvgAll.classed("vzb-zoomin", true);
        })
        .on("keyup", (event) => {
          if (_this.ui.cursorMode !== "arrow" && _this.ui.cursorMode !== "hand") return;
          if (!event.metaKey && !event.ctrlKey) _this.DOM.chartSvgAll.classed("vzb-zoomin", false);
        })
        //this is for the case when user would press ctrl and move away from the browser tab or window
        //keyup event would happen somewhere else and won't be captured, so zoomin class would get stuck
        .on("mouseenter", (event) => {
          if (_this.ui.cursorMode !== "arrow" && _this.ui.cursorMode !== "hand") return;
          if (!event.metaKey && !event.ctrlKey) _this.DOM.chartSvgAll.classed("vzb-zoomin", false);
        });
    
      this.root.element.on("custom-resetZoom", () => {
        _this._panZoom.reset(null, 500);
      });

      this._panZoom.zoomSelection(this.DOM.bubbleContainerCrop);
      this.DOM.bubbleContainerCrop
        .call(this._panZoom.dragRectangle)
        .call(this._panZoom.zoomer)
        .on("dblclick.zoom", null)
        .on("mouseup", () => {
          _this.draggingNow = false;
        })
        .on("click", (event) => {
          const cursor = _this.ui.cursorMode;
          if (!event.defaultPrevented && cursor !== "arrow" && cursor !== "hand") {
            _this._panZoom.zoomByIncrement(event, cursor, 500);
          }
        });

    }

    _initInfoElements() {
      const _this = this;
      const dataNotesDialog = () => this.root.findChild({type: "DataNotes"});
      const timeSlider = () => this.root.findChild({type: "TimeSlider"});

      VizabiSharedComponents.LegacyUtils.setIcon(this.DOM.yInfoEl, ICON_QUESTION)
        .on("click", () => {
          dataNotesDialog().pin();
        })
        .on("mouseover", function() {
          if (timeSlider().ui.dragging) return;
          const rect = this.getBBox();
          const coord = VizabiSharedComponents.LegacyUtils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
          const toolRect = _this.root.element.node().getBoundingClientRect();
          const chartRect = _this.element.node().getBoundingClientRect();
          dataNotesDialog()
            .setEncoding(_this.MDL.y)
            .show()
            .setPos(coord.x + chartRect.left - toolRect.left, coord.y);
        })
        .on("mouseout", () => {
          if (timeSlider().ui.dragging) return;
          dataNotesDialog().hide();
        });

      VizabiSharedComponents.LegacyUtils.setIcon(this.DOM.xInfoEl, ICON_QUESTION)
        .on("click", () => {
          dataNotesDialog().pin();
        })
        .on("mouseover", function() {
          if (timeSlider().ui.dragging) return;
          const rect = this.getBBox();
          const coord = VizabiSharedComponents.LegacyUtils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
          const toolRect = _this.root.element.node().getBoundingClientRect();
          const chartRect = _this.element.node().getBoundingClientRect();
          dataNotesDialog()
            .setEncoding(_this.MDL.x)
            .show()
            .setPos(coord.x + chartRect.left - toolRect.left, coord.y);
        })
        .on("mouseout", () => {
          if (timeSlider().ui.dragging) return;
          dataNotesDialog().hide();
        });
    }

    get MDL(){
      return {
        frame: this.model.encoding.frame,
        selected: this.model.encoding.selected,
        highlighted: this.model.encoding.highlighted,
        superHighlighted: this.model.encoding.superhighlighted,
        y: this.model.encoding[this.state.alias.y || "y"],
        x: this.model.encoding[this.state.alias.x || "x"],
        size: this.model.encoding.size,
        color: this.model.encoding.color,
        label: this.model.encoding.label,
        trail: this.model.encoding.trail
      };
    }

    draw() {
      this.localise = this.services.locale.auto();

      //this.MDL.trail.config.show = false;
      //this.ui.cursorMode = "plus";
      this.sScale = this.MDL.size.scale.d3Scale;

      this.TIMEDIM = this.MDL.frame.data.concept;
      this.KEYS = this.model.data.space.filter(dim => dim !== this.TIMEDIM);

      if (this._updateLayoutProfile()) return; //return if exists with error
      this.addReaction(this._updateScales);
      this.addReaction(this.updateUIStrings);
      this.addReaction(this.updateTreemenu);
      this.addReaction(this._updateSize);
      this.addReaction(this.updateInfoElements);
      //    this.addReaction(this._resetZoomMinMaxXReaction, this._resetZoomMinMaxX);
      //    this.addReaction(this._resetZoomMinMaxYReaction, this._resetZoomMinMaxY);
      this.addReaction(this._updateOpacity);
      this.addReaction(this._updateShowYear);
      this.addReaction(this._updateYear);
      this.addReaction(this.drawData);
      this.addReaction(this._zoomToMarkerMaxMin);

      this.addReaction(this._selectDataPoints);
      this.addReaction(this._highlightDataPoints);
      this.addReaction(this._blinkSuperHighlighted);
      this.addReaction(this._drawForecastOverlay);
      this.addReaction(this._setupCursorMode);
      this.addReaction(this.updateDecorations);
    }

    drawData() {
      this.processFrameData();
      this._updateMarkerSizeLimits();
      this._createAndDeleteBubbles();
      //this.redrawData();
    }

    _updateShowYear() {
      this.DOM.yearEl.classed("vzb-hidden", !this.ui.timeInBackground);
    }

    _updateYear() {
      const duration = this._getDuration();
      this._year.setText(this.localise(this.MDL.frame.value), duration);    
    }

    _createAndDeleteBubbles() {
      const _this = this;
      const duration = this._getDuration();
      const transition = this._getTransition(duration);
      const data = this.__dataProcessed;

      this.bubbles = this.DOM.bubbleContainer.selectAll(".vzb-bc-entity")
        .data(this.__dataProcessed, d => d[Symbol.for("key")])
        .join(
          enter => enter
            .append(d => {
              const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
              const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              const trailLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
              const diagonalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
              trailLine.classList.add("vzb-trail-line");
              diagonalLine.classList.add("vzb-diagonal-line");
              g.appendChild(circle);
              g.appendChild(diagonalLine);
              if (isTrailBubble(d)) g.appendChild(trailLine);
              return g;
            })
            .attr("class", "vzb-bc-entity")
            .attr("id", d => `vzb-bc-bubble-${d[Symbol.for("key")]}-${this.id}`)
            .style("opacity", d => d[Symbol.for("opacity")] = this._getBubbleOpacity(d))
            .call(selection => {
              if(!VizabiSharedComponents.LegacyUtils.isTouchDevice()){
                selection
                  .on("mouseover", (event, d) => {
                    if (this.ui.cursorMode !== "arrow" && this.ui.cursorMode !== "hand") return;
                    if (this._labels.dragging) return;
                    this._bubblesInteract().mouseover(event, d);
                  })
                  .on("mouseout", (event, d) => {
                    if (this.ui.cursorMode !== "arrow" && this.ui.cursorMode !== "hand") return;
                    if (this._labels.dragging) return;
                    this._bubblesInteract().mouseout(event, d);
                  })
                  .on("click", (event, d) => {
                    if (this.ui.cursorMode !== "arrow" && this.ui.cursorMode !== "hand") return;
                    this._bubblesInteract().click(event, d);
                  });
              } else {
                selection
                  .onTap((event, d) => {
                    event.stopPropagation();
                    this._bubblesInteract().click(event, d);
                  })
                  .onLongTap(() => {});
              }
            })
            .each(function(d, index) {
              const dataNext = data[index + 1] || {};
              const isTrail = isTrailBubble(d);
              const isExtrapolated = d[Symbol.for("extrapolated")];
              const headTrail = isTrail && !dataNext[Symbol.for("trailHeadKey")];
              const view = d3.select(this);
              const circle = view.select("circle");
              const diagonalLine = view.select(".vzb-diagonal-line");
        
              const valueX = d[_this._alias("x")];
              const valueY = d[_this._alias("y")];
              const valueS = d.size;
              const valueC = d.color;
        
              //d.hidden = (!valueS && valueS !== 0) || valueX == null || valueY == null;
        
              //view.classed("vzb-hidden", d.hidden);
              d.r = VizabiSharedComponents.LegacyUtils.areaToRadius(_this.sScale(valueS || 0));
              const scaledX = _this.xScale(valueX);
              const scaledY = _this.yScale(valueY);
              const scaledC = valueC != null ? _this.cScale(valueC) : COLOR_WHITEISH;
        
              if (!duration || !headTrail) {
                circle
                  .attr("r", d.r)
                  .attr("fill", scaledC)
                  .attr("cy", scaledY)
                  .attr("cx", scaledX);
                //.transition(transition)

                if(isExtrapolated)
                  diagonalLine
                    .attr("x1", scaledX + d.r/Math.sqrt(2))
                    .attr("y1", scaledY + d.r/Math.sqrt(2))
                    .attr("x2", scaledX - d.r/Math.sqrt(2))
                    .attr("y2", scaledY - d.r/Math.sqrt(2));
                diagonalLine
                  .classed("vzb-hidden", !isExtrapolated);
        
                //trail line
                if (isTrail) {
                  const trailLine = view.select(".vzb-trail-line");

                  const scaledX0 = _this.xScale(dataNext[_this._alias("x")]);
                  const scaledY0 = _this.yScale(dataNext[_this._alias("y")]);
                  
                  trailLine
                    .attr("x1", scaledX)
                    .attr("y1", scaledY)
                    .attr("x2", scaledX0)
                    .attr("y2", scaledY0)
                    .style("stroke", scaledC)
                    .attr("stroke-dasharray", Math.abs(scaledX - scaledX0) + Math.abs(scaledY - scaledY0))
                    .attr("stroke-dashoffset", -d.r);
                }
              }
        
              if (duration && !isTrail) {
                view
                  .style("opacity", 0)
                  .transition().duration(duration*0.9)
                  .style("opacity", d[Symbol.for("opacity")]);
              }
        
              if (!isTrail) {
                _this._updateLabel(d, valueX, valueY, duration, true, false);
              }
            }),

          update => update
            .each(function(d, index) {
              
              const isTrail = isTrailBubble(d);
              const isExtrapolated = d[Symbol.for("extrapolated")];
              const dataNext = data[index + 1] || {};
              const dataNext2 = data[index + 2] || {};
              const headTrail = isTrail && !dataNext[Symbol.for("trailHeadKey")];
              const headTrail2 = isTrail && !dataNext2[Symbol.for("trailHeadKey")];
        
              const valueS = d.size;
              d.r = VizabiSharedComponents.LegacyUtils.areaToRadius(_this.sScale(valueS || 0));
              if (isTrail && !headTrail && !headTrail2) return;
        
              const valueX = d[_this._alias("x")];
              const valueY = d[_this._alias("y")];
              const valueC = d.color;
        
              //d.hidden = (!valueS && valueS !== 0) || valueX == null || valueY == null;
        
              //view.classed("vzb-hidden", d.hidden);
              const scaledX = _this.xScale(valueX);
              const scaledY = _this.yScale(valueY);
              const scaledC = valueC != null ? _this.cScale(valueC) : COLOR_WHITEISH;
        
              if (!duration || !headTrail) {
                const view = duration && !isTrail ?
                  d3.select(this).transition(transition)
                  :
                  d3.select(this).interrupt();

                view.select("circle")
                  .attr("r", d.r)
                  .attr("fill", scaledC)
                  .attr("cy", scaledY)
                  .attr("cx", scaledX);
                  
                const diagonalLine = d3.select(this).select(".vzb-diagonal-line");
                diagonalLine
                  .classed("vzb-hidden", !isExtrapolated);
                if(isExtrapolated){
                  if (duration && !isTrail){
                    diagonalLine.transition(transition)
                      .attr("x1", scaledX + d.r/Math.sqrt(2))
                      .attr("y1", scaledY + d.r/Math.sqrt(2))
                      .attr("x2", scaledX - d.r/Math.sqrt(2))
                      .attr("y2", scaledY - d.r/Math.sqrt(2));
                  } else {
                    diagonalLine.interrupt()
                      .attr("x1", scaledX + d.r/Math.sqrt(2))
                      .attr("y1", scaledY + d.r/Math.sqrt(2))
                      .attr("x2", scaledX - d.r/Math.sqrt(2))
                      .attr("y2", scaledY - d.r/Math.sqrt(2));
                  }
                }
                
                //trail line
                if (isTrail) {
                  const trailLine = d3.select(this).select(".vzb-trail-line");
                  const scaledX0 = _this.xScale(dataNext[_this._alias("x")]);
                  const scaledY0 = _this.yScale(dataNext[_this._alias("y")]);
                  
                  trailLine
                    .attr("x1", scaledX)
                    .attr("y1", scaledY);
                  if (duration && !data[index + 2][Symbol.for("trailHeadKey")]) {
                    trailLine
                      .attr("x2", scaledX)
                      .attr("y2", scaledY)
                      .transition(transition)
                      .attr("x2", scaledX0)
                      .attr("y2", scaledY0);
                  } else {
                    trailLine.interrupt()
                      .attr("x2", scaledX0)
                      .attr("y2", scaledY0);
                  }
        
                  trailLine
                    .style("stroke", scaledC)
                    .attr("stroke-dasharray", Math.abs(scaledX - scaledX0) + Math.abs(scaledY - scaledY0))
                    .attr("stroke-dashoffset", -d.r);
                }
              }
              
              if (!isTrail)
                _this._updateLabel(d, valueX, valueY, duration, false, false);    
            }),    

          exit => exit
            .each(function(d) {
              const isTrail = isTrailBubble(d);
              
              const view = duration && !isTrail ?
                d3.select(this).transition(transition)
                  .duration(duration*0.9)
                  .style("opacity", 0)
                :
                d3.select(this).interrupt();
        
              view
                .remove();
              
              if (!isTrail) 
                _this._updateLabel(d, d[_this._alias("x")], d[_this._alias("y")], duration, true, true);
            })
        )
        .order();

    }


    redrawData(duration) {
      this.services.layout.size;
      this.MDL.x.scale.type;
      this.MDL.y.scale.type;
      this.MDL.color.scale.type;
      this.MDL.size.scale.type;
      this.MDL.size.scale.extent;

      const _this = this;
      const data = this.__dataProcessed;

      if (this.bubbles) this.bubbles.each(function(d, index) {
        const isTrail = isTrailBubble(d);
        const isExtrapolated = d[Symbol.for("extrapolated")];

        const valueX = d[_this._alias("x")];
        const valueY = d[_this._alias("y")];
        const valueS = d.size;
        const valueC = d.color;

        d.r = VizabiSharedComponents.LegacyUtils.areaToRadius(_this.sScale(valueS || 0));
        const scaledX = _this.xScale(valueX);
        const scaledY = _this.yScale(valueY);
        const scaledC = valueC != null ? _this.cScale(valueC) : COLOR_WHITEISH;

        const view = duration ? 
          d3.select(this)
            .transition()
            .duration(duration)
          : d3.select(this).interrupt();

        view.select("circle")
          .attr("r", d.r)
          .attr("fill", scaledC)
          .attr("cy", scaledY)
          .attr("cx", scaledX);

        const diagonalLine = d3.select(this).select(".vzb-diagonal-line");
        diagonalLine
          .classed("vzb-hidden", !isExtrapolated);
        if(isExtrapolated){
          if (duration){
            diagonalLine.transition().duration(duration)
              .attr("x1", scaledX + d.r/Math.sqrt(2))
              .attr("y1", scaledY + d.r/Math.sqrt(2))
              .attr("x2", scaledX - d.r/Math.sqrt(2))
              .attr("y2", scaledY - d.r/Math.sqrt(2));
          } else {
            diagonalLine.interrupt()
              .attr("x1", scaledX + d.r/Math.sqrt(2))
              .attr("y1", scaledY + d.r/Math.sqrt(2))
              .attr("x2", scaledX - d.r/Math.sqrt(2))
              .attr("y2", scaledY - d.r/Math.sqrt(2));
          }
        }
        

        if (isTrail) {
          const trailLine = duration ? 
            d3.select(this).select(".vzb-trail-line")
              .transition()
              .duration(duration)
            : d3.select(this).select(".vzb-trail-line").interrupt();

          const dataNext = data[index + 1];
          const scaledX0 = _this.xScale(dataNext[_this._alias("x")]);
          const scaledY0 = _this.yScale(dataNext[_this._alias("y")]);

          trailLine
            .attr("x1", scaledX)
            .attr("y1", scaledY)
            .attr("x2", scaledX0)
            .attr("y2", scaledY0)
            .style("stroke", scaledC)
            .attr("stroke-dasharray", Math.abs(scaledX - scaledX0) + Math.abs(scaledY - scaledY0))
            .attr("stroke-dashoffset", -d.r);
        }
      });

      _this._updateLabels();
    }

    __getZoomed(type, zoomed, domain) {
      //const zoomed = values[`zoomed${type}`];
      return d3[type.toLowerCase()](zoomed !== null ? zoomed : domain);
    }

    __getZoomedMin(values, domain) {
      return this.__getZoomed("Min", values, domain);
    }

    __getZoomedMax(values, domain) {
      return this.__getZoomed("Max", values, domain);
    }

    /*
     * Zoom to the min and max values given in the URL axes markers.
     */
    _zoomToMarkerMaxMin() {
      this.services.layout.size;
      this.MDL.x.scale.type;
      this.MDL.y.scale.type;

      const panzoom = //this.ui.panzoom;
      {
        x: this.MDL.x.scale.zoomed,
        y: this.MDL.y.scale.zoomed
      };
      
      const xDomain = this.MDL.x.data.domain;
      const yDomain = this.MDL.y.data.domain;

      if (this.draggingNow) return;

      /*
       * Reset just the zoom values without triggering a zoom event. This ensures
       * a clean zoom state for the subsequent zoom event.
       */
      this._panZoom.resetZoomState();

      this.yScale.range(this._rangeBump([this.height, 0]));
      this.xScale.range(this._rangeBump([0, this.width]));
     
      /*
       * The axes may return null when there is no value given for the zoomed
       * min and max values. In that case, fall back to the axes' domain values.
       */
      const zoomedMinX = this.__getZoomedMin(panzoom.x, xDomain);
      const zoomedMaxX = this.__getZoomedMax(panzoom.x, xDomain);
      const zoomedMinY = this.__getZoomedMin(panzoom.y, yDomain);
      const zoomedMaxY = this.__getZoomedMax(panzoom.y, yDomain);

      //by default this will apply no transition and feed values back to state
      mobx.runInAction(() => {
        this._panZoom.zoomToMaxMin(zoomedMinX, zoomedMaxX, zoomedMinY, zoomedMaxY, 0, "don't feed these zoom values back to state");
      });
    }

    _resetZoomMinMaxXReaction() {
      return { concept: this.MDL.x.data.concept };
    }

    _resetZoomMinMaxX() {
      this.ui.panzoom.x = {zoomedMin: null, zoomedMax: null};
    }

    _resetZoomMinMaxYReaction() {
      return { concept: this.MDL.y.data.concept };
    }

    _resetZoomMinMaxY() {
      this.ui.panzoom.y = {zoomedMin: null, zoomedMax: null};
    }

    _drawForecastOverlay() {
      this.DOM.forecastOverlay.classed("vzb-hidden", 
        !this.ui.showForecast || 
        !this.ui.showForecastOverlay || 
        !this.ui.endBeforeForecast || 
          (this.MDL.frame.value <= this.MDL.frame.parseValue(this.ui.endBeforeForecast))
      );
    }

    _updateLayoutProfile(){
      this.services.layout.size;

      this.elementHeight = (this.element.node().clientHeight) || 0;
      this.elementWidth = (this.element.node().clientWidth) || 0;

      this.profileConstants = this.services.layout.getProfileConstants(
        PROFILE_CONSTANTS(this.elementWidth, this.elementHeight), 
        PROFILE_CONSTANTS_FOR_PROJECTOR(this.elementWidth, this.elementHeight)
      );

      if (!this.elementHeight || !this.elementWidth) return VizabiSharedComponents.LegacyUtils.warn("Chart _updateProfile() abort: container is too little or has display:none");
    }

    _getDuration() {
      return this.MDL.frame.playing ? this.MDL.frame.speed || 0 : 0;
    }

    _updateScales() {
      this.yScale = this.MDL.y.scale.d3Scale.copy();
      this.xScale = this.MDL.x.scale.d3Scale.copy();
      this._labels.setScales(this.xScale, this.yScale);
    }

    get cScale() {
      return this.MDL.color.scale.d3Scale;
    }
    
    updateUIStrings() {
      const {
        y, x, size, color
      } = this.MDL;

      this.strings = {
        title: {
          Y: VizabiSharedComponents.Utils.getConceptName(y, this.localise),
          X: VizabiSharedComponents.Utils.getConceptName(x, this.localise),
          S: VizabiSharedComponents.Utils.getConceptName(size, this.localise),
          C: VizabiSharedComponents.Utils.getConceptName(color, this.localise)
        },
        title_short: {
          Y: VizabiSharedComponents.Utils.getConceptShortName(y, this.localise),
          X: VizabiSharedComponents.Utils.getConceptShortName(x, this.localise),
          S: VizabiSharedComponents.Utils.getConceptShortName(size, this.localise),
          C: VizabiSharedComponents.Utils.getConceptShortName(color, this.localise)
        },
        subtitle: {
          Y: VizabiSharedComponents.Utils.getConceptNameMinusShortName(y, this.localise),
          X: VizabiSharedComponents.Utils.getConceptNameMinusShortName(x, this.localise)
        },
        unit: {
          Y: VizabiSharedComponents.Utils.getConceptUnit(y),
          X: VizabiSharedComponents.Utils.getConceptUnit(x),
          S: VizabiSharedComponents.Utils.getConceptUnit(size),
          C: VizabiSharedComponents.Utils.getConceptUnit(color)
        }
      };

      Promise.all([
        VizabiSharedComponents.Utils.getConceptNameCompliment(y),
        VizabiSharedComponents.Utils.getConceptNameCompliment(x),
        VizabiSharedComponents.Utils.getConceptNameCompliment(size),
        VizabiSharedComponents.Utils.getConceptNameCompliment(color)
      ]).then(mobx.action(response => {        
        [ 
          this.axisTitleComplimentStrings.Y,
          this.axisTitleComplimentStrings.X,
          this.axisTitleComplimentStrings.S,
          this.axisTitleComplimentStrings.C
        ] = response;
      }));
    }

    updateTreemenu(){
      const treemenu = this.root.findChild({type: "TreeMenu"});

      this.DOM.yTitleEl
        .classed("vzb-disabled", treemenu.state.ownReadiness !== VizabiSharedComponents.Utils.STATUS.READY)
        .on("click", () => {
          treemenu
            .encoding(this._alias("y"))
            .alignX(this.services.locale.isRTL() ? "right" : "left")
            .alignY("top")
            .updateView()
            .toggle();
        });

      this.DOM.xTitleEl
        .classed("vzb-disabled", treemenu.state.ownReadiness !== VizabiSharedComponents.Utils.STATUS.READY)
        .on("click", () => {
          treemenu
            .encoding(this._alias("x"))
            .alignX(this.services.locale.isRTL() ? "right" : "left")
            .alignY("bottom")
            .updateView()
            .toggle();
        });    
    }

    _updateSize() {
      this.services.layout.size;

      const {
        x,
        y
      } = this.MDL;
      
      const {
        graphAll,
        eventArea,
        bubbleContainerCropAll,
        labelsContainerCrop,
        xAxisElContainer,
        xAxisEl,
        yAxisElContainer,
        yAxisEl,
        projectionX,
        projectionY,
        sTitleEl,
        xTitleEl,
        yTitleEl,
        xSubTitleEl,
        ySubTitleEl,
        xAxisGroupsEl,
      } = this.DOM;

      const _this = this;

      const layoutProfile = this.services.layout.profile;

      const margin = this.profileConstants.margin;
      const infoElHeight = this.profileConstants.infoElHeight;
      const xAxisTitleBottomMargin = this.profileConstants.xAxisTitleBottomMargin;

      //labels
      this._labels.setCloseCrossHeight(_this.profileConstants.infoElHeight * 1.2);
      this._labels.setTooltipFontSize(_this.profileConstants.infoElHeight + "px");
      
      //stage
      const height = this.height = (this.elementHeight - margin.top - margin.bottom) || 0;
      const width = this.width = (this.elementWidth - margin.left * this.profileConstants.leftMarginRatio - margin.right) || 0;

      // if (height <= 0 || width <= 0) {
      //   height = 0;
      //   width = 0;
      //   utils.warn("Bubble chart updateSize(): vizabi container is too little or has display:none");
      // }

      //graph group is shifted according to margins (while svg element is at 100 by 100%)
      graphAll
        .attr("transform", "translate(" + (margin.left * this.profileConstants.leftMarginRatio) + "," + margin.top + ")");

      this._year.resizeText(width, height);
      //this.yearEl.classed("vzb-hidden", !this.ui.timeInBackground);
      //this.year.resize(width, height);
      
      eventArea
        .attr("width", width)
        .attr("height", Math.max(0, height));

      //update scales to the new range
      // // if (this.model.marker.y.scaleType !== "ordinal") {
      // //   this.yScale.range(this._rangeBump([height, 0]));
      // // } else {
      // //   this.yScale.rangePoints([height, 0], _this.profileConstants.padding).range();
      // // }
      // // if (this.model.marker.x.scaleType !== "ordinal") {
      // //   this.xScale.range(this._rangeBump([0, width]));
      // // } else {
      // //   this.xScale.rangePoints([0, width], _this.profileConstants.padding).range();
      // // }
      this.yScale.range(this._rangeBump([height, 0]));
      this.xScale.range(this._rangeBump([0, width]));

      //apply scales to axes and redraw
      this.yAxis.scale(this.yScale)
        .tickSizeInner(-width)
        .tickSizeOuter(0)
        .tickPadding(6)
        .tickSizeMinor(-width, 0)
        .labelerOptions({
          scaleType: y.scale.type,
          toolMargin: margin,
          limitMaxTickNumber: 6,
          bump: this.profileConstants.maxRadiusPx / 2,
          viewportLength: height,
          formatter: this.localise
        });

      this.xAxis.scale(this.xScale)
        .tickSizeInner(-height)
        .tickSizeOuter(0)
        .tickPadding(6)
        .tickSizeMinor(-height, 0)
        .labelerOptions({
          scaleType: x.scale.type,
          toolMargin: margin,
          bump: this.profileConstants.maxRadiusPx / 2,
          viewportLength: width,
          formatter: this.localise
        });


      bubbleContainerCropAll
        .attr("width", width)
        .attr("height", Math.max(0, height));

      labelsContainerCrop
        .attr("width", width)
        .attr("height", Math.max(0, height));

      xAxisElContainer
        .attr("width", width + 1)
        .attr("height", this.profileConstants.margin.bottom + height)
        .attr("y", -1)
        .attr("x", -1);
      xAxisEl
        .attr("transform", "translate(1," + (1 + height) + ")");

      yAxisElContainer
        .attr("width", this.profileConstants.margin.left + width)
        .attr("height", Math.max(0, height))
        .attr("x", -this.profileConstants.margin.left);
      yAxisEl
        .attr("transform", "translate(" + (this.profileConstants.margin.left - 1) + "," + 0 + ")");

      yAxisEl.call(this.yAxis);
      xAxisEl.call(this.xAxis);

      const rangeBump = this.profileConstants.maxRadiusPx;
      projectionX.attr("y1", _this.yScale.range()[0] + rangeBump);
      projectionY.attr("x2", _this.xScale.range()[0] - rangeBump);


      // reduce font size if the caption doesn't fit
      this._updateSTitle();
      sTitleEl
        .attr("text-anchor", "end")
        .attr("transform", "translate(" + width + "," + 20 + ") rotate(-90)");

      const compl = this.axisTitleComplimentStrings;
      if (layoutProfile !== "SMALL") {
        ySubTitleEl.select("text").attr("dy", infoElHeight * 0.6).text(this.strings.subtitle.Y);
        xSubTitleEl.select("text").attr("dy", -infoElHeight * 0.3).text(this.strings.subtitle.X);
        
        yTitleEl.select("text").text(this.strings.title_short.Y + (compl.Y ? " · " + compl.Y : "") + " ")
          .append("tspan")
          .style("font-size", (infoElHeight * 0.7) + "px")
          .text("▼");
        xTitleEl.select("text").text(this.strings.title_short.X + (compl.X ? " · " + compl.X : "") + " ")
          .append("tspan")
          .style("font-size", (infoElHeight * 0.7) + "px")
          .text("▼");
      } else {
        ySubTitleEl.select("text").text("");
        xSubTitleEl.select("text").text("");

        const yTitleText = yTitleEl.select("text").text(this.strings.title.Y + (compl.Y ? " · " + compl.Y : ""));
        if (yTitleText.node().getBBox().width > width) yTitleText.text(this.strings.title_short.Y + (compl.Y ? " · " + compl.Y : ""));
      
        const xTitleText = xTitleEl.select("text").text(this.strings.title.X + (compl.X ? " · " + compl.X : ""));
        if (xTitleText.node().getBBox().width > width - 100) xTitleText.text(this.strings.title_short.X) + (compl.X ? " · " + compl.X : "");      
      }

      const isRTL = this.services.locale.isRTL();
      ySubTitleEl
        .style("font-size", (infoElHeight * 0.8) + "px")
        .attr("transform", "translate(" + 0 + "," + 0 + ") rotate(-90)");
      xSubTitleEl
        .style("font-size", (infoElHeight * 0.8) + "px")
        .attr("transform", "translate(" + width + "," + height + ")");
    
      yTitleEl
        .style("font-size", infoElHeight + "px")
        .attr("transform", layoutProfile !== "SMALL" ?
          "translate(" + (-margin.left - this.profileConstants.yAxisTitleBottomMargin)  + "," + (height * 0.5) + ") rotate(-90)"
          : 
          "translate(" + (isRTL ? width : 10 - this.profileConstants.margin.left) + ", -" + this.profileConstants.yAxisTitleBottomMargin + ")");

      xTitleEl
        .style("font-size", infoElHeight + "px")
        .attr("transform", layoutProfile !== "SMALL" ?
          "translate(" + (width * 0.5) + "," + (height + margin.bottom - xAxisTitleBottomMargin) + ")"
          :
          "translate(" + (isRTL ? width : 0) + "," + (height + margin.bottom - xAxisTitleBottomMargin) + ")");
      
      xAxisGroupsEl
        .style("font-size", infoElHeight * 0.8 + "px");

      this.root.findChild({type: "_DataWarning"}).setOptions({
        width: this.elementWidth,
        height: this.elementHeight,
        vertical: "bottom", 
        horizontal: "right", 
        right: margin.right,
        bottom: xAxisTitleBottomMargin,
        wLimit: (layoutProfile !== "SMALL" ? 0.5 : 1) *
          (this.elementWidth - xTitleEl.node().getBBox().width - infoElHeight * 3)
      });

      //this.services.layout.setHGrid([this.elementWidth - marginRightAdjusted]);
      //this.ui.margin.set("left", margin.left * this.profileConstants.leftMarginRatio, false, false);

      // (function(xMin, xMax, yMin, yMax) {
      //   if ((xMin && xMax && yMin && yMax) === null) return;
      //   _this._panZoom.zoomer.dontFeedToState = true;
      //   _this._panZoom.rerun(); // includes redraw data points and trail resize
      //   _this._panZoom.zoomToMaxMin(xMin, xMax, yMin, yMax, 0, true);
      // })(_this._zoomedXYMinMax.x.zoomedMin,
      //   _this._zoomedXYMinMax.x.zoomedMax,
      //   _this._zoomedXYMinMax.y.zoomedMin,
      //   _this._zoomedXYMinMax.y.zoomedMax);
    }

    updateInfoElements() {
      this.services.layout.size;
      this.axisTitleComplimentStrings.X;
      this.axisTitleComplimentStrings.Y;

      const {xInfoEl, yInfoEl, xTitleEl, yTitleEl} = this.DOM;
      const {x, y} = this.MDL;
      const isRTL = this.services.locale.isRTL();
      const infoElHeight = this.profileConstants.infoElHeight;
      const layoutProfile = this.services.layout.profile;

      if (yInfoEl.select("svg").node()) {
        const titleBBox = yTitleEl.node().getBBox();
        const t = VizabiSharedComponents.LegacyUtils.transform(yTitleEl.node());
        const hTranslate = isRTL ? (titleBBox.x + t.translateX - infoElHeight * 1.4) : (titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4);
        const vTranslate = isRTL ? (t.translateY + infoElHeight * 1.4 + titleBBox.width * 0.5) : (t.translateY - infoElHeight * 0.4 - titleBBox.width * 0.5);
        const conceptPropsY = y.data.conceptProps;

        yInfoEl
          .classed("vzb-hidden", !conceptPropsY.description && !conceptPropsY.sourceLink || this.services.layout.projector)
          .attr("transform", layoutProfile !== "SMALL" ?
            `translate(${ t.translateX - infoElHeight * 0.8 }, ${ vTranslate }) rotate(-90)` :
            `translate(${ hTranslate },${ t.translateY - infoElHeight * 0.8 })`)
          .select("svg")
          .attr("width", infoElHeight + "px")
          .attr("height", infoElHeight + "px");
      }

      if (xInfoEl.select("svg").node()) {
        const titleBBox = xTitleEl.node().getBBox();
        const t = VizabiSharedComponents.LegacyUtils.transform(xTitleEl.node());
        const hTranslate = isRTL ? (titleBBox.x + t.translateX - infoElHeight * 1.4) : (titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4);
        const conceptPropsX = x.data.conceptProps;

        xInfoEl
          .classed("vzb-hidden", !conceptPropsX.description && !conceptPropsX.sourceLink || this.services.layout.projector)
          .attr("transform", `translate(${ hTranslate }, ${ t.translateY - infoElHeight * 0.8 })`)
          .select("svg")
          .attr("width", infoElHeight + "px")
          .attr("height", infoElHeight + "px");
      }
    }

    _rangeBump(arg, undo) {
      const bump = this.profileConstants.maxRadiusPx;
      undo = undo ? -1 : 1;
      if (VizabiSharedComponents.LegacyUtils.isArray(arg) && arg.length > 1) {
        let z1 = arg[0];
        let z2 = arg[arg.length - 1];

        //the sign of bump depends on the direction of the scale
        if (z1 < z2) {
          z1 += bump * undo;
          z2 -= bump * undo;
          // if the scale gets inverted because of bump, set it to avg between z1 and z2
          if (z1 > z2) z1 = z2 = (z1 + z2) / 2;
        } else if (z1 > z2) {
          z1 -= bump * undo;
          z2 += bump * undo;
          // if the scale gets inverted because of bump, set it to avg between z1 and z2
          if (z1 < z2) z1 = z2 = (z1 + z2) / 2;
        } else ;
        return [z1, z2];
      }
      VizabiSharedComponents.LegacyUtils.warn("rangeBump error: input is not an array or empty");
    }

    _updateSTitle(titleS, titleC) {
      const { sTitleEl } = this.DOM;
      const {
        size,
        color
      } = this.MDL;
      const compl = this.axisTitleComplimentStrings;
      // vertical text about size and color
      if (this.profileConstants.hideSTitle
        && this.root.ui.dialogs.dialogs.sidebar.indexOf("colors") > -1
        && this.root.ui.dialogs.dialogs.sidebar.indexOf("size") > -1) {
        sTitleEl.classed("vzb-invisible", true);
        return;
      }
      if (sTitleEl.classed("vzb-invisible")) {
        sTitleEl.classed("vzb-invisible", false);
      }
      const sTitleContentON = !size.data.constant;
      const cTitleContentON = !color.data.constant;
      const sTitleText = sTitleEl.select("text")
      // reset font size to remove jumpy measurement
        .style("font-size", null)
        .text(
          (sTitleContentON ? this.localise("buttons/size") + ": " + (titleS ? titleS : this.strings.title.S) : "") +
          (compl.S ? " · " + compl.S : "") +
          (sTitleContentON && cTitleContentON ? ", " : "") +
          (cTitleContentON ? this.localise("buttons/colors") + ": " + (titleC ? titleC : this.strings.title.C) : "") +
          (compl.C ? " · " + compl.C : "")
        );
      const sTitleWidth = sTitleText.node().getBBox().width;
      const remainigHeight = this.height - 30;
      const font = parseInt(sTitleText.style("font-size")) * remainigHeight / sTitleWidth;
      sTitleText.style("font-size", sTitleWidth > remainigHeight ? font + "px" : null);
    }

    processFrameData() {
      return this.__dataProcessed = this.model.dataArray;
    }

    _getTransition(duration) {
      return duration ? d3.transition()
        .duration(duration)
        .ease(d3.easeLinear) : d3.transition();
    }  

    _bubblesInteract() {
      const _this = this;

      return {
        mouseover(event, d) {
          _this.hoverBubble = true;
          _this.MDL.highlighted.data.filter.set(d);
          _this._labels.showCloseCross(d, true);
        },

        mouseout(event, d) {
          _this.hoverBubble = false;
          _this.MDL.highlighted.data.filter.delete(d);
          //_this._setTooltip();
          _this._labels.showCloseCross(d, false);
        },

        click(event, d) {
          if (_this.draggingNow) return;
          // // const isSelected = d.isSelected;
          if (!isTrailBubble(d)) _this.MDL.selected.data.filter.toggle(d);
          //_this.MDL.selected.data.filter.toggle(d);
          // // //return to highlighted state
          // // if (!utils.isTouchDevice()) {
          // //   if (isSelected) _this.model.marker.highlightMarker(d);
          // //   _this.highlightDataPoints();
        }
      };
    }
    

    _updateMarkerSizeLimits() {
      this.services.layout.size;
      this.MDL.size.scale.domain;

      const {
        minRadiusPx,
        maxRadiusPx
      } = this.profileConstants;

      //transfer min max radius to size dialog via root ui observable (probably a cleaner way is possible)
      this.root.ui.minMaxRadius = {min: minRadiusPx, max: maxRadiusPx};
      
      const extent = this.MDL.size.scale.extent || [0, 1];
      
      let minArea = VizabiSharedComponents.LegacyUtils.radiusToArea(Math.max(maxRadiusPx * extent[0], minRadiusPx));
      let maxArea = VizabiSharedComponents.LegacyUtils.radiusToArea(Math.max(maxRadiusPx * extent[1], minRadiusPx));

      let range = minArea === maxArea? [minArea, maxArea] :
        d3.range(minArea, maxArea, (maxArea - minArea)/(this.sScale.domain().length - 1)).concat(maxArea);

      this.sScale.range(range);
    }

    _setTooltip(tooltipText, x, y, s, c, d) {
      if (tooltipText) {
        const labelValues = {};
        if (d) {
          labelValues.valueY = d[this._alias("y")];
          labelValues.valueX = d[this._alias("x")];
          labelValues.valueS = d.size;
          labelValues.valueC = d.color;
          labelValues.valueLST = d.size_label || null;
          labelValues.labelText = this.__labelWithoutFrame(d, this.localise);
        }

        const tooltipCache = {};
        tooltipCache.labelX0 = this.xScale.invert(x);
        tooltipCache.labelY0 = this.yScale.invert(y);
        tooltipCache.scaledS0 = s;
        tooltipCache.scaledC0 = null;

        this._labels.setTooltip(d, tooltipText, tooltipCache, labelValues);
      } else {
        this._labels.setTooltip();
      }
    }

    _getLabelText(d) {
      return this.KEYS.map(key => d.label[key]).join(",");
      ////  + (this.model.ui.chart.timeInTrails && time && (this.model.time.start - this.model.time.end !== 0) ? " " + time : "");
    }

    _updateOpacity(selection) {
      //this.MDL.frame.value; //listen

      const highlightedFilter = this.MDL.highlighted.data.filter;
      const selectedFilter = this.MDL.selected.data.filter;

      this.__highlightedMarkers = new Map(highlightedFilter.markers);
      this.__selectedMarkers = new Map(selectedFilter.markers);
      this.__someSelected = this.__selectedMarkers.size != 0;
      this.__someHighlighted = this.__highlightedMarkers.size != 0;

      const _selection = selection || this.bubbles;
      if (_selection) _selection.style("opacity", d => this._getBubbleOpacity(d, this.ui));
    }

    _getBubbleOpacity(d) { 
      const ui = this.ui;

      if (this.__highlightedMarkers.has(d[Symbol.for("key")])) return ui.opacityHighlight;
      if (isTrailBubble(d)) return ui.opacityRegular;
      if (this.__selectedMarkers.has(d[Symbol.for("key")])) return ui.opacitySelect;

      if (this.__someSelected) return ui.opacitySelectDim;
      if (this.__someHighlighted) return ui.opacityHighlightDim;

      return ui.opacityRegular;
    }

    _setBubbleCrown(x, y, r, glow, skipInnerFill) {
      const bubbleCrown = this.DOM.bubbleCrown;
      if (x != null) {
        bubbleCrown.classed("vzb-hidden", false);
        bubbleCrown.select(".vzb-crown")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", r)
          .attr("fill", skipInnerFill ? "none" : glow);
        bubbleCrown.selectAll(".vzb-crown-glow")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", r + 10)
          .attr("stroke", glow);

      } else {
        bubbleCrown.classed("vzb-hidden", true);
      }

    }

    /*
     * Shows and hides axis projections
     */
    _axisProjections(d) {
      const {
        projectionX,
        projectionY,
        xAxisEl,
        yAxisEl
      } = this.DOM;

      if (d != null) {

        const valueY = d[this._alias("y")];
        const valueX = d[this._alias("x")];
        const radius = d.r;

        //if (!valueY && valueY !== 0 || !valueX && valueX !== 0 || !valueS && valueS !== 0) return;

        if (this.ui.whenHovering.showProjectionLineX
          && this.xScale(valueX) > 0 && this.xScale(valueX) < this.width
          && (this.yScale(valueY) + radius) < this.height) {
          projectionX
            .style("opacity", 1)
            .attr("y2", this.yScale(valueY) + radius)
            .attr("x1", this.xScale(valueX))
            .attr("x2", this.xScale(valueX));
        }

        if (this.ui.whenHovering.showProjectionLineY
          && this.yScale(valueY) > 0 && this.yScale(valueY) < this.height
          && (this.xScale(valueX) - radius) > 0) {
          projectionY
            .style("opacity", 1)
            .attr("y1", this.yScale(valueY))
            .attr("y2", this.yScale(valueY))
            .attr("x1", this.xScale(valueX) - radius);
        }

        if (this.ui.whenHovering.higlightValueX) xAxisEl.call(
          this.xAxis.highlightValue(valueX)
        );

        if (this.ui.whenHovering.higlightValueY) yAxisEl.call(
          this.yAxis.highlightValue(valueY)
        );


      } else {

        projectionX.style("opacity", 0);
        projectionY.style("opacity", 0);
        xAxisEl.call(this.xAxis.highlightValue("none"));
        yAxisEl.call(this.yAxis.highlightValue("none"));

      }

    }

    /*
     * Highlights all hovered bubbles
     */
    _highlightDataPoints() {
      const _this = this;

      const highlightedFilter = this.MDL.highlighted.data.filter;
      const selectedFilter = this.MDL.selected.data.filter;
      this.someHighlighted = highlightedFilter.any();

      //this.updateBubbleOpacity();
      const trailShow = this.MDL.trail.show;
      const trailStarts = this.MDL.trail.starts;
      const trailGroupDim = this.MDL.trail.groupDim;

      if (highlightedFilter.markers.size === 1) {
        const highlightedKey = highlightedFilter.markers.keys().next().value;
        const d = Object.assign(this.model.dataMap.getByStr(highlightedKey));
        const x = _this.xScale(d[_this._alias("x")]);
        const y = _this.yScale(d[_this._alias("y")]);
        const s = d.r;
        const c = d.color != null ? this.cScale(d.color) : COLOR_WHITEISH;
        let entityOutOfView = false;

        ////const titles = _this._formatSTitleValues(values.size[utils.getKey(d, dataKeys.size)], values.color[utils.getKey(d, dataKeys.color)]);
        ////_this._updateSTitle(titles[0], titles[1]);
        if (x + s < 0 || x - s > this.width || y + s < 0 || y - s > this.height) {
          entityOutOfView = true;
        }

        //show tooltip
        const selectedKey = d[Symbol.for("trailHeadKey")] || d[Symbol.for("key")];
        // const trailShow = this.MDL.trail.show;
        // const trailStarts = this.MDL.trail.starts;
        // const trailGroupDim = this.MDL.trail.groupDim;
        const isSelected = selectedFilter.has(selectedKey);
        const isTailTrail = !(trailStarts[selectedKey] - d[trailGroupDim]);
        const isTrail = isTrailBubble(d);

        let text = "";
        
        text = isSelected ? 
          !trailShow || isTailTrail || (!isTrail && !this.hoverBubble) ? "": this.localise(d.label[trailGroupDim])
          : 
          this.__labelWithoutFrame(d);
        
        _this._labels.highlight(null, false);
        _this._labels.highlight({ [Symbol.for("key")]: selectedKey }, true);
        if (isSelected) {
          const skipCrownInnerFill = !isTrail;
          //!d.trailStartTime || d.trailStartTime == _this.model.time.formatDate(_this.time);
          _this._setBubbleCrown(x, y, s, c, skipCrownInnerFill);
        }

        if (!entityOutOfView) {
          _this._axisProjections(d);
        }

        //set tooltip and show axis projections
        if (text && !entityOutOfView) {
          _this._setTooltip(text, x, y, s + 3, c, d);
        }

        // // const selectedData = utils.find(_this.model.marker.select, f => utils.getKey(f, KEYS) == d[KEY]);
        // // if (selectedData) {
        // //   const clonedSelectedData = utils.clone(selectedData);
        // //   //change opacity to OPACITY_HIGHLT = 1.0;
        // //   clonedSelectedData.opacity = 1.0;
        // //   _this._trails.run(["opacityHandler"], clonedSelectedData);
        // // }
      } else {
        this._axisProjections();
        ////this._trails.run(["opacityHandler"]);
        //hide tooltip
        //this._updateSTitle();
        this._setTooltip();
        this._setBubbleCrown();
        this._labels.highlight(null, false);
      }

    }

    _blinkSuperHighlighted() {
      if (!this.MDL.superHighlighted) return;

      const superHighlightFilter = this.MDL.superHighlighted.data.filter;

      this.bubbles
        .classed("vzb-super-highlighted", d => superHighlightFilter.has(d));
    }

    _selectDataPoints() {
      const _this = this;
      const selectedFilter = this.MDL.selected.data.filter;
      
      if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) {
        _this.MDL.highlighted.data.filter.clear();
        _this._labels.showCloseCross(null, false);
      } else {
        //hide tooltip
        _this._setTooltip();
        ////_this._setBubbleCrown();
      }

      // utils.forEach(_this.bubbles.data(), d => {
      //   d.isSelected = _this.model.marker.isSelected(d);
      // });

      _this.someSelected = selectedFilter.any();
      _this.nonSelectedOpacityZero = false;

    }

    _setupCursorMode() {
      const svg = this.DOM.chartSvgAll;
      if (this.ui.cursorMode === "plus") {
        svg.classed("vzb-zoomin", true);
        svg.classed("vzb-zoomout", false);
        svg.classed("vzb-panhand", false);
      } else if (this.ui.cursorMode === "minus") {
        svg.classed("vzb-zoomin", false);
        svg.classed("vzb-zoomout", true);
        svg.classed("vzb-panhand", false);
      } else if (this.ui.cursorMode === "hand") {
        svg.classed("vzb-zoomin", false);
        svg.classed("vzb-zoomout", false);
        svg.classed("vzb-panhand", true);
      } else {
        svg.classed("vzb-zoomin", false);
        svg.classed("vzb-zoomout", false);
        svg.classed("vzb-panhand", false);
      }
    }

    updateDecorations(){
      this.services.layout.size;
      this.MDL.x.scale.zoomed;
      this.MDL.y.scale.zoomed;
      this.decorations.update.bind(this)(this._getDuration());
    }

    _updateLabel(d, x, y, duration, showhide, hidden) {
      const selectedMarkers = this.MDL.selected.data.filter.markers;
      const key = d[Symbol.for("key")];
      // only for selected markers
      if (selectedMarkers.has(key)) {
        const trail = this.MDL.trail;
    
        const cache = {};

        let labelText = "";

        //if (showhide && hidden && trail.show && trailStartTime && (trailStartTime < _this.time)) showhide = false;
        if (hidden && !trail.show) showhide = true;

        if (trail.show && key in trail.starts) {
          const trailStart = trail.starts[key];
          //console.log("trailstart", trailStart)
          // if this bubble is trail start bubble
          if (trailStart >= this.MDL.frame.value || showhide) {
            const trailData = this.model.getDataMapByFrameValue(trailStart).getByStr(key);
            
            cache.labelText = labelText = this.__labelWithFrame(trailData);
            cache.labelX0 = trailData[this._alias("x")];
            cache.labelY0 = trailData[this._alias("y")];
            cache.scaledC0 = trailData.color != null ? this.cScale(trailData.color) : COLOR_WHITEISH,
            cache.scaledS0 = (trailData.size || trailData.size === 0) ? VizabiSharedComponents.LegacyUtils.areaToRadius(this.sScale(trailData.size)) : null;
            cache.valueS0 = trailData.size;
            trailData.hidden = hidden;
            this._labels.updateLabel(trailData, cache, cache.labelX0, cache.labelY0, trailData.size, trailData.color, labelText, trailData.size_label, duration, showhide);
          }
        } else {
          cache.labelText = labelText = this.__labelWithoutFrame(d);
          cache.labelX0 = x;
          cache.labelY0 = y;
          cache.scaledC0 = d.color != null ? this.cScale(d.color) : COLOR_WHITEISH,
          cache.scaledS0 = (d.size || d.size === 0) ? VizabiSharedComponents.LegacyUtils.areaToRadius(this.sScale(d.size)) : null;
          cache.valueS0 = d.size;
          d.hidden = hidden;
          this._labels.updateLabel(d, cache, x, y, d.size, d.color, labelText, d.size_label, duration, showhide);
        }
      }
    }
    
    _updateLabels() {
      //console.log("updateLabels");

      const selectedFilter = this.MDL.selected.data.filter;
      const trail = this.MDL.trail;

      for (const key of selectedFilter.markers.keys()) {
        if (!(key in trail.starts))
          continue;

        if (!this._labels.cached[key]) this._labels.cached[key] = {};
        const cache = this._labels.cached[key];

        const datamap = (trail.show ? this.model.getDataMapByFrameValue(trail.starts[key]) : this.model.dataMap);
        if (!datamap.hasByStr(key))
          continue;

        const d = datamap.getByStr(key);
        
        cache.labelText = this[(trail.show && this.ui.timeInTrails ? "__labelWithFrame" : "__labelWithoutFrame")](d);
        cache.labelX0 = d[this._alias("x")];
        cache.labelY0 = d[this._alias("y")];
        cache.scaledC0 = d.color != null ? this.cScale(d.color) : COLOR_WHITEISH,
        cache.scaledS0 = (d.size || d.size === 0) ? VizabiSharedComponents.LegacyUtils.areaToRadius(this.sScale(d.size)) : null;
        cache.valueS0 = d.size;
        cache.initTextBBox = null;
        cache.initFontSize = null;
        this._labels.updateLabel({ [Symbol.for("key")]: key }, null, null, null, null, null, null, d.size_label);
      }
    }

    __labelWithoutFrame(d) {
      if (typeof d.label == "object") 
        return Object.entries(d.label)
          .filter(entry => entry[0] != this.MDL.frame.data.concept)
          .map(entry => entry[1])
          .join(", ");
      if (d.label != null) return "" + d.label;
      return d[Symbol.for("key")];
    }

    __labelWithFrame(d) {
      const frameConcept = this.MDL.frame.data.concept;
      return this.__labelWithoutFrame(d) + " " + this.localise(d && d.label && d.label[frameConcept] || d && d.frame || this.MDL.frame.value);
    }

    _alias(enc) {
      return this.state.alias[enc] || enc;
    }
  }

  _VizabiBubbleChart.DEFAULT_UI = {
    show_ticks: true,
    showForecast: false,
    showForecastOverlay: true,
    pauseBeforeForecast: true,
    opacityHighlight: 1.0,
    opacitySelect: 1.0,
    opacityHighlightDim: 0.1,
    opacitySelectDim: 0.3,
    opacityRegular: 0.5,
    timeInBackground: true,
    timeInTrails: true,
    lockNonSelected: 0,
    numberFormatSIPrefix: true,
    panWithArrow: false,
    adaptMinMaxZoom: false,
    cursorMode: "arrow",
    zoomOnScrolling: true,
    decorations: {
      enabled: true,
      xAxisGroups: null //left to be set by external page
    },
    superhighlightOnMinimapHover: true,
    whenHovering: {
      showProjectionLineX: true,
      showProjectionLineY: true,
      higlightValueX: true,
      higlightValueY: true
    },
    labels: {
      enabled: true,
      dragging: true,
      removeLabelBox: false
    },
    margin: {
      left: 0,
      top: 0
    }
  };

  //export default BubbleChart;
  const VizabiBubbleChart = mobx.decorate(_VizabiBubbleChart, {
    "MDL": mobx.computed,
    "axisTitleComplimentStrings": mobx.observable,
    "cScale": mobx.computed
  });

  VizabiSharedComponents.Chart.add("bubblechart", VizabiBubbleChart);

  class BubbleChart extends VizabiSharedComponents.BaseComponent {

    constructor(config){

      const fullMarker = config.model.markers.bubble;
      config.Vizabi.utils.applyDefaults(fullMarker.config, BubbleChart.DEFAULT_CORE);   

      const frameType = config.Vizabi.stores.encodings.modelTypes.frame;
      const { marker, splashMarker } = frameType.splashMarker(fullMarker);
      
      config.model.markers.bubble = marker;

      config.name = "bubblechart";

      config.subcomponents = [{
        type: VizabiSharedComponents.Repeater,
        placeholder: ".vzb-repeater",
        model: marker,
        options: {
          ComponentClass: VizabiBubbleChart,
          componentCssName: "vzb-bubblechart"
        },
        name: "chart",
      },{
        type: VizabiSharedComponents.TimeSlider,
        placeholder: ".vzb-timeslider",
        model: marker,
        name: "time-slider"
      },{
        type: VizabiSharedComponents.SteppedSlider,
        placeholder: ".vzb-speedslider",
        model: marker,
        name: "speed-slider"
      },{
        type: VizabiSharedComponents.TreeMenu,
        placeholder: ".vzb-treemenu",
        model: marker,
        name: "tree-menu"
      },{
        type: VizabiSharedComponents.DataWarning,
        placeholder: ".vzb-datawarning",
        options: {button: ".vzb-datawarning-button"},
        model: marker,
        name: "data-warning"
      },{
        type: VizabiSharedComponents.DataNotes,
        placeholder: ".vzb-datanotes",
        model: marker
      },{
        type: VizabiSharedComponents.Dialogs,
        placeholder: ".vzb-dialogs",
        model: marker,
        name: "dialogs"
      },{
        type: VizabiSharedComponents.ButtonList,
        placeholder: ".vzb-buttonlist",
        model: marker,
        name: "buttons"
      },{
        type: VizabiSharedComponents.SpaceConfig,
        placeholder: ".vzb-spaceconfig",
        options: {button: ".vzb-spaceconfig-button"},
        model: marker,
        name: "space-config"
      },{
        type: VizabiSharedComponents.ErrorMessage,
        placeholder: ".vzb-errormessage",
        model: marker,
        name: "error-message"
      }];

      config.template = `
      <div class="vzb-repeater vzb-bubblechart"></div>
      <div class="vzb-animationcontrols">
        <div class="vzb-timeslider"></div>
        <div class="vzb-speedslider"></div>
      </div>
      <div class="vzb-sidebar">
        <div class="vzb-dialogs"></div>
        <div class="vzb-buttonlist"></div>
      </div>
      <div class="vzb-treemenu"></div>
      <div class="vzb-datawarning"></div>
      <div class="vzb-spaceconfig"></div>
      <div class="vzb-datanotes"></div>
      <div class="vzb-errormessage"></div>
    `;

      config.services = {
        Vizabi: new VizabiSharedComponents.CapitalVizabiService({Vizabi: config.Vizabi}),
        locale: new VizabiSharedComponents.LocaleService(config.locale),
        layout: new VizabiSharedComponents.LayoutService(config.layout)
      };

      super(config);

      this.splashMarker = splashMarker;
    }
  }

  BubbleChart.DEFAULT_UI = {
    chart: {
    }
  };

  BubbleChart.DEFAULT_CORE = {
    requiredEncodings: ["x", "y", "size"],
    encoding: {
      "selected": {
        modelType: "selection",
        data: { 
          filter: { 
            ref: "markers.bubble.encoding.trail.data.filter"
          }
        }
      },
      "highlighted": { modelType: "selection" },
      "superhighlighted": { modelType: "selection" },
      "x": { },
      "y": { },
      "order": { modelType: "order",
        data: { 
          ref: "markers.bubble.encoding.size.data.config"
        }
      },
      "size": {
        scale: {
          modelType: "size",
          range: [0, 50]
        }
      },
      "color": { scale: { modelType: "color" } },
      "label": { data: { modelType: "entityPropertyDataConfig" } },
      "frame": { modelType: "frame" },
      "trail": { modelType: "trail" },             
      "size_label": {
        data: {
          constant: "_default"
        },
        scale: {
          modelType: "size",
          allowedTypes: ["linear", "log", "genericLog", "pow", "point", "ordinal"]
        }
      },
      "repeat": {
        modelType: "repeat",
        allowEnc: ["y", "x"]
      }
    }
  };

  BubbleChart.versionInfo = { version: "3.11.1", build: 1625689243109, package: {"homepage":"https://github.com/vizabi/bubblechart#readme","name":"@vizabi/bubblechart","description":"Vizabi bubble chart"}, sharedComponents: VizabiSharedComponents.versionInfo};

  return BubbleChart;

})));
//# sourceMappingURL=bubblechart.js.map
