// https://github.com/vizabi/mountainchart#readme v3.7.2 build 1634239711575 Copyright 2021 Gapminder Foundation and contributors
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('VizabiSharedComponents'), require('mobx')) :
  typeof define === 'function' && define.amd ? define(['VizabiSharedComponents', 'mobx'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MountainChart = factory(global.VizabiSharedComponents, global.mobx));
}(this, (function (VizabiSharedComponents, mobx) { 'use strict';

  class MCMath {

    constructor(context) {
      this.context = context;

      this.xScaleFactor = 1;
      this.xScaleShift = 0;
    }

    rescale(x) {
      return Math.exp(this.xScaleFactor * Math.log(x) + this.xScaleShift);
    }
    unscale(x) {
      return Math.exp((Math.log(x) - this.xScaleShift) / this.xScaleFactor);
    }

    generateMesh(length, scaleType, domain) {
      // span a uniform mesh across the entire X scale
      // if the scale is log, the mesh would be exponentially distorted to look uniform

      const rangeFrom = scaleType === "linear" ? domain[0]
        : Math.log(this.unscale(domain[0]));

      const rangeTo = scaleType === "linear" ? domain[1]
        : Math.log(this.unscale(domain[1]));

      const rangeStep = (rangeTo - rangeFrom) / length;

      let mesh = d3.range(rangeFrom, rangeTo, rangeStep).concat(rangeTo);

      if (scaleType !== "linear") {
        mesh = mesh.map(dX => Math.exp(dX));
      } else {
        mesh = mesh.filter(dX => dX > 0);
      }

      return mesh;
    }

    gdpToMu(gdp, sigma) {
      // converting gdp per capita per day into MU for lognormal distribution
      // see https://en.wikipedia.org/wiki/Log-normal_distribution
      return Math.log(gdp / 365) - sigma * sigma / 2;
    }

    giniToSigma(gini) {
      // The ginis are turned into std deviation.
      // Mattias uses this formula in Excel: stddev = NORMSINV( ((gini/100)+1)/2 )*2^0.5
      return this.normsinv(((gini / 100) + 1) / 2) * Math.pow(2, 0.5);
    }

    // this function returns PDF values for a NORMAL distribution
    pdfNormal(x, mu, sigma) {
      return Math.exp(
        -0.5 * Math.log(2 * Math.PI)
        - Math.log(sigma)
        - Math.pow(x - mu, 2) / (2 * sigma * sigma)
      );
    }
    // this function returns PDF values for a LOGNORMAL distribution
    pdfLognormal(x, mu, sigma) {
      return Math.exp(
        -0.5 * Math.log(2 * Math.PI) //should not be different for the two scales- (scaleType=="linear"?Math.log(x):0)
        - Math.log(sigma)
        - Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma)
      );
    }

    normsinv(p) {
      //
      // Lower tail quantile for standard normal distribution function.
      //
      // This function returns an approximation of the inverse cumulative
      // standard normal distribution function.  I.e., given P, it returns
      // an approximation to the X satisfying P = Pr{Z <= X} where Z is a
      // random variable from the standard normal distribution.
      //
      // The algorithm uses a minimax approximation by rational functions
      // and the result has a relative error whose absolute value is less
      // than 1.15e-9.
      //
      // Author:      Peter John Acklam
      // (Javascript version by Alankar Misra @ Digital Sutras (alankar@digitalsutras.com))
      // Time-stamp:  2003-05-05 05:15:14
      // E-mail:      pjacklam@online.no
      // WWW URL:     http://home.online.no/~pjacklam

      // Taken from http://home.online.no/~pjacklam/notes/invnorm/index.html
      // adapted from Java code

      // An algorithm with a relative error less than 1.15*10-9 in the entire region.

      // Coefficients in rational approximations
      const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
      const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
      const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
      const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

      // Define break-points.
      const plow = 0.02425;
      const phigh = 1 - plow;

      // Rational approximation for lower region:
      if (p < plow) {
        const q = Math.sqrt(-2 * Math.log(p));
        return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
          ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
      }

      // Rational approximation for upper region:
      if (phigh < p) {
        const q = Math.sqrt(-2 * Math.log(1 - p));
        return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
          ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
      }

      // Rational approximation for central region:
      const q = p - 0.5;
      const r = q * q;
      return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);

    }


  }

  class MCDecorations{
    constructor(){
    }
      
    update(duration) {

      const _this = this;
      this.services.layout.size; //watch
      
      // x axis groups used for incomes
      const showxAxisGroups = this.ui.decorations.xAxisGroups 
        && this.ui.decorations.xAxisGroups[this.MDL.mu.data.concept] 
        && this.ui.decorations.enabled
        && this.services.layout.profile !== "SMALL";
      
      this.DOM.xAxisGroups.classed("vzb-invisible", !showxAxisGroups);
      if (showxAxisGroups) {
        const axisGroupsData = VizabiSharedComponents.Utils.injectIndexes(this.ui.decorations.xAxisGroups[this.MDL.mu.data.concept]);
        let xAxisGroups = this.DOM.xAxisGroups.selectAll(".vzb-mc-x-axis-group").data(axisGroupsData);
        
        xAxisGroups.exit().remove();
        xAxisGroups = xAxisGroups.enter().append("g").attr("class", "vzb-mc-x-axis-group")
          .each(function(){
            const view = d3.select(this);
            view.append("text").attr("class", "vzb-mc-x-axis-group-line").text("◆").style("text-anchor","middle");
            view.append("text").attr("class", "vzb-mc-x-axis-group-text");
          })
          .merge(xAxisGroups);
        
        const xAxisGroups_calcs = [];
        let useShorterLabels = false;
        
        // first pass: calculate label text sizes and margins
        xAxisGroups.each(function(d, i){
          const view = d3.select(this);
          
          const text = view.select("text.vzb-mc-x-axis-group-text")
            .text(_this.localise(d.label));
          
          const calcs = {min: d.min, max: d.max};
          
          calcs.textHeight = text.node().getBBox().height;
          calcs.textWidth = text.node().getBBox().width;
          
          calcs.boundaryMinX_px = _this.xScale(d.min || d.min === 0? d.min : d3.min(_this.xScale.domain()));
          calcs.boundaryMaxX_px = _this.xScale(d.max || d.max === 0? d.max : d3.max(_this.xScale.domain()));
          
          calcs.centerX_px = (calcs.boundaryMinX_px + calcs.boundaryMaxX_px) / 2;
          calcs.marginX_px = (Math.abs(calcs.boundaryMinX_px - calcs.boundaryMaxX_px) - calcs.textWidth) / 2;
          
          if (calcs.marginX_px - calcs.textHeight < 0) useShorterLabels = true;
          
          xAxisGroups_calcs[i] = calcs;
        });
        
        // second pass: if at least one of labels doesn't fit, switch to compact mode and recalculate text sizes and margins
        if (useShorterLabels) {
          xAxisGroups.each(function(d, i){
            const view = d3.select(this);

            const text = view.select("text.vzb-mc-x-axis-group-text")
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
          
          view.select("text.vzb-mc-x-axis-group-text")
            .transition()
            .duration(duration || 0)
            .style("text-anchor", isFirst ? "end" : isLast ? "start" : "middle")
            .attr("dy", "-1.2em")
            .attr("y", calcs.textHeight)
            .attr("x", x);
          
          view.select("text.vzb-mc-x-axis-group-line")
            .classed("vzb-invisible", isLast)
            .transition()
            .duration(duration || 0)
            .attr("dy", "-1.2em")
            .attr("y", calcs.textHeight * 0.9)
            .attr("x", calcs.boundaryMaxX_px);
        });

        xAxisGroups.select("text.vzb-mc-x-axis-group-text").on("mouseenter", function(event, d) {
          const calcs = xAxisGroups_calcs[d.i];
          const parentView = d3.select(this.parentNode);

          d3.select(this).attr("font-weight", "bold");
          parentView.append("rect").lower()
            .attr("x", calcs.boundaryMinX_px)
            .attr("width", calcs.boundaryMaxX_px - calcs.boundaryMinX_px)
            .attr("y", -_this.profileConstants.margin.top)
            .attr("height", _this.height + _this.profileConstants.margin.top);

          if (calcs.min || calcs.min === 0) parentView.append("line").lower()
            .attr("x1", calcs.boundaryMinX_px)
            .attr("x2", calcs.boundaryMinX_px)
            .attr("y1", -_this.profileConstants.margin.top)
            .attr("y2", _this.height);

          if (calcs.max || calcs.max === 0) parentView.append("line").lower()
            .attr("x1", calcs.boundaryMaxX_px)
            .attr("x2", calcs.boundaryMaxX_px)
            .attr("y1", -_this.profileConstants.margin.top)
            .attr("y2", _this.height);

        }).on("mouseleave", function() {
          const parentView = d3.select(this.parentNode);

          d3.select(this).attr("font-weight", null);
          parentView.selectAll("rect").remove();
          parentView.selectAll("line").remove();
        });
      }
      
    }
  }

  const {ICON_CLOSE} = VizabiSharedComponents.Icons;

  class MCSelectList extends VizabiSharedComponents.BaseComponent {


    setup() {

    }

    draw() {

      this.MDL = {
        frame: this.model.encoding.frame,
        color: this.model.encoding.color,
        selectedF: this.model.encoding.selected.data.filter,
        highlightedF: this.model.encoding.highlighted.data.filter
      };
      this.localise = this.services.locale.auto(this.MDL.frame.interval);

      this.addReaction(this.addAndRemoveLabels);
      this.addReaction(this.updateHighlighted);
    }

    addAndRemoveLabels(){
      const _this = this;
      this.MDL.selectedF.markers; //watch
      this.MDL.frame.value; //watch
      this.services.layout.size; //watch

      const listData = this.parent.atomicSliceData
        .concat(this.parent.groupedSliceData)
        .concat(this.parent.stackedSliceData)
        .filter(d => this.MDL.selectedF.has(d))
        .sort(this._sortLabels);

      this.labels = this.element.selectAll("g.vzb-mc-label")
        .data(listData, d => d.KEY());

      this.labels.exit().remove();
      this.labels = this.labels.enter().append("g")
        .attr("class", "vzb-mc-label")
        .each(function(d) {
          const view = d3.select(this);
          _this._buildOneLabel(view, d);
        })
        .merge(this.labels);
      
      this.redraw();
    }

    _sortLabels(a, b){
      if (a.sortValue && b.sortValue) {
        if (a.sortValue[1] === b.sortValue[1]) {
          return d3.descending(a.sortValue[0], b.sortValue[0]);
        }
        return d3.descending(a.sortValue[1], b.sortValue[1]);
      }

      if (a.aggrLevel != b.aggrLevel) {
        return d3.descending(a.aggrLevel, b.aggrLevel);
      } else if (a.aggrLevel == b.aggrLevel) {
        return d3.descending(a.yMax, b.yMax);
      }

      return 0;
    }

    _buildOneLabel(view, d){
      
      view.append("circle").attr("class", "vzb-mc-label-legend");
      view.append("text").attr("class", "vzb-mc-label-shadow vzb-mc-label-text");
      view.append("text").attr("class", "vzb-mc-label-text");

      const labelCloseGroup = view.append("g")
        .attr("class", "vzb-mc-label-x vzb-label-shadow vzb-invisible")
        .on("click", (event) => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          event.stopPropagation();
          this.MDL.highlightedF.delete(d);
          this.MDL.selectedF.toggle(d);
        });
        // .onTap(() => {
        //   this.MDL.highlightedF.delete(d);
        //   this.MDL.selectedF.toggle(d);
        // });

      if (!VizabiSharedComponents.LegacyUtils.isTouchDevice()) {
        VizabiSharedComponents.LegacyUtils.setIcon(labelCloseGroup, ICON_CLOSE)
          .select("svg")
          .attr("class", "vzb-mc-label-x-icon")
          .attr("width", "0px")
          .attr("height", "0px");

        labelCloseGroup.insert("circle", "svg");

      } else {
        labelCloseGroup.append("rect");
        labelCloseGroup.append("text")
          .attr("class", "vzb-mc-label-x-text")
          .text("Deselect");
      }

      view
        .on("mousemove", () => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          this.showCloseCross(d, true);
          this.MDL.highlightedF.set(d);
        })
        .on("mouseout", () => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          this.showCloseCross(d, false);
          this.MDL.highlightedF.delete(d);
        })
        .on("click", () => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          this.MDL.highlightedF.delete(d);
          this.MDL.selectedF.toggle(d);
        });

    }


    updateHighlighted(){
      this.MDL.highlightedF.markers; //watch
      this.labels.classed("vzb-highlight", d => this.MDL.highlightedF.has(d));
    }

    redraw() {
      const _this = this;


      if (!this.labels || !this.MDL.selectedF.any()) return;

      const sample = this.element.append("g")
        .attr("class", "vzb-mc-label")
        .append("text")
        .text("0");

      let fontHeight = sample.node().getBBox().height * 1.2;
      const fontSizeToFontHeight = parseFloat(sample.style("font-size")) / fontHeight;
      d3.select(sample.node().parentNode).remove();

      const titleHeight = this.parent.DOM.yTitle.select("text").node().getBBox().height || 0;

      const maxFontHeight = (this.parent.height - titleHeight * 3) / (this.labels.data().length + 2);
      if (fontHeight > maxFontHeight) fontHeight = maxFontHeight;

      let currentAggrLevel = "null";
      let aggrLevelSpacing = 0;

      const isRTL = this.services.locale.isRTL();

      this.labels
        .attr("transform", (d, i) => {
          if (d.aggrLevel != currentAggrLevel) aggrLevelSpacing += fontHeight;
          const spacing = fontHeight * i + titleHeight * 2 + aggrLevelSpacing;
          currentAggrLevel = d.aggrLevel;
          return "translate(" + (isRTL ? this.parent.width : 0) + "," + spacing + ")";
        })
        .each(function(d, i) {

          const view = d3.select(this).attr("id", d.KEY() + "-label-" + _this.parent.id);
          let name = "";
          if (d.key) {
            name = d.key === "all" ? _this.localise("mount/merging/world") : _this.parent._getLabelText(d);
          } else {
            name = _this.parent._getLabelText(d);
          }

          const string = name + ": " + _this.localise(d.norm) + (i === 0 ? " " + _this.localise("mount/people") : "");

          const text = view.selectAll(".vzb-mc-label-text")
            .attr("x", (isRTL ? -1 : 1) * fontHeight)
            .attr("y", fontHeight)
            .text(string)
            .style("font-size", fontHeight === maxFontHeight ? (fontHeight * fontSizeToFontHeight + "px") : null);

          const contentBBox = text.node().getBBox();

          const closeGroup = view.select(".vzb-mc-label-x");

          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) {
            const closeTextBBox = closeGroup.select("text").node().getBBox();
            closeGroup
              .classed("vzb-revert-color", true)
              .select(".vzb-mc-label-x-text")
              .classed("vzb-revert-color", true)
              .attr("x", contentBBox.width + contentBBox.height * 1.12 + closeTextBBox.width * 0.5)
              .attr("y", contentBBox.height * 0.55);

            closeGroup.select("rect")
              .attr("width", closeTextBBox.width + contentBBox.height * 0.6)
              .attr("height", contentBBox.height)
              .attr("x", contentBBox.width + contentBBox.height * 0.9)
              .attr("y", 0)
              .attr("rx", contentBBox.height * 0.25)
              .attr("ry", contentBBox.height * 0.25);
          } else {
            closeGroup
              .attr("x", contentBBox.width + contentBBox.height * 1.1)
              .attr("y", contentBBox.height / 3);

            closeGroup.select("circle")
              .attr("r", contentBBox.height * 0.4)
              .attr("cx", (isRTL ? -1 : 1) * (contentBBox.width + contentBBox.height * 1.1))
              .attr("cy", contentBBox.height / 3);

            closeGroup.select("svg")
              .attr("x", (isRTL ? -1 : 1) * (contentBBox.width + contentBBox.height * (1.1 - (isRTL ? -0.4 : 0.4))))
              .attr("y", contentBBox.height * (1 / 3 - 0.4))
              .attr("width", contentBBox.height * 0.8)
              .attr("height", contentBBox.height * 0.8);
          }

          view.select(".vzb-mc-label-legend")
            .attr("r", fontHeight / 3)
            .attr("cx", (isRTL ? -1 : 1) * fontHeight * 0.4)
            .attr("cy", fontHeight / 1.5)
            .style("fill", _this.parent.MDL.color.scale.d3Scale(d.color));

          // view.onTap((event, d) => {
          //   event.stopPropagation();
          //   _this.model.marker.highlightMarker(d.KEYS());
          //   setTimeout(() => {
          //     _this.model.marker.unhighlightMarker(d.KEYS());
          //   }, 2000);
          // });
        });
    }

    showCloseCross(d, show) {
      const key = d.KEY();
      //show the little cross on the selected label
      this.labels
        .filter(f => f.KEY() == key)
        .select(".vzb-mc-label-x")
        .classed("vzb-invisible", !show);
    }

  }

  class MCProbe extends VizabiSharedComponents.BaseComponent {

    constructor(config){
      config.template = `
      <text class="vzb-mc-probe-value vzb-shadow vzb-mc-probe-value-ul"></text>
      <text class="vzb-mc-probe-value vzb-shadow vzb-mc-probe-value-ur"></text>
      <text class="vzb-mc-probe-value vzb-shadow vzb-mc-probe-value-dl"></text>
      <text class="vzb-mc-probe-value vzb-shadow vzb-mc-probe-value-dr"></text>
      <text class="vzb-mc-probe-value vzb-mc-probe-value-ul"></text>
      <text class="vzb-mc-probe-value vzb-mc-probe-value-ur"></text>
      <text class="vzb-mc-probe-value vzb-mc-probe-value-dl"></text>
      <text class="vzb-mc-probe-value vzb-mc-probe-value-dr"></text>
      <text class="vzb-mc-probe-extremepoverty"></text>
      <line></line>
    `;

      super(config);
    }

    setup() {
      this.DOM = {
        probe: this.element,
        probeLine: this.element.select("line"),
        probeValues: this.element.selectAll(".vzb-mc-probe-value"),
        extremepovertyText: this.element.select(".vzb-mc-probe-extremepoverty")
      };
    }


    get MDL() {
      return {
        frame: this.model.encoding.frame,
        stack: this.model.encoding.stack,
        x: this.model.encoding.x
      };
    }

    draw() {
      this.localise = this.services.locale.auto(this.MDL.frame.interval);
      this.addReaction(this.redraw);
    }


    redraw(options = {}) {
      this.services.layout.size; //watch
      this.MDL.frame.value; //watch

      const stackMode = this.MDL.stack.data.constant;
      const height = this.parent.height - this.parent.profileConstants.margin.top - this.parent.profileConstants.margin.bottom;
      

      if (!options.level) options.level = this.parent.ui.probeX; //TODO: move inside

      this.DOM.probe.classed("vzb-hidden", !options.level || !this.parent.ui.showProbeX);
      if (!options.level) return;

      this.parent.DOM.xAxis.call(this.parent.xAxis.highlightValue(options.full ? options.level : "none"));

      let sumValue = 0;
      let totalArea = 0;
      let leftArea = 0;

      const _computeAreas = (d) => {
        sumValue += d.norm;
        d.shape.forEach(vertex => {
          totalArea += vertex.y;
          if (this.parent._math.rescale(vertex.x) < options.level) leftArea += vertex.y;
        });
      };

      if (stackMode === "all")
        this.parent.stackedSliceData.forEach(_computeAreas);
      else if (stackMode === "none")
        this.parent.atomicSliceData.forEach(_computeAreas);
      else
        this.parent.groupedSliceData.forEach(_computeAreas);

      const formatterPercent = d3.format(".3r");

      this.DOM.extremepovertyText
        .text(this.localise("mount/extremepoverty"))
        .classed("vzb-hidden", options.full)
        .attr("x", -height)
        .attr("y", this.parent.xScale(options.level))
        .attr("dy", "-1.15em")
        .attr("dx", "0.5em")
        .attr("transform", "rotate(-90)");

      if(!options.full) 
        this.heightOfLabels = height - this.DOM.extremepovertyText.node().getBBox().width - this.DOM.extremepovertyText.node().getBBox().height * 1.75;


      this.DOM.probeValues
        .text((d, i)=>{
          if (i === 0 || i === 4) return formatterPercent(leftArea / totalArea * 100) + "%";
          if (i === 1 || i === 5) return formatterPercent(100 - leftArea / totalArea * 100) + "%";
          if (i === 2 || i === 6) return this.localise(sumValue * leftArea / totalArea);
          if (i === 3 || i === 7) return this.localise(sumValue * (1 - leftArea / totalArea)) + " " + this.localise("mount/people");
        })
        .classed("vzb-hidden", (d, i) => !options.full && (this.parent.someSelected || (i !== 0 && i !== 4)))
        .attr("x", (d, i) => this.parent.xScale(options.level) + ([0, 4, 2, 6].includes(i) ? -6 : +5))
        .attr("y", this.heightOfLabels || (0.66 * height))
        .attr("dy", (d, i) => [0, 1, 4, 5].includes(i) ? 0 : "1.5em");

      this.DOM.probeLine
        .attr("x1", this.parent.xScale(options.level))
        .attr("x2", this.parent.xScale(options.level))
        .attr("y1", height + 6)
        .attr("y2", 0);
    }
  }

  const decorated$1 = mobx.decorate(MCProbe, {
    "MDL": mobx.computed
  });

  const {ICON_QUESTION} = VizabiSharedComponents.Icons;
  //const COLOR_BLACKISH = "rgb(51, 51, 51)";
  const COLOR_WHITEISH = "rgb(253, 253, 253)";

  const THICKNESS_THRESHOLD = 0.001;

  const PROFILE_CONSTANTS = {
    SMALL: {
      margin: { top: 10, right: 10, left: 10, bottom: 18 },
      infoElHeight: 16
    },
    MEDIUM: {
      margin: { top: 20, right: 20, left: 20, bottom: 30 },
      infoElHeight: 20
    },
    LARGE: {
      margin: { top: 30, right: 30, left: 30, bottom: 35 },
      infoElHeight: 22
    }
  };

  const PROFILE_CONSTANTS_FOR_PROJECTOR = {
    MEDIUM: {
      margin: { top: 20, right: 20, left: 20, bottom: 50 },
      infoElHeight: 26
    },
    LARGE: {
      margin: { top: 30, right: 30, left: 30, bottom: 50 },
      infoElHeight: 32
    }
  };

  // MOUNTAIN CHART COMPONENT
  class _VizabiMountainChart extends VizabiSharedComponents.BaseComponent {

    constructor(config) {
      config.subcomponents = [{
        type: VizabiSharedComponents.DateTimeBackground,
        placeholder: ".vzb-mc-date"
      },{
        name: "selectlist",
        type: MCSelectList,
        placeholder: ".vzb-mc-mountains-labels"
      },{
        name: "probe",
        type: decorated$1,
        placeholder: ".vzb-mc-probe"
      }];

      config.name = "mountainchart";

      config.template = `
      <!-- MountainChart Component -->
      <svg class="vzb-mountainchart-svg vzb-export">
        <g class="vzb-mc-graph">
          <rect class="vzb-mc-eventarea"></rect>
          <g class="vzb-mc-date"></g>

          <g class="vzb-mc-mountains-mergestacked"></g>
          <g class="vzb-mc-mountains-mergegrouped"></g>
          <g class="vzb-mc-mountains"></g>

          <g class="vzb-mc-decorations">
            <g class="vzb-mc-x-axis-groups"></g>
          </g>
  
          <g class="vzb-mc-mountains-labels"></g>

          <g class="vzb-mc-axis-y-title">
            <text></text>
          </g>

          <g class="vzb-mc-axis-x-title">
            <text></text>
          </g>

          <g class="vzb-mc-axis-info vzb-noexport"></g>

          
          <g class="vzb-mc-axis-x"></g>
          
          <g class="vzb-mc-axis-labels"></g>
          <g class="vzb-mc-probe"></g>
          
          <g class="vzb-mc-tooltip vzb-hidden">
            <rect class="vzb-tooltip-border"></rect>
            <text class="vzb-tooltip-text"></text>
          </g>
          </g>
        <rect class="vzb-mc-forecastoverlay vzb-hidden" x="0" y="0" width="100%" height="100%" fill="url(#vzb-mc-pattern-lines)" pointer-events='none'></rect>
        <g class="vzb-datawarning-button vzb-noexport"></g>
      </svg>
      <svg>
        <defs>
          <pattern id="vzb-mc-pattern-lines" x="0" y="0" patternUnits="userSpaceOnUse" width="50" height="50" viewBox="0 0 10 10"> 
            <path d='M-1,1 l2,-2M0,10 l10,-10M9,11 l2,-2' stroke='black' stroke-width='3' opacity='0.08'/>
          </pattern> 
        </defs>
      </svg>
    `;

      super(config);
    }


    setup() {

      this.DOM = {
        graph: this.element.select(".vzb-mc-graph"),
        xAxis: this.element.select(".vzb-mc-axis-x"),
        xTitle: this.element.select(".vzb-mc-axis-x-title"),
        yTitle: this.element.select(".vzb-mc-axis-y-title"),
        info: this.element.select(".vzb-mc-axis-info"),
        year: this.element.select(".vzb-mc-date"),      
        mountainMergeStackedContainer: this.element.select(".vzb-mc-mountains-mergestacked"),
        mountainMergeGroupedContainer: this.element.select(".vzb-mc-mountains-mergegrouped"),
        mountainAtomicContainer: this.element.select(".vzb-mc-mountains"),
        tooltip: this.element.select(".vzb-mc-tooltip"),
        eventArea: this.element.select(".vzb-mc-eventarea"),
        forecastOverlay: this.element.select(".vzb-mc-forecastoverlay"),
        decorations: this.element.select(".vzb-mc-decorations"),
        xAxisGroups: this.element.select(".vzb-mc-x-axis-groups")
      };

      this._date = this.findChild({type: "DateTimeBackground"});
      this._selectlist = this.findChild({name: "selectlist"});
      this._probe = this.findChild({name: "probe"});
      
      // this.element.onTap((event, d) => {
        //   this._interact()._mouseout(event, d);
        // });
        
      this.decorations = new MCDecorations(this);
      this._math = new MCMath(this);
      //this._export = new Exporter(this);
      //this._export
      //  .prefix("vzb-mc-")
      //  .deleteClasses(["vzb-mc-mountains-mergestacked", "vzb-mc-mountains-mergegrouped", "vzb-mc-mountains", "vzb-mc-date", "vzb-mc-mountains-labels", "vzb-mc-axis-labels"]);
      //this._robinhood = new RobinHood(this);

      // define path generator
      this.area = d3.area()
        .curve(d3.curveBasis)
        .x(d => this.xScale(this._math.rescale(d.x)))
        .y0(d => this.yScale(d.y0))
        .y1(d => this.yScale(d.y0 + d.y));

      //define d3 stack layout
      this.stackLayout = d3.stack()
        .order(d3.stackOrderReverse)
        .value((i, slice) => slice.shape[i].y);

      // init internal variables
      this.xScale = null;
      this.yScale = null;

      this.xAxis = VizabiSharedComponents.axisSmart("bottom");

      this.rangeRatio = 1;
      this.rangeShift = 0;
      this.mesh = [];
      this.stickySortValues = {};
      this.yMaxGlobal = 0;

    }

    get MDL(){
      return {
        frame: this.model.encoding.frame,
        selectedF: this.model.encoding.selected.data.filter,
        highlightedF: this.model.encoding.highlighted.data.filter,
        //superHighlightedF: this.model.encoding.superhighlighted.data.filter,
        norm: this.model.encoding[this.state.alias.norm || "norm"],
        mu: this.model.encoding[this.state.alias.mu || "mu"],
        sigma: this.model.encoding[this.state.alias.sigma || "sigma"],
        color: this.model.encoding[this.state.alias.color || "color"],
        label: this.model.encoding.label,
        stack: this.model.encoding.stack,
        group: this.model.encoding.group
      };
    }

    get duration(){
      //smooth animation is needed when playing, except for the case when time jumps from end to start
      if(!this.MDL.frame || !this.MDL.frame.playing) return 0;
      this.frameValue_1 = this.frameValue;
      this.frameValue = this.MDL.frame.value;
      return this.frameValue > this.frameValue_1 ? this.MDL.frame.speed : 0;
    }

    draw() {

      this.localise = this.services.locale.auto(this.MDL.frame.interval);
      this._dataNotes = this.root.findChild({name: "datanotes"});

      if (this.updateLayoutProfile()) return; //return if exists with error
      this.addReaction(this.updateGroupEncoding);
      this.addReaction(this.updateHeaderAndFooter);
      this.addReaction(this.updateScales);
      this.addReaction(this.updateYear);
      this.addReaction(this.drawForecastOverlay);
      this.addReaction(this.updateMathSettings);
      this.addReaction(this.updateSize);
      this.addReaction(this.updateMesh);
      this.addReaction(this.zoom);
      this.addReaction(this.updateMasks);
      this.addReaction(this.drawData);
      this.addReaction(this.updateSelected);
      this.addReaction(this.updateAllSlicesOpacity);
      this.addReaction(this.updateDecorations);
    }

    drawData() {
      this.services.layout.size; //watch

      this.processFrameData();
      this.computeAllShapes();
      this.createAndDeleteSlices();
      this.renderAllShapes();
    }

    updateGroupEncoding(){
      if (this._isProperty(this.MDL.color))
        this.MDL.group.data.config.concept = this.MDL.color.data.concept;
    }

    updateLayoutProfile(){
      this.services.layout.size; //watch

      this.profileConstants = this.services.layout.getProfileConstants(PROFILE_CONSTANTS, PROFILE_CONSTANTS_FOR_PROJECTOR);
      this.height = this.element.node().clientHeight || 0;
      this.width = this.element.node().clientWidth || 0;

      if (!this.height || !this.width) return VizabiSharedComponents.LegacyUtils.warn("Chart _updateProfile() abort: container is too little or has display:none");
    }

    updateHeaderAndFooter() {
      const _this = this;

      this.DOM.xTitle.select("text")
        .text(this.localise("unit/mountainchart_hardcoded_income_per_day"));

      this.DOM.yTitle.select("text")
        .text(this.localise("mount/title"));

      VizabiSharedComponents.LegacyUtils.setIcon(this.DOM.info, ICON_QUESTION).select("svg").attr("width", "0px").attr("height", "0px");

      this.DOM.info.on("click", () => {
        this._dataNotes.pin();
      });
      this.DOM.info.on("mouseover", function() {
        const rect = this.getBBox();
        const coord = VizabiSharedComponents.LegacyUtils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
        const toolRect = _this.root.element.node().getBoundingClientRect();
        const chartRect = _this.element.node().getBoundingClientRect();
        _this._dataNotes.setEncoding(_this.MDL.norm).show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
      });
      this.DOM.info.on("mouseout", () => {
        _this._dataNotes.hide();
      });

      this.DOM.eventArea
        .on("mousemove", function(event) {
          if (_this._isDragging()) return;
          if (!_this.ui.showProbeX) return;
          _this._probe.redraw({
            level: _this.xScale.invert(d3.pointer(event)[0]),
            full: true
          });
        })
        .on("mouseout", () => {
          if (this._isDragging()) return;
          if (!this.ui.showProbeX) return;
          this._probe.redraw();
        });
    }

    updateScales() {
      //fetch scales, or rebuild scales if there are none, then fetch
      this.yScale = this.MDL.norm.scale.d3Scale;
      this.xScale = this.MDL.mu.scale.d3Scale;
    }

    drawForecastOverlay() {
      this.DOM.forecastOverlay.classed("vzb-hidden", 
        !this.ui.showForecast || 
        !this.ui.showForecastOverlay || 
        !this.ui.endBeforeForecast || 
        (this.MDL.frame.value <= this.MDL.frame.parseValue(this.ui.endBeforeForecast))
      );
    }

    updateYear() {
      this._date.setText(this.MDL.frame.value, this.duration);    
    }

    updateMathSettings(){
      this._math.xScaleFactor = this.MDL.mu.config.xScaleFactor;
      this._math.xScaleShift = this.MDL.mu.config.xScaleShift;
    }

    updateSize() {
      this.services.layout.size; //watch

      const {
        margin,
        infoElHeight,
      } = this.profileConstants;

      const width = this.width - margin.left - margin.right;
      const height = this.height - margin.top - margin.bottom;

      //graph group is shifted according to margins (while svg element is at 100 by 100%)
      this.DOM.graph.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const isRTL = this.services.locale.isRTL();

      //year is centered and resized
      this._date
        .setConditions({
          topOffset: this.services.layout.profile === "LARGE" ? margin.top * 2 : 0,
          xAlign: this.services.layout.profile === "LARGE" ? (isRTL ? "left" : "right") : "center",
          yAlign: this.services.layout.profile === "LARGE" ? "top" : "center",
          widthRatio: this.services.layout.profile === "LARGE" ? 3 / 8 : 8 / 10
        })
        .resizeText(width, height);

      //update scales to the new range
      this.yScale.range([height, 0]);
      this.xScale.range([this.rangeShift, width * this.rangeRatio + this.rangeShift]);

      //axis is updated
      this.xAxis.scale(this.xScale)
        .tickSizeOuter(0)
        .tickPadding(9)
        .tickSizeMinor(3, 0)
        .labelerOptions({
          scaleType: this.MDL.mu.scale.type || "log",
          toolMargin: margin,
          pivotingLimit: margin.bottom * 1.5,
          method: this.xAxis.METHOD_REPEATING,
          stops: this.ui.xLogStops,
          formatter: this.localise
        });

      this.DOM.xAxis
        .attr("transform", "translate(0," + height + ")")
        .call(this.xAxis);

      this.DOM.xTitle.select("text")
        .attr("transform", "translate(" + width + "," + height + ")")
        .attr("dy", "-0.36em");

      this.DOM.yTitle
        .style("font-size", infoElHeight + "px")
        .attr("transform", "translate(" + (isRTL ? width : 0) + "," + margin.top + ")");

      this.DOM.xAxisGroups
        .style("font-size", infoElHeight * 0.8 + "px");

      const titleBBox = this.DOM.yTitle.node().getBBox();
      const t = VizabiSharedComponents.LegacyUtils.transform(this.DOM.yTitle.node());

      if (this.DOM.info.select("svg").node()) {
        const hTranslate = isRTL ? (titleBBox.x + t.translateX - infoElHeight * 1.4) : (titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4);

        this.DOM.info.select("svg")
          .attr("width", infoElHeight + "px")
          .attr("height", infoElHeight + "px");
        this.DOM.info.attr("transform", "translate("
          + hTranslate + ","
          + (t.translateY - infoElHeight * 0.8) + ")");
      }

      this.root.findChild({type: "_DataWarning"}).setOptions({
        width: this.width,
        height: this.height,
        vertical: "top", 
        horizontal: isRTL ? "right" : "left",
        left: margin.left,
        right: margin.right,
        top: margin.top + t.translateY + infoElHeight/2,
        wLimit: this.width - titleBBox.width - infoElHeight * 2
      });

      this.DOM.eventArea
        .attr("y", height)
        .attr("width", width)
        .attr("height", margin.bottom);
    }

    updateMesh(){
      this.mesh = this._math.generateMesh(
        this.ui.xPoints, 
        this.MDL.mu.scale.type || "log", 
        this.xScale.domain()
      );
      
      //rbh
      //this._robinhood.findMeshIndexes(this.mesh);
    }

    updateDecorations(){
      this.services.layout.size;
      this.MDL.mu.config;
      this.decorations.update.bind(this)(this.duration);
    }

    zoom() {
      const mdlcfg = this.MDL.mu.config;
      const {
        margin,
      } = this.profileConstants;
      const width = this.width - margin.left - margin.right;

      if (mdlcfg.zoomedMin == null && this.MDL.mu.scale.domain[0] == null || mdlcfg.zoomedMax == null && this.MDL.mu.scale.domain[1] == null) return;

      const x1 = this.xScale(mdlcfg.zoomedMin || this.MDL.mu.scale.domain[0]);
      const x2 = this.xScale(mdlcfg.zoomedMax || this.MDL.mu.scale.domain[1]);
      // if we have same x1 and x2 then divider will be 0 and rangeRation will become -Infinity
      if (!isFinite(x1) || !isFinite(x2) || x1 === x2) return;

      this.rangeRatio = width / (x2 - x1) * this.rangeRatio;
      this.rangeShift = (this.rangeShift - x1) / (x2 - x1) * width;

      this.xScale.range([this.rangeShift, width * this.rangeRatio + this.rangeShift]);

      this.DOM.xAxis.call(this.xAxis);
    }

    updateMasks() {
      const tailFatX = this._math.unscale(this.MDL.mu.config.tailFatX);
      const tailCutX = this._math.unscale(this.MDL.mu.config.tailCutX);
      const tailFade = this.MDL.mu.config.tailFade;
      const k = 2 * Math.PI / (Math.log(tailFatX) - Math.log(tailCutX));
      const m = Math.PI - Math.log(tailFatX) * k;

      this.spawnMask = [];
      this.cosineShape = [];
      this.cosineArea = 0;

      this.mesh.forEach((dX, i) => {
        this.spawnMask[i] = dX < tailCutX ? 1 : (dX > tailFade * 7 ? 0 : Math.exp((tailCutX - dX) / tailFade));
        this.cosineShape[i] = (dX > tailCutX && dX < tailFatX ? (1 + Math.cos(Math.log(dX) * k + m)) : 0);
        this.cosineArea += this.cosineShape[i];
      });
    }

    //TODO rewrite old understandings
    _isProperty(mdl){
      return mdl.data.space && mdl.data.space.length == 1 && !mdl.data.constant && mdl.data.concept != this.MDL.frame.data.concept;
    }

    processFrameData() {
      
      this.atomicSliceData = this.model.dataArray
        .concat() //copy array in order to avoid sorting in place
        .filter(d => d[this._alias("mu")] && d[this._alias("norm")] && d[this._alias("sigma")])
        .map(d => {
          d.KEY = () => d[Symbol.for("key")];
          if (this.stickySortValues[d.KEY()] == null) this.stickySortValues[d.KEY()] = d[this._alias("norm")];
          d.sortValue = [this.stickySortValues[d.KEY()] || 0, 0];
          d.aggrLevel = 0;
          return d;
        })
        //1-st level sort: pre-sort atomic slices, this sort will be retained in grouping and stacking
        .sort((a, b) => b.sortValue[0] - a.sortValue[0]);

      const groupManualSort = this.MDL.group.manualSorting;
      const isManualSortCorrect = VizabiSharedComponents.LegacyUtils.isArray(groupManualSort) && groupManualSort.length > 1;
      const sortValuesForGroups = {};

      this.groupedSliceData = d3.groups(this.atomicSliceData, d => this._isProperty(this.MDL.stack)? d.stack: d.group)
        //the output comes in a form of [[key, values[]],[],[]], convert each array to object
        .map(([key, values]) => ({key, values}));

      this.groupedSliceData.forEach(group => {
        let groupSortValue = 0;

        if (isManualSortCorrect)
          groupSortValue = groupManualSort.includes(group.key) ? groupManualSort.length - 1 - groupManualSort.indexOf(group.key) : -1;
        else
          groupSortValue = d3.sum(group.values.map(m => m.sortValue[0]));

        group.values.forEach(d => {
          d.sortValue[1] = groupSortValue;
        });

        sortValuesForGroups[group.key] = groupSortValue;
        group[Symbol.for("key")] = group.key;
        group.KEY = () => group.key;
        group.aggrLevel = 1;
      });


      if (this.MDL.stack.data.constant === "none") {
        this.stackedSliceData = [];

      } else {
        this.stackedSliceData = d3.groups(this.atomicSliceData, d => d.stack, d => d.group)
          //the output comes in a form of [[key, values[]],[],[]], convert each array to object, do that for both layers
          .map(([key, values])=>({key, values: values.map(([key, values])=>({key, values}))}));
          
        this.stackedSliceData.forEach(stack => {
          //groups are sorted inside a stack
          stack.values.sort((a, b) => sortValuesForGroups[b.key] - sortValuesForGroups[a.key]);
          stack[Symbol.for("key")] = stack.key;
          stack.KEY = () => stack.key;
          stack.aggrLevel = 2;
        });

        //2-nd level sort: atomic slices are sorted by groups
        this.atomicSliceData.sort((a, b) => b.sortValue[1] - a.sortValue[1]);
      }
    }

    createAndDeleteSlices() {    

      //bind the data to DOM elements
      this.mountainsMergeStacked = this.DOM.mountainAtomicContainer
        .selectAll(".vzb-mc-mountain.vzb-mc-aggrlevel2")
        .data(this.stackedSliceData, d => d.KEY());
      this.mountainsMergeGrouped = this.DOM.mountainAtomicContainer
        .selectAll(".vzb-mc-mountain.vzb-mc-aggrlevel1")
        .data(this.groupedSliceData, d => d.KEY());
      this.mountainsAtomic = this.DOM.mountainAtomicContainer
        .selectAll(".vzb-mc-mountain.vzb-mc-aggrlevel0")
        .data(this.atomicSliceData, d => d.KEY());

      this.mountainsMergeStacked = this.mountainsMergeStacked.join(
        enter => enter.append("path")
          .attr("class", "vzb-mc-mountain vzb-mc-aggrlevel2")
          .attr("id", d => `vzb-mc-slice-${d.KEY()}-${this.id}`)
          .call(this._interact.bind(this))
      );
      this.mountainsMergeGrouped = this.mountainsMergeGrouped.join(
        enter => enter.append("path")
          .attr("class", "vzb-mc-mountain vzb-mc-aggrlevel1")
          .attr("id", d => `vzb-mc-slice-${d.KEY()}-${this.id}`)
          .call(this._interact.bind(this))
      );
      this.mountainsAtomic = this.mountainsAtomic.join(
        enter => enter.append("path")
          .attr("class", "vzb-mc-mountain vzb-mc-aggrlevel0")
          .attr("id", d => `vzb-mc-slice-${d.KEY()}-${this.id}`)
          .call(this._interact.bind(this))
      );

      this.mountains = this.DOM.mountainAtomicContainer.selectAll(".vzb-mc-mountain")
        .order();
    }

    computeAllShapes() {
      const stackMode = this.MDL.stack.data.constant;

      //spawn the original mountains
      this.atomicSliceData.forEach((d) => {
        d.shape = this._spawnShape(d);
        d.hidden = d.shape.length === 0;
      });

      //rbh
      //this._robinhood.adjustCached();

      //recalculate shapes depending on stacking: shift baseline y0 of each shape
      if (stackMode !== "none") {
        this.stackedSliceData.forEach(stack => {
          let slicesToStack = [];
          stack.values.forEach(group => {
            slicesToStack = slicesToStack.concat(group.values.filter(f => !f.hidden));
          });
          this.stackLayout
            .keys(slicesToStack)(d3.range(this.mesh.length))
            .forEach((vertices, sliceIndex) => {
              const slice = slicesToStack[sliceIndex];
              vertices.forEach((d, i) => {
                slice.shape[i].y0 = d[0];
              });
            });
        });
      }

      //save yMax of each slice, stacked or not
      this.atomicSliceData.forEach(d => {
        d.yMax = d3.max(d.shape.map(m => m.y0 + m.y));
      });

      //recalcuate the merge-stacking slice shape
      if (stackMode == "all") {
        this.stackedSliceData.forEach(d => {
          const firstLast = this._getFirstAndLastSlicesInGroup(d);
          d.shape = this._getMergedShape(firstLast);
          d[this._alias("norm")] = this._sumLeafSlicesByEncoding(d, this._alias("norm"));
          d[this._alias("color")] = "_default";
          d.yMax = firstLast.first.yMax;
        });
      }

      //recalculate the merge-grouping slice shapes
      if (stackMode !== "none") {
        this.groupedSliceData.forEach(d => {
          const firstLast = this._getFirstAndLastSlicesInGroup(d);
          d.shape = this._getMergedShape(firstLast);
          d[this._alias("norm")] = this._sumLeafSlicesByEncoding(d, this._alias("norm"));
          d[this._alias("color")] = firstLast.first[this._alias("color")];
          d.yMax = firstLast.first.yMax;
          d.values.forEach(v => v.yMaxGroup = d.yMax);
        });
      }

      //push yMaxGlobal up so shapes can fit
      this.atomicSliceData.forEach(d => {
        if (this.yMaxGlobal < d.yMax) this.yMaxGlobal = d.yMax;
        if (this.yMaxGlobal < this.ui.yMaxMethod) this.yMaxGlobal = this.ui.yMaxMethod;
      });

      this._adjustMaxY();

      //sort slices again: this time to order DOM-elements correctly
      if (stackMode === "none") {
        //reorder slices to put the tallest in the back (only now we know yMax, couldn't do this earlier)
        this.atomicSliceData.sort((a, b) => b.yMax - a.yMax);
      } else if (stackMode === "all") ; else {
        //reorder merged group slices or atomic shapes to put the tallest in the back
        if (this._isMergingGroups())
          this.groupedSliceData.sort((a, b) => b.yMax - a.yMax);
        else
          this.atomicSliceData.sort((a, b) => b.yMaxGroup - a.yMaxGroup);
      }
    }
    
    renderAllShapes() {
      const _this = this;
      const mergeStacked = this.MDL.stack.config.merge;
      const mergeGrouped = this._isMergingGroups();

      this.mountainsMergeStacked.each(function(d) {
        const view = d3.select(this);
        const hidden = !mergeStacked;
        const selected = false;
        _this._renderShape(view, d, hidden, selected);
      });

      this.mountainsMergeGrouped.each(function(d) {
        const view = d3.select(this);
        const selected = _this.MDL.selectedF.has(d);
        const hidden = !mergeGrouped || (mergeStacked && !selected);
        _this._renderShape(view, d, hidden, selected);
      });

      this.mountainsAtomic.each(function(d) {
        const view = d3.select(this);
        const selected = _this.MDL.selectedF.has(d);
        const hidden = d.hidden || (mergeGrouped || mergeStacked) && !selected;
        _this._renderShape(view, d, hidden, selected);
      });

      // exporting shapes for shape preloader. is needed once in a while
      // if (!this.shapes) this.shapes = {}
      // this.shapes[this.model.time.value.getUTCFullYear()] = {
      //     yMax: d3.format(".2e")(this.yMax),
      //     shape: this.cached["all"].map(function (d) {return d3.format(".2e")(d[this._alias("norm")]);})
      // }
    }

    _renderShape(view, d, hidden, selected) {
      view.classed("vzb-hidden", hidden);

      if (hidden) return;

      const transition = this.duration 
        ? view.transition().duration(this.duration).ease(d3.easeLinear) 
        : view.interrupt();

      if (selected)
        transition.attr("d", this.area(d.shape.filter(f => f.y > d[this._alias("norm")] * THICKNESS_THRESHOLD)));
      else        
        transition.attr("d", this.area(d.shape));

      const color = d[this._alias("color")];
      if (color)
        transition.style("fill", this.MDL.color.scale.d3Scale(color));
      else
        transition.style("fill", COLOR_WHITEISH);

      //fancy appear of the slices that were hidden
      if (!this._isDragging() && !this.MDL.frame.playing && this.MDL.stack.data.constant !== "none" && !selected) {
        view
          .style("stroke-opacity", 0)
          .transition().duration(Math.random() * 900 + 100).ease(d3.easeCircle)
          .style("stroke-opacity", 0.5);
      }

      // if (this.model.time.record) this._export.write({
      //   type: "path",
      //   id: key,
      //   time: this.model.time.value.getUTCFullYear(),
      //   fill: this.MDL.color.scale.d3Scale(valuesPointer.color[key]),
      //   d: this.area(this.cached[key])
      // });
    }

    _getLabelText(d) {
      if(d.aggrLevel == 2)
        return this.localise("mount/stacking/world") || d.key;
      if(d.aggrLevel == 1) {
        //TODO: is there a better way?
        const legend = this.root.model.markers.legend;
        if (!legend) return d.key;
        const legendItem = legend.dataArray.find(f => f[this.MDL.group.data.concept] == d.key) || {};      
        return legendItem.name || d.key;
      }
      if (typeof d.label == "object") 
        return Object.entries(d.label)
          .filter(entry => entry[0] != this.MDL.frame.data.concept)
          .map(entry => VizabiSharedComponents.LegacyUtils.isNumber(entry[1]) ? (entry[0] + ": " + entry[1]) : entry[1])
          .join(", ");
      if (d.label != null) return "" + d.label;
      return d[Symbol.for("key")];
    }

    _interact(selection){
      selection
        .on("mousemove", (event, d) => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          if (this._isDragging() || this.MDL.frame.playing) return;
          this.MDL.highlightedF.set(d);
          this._setTooltip(event, this._getLabelText(d));
        })
        .on("mouseout", (event, d) => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          if (this._isDragging() || this.MDL.frame.playing) return;
          this._setTooltip();
          this.MDL.highlightedF.delete(d);
        })
        .on("click", (event, d) => {
          if (VizabiSharedComponents.LegacyUtils.isTouchDevice()) return;
          if (this._isDragging() || this.MDL.frame.playing) return;
          this.MDL.selectedF.toggle(d);
        })
        .onTap((event, d) => {
          if (this._isDragging() || this.MDL.frame.playing) return;
          this.MDL.selectedF.toggle(d);
          event.stopPropagation();
        });
    }

    updateSelected() {
      this.MDL.selectedF.markers; //watch
      this.someSelected = this.MDL.selectedF.any();

      this.nonSelectedOpacityZero = false;
      this.mountains.classed("vzb-selected", d => this.MDL.selectedF.has(d));
    }

    _sumLeafSlicesByEncoding(branch, enc) {
      if (branch.values)
        return d3.sum(branch.values.map(m => this._sumLeafSlicesByEncoding(m, enc)));
      else
        return branch[enc];    
    }

    updateAllSlicesOpacity() {
      this.MDL.selectedF.markers; //watch
      this.MDL.highlightedF.markers; //watch

      const OPACITY_HIGHLT = 1.0;
      const OPACITY_HIGHLT_DIM = 0.3;
      const OPACITY_SELECT = 1.0;
      const OPACITY_REGULAR = this.ui.opacityRegular;
      const OPACITY_SELECT_DIM = this.ui.opacitySelectDim;

      this.someHighlighted = this.MDL.highlightedF.any();

      this.mountains.style("opacity", d => {

        if (this.someHighlighted) {
          //highlight or non-highlight
          if (this.MDL.highlightedF.has(d)) return OPACITY_HIGHLT;
        }

        if (this.someSelected) {
          //selected or non-selected
          return this.MDL.selectedF.has(d) ? OPACITY_SELECT : OPACITY_SELECT_DIM;
        }

        if (this.someHighlighted) return OPACITY_HIGHLT_DIM;

        return OPACITY_REGULAR;
      });

      const nonSelectedOpacityZero = this.ui.opacitySelectDim < 0.01;

      // when pointer events need update...
      if (nonSelectedOpacityZero !== this.nonSelectedOpacityZero) {
        this.mountainsAtomic.style("pointer-events", d => {
          if (!this.someSelected || !nonSelectedOpacityZero || this.MDL.selectedF.has(d)) 
            return "visible";
          else
            return "none";
        });
      }

      this.nonSelectedOpacityZero = nonSelectedOpacityZero;
    }



    _getFirstAndLastSlicesInGroup(group) {
      let visible = [], visible2 = [];
      let first, last;

      if (group.aggrLevel == 2) {
        visible = group.values[0].values.filter(f => !f.hidden);
        visible2 = group.values[group.values.length - 1].values.filter(f => !f.hidden);
        first = visible[0];
        last = visible2[visible2.length - 1];
      }
      if (group.aggrLevel == 1) {
        visible = group.values.filter(f => !f.hidden);
        first = visible[0];
        last = visible[visible.length - 1];
      }

      if (!first || !last) VizabiSharedComponents.LegacyUtils.warn("mountain chart failed to generate shapes. check the incoming data");

      return {first, last};
    }

    _getMergedShape({first, last}) {
      return this.mesh.map((m, i) => {
        return {
          x: m,
          y0: last.shape[i].y0,
          y: first.shape[i].y0 + first.shape[i].y - last.shape[i].y0
        };
      });
    }

    _spawnShape(d) {
      const norm = d[this._alias("norm")];
      const sigma = this.ui.directSigma ?
        d[this._alias("sigma")] :
        this._math.giniToSigma(d[this._alias("sigma")]);
      
      const mu = this.ui.directMu ?
        d[this._alias("mu")] :
        this._math.gdpToMu(d[this._alias("mu")], sigma);

      if (!norm || !mu || !sigma) return [];

      const distribution = [];
      let acc = 0;

      this.mesh.forEach((dX, i) => {
        distribution[i] = this._math.pdfLognormal(dX, mu, sigma);
        acc += this.spawnMask[i] * distribution[i];
      });

      const result = this.mesh.map((dX, i) => ({
        x: dX,
        y0: 0,
        y: norm * (distribution[i] * (1 - this.spawnMask[i]) + this.cosineShape[i] / this.cosineArea * acc)
      }));

      return result;
    }

    _adjustMaxY() {
      this.yScale.domain([0, Math.round(this.yMaxGlobal)]);
    }

    _isMergingGroups() {
      return this.MDL.group.config.merge
        //merge the grouped entities to save performance during dragging or playing      
        //except when stacking is off
        || (this._isDragging() || this.MDL.frame.playing) && this.MDL.stack.data.constant !== "none";
    }

    _isDragging(){
      const timeslider = this.root.findChild({type: "TimeSlider"});
      return timeslider && timeslider.ui.dragging;
    }

    _setTooltip(event, tooltipText) {
      if (tooltipText) {
        const mouse = d3.pointer(event);

        //position tooltip
        this.DOM.tooltip.classed("vzb-hidden", false)
          .attr("transform", "translate(" + (mouse[0]) + "," + (mouse[1]) + ")")
          .selectAll("text")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .text(tooltipText);

        const contentBBox = this.DOM.tooltip.select("text").node().getBBox();

        this.DOM.tooltip.select("rect")
          .attr("width", contentBBox.width + 8)
          .attr("height", contentBBox.height + 8)
          .attr("x", -contentBBox.width - 25)
          .attr("y", -contentBBox.height - 25)
          .attr("rx", contentBBox.height * 0.2)
          .attr("ry", contentBBox.height * 0.2);

        this.DOM.tooltip.selectAll("text")
          .attr("x", -contentBBox.width - 25 + ((contentBBox.width + 8) / 2))
          .attr("y", -contentBBox.height - 25 + ((contentBBox.height + 11) / 2)); // 11 is 8 for margin + 3 for strokes
        const translateX = (mouse[0] - contentBBox.width - 25) > 0 ? mouse[0] : (contentBBox.width + 25);
        const translateY = (mouse[1] - contentBBox.height - 25) > 0 ? mouse[1] : (contentBBox.height + 25);
        this.DOM.tooltip
          .attr("transform", "translate(" + translateX + "," + translateY + ")");

      } else {

        this.DOM.tooltip.classed("vzb-hidden", true);
      }
    }

    _alias(enc) {
      return this.state.alias[enc] || enc;
    }

  }

  _VizabiMountainChart.DEFAULT_UI = {
    //TODO: why must forecast options be in page config for speed dialog to work
    opacitySelectDim: 0.3,
    opacityRegular: 0.7,
    robinhood: {
      enabled: false,
      xTax: [100],
      yTax: [100]
    },
    decorations: {
      enabled: true,
      xAxisGroups: null
    },
    manualSortingEnabled: true,
    yMaxMethod: 2651276116,
    showProbeX: true,
    probeX: 1.85,
    xLogStops: [1, 2, 5],
    xPoints: 50,
    directSigma: false, //false = input is gini, true = input is standatd deviation of the distribution
    directMu: false, //false = input is GDP/capita, true = input is mean of the distribution
    preload: "income_mountains",
    preloadKey: "world"
  };


  const VizabiMountainChart = mobx.decorate(_VizabiMountainChart, {
    "MDL": mobx.computed,
    "duration": mobx.computed
  });

  /*
   * stack dialog
   */
  class Stack extends VizabiSharedComponents.Dialog {

    constructor(config){
      config.template = `
      <div class='vzb-dialog-modal'>
        <div class="vzb-dialog-title">
          <span data-localise="buttons/stack"></span>
        </div>
        
        <div class="vzb-dialog-content">
          <form class="vzb-howtostack vzb-dialog-paragraph">
            <!--p class="vzb-dialog-sublabel" data-localise="hints/mount/howtostack"></p-->
            <label> <input type="radio" name="stack" value="none"> <span data-localise="mount/stacking/none"></span> </label>
            <label> <input type="radio" name="stack" value="bycolor"> <span data-localise="mount/stacking/color"></span> </label>
            <label> <input type="radio" name="stack" value="all" data-localise="mount/stacking/world"> <span data-localise="mount/stacking/world"></span> </label>
          </form>
          
          <form class="vzb-howtomerge vzb-dialog-paragraph">
            <p class="vzb-dialog-sublabel"> <span data-localise="hints/mount/howtomerge"></span></p>
            <label> <input type="radio" name="merge" value="none"> <span data-localise="mount/merging/none"></span> </label>
            <label> <input type="radio" name="merge" value="grouped"> <span data-localise="mount/merging/color"></span> </label>
            <label> <input type="radio" name="merge" value="stacked"> <span data-localise="mount/merging/world"></span> </label>
          </form>
          
          <form class="vzb-manual-sorting">
            <p class="vzb-dialog-sublabel" data-localise="mount/manualSorting"></p>
            <div class="vzb-dialog-draggablelist vzb-dialog-control"></div>
          </form>
        </div>
      </div>
    `;
      config.subcomponents = [
      //   type: DraggableList,
      //   name: "draggablelist",
      //   placeholder: ".vzb-dialog-draggablelist"
      // model: ["state.marker.group", "state.marker.color", "locale", "ui.chart"],
      // groupID: "manualSorting",
      // isEnabled: "manualSortingEnabled",
      // dataArrFn: _this.manualSorting.bind(_this),
      // lang: ""
      ];
     
      super(config);
    }

    setup(options) {
      super.setup(options);
      const _this = this;

      this.DOM.howToStack = this.element.select(".vzb-howtostack").selectAll("input")
        .on("change", function() {
          _this.setModel("stack", d3.select(this).node().value);
        });

      this.DOM.howToMerge = this.element.select(".vzb-howtomerge").selectAll("input")
        .on("change", function() {
          _this.setModel("merge", d3.select(this).node().value);
        });
    }

    get MDL() {
      return {
        color: this.model.encoding.color,
        group: this.model.encoding.group,
        stack: this.model.encoding.stack
      };
    }  

    draw(){
      super.draw();
      this.addReaction(this.updateView);
    }

    updateView() {
      const _this = this;

      this.DOM.howToStack
        .property("checked", function() {
          if (d3.select(this).node().value === "none") 
            return _this.MDL.stack.data.constant === "none";
          if (d3.select(this).node().value === "bycolor") 
            return _this.MDL.stack.data.concept === _this.MDL.color.data.concept;
          if (d3.select(this).node().value === "all") 
            return _this.MDL.stack.data.constant === "all";
        })
        .attr("disabled", function() {
          if (d3.select(this).node().value === "none") 
            return null; // always enabled
          if (d3.select(this).node().value === "all") 
            return null; // always enabled
          if (d3.select(this).node().value === "bycolor")
            return _this.MDL.color.data.isConstant || _this.MDL.color.data.space.length !== 1 ? true : null;
        });

      //_this.ui.chart.manualSortingEnabled = _this.MDL.stack.data.constant == "all";

      this.DOM.howToMerge
        .property("checked", function() {
          if (d3.select(this).node().value === "none") 
            return !_this.MDL.group.config.merge && !_this.MDL.stack.config.merge;
          if (d3.select(this).node().value === "grouped") 
            return _this.MDL.group.config.merge;
          if (d3.select(this).node().value === "stacked") 
            return _this.MDL.stack.config.merge;
        })
        .attr("disabled", function() {
          if (d3.select(this).node().value === "none") 
            return null; // always enabled
          if (d3.select(this).node().value === "grouped") 
            return _this.MDL.stack.data.constant === "none" || _this.MDL.color.data.isConstant || _this.MDL.color.data.space.length !== 1 ? true : null;
          if (d3.select(this).node().value === "stacked") 
            return _this.MDL.stack.data.constant === "all" ? null : true;
        });


    }

    manualSorting(value, persistent = false) {
      if (arguments.length === 0) return this.model.state.marker.group.manualSorting;
      this.model.state.marker.group.set({ manualSorting: value }, false, persistent);
    }

    setModel(what, value) {
      mobx.runInAction(() => {

        if (what === "merge") {
          switch (value) {
          case "none":
            this.MDL.group.config.merge = false;
            this.MDL.stack.config.merge = false;
            break;
          case "grouped":
            this.MDL.group.config.merge = true;
            this.MDL.stack.config.merge = false;
            break;
          case "stacked":
            this.MDL.group.config.merge = false;
            this.MDL.stack.config.merge = true;
            break;
          }
        }

        if (what === "stack") {
          switch (value) {
          case "all":
            this.MDL.stack.config.data.constant = "all";
            this.MDL.stack.config.data.concept = null;
            this.MDL.stack.config.data.space = [];
            break;
          case "none":
            this.MDL.stack.config.data.constant = "none";
            this.MDL.stack.config.data.concept = null;
            this.MDL.stack.config.data.space = [];
            
            this.MDL.group.config.merge = false;
            this.MDL.stack.config.merge = false;
            break;
          case "bycolor":
            this.MDL.stack.config.data.space = this.MDL.color.config.data.space;
            this.MDL.stack.config.data.concept = this.MDL.color.config.data.concept;          
            this.MDL.stack.config.merge = false;
            this.MDL.stack.config.data.constant = null;
            break;
          }
        }

      });
    }
  }
   
  const decorated = mobx.decorate(Stack, {
    "MDL": mobx.computed
  });
  VizabiSharedComponents.Dialog.add("stack", decorated);

  /*eslint no-unused-vars: ["warn", { "varsIgnorePattern": "Stack" }]*/

  //import "./dialogs/axesmc/axesmc";
  //import "./dialogs/robinhood/robinhood";

  class MountainChart extends VizabiSharedComponents.BaseComponent {

    constructor(config){

      const markerName = config.options.markerName || "mountain";
      const fullMarker = config.model.markers[markerName];

      const frameType = config.Vizabi.stores.encodings.modelTypes.frame;
      const { marker, splashMarker } = frameType.splashMarker(fullMarker);

      config.model.markers[markerName] = marker;

      config.name = "mountainchart";

      config.subcomponents = [{
        type: VizabiSharedComponents.Repeater,
        placeholder: ".vzb-repeater",
        model: marker,
        options: {
          ComponentClass: VizabiMountainChart,
          componentCssName: "vzb-mountainchart"
        },
        name: "chart",
      },{
        type: VizabiSharedComponents.TimeSlider,
        placeholder: ".vzb-timeslider",
        name: "time-slider",
        model: marker
      },{
        type: VizabiSharedComponents.SteppedSlider,
        placeholder: ".vzb-speedslider",
        name: "speed-slider",
        model: marker
      },{
        type: VizabiSharedComponents.TreeMenu,
        placeholder: ".vzb-treemenu",
        name: "tree-menu",
        model: marker
      },{
        name: "datanotes",
        type: VizabiSharedComponents.DataNotes,
        placeholder: ".vzb-datanotes",
        model: marker
      },{
        type: VizabiSharedComponents.DataWarning,
        placeholder: ".vzb-datawarning",
        options: {button: ".vzb-datawarning-button"},
        model: marker,
        name: "data-warning"
      },{
        type: VizabiSharedComponents.Dialogs,
        placeholder: ".vzb-dialogs",
        model: marker,
        name: "dialogs"
      },{
        type: VizabiSharedComponents.ButtonList,
        placeholder: ".vzb-buttonlist",
        name: "buttons",
        model: marker
      }];

      config.template = `
      <div class="vzb-repeater vzb-mountainchart"></div>
      <div class="vzb-animationcontrols">
        <div class="vzb-timeslider"></div>
        <div class="vzb-speedslider"></div>
      </div>
      <div class="vzb-sidebar">
        <div class="vzb-dialogs"></div>
        <div class="vzb-buttonlist"></div>
      </div>
      <div class="vzb-treemenu"></div>
      <div class="vzb-datanotes"></div>
      <div class="vzb-datawarning"></div>
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
  MountainChart.DEFAULT_UI = {
    chart: {  
    },
  };

  MountainChart.versionInfo = { version: "3.7.2", build: 1634239711575, package: {"homepage":"https://github.com/vizabi/mountainchart#readme","name":"@vizabi/mountainchart","description":"Vizabi mountain chart"}, sharedComponents: VizabiSharedComponents.versionInfo};

  return MountainChart;

})));
//# sourceMappingURL=mountainchart.js.map
