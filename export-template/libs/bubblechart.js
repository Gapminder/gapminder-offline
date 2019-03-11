/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(2);

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION_INFO = { version: "2.4.1", build: 1547630126787 };

exports.default = Vizabi.Tool.extend("BubbleChart", {

  /**
   * Initializes the tool (Bubble Chart Tool).
   * Executed once before any template is rendered.
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init: function init(placeholder, external_model) {

    this.name = "bubblechart";

    //specifying components
    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.marker", "locale", "ui"] //pass models to component
    }, {
      component: Vizabi.Component.get("timeslider"),
      placeholder: ".vzb-tool-timeslider",
      model: ["state.time", "state.marker", "ui"]
    }, {
      component: Vizabi.Component.get("dialogs"),
      placeholder: ".vzb-tool-dialogs",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("buttonlist"),
      placeholder: ".vzb-tool-buttonlist",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("treemenu"),
      placeholder: ".vzb-tool-treemenu",
      model: ["state.marker", "state.time", "locale", "ui"]
    }, {
      component: Vizabi.Component.get("datawarning"),
      placeholder: ".vzb-tool-datawarning",
      model: ["locale"]
    }, {
      component: Vizabi.Component.get("datanotes"),
      placeholder: ".vzb-tool-datanotes",
      model: ["state.marker", "locale"]
    }, {
      component: Vizabi.Component.get("steppedspeedslider"),
      placeholder: ".vzb-tool-stepped-speed-slider",
      model: ["state.time", "locale"]
    }];

    this._super(placeholder, external_model);
  },
  validate: function validate(model) {
    model = this.model || model;

    this._super(model);

    if (model.ui.chart.lockNonSelected && (!model.ui.splash || model.state.time.splash === false)) {
      var time = model.state.time.parse("" + model.ui.chart.lockNonSelected);
      if (time < model.state.time.start) model.ui.chart.lockNonSelected = model.state.time.formatDate(model.state.time.start);
      if (time > model.state.time.end) model.ui.chart.lockNonSelected = model.state.time.formatDate(model.state.time.end);
    }
  },


  /**
   * Determines the default model of this tool
   */
  default_model: {
    state: {
      time: {
        "autoconfig": {
          "type": "time"
        }
      },
      entities: {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      entities_colorlegend: {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      marker: {
        limit: 5000,
        space: ["entities", "time"],
        axis_x: {
          use: "indicator",
          "autoconfig": {
            index: 0,
            type: "measure"
          }
        },
        axis_y: {
          use: "indicator",
          "autoconfig": {
            index: 1,
            type: "measure"
          }
        },
        label: {
          use: "property",
          "autoconfig": {
            "includeOnlyIDs": ["name"],
            "type": "string"
          }
        },
        size: {
          "autoconfig": {
            index: 2,
            type: "measure"
          }
        },
        color: {
          syncModels: ["marker_colorlegend"],
          "autoconfig": {}
        },
        size_label: {
          use: "constant",
          which: "_default",
          scaleType: "ordinal",
          _important: false,
          extent: [0, 0.33],
          allow: {
            names: ["_default"]
          }
        }
      },
      "marker_colorlegend": {
        "space": ["entities_colorlegend"],
        "label": {
          "use": "property",
          "which": "name"
        },
        "hook_rank": {
          "use": "property",
          "which": "rank"
        },
        "hook_geoshape": {
          "use": "property",
          "which": "shape_lores_svg"
        }
      }
    },
    locale: {},
    ui: {
      chart: {
        decorations: {
          enabled: true,
          xAxisGroups: null
        },
        superhighlightOnMinimapHover: true,
        whenHovering: {
          showProjectionLineX: true,
          showProjectionLineY: true,
          higlightValueX: true,
          higlightValueY: true
        },
        labels: {
          dragging: true,
          removeLabelBox: false
        },
        margin: {
          left: 0,
          top: 0
        },
        trails: true,
        lockNonSelected: 0
      },
      datawarning: {
        doubtDomain: [],
        doubtRange: []
      },
      show_ticks: true,
      presentation: false,
      panWithArrow: false,
      adaptMinMaxZoom: false,
      cursorMode: "arrow",
      zoomOnScrolling: false,
      buttons: ["colors", "find", "zoom", "trails", "lock", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"],
      dialogs: {
        popup: ["colors", "find", "size", "zoom", "moreoptions"],
        sidebar: ["colors", "find", "size", "zoom"],
        moreoptions: ["opacity", "speed", "axes", "size", "colors", "label", "zoom", "presentation", "technical", "about"]
      }
    }
  },

  versionInfo: VERSION_INFO
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trail = __webpack_require__(4);

var _trail2 = _interopRequireDefault(_trail);

var _panzoom = __webpack_require__(7);

var _panzoom2 = _interopRequireDefault(_panzoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Vizabi = Vizabi,
    utils = _Vizabi.utils;
var _Vizabi$helpers = Vizabi.helpers,
    Exporter = _Vizabi$helpers.svgexport,
    Labels = _Vizabi$helpers.labels,
    axisSmart = _Vizabi$helpers['d3.axisWithLabelPicker'],
    DynamicBackground = _Vizabi$helpers['d3.dynamicBackground'];
var _Vizabi$iconset = Vizabi.iconset,
    iconWarn = _Vizabi$iconset.warn,
    iconQuestion = _Vizabi$iconset.question;


// BUBBLE CHART COMPONENT
var BubbleChart = Vizabi.Component.extend("bubblechart", {

  /**
   * Initializes the component (Bubble Chart).
   * Executed once before any template is rendered.
   * @param {Object} config The config passed to the component
   * @param {Object} context The component's parent
   */
  init: function init(config, context) {
    var _this2 = this;

    var _this = this;
    this.name = "bubblechart";
    this.template = __webpack_require__(8);

    //define expected models for this component
    this.model_expects = [{
      name: "time",
      type: "time"
    }, {
      name: "marker",
      type: "marker"
    }, {
      name: "locale",
      type: "locale"
    }, {
      name: "ui",
      type: "ui"
    }];

    this.model_binds = {
      "change:time.playing": function changeTimePlaying(evt, original) {
        if (utils.isTouchDevice() && _this.model.time.playing && _this.someHighlighted) {
          _this.model.marker.clearHighlighted();
        }
      },
      "change:time.start": function changeTimeStart(evt, original) {
        if (!_this._readyOnce || _this.model.time.splash) return;
        if (["color", "axis_x", "axis_y"].filter(function (hook) {
          return _this.model.marker[hook].which == _this.model.time.dim;
        }).length) {
          _this.ready();
          return;
        };
        _this._trails.create().then(function () {
          _this._trails.run(["findVisible", "reveal", "opacityHandler"]);
        });
      },
      "change:time.end": function changeTimeEnd(evt, original) {
        if (!_this._readyOnce || _this.model.time.splash) return;
        if (["color", "axis_x", "axis_y"].filter(function (hook) {
          return _this.model.marker[hook].which == _this.model.time.dim;
        }).length) {
          _this.ready();
          return;
        };
        _this._trails.create().then(function () {
          _this._trails.run(["findVisible", "reveal", "opacityHandler"]);
        });
      },
      "change:time.record": function changeTimeRecord() {
        //console.log("change time record");
        if (_this.model.time.record) {
          _this._export.open(this.element, this.name);
        } else {
          _this._export.reset();
        }
      },
      "change:ui.chart.trails": function changeUiChartTrails(evt) {
        //console.log("EVENT change:time:trails");
        if (!_this._readyOnce) return;
        _this._trails.toggle(_this.model.ui.chart.trails);
        _this.redrawDataPoints();
      },
      "change:ui.chart.lockNonSelected": function changeUiChartLockNonSelected(evt) {
        if (!_this._readyOnce) return;
        //console.log("EVENT change:time:lockNonSelected");
        _this.redrawDataPoints(500);
      },
      "change:ui.chart.decorations": function changeUiChartDecorations(evt) {
        if (!_this._readyOnce) return;
        _this._updateDecorations(500);
      },
      "change:ui.chart.showForecastOverlay": function changeUiChartShowForecastOverlay(evt) {
        if (!_this._readyOnce) return;
        _this._updateForecastOverlay();
      },

      "change:marker": function changeMarker(evt, path) {
        // bubble size change is processed separately
        if (!_this._readyOnce) return;
        if (path.indexOf("scaleType") > -1) {
          _this.ready();
          return;
        }

        if (path.indexOf("marker.color") !== -1) return;
        if (path.indexOf("marker.size") !== -1) return;
        if (path.indexOf("marker.size_label") !== -1) return;

        if (path.indexOf("domainMin") > -1 || path.indexOf("domainMax") > -1) {
          if (!_this.yScale || !_this.xScale) return; //abort if building of the scale is in progress
          _this.updateSize();
          _this.updateMarkerSizeLimits();
          _this._trails.run("findVisible");
          _this.redrawDataPoints();
          _this._trails.run("resize", null, 500);
        } else if (path.indexOf("zoomedMin") > -1 || path.indexOf("zoomedMax") > -1) {
          if (_this.draggingNow) return;

          //avoid zooming again if values didn't change.
          //also prevents infinite loop on forced URL update from zoom.stop()
          if (utils.approxEqual(_this._zoomedXYMinMax.axis_x.zoomedMin, _this.model.marker.axis_x.zoomedMin, 0.01) && utils.approxEqual(_this._zoomedXYMinMax.axis_x.zoomedMax, _this.model.marker.axis_x.zoomedMax, 0.01) && utils.approxEqual(_this._zoomedXYMinMax.axis_y.zoomedMin, _this.model.marker.axis_y.zoomedMin, 0.01) && utils.approxEqual(_this._zoomedXYMinMax.axis_y.zoomedMax, _this.model.marker.axis_y.zoomedMax, 0.01)) return;
          var playAfterZoom = false;
          if (_this.model.time.playing) {
            playAfterZoom = true;
            _this.model.time.pause(true);
          }
          _this._trails.run("abortAnimation");
          _this._panZoom.zoomToMaxMin(_this.model.marker.axis_x.getZoomedMin(), _this.model.marker.axis_x.getZoomedMax(), _this.model.marker.axis_y.getZoomedMin(), _this.model.marker.axis_y.getZoomedMax(), 500 /*duration*/, "don't feed these zoom values back to state");
          if (playAfterZoom) {
            _this.model.time.postponePause = false;
          }
        }

        //console.log("EVENT change:marker", evt);
      },
      "change:marker.select": function changeMarkerSelect(evt, path) {
        if (!_this._readyOnce || !_this.entityBubbles) return;
        //console.log("EVENT change:marker:select");

        //disable trails if too many items get selected at once
        //otherwise it's too much waiting time
        if ((evt.source._val || []).length - (evt.source._previousVal || []).length > 50) _this.model.ui.chart.trails = false;

        _this.selectDataPoints();
        _this.redrawDataPoints();
        _this._trails.create().then(function () {
          _this._trails.run(["findVisible", "reveal", "opacityHandler"]);
        });
        _this.updateBubbleOpacity();
        _this._updateDoubtOpacity();
      },
      "change:marker.superHighlight": function changeMarkerSuperHighlight(evt, path) {
        if (_this2._readyOnce) {
          _this2._blinkSuperHighlighted();
        }
      },
      "change:marker.highlight": function changeMarkerHighlight(evt, path) {
        if (!_this._readyOnce) return;
        //path have values if trail is highlighted
        if (path != "highlight") {
          if (path !== null) {
            var titles = _this._formatSTitleValues(path.size, path.color);
            _this._updateSTitle(titles[0], titles[1]);
          } else {
            _this._updateSTitle();
          }
          return;
        }
        //console.log("EVENT change:marker:highlight");
        _this.highlightDataPoints();
      },
      "change:time.value": function changeTimeValue() {
        if (_this.model.time.splash || !_this._readyOnce || !_this.entityBubbles) return;
        if (!_this.calculationQueue) {
          // collect timestamp that we request
          _this.calculationQueue = [_this.model.time.value.toString()];
        } else {
          _this.calculationQueue.push(_this.model.time.value.toString());
        }
        (function (time) {
          // isolate timestamp
          //_this._bubblesInteract().mouseout();
          _this.model.marker.getFrame(time, function (frame, time) {
            if (!_this._frameIsValid(frame)) return utils.warn("change:time.value: empty data received from marker.getFrame(). doing nothing");
            var index = _this.calculationQueue.indexOf(time.toString()); //
            if (index == -1) {
              // we was receive more recent frame before so we pass this frame
              return;
            }
            _this.calculationQueue.splice(0, index + 1); // remove timestamps that added to queue before current timestamp
            _this.frameChanged(frame, time);
          });
        })(_this.model.time.value);
      },
      "change:ui.adaptMinMaxZoom": function changeUiAdaptMinMaxZoom() {
        //console.log("EVENT change:ui:adaptMinMaxZoom");
        if (_this.model.ui.adaptMinMaxZoom) {
          _this._panZoom.expandCanvas(500);
        } else {
          _this._panZoom.reset();
        }
      },
      "change:marker.size.extent": function changeMarkerSizeExtent(evt, path) {
        //console.log("EVENT change:marker:size:max");
        if (!_this._readyOnce) return;
        _this.updateMarkerSizeLimits();
        _this.redrawDataPointsOnlySize();
        _this._trails.run("resize");
      },
      "change:marker.color": function changeMarkerColor(evt, path) {
        if (!_this._readyOnce) return;
        //console.log("EVENT change:marker:color:palette");
        _this.redrawDataPointsOnlyColors();
        _this._trails.run("recolor");
      },
      // 'change:marker.color.palette': function(evt, path) {
      //   if(!_this._readyOnce) return;
      //   //console.log("EVENT change:marker:color:palette");
      //   _this.redrawDataPointsOnlyColors();
      //   _this._trails.run("recolor");
      // },
      "change:marker.opacitySelectDim": function changeMarkerOpacitySelectDim() {
        _this.updateBubbleOpacity();
      },
      "change:marker.opacityRegular": function changeMarkerOpacityRegular() {
        _this.updateBubbleOpacity();
        _this._trails.run("opacityHandler");
      },
      "change:ui.cursorMode": function changeUiCursorMode() {
        var svg = _this.chartSvg;
        if (_this.model.ui.cursorMode === "plus") {
          svg.classed("vzb-zoomin", true);
          svg.classed("vzb-zoomout", false);
          svg.classed("vzb-panhand", false);
        } else if (_this.model.ui.cursorMode === "minus") {
          svg.classed("vzb-zoomin", false);
          svg.classed("vzb-zoomout", true);
          svg.classed("vzb-panhand", false);
        } else if (_this.model.ui.cursorMode === "hand") {
          svg.classed("vzb-zoomin", false);
          svg.classed("vzb-zoomout", false);
          svg.classed("vzb-panhand", true);
        } else {
          svg.classed("vzb-zoomin", false);
          svg.classed("vzb-zoomout", false);
          svg.classed("vzb-panhand", false);
        }
      },
      "change:marker.space": function changeMarkerSpace() {
        if (_this.someHighlighted) {
          _this.model.marker.clearHighlighted();
        }
        if (_this.someSelected) {
          _this.model.marker.clearSelected();
        }
      },
      "ready": function ready() {
        // if(_this.model.marker.color.scaleType === 'time') {
        //   _this.model.marker.color.scale = null;
        //   utils.defer(function() {
        //     _this.trigger('ready');
        //   });
        // }
      }
    };

    this._super(config, context);

    this.xScale = null;
    this.yScale = null;
    this.sScale = null;
    this.cScale = null;

    this.xAxis = axisSmart("bottom");
    this.yAxis = axisSmart("left");

    _this.COLOR_BLACKISH = "#333";
    _this.COLOR_WHITEISH = "#fdfdfd";

    this.isCanvasPreviouslyExpanded = false;
    this.draggingNow = null;

    this._trails = new _trail2.default(this);
    this._panZoom = new _panzoom2.default(this);
    this._export = new Exporter(this);
    this._export.prefix("vzb-bc-").deleteClasses(["vzb-bc-bubbles-crop", "vzb-hidden", "vzb-bc-year", "vzb-bc-zoom-rect", "vzb-bc-projection-x", "vzb-bc-projection-y", "vzb-bc-axis-c-title"]);
    this._labels = new Labels(this);
    this._labels.config({
      CSS_PREFIX: "vzb-bc",
      LABELS_CONTAINER_CLASS: "vzb-bc-labels",
      LINES_CONTAINER_CLASS: "vzb-bc-bubbles",
      LINES_CONTAINER_SELECTOR_PREFIX: "bubble-"
    });
  },
  _rangeBump: function _rangeBump(arg, undo) {
    var bump = this.activeProfile.maxRadiusPx / 2;
    undo = undo ? -1 : 1;
    if (utils.isArray(arg) && arg.length > 1) {
      var z1 = arg[0];
      var z2 = arg[arg.length - 1];

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
      } else {
        // rangeBump error: the input scale range has 0 length. that sucks but we keep cool
      }
      return [z1, z2];
    }
    utils.warn("rangeBump error: input is not an array or empty");
  },


  /**
   * Executes right after the template is in place, but the model is not yet ready
   */
  readyOnce: function readyOnce() {
    var _this = this;
    this._readyOnce = false;
    this.scrollableAncestor = utils.findScrollableAncestor(this.element);
    this.element = d3.select(this.element);

    // reference elements
    this.chartSvg = this.element.select("svg");
    this.graph = this.element.select(".vzb-bc-graph");
    this.yAxisElContainer = this.graph.select(".vzb-bc-axis-y");
    this.yAxisEl = this.yAxisElContainer.select("g");

    this.xAxisElContainer = this.graph.select(".vzb-bc-axis-x");
    this.xAxisEl = this.xAxisElContainer.select("g");

    this.ySubTitleEl = this.graph.select(".vzb-bc-axis-y-subtitle");
    this.xSubTitleEl = this.graph.select(".vzb-bc-axis-x-subtitle");
    this.yTitleEl = this.graph.select(".vzb-bc-axis-y-title");
    this.xTitleEl = this.graph.select(".vzb-bc-axis-x-title");
    this.sTitleEl = this.graph.select(".vzb-bc-axis-s-title");
    this.cTitleEl = this.graph.select(".vzb-bc-axis-c-title");
    this.yearEl = this.graph.select(".vzb-bc-year");

    this.year = new DynamicBackground(this.yearEl);

    this.yInfoEl = this.graph.select(".vzb-bc-axis-y-info");
    this.xInfoEl = this.graph.select(".vzb-bc-axis-x-info");
    this.dataWarningEl = this.graph.select(".vzb-data-warning");

    this.projectionX = this.graph.select(".vzb-bc-projection-x");
    this.projectionY = this.graph.select(".vzb-bc-projection-y");
    this.decorationsEl = this.graph.select(".vzb-bc-decorations");
    this.lineEqualXY = this.decorationsEl.select(".vzb-bc-line-equal-xy");
    this.xAxisGroupsEl = this.decorationsEl.select(".vzb-bc-x-axis-groups");

    this.trailsContainer = this.graph.select(".vzb-bc-trails");
    this.bubbleContainerCrop = this.graph.select(".vzb-bc-bubbles-crop");
    this.zoomSelection = this.graph.select(".vzb-zoom-selection");
    this.labelsContainerCrop = this.graph.select(".vzb-bc-labels-crop");
    this.bubbleContainer = this.graph.select(".vzb-bc-bubbles");
    this.labelsContainer = this.graph.select(".vzb-bc-labels");
    this.linesContainer = this.graph.select(".vzb-bc-lines");
    this.zoomRect = this.element.select(".vzb-bc-zoom-rect");
    this.eventArea = this.element.select(".vzb-bc-eventarea");
    this.forecastOverlay = this.element.select(".vzb-bc-forecastoverlay");

    this.entityBubbles = null;
    this.bubbleCrown = this.element.select(".vzb-bc-bubble-crown");
    //set filter
    this.bubbleCrown.selectAll(".vzb-crown-glow").attr("filter", "url(" + location.pathname + "#vzb-glow-filter)");
    this.tooltipMobile = this.element.select(".vzb-tooltip-mobile");
    //component events
    this.on("resize", function () {
      //console.log("EVENT: resize");
      //return if updatesize exists with error
      _this._trails.run("abortAnimation");
      if (_this.updateSize()) return;
      _this.updateMarkerSizeLimits();
      _this._labels.updateSize();
      (function (xMin, xMax, yMin, yMax) {
        _this._panZoom.zoomer.dontFeedToState = true;
        _this._panZoom.rerun(); // includes redraw data points and trail resize
        _this._panZoom.zoomToMaxMin(xMin, xMax, yMin, yMax, 0, true);
      })(_this._zoomedXYMinMax.axis_x.zoomedMin, _this._zoomedXYMinMax.axis_x.zoomedMax, _this._zoomedXYMinMax.axis_y.zoomedMin, _this._zoomedXYMinMax.axis_y.zoomedMax);
    });

    //keyboard listeners
    d3.select("body").on("keydown", function () {
      if (_this.model.ui.cursorMode !== "arrow" && _this.model.ui.cursorMode !== "hand") return;
      if (d3.event.metaKey || d3.event.ctrlKey) _this.element.select("svg").classed("vzb-zoomin", true);
    }).on("keyup", function () {
      if (_this.model.ui.cursorMode !== "arrow" && _this.model.ui.cursorMode !== "hand") return;
      if (!d3.event.metaKey && !d3.event.ctrlKey) _this.element.select("svg").classed("vzb-zoomin", false);
    })
    //this is for the case when user would press ctrl and move away from the browser tab or window
    //keyup event would happen somewhere else and won't be captured, so zoomin class would get stuck
    .on("mouseenter", function () {
      if (_this.model.ui.cursorMode !== "arrow" && _this.model.ui.cursorMode !== "hand") return;
      if (!d3.event.metaKey && !d3.event.ctrlKey) _this.element.select("svg").classed("vzb-zoomin", false);
    });

    this.root.on("resetZoom", function () {
      _this._panZoom.reset(null, 500);
    });

    this._panZoom.zoomSelection(this.bubbleContainerCrop);
    this.bubbleContainerCrop.call(this._panZoom.dragRectangle).call(this._panZoom.zoomer).on("dblclick.zoom", null).on("mouseup", function () {
      _this.draggingNow = false;
    }).on("click", function () {
      var cursor = _this.model.ui.cursorMode;
      if (!d3.event.defaultPrevented && cursor !== "arrow" && cursor !== "hand") {
        _this._panZoom.zoomByIncrement(cursor, 500);
      }
    });

    this.TIMEDIM = this.model.time.getDimension();
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();

    this.updateUIStrings();

    this.wScale = d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange);

    this._labels.readyOnce();

    _this._readyOnce = true;
  },
  _frameIsValid: function _frameIsValid(frame) {
    return !(!frame || Object.keys(frame.axis_y).length === 0 || Object.keys(frame.axis_x).length === 0 || Object.keys(frame.size).length === 0);
  },
  ready: function ready() {
    var _this = this;
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();

    this.updateUIStrings();
    var endTime = this.model.time.end;
    this.updateIndicators();
    this.updateTime();
    if (!_this.model.time.splash) {
      _this._trails.create();
    }
    this.model.marker.getFrame(this.model.time.value, function (frame, time) {
      // TODO: temporary fix for case when after data loading time changed on validation
      if (time.toString() != _this.model.time.value.toString()) {
        utils.defer(function () {
          _this.ready();
        });
        return;
      }
      if (!_this._frameIsValid(frame)) return utils.warn("ready: empty data received from marker.getFrame(). doing nothing");

      _this.frame = frame;
      _this.updateSize();
      _this.updateMarkerSizeLimits();
      _this.updateEntities();
      _this._labels.ready();
      _this.redrawDataPoints();
      _this.selectDataPoints();
      _this.updateBubbleOpacity();
      _this._updateDoubtOpacity();
      _this.zoomToMarkerMaxMin(); // includes redraw data points and trail resize
      if (!_this.model.time.splash) {
        _this._trails.run(["findVisible", "reveal", "opacityHandler"]);
      }
      if (_this.model.ui.adaptMinMaxZoom) _this._panZoom.expandCanvas();
    });
  },


  /*
   * Zoom to the min and max values given in the URL axes markers.
   */
  zoomToMarkerMaxMin: function zoomToMarkerMaxMin() {
    /*
     * Reset just the zoom values without triggering a zoom event. This ensures
     * a clean zoom state for the subsequent zoom event.
     */
    this._panZoom.resetZoomState();

    var xAxis = this.model.marker.axis_x;
    var yAxis = this.model.marker.axis_y;

    var xDomain = xAxis.getScale().domain();
    var yDomain = yAxis.getScale().domain();

    /*
     * The axes may return null when there is no value given for the zoomed
     * min and max values. In that case, fall back to the axes' domain values.
     */
    var zoomedMinX = xAxis.getZoomedMin();
    var zoomedMaxX = xAxis.getZoomedMax();
    var zoomedMinY = yAxis.getZoomedMin();
    var zoomedMaxY = yAxis.getZoomedMax();

    //by default this will apply no transition and feed values back to state
    this._panZoom.zoomToMaxMin(zoomedMinX, zoomedMaxX, zoomedMinY, zoomedMaxY, 0, "don't feed these zoom values back to state");
  },


  /*
   * UPDATE INDICATORS
   */
  updateIndicators: function updateIndicators() {
    var _this = this;

    //scales
    this.yScale = this.model.marker.axis_y.getScale();
    this.xScale = this.model.marker.axis_x.getScale();
    this.sScale = this.model.marker.size.getScale();
    this.cScale = this.model.marker.color.getScale();
    this._labels.setScales(this.xScale, this.yScale);

    this.yAxis.tickFormat(_this.model.marker.axis_y.getTickFormatter());
    this.xAxis.tickFormat(_this.model.marker.axis_x.getTickFormatter());
  },
  frameChanged: function frameChanged(frame, time) {
    //    if (time.toString() != this.model.time.value.toString()) return; // frame is outdated
    this.frame = frame;
    this.updateTime();

    this._updateDoubtOpacity();
    this._trails.run("findVisible");
    if (this.model.ui.adaptMinMaxZoom) {
      this._panZoom.expandCanvas();
    } else {
      this.redrawDataPoints();
    }
    this._trails.run("reveal", null, this.duration);
    this.tooltipMobile.classed("vzb-hidden", true);
    this._reorderEntities();
  },
  _getSubtitle: function _getSubtitle(title, shortTitle) {
    var subtitle = title.replace(shortTitle, "");
    if (subtitle[0] === ",") subtitle = subtitle.slice(1);
    var regexpResult = /^\((.*)\)$|.*/.exec(subtitle.trim());
    return regexpResult[1] || regexpResult[0] || "";
  },
  updateUIStrings: function updateUIStrings() {
    var _this = this;
    var layoutProfile = this.getLayoutProfile();

    var conceptPropsY = _this.model.marker.axis_y.getConceptprops();
    var conceptPropsX = _this.model.marker.axis_x.getConceptprops();
    var conceptPropsS = _this.model.marker.size.getConceptprops();
    var conceptPropsC = _this.model.marker.color.getConceptprops();
    this.translator = this.model.locale.getTFunction();

    this.strings = {
      title: {
        Y: conceptPropsY.name,
        X: conceptPropsX.name,
        S: conceptPropsS.name,
        C: conceptPropsC.name
      },
      title_short: {
        Y: conceptPropsY.name_short,
        X: conceptPropsX.name_short,
        S: conceptPropsS.name_short,
        C: conceptPropsC.name_short
      },
      subtitle: {
        Y: this._getSubtitle(conceptPropsY.name, conceptPropsY.name_short),
        X: this._getSubtitle(conceptPropsX.name, conceptPropsX.name_short),
        S: conceptPropsS.name_short,
        C: conceptPropsC.name_short
      },
      unit: {
        Y: conceptPropsY.unit || "",
        X: conceptPropsX.unit || "",
        S: conceptPropsS.unit || "",
        C: conceptPropsC.unit || ""
      }
    };

    var ySubTitle = this.ySubTitleEl.selectAll("text").data([0]);
    ySubTitle.enter().append("text");
    var xSubTitle = this.xSubTitleEl.selectAll("text").data([0]);
    xSubTitle.enter().append("text");

    var yTitle = this.yTitleEl.selectAll("text").data([0]);
    yTitle.enter().append("text");
    yTitle
    //.attr("y", "-6px")
    .on("click", function () {
      _this.parent.findChildByName("gapminder-treemenu").markerID("axis_y").alignX(_this.model.locale.isRTL() ? "right" : "left").alignY("top").updateView().toggle();
    });

    var xTitle = this.xTitleEl.selectAll("text").data([0]);
    xTitle.enter().append("text");
    xTitle.on("click", function () {
      _this.parent.findChildByName("gapminder-treemenu").markerID("axis_x").alignX(_this.model.locale.isRTL() ? "right" : "left").alignY("bottom").updateView().toggle();
    });

    var sTitle = this.sTitleEl.selectAll("text").data([0]);
    sTitle.enter().append("text");
    sTitle.attr("text-anchor", "end");

    utils.setIcon(this.dataWarningEl, iconWarn).select("svg").attr("width", "0px").attr("height", "0px");
    this.dataWarningEl.append("text").attr("text-anchor", "end").text(this.translator("hints/dataWarning"));

    utils.setIcon(this.yInfoEl, iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsY.description || conceptPropsY.sourceLink)));

    utils.setIcon(this.xInfoEl, iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsX.description || conceptPropsX.sourceLink)));

    //TODO: move away from UI strings, maybe to ready or ready once
    this.yInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.yInfoEl.on("mouseover", function () {
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("axis_y").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.yInfoEl.on("mouseout", function () {
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });
    this.xInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.xInfoEl.on("mouseover", function () {
      if (_this.model.time.dragging) return;
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("axis_x").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.xInfoEl.on("mouseout", function () {
      if (_this.model.time.dragging) return;
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });
    this.dataWarningEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datawarning").toggle();
    }).on("mouseover", function () {
      _this._updateDoubtOpacity(1);
    }).on("mouseout", function () {
      _this._updateDoubtOpacity();
    });
  },
  _updateDoubtOpacity: function _updateDoubtOpacity(opacity) {
    if (opacity == null) opacity = this.wScale(+this.model.time.formatDate(this.time));
    if (this.someSelected) opacity = 1;
    this.dataWarningEl.style("opacity", opacity);
  },


  /*
   * UPDATE ENTITIES:
   * Ideally should only update when show parameters change or data changes
   */
  updateEntities: function updateEntities() {
    var _this = this;
    var dataKeys = this.dataKeys = this.model.marker.getDataKeysPerHook();
    var KEYS = this.KEYS;
    var KEY = this.KEY;
    var TIMEDIM = this.TIMEDIM;

    var getKeys = function getKeys(prefix) {
      prefix = prefix || "";
      return _this.model.marker.getKeys().map(function (d) {
        var pointer = Object.assign({}, d);
        //pointer[KEY] = d[KEY];
        pointer[TIMEDIM] = endTime;
        pointer.sortValue = _this.frame.size[utils.getKey(d, dataKeys.size)] || 0;
        pointer[KEY] = prefix + utils.getKey(d, KEYS);
        return pointer;
      }).sort(function (a, b) {
        return b.sortValue - a.sortValue;
      });
    };

    // get array of GEOs, sorted by the size hook
    // that makes larger bubbles go behind the smaller ones
    var endTime = this.model.time.end;
    var markers = getKeys.call(this);
    this.model.marker.setVisible(markers);

    //unselecting bubbles with no data is used for the scenario when
    //some bubbles are selected and user would switch indicator.
    //bubbles would disappear but selection would stay
    if (!this.model.time.splash) {
      this.unselectBubblesWithNoData(markers);
    }
    this.entityBubbles = this.bubbleContainer.selectAll("circle.vzb-bc-entity").data(this.model.marker.getVisible(), function (d) {
      return d[KEY];
    }); // trails have not keys

    //exit selection
    this.entityBubbles.exit().remove();

    //enter selection -- init circles
    this.entityBubbles = this.entityBubbles.enter().append("circle").attr("class", function (d) {
      return "vzb-bc-entity " + "bubble-" + d[KEY];
    }).on("mouseover", function (d, i) {
      if (utils.isTouchDevice() || _this.model.ui.cursorMode !== "arrow" && _this.model.ui.cursorMode !== "hand") return;
      _this._bubblesInteract().mouseover(d, i);
    }).on("mouseout", function (d, i) {
      if (utils.isTouchDevice() || _this.model.ui.cursorMode !== "arrow" && _this.model.ui.cursorMode !== "hand") return;

      _this._bubblesInteract().mouseout(d, i);
    }).on("click", function (d, i) {
      if (utils.isTouchDevice() || _this.model.ui.cursorMode !== "arrow" && _this.model.ui.cursorMode !== "hand") return;

      _this._bubblesInteract().click(d, i);
    }).onTap(function (d, i) {
      d3.event.stopPropagation();
      _this._bubblesInteract().click(d, i);
    }).onLongTap(function (d, i) {}).merge(this.entityBubbles);

    this._reorderEntities();
  },
  unselectBubblesWithNoData: function unselectBubblesWithNoData(entities) {
    var _this = this;
    var KEYS = this.KEYS;
    var KEY = this.KEY;
    if (!this.model.marker.select.length) return;

    var _select = [];
    var keys = entities.map(function (d) {
      return d[KEY];
    });

    this.model.marker.select.forEach(function (d) {
      if (keys.indexOf(utils.getKey(d, KEYS)) !== -1) _select.push(d);
    });

    if (_select.length !== _this.model.marker.select.length) _this.model.marker.select = _select;
  },
  _reorderEntities: function _reorderEntities() {
    var _this = this;
    var dataKeys = this.dataKeys;
    var KEY = this.KEY;
    this.bubbleContainer.selectAll(".vzb-bc-entity").sort(function (a, b) {
      var sizeA = _this.frame.size[utils.getKey(a, dataKeys.size)];
      var sizeB = _this.frame.size[utils.getKey(b, dataKeys.size)];

      if (typeof sizeA === "undefined" && typeof sizeB !== "undefined") return -1;
      if (typeof sizeA !== "undefined" && typeof sizeB === "undefined") return 1;
      if (sizeA != sizeB) return d3.descending(sizeA, sizeB);
      if (a[KEY] != b[KEY]) return d3.ascending(a[KEY], b[KEY]);
      if (typeof a.trailStartTime !== "undefined" || typeof b.trailStartTime !== "undefined") return typeof a.trailStartTime !== "undefined" ? -1 : 1; // only lines has trailStartTime
      if (typeof a.status !== "undefined" || typeof b.status !== "undefined") return typeof a.status !== "undefined" ? -1 : 1; // only trails has attribute status
      return d3.descending(sizeA, sizeB);
    });
  },
  _bubblesInteract: function _bubblesInteract() {
    var _this = this;
    var KEY = this.KEY;
    var TIMEDIM = this.TIMEDIM;

    return {
      mouseover: function mouseover(d, i) {
        _this.model.marker.highlightMarker(d);

        _this._labels.showCloseCross(d, true);
      },
      mouseout: function mouseout(d, i) {
        _this.model.marker.clearHighlighted();

        _this._labels.showCloseCross(d, false);
      },
      click: function click(d, i) {
        if (_this.draggingNow) return;
        var isSelected = _this.model.marker.isSelected(d);
        _this.model.marker.selectMarker(d);
        //return to highlighted state
        if (!utils.isTouchDevice()) {
          if (isSelected) _this.model.marker.highlightMarker(d);
          _this.highlightDataPoints();
        }
      }
    };
  },


  /*
   * UPDATE TIME:
   * Ideally should only update when time or data changes
   */
  updateTime: function updateTime() {
    var _this = this;

    this.time_1 = this.time == null ? this.model.time.value : this.time;
    this.time = this.model.time.value;
    this.duration = this.model.time.playing && this.time - this.time_1 > 0 ? this.model.time.delayAnimations : 0;
    this.year.setText(this.model.time.formatDate(this.time, "ui"), this.duration);
    this._updateForecastOverlay();
  },


  /*
   * RESIZE:
   * Executed whenever the container is resized
   */
  updateSize: function updateSize() {
    var chartSvg = this.chartSvg;

    var svgWidth = utils.px2num(chartSvg.style("width"));
    var svgHeight = utils.px2num(chartSvg.style("height"));
    var marginScaleH = function marginScaleH(marginMin) {
      var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return marginMin + svgHeight * ratio;
    };
    var marginScaleW = function marginScaleW(marginMin) {
      var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return marginMin + svgWidth * ratio;
    };

    var profiles = {
      small: {
        margin: { top: 30, bottom: 35, left: 30, right: 10 },
        leftMarginRatio: 1,
        padding: 2,
        minRadiusPx: 0.5,
        maxRadiusEm: this.model.ui.chart.maxRadiusEm || 0.05,
        infoElHeight: 16,
        yAxisTitleBottomMargin: 6,
        xAxisTitleBottomMargin: 4
      },
      medium: {
        margin: { top: 15, bottom: 40, left: 40, right: 15 },
        leftMarginRatio: 1.6,
        padding: 2,
        minRadiusPx: 1,
        maxRadiusEm: this.model.ui.chart.maxRadiusEm || 0.05,
        infoElHeight: 20,
        yAxisTitleBottomMargin: 3,
        xAxisTitleBottomMargin: 4
      },
      large: {
        margin: { top: 15, bottom: marginScaleH(30, 0.03), left: marginScaleW(31, 0.015), right: 20 },
        leftMarginRatio: 1.8,
        padding: 2,
        minRadiusPx: 1,
        maxRadiusEm: this.model.ui.chart.maxRadiusEm || 0.05,
        infoElHeight: 22,
        yAxisTitleBottomMargin: 3, //marginScaleH(4, 0.01),
        xAxisTitleBottomMargin: marginScaleH(0, 0.01),
        hideSTitle: true
      }
    };

    var presentationProfileChanges = {
      medium: {
        margin: { top: 20, bottom: 55, left: 50, right: 20 },
        yAxisTitleBottomMargin: 3,
        xAxisTitleBottomMargin: 4,
        infoElHeight: 26
      },
      large: {
        margin: { top: 30, bottom: marginScaleH(45, 0.03), left: marginScaleW(35, 0.025), right: 30 },
        yAxisTitleBottomMargin: 3, //marginScaleH(4, 0.01),
        xAxisTitleBottomMargin: marginScaleH(-10, 0.01),
        infoElHeight: 32,
        hideSTitle: true
      }
    };

    var _this = this;

    this.activeProfile = this.getActiveProfile(profiles, presentationProfileChanges);
    var layoutProfile = this.getLayoutProfile();
    var containerWH = this.root.getVizWidthHeight();
    this.activeProfile.maxRadiusPx = Math.max(this.activeProfile.minRadiusPx, this.activeProfile.maxRadiusEm * utils.hypotenuse(containerWH.width, containerWH.height));

    var margin = this.activeProfile.margin;
    var infoElHeight = this.activeProfile.infoElHeight;

    //labels
    _this._labels.setCloseCrossHeight(_this.activeProfile.infoElHeight * 1.2);
    _this._labels.setTooltipFontSize(_this.activeProfile.infoElHeight + "px");

    //stage
    this.height = parseInt(this.element.style("height"), 10) - margin.top - margin.bottom || 0;
    this.width = parseInt(this.element.style("width"), 10) - margin.left * this.activeProfile.leftMarginRatio - margin.right || 0;

    if (this.height <= 0 || this.width <= 0) {
      this.height = 0;
      this.width = 0;
      utils.warn("Bubble chart updateSize(): vizabi container is too little or has display:none");
    }

    //graph group is shifted according to margins (while svg element is at 100 by 100%)
    this.graph.attr("transform", "translate(" + margin.left * this.activeProfile.leftMarginRatio + "," + margin.top + ")");

    this.year.resize(this.width, this.height);
    this.eventArea.attr("width", this.width).attr("height", Math.max(0, this.height));

    //update scales to the new range
    if (this.model.marker.axis_y.scaleType !== "ordinal") {
      this.yScale.range(this._rangeBump([this.height, 0]));
    } else {
      this.yScale.rangePoints([this.height, 0], _this.activeProfile.padding).range();
    }
    if (this.model.marker.axis_x.scaleType !== "ordinal") {
      this.xScale.range(this._rangeBump([0, this.width]));
    } else {
      this.xScale.rangePoints([0, this.width], _this.activeProfile.padding).range();
    }

    //apply scales to axes and redraw
    this.yAxis.scale(this.yScale).tickSizeInner(-this.width).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.width, 0).labelerOptions({
      scaleType: this.model.marker.axis_y.scaleType,
      toolMargin: margin,
      limitMaxTickNumber: 6,
      bump: this.activeProfile.maxRadiusPx / 2,
      viewportLength: this.height,
      formatter: this.model.marker.axis_y.getTickFormatter()
    });

    this.xAxis.scale(this.xScale).tickSizeInner(-this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.height, 0).labelerOptions({
      scaleType: this.model.marker.axis_x.scaleType,
      toolMargin: margin,
      bump: this.activeProfile.maxRadiusPx / 2,
      viewportLength: this.width,
      formatter: this.model.marker.axis_x.getTickFormatter()
    });

    this.bubbleContainerCrop.attr("width", this.width).attr("height", Math.max(0, this.height));

    this.labelsContainerCrop.attr("width", this.width).attr("height", Math.max(0, this.height));

    this.xAxisElContainer.attr("width", this.width + 1).attr("height", this.activeProfile.margin.bottom + this.height).attr("y", -1).attr("x", -1);
    this.xAxisEl.attr("transform", "translate(1," + (1 + this.height) + ")");

    this.yAxisElContainer.attr("width", this.activeProfile.margin.left + this.width).attr("height", Math.max(0, this.height)).attr("x", -this.activeProfile.margin.left);
    this.yAxisEl.attr("transform", "translate(" + (this.activeProfile.margin.left - 1) + "," + 0 + ")");

    this.yAxisEl.call(this.yAxis);
    this.xAxisEl.call(this.xAxis);

    this.projectionX.attr("y1", _this.yScale.range()[0] + this.activeProfile.maxRadiusPx / 2);
    this.projectionY.attr("x2", _this.xScale.range()[0] - this.activeProfile.maxRadiusPx / 2);

    // reduce font size if the caption doesn't fit
    this._updateSTitle();
    this.sTitleEl.attr("transform", "translate(" + this.width + "," + 20 + ") rotate(-90)");

    if (layoutProfile !== "small") {
      this.ySubTitleEl.select("text").attr("dy", infoElHeight * 0.6).text(this.strings.subtitle.Y);
      this.xSubTitleEl.select("text").attr("dy", -infoElHeight * 0.3).text(this.strings.subtitle.X);

      this.yTitleEl.select("text").text(this.strings.title_short.Y + " ").append("tspan").style("font-size", infoElHeight * 0.7 + "px").text("▼");
      this.xTitleEl.select("text").text(this.strings.title_short.X + " ").append("tspan").style("font-size", infoElHeight * 0.7 + "px").text("▼");
    } else {
      this.ySubTitleEl.select("text").text("");
      this.xSubTitleEl.select("text").text("");

      var yTitleText = this.yTitleEl.select("text").text(this.strings.title.Y);
      if (yTitleText.node().getBBox().width > this.width) yTitleText.text(this.strings.title_short.Y);

      var xTitleText = this.xTitleEl.select("text").text(this.strings.title.X);
      if (xTitleText.node().getBBox().width > this.width - 100) xTitleText.text(this.strings.title_short.X);
    }

    var isRTL = this.model.locale.isRTL();
    this.ySubTitleEl.style("font-size", infoElHeight * 0.8 + "px").attr("transform", "translate(" + 0 + "," + 0 + ") rotate(-90)");
    this.xSubTitleEl.style("font-size", infoElHeight * 0.8 + "px").attr("transform", "translate(" + this.width + "," + this.height + ")");

    this.yTitleEl.style("font-size", infoElHeight + "px").attr("transform", layoutProfile !== "small" ? "translate(" + (-margin.left - this.activeProfile.yAxisTitleBottomMargin) + "," + this.height * 0.5 + ") rotate(-90)" : "translate(" + (isRTL ? this.width : 10 - this.activeProfile.margin.left) + ", -" + this.activeProfile.yAxisTitleBottomMargin + ")");

    this.xTitleEl.style("font-size", infoElHeight + "px").attr("transform", layoutProfile !== "small" ? "translate(" + this.width * 0.5 + "," + (this.height + margin.bottom - this.activeProfile.xAxisTitleBottomMargin) + ")" : "translate(" + (isRTL ? this.width : 0) + "," + (this.height + margin.bottom - this.activeProfile.xAxisTitleBottomMargin) + ")");

    this.xAxisGroupsEl.style("font-size", infoElHeight * 0.8 + "px");

    if (this.yInfoEl.select("svg").node()) {
      var titleBBox = this.yTitleEl.node().getBBox();
      var t = utils.transform(this.yTitleEl.node());
      var hTranslate = isRTL ? titleBBox.x + t.translateX - infoElHeight * 1.4 : titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4;
      var vTranslate = isRTL ? t.translateY + infoElHeight * 1.4 + titleBBox.width * 0.5 : t.translateY - infoElHeight * 0.4 - titleBBox.width * 0.5;

      this.yInfoEl.select("svg").attr("width", infoElHeight + "px").attr("height", infoElHeight + "px");
      this.yInfoEl.attr("transform", layoutProfile !== "small" ? "translate(" + (t.translateX - infoElHeight * 0.8) + "," + vTranslate + ") rotate(-90)" : "translate(" + hTranslate + "," + (t.translateY - infoElHeight * 0.8) + ")");
    }

    if (this.xInfoEl.select("svg").node()) {
      var _titleBBox = this.xTitleEl.node().getBBox();
      var _t = utils.transform(this.xTitleEl.node());
      var _hTranslate = isRTL ? _titleBBox.x + _t.translateX - infoElHeight * 1.4 : _titleBBox.x + _t.translateX + _titleBBox.width + infoElHeight * 0.4;

      this.xInfoEl.select("svg").attr("width", infoElHeight + "px").attr("height", infoElHeight + "px");
      this.xInfoEl.attr("transform", "translate(" + _hTranslate + "," + (_t.translateY - infoElHeight * 0.8) + ")");
    }

    this._resizeDataWarning();

    this.model.ui.chart.margin.set("left", margin.left * this.activeProfile.leftMarginRatio, false, false);
  },
  _updateDecorations: function _updateDecorations(duration) {
    var _this = this;

    // x axis groups used for incomes
    var showxAxisGroups = this.model.ui.chart.decorations.xAxisGroups && this.model.ui.chart.decorations.xAxisGroups[this.model.marker.axis_x.which] && this.model.ui.chart.decorations.enabled && this.getLayoutProfile() !== "small";

    this.xAxisGroupsEl.classed("vzb-invisible", !showxAxisGroups);
    if (showxAxisGroups) {
      var axisGroupsData = this.model.ui.chart.decorations.xAxisGroups[this.model.marker.axis_x.which];
      var xAxisGroups = this.xAxisGroupsEl.selectAll(".vzb-bc-x-axis-group").data(axisGroupsData);

      xAxisGroups.exit().remove();
      xAxisGroups = xAxisGroups.enter().append("g").attr("class", "vzb-bc-x-axis-group").each(function () {
        var view = d3.select(this);
        view.append("text").attr("class", "vzb-bc-x-axis-group-line").text("◆").style("text-anchor", "middle");
        view.append("text").attr("class", "vzb-bc-x-axis-group-text");
      }).merge(xAxisGroups);

      var xAxisGroups_calcs = [];
      var useShorterLabels = false;

      // first pass: calculate label text sizes and margins
      xAxisGroups.each(function (d, i) {
        var view = d3.select(this);

        var text = view.select("text.vzb-bc-x-axis-group-text").text(_this.translator(d.label));

        var calcs = { min: d.min, max: d.max };

        calcs.textHeight = text.node().getBBox().height;
        calcs.textWidth = text.node().getBBox().width;

        calcs.boundaryMinX_px = _this.xScale(d.min || d.min === 0 ? d.min : d3.min(_this.xScale.domain()));
        calcs.boundaryMaxX_px = _this.xScale(d.max || d.max === 0 ? d.max : d3.max(_this.xScale.domain()));

        calcs.centerX_px = (calcs.boundaryMinX_px + calcs.boundaryMaxX_px) / 2;
        calcs.marginX_px = (Math.abs(calcs.boundaryMinX_px - calcs.boundaryMaxX_px) - calcs.textWidth) / 2;

        if (calcs.marginX_px - calcs.textHeight < 0) useShorterLabels = true;

        xAxisGroups_calcs[i] = calcs;
      });

      // second pass: if at least one of labels doesn't fit, switch to compact mode and recalculate text sizes and margins
      if (useShorterLabels) {
        xAxisGroups.each(function (d, i) {
          var view = d3.select(this);

          var text = view.select("text.vzb-bc-x-axis-group-text").text(_this.translator(d.label_short));

          var calcs = xAxisGroups_calcs[i];

          calcs.textWidth = text.node().getBBox().width;
          calcs.marginX_px = (Math.abs(calcs.boundaryMinX_px - calcs.boundaryMaxX_px) - calcs.textWidth) / 2;

          xAxisGroups_calcs[i] = calcs;
        });
      }

      // third pass: actually put labels in places
      xAxisGroups.each(function (d, i) {
        var view = d3.select(this);

        var isFirst = i == 0;
        var isLast = i == xAxisGroups_calcs.length - 1;
        var calcs = xAxisGroups_calcs[i];
        var minMargin = calcs.textHeight / 4;
        var x = calcs.centerX_px;

        if (isFirst) x = xAxisGroups_calcs[i + 1].boundaryMinX_px - Math.max(xAxisGroups_calcs[i + 1].marginX_px, minMargin);
        if (isLast) x = xAxisGroups_calcs[i - 1].boundaryMaxX_px + Math.max(xAxisGroups_calcs[i - 1].marginX_px, minMargin);

        var text = view.select("text.vzb-bc-x-axis-group-text").transition().duration(duration || 0).style("text-anchor", isFirst ? "end" : isLast ? "start" : "middle").attr("dy", "-0.2em").attr("y", calcs.textHeight).attr("x", x);

        view.select("text.vzb-bc-x-axis-group-line").classed("vzb-invisible", isLast).transition().duration(duration || 0).attr("dy", "-0.2em").attr("y", calcs.textHeight * 0.9).attr("x", calcs.boundaryMaxX_px);
      });

      xAxisGroups.select("text.vzb-bc-x-axis-group-text").on("mouseenter", function (d, i) {
        var calcs = xAxisGroups_calcs[i];
        var parentView = d3.select(this.parentNode);

        d3.select(this).attr("font-weight", "bold");
        parentView.append("rect").lower().attr("x", calcs.boundaryMinX_px).attr("width", calcs.boundaryMaxX_px - calcs.boundaryMinX_px).attr("y", -_this.activeProfile.margin.top).attr("height", _this.height + _this.activeProfile.margin.top);

        if (calcs.min || calcs.min === 0) parentView.append("line").lower().attr("x1", calcs.boundaryMinX_px).attr("x2", calcs.boundaryMinX_px).attr("y1", -_this.activeProfile.margin.top).attr("y2", _this.height);

        if (calcs.max || calcs.max === 0) parentView.append("line").lower().attr("x1", calcs.boundaryMaxX_px).attr("x2", calcs.boundaryMaxX_px).attr("y1", -_this.activeProfile.margin.top).attr("y2", _this.height);
      }).on("mouseleave", function (d, i) {
        var parentView = d3.select(this.parentNode);

        d3.select(this).attr("font-weight", null);
        parentView.selectAll("rect").remove();
        parentView.selectAll("line").remove();
      });
    }

    // diagonal line that is used when the same idicator ID is used for both axis X and Y
    var showLineEqualXY = this.model.marker.axis_x.which == this.model.marker.axis_y.which && this.model.ui.chart.decorations.enabled && this.getLayoutProfile() !== "small";

    this.lineEqualXY.classed("vzb-invisible", !showLineEqualXY);
    if (showLineEqualXY) {
      var min = d3.min(this.yScale.domain().concat(this.xScale.domain()));
      var max = d3.max(this.yScale.domain().concat(this.xScale.domain()));

      this.lineEqualXY.transition().duration(duration || 0).attr("y1", this.yScale(min)).attr("y2", this.yScale(max)).attr("x1", this.xScale(min)).attr("x2", this.xScale(max));
    }
  },
  _resizeDataWarning: function _resizeDataWarning() {
    // reset font size to remove jumpy measurement
    var dataWarningText = this.dataWarningEl.select("text").style("font-size", null);

    // reduce font size if the caption doesn't fit
    var dataWarningWidth = dataWarningText.node().getBBox().width + dataWarningText.node().getBBox().height * 3;
    var remainingWidth = this.width - this.xTitleEl.node().getBBox().width - this.activeProfile.infoElHeight;
    var font = parseInt(dataWarningText.style("font-size")) * remainingWidth / dataWarningWidth;
    dataWarningText.style("font-size", dataWarningWidth > remainingWidth ? font + "px" : null);

    // position the warning icon
    var warnBB = dataWarningText.node().getBBox();
    this.dataWarningEl.select("svg").attr("width", warnBB.height * 0.75).attr("height", warnBB.height * 0.75).attr("x", -warnBB.width - warnBB.height * 1.2).attr("y", -warnBB.height * 0.65);

    this.dataWarningEl.attr("transform", "translate(" + (this.model.locale.isRTL() ? warnBB.width + warnBB.height : this.width) + "," + (this.height + this.activeProfile.margin.bottom - this.activeProfile.xAxisTitleBottomMargin) + ")");
  },
  updateMarkerSizeLimits: function updateMarkerSizeLimits() {
    var _this = this;
    var extent = this.model.marker.size.extent || [0, 1];

    if (!this.activeProfile) return utils.warn("updateMarkerSizeLimits() is called before ready(). This can happen if events get unfrozen and getFrame() still didn't return data");

    var minRadius = this.activeProfile.minRadiusPx;
    var maxRadius = this.activeProfile.maxRadiusPx;

    var minArea = utils.radiusToArea(Math.max(maxRadius * extent[0], minRadius));
    var maxArea = utils.radiusToArea(Math.max(maxRadius * extent[1], minRadius));

    var range = minArea === maxArea ? [minArea, maxArea] : d3.range(minArea, maxArea, (maxArea - minArea) / this.sScale.domain().length).concat(maxArea);

    this.sScale.range(range);
  },
  redrawDataPointsOnlyColors: function redrawDataPointsOnlyColors() {
    var _this = this;
    if (!this.entityBubbles) return utils.warn("redrawDataPointsOnlyColors(): no entityBubbles defined. likely a premature call, fix it!");

    var valuesNow = void 0;
    var dataKeys = this.dataKeys = this.model.marker.getDataKeysPerHook();
    var KEYS = this.KEYS;
    var KEY = this.KEY;

    var time = this.model.time.value;

    if (this.model.ui.chart.lockNonSelected && this.someSelected) {
      time = this.model.time.parse("" + this.model.ui.chart.lockNonSelected);
    }
    this.model.marker.getFrame(time, function (valuesLocked) {
      if (!_this._frameIsValid(valuesLocked)) return utils.warn("redrawDataPointsOnlyColor: empty data received from marker.getFrame(). doing nothing");

      valuesNow = _this.frame;
      _this.entityBubbles.each(function (d, index) {

        var selected = _this.model.marker.isSelected(d);

        var valueC = selected ? valuesNow.color[utils.getKey(d, dataKeys.color)] : valuesLocked.color[utils.getKey(d, dataKeys.color)];

        var scaledC = valueC != null ? _this.cScale(valueC) : _this.COLOR_WHITEISH;

        d3.select(this).style("fill", scaledC);

        //update lines of labels
        if (selected) {

          var select = utils.find(_this.model.marker.select, function (f) {
            return utils.getKey(f, KEYS) == d[KEY];
          });

          var trailStartTime = _this.model.time.parse("" + select.trailStartTime);

          _this.model.marker.getFrame(trailStartTime, function (valuesTrailStart) {
            if (!valuesTrailStart) return utils.warn("redrawDataPointsOnlyColor: empty data received from marker.getFrames(). doing nothing");

            var cache = {};
            if (!_this.model.ui.chart.trails || trailStartTime - _this.time == 0) {
              cache.scaledC0 = scaledC;
            } else {
              var _valueC = valuesTrailStart.color[utils.getKey(d, dataKeys.color)];
              cache.scaledC0 = _valueC != null ? _this.cScale(_valueC) : _this.COLOR_WHITEISH;
            }

            _this._labels.updateLabelOnlyColor(d, index, cache);
          });
        }
      });
    });
  },
  redrawDataPointsOnlySize: function redrawDataPointsOnlySize() {
    var _this = this;

    var valuesNow = void 0;
    var dataKeys = this.dataKeys = this.model.marker.getDataKeysPerHook();
    var KEYS = this.KEYS;
    var KEY = this.KEY;

    var time = this.model.time.value;

    if (this.model.ui.chart.lockNonSelected && this.someSelected) {
      time = this.model.time.parse("" + this.model.ui.chart.lockNonSelected);
    }
    this.model.marker.getFrame(time, function (valuesLocked) {
      if (!_this._frameIsValid(valuesLocked)) return utils.warn("redrawDataPointsOnlySize: empty data received from marker.getFrame(). doing nothing");

      valuesNow = _this.frame;
      _this.entityBubbles.each(function (d, index) {

        var selected = _this.model.marker.isSelected(d);

        var valueS = selected ? valuesNow.size[utils.getKey(d, dataKeys.size)] : valuesLocked.size[utils.getKey(d, dataKeys.size)];
        if (valueS == null) return;

        var scaledS = utils.areaToRadius(_this.sScale(valueS));
        d3.select(this).attr("r", scaledS);

        //update lines of labels
        if (selected) {

          var select = utils.find(_this.model.marker.select, function (f) {
            return utils.getKey(f, KEYS) == d[KEY];
          });

          var trailStartTime = _this.model.time.parse("" + select.trailStartTime);

          _this.model.marker.getFrame(trailStartTime, function (valuesTrailStart) {
            if (!valuesTrailStart) return utils.warn("redrawDataPointsOnlySize: empty data received from marker.getFrames(). doing nothing");

            var cache = {};
            if (!_this.model.ui.chart.trails || trailStartTime - _this.time == 0) {
              cache.scaledS0 = scaledS;
            } else {
              cache.scaledS0 = utils.areaToRadius(_this.sScale(valuesTrailStart.size[utils.getKey(d, dataKeys.size)]));
            }

            _this._labels.updateLabelOnlyPosition(d, index, cache);
          });
        }
      });
    });
  },


  /*
   * REDRAW DATA POINTS:
   * Here plotting happens
   * debouncing to improve performance: events might trigger it more than 1x
   */
  redrawDataPoints: function redrawDataPoints(duration) {
    var _this = this;
    var KEY = this.KEY;
    if (duration == null) duration = _this.duration;

    if (this.model.ui.chart.lockNonSelected && this.someSelected) {
      var time = this.model.time.parse("" + this.model.ui.chart.lockNonSelected);

      //get values for locked frames
      this.model.marker.getFrame(time, function (lockedFrame) {
        if (!lockedFrame) return utils.warn("redrawDataPoints: empty data received from marker.getFrames(). doing nothing");

        // each bubble
        _this.entityBubbles.each(function (d, index) {
          var frame = _this.model.marker.isSelected(d) ? _this.frame : lockedFrame;
          _this._updateBubble(d, frame, index, d3.select(this), duration);
        });
      });
    } else {
      // each bubble
      _this.entityBubbles.each(function (d, index) {
        _this._updateBubble(d, _this.frame, index, d3.select(this), duration);
      });
    }

    this._updateDecorations(duration);
  },


  //redraw Data Points
  _updateBubble: function _updateBubble(d, values, index, view, duration) {
    var _this = this;
    var dataKeys = this.dataKeys;

    var showhide = false;

    var valueY = values.axis_y[utils.getKey(d, dataKeys.axis_y)];
    var valueX = values.axis_x[utils.getKey(d, dataKeys.axis_x)];
    var valueS = values.size[utils.getKey(d, dataKeys.size)];
    var valueL = values.label[utils.getKey(d, dataKeys.label)];
    var valueC = values.color[utils.getKey(d, dataKeys.color)];
    var valueLST = values.size_label[utils.getKey(d, dataKeys.size_label)];

    // check if fetching data succeeded
    if (!valueY && valueY !== 0 || !valueX && valueX !== 0 || !valueS && valueS !== 0) {
      // if entity is missing data it should hide
      if (!d.hidden) {
        d.hidden = true;
        showhide = true;
      }

      if (showhide) {
        if (duration) {
          var opacity = view.style("opacity");
          view.transition().duration(duration).ease(d3.easeExp).style("opacity", 0).on("end", function () {
            //to avoid transition from null state add class with a delay
            view.classed("vzb-invisible", d.hidden);
            view.style("opacity", opacity);
          });
        } else {
          //immediately hide the bubble
          view.classed("vzb-invisible", d.hidden);
        }
      }
    } else {
      if (d.hidden || view.classed("vzb-invisible")) {
        d.hidden = false;
        showhide = true;
      }

      // if entity has all the data we update the visuals
      var scaledS = utils.areaToRadius(_this.sScale(valueS));

      view.style("fill", valueC != null ? _this.cScale(valueC) : _this.COLOR_WHITEISH);

      if (duration) {
        if (showhide) {
          var _opacity = view.style("opacity");
          view.classed("vzb-invisible", d.hidden);
          view.style("opacity", 0).attr("cy", _this.yScale(valueY)).attr("cx", _this.xScale(valueX)).attr("r", scaledS).transition().duration(duration).ease(d3.easeExp).style("opacity", _opacity);
        } else {
          view.transition().duration(duration).ease(d3.easeLinear).attr("cy", _this.yScale(valueY)).attr("cx", _this.xScale(valueX)).attr("r", scaledS);
        }
      } else {

        //interrupt the ongoing transition and immediately do the visual updates
        view.interrupt().attr("cy", _this.yScale(valueY)).attr("cx", _this.xScale(valueX)).attr("r", scaledS).transition();

        //show entity if it was hidden
        if (showhide) view.classed("vzb-invisible", d.hidden);
      }

      if (this.model.time.record) _this._export.write({
        type: "circle",
        id: d[KEY],
        time: this.model.time.value.getUTCFullYear(),
        fill: valueC != null ? _this.cScale(valueC) : _this.COLOR_WHITEISH,
        cx: _this.xScale(valueX),
        cy: _this.yScale(valueY),
        r: scaledS
      });
    } // data exists
    _this._updateLabel(d, index, values, valueX, valueY, valueS, valueC, valueL, valueLST, duration, showhide);
  },
  _updateLabel: function _updateLabel(d, index, values, valueX, valueY, valueS, valueC, valueL, valueLST, duration, showhide) {
    var _this = this;
    var KEYS = this.KEYS;
    var KEY = this.KEY;

    // only for selected markers
    if (_this.model.marker.isSelected(d)) {

      var cache = {};

      var select = utils.find(_this.model.marker.select, function (f) {
        return utils.getKey(f, KEYS) == d[KEY];
      });

      var time = _this.model.time.formatDate(_this.time);
      if (!this.model.ui.chart.trails || select.trailStartTime == time || select.trailStartTime == null) {
        if (this.model.ui.chart.trails && select.trailStartTime == null) select.trailStartTime = time; // need only when trailStartTime == null

        cache.labelX0 = valueX;
        cache.labelY0 = valueY;
        cache.scaledC0 = valueC != null ? _this.cScale(valueC) : _this.COLOR_WHITEISH, cache.scaledS0 = valueS || valueS === 0 ? utils.areaToRadius(_this.sScale(valueS)) : null;
      }

      var trailStartTime = _this.model.time.parse("" + select.trailStartTime);

      var labelText = _this._getLabelText(values, d, select.trailStartTime);

      if (showhide && d.hidden && _this.model.ui.chart.trails && trailStartTime && trailStartTime < _this.time) showhide = false;
      if (d.hidden && !_this.model.ui.chart.trails) showhide = true;

      this._labels.updateLabel(d, index, cache, valueX, valueY, valueS, valueC, labelText, valueLST, duration, showhide);
    }
  },
  _getLabelText: function _getLabelText(values, d, time) {
    return this.model.marker.getCompoundLabelText(d, values) + (time && this.model.time.start - this.model.time.end !== 0 ? " " + time : "");
  },
  _updateForecastOverlay: function _updateForecastOverlay() {
    this.forecastOverlay.classed("vzb-hidden", this.model.time.value <= this.model.time.endBeforeForecast || !this.model.time.endBeforeForecast || !this.model.ui.chart.showForecastOverlay);
  },
  _setTooltip: function _setTooltip(tooltipText, x, y, s, c, d) {
    if (tooltipText) {
      var labelValues = {};
      if (d) {
        var dataKeys = this.dataKeys;
        var values = this.frame;
        labelValues.valueY = values.axis_y[utils.getKey(d, dataKeys.axis_y)];
        labelValues.valueX = values.axis_x[utils.getKey(d, dataKeys.axis_x)];
        labelValues.valueS = values.size[utils.getKey(d, dataKeys.size)];
        labelValues.valueC = values.color[utils.getKey(d, dataKeys.color)];
        labelValues.valueLST = values.size_label[utils.getKey(d, dataKeys.size_label)];
        labelValues.labelText = this._getLabelText(values, d, this.model.time.formatDate(this.time));
      }

      var tooltipCache = {};
      tooltipCache.labelX0 = this.xScale.invert(x);
      tooltipCache.labelY0 = this.yScale.invert(y);
      tooltipCache.scaledS0 = s;
      tooltipCache.scaledC0 = null;

      this._labels.setTooltip(d, tooltipText, tooltipCache, labelValues);
    } else {
      this._labels.setTooltip();
    }
  },
  _formatSTitleValues: function _formatSTitleValues(titleS, titleC) {
    var _this = this;
    var unitS = this.strings.unit.S;
    var unitC = this.strings.unit.C;

    var formatterS = this.model.marker.size.getTickFormatter();
    var formatterC = this.model.marker.color.getTickFormatter();

    //resolve labels for colors via the color legend
    if (this.model.marker.color.isDiscrete() && this.model.marker.color.use !== "constant" && titleC && this.model.marker.color.getColorlegendMarker()) {
      titleC = this.model.marker.color.getColorlegendMarker().label.getItems()[titleC] || "";
    }

    return [formatterS(titleS) + " " + unitS, titleC || titleC === 0 ? formatterC(titleC) + " " + unitC : this.translator("hints/nodata")];
  },
  _updateSTitle: function _updateSTitle(titleS, titleC) {

    // vertical text about size and color
    if (this.activeProfile.hideSTitle && this.model.ui.dialogs.sidebar.indexOf("colors") > -1 && this.model.ui.dialogs.sidebar.indexOf("size") > -1) {
      this.sTitleEl.classed("vzb-invisible", true);
      return;
    }
    if (this.sTitleEl.classed("vzb-invisible")) {
      this.sTitleEl.classed("vzb-invisible", false);
    }
    var sTitleContentON = this.model.marker.size.use !== "constant";
    var cTitleContentON = this.model.marker.color.use !== "constant";
    var sTitleText = this.sTitleEl.select("text")
    // reset font size to remove jumpy measurement
    .style("font-size", null).text((sTitleContentON ? this.translator("buttons/size") + ": " + (titleS ? titleS : this.strings.title.S) : "") + (sTitleContentON && cTitleContentON ? ", " : "") + (cTitleContentON ? this.translator("buttons/colors") + ": " + (titleC ? titleC : this.strings.title.C) : ""));
    var sTitleWidth = sTitleText.node().getBBox().width;
    var remainigHeight = this.height - 30;
    var font = parseInt(sTitleText.style("font-size")) * remainigHeight / sTitleWidth;
    sTitleText.style("font-size", sTitleWidth > remainigHeight ? font + "px" : null);
  },
  selectDataPoints: function selectDataPoints() {
    var _this = this;
    var KEY = this.KEY;

    if (utils.isTouchDevice()) {
      _this.model.marker.clearHighlighted();
      _this._labels.showCloseCross(null, false);
    } else {
      //hide tooltip
      _this._setTooltip();
      _this._setBubbleCrown();
    }

    _this.someSelected = _this.model.marker.select.length > 0;
    _this.nonSelectedOpacityZero = false;
  },
  _setBubbleCrown: function _setBubbleCrown(x, y, r, glow, skipInnerFill) {
    if (x != null) {
      this.bubbleCrown.classed("vzb-hidden", false);
      this.bubbleCrown.select(".vzb-crown").attr("cx", x).attr("cy", y).attr("r", r).attr("fill", skipInnerFill ? "none" : glow);
      this.bubbleCrown.selectAll(".vzb-crown-glow").attr("cx", x).attr("cy", y).attr("r", r + 10).attr("stroke", glow);
    } else {
      this.bubbleCrown.classed("vzb-hidden", true);
    }
  },


  /*
   * Shows and hides axis projections
   */
  _axisProjections: function _axisProjections(d) {
    var _this = this;
    var TIMEDIM = this.TIMEDIM;
    var dataKeys = this.dataKeys;

    if (d != null) {

      this.model.marker.getFrame(d[TIMEDIM], function (values) {
        var valueY = values.axis_y[utils.getKey(d, dataKeys.axis_y)];
        var valueX = values.axis_x[utils.getKey(d, dataKeys.axis_x)];
        var valueS = values.size[utils.getKey(d, dataKeys.size)];
        var radius = utils.areaToRadius(_this.sScale(valueS));

        if (!valueY && valueY !== 0 || !valueX && valueX !== 0 || !valueS && valueS !== 0) return;

        if (_this.model.ui.chart.whenHovering.showProjectionLineX && _this.xScale(valueX) > 0 && _this.xScale(valueX) < _this.width && _this.yScale(valueY) + radius < _this.height) {
          _this.projectionX.style("opacity", 1).attr("y2", _this.yScale(valueY) + radius).attr("x1", _this.xScale(valueX)).attr("x2", _this.xScale(valueX));
        }

        if (_this.model.ui.chart.whenHovering.showProjectionLineY && _this.yScale(valueY) > 0 && _this.yScale(valueY) < _this.height && _this.xScale(valueX) - radius > 0) {
          _this.projectionY.style("opacity", 1).attr("y1", _this.yScale(valueY)).attr("y2", _this.yScale(valueY)).attr("x1", _this.xScale(valueX) - radius);
        }

        if (_this.model.ui.chart.whenHovering.higlightValueX) _this.xAxisEl.call(_this.xAxis.highlightValue(valueX));

        if (_this.model.ui.chart.whenHovering.higlightValueY) _this.yAxisEl.call(_this.yAxis.highlightValue(valueY));
      });
    } else {

      this.projectionX.style("opacity", 0);
      this.projectionY.style("opacity", 0);
      this.xAxisEl.call(this.xAxis.highlightValue("none"));
      this.yAxisEl.call(this.yAxis.highlightValue("none"));
    }
  },


  /*
   * Highlights all hovered bubbles
   */
  highlightDataPoints: function highlightDataPoints() {
    var _this = this;
    var TIMEDIM = this.TIMEDIM;
    var dataKeys = this.dataKeys;
    var KEYS = this.KEYS;
    var KEY = this.KEY;

    this.someHighlighted = this.model.marker.highlight.length > 0;

    this.updateBubbleOpacity();

    if (this.model.marker.highlight.length === 1) {
      var d = utils.clone(this.model.marker.highlight[0]);
      d[KEY] = utils.getKey(d, KEYS);

      if (_this.model.ui.chart.lockNonSelected && _this.someSelected && !_this.model.marker.isSelected(d)) {
        d[TIMEDIM] = _this.model.time.parse("" + _this.model.ui.chart.lockNonSelected);
      } else {
        d[TIMEDIM] = _this.model.time.parse("" + d.trailStartTime) || _this.time;
      }

      _this.model.marker.getFrame(d[TIMEDIM], function (values) {
        if (!values) return;
        var x = _this.xScale(values.axis_x[utils.getKey(d, dataKeys.axis_x)]);
        var y = _this.yScale(values.axis_y[utils.getKey(d, dataKeys.axis_y)]);
        var s = utils.areaToRadius(_this.sScale(values.size[utils.getKey(d, dataKeys.size)]));
        var c = values.color[utils.getKey(d, dataKeys.color)] != null ? _this.cScale(values.color[utils.getKey(d, dataKeys.color)]) : _this.COLOR_WHITEISH;
        var entityOutOfView = false;

        var titles = _this._formatSTitleValues(values.size[utils.getKey(d, dataKeys.size)], values.color[utils.getKey(d, dataKeys.color)]);
        _this._updateSTitle(titles[0], titles[1]);
        if (x + s < 0 || x - s > _this.width || y + s < 0 || y - s > _this.height) {
          entityOutOfView = true;
        }

        //show tooltip
        var text = "";
        var hoverTrail = false;
        if (_this.model.marker.isSelected(d) && _this.model.ui.chart.trails) {
          text = _this.model.time.formatDate(_this.time);
          var _selectedData = utils.find(_this.model.marker.select, function (f) {
            return utils.getKey(f, KEYS) == d[KEY];
          });
          hoverTrail = text !== _selectedData.trailStartTime && !d3.select(d3.event.target).classed("bubble-" + d[KEY]);
          text = text !== _selectedData.trailStartTime && _this.time === d[TIMEDIM] ? text : "";
        } else {
          text = _this.model.marker.isSelected(d) ? "" : _this._getLabelText(values, d);
        }

        _this._labels.highlight(null, false);
        _this._labels.highlight(d, true);
        if (_this.model.marker.isSelected(d)) {
          var skipCrownInnerFill = !d.trailStartTime || d.trailStartTime == _this.model.time.formatDate(_this.time);
          _this._setBubbleCrown(x, y, s, c, skipCrownInnerFill);
        }

        if (!entityOutOfView && !hoverTrail) {
          _this._axisProjections(d);
        }

        //set tooltip and show axis projections
        if (text && !entityOutOfView && !hoverTrail) {
          _this._setTooltip(text, x, y, s + 3, c, d);
        }

        var selectedData = utils.find(_this.model.marker.select, function (f) {
          return utils.getKey(f, KEYS) == d[KEY];
        });
        if (selectedData) {
          var clonedSelectedData = utils.clone(selectedData);
          //change opacity to OPACITY_HIGHLT = 1.0;
          clonedSelectedData.opacity = 1.0;
          _this._trails.run(["opacityHandler"], clonedSelectedData);
        }
      });
    } else {
      this._axisProjections();
      this._trails.run(["opacityHandler"]);
      //hide tooltip
      _this._updateSTitle();
      this._setTooltip();
      this._setBubbleCrown();
      this._labels.highlight(null, false);
    }
  },
  _blinkSuperHighlighted: function _blinkSuperHighlighted() {
    var _this3 = this;

    this.entityBubbles.classed("vzb-super-highlighted", function (d) {
      return _this3.model.marker.isSuperHighlighted(d);
    });
  },
  updateBubbleOpacity: function updateBubbleOpacity(duration) {
    var _this = this;
    //if(!duration)duration = 0;

    var OPACITY_HIGHLT = 1.0;
    var OPACITY_HIGHLT_DIM = this.model.marker.opacityHighlightDim;
    var OPACITY_SELECT = 1.0;
    var OPACITY_REGULAR = this.model.marker.opacityRegular;
    var OPACITY_SELECT_DIM = this.model.marker.opacitySelectDim;

    this.entityBubbles
    //.transition().duration(duration)
    .style("opacity", function (d) {

      if (_this.someHighlighted) {
        //highlight or non-highlight
        if (_this.model.marker.isHighlighted(d)) return OPACITY_HIGHLT;
      }

      if (_this.someSelected) {
        //selected or non-selected
        return _this.model.marker.isSelected(d) ? OPACITY_SELECT : OPACITY_SELECT_DIM;
      }

      if (_this.someHighlighted) return OPACITY_HIGHLT_DIM;

      return OPACITY_REGULAR;
    });

    var nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;

    // when pointer events need update...
    if (nonSelectedOpacityZero != this.nonSelectedOpacityZero) {
      this.entityBubbles.style("pointer-events", function (d) {
        return !_this.someSelected || !nonSelectedOpacityZero || _this.model.marker.isSelected(d) ? "visible" : "none";
      });
    }

    this.nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
  }
});

exports.default = BubbleChart;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = __webpack_require__(5);

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Vizabi = Vizabi,
    utils = _Vizabi.utils;


var Trail = Vizabi.Class.extend({
  init: function init(context) {
    this.context = context;
    this._isCreated = null;
    this.actionsQueue = {};
    this.entityTrails = {};
    this.trailsData = [];
    this.trailsInProgress = {};
    this.activePromises = {};
    this.trailTransitions = {};
    this.delayedIterations = {};
    this.drawingQueue = {};
  },
  toggle: function toggle(arg) {
    var _context = this.context;
    if (arg) {

      _context._trails.create().then(function () {
        _context._trails.run(["findVisible", "reveal", "opacityHandler"]);
      });
    } else {
      _context._trails.run("remove");
      _context.model.marker.select.forEach(function (d) {
        delete d.trailStartTime;
      });
    }
  },
  create: function create(selection) {
    var _context = this.context;
    var _this = this;
    var KEYS = _context.KEYS;
    var KEY = _context.KEY;
    var dataKeys = _context.dataKeys;
    var TIMEDIM = _context.TIMEDIM;
    this._isCreated = new Promise(function (resolve, reject) {
      //quit if the function is called accidentally
      if (!_context.model.ui.chart.trails) return;

      var timePoints = _context.model.time.getAllSteps();

      //work with marker.select (all selected entities), if no particular selection is specified
      var promises = [];
      selection = selection == null ? _context.model.marker.select : [selection];
      _this._clearActions(selection);
      _this.trailsData = _context.model.marker.select.map(function (d) {
        var r = {
          status: "created",
          selectedEntityData: d
        };
        KEYS.forEach(function (key) {
          return r[key] = d[key];
        });
        r[KEY] = utils.getKey(d, KEYS);
        return r;
      });
      _this.trailTransitions = {};
      var _trails = _context.bubbleContainer.selectAll("g.vzb-bc-entity.entity-trail").data(_this.trailsData, function (d) {
        return d[KEY];
      });

      _trails.exit().remove();
      _trails.enter().insert("g", function (d) {
        return this.querySelector(".bubble-" + (0, _css2.default)(d[KEY]));
      }).attr("class", function (d) {
        return "vzb-bc-entity entity-trail trail-" + d[KEY];
      }).merge(_trails).each(function (d, index) {
        // used for prevent move trail start time forward when we have empty values at end of time range
        var trail = this;
        promises.push(new Promise(function (resolve, reject) {
          var trailSegmentData = timePoints.map(function (m) {
            return {
              t: m,
              key: d[KEY]
            };
          });
          var entityTrails = d3.select(trail).selectAll("g").data(trailSegmentData).classed("vzb-invisible", true);

          entityTrails.exit().remove();

          _this.entityTrails[d[KEY]] = entityTrails.enter().append("g").attr("class", "vzb-bc-trailsegment vzb-invisible").on("mouseover", function (segment, index) {
            if (utils.isTouchDevice()) return;

            var pointer = {};
            pointer[KEY] = segment.key;
            pointer[TIMEDIM] = segment.t;

            _context._axisProjections(pointer);
            _context._labels.highlight(d, true);
            var text = _context.model.time.formatDate(segment.t);
            var selectedData = utils.find(_context.model.marker.select, function (f) {
              return utils.getKey(f, KEYS) == d[KEY];
            });
            _context.model.marker.getFrame(pointer[TIMEDIM], function (values) {
              var x = _context.xScale(values.axis_x[utils.getKey(d, dataKeys.axis_x)]);
              var y = _context.yScale(values.axis_y[utils.getKey(d, dataKeys.axis_y)]);
              var s = utils.areaToRadius(_context.sScale(values.size[utils.getKey(d, dataKeys.size)]));
              var c = values.color[utils.getKey(d, dataKeys.color)] != null ? _context.cScale(values.color[utils.getKey(d, dataKeys.color)]) : _context.COLOR_WHITEISH;
              if (text !== selectedData.trailStartTime) {
                _context._setTooltip(text, x, y, s + 3, c);
              }
              _context._setBubbleCrown(x, y, s, c);
              _context.model.marker.getModelObject("highlight").trigger("change", {
                "size": values.size[utils.getKey(d, dataKeys.size)],
                "color": values.color[utils.getKey(d, dataKeys.color)]
              });
            });
            //change opacity to OPACITY_HIGHLT = 1.0;
            d3.select(this).style("opacity", 1.0);
          }).on("mouseout", function (segment, index) {
            if (utils.isTouchDevice()) return;
            _context._axisProjections();
            _context._setTooltip();
            _context._setBubbleCrown();
            _context._labels.highlight(null, false);
            _context.model.marker.getModelObject("highlight").trigger("change", null);
            d3.select(this).style("opacity", _context.model.marker.opacityRegular);
          }).each(function (segment, index) {
            var view = d3.select(this);
            view.append("circle");
            view.append("line");
          }).merge(entityTrails);
          resolve();
        }));
      });
      if (promises.length > 0) {
        Promise.all(promises).then(function (segments) {
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
    return this._isCreated;
  },


  /**
   * add actions for each selected entities
   * @param selections
   * @param actions
   * @private
   */
  _addActions: function _addActions(selections, actions) {
    var _context = this.context;
    var _this = this;
    var KEYS = _context.KEYS;

    selections.forEach(function (d) {
      var key = utils.getKey(d, KEYS);
      if (!_this.actionsQueue[key]) _this.actionsQueue[key] = [];
      _this.actionsQueue[key] = [].concat(_this.actionsQueue[key].filter(function (value) {
        return actions.indexOf(value) == -1;
      }), actions);
    });
  },
  _clearActions: function _clearActions(selections) {
    var _context = this.context;
    var _this = this;
    var KEYS = _context.KEYS;

    selections.forEach(function (d) {
      var key = utils.getKey(d, KEYS);
      if (!_this.actionsQueue[key]) _this.actionsQueue[key] = [];
      _this.actionsQueue[key] = [];
      _this.drawingQueue[key] = {};
      _this.delayedIterations[key] = {};
      if (!_this.activePromises[key]) _this.activePromises[key] = [];
      utils.forEach(_this.activePromises[key], function (promise, key) {
        if (promise.status === "pending") promise.reject();
      });
      _this.trailsInProgress[key] = null;
      _this.activePromises[key] = [];
    });
  },
  _getNextAction: function _getNextAction(key) {
    return this.actionsQueue[key].shift();
  },
  run: function run(actions, selection, duration) {
    var _context = this.context;
    var _this = this;
    var KEY = _context.KEY;
    if (!this._isCreated || _context.model.time.splash) return;
    if (typeof actions === "string") actions = [actions];

    this._isCreated.then(function () {
      //quit if function is called accidentally
      if ((!_context.model.ui.chart.trails || !_context.model.marker.select.length) && actions != "remove") return;

      if (!duration) duration = 0;

      //work with marker.select (all selected entities), if no particular selection is specified
      selection = selection == null ? _context.model.marker.select : [selection];
      for (var i = 0; i < actions.length; i++) {
        if (["resize", "recolor", "remove"].indexOf(actions[i]) != -1) {
          (function () {
            var action = actions.splice(i, 1).pop();
            --i;
            _this.trailsData.forEach(function (d) {
              var trail = _this.entityTrails[d[KEY]];
              _context._trails["_" + action](trail, duration, d);
            });
          })();
        }
      }
      if (actions.length == 0) {
        return;
      }
      _this._addActions(selection, actions);
      _this.trailsData.forEach(function (d) {
        if (actions.indexOf("findVisible") != -1) {
          _this.drawingQueue[d[KEY]] = {};
          _this.delayedIterations[d[KEY]] = {};
        }
        var trail = _this.entityTrails[d[KEY]];
        //do all the actions over "trail"
        var executeSequential = function executeSequential(index) {
          // some function can be async, but we should run next when previous completed
          var action = _this._getNextAction(d[KEY]);
          if (action) {
            _this.trailsInProgress[d[KEY]] = action;
            var response = _context._trails["_" + action](trail, duration, d);
            if (response && response instanceof Promise) {
              response.then(function () {
                _this.trailsInProgress[d[KEY]] = null;
                executeSequential(index + 1);
              }, function () {
                _this.trailsInProgress[d[KEY]] = null;
              });
            } else {
              _this.trailsInProgress[d[KEY]] = null;
              executeSequential(index + 1);
            }
          }
        };
        if (!_this.trailsInProgress[d[KEY]]) {
          executeSequential(0);
        }
      });
    });
  },
  _remove: function _remove(trail, duration, d) {
    this.actionsQueue[d[this.context.KEY]] = [];
    if (trail) {
      // TODO: in some reason run twice
      d3.select(this.entityTrails[d[this.context.KEY]].node().parentNode).remove();
      this.entityTrails[d[this.context.KEY]] = null;
    }
  },
  _resize: function _resize(trail, duration, d) {
    var _context = this.context;
    if (_context.model.time.splash) {
      return;
    }
    //    this._isCreated.then(function() {
    var updateLabel = false;

    trail.each(function (segment, index) {

      if (segment.valueY == null || segment.valueX == null || segment.valueS == null) return;

      var view = d3.select(this);
      if (duration) {
        view.select("circle").transition().duration(duration).ease(d3.easeLinear).attr("cy", _context.yScale(segment.valueY)).attr("cx", _context.xScale(segment.valueX)).attr("r", utils.areaToRadius(_context.sScale(segment.valueS)));
      } else {
        view.select("circle").interrupt().attr("cy", _context.yScale(segment.valueY)).attr("cx", _context.xScale(segment.valueX)).attr("r", utils.areaToRadius(_context.sScale(segment.valueS))).transition();
      }

      if (!updateLabel && !segment.transparent) {
        updateLabel = true;
        _context._labels.updateLabelOnlyPosition(d, null, { "scaledS0": utils.areaToRadius(_context.sScale(segment.valueS)) });
      }

      if (!segment.next) return;
      var next = segment.next;
      if (next == null) return;
      if (next.valueY == null || next.valueX == null) return;

      var lineLength = Math.sqrt(Math.pow(_context.xScale(segment.valueX) - _context.xScale(next.valueX), 2) + Math.pow(_context.yScale(segment.valueY) - _context.yScale(next.valueY), 2));
      if (duration) {
        view.select("line").transition().duration(duration).ease(d3.easeLinear).attr("x1", _context.xScale(next.valueX)).attr("y1", _context.yScale(next.valueY)).attr("x2", _context.xScale(segment.valueX)).attr("y2", _context.yScale(segment.valueY)).attr("stroke-dasharray", lineLength).attr("stroke-dashoffset", utils.areaToRadius(_context.sScale(segment.valueS)));
      } else {
        view.select("line").interrupt().attr("x1", _context.xScale(next.valueX)).attr("y1", _context.yScale(next.valueY)).attr("x2", _context.xScale(segment.valueX)).attr("y2", _context.yScale(segment.valueY)).attr("stroke-dasharray", lineLength).attr("stroke-dashoffset", utils.areaToRadius(_context.sScale(segment.valueS))).transition();
      }
    });
  },
  _recolor: function _recolor(trail, duration, d) {
    var _context = this.context;

    trail.each(function (segment, index) {

      var view = d3.select(this);

      var strokeColor = _context.model.marker.color.which == "geo.world_4region" ?
      //use predefined shades for color palette for "geo.world_4region" (hardcoded)
      _context.model.marker.color.getColorShade({
        colorID: segment.valueC,
        shadeID: "shade"
      }) :
      //otherwise use color of the bubble with a fallback to bubble stroke color (blackish)
      segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_BLACKISH;

      view.select("circle")
      //.transition().duration(duration).ease(d3.easeLinear)
      .style("fill", segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_WHITEISH);
      view.select("line")
      //.transition().duration(duration).ease(d3.easeLinear)
      .style("stroke", strokeColor);
    });
  },
  _opacityHandler: function _opacityHandler(trail, duration, d) {
    var _context = this.context;

    trail.each(function (segment, index) {

      var view = d3.select(this);

      view
      //.transition().duration(duration).ease(d3.easeLinear)
      .style("opacity", d.opacity || _context.model.marker.opacityRegular);
    });
  },
  _findVisible: function _findVisible(trail, duration, d) {
    var _context = this.context;
    var _this = this;
    var KEY = _context.KEY;
    var dataKeys = _context.dataKeys;
    return new Promise(function (resolve, reject) {
      new Promise(function (resolve1, reject1) {
        if (!d.limits) {
          _context.model.marker.getEntityLimits(d[KEY]).then(function (limits) {
            d.limits = limits;
            resolve1();
          });
        } else {
          resolve1();
        }
      }).then(function () {
        if (!d.selectedEntityData.trailStartTime) {
          d.selectedEntityData.trailStartTime = _context.model.time.formatDate(_context.time);
        }
        var trailStartTime = _context.model.time.parse("" + d.selectedEntityData.trailStartTime);
        if (_context.time - trailStartTime < 0 || d.limits.min - trailStartTime > 0) {
          if (_context.time - trailStartTime < 0) {
            // move trail start time with trail label back if need
            d.selectedEntityData.trailStartTime = _context.model.time.formatDate(d3.max([_context.time, d.limits.min]));
            trailStartTime = _context.model.time.parse("" + d.selectedEntityData.trailStartTime);
          } else {
            // move trail start time with trail label to start time if need
            d.selectedEntityData.trailStartTime = _context.model.time.formatDate(d.limits.min);
            trailStartTime = _context.model.time.parse("" + d.selectedEntityData.trailStartTime);
          }
          var cache = _context._labels.cached[d[KEY]];
          var valueS = _context.frame.size[utils.getKey(d, dataKeys.size)];
          var valueC = _context.frame.color[utils.getKey(d, dataKeys.color)];
          cache.labelX0 = _context.frame.axis_x[utils.getKey(d, dataKeys.axis_x)];
          cache.labelY0 = _context.frame.axis_y[utils.getKey(d, dataKeys.axis_y)];
          cache.scaledS0 = valueS || valueS === 0 ? utils.areaToRadius(_context.sScale(valueS)) : null;
          cache.scaledC0 = valueC != null ? _context.cScale(valueC) : _context.COLOR_WHITEISH;
          _context._updateLabel(d, 0, _context.frame, cache.labelX0, cache.labelY0, valueS, valueC, _context.frame.label[utils.getKey(d, dataKeys.label)], _context.frame.size_label[utils.getKey(d, dataKeys.size_label)], 0, true);
        }
        trail.each(function (segment, index) {
          // segment is transparent if it is after current time or before trail StartTime
          var segmentVisibility = segment.transparent;
          segment.transparent = d.selectedEntityData.trailStartTime == null || segment.t - _context.time > 0 || trailStartTime - segment.t > 0
          //no trail segment should be visible if leading bubble is shifted backwards, beyond start time
          || d.selectedEntityData.trailStartTime - _context.model.time.formatDate(_context.time) >= 0;
          // always update nearest 2 points
          if (segmentVisibility != segment.transparent || Math.abs(_context.model.time.formatDate(segment.t) - _context.model.time.formatDate(_context.time)) < 2) segment.visibilityChanged = true; // segment changed, so need to update it
          if (segment.transparent) {
            d3.select(trail._groups[0][index]).classed("vzb-invisible", segment.transparent);
          }
        });
        _this.drawingQueue[d[KEY]] = {};
        _this.delayedIterations[d[KEY]] = {};
        resolve();
      });
    });
  },
  _abortAnimation: function _abortAnimation() {
    var _context = this.context;
    var _this = this;
    var KEY = _context.KEY;
    _this.trailsData.forEach(function (d) {
      if (_this.trailTransitions[d[KEY]]) {
        _this.trailTransitions[d[KEY]].select("line").interrupt().transition();
      }
    });
  },
  _reveal: function _reveal(trail, duration, d) {
    var _context = this.context;
    if (_context.model.time.playing) duration = _context.model.time.delay;
    var _this = this;
    var KEYS = _context.KEYS;
    var KEY = _context.KEY;
    var dataKeys = _context.dataKeys;
    d.status = "reveal";
    var trailStartTime = _context.model.time.parse("" + d.selectedEntityData.trailStartTime);
    var generateTrailSegment = function generateTrailSegment(trail, index, nextIndex, level) {
      return new Promise(function (resolve, reject) {
        var view = d3.select(trail._groups[0][index]);

        var segment = view.datum();

        //console.log(d[KEY] + " transparent: " + segment.transparent + " vis_changed:" + segment.visibilityChanged);
        if (nextIndex - index == 1) {
          if (segment.transparent) {
            view.classed("vzb-invisible", segment.transparent);
            return resolve();
          } else if (!segment.visibilityChanged) {
            // pass segment if it is not changed
            return resolve();
          }
        }
        _context.model.marker.getFrame(segment.t, function (frame) {
          if (d.status != "reveal") return resolve();
          if (!frame) return resolve();
          segment.valueY = frame.axis_y[utils.getKey(d, dataKeys.axis_y)];
          segment.valueX = frame.axis_x[utils.getKey(d, dataKeys.axis_x)];
          segment.valueS = frame.size[utils.getKey(d, dataKeys.size)];
          segment.valueC = frame.color[utils.getKey(d, dataKeys.color)];

          if (segment.valueY == null || segment.valueX == null || segment.valueS == null) {
            return resolve();
          }

          // fix label position if it not in correct place
          if (trailStartTime && trailStartTime.toString() == segment.t.toString()) {
            var cache = _context._labels.cached[d[KEY]];
            cache.labelX0 = segment.valueX;
            cache.labelY0 = segment.valueY;
            var valueS = segment.valueS;
            cache.scaledS0 = valueS || valueS === 0 ? utils.areaToRadius(_context.sScale(valueS)) : null;
            cache.scaledC0 = segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_WHITEISH;
            _context._updateLabel(d, index, frame, segment.valueX, segment.valueY, segment.valueS, segment.valueC, frame.label[utils.getKey(d, dataKeys.label)], frame.size_label[utils.getKey(d, dataKeys.size_label)], 0, true);
          }
          view.select("circle")
          //.transition().duration(duration).ease(d3.easeLinear)
          .attr("cy", _context.yScale(segment.valueY)).attr("cx", _context.xScale(segment.valueX)).attr("r", utils.areaToRadius(_context.sScale(segment.valueS))).style("fill", segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_WHITEISH);

          view.select("line").attr("x2", _context.xScale(segment.valueX)).attr("y2", _context.yScale(segment.valueY)).attr("x1", _context.xScale(segment.valueX)).attr("y1", _context.yScale(segment.valueY));

          // last point should have data for line but it is invisible
          if (_context.time - segment.t > 0) {
            segment.visibilityChanged = false;
            view.classed("vzb-invisible", segment.transparent);
          } else {
            view.classed("vzb-invisible", true);
          }

          if (!trail._groups[0][nextIndex] || _context.time.toString() == segment.t.toString()) {
            return resolve();
          }

          var next = d3.select(trail._groups[0][nextIndex]);
          var nextSegment = next.datum();
          nextSegment.previous = segment;
          segment.next = nextSegment;
          var nextTime = nextSegment.t;
          if (_context.time - nextSegment.t < 0) {
            // time is not equal start of year
            segment.visibilityChanged = true; // redraw needed next time because line not have full length
            nextTime = _context.time;
          }
          _context.model.marker.getFrame(nextTime, function (nextFrame) {
            if (d.status != "reveal") return resolve();
            if (!nextFrame || segment.valueY == null || segment.valueX == null || segment.valueS == null) {
              return resolve();
            }

            if (nextFrame.axis_x[utils.getKey(d, dataKeys.axis_x)] == null || nextFrame.axis_y[utils.getKey(d, dataKeys.axis_y)] == null) {
              return resolve();
            }

            nextSegment.valueY = nextFrame.axis_y[utils.getKey(d, dataKeys.axis_y)];
            nextSegment.valueX = nextFrame.axis_x[utils.getKey(d, dataKeys.axis_x)];
            nextSegment.valueS = nextFrame.size[utils.getKey(d, dataKeys.size)];
            nextSegment.valueC = nextFrame.color[utils.getKey(d, dataKeys.color)];

            _this.trailTransitions[d[KEY]] = view;
            var strokeColor = _context.model.marker.color.which == "geo.world_4region" ?
            //use predefined shades for color palette for "geo.world_4region" (hardcoded)
            _context.model.marker.color.getColorShade({
              colorID: segment.valueC,
              shadeID: "shade"
            }) :
            //otherwise use color of the bubble with a fallback to bubble stroke color (blackish)
            segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_BLACKISH;

            var lineLength = Math.sqrt(Math.pow(_context.xScale(segment.valueX) - _context.xScale(nextSegment.valueX), 2) + Math.pow(_context.yScale(segment.valueY) - _context.yScale(nextSegment.valueY), 2));
            view.select("line").attr("stroke-dasharray", lineLength).attr("stroke-dashoffset", utils.areaToRadius(_context.sScale(segment.valueS))).style("stroke", strokeColor).transition().duration(duration).ease(d3.easeLinear).attr("x1", _context.xScale(nextSegment.valueX)).attr("y1", _context.yScale(nextSegment.valueY)).attr("x2", _context.xScale(segment.valueX)).attr("y2", _context.yScale(segment.valueY));
            if (nextIndex - index > 1) {
              addNewIntervals(index, nextIndex);
              return resolve();
            }
            return resolve();
          });
        });
      });
    };
    var addPointBetween = function addPointBetween(previousIndex, nextIndex, index) {
      return new Promise(function (resolve, reject) {
        var previous = d3.select(trail._groups[0][previousIndex]);
        var next = d3.select(trail._groups[0][nextIndex]);
        var view = d3.select(trail._groups[0][index]);
        var previousSegment = previous.datum();
        var nextSegment = next.datum();
        var segment = view.datum();

        if (!previousSegment.previous && !previousSegment.next || !nextSegment.previous && !nextSegment.next) {
          // segment data cleared by create action
          return resolve();
        }

        _context.model.marker.getFrame(segment.t, function (frame) {
          if (d.status != "reveal") return resolve();
          if (!frame || typeof frame.axis_x === "undefined" || frame.axis_x[utils.getKey(d, dataKeys.axis_x)] == null || typeof frame.axis_y === "undefined" || frame.axis_y[utils.getKey(d, dataKeys.axis_y)] == null) {
            utils.warn("Frame for trail missed: " + segment.t);
            return resolve();
          }
          segment.valueY = frame.axis_y[utils.getKey(d, dataKeys.axis_y)];
          segment.valueX = frame.axis_x[utils.getKey(d, dataKeys.axis_x)];
          segment.valueS = frame.size[utils.getKey(d, dataKeys.size)];
          segment.valueC = frame.color[utils.getKey(d, dataKeys.color)];

          segment.previous = previousSegment;
          segment.next = nextSegment;
          previousSegment.next = segment;
          nextSegment.previous = segment;

          if (segment.valueY == null || segment.valueX == null || segment.valueS == null) {
            utils.warn("Data for trail point missed: " + segment.t);
            return resolve();
          }

          var strokeColor = _context.model.marker.color.which == "geo.world_4region" ?
          //use predefined shades for color palette for "geo.world_4region" (hardcoded)
          _context.model.marker.color.getColorShade({
            colorID: segment.valueC,
            shadeID: "shade"
          }) :
          //otherwise use color of the bubble with a fallback to bubble stroke color (blackish)
          segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_BLACKISH;

          var firstLineLength = Math.sqrt(Math.pow(_context.xScale(previousSegment.valueX) - _context.xScale(segment.valueX), 2) + Math.pow(_context.yScale(previousSegment.valueY) - _context.yScale(segment.valueX), 2));

          previous.select("line").transition().duration(duration).ease(d3.easeLinear).attr("x1", _context.xScale(segment.valueX)).attr("y1", _context.yScale(segment.valueY)).attr("x2", _context.xScale(previousSegment.valueX)).attr("y2", _context.yScale(previousSegment.valueY)).attr("stroke-dasharray", firstLineLength).attr("stroke-dashoffset", utils.areaToRadius(_context.sScale(previousSegment.valueS))).style("stroke", strokeColor);

          view.classed("vzb-invisible", segment.transparent);

          if (!segment.transparent) {
            view.select("circle")
            //.transition().duration(duration).ease(d3.easeLinear)
            .attr("cy", _context.yScale(segment.valueY)).attr("cx", _context.xScale(segment.valueX)).attr("r", utils.areaToRadius(_context.sScale(segment.valueS))).style("fill", segment.valueC != null ? _context.cScale(segment.valueC) : _context.COLOR_WHITEISH);

            var secondLineLength = Math.sqrt(Math.pow(_context.xScale(segment.valueX) - _context.xScale(nextSegment.valueX), 2) + Math.pow(_context.yScale(segment.valueY) - _context.yScale(nextSegment.valueY), 2));

            view.select("line").transition().duration(duration).ease(d3.easeLinear).attr("x1", _context.xScale(nextSegment.valueX)).attr("y1", _context.yScale(nextSegment.valueY)).attr("x2", _context.xScale(segment.valueX)).attr("y2", _context.yScale(segment.valueY)).attr("stroke-dasharray", secondLineLength).attr("stroke-dashoffset", utils.areaToRadius(_context.sScale(segment.valueS))).style("stroke", strokeColor);
          }
          addNewIntervals(previousIndex, index, nextIndex);
          resolve();
        });
      });
    };
    var addNewIntervals = function addNewIntervals(previousIndex, index, nextIndex) {
      var mediumIndex = void 0;
      if (index - previousIndex > 1) {
        mediumIndex = getPointBetween(previousIndex, index);
        _this.delayedIterations[d[KEY]][previousIndex] = {
          first: previousIndex,
          next: index,
          medium: mediumIndex
        };
      }
      if (nextIndex && nextIndex - index > 1) {
        mediumIndex = getPointBetween(index, nextIndex);
        _this.delayedIterations[d[KEY]][index] = {
          first: index,
          next: nextIndex,
          medium: mediumIndex
        };
      }
    };
    var getPointBetween = function getPointBetween(previous, next) {
      return Math.round(previous + (next - previous) / 2);
    };

    var _generateKeys = function _generateKeys(d, trail, div) {
      var response = [];
      var min = 0,
          max = 0;
      var maxValue = d3.min([d.limits.max, _context.time]);
      var minValue = d3.max([d.limits.min, _context.model.time.parse("" + d.selectedEntityData.trailStartTime)]);
      utils.forEach(trail._groups[0], function (segment, index) {
        var data = segment.__data__;
        if (data.t - minValue == 0) {
          min = index;
        } else if (data.t - maxValue == 0) {
          max = index;
        } else {
          if (data.t > minValue && data.t < maxValue) {
            if (_context.model.time.formatDate(data.t) % div == 0 || data.next && data.previous) {
              response.push(index);
            }
          }
        }
      });
      response.unshift(min);
      if (max > 0) {
        response.push(max);
      }
      return response;
    };

    var processPoints = function processPoints() {
      return new Promise(function (resolve, reject) {
        var processPoint = function processPoint() {
          var pointIndex = Object.keys(_this.drawingQueue[d[KEY]])[Math.floor(Math.random() * Object.keys(_this.drawingQueue[d[KEY]]).length)];
          var point = JSON.parse(JSON.stringify(_this.drawingQueue[d[KEY]][pointIndex]));
          delete _this.drawingQueue[d[KEY]][pointIndex];
          addPointBetween(point.first, point.next, point.medium).then(function () {
            if (Object.keys(_this.drawingQueue[d[KEY]]).length > 0) {
              processPoint();
            } else {
              resolve();
            }
          });
        };
        if (Object.keys(_this.drawingQueue[d[KEY]]).length > 0) {
          processPoint(_this.drawingQueue[d[KEY]]);
        } else {
          resolve();
        }
      });
    };

    return new Promise(function (resolve, reject) {
      /**
       * iteration for each point from first segment to last
       * @param trail
       * @param index
       */
      var generateTrails = function generateTrails(trail, index) {
        if (index < 0 || index >= trail._groups[0].length) {
          return resolve();
        }
        generateTrailSegment(trail, index, index + 1).then(function () {
          generateTrails(trail, index + 1);
        }, function () {
          return resolve();
        });
      };

      /**
       * recursive iteration for drawing point between points calculated in previous step
       */
      var processPointsBetween = function processPointsBetween() {
        processPoints().then(function () {
          if (Object.keys(_this.delayedIterations[d[KEY]]).length == 0) {
            return resolve();
          }
          _this.drawingQueue[d[KEY]] = _this.delayedIterations[d[KEY]];
          _this.delayedIterations[d[KEY]] = {};
          processPointsBetween();
        }, function () {
          return resolve();
        });
      };

      if (_context.model.marker.framesAreReady()) {
        generateTrails(trail, 0);
      } else {
        _this.delayedIterations[d[KEY]] = {};
        _this.drawingQueue[d[KEY]] = {};
        var trailKeys = _generateKeys(d, trail, 50);
        var segments = [];
        if (trailKeys.length <= 1) {
          return resolve();
        }

        _this.delayedIterations[d[KEY]] = {};
        for (var i = 0; i < trailKeys.length - 1; i++) {
          segments.push(generateTrailSegment(trail, trailKeys[i], trailKeys[i + 1], 1));
        }
        Promise.all(segments).then(function () {
          if (Object.keys(_this.delayedIterations[d[KEY]]).length == 0) {
            resolve();
          } else {
            _this.drawingQueue[d[KEY]] = _this.delayedIterations[d[KEY]];
            _this.delayedIterations[d[KEY]] = {};
            processPointsBetween();
          }
        }, function () {
          resolve();
        });
      }
    });
  }
});

exports.default = Trail;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
;(function(root, factory) {
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	if (true) {
		// For Node.js.
		module.exports = factory(root);
	} else {}
}(typeof global != 'undefined' ? global : this, function(root) {

	if (root.CSS && root.CSS.escape) {
		return root.CSS.escape;
	}

	// https://drafts.csswg.org/cssom/#serialize-an-identifier
	var cssEscape = function(value) {
		if (arguments.length == 0) {
			throw new TypeError('`CSS.escape` requires an argument.');
		}
		var string = String(value);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
			// (U+FFFD).
			if (codeUnit == 0x0000) {
				result += '\uFFFD';
				continue;
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index == 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit == 0x002D
				)
			) {
				// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			if (
				// If the character is the first character and is a `-` (U+002D), and
				// there is no second character, […]
				index == 0 &&
				length == 1 &&
				codeUnit == 0x002D
			) {
				result += '\\' + string.charAt(index);
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit == 0x002D ||
				codeUnit == 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// https://drafts.csswg.org/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}
		return result;
	};

	if (!root.CSS) {
		root.CSS = {};
	}

	root.CSS.escape = cssEscape;
	return cssEscape;

}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Vizabi = Vizabi,
    utils = _Vizabi.utils;


var PanZoom = Vizabi.Class.extend({
  init: function init(context) {
    this.context = context;

    this.dragRectangle = d3.drag();
    this.zoomer = d3.zoom();

    // this.dragLock = false;

    this.dragRectangle.subject(this.dragSubject()).on("start", this.drag().start).on("drag", this.drag().go).on("end", this.drag().stop);

    this.zoomer.filter(this.zoomFilter()).scaleExtent([0.0625, +Infinity]).on("start", this.zoom().start).on("zoom", this.zoom().go).on("end", this.zoom().stop);

    this.zoomer.ratioX = 1;
    this.zoomer.ratioY = 1;

    context._zoomedXYMinMax = {
      axis_x: { zoomedMin: null, zoomedMax: null },
      axis_y: { zoomedMin: null, zoomedMax: null }
    };
  },
  dragSubject: function dragSubject() {
    var _this = this.context;
    var self = this;

    return function (d) {
      /*
       * Do not drag if the Ctrl key, Meta key, or plus cursor mode is
       * not enabled. Also do not drag if zoom-pinching on touchmove
       * events.
       */
      if (!(d3.event.sourceEvent.ctrlKey || d3.event.sourceEvent.metaKey || _this.ui.cursorMode === "plus") || _this.ui.cursorMode === "minus" || (d3.event.sourceEvent.type === "touchmove" || d3.event.sourceEvent.type === "touchstart") && (d3.event.sourceEvent.touches.length > 1 || d3.event.sourceEvent.targetTouches.length > 1)) {
        return null;
      }

      return {
        x: d3.mouse(this)[0],
        y: d3.mouse(this)[1]
      };
    };
  },
  drag: function drag() {
    var _this = this.context;
    var self = this;

    return {
      start: function start(d, i) {
        /*
         * Do not drag if the Ctrl key, Meta key, or plus cursor mode is
         * not enabled. Also do not drag if zoom-pinching on touchmove
         * events.
         */
        //   if(!(d3.event.sourceEvent.ctrlKey || d3.event.sourceEvent.metaKey ||
        //          _this.ui.cursorMode === "plus") ||
        //          (d3.event.sourceEvent.type === "touchmove" || d3.event.sourceEvent.type === "touchstart") &&
        //          (d3.event.sourceEvent.touches.length > 1 || d3.event.sourceEvent.targetTouches.length > 1)) {
        //         return;
        //     }

        // self.dragLock = true;
        this.origin = {
          x: d3.mouse(this)[0],
          y: d3.mouse(this)[1]
        };
        _this.zoomRect.classed("vzb-invisible", false);
      },
      go: function go(d, i) {
        /*
         * Cancel drag if drag lock is false, or when zoom-pinching via
         * touchmove events.
         */
        // if (!self.dragLock || (d3.event.sourceEvent.type === "touchmove" || d3.event.sourceEvent.type === "touchstart") &&
        //             (d3.event.sourceEvent.touches.length > 1 || d3.event.sourceEvent.targetTouches.length > 1)) {
        //   self.dragLock = false;

        //   _this.zoomRect
        //     .attr("width", 0)
        //     .attr("height", 0)
        //     .classed("vzb-invisible", true);

        //   return;
        // }

        var origin = this.origin;
        var mouse = {
          x: d3.event.x,
          y: d3.event.y
        };

        _this.zoomRect.attr("x", Math.min(mouse.x, origin.x)).attr("y", Math.min(mouse.y, origin.y)).attr("width", Math.abs(mouse.x - origin.x)).attr("height", Math.abs(mouse.y - origin.y));
      },
      stop: function stop(e) {
        // if (!self.dragLock) return;
        // self.dragLock = false;

        _this.zoomRect.attr("width", 0).attr("height", 0).classed("vzb-invisible", true);

        this.target = {
          x: d3.mouse(this)[0],
          y: d3.mouse(this)[1]
        };
        if (Math.abs(this.origin.x - this.target.x) < 10 || Math.abs(this.origin.y - this.target.y) < 10) return;

        /*
         * Only compensate for dragging when the Ctrl key or Meta key
         * are pressed, or if the cursorMode is not in plus mode.
         */
        var compensateDragging = d3.event.sourceEvent.ctrlKey || d3.event.sourceEvent.metaKey || _this.ui.cursorMode === "plus";

        self._zoomOnRectangle(d3.select(this), this.origin.x, this.origin.y, this.target.x, this.target.y, compensateDragging, 500);
      }
    };
  },
  zoomFilter: function zoomFilter() {
    var _this = this.context;
    var self = this;

    return function (d) {
      var event = d3.event;

      if (event.ctrlKey || event.metaKey) return false;

      // Cancel drag lock when zoom-pinching via touchmove events.
      if ((event.type === "touchmove" || event.type === "touchstart") && (event.touches.length > 1 || event.targetTouches.length > 1)) return true;

      if ((event.type === "wheel" || event.type === "mousewheel") && _this.ui.zoomOnScrolling) {
        // if (_this.scrollableAncestor) {
        //   _this.scrollableAncestor.scrollTop -= (event.deltaY || -event.wheelDelta);
        // }
        // d3.event.scale = null;
        //zoomer.scale(this.savedScale);
        return true;
      }

      if ((event.type === "mousedown" || event.type === "touchstart") && _this.ui.cursorMode !== "plus" && _this.ui.cursorMode !== "minus" && (_this.ui.panWithArrow || _this.ui.cursorMode === "hand")) return true;

      return false;
    };
  },
  zoom: function zoom() {
    var _this = this.context;
    var zoomer = this.zoomer;
    var self = this;

    return {
      start: function start() {
        //this.savedScale = zoomer.scale;
        if (_this.ui.cursorMode !== "plus" && _this.ui.cursorMode !== "minus") {
          _this.chartSvg.classed("vzb-zooming", true);
        }

        _this.model._data.marker.clearHighlighted();
        _this._setTooltip();
      },
      go: function go() {

        var sourceEvent = d3.event.sourceEvent;

        //if (sourceEvent != null && (sourceEvent.ctrlKey || sourceEvent.metaKey)) return;

        // Cancel drag lock when zoom-pinching via touchmove events.
        // if (sourceEvent !== null &&
        //             (sourceEvent.type === "touchmove" || sourceEvent.type === "touchstart") &&
        //             (sourceEvent.touches.length > 1 || sourceEvent.targetTouches.length > 1)) {
        //   self.dragLock = false;
        // }

        //if (self.dragLock) return;

        //send the event to the page if fully zoomed our or page not scrolled into view
        //
        //                    if(d3.event.scale == 1)
        //
        //                    if(utils.getViewportPosition(_this.element.node()).y < 0 && d3.event.scale > 1) {
        //                        _this.scrollableAncestor.scrollTop += d3.event.sourceEvent.deltaY;
        //                        return;
        //                    }
        /*
         * Do not zoom on the chart if the scroll event is a wheel
         * scroll. Instead, redirect the scroll event to the scrollable
         * ancestor
         */
        // if (sourceEvent != null && (sourceEvent.type === "wheel" || sourceEvent.type === "mousewheel") &&
        //             !_this.ui.zoomOnScrolling) {
        //   if (_this.scrollableAncestor) {
        //     _this.scrollableAncestor.scrollTop += (sourceEvent.deltaY || -sourceEvent.wheelDelta);
        //   }
        //   d3.event.scale = null;
        //             //zoomer.scale(this.savedScale);
        //   this.quitZoom = true;
        //   return;
        // }
        // this.quitZoom = false;

        //_this.model._data.marker.clearHighlighted();
        //_this._setTooltip();

        //var transform = d3.zoomTransform(self.zoomSelection.node())
        //  .translate(, )
        //.scale(d3.event.transform.k);
        var zoom = d3.event.transform.k;

        var pan = [d3.event.transform.x, d3.event.transform.y]; //d3.event.translate;
        var ratioY = zoomer.ratioY;
        var ratioX = zoomer.ratioX;

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
        if (zoom === 1 && sourceEvent !== null && ((sourceEvent.type === "wheel" || sourceEvent.type === "mousewheel") && (sourceEvent.deltaY || -sourceEvent.wheelDelta) > 0 || sourceEvent.type === "touchmove" && sourceEvent.touches.length > 1)) {
          zoomer.ratioX = 1;
          ratioX = 1;
          zoomer.ratioY = 1;
          ratioY = 1;
        }

        //                if(isNaN(pan[0]) || isNaN(pan[1]) || pan[0] == null || pan[1] == null) pan = zoomer.translate();
        if (isNaN(pan[0]) || isNaN(pan[1]) || pan[0] == null || pan[1] == null) pan = [0, 0];

        // limit the zooming, so that it never goes below min value of zoom for any of the axes
        var minZoomScale = zoomer.scaleExtent()[0];
        if (zoom * ratioY < minZoomScale) {
          ratioY = minZoomScale / zoom;
          zoomer.ratioY = ratioY;
        }
        if (zoom * ratioX < minZoomScale) {
          ratioX = minZoomScale / zoom;
          zoomer.ratioX = ratioX;
        }

        var zoomXOut = zoom * ratioX < 1;
        var zoomYOut = zoom * ratioY < 1;

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

        var xPanOffset = _this.width * zoom * ratioX;
        var yPanOffset = _this.height * zoom * ratioY;

        var xRange = [0 * zoom * ratioX + pan[0], xPanOffset + pan[0]];
        var yRange = [yPanOffset + pan[1], 0 * zoom * ratioY + pan[1]];

        var xRangeBumped = _this._rangeBump(xRange);
        var yRangeBumped = _this._rangeBump(yRange);

        /*
         * Shift xRange and yRange by the difference between the bumped
         * ranges, which is scaled by the zoom factor. This accounts for
         * the range bump, which controls a gutter around the
         * bubblechart, while correctly zooming.
         */
        var xRangeMinOffset = (xRangeBumped[0] - xRange[0]) * zoom * ratioX;
        var xRangeMaxOffset = (xRangeBumped[1] - xRange[1]) * zoom * ratioX;

        var yRangeMinOffset = (yRangeBumped[0] - yRange[0]) * zoom * ratioY;
        var yRangeMaxOffset = (yRangeBumped[1] - yRange[1]) * zoom * ratioY;

        xRange[0] += xRangeMinOffset;
        xRange[1] += xRangeMaxOffset;

        yRange[0] += yRangeMinOffset;
        yRange[1] += yRangeMaxOffset;

        // Calculate the maximum xRange and yRange available.
        var xRangeBounds = [0, _this.width];
        var yRangeBounds = [_this.height, 0];

        var xRangeBoundsBumped = _this._rangeBump(xRangeBounds);
        var yRangeBoundsBumped = _this._rangeBump(yRangeBounds);

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

        if (_this.model.marker.axis_x.scaleType === "ordinal") {
          _this.xScale.rangeBands(xRange);
        } else {
          _this.xScale.range(xRange);
        }

        if (_this.model.marker.axis_y.scaleType === "ordinal") {
          _this.yScale.rangeBands(yRange);
        } else {
          _this.yScale.range(yRange);
        }

        var formatter = function formatter(n) {
          return utils.isDate(n) ? n : +n.toFixed(2);
        };

        var zoomedXRange = xRangeBoundsBumped;
        var zoomedYRange = yRangeBoundsBumped;

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
          axis_x: {
            zoomedMin: formatter(_this.xScale.invert(zoomedXRange[0])),
            zoomedMax: formatter(_this.xScale.invert(zoomedXRange[1]))
          },
          axis_y: {
            zoomedMin: formatter(_this.yScale.invert(zoomedYRange[0])),
            zoomedMax: formatter(_this.yScale.invert(zoomedYRange[1]))
          }
        };

        if (!zoomer.dontFeedToState) _this.model.marker.set(_this._zoomedXYMinMax, null, false /*avoid storing it in URL*/);

        var optionsY = _this.yAxis.labelerOptions();
        var optionsX = _this.xAxis.labelerOptions();
        optionsY.limitMaxTickNumber = zoom * ratioY < 1.5 ? 8 : zoom * ratioY * 8;
        optionsX.limitMaxTickNumber = zoom * ratioX < 1.5 ? 8 : zoom * ratioX * 8;
        optionsY.transitionDuration = zoomer.duration;
        optionsX.transitionDuration = zoomer.duration;

        _this.xAxisEl.call(_this.xAxis.labelerOptions(optionsX));
        _this.yAxisEl.call(_this.yAxis.labelerOptions(optionsY));
        _this.redrawDataPoints(zoomer.duration);
        _this._trails.run("resize", null, zoomer.duration);

        zoomer.duration = 0;
      },
      stop: function stop() {
        _this.chartSvg.classed("vzb-zooming", false);

        _this.draggingNow = false;

        // if (this.quitZoom) return;

        //Force the update of the URL and history, with the same values
        if (!zoomer.dontFeedToState) _this.model.marker.set(_this._zoomedXYMinMax, true, true);
        zoomer.dontFeedToState = null;
      }
    };
  },
  expandCanvas: function expandCanvas(duration) {
    var _this = this.context;
    if (!duration) duration = _this.duration;

    //d3 extent returns min and max of the input array as [min, max]
    var mmX = d3.extent(utils.values(_this.frame.axis_x));
    var mmY = d3.extent(utils.values(_this.frame.axis_y));

    //protection agains unreasonable min-max results -- abort function
    if (!mmX[0] && mmX[0] !== 0 || !mmX[1] && mmX[1] !== 0 || !mmY[0] && mmY[0] !== 0 || !mmY[1] && mmY[1] !== 0) {
      return utils.warn("panZoom.expandCanvas: X or Y min/max are broken. Aborting with no action");
    }
    /*
     * Use a range bumped scale to correctly accommodate the range bump
     * gutter.
     */
    var suggestedFrame = {
      x1: _this.xScale(mmX[0]),
      y1: _this.yScale(mmY[0]),
      x2: _this.xScale(mmX[1]),
      y2: _this.yScale(mmY[1])
    };
    var xBounds = [0, _this.width];
    var yBounds = [_this.height, 0];

    // Get the current zoom frame based on the current dimensions.
    var frame = {
      x1: xBounds[0],
      x2: xBounds[1],
      y1: yBounds[0],
      y2: yBounds[1]
    };

    var TOLERANCE = 0.0;

    /*
     * If there is no current zoom frame, or if any of the suggested frame
     * points extend outside of the current zoom frame, then expand the
     * canvas.
     */
    if (!_this.isCanvasPreviouslyExpanded || suggestedFrame.x1 < frame.x1 * (1 - TOLERANCE) || suggestedFrame.x2 > frame.x2 * (1 + TOLERANCE) || suggestedFrame.y2 < frame.y2 * (1 - TOLERANCE) || suggestedFrame.y1 > frame.y1 * (1 + TOLERANCE)) {
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
        var xBoundsBumped = _this._rangeBump(xBounds);
        var yBoundsBumped = _this._rangeBump(yBounds);

        if (suggestedFrame.x1 > xBoundsBumped[0]) suggestedFrame.x1 = xBoundsBumped[0];
        if (suggestedFrame.x2 < xBoundsBumped[1]) suggestedFrame.x2 = xBoundsBumped[1];
        if (suggestedFrame.y1 < yBoundsBumped[0]) suggestedFrame.y1 = yBoundsBumped[0];
        if (suggestedFrame.y2 > yBoundsBumped[0]) suggestedFrame.y2 = yBoundsBumped[1];
      }

      _this.isCanvasPreviouslyExpanded = true;
      this._zoomOnRectangle(_this.element, suggestedFrame.x1, suggestedFrame.y1, suggestedFrame.x2, suggestedFrame.y2, false, duration);
    } else {
      _this.redrawDataPoints(duration);
    }
  },
  zoomToMaxMin: function zoomToMaxMin(zoomedMinX, zoomedMaxX, zoomedMinY, zoomedMaxY, duration, dontFeedToState) {
    var _this = this.context;
    var minX = zoomedMinX;
    var maxX = zoomedMaxX;
    var minY = zoomedMinY;
    var maxY = zoomedMaxY;

    var xDomain = _this.xScale.domain();
    var yDomain = _this.yScale.domain();

    /*
     * Prevent zoomout if only one of zoom edges set outside domain
     */
    if (minX < xDomain[0] && maxX < xDomain[1]) minX = xDomain[0];
    if (minX > xDomain[0] && maxX > xDomain[1]) maxX = xDomain[1];
    if (minY < yDomain[0] && maxY < yDomain[1]) minY = yDomain[0];
    if (minY > yDomain[0] && maxY > yDomain[1]) maxY = yDomain[1];

    var xRange = [_this.xScale(minX), _this.xScale(maxX)];
    var yRange = [_this.yScale(minY), _this.yScale(maxY)];

    this._zoomOnRectangle(_this.element, xRange[0], yRange[0], xRange[1], yRange[1], false, duration, dontFeedToState);
  },
  _zoomOnRectangle: function _zoomOnRectangle(element, zoomedX1, zoomedY1, zoomedX2, zoomedY2, compensateDragging, duration, dontFeedToState) {
    var _this = this.context;
    var zoomer = this.zoomer;
    var transform = d3.zoomTransform(this.zoomSelection.node());

    var x1 = zoomedX1;
    var y1 = zoomedY1;
    var x2 = zoomedX2;
    var y2 = zoomedY2;

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
      transform.translate(x1 - x2, y1 - y2);
      // zoomer.translate([
      //     zoomer.translate()[0] + x1 - x2,
      //     zoomer.translate()[1] + y1 - y2
      // ]);
    }

    var xRangeBounds = [0, _this.width];
    var yRangeBounds = [_this.height, 0];

    var xRangeBoundsBumped = _this._rangeBump(xRangeBounds);
    var yRangeBoundsBumped = _this._rangeBump(yRangeBounds);

    var minZoom = zoomer.scaleExtent()[0];
    var maxZoom = zoomer.scaleExtent()[1];
    var zoom = void 0,
        ratioX = void 0,
        ratioY = void 0;

    if (x1 == x2 || y1 == y2 || xRangeBoundsBumped[0] == xRangeBoundsBumped[1] || yRangeBoundsBumped[0] == yRangeBoundsBumped[1]) {
      return utils.warn("_zoomOnRectangle(): can not proceed because this may result in infinity zooms");
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

    var pan = [(transform.x - Math.min(x1, x2)) / transform.k / zoomer.ratioX * zoom * ratioX + (xRangeBoundsBumped[0] - xRangeBounds[0]), (transform.y - Math.min(y1, y2)) / transform.k / zoomer.ratioY * zoom * ratioY + (yRangeBoundsBumped[1] - yRangeBounds[1])];

    zoomer.dontFeedToState = dontFeedToState;
    //zoomer.scale(zoom);
    zoomer.ratioY = ratioY || 1; //NaN defaults to 1
    zoomer.ratioX = ratioX || 1; //NaN defaults to 1
    //zoomer.translate(pan);
    zoomer.duration = duration ? duration : 0;

    //zoomer.event(element);
    this.zoomSelection.call(zoomer.transform, d3.zoomIdentity.translate(pan[0], pan[1]).scale(zoom));
  },


  /*
   * Incrementally zoom in or out and pan the view so that it never looses the point where click happened
   * this function is a modified d3's own zoom behavior on double click
   * for the original code see https://github.com/mbostock/d3/blob/master/src/behavior/zoom.js
   * function dblclicked() and what it refers to
   */
  zoomByIncrement: function zoomByIncrement(direction, duration) {
    var _this = this.context;
    var transform = d3.zoomTransform(this.zoomSelection.node());

    var ratio = transform.k;
    var pan = [transform.x, transform.y];

    var mouse = d3.mouse(this.zoomSelection.node());
    var k = Math.log(ratio) / Math.LN2;

    //change factor direction based on the input. default is no direction supplied
    if (direction == "plus" || !direction) k = Math.floor(k) + 1;
    if (direction == "minus") k = Math.ceil(k) - 1;

    //decode panning
    var locus = [(mouse[0] - pan[0]) / ratio, (mouse[1] - pan[1]) / ratio];

    //recalculate zoom ratio
    var scaleExtent = this.zoomer.scaleExtent();
    if (ratio == scaleExtent[0]) {
      this.zoomer.ratioY = 1;
      this.zoomer.ratioX = 1;
    }
    ratio = Math.max(scaleExtent[0], Math.min(scaleExtent[1], Math.pow(2, k)));

    //recalculate panning
    locus = [locus[0] * ratio + pan[0], locus[1] * ratio + pan[1]];
    pan[0] += mouse[0] - locus[0];
    pan[1] += mouse[1] - locus[1];

    //save changes to the zoom behavior and run the event
    //this.zoomer.scale(ratio);
    //this.zoomer.translate([pan[0], pan[1]]);
    this.zoomer.duration = duration || 0;
    //this.zoomer.event(_this.element);
    this.zoomSelection.call(this.zoomer.transform, d3.zoomIdentity.translate(pan[0], pan[1]).scale(ratio));
  },


  /*
   * Reset zoom values without triggering a zoom event.
   */
  resetZoomState: function resetZoomState(element) {
    //this.zoomer.scaleTo(element, 1);
    this.zoomer.ratioY = 1;
    this.zoomer.ratioX = 1;
    //this.zoomer.translate([0, 0]);
    (element || this.zoomSelection).property("__zoom", d3.zoomIdentity);
  },
  reset: function reset(element, duration) {
    var _this = this.context;
    _this.isCanvasPreviouslyExpanded = false;

    //this.zoomer.scale(1);
    this.zoomer.ratioY = 1;
    this.zoomer.ratioX = 1;
    //this.zoomer.translate([0, 0]);
    this.zoomer.duration = duration || 0;
    //this.zoomer.event(element || _this.element);
    (element || this.zoomSelection).call(this.zoomer.transform, d3.zoomIdentity);
  },
  rerun: function rerun(element) {
    var _this = this.context;
    //this.zoomer.event(element || _this.element);
    (element || this.zoomSelection).call(this.zoomer.scaleBy, 1);
  },
  zoomSelection: function zoomSelection(element) {
    this.zoomSelection = element;
  }
});

exports.default = PanZoom;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<!-- Bubble Chart Component -->\n<div class=\"vzb-bubblechart\">\n    <svg class=\"vzb-bubblechart-svg vzb-export\">\n        <g class=\"vzb-bc-graph\">\n            <g class=\"vzb-bc-year\"></g>\n\n            <g class=\"vzb-bc-axis-x-title\"></g>\n            <g class=\"vzb-bc-axis-x-info vzb-noexport\"></g>\n            <svg class=\"vzb-bc-axis-x\"><g></g></svg>\n\n            <g class=\"vzb-bc-axis-y-title\"></g>\n            <g class=\"vzb-bc-axis-y-info vzb-noexport\"></g>\n            <svg class=\"vzb-bc-axis-y\"><g></g></svg>\n\n            <line class=\"vzb-bc-projection-x\"></line>\n            <line class=\"vzb-bc-projection-y\"></line>\n\n            <svg class=\"vzb-bc-bubbles-crop\">\n                <g class=\"vzb-zoom-selection\"></g>\n                <rect class=\"vzb-bc-eventarea\"></rect>\n                <g class=\"vzb-bc-decorations\">\n                    <line class=\"vzb-bc-line-equal-xy vzb-invisible\"></line>\n                    <g class=\"vzb-bc-x-axis-groups\"></g>\n                </g>\n                <g class=\"vzb-bc-trails\"></g>\n                <g class=\"vzb-bc-bubbles\"></g>\n                <g class=\"vzb-bc-lines\"></g>\n                <g class=\"vzb-bc-bubble-crown vzb-hidden\">\n                    <circle class=\"vzb-crown-glow\"></circle>\n                    <circle class=\"vzb-crown\"></circle>\n                </g>\n                <rect class=\"vzb-bc-forecastoverlay vzb-hidden\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#vzb-bc-pattern-lines)\" pointer-events='none'></rect>\n            </svg>\n\n            <g class=\"vzb-bc-axis-y-subtitle\"></g>\n            <g class=\"vzb-bc-axis-x-subtitle\"></g>\n            <g class=\"vzb-bc-axis-s-title\"></g>\n            <g class=\"vzb-bc-axis-c-title\"></g>\n\n            <svg class=\"vzb-bc-labels-crop\">\n                <g class=\"vzb-bc-labels\"></g>\n            </svg>\n\n            <g class=\"vzb-data-warning vzb-noexport\">\n                <svg></svg>\n                <text></text>\n            </g>\n\n            <rect class=\"vzb-bc-zoom-rect\"></rect>\n        </g>\n    </svg>\n    <svg>\n        <defs>\n            <filter id=\"vzb-glow-filter\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n                <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\"></feGaussianBlur>\n            </filter>\n\t        <pattern id=\"vzb-bc-pattern-lines\" x=\"0\" y=\"0\" patternUnits=\"userSpaceOnUse\" width=\"50\" height=\"50\" viewBox=\"0 0 10 10\"> \n              <path d='M-1,1 l2,-2M0,10 l10,-10M9,11 l2,-2' stroke='black' stroke-width='3' opacity='0.08'/>\n            </pattern> \n        </defs>\n    </svg>\n    <!-- This could possibly be another component -->\n    <div class=\"vzb-tooltip vzb-hidden vzb-tooltip-mobile\"></div>\n</div>\n";

/***/ })
/******/ ]);
//# sourceMappingURL=bubblechart.js.map