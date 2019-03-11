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

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION_INFO = { version: "2.4.2", build: 1548844897069 };

// MOUNTAIN CHART TOOL
var MountainChart = Vizabi.Tool.extend("MountainChart", {

  /**
   * Initializes the tool (MountainChart Tool).
   * Executed once before any template is rendered.
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init: function init(placeholder, external_model) {

    this.name = "mountainchart";

    //specifying components
    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.marker", "locale", "data", "ui"] //pass models to component
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

    //constructor is the same as any tool
    this._super(placeholder, external_model);
  },


  default_model: {
    state: {
      time: {
        "delay": 100,
        "delayThresholdX2": 50,
        "delayThresholdX4": 25
      },
      "entities": {
        "opacitySelectDim": 0.3,
        "opacityRegular": 0.7
      }
    },
    locale: {},
    ui: {
      chart: {
        decorations: {
          enabled: true,
          xAxisGroups: null
        },
        manualSortingEnabled: true,
        yMaxMethod: "latest",
        showProbeX: true,
        probeX: 1.85,
        xLogStops: [1, 2, 5],
        xPoints: 50,
        directSigma: false, //false = input is gini, true = input is standatd deviation of the distribution
        directMu: false, //false = input is GDP/capita, true = input is mean of the distribution
        preload: "income_mountains",
        preloadKey: "world"
      },
      "buttons": ["colors", "find", "stack", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"],
      "dialogs": {
        "popup": ["colors", "find", "stack", "moreoptions"],
        "sidebar": ["colors", "find", "stack"],
        "moreoptions": ["opacity", "speed", "stack", "axesmc", "colors", "presentation", "technical", "about"]
      },
      datawarning: {
        doubtDomain: [],
        doubtRange: []
      },
      presentation: false
    }
  },

  versionInfo: VERSION_INFO
});

exports.default = MountainChart;

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

var _mountainchartMath = __webpack_require__(4);

var _mountainchartMath2 = _interopRequireDefault(_mountainchartMath);

var _mountainchartSelectlist = __webpack_require__(5);

var _mountainchartSelectlist2 = _interopRequireDefault(_mountainchartSelectlist);

var _mountainchartProbe = __webpack_require__(6);

var _mountainchartProbe2 = _interopRequireDefault(_mountainchartProbe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * VIZABI MOUNTAINCHART
 * This graph displays income distribution in the world
 *
 * Original code:
 * Angie https://github.com/angieskazka
 *
 * Contributions:
 * IncoCode https://github.com/IncoCode/
 * Arthur https://github.com/arthurcamara1
 *
 * Developed in Gapminder Foundation, 2015
 */

var _Vizabi = Vizabi,
    utils = _Vizabi.utils,
    globals = _Vizabi._globals,
    _Vizabi$iconset = _Vizabi.iconset,
    iconWarn = _Vizabi$iconset.warn,
    iconQuestion = _Vizabi$iconset.question,
    _Vizabi$helpers = _Vizabi.helpers,
    Exporter = _Vizabi$helpers.svgexport,
    axisSmart = _Vizabi$helpers["d3.axisWithLabelPicker"],
    DynamicBackground = _Vizabi$helpers["d3.dynamicBackground"];


var THICKNESS_THRESHOLD = 0.001;
var COLOR_WHITEISH = "#d3d3d3";

// MOUNTAIN CHART COMPONENT
var MountainChartComponent = Vizabi.Component.extend("mountainchart", {

  /**
   * Initialize the component
   * Executed once before any template is rendered.
   * @param {Object} config The config passed to the component
   * @param {Object} context The component's parent
   */
  init: function init(config, context) {

    var _this = this;
    this.name = "mountainchart";
    this.template = __webpack_require__(7);

    //define expected models for this component
    this.model_expects = [{ name: "time", type: "time" }, { name: "marker", type: "marker" }, { name: "locale", type: "locale" }, { name: "data", type: "data" }, { name: "ui", type: "ui" }];

    //attach event listeners to the model items
    this.model_binds = {
      "change:time.value": function changeTimeValue(evt) {
        if (!_this._readyOnce) return;
        _this.model.marker.getFrame(_this.model.time.value, _this.frameChanged.bind(_this));
      },
      "change:time.playing": function changeTimePlaying(evt) {
        // this listener is a patch for fixing #1228. time.js doesn't produce the last event
        // with playing == false when paused softly
        if (!_this.model.time.playing) {
          _this.redrawDataPoints();
        }
      },
      "change:marker.axis_x.xScaleFactor": function changeMarkerAxis_xXScaleFactor() {
        _this.ready();
      },
      "change:marker.axis_x.xScaleShift": function changeMarkerAxis_xXScaleShift() {
        _this.ready();
      },
      "change:marker.axis_x.tailFatX": function changeMarkerAxis_xTailFatX() {
        _this.ready();
      },
      "change:marker.axis_x.tailCutX": function changeMarkerAxis_xTailCutX() {
        _this.ready();
      },
      "change:marker.axis_x.tailFade": function changeMarkerAxis_xTailFade() {
        _this.ready();
      },
      "change:ui.chart.probeX": function changeUiChartProbeX() {
        _this.ready();
      },
      "change:ui.chart.showProbeX": function changeUiChartShowProbeX() {
        _this.ready();
      },
      "change:ui.chart.xPoints": function changeUiChartXPoints() {
        _this.ready();
      },
      "change:ui.chart.xLogStops": function changeUiChartXLogStops() {
        _this.updateSize();
      },
      "change:ui.chart.yMaxMethod": function changeUiChartYMaxMethod() {
        _this._adjustMaxY({ force: true });
        _this.redrawDataPoints();
      },
      "change:ui.chart.decorations": function changeUiChartDecorations(evt) {
        if (!_this._readyOnce) return;
        _this._updateDecorations(500);
      },
      "change:ui.chart.showForecastOverlay": function changeUiChartShowForecastOverlay(evt) {
        if (!_this._readyOnce) return;
        _this._updateForecastOverlay();
      },
      "change:time.record": function changeTimeRecord(evt) {
        if (_this.model.time.record) {
          _this._export.open(this.element, this.name);
        } else {
          _this._export.reset();
        }
      },
      "change:marker.highlight": function changeMarkerHighlight(evt) {
        if (!_this._readyOnce) return;
        _this.highlightMarkers();
        _this.updateOpacity();
      },
      "change:marker.select": function changeMarkerSelect(evt) {
        if (!_this._readyOnce) return;
        _this.selectMarkers();
        _this._selectlist.redraw();
        _this.updateOpacity();
        _this.updateDoubtOpacity();
        _this.redrawDataPoints();
        _this._probe.redraw();
      },
      "change:marker.opacitySelectDim": function changeMarkerOpacitySelectDim(evt) {
        _this.updateOpacity();
      },
      "change:marker.opacityRegular": function changeMarkerOpacityRegular(evt) {
        _this.updateOpacity();
      },
      "change:marker": function changeMarker(evt, path) {
        if (!_this._readyOnce) return;
        if (path.indexOf("scaleType") > -1) {
          _this.ready();
        } else if (path.indexOf("zoomedMin") > -1 || path.indexOf("zoomedMax") > -1) {
          _this.zoomToMaxMin();
          _this.redrawDataPoints();
          _this._probe.redraw();
        }
      },
      "change:marker.group": function changeMarkerGroup(evt, path) {
        if (!_this._readyOnce) return;
        if (path.indexOf("group.merge") > -1) return;
        _this.ready();
      },
      "change:marker.group.merge": function changeMarkerGroupMerge(evt) {
        if (!_this._readyOnce) return;
        _this.updatePointers();
        _this.redrawDataPoints();
      },
      "change:marker.stack": function changeMarkerStack(evt) {
        if (!_this._readyOnce) return;
        _this.ready();
      },
      "change:marker.stack.which": function changeMarkerStackWhich(evt) {
        if (!_this._readyOnce) return;
        if (_this.model.time.playing) {
          _this.model.time.pause();
        }
      },
      "change:marker.stack.use": function changeMarkerStackUse(evt) {
        if (!_this._readyOnce) return;
        if (_this.model.time.playing) {
          _this.model.time.pause();
        }
      },
      "change:marker.color.palette": function changeMarkerColorPalette(evt) {
        if (!_this._readyOnce) return;
        _this.redrawDataPointsOnlyColors();
        _this._selectlist.redraw();
      }
    };

    this._super(config, context);

    this._math = new _mountainchartMath2.default(this);
    this._export = new Exporter(this);
    this._export.prefix("vzb-mc-").deleteClasses(["vzb-mc-mountains-mergestacked", "vzb-mc-mountains-mergegrouped", "vzb-mc-mountains", "vzb-mc-year", "vzb-mc-mountains-labels", "vzb-mc-axis-labels"]);
    this._probe = new _mountainchartProbe2.default(this);
    this._selectlist = new _mountainchartSelectlist2.default(this);

    // define path generator
    this.area = d3.area().curve(d3.curveBasis).x(function (d) {
      return _this.xScale(_this._math.rescale(d.x));
    }).y0(function (d) {
      return _this.yScale(d.y0);
    }).y1(function (d) {
      return _this.yScale(d.y0 + d.y);
    });

    //define d3 stack layout
    this.stack = d3.stack().order(d3.stackOrderReverse).value(function (d, key) {
      return _this.cached[key][d].y;
    });

    // init internal variables
    this.xScale = null;
    this.yScale = null;
    this.cScale = null;

    this.xAxis = axisSmart("bottom");

    this.rangeRatio = 1;
    this.rangeShift = 0;
    this.cached = {};
    this.mesh = [];
    this.yMax = 0;
  },
  domReady: function domReady() {
    var _this = this;

    // reference elements
    this.element = d3.select(this.element);
    this.graph = this.element.select(".vzb-mc-graph");
    this.xAxisEl = this.graph.select(".vzb-mc-axis-x");
    this.xTitleEl = this.graph.select(".vzb-mc-axis-x-title");
    this.yTitleEl = this.graph.select(".vzb-mc-axis-y-title");
    this.infoEl = this.graph.select(".vzb-mc-axis-info");
    this.dataWarningEl = this.graph.select(".vzb-data-warning");

    this.yearEl = this.graph.select(".vzb-mc-year");
    this.year = new DynamicBackground(this.yearEl);

    this.mountainMergeStackedContainer = this.graph.select(".vzb-mc-mountains-mergestacked");
    this.mountainMergeGroupedContainer = this.graph.select(".vzb-mc-mountains-mergegrouped");
    this.mountainAtomicContainer = this.graph.select(".vzb-mc-mountains");
    this.mountainLabelContainer = this.graph.select(".vzb-mc-mountains-labels");
    this.tooltip = this.element.select(".vzb-mc-tooltip");
    this.eventAreaEl = this.element.select(".vzb-mc-eventarea");
    this.probeEl = this.element.select(".vzb-mc-probe");
    this.probeLineEl = this.probeEl.select("line");
    this.probeTextEl = this.probeEl.selectAll("text");
    this.forecastOverlay = this.element.select(".vzb-mc-forecastoverlay");

    this.decorationsEl = this.graph.select(".vzb-mc-decorations");
    this.xAxisGroupsEl = this.decorationsEl.select(".vzb-mc-x-axis-groups");

    this.element.onTap(function (d, i) {
      _this._interact()._mouseout(d, i);
    });
  },
  afterPreload: function afterPreload() {
    var _this = this;

    this._math.xScaleFactor = this.model.marker.axis_x.xScaleFactor;
    this._math.xScaleShift = this.model.marker.axis_x.xScaleShift;

    if (!this.precomputedShape || !this.precomputedShape[0] || !this.precomputedShape[0].income_mountains) return;

    var yMax = this.precomputedShape[0].income_mountains["yMax_" + this.model.ui.chart.yMaxMethod];
    var shape = this.precomputedShape[0].income_mountains.shape;

    if (!yMax || !shape || shape.length === 0) return;

    this.xScale = d3.scaleLog().domain([this.model.marker.axis_x.domainMin, this.model.marker.axis_x.domainMax]);
    this.yScale = d3.scaleLinear().domain([0, Math.round(yMax)]);

    _this.updateSize(shape.length);
    _this.zoomToMaxMin();

    shape = shape.map(function (m, i) {
      return { x: _this.mesh[i], y0: 0, y: +m };
    });

    this.mountainAtomicContainer.selectAll(".vzb-mc-prerender").data([0]).enter().append("path").attr("class", "vzb-mc-prerender").style("fill", "pink").style("opacity", 0).attr("d", _this.area(shape)).transition().duration(1000).ease(d3.easeLinear).style("opacity", 1);
  },
  readyOnce: function readyOnce() {

    this.eventAreaEl.on("mousemove", function () {
      if (_this.model.time.dragging) return;
      if (!_this.model.ui.chart.showProbeX) return;
      _this._probe.redraw({
        level: _this.xScale.invert(d3.mouse(this)[0]),
        full: true
      });
    }).on("mouseout", function () {
      if (_this.model.time.dragging) return;
      if (!_this.model.ui.chart.showProbeX) return;
      _this._probe.redraw();
    });

    var _this = this;
    this.on("resize", function () {
      //console.log("acting on resize");
      //return if updatesize exists with error
      if (_this.updateSize()) return;
      _this.updatePointers(); // respawn is needed
      _this.redrawDataPoints();
      _this._selectlist.redraw();
      _this._probe.redraw();
    });

    this.TIMEDIM = this.model.time.getDimension();
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();
    this.labelNames = this.model.marker.getLabelHookNames();

    this.mountainAtomicContainer.select(".vzb-mc-prerender").remove();
    this.year.setText(this.model.time.formatDate(this.model.time.value));
    this.wScale = d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange);
  },
  ready: function ready() {
    //console.log("ready")
    var _this = this;
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();
    this.labelNames = this.model.marker.getLabelHookNames();

    this._math.xScaleFactor = this.model.marker.axis_x.xScaleFactor;
    this._math.xScaleShift = this.model.marker.axis_x.xScaleShift;

    this.updateUIStrings();
    this.updateIndicators();
    this.model.marker.getFrame(this.model.time.value, function (values) {
      if (!values) return;
      _this.values = values;
      _this.valuesAggregated = { color: {}, axis_y: {} };

      _this.model.marker.getFrame(_this.model.time.end, function (endValues) {
        _this.updateEntities(endValues);
        _this.updateSize();
        _this.zoomToMaxMin();
        _this._spawnMasks();
        _this.updateTime();
        _this.updatePointers();
        _this._adjustMaxY({ force: true });
        _this.redrawDataPoints();
        _this.redrawDataPointsOnlyColors();
        _this.highlightMarkers();
        _this.selectMarkers();
        _this._selectlist.redraw();
        _this.updateOpacity();
        _this.updateDoubtOpacity();
        _this._probe.redraw();
      });
    });
  },
  frameChanged: function frameChanged(frame, time) {
    if (!frame) return utils.warn("change:time.value: empty data received from marker.getFrame(). doing nothing");
    if (time.toString() != this.model.time.value.toString()) return; // frame is outdated
    this.values = frame;
    this.updateTime();
    this.updatePointers();
    this.redrawDataPoints();
    this._selectlist.redraw();
    this._probe.redraw();
    this.updateDoubtOpacity();
  },
  updateSize: function updateSize(meshLength) {
    var profiles = {
      small: {
        margin: { top: 10, right: 10, left: 10, bottom: 18 },
        infoElHeight: 16
      },
      medium: {
        margin: { top: 20, right: 20, left: 20, bottom: 30 },
        infoElHeight: 20
      },
      large: {
        margin: { top: 30, right: 30, left: 30, bottom: 35 },
        infoElHeight: 22
      }
    };

    var presentationProfileChanges = {
      medium: {
        margin: { top: 20, right: 20, left: 20, bottom: 50 },
        infoElHeight: 26
      },
      large: {
        margin: { top: 30, right: 30, left: 30, bottom: 50 },
        infoElHeight: 32
      }
    };

    this.activeProfile = this.getActiveProfile(profiles, presentationProfileChanges);
    var margin = this.activeProfile.margin;
    var infoElHeight = this.activeProfile.infoElHeight;

    //mesure width and height

    this.height = parseInt(this.element.style("height"), 10) - margin.top - margin.bottom || 0;
    this.width = parseInt(this.element.style("width"), 10) - margin.left - margin.right || 0;

    if (this.height <= 0 || this.width <= 0) {
      this.height = 0;
      this.width = 0;
      utils.warn("Mountain chart updateSize(): vizabi container is too little or has display:none");
    }

    //graph group is shifted according to margins (while svg element is at 100 by 100%)
    this.graph.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var isRTL = this.model.locale.isRTL();

    var yearLabelOptions = {
      topOffset: this.getLayoutProfile() === "large" ? margin.top * 2 : 0,
      xAlign: this.getLayoutProfile() === "large" ? isRTL ? "left" : "right" : "center",
      yAlign: this.getLayoutProfile() === "large" ? "top" : "center",
      widthRatio: this.getLayoutProfile() === "large" ? 3 / 8 : 8 / 10
    };

    //year is centered and resized
    this.year.setConditions(yearLabelOptions).resize(this.width, this.height);

    //update scales to the new range
    this.yScale.range([this.height, 0]);
    this.xScale.range([this.rangeShift, this.width * this.rangeRatio + this.rangeShift]);

    //need to know scale type of X to move on
    var scaleType = this._readyOnce ? this.model.marker.axis_x.scaleType : "log";

    //axis is updated
    this.xAxis.scale(this.xScale).tickSizeOuter(0).tickPadding(9).tickSizeMinor(3, 0).labelerOptions({
      scaleType: scaleType,
      toolMargin: margin,
      pivotingLimit: margin.bottom * 1.5,
      method: this.xAxis.METHOD_REPEATING,
      stops: this._readyOnce ? this.model.ui.chart.xLogStops : [1],
      formatter: this.model.marker.axis_x.getTickFormatter()
    });

    this.xAxisEl.attr("transform", "translate(0," + this.height + ")").call(this.xAxis);

    this.xTitleEl.select("text").attr("transform", "translate(" + this.width + "," + this.height + ")").attr("dy", "-0.36em");

    this.yTitleEl.style("font-size", infoElHeight + "px").attr("transform", "translate(" + (isRTL ? this.width : 0) + "," + margin.top + ")");

    this.xAxisGroupsEl.style("font-size", infoElHeight * 0.8 + "px");

    var warnBB = this.dataWarningEl.select("text").node().getBBox();
    this.dataWarningEl.select("svg").attr("width", warnBB.height).attr("height", warnBB.height).attr("x", warnBB.height * 0.1).attr("y", -warnBB.height * 1.0 + 1);

    this.dataWarningEl.attr("transform", "translate(" + (isRTL ? this.width - warnBB.width - warnBB.height * 2 : 0) + "," + (margin.top + warnBB.height * 1.5) + ")").select("text").attr("dx", warnBB.height * 1.5);

    if (this.infoEl.select("svg").node()) {
      var titleBBox = this.yTitleEl.node().getBBox();
      var t = utils.transform(this.yTitleEl.node());
      var hTranslate = isRTL ? titleBBox.x + t.translateX - infoElHeight * 1.4 : titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4;

      this.infoEl.select("svg").attr("width", infoElHeight + "px").attr("height", infoElHeight + "px");
      this.infoEl.attr("transform", "translate(" + hTranslate + "," + (t.translateY - infoElHeight * 0.8) + ")");
    }

    this.eventAreaEl.attr("y", this.height).attr("width", this.width).attr("height", margin.bottom);

    if (!meshLength) meshLength = this.model.ui.chart.xPoints;
    this.mesh = this._math.generateMesh(meshLength, scaleType, this.xScale.domain());
  },
  _updateDecorations: function _updateDecorations(duration) {
    var _this = this;

    // x axis groups used for incomes
    var showxAxisGroups = this.model.ui.chart.decorations.xAxisGroups && this.model.ui.chart.decorations.xAxisGroups[this.model.marker.axis_x.which] && this.model.ui.chart.decorations.enabled && this.getLayoutProfile() !== "small";

    this.xAxisGroupsEl.classed("vzb-invisible", !showxAxisGroups);
    if (showxAxisGroups) {
      var axisGroupsData = this.model.ui.chart.decorations.xAxisGroups[this.model.marker.axis_x.which];
      var xAxisGroups = this.xAxisGroupsEl.selectAll(".vzb-mc-x-axis-group").data(axisGroupsData);

      xAxisGroups.exit().remove();
      xAxisGroups = xAxisGroups.enter().append("g").attr("class", "vzb-mc-x-axis-group").each(function () {
        var view = d3.select(this);
        view.append("text").attr("class", "vzb-mc-x-axis-group-line").text("◆").style("text-anchor", "middle");
        view.append("text").attr("class", "vzb-mc-x-axis-group-text");
      }).merge(xAxisGroups);

      var xAxisGroups_calcs = [];
      var useShorterLabels = false;

      // first pass: calculate label text sizes and margins
      xAxisGroups.each(function (d, i) {
        var view = d3.select(this);

        var text = view.select("text.vzb-mc-x-axis-group-text").text(_this.translator(d.label));

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

          var text = view.select("text.vzb-mc-x-axis-group-text").text(_this.translator(d.label_short));

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

        var text = view.select("text.vzb-mc-x-axis-group-text").transition().duration(duration || 0).style("text-anchor", isFirst ? "end" : isLast ? "start" : "middle").attr("dy", "-1.2em").attr("y", calcs.textHeight).attr("x", x);

        view.select("text.vzb-mc-x-axis-group-line").classed("vzb-invisible", isLast).transition().duration(duration || 0).attr("dy", "-1.2em").attr("y", calcs.textHeight * 0.9).attr("x", calcs.boundaryMaxX_px);
      });

      xAxisGroups.select("text.vzb-mc-x-axis-group-text").on("mouseenter", function (d, i) {
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
  },
  zoomToMaxMin: function zoomToMaxMin() {
    var _this = this;
    var mdl = this.model.marker.axis_x;

    if (mdl.zoomedMin == null && mdl.domainMin == null || mdl.zoomedMax == null && mdl.domainMin == null) return;

    var x1 = this.xScale(mdl.zoomedMin || mdl.domainMin);
    var x2 = this.xScale(mdl.zoomedMax || mdl.domainMax);
    // if we have same x1 and x2 then divider will be 0 and rangeRation will become -Infinity
    if (!isFinite(x1) || !isFinite(x2) || x1 === x2) return;

    this.rangeRatio = this.width / (x2 - x1) * this.rangeRatio;
    this.rangeShift = (this.rangeShift - x1) / (x2 - x1) * this.width;

    this.xScale.range([this.rangeShift, this.width * this.rangeRatio + this.rangeShift]);

    this.xAxisEl.call(this.xAxis);
  },
  updateUIStrings: function updateUIStrings() {
    var _this = this;

    this.translator = this.model.locale.getTFunction();
    var xConceptprops = this.model.marker.axis_x.getConceptprops();

    this.xTitleEl.select("text").text(this.translator("unit/mountainchart_hardcoded_income_per_day"));

    this.yTitleEl.select("text").text(this.translator("mount/title"));

    utils.setIcon(this.dataWarningEl, iconWarn).select("svg").attr("width", "0px").attr("height", "0px");
    this.dataWarningEl.append("text").text(this.translator("hints/dataWarning"));

    utils.setIcon(this.infoEl, iconQuestion).select("svg").attr("width", "0px").attr("height", "0px");

    //TODO: move away from UI strings, maybe to ready or ready once
    this.infoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.infoEl.on("mouseover", function () {
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("axis_y").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.infoEl.on("mouseout", function () {
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });

    this.dataWarningEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datawarning").toggle();
    }).on("mouseover", function () {
      _this.updateDoubtOpacity(1);
    }).on("mouseout", function () {
      _this.updateDoubtOpacity();
    });
  },
  updateDoubtOpacity: function updateDoubtOpacity(opacity) {
    if (opacity == null) opacity = this.wScale(+this.time.getUTCFullYear().toString());
    if (this.someSelected) opacity = 1;
    this.dataWarningEl.style("opacity", opacity);
  },
  updateIndicators: function updateIndicators() {
    var _this = this;

    //fetch scales, or rebuild scales if there are none, then fetch
    this.yScale = this.model.marker.axis_y.getScale();
    this.xScale = this.model.marker.axis_x.getScale();
    this.cScale = this.model.marker.color.getScale();

    this.xAxis.tickFormat(_this.model.marker.axis_x.getTickFormatter());
  },
  updateEntities: function updateEntities() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.values;

    var _this = this;
    var dataKeys = this.dataKeys;

    // construct pointers
    this.mountainPointers = this.model.marker.getKeys().filter(function (d) {
      return  true && values.axis_x[utils.getKey(d, dataKeys.axis_x)] && values.axis_y[utils.getKey(d, dataKeys.axis_y)] && values.axis_s[utils.getKey(d, dataKeys.axis_s)];
    }).map(function (d) {
      var pointer = {};
      pointer._keys = d;
      pointer.KEYS = function () {
        return this._keys;
      };
      pointer._key = utils.getKey(d, _this.KEYS);
      pointer.KEY = function () {
        return this._key;
      };
      pointer.sortValue = [values.axis_y[utils.getKey(d, dataKeys.axis_y)] || 0, 0];
      pointer.aggrLevel = 0;
      return pointer;
    });

    //TODO: optimise this!
    this.groupedPointers = d3.nest().key(function (d) {
      return _this.model.marker.stack.use === "property" ? values.stack[utils.getKey(d.KEYS(), dataKeys.stack)] : values.group[utils.getKey(d.KEYS(), dataKeys.group)];
    }).sortValues(function (a, b) {
      return b.sortValue[0] - a.sortValue[0];
    }).entries(this.mountainPointers);

    var groupManualSort = this.model.marker.group.manualSorting;
    var isManualSortCorrect = utils.isArray(groupManualSort) && groupManualSort.length > 1;
    this.groupedPointers.forEach(function (group) {
      var groupSortValue = isManualSortCorrect ? groupManualSort.includes(group.key) ? groupManualSort.length - 1 - groupManualSort.indexOf(group.key) : -1 : d3.sum(group.values.map(function (m) {
        return m.sortValue[0];
      }));

      group.values.forEach(function (d) {
        d.sortValue[1] = groupSortValue;
      });

      group._keys = _defineProperty({}, _this.KEY, group.key); // hack to get highlihgt and selection work
      group.KEYS = function () {
        return this._keys;
      };
      group.KEY = function () {
        return this.key;
      };
      group.aggrLevel = 1;
    });

    var sortGroupKeys = {};
    _this.groupedPointers.forEach(function (m) {
      sortGroupKeys[m.key] = m.values[0].sortValue[1];
    });

    // update the stacked pointers
    if (_this.model.marker.stack.which === "none") {
      this.stackedPointers = [];
      this.mountainPointers.sort(function (a, b) {
        return b.sortValue[0] - a.sortValue[0];
      });
    } else {
      this.stackedPointers = d3.nest().key(function (d) {
        return values.stack[utils.getKey(d.KEYS(), dataKeys.stack)];
      }).key(function (d) {
        return values.group[utils.getKey(d.KEYS(), dataKeys.group)];
      }).sortKeys(function (a, b) {
        return sortGroupKeys[b] - sortGroupKeys[a];
      }).sortValues(function (a, b) {
        return b.sortValue[0] - a.sortValue[0];
      }).entries(this.mountainPointers);

      this.mountainPointers.sort(function (a, b) {
        return b.sortValue[1] - a.sortValue[1];
      });

      this.stackedPointers.forEach(function (stack) {
        stack._keys = _defineProperty({}, _this.KEY, stack.key); // hack to get highlihgt and selection work
        stack.KEYS = function () {
          return this._keys;
        };
        stack.KEY = function () {
          return this.key;
        };
        stack.aggrLevel = 2;
      });
    }

    //bind the data to DOM elements
    this.mountainsMergeStacked = this.mountainAtomicContainer.selectAll(".vzb-mc-mountain.vzb-mc-aggrlevel2").data(this.stackedPointers);
    this.mountainsMergeGrouped = this.mountainAtomicContainer.selectAll(".vzb-mc-mountain.vzb-mc-aggrlevel1").data(this.groupedPointers);
    this.mountainsAtomic = this.mountainAtomicContainer.selectAll(".vzb-mc-mountain.vzb-mc-aggrlevel0").data(this.mountainPointers);

    //exit selection -- remove shapes
    this.mountainsMergeStacked.exit().remove();
    this.mountainsMergeGrouped.exit().remove();
    this.mountainsAtomic.exit().remove();

    //enter selection -- add shapes
    this.mountainsMergeStacked = this.mountainsMergeStacked.enter().append("path").attr("class", "vzb-mc-mountain vzb-mc-aggrlevel2").merge(this.mountainsMergeStacked);
    this.mountainsMergeGrouped = this.mountainsMergeGrouped.enter().append("path").attr("class", "vzb-mc-mountain vzb-mc-aggrlevel1").merge(this.mountainsMergeGrouped);
    this.mountainsAtomic = this.mountainsAtomic.enter().append("path").attr("class", "vzb-mc-mountain vzb-mc-aggrlevel0").merge(this.mountainsAtomic);

    //add interaction
    this.mountains = this.mountainAtomicContainer.selectAll(".vzb-mc-mountain");

    this.mountains.on("mousemove", function (d, i) {
      if (utils.isTouchDevice()) return;
      _this._interact()._mousemove(d, i);
    }).on("mouseout", function (d, i) {
      if (utils.isTouchDevice()) return;
      _this._interact()._mouseout(d, i);
    }).on("click", function (d, i) {
      if (utils.isTouchDevice()) return;
      _this._interact()._click(d, i);
      _this.highlightMarkers();
    }).onTap(function (d, i) {
      _this._interact()._click(d, i);
      d3.event.stopPropagation();
    }).onLongTap(function (d, i) {});
  },
  _getLabelText: function _getLabelText(values, labelNames, d) {
    return this.KEYS.map(function (key) {
      return values[labelNames[key]] ? values[labelNames[key]][d[key]] : d[key];
    }).join(", ");
  },
  _interact: function _interact() {
    var _this = this;

    return {
      _mousemove: function _mousemove(d, i) {
        if (_this.model.time.dragging || _this.model.time.playing) return;

        _this.model.marker.highlightMarker(d.KEYS());

        var mouse = d3.mouse(_this.graph.node()).map(function (d) {
          return parseInt(d);
        });

        //position tooltip
        _this._setTooltip(d.key ? _this.model.marker.color.getColorlegendMarker().label.getItems()[d.key] : _this._getLabelText(_this.values, _this.labelNames, d.KEYS()));
        _this._selectlist.showCloseCross(d, true);
      },
      _mouseout: function _mouseout(d, i) {
        if (_this.model.time.dragging || _this.model.time.playing) return;

        _this._setTooltip("");
        _this.model.marker.clearHighlighted();
        _this._selectlist.showCloseCross(d, false);
      },
      _click: function _click(d) {
        var isPlayingOrDragging = _this.model.time.dragging || _this.model.time.playing;
        if (!isPlayingOrDragging || _this.model.marker.isSelected(d.KEYS())) {
          _this.model.marker.selectMarker(d.KEYS());
        }
      }
    };
  },
  highlightMarkers: function highlightMarkers() {
    var _this = this;
    this.someHighlighted = this.model.marker.highlight.length > 0;

    if (!this.selectList || !this.someSelected) return;
    this.selectList.classed("vzb-highlight", function (d) {
      return _this.model.marker.isHighlighted(d);
    });
  },
  selectMarkers: function selectMarkers() {
    var _this = this;
    this.someSelected = this.model.marker.select.length > 0;

    this._selectlist.rebuild();
    this.nonSelectedOpacityZero = false;
  },
  _sumLeafPointersByMarker: function _sumLeafPointersByMarker(branch, marker) {
    var _this = this;
    if (!branch.hasOwnProperty("key")) return _this.values[marker][utils.getKey(branch.KEYS(), _this.dataKeys[marker])];
    return d3.sum(branch.values.map(function (m) {
      return _this._sumLeafPointersByMarker(m, marker);
    }));
  },
  updateOpacity: function updateOpacity() {
    var _this = this;
    //if(!duration)duration = 0;

    var OPACITY_HIGHLT = 1.0;
    var OPACITY_HIGHLT_DIM = 0.3;
    var OPACITY_SELECT = 1.0;
    var OPACITY_REGULAR = this.model.marker.opacityRegular;
    var OPACITY_SELECT_DIM = this.model.marker.opacitySelectDim;

    this.mountains.style("opacity", function (d) {

      if (_this.someHighlighted) {
        //highlight or non-highlight
        if (_this.model.marker.isHighlighted(d.KEYS())) return OPACITY_HIGHLT;
      }

      if (_this.someSelected) {
        //selected or non-selected
        return _this.model.marker.isSelected(d.KEYS()) ? OPACITY_SELECT : OPACITY_SELECT_DIM;
      }

      if (_this.someHighlighted) return OPACITY_HIGHLT_DIM;

      return OPACITY_REGULAR;
    });

    this.mountains.classed("vzb-selected", function (d) {
      return _this.model.marker.isSelected(d.KEYS());
    });

    var nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;

    // when pointer events need update...
    if (nonSelectedOpacityZero !== this.nonSelectedOpacityZero) {
      this.mountainsAtomic.style("pointer-events", function (d) {
        return !_this.someSelected || !nonSelectedOpacityZero || _this.model.marker.isSelected(d.KEYS()) ? "visible" : "none";
      });
    }

    this.nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
  },
  updateTime: function updateTime() {
    var _this = this;

    this.time_1 = this.time == null ? this.model.time.value : this.time;
    this.time = this.model.time.value;
    this.duration = this.model.time.playing && this.time - this.time_1 > 0 ? this.model.time.delayAnimations : 0;
    this.year.setText(this.model.time.formatDate(this.time), this.duration);
    this._updateForecastOverlay();
  },
  updatePointers: function updatePointers() {
    var _this = this;
    this.yMax = 0;

    //spawn the original mountains
    this.mountainPointers.forEach(function (d, i) {
      var vertices = _this._spawn(_this.values, _this.dataKeys, d);
      _this.cached[d.KEY()] = vertices;
      d.hidden = vertices.length === 0;
    });

    //recalculate stacking
    if (_this.model.marker.stack.which !== "none") {
      this.stackedPointers.forEach(function (group) {
        var toStack = [];
        group.values.forEach(function (subgroup) {
          toStack = toStack.concat(subgroup.values.filter(function (f) {
            return !f.hidden;
          }));
        });
        _this.stack.keys(toStack.map(function (d) {
          return d.KEY();
        }))(d3.range(_this.mesh.length)).forEach(function (vertices, keyIndex) {
          var key = toStack[keyIndex].KEY();
          vertices.forEach(function (d, verticesIndex) {
            _this.cached[key][verticesIndex].y0 = d[0];
          });
        });
      });
    }

    this.mountainPointers.forEach(function (d) {
      d.valuesPointer = _this.values;
      d.yMax = d3.max(_this.cached[d.KEY()].map(function (m) {
        return m.y0 + m.y;
      }));
      if (_this.yMax < d.yMax) _this.yMax = d.yMax;
    });

    var mergeGrouped = _this.model.marker.group.merge;
    var mergeStacked = _this.model.marker.stack.merge;
    //var dragOrPlay = (_this.model.time.dragging || _this.model.time.playing) && this.model.marker.stack.which !== "none";

    //if(mergeStacked){
    this.stackedPointers.forEach(function (d) {
      d.valuesPointer = _this.valuesAggregated;
      var firstLast = _this._getFirstLastPointersInStack(d);
      _this.cached[d.key] = _this._getVerticesOfaMergedShape(firstLast);
      _this.valuesAggregated.color[d.key] = "_default";
      _this.valuesAggregated.axis_y[d.key] = _this._sumLeafPointersByMarker(d, "axis_y");
      d.yMax = firstLast.first.yMax;
    });
    //} else if (mergeGrouped || dragOrPlay){
    this.groupedPointers.forEach(function (d) {
      d.valuesPointer = _this.valuesAggregated;
      var firstLast = _this._getFirstLastPointersInStack(d);
      _this.cached[d.key] = _this._getVerticesOfaMergedShape(firstLast);
      _this.valuesAggregated.color[d.key] = _this.values.color[firstLast.first.KEY()];
      _this.valuesAggregated.axis_y[d.key] = _this._sumLeafPointersByMarker(d, "axis_y");
      d.yMax = firstLast.first.yMax;
    });
    //}

    if (!mergeStacked && !mergeGrouped && this.model.marker.stack.use === "property") {
      this.groupedPointers.forEach(function (d) {
        var visible = d.values.filter(function (f) {
          return !f.hidden;
        });
        d.yMax = visible[0].yMax;
        d.values.forEach(function (e) {
          e.yMaxGroup = d.yMax;
        });
      });
    }
  },
  _updateForecastOverlay: function _updateForecastOverlay() {
    this.forecastOverlay.classed("vzb-hidden", this.model.time.value <= this.model.time.endBeforeForecast || !this.model.time.endBeforeForecast || !this.model.ui.chart.showForecastOverlay);
  },
  _getFirstLastPointersInStack: function _getFirstLastPointersInStack(group) {
    var visible = void 0,
        visible2 = void 0;
    var first = void 0,
        last = void 0;

    if (group.values[0].values) {
      visible = group.values[0].values.filter(function (f) {
        return !f.hidden;
      });
      visible2 = group.values[group.values.length - 1].values.filter(function (f) {
        return !f.hidden;
      });
      first = visible[0];
      last = visible2[visible2.length - 1];
    } else {
      visible = group.values.filter(function (f) {
        return !f.hidden;
      });
      first = visible[0];
      last = visible[visible.length - 1];
    }

    if (!visible.length || visible2 && !visible2.length) utils.warn("mountain chart failed to generate shapes. check the incoming data");

    return {
      first: first,
      last: last
    };
  },
  _getVerticesOfaMergedShape: function _getVerticesOfaMergedShape(arg) {
    var _this = this;

    var first = arg.first.KEY();
    var last = arg.last.KEY();

    return _this.mesh.map(function (m, i) {
      var y = _this.cached[first][i].y0 + _this.cached[first][i].y - _this.cached[last][i].y0;
      var y0 = _this.cached[last][i].y0;
      return {
        x: m,
        y0: y0,
        y: y
      };
    });
  },
  _spawnMasks: function _spawnMasks() {
    var _this = this;

    var tailFatX = this._math.unscale(this.model.marker.axis_x.tailFatX);
    var tailCutX = this._math.unscale(this.model.marker.axis_x.tailCutX);
    var tailFade = this.model.marker.axis_x.tailFade;
    var k = 2 * Math.PI / (Math.log(tailFatX) - Math.log(tailCutX));
    var m = Math.PI - Math.log(tailFatX) * k;

    this.spawnMask = [];
    this.cosineShape = [];
    this.cosineArea = 0;

    this.mesh.forEach(function (dX, i) {
      _this.spawnMask[i] = dX < tailCutX ? 1 : dX > tailFade * 7 ? 0 : Math.exp((tailCutX - dX) / tailFade);
      _this.cosineShape[i] = dX > tailCutX && dX < tailFatX ? 1 + Math.cos(Math.log(dX) * k + m) : 0;
      _this.cosineArea += _this.cosineShape[i];
    });
  },
  _spawn: function _spawn(values, dataKeys, d) {
    var _this = this;

    var norm = values.axis_y[utils.getKey(d.KEYS(), dataKeys.axis_y)];
    var sigma = _this.model.ui.chart.directSigma ? values.axis_s[utils.getKey(d.KEYS(), dataKeys.axis_s)] : _this._math.giniToSigma(values.axis_s[utils.getKey(d.KEYS(), dataKeys.axis_s)]);

    var mu = _this.model.ui.chart.directMu ? values.axis_x[utils.getKey(d.KEYS(), dataKeys.axis_x)] : _this._math.gdpToMu(values.axis_x[utils.getKey(d.KEYS(), dataKeys.axis_x)], sigma);

    if (!norm || !mu || !sigma) return [];

    var distribution = [];
    var acc = 0;

    this.mesh.forEach(function (dX, i) {
      distribution[i] = _this._math.pdf.lognormal(dX, mu, sigma);
      acc += _this.spawnMask[i] * distribution[i];
    });

    var result = this.mesh.map(function (dX, i) {
      return {
        x: dX,
        y0: 0,
        y: norm * (distribution[i] * (1 - _this.spawnMask[i]) + _this.cosineShape[i] / _this.cosineArea * acc)
      };
    });

    return result;
  },
  _adjustMaxY: function _adjustMaxY(options) {
    if (!options) options = {};
    var _this = this;
    var method = this.model.ui.chart.yMaxMethod;

    if (method !== "immediate" && !options.force) return;
    if (method === "latest") {
      var prevValues = _this.values;
      _this.model.marker.getFrame(_this.model.time.end, function (values) {
        if (!values) return;

        //below is a complicated issue when updatePointers() is first calculated for one set of values (at the end of time series), then yMax is taken from that data (assuming that population always grows, so the last year has the highest mountain)
        _this.values = values;
        _this.updatePointers();

        //after that updatePointers() is called with the actual data of the current time point
        _this.values = prevValues;
        _this.yScale.domain([0, Math.round(_this.yMax)]);
        _this.updatePointers();
        _this.redrawDataPoints();
      });
    } else {
      if (!_this.yMax) utils.warn("Setting yMax to " + _this.yMax + ". You failed again :-/");
      _this.yScale.domain([0, Math.round(_this.yMax)]);
    }
  },
  redrawDataPoints: function redrawDataPoints() {
    var _this = this;
    var mergeGrouped = this.model.marker.group.merge;
    var mergeStacked = this.model.marker.stack.merge;
    var stackMode = this.model.marker.stack.which;
    //it's important to know if the chart is dragging or playing at the moment.
    //because if that is the case, the mountain chart will merge the stacked entities to save performance
    var dragOrPlay = (this.model.time.dragging || this.model.time.playing) &&
    //never merge when no entities are stacked
    stackMode !== "none";

    this._adjustMaxY();

    this.mountainsMergeStacked.each(function (d) {
      var view = d3.select(this);
      var hidden = !mergeStacked;
      _this._renderShape(view, d.KEY(), hidden);
    });

    this.mountainsMergeGrouped.each(function (d) {
      var view = d3.select(this);
      var hidden = !mergeGrouped && !dragOrPlay || mergeStacked && !_this.model.marker.isSelected(d);
      _this._renderShape(view, d.KEY(), hidden);
    });

    this.mountainsAtomic.each(function (d, i) {
      var view = d3.select(this);
      var hidden = d.hidden || (mergeGrouped || mergeStacked || dragOrPlay) && !_this.model.marker.isSelected(d);
      _this._renderShape(view, d.KEY(), hidden);
    });

    if (stackMode === "none") {
      this.mountainsAtomic.sort(function (a, b) {
        return b.yMax - a.yMax;
      });
    } else if (stackMode === "all") {
      // do nothing if everything is stacked

    } else {
      if (mergeGrouped || dragOrPlay) {
        // this.mountainsMergeGrouped.sort(function (a, b) {
        //     return b.yMax - a.yMax;
        // });
      } else {
        this.mountainsAtomic.sort(function (a, b) {
          return b.yMaxGroup - a.yMaxGroup;
        });
      }
    }

    // exporting shapes for shape preloader. is needed once in a while
    // if (!this.shapes) this.shapes = {}
    // this.shapes[this.model.time.value.getUTCFullYear()] = {
    //     yMax: d3.format(".2e")(_this.yMax),
    //     shape: _this.cached["all"].map(function (d) {return d3.format(".2e")(d.y);})
    // }

    this._updateDecorations();
  },
  redrawDataPointsOnlyColors: function redrawDataPointsOnlyColors() {
    var _this = this;
    if (!this.mountains) return utils.warn("redrawDataPointsOnlyColors(): no mountains  defined. likely a premature call, fix it!");
    var isColorUseIndicator = this.model.marker.color.use === "indicator";
    this.mountains.style("fill", function (d) {
      var color = d.valuesPointer.color[utils.getKey(d.KEYS(), _this.dataKeys.color)];
      return color ? isColorUseIndicator && color == "_default" ? _this.model.marker.color.palette["_default"] : _this.cScale(color) : COLOR_WHITEISH;
    });
  },
  _renderShape: function _renderShape(view, key, hidden) {
    var stack = this.model.marker.stack.which;
    var _this = this;
    var valuesPointer = view.datum().valuesPointer;

    view.classed("vzb-hidden", hidden);

    if (hidden) {
      if (stack !== "none") view.style("stroke-opacity", 0);
      return;
    }

    var filter = {};
    filter[this.KEY] = key;
    if (this.model.marker.isSelected(filter)) {
      view.attr("d", this.area(this.cached[key].filter(function (f) {
        return f.y > valuesPointer.axis_y[key] * THICKNESS_THRESHOLD;
      })));
    } else {
      view.attr("d", this.area(this.cached[key]));
    }

    //color use indicator suggests that this should be updated on every timeframe
    if (this.model.marker.color.use === "indicator") {
      view.style("fill", valuesPointer.color[key] ? valuesPointer.color[key] !== "_default" ? _this.cScale(valuesPointer.color[key]) : _this.model.marker.color.palette["_default"] : COLOR_WHITEISH);
    }

    if (stack !== "none") view.transition().duration(Math.random() * 900 + 100).ease(d3.easeCircle).style("stroke-opacity", 0.5);

    if (this.model.time.record) this._export.write({
      type: "path",
      id: key,
      time: this.model.time.value.getUTCFullYear(),
      fill: this.cScale(valuesPointer.color[key]),
      d: this.area(this.cached[key])
    });
  },
  _setTooltip: function _setTooltip(tooltipText) {
    if (tooltipText) {
      var mouse = d3.mouse(this.graph.node()).map(function (d) {
        return parseInt(d);
      });

      //position tooltip
      this.tooltip.classed("vzb-hidden", false).attr("transform", "translate(" + mouse[0] + "," + mouse[1] + ")").selectAll("text").attr("text-anchor", "middle").attr("alignment-baseline", "middle").text(tooltipText);

      var contentBBox = this.tooltip.select("text").node().getBBox();

      this.tooltip.select("rect").attr("width", contentBBox.width + 8).attr("height", contentBBox.height + 8).attr("x", -contentBBox.width - 25).attr("y", -contentBBox.height - 25).attr("rx", contentBBox.height * 0.2).attr("ry", contentBBox.height * 0.2);

      this.tooltip.selectAll("text").attr("x", -contentBBox.width - 25 + (contentBBox.width + 8) / 2).attr("y", -contentBBox.height - 25 + (contentBBox.height + 11) / 2); // 11 is 8 for margin + 3 for strokes
      var translateX = mouse[0] - contentBBox.width - 25 > 0 ? mouse[0] : contentBBox.width + 25;
      var translateY = mouse[1] - contentBBox.height - 25 > 0 ? mouse[1] : contentBBox.height + 25;
      this.tooltip.attr("transform", "translate(" + translateX + "," + translateY + ")");
    } else {

      this.tooltip.classed("vzb-hidden", true);
    }
  },
  preload: function preload() {
    var _join,
        _this2 = this;

    var _this = this;

    var preload = utils.getProp(this, ["model", "ui", "chart", "preload"]);
    var preloadKey = utils.getProp(this, ["model", "ui", "chart", "preloadKey"]);
    if (!preload) return Promise.resolve();

    var KEY = this.model.marker._getFirstDimension({ exceptType: "time" });
    var TIMEDIM = this.model.time.dim;

    //build a query to the reader to fetch preload info
    var query = {
      language: this.model.locale.id,
      from: "datapoints",
      select: {
        key: [KEY, TIMEDIM],
        value: [preload]
      },
      where: { $and: [_defineProperty({}, KEY, "$" + KEY), _defineProperty({}, TIMEDIM, "$" + TIMEDIM)] },
      join: (_join = {}, _defineProperty(_join, "$" + KEY, { key: KEY, where: _defineProperty({}, KEY, { $in: [preloadKey || "world"] }) }), _defineProperty(_join, "$" + TIMEDIM, { key: TIMEDIM, where: _defineProperty({}, TIMEDIM, this.model.time.formatDate(this.model.time.value)) }), _join),
      order_by: [TIMEDIM]
    };

    return new Promise(function (resolve, reject) {

      var dataPromise = _this2.model.data.load(query, _defineProperty({}, preload, function (d) {
        return JSON.parse(d);
      }));

      dataPromise.then(function (dataId) {
        _this.precomputedShape = _this.model.data.getData(dataId);
        resolve();
      }, function (err) {
        return utils.warn("Problem with Preload mountainchart query: ", err, JSON.stringify(query));
      });
    });
  }
});

exports.default = MountainChartComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Vizabi = Vizabi,
    utils = _Vizabi.utils;


var MCMath = Vizabi.Class.extend({
  init: function init(context) {
    this.context = context;

    this.xScaleFactor = 1;
    this.xScaleShift = 0;
  },
  rescale: function rescale(x) {
    return Math.exp(this.xScaleFactor * Math.log(x) + this.xScaleShift);
  },
  unscale: function unscale(x) {
    return Math.exp((Math.log(x) - this.xScaleShift) / this.xScaleFactor);
  },
  generateMesh: function generateMesh(length, scaleType, domain) {
    // span a uniform mesh across the entire X scale
    // if the scale is log, the mesh would be exponentially distorted to look uniform

    var rangeFrom = scaleType === "linear" ? domain[0] : Math.log(this.unscale(domain[0]));

    var rangeTo = scaleType === "linear" ? domain[1] : Math.log(this.unscale(domain[1]));

    var rangeStep = (rangeTo - rangeFrom) / length;

    var mesh = d3.range(rangeFrom, rangeTo, rangeStep).concat(rangeTo);

    if (scaleType !== "linear") {
      mesh = mesh.map(function (dX) {
        return Math.exp(dX);
      });
    } else {
      mesh = mesh.filter(function (dX) {
        return dX > 0;
      });
    }

    return mesh;
  },
  gdpToMu: function gdpToMu(gdp, sigma, xScaleFactor, xScaleShift) {
    // converting gdp per capita per day into MU for lognormal distribution
    // see https://en.wikipedia.org/wiki/Log-normal_distribution
    return Math.log(gdp / 365) - sigma * sigma / 2;
  },
  giniToSigma: function giniToSigma(gini) {
    // The ginis are turned into std deviation.
    // Mattias uses this formula in Excel: stddev = NORMSINV( ((gini/100)+1)/2 )*2^0.5
    return this.normsinv((gini / 100 + 1) / 2) * Math.pow(2, 0.5);
  },


  // this function returns PDF values for a specified distribution
  pdf: {
    normal: function normal(x, mu, sigma) {
      return Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(sigma) - Math.pow(x - mu, 2) / (2 * sigma * sigma));
    },
    lognormal: function lognormal(x, mu, sigma) {
      return Math.exp(-0.5 * Math.log(2 * Math.PI) //should not be different for the two scales- (scaleType=="linear"?Math.log(x):0)
      - Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma));
    }
  },

  normsinv: function normsinv(p) {
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
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

    // Define break-points.
    var plow = 0.02425;
    var phigh = 1 - plow;

    // Rational approximation for lower region:
    if (p < plow) {
      var _q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * _q + c[1]) * _q + c[2]) * _q + c[3]) * _q + c[4]) * _q + c[5]) / ((((d[0] * _q + d[1]) * _q + d[2]) * _q + d[3]) * _q + 1);
    }

    // Rational approximation for upper region:
    if (phigh < p) {
      var _q2 = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * _q2 + c[1]) * _q2 + c[2]) * _q2 + c[3]) * _q2 + c[4]) * _q2 + c[5]) / ((((d[0] * _q2 + d[1]) * _q2 + d[2]) * _q2 + d[3]) * _q2 + 1);
    }

    // Rational approximation for central region:
    var q = p - 0.5;
    var r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
});

exports.default = MCMath;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Vizabi = Vizabi,
    utils = _Vizabi.utils,
    iconClose = _Vizabi.iconset.close;


var MCSelectList = Vizabi.Class.extend({
  init: function init(context) {
    this.context = context;
  },
  rebuild: function rebuild(data) {
    var _this = this.context;
    var _local = this;

    var listData = _this.mountainPointers.concat(_this.groupedPointers).concat(_this.stackedPointers).filter(function (f) {
      return _this.model.marker.isSelected(f.KEYS());
    }).sort(function (a, b) {
      if (a.sortValue && b.sortValue) {
        if (a.sortValue[1] === b.sortValue[1]) {
          return d3.descending(a.sortValue[0], b.sortValue[0]);
        }
        return d3.descending(a.sortValue[1], b.sortValue[1]);
      }

      if (a.aggrLevel != b.aggrLevel) {
        return d3.descending(a.aggrLevel, b.aggrLevel);
      } else if (a.aggrLevel && b.aggrLevel) {
        return d3.descending(a.yMax, b.yMax);
      }

      return 0;
    });
    _this.selectList = _this.mountainLabelContainer.selectAll("g.vzb-mc-label").data(utils.unique(listData, function (d) {
      return d.KEY();
    }));
    _this.selectList.exit().remove();
    _this.selectList = _this.selectList.enter().append("g").attr("class", "vzb-mc-label").each(function (d, i) {
      var label = d3.select(this);
      label.append("circle").attr("class", "vzb-mc-label-legend");
      label.append("text").attr("class", "vzb-mc-label-shadow vzb-mc-label-text");
      label.append("text").attr("class", "vzb-mc-label-text");
      label.append("g").attr("class", "vzb-mc-label-x vzb-label-shadow vzb-invisible").on("click", function (d, i) {
        if (utils.isTouchDevice()) return;
        d3.event.stopPropagation();
        _this.model.marker.clearHighlighted();
        _this.model.marker.selectMarker(d.KEYS());
        d3.event.stopPropagation();
      }).onTap(function (d, i) {
        //d3.select("#" + d.geo + "-label-" + _this._id).remove();
        _this.model.marker.clearHighlighted();
        _this.model.marker.selectMarker(d.KEYS());
      });
      var labelCloseGroup = label.select("g.vzb-mc-label-x");
      if (!utils.isTouchDevice()) {
        utils.setIcon(labelCloseGroup, iconClose).select("svg").attr("class", "vzb-mc-label-x-icon").attr("width", "0px").attr("height", "0px");

        labelCloseGroup.insert("circle", "svg");
      } else {
        labelCloseGroup.append("rect");
        labelCloseGroup.append("text").attr("class", "vzb-mc-label-x-text").text("Deselect");
      }
    }).on("mousemove", function (d, i) {
      if (utils.isTouchDevice()) return;
      _local.showCloseCross(d, true);
      _this.model.marker.highlightMarker(d.KEYS());
    }).on("mouseout", function (d, i) {
      if (utils.isTouchDevice()) return;
      _local.showCloseCross(d, false);
      _this.model.marker.clearHighlighted();
    }).on("click", function (d, i) {
      if (utils.isTouchDevice()) return;
      _this.model.marker.clearHighlighted();
      _this.model.marker.selectMarker(d.KEYS());
    }).merge(_this.selectList);
  },
  redraw: function redraw() {
    var _this = this.context;
    var dataKeys = _this.dataKeys;

    if (!_this.selectList || !_this.someSelected) return;

    var sample = _this.mountainLabelContainer.append("g").attr("class", "vzb-mc-label").append("text").text("0");
    var fontHeight = sample.node().getBBox().height * 1.2;
    var fontSizeToFontHeight = parseFloat(sample.style("font-size")) / fontHeight;
    d3.select(sample.node().parentNode).remove();
    var formatter = _this.model.marker.axis_y.getTickFormatter();

    var titleHeight = _this.yTitleEl.select("text").node().getBBox().height || 0;

    var maxFontHeight = (_this.height - titleHeight * 3) / (_this.selectList.data().length + 2);
    if (fontHeight > maxFontHeight) fontHeight = maxFontHeight;

    var currentAggrLevel = "null";
    var aggrLevelSpacing = 0;

    var groupLabels = _this.model.marker.color.getColorlegendMarker().label.getItems();

    var isRTL = _this.model.locale.isRTL();

    _this.selectList.attr("transform", function (d, i) {
      if (d.aggrLevel != currentAggrLevel) aggrLevelSpacing += fontHeight;
      var spacing = fontHeight * i + titleHeight * 2 + aggrLevelSpacing;
      currentAggrLevel = d.aggrLevel;
      return "translate(" + (isRTL ? _this.width : 0) + "," + spacing + ")";
    }).each(function (d, i) {

      var view = d3.select(this).attr("id", d.KEY() + "-label-" + _this._id);
      var name = "";
      if (d.key) {
        name = d.key === "all" ? _this.translator("mount/merging/world") : groupLabels[d.key];
      } else {
        name = _this._getLabelText(_this.values, _this.labelNames, d.KEYS());
      }

      var number = d.valuesPointer.axis_y[utils.getKey(d.KEYS(), dataKeys.axis_y)];

      var string = name + ": " + formatter(number) + (i === 0 ? " " + _this.translator("mount/people") : "");

      var text = view.selectAll(".vzb-mc-label-text").attr("x", (isRTL ? -1 : 1) * fontHeight).attr("y", fontHeight).text(string).style("font-size", fontHeight === maxFontHeight ? fontHeight * fontSizeToFontHeight + "px" : null);

      var contentBBox = text.node().getBBox();

      var closeGroup = view.select(".vzb-mc-label-x");

      if (utils.isTouchDevice()) {
        var closeTextBBox = closeGroup.select("text").node().getBBox();
        closeGroup.classed("vzb-revert-color", true).select(".vzb-mc-label-x-text").classed("vzb-revert-color", true).attr("x", contentBBox.width + contentBBox.height * 1.12 + closeTextBBox.width * 0.5).attr("y", contentBBox.height * 0.55);

        closeGroup.select("rect").attr("width", closeTextBBox.width + contentBBox.height * 0.6).attr("height", contentBBox.height).attr("x", contentBBox.width + contentBBox.height * 0.9).attr("y", 0).attr("rx", contentBBox.height * 0.25).attr("ry", contentBBox.height * 0.25);
      } else {
        closeGroup.attr("x", contentBBox.width + contentBBox.height * 1.1).attr("y", contentBBox.height / 3);

        closeGroup.select("circle").attr("r", contentBBox.height * 0.4).attr("cx", (isRTL ? -1 : 1) * (contentBBox.width + contentBBox.height * 1.1)).attr("cy", contentBBox.height / 3);

        closeGroup.select("svg").attr("x", (isRTL ? -1 : 1) * (contentBBox.width + contentBBox.height * (1.1 - (isRTL ? -0.4 : 0.4)))).attr("y", contentBBox.height * (1 / 3 - 0.4)).attr("width", contentBBox.height * 0.8).attr("height", contentBBox.height * 0.8);
      }

      view.select(".vzb-mc-label-legend").attr("r", fontHeight / 3).attr("cx", (isRTL ? -1 : 1) * fontHeight * 0.4).attr("cy", fontHeight / 1.5).style("fill", _this.cScale(d.valuesPointer.color[utils.getKey(d.KEYS(), dataKeys.color)]));

      view.onTap(function (d, i) {
        d3.event.stopPropagation();
        _this.model.marker.highlightMarker(d.KEYS());
        setTimeout(function () {
          _this.model.marker.unhighlightMarker(d.KEYS());
        }, 2000);
      });
    });
  },
  showCloseCross: function showCloseCross(d, show) {
    var _this = this.context;
    var key = d.KEY();
    //show the little cross on the selected label
    _this.selectList.filter(function (f) {
      return f.KEY() == key;
    }).select(".vzb-mc-label-x").classed("vzb-invisible", !show);
  }
});

exports.default = MCSelectList;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Vizabi = Vizabi,
    utils = _Vizabi.utils;


var MCProbe = Vizabi.Class.extend({
  init: function init(context) {
    this.context = context;
  },
  redraw: function redraw(options) {
    var _this = this.context;
    if (!options) options = {};

    if (!options.level) options.level = _this.model.ui.chart.probeX;

    _this.probeEl.classed("vzb-hidden", !options.level || !_this.model.ui.chart.showProbeX);
    if (!options.level) return;

    _this.xAxisEl.call(_this.xAxis.highlightValue(options.full ? options.level : "none"));

    var sumValue = 0;
    var totalArea = 0;
    var leftArea = 0;

    var _computeAreas = function _computeAreas(d) {
      sumValue += d.valuesPointer.axis_y[utils.getKey(d.KEYS(), _this.dataKeys.axis_y)];
      _this.cached[d.KEY()].forEach(function (d) {
        totalArea += d.y;
        if (_this._math.rescale(d.x) < options.level) leftArea += d.y;
      });
    };

    if (_this.model.marker.stack.which === "all") {
      _this.stackedPointers.forEach(_computeAreas);
    } else if (_this.model.marker.stack.which === "none") {
      _this.mountainPointers.forEach(_computeAreas);
    } else {
      _this.groupedPointers.forEach(_computeAreas);
    }

    var formatter1 = d3.format(".3r");
    var formatter2 = _this.model.marker.axis_y.getTickFormatter();
    _this.heightOfLabels = _this.heightOfLabels || 0.66 * _this.height;

    _this.probeTextEl.each(function (d, i) {
      if (i !== 8) return;
      var view = d3.select(this);

      if (!options.full && _this.model.ui.chart.probeX == _this.model.marker.axis_x.tailFatX) {

        view.text(_this.translator("mount/extremepoverty")).classed("vzb-hidden", false).attr("x", -_this.height).attr("y", _this.xScale(options.level)).attr("dy", "-1.15em").attr("dx", "0.5em").attr("transform", "rotate(-90)");

        _this.heightOfLabels = _this.height - view.node().getBBox().width - view.node().getBBox().height * 1.75;
      } else {
        view.classed("vzb-hidden", true);
      }
    });

    _this.probeTextEl.each(function (d, i) {
      if (i === 8) return;
      var view = d3.select(this);

      var string = void 0;
      if (i === 0 || i === 4) string = formatter1(leftArea / totalArea * 100) + "%";
      if (i === 1 || i === 5) string = formatter1(100 - leftArea / totalArea * 100) + "%";
      if (i === 2 || i === 6) string = formatter2(sumValue * leftArea / totalArea);
      if (i === 3 || i === 7) string = formatter2(sumValue * (1 - leftArea / totalArea)) + " " + _this.translator("mount/people");

      view.text(string).classed("vzb-hidden", !options.full && (_this.someSelected || i !== 0 && i !== 4)).attr("x", _this.xScale(options.level) + ([0, 4, 2, 6].indexOf(i) > -1 ? -6 : +5)).attr("y", _this.heightOfLabels).attr("dy", [0, 1, 4, 5].indexOf(i) > -1 ? 0 : "1.5em");
    });

    _this.probeLineEl.attr("x1", _this.xScale(options.level)).attr("x2", _this.xScale(options.level)).attr("y1", _this.height + 6).attr("y2", 0);
  }
});

exports.default = MCProbe;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<!-- MountainChart Component -->\n<div class=\"vzb-mountainchart\">\n    <svg class=\"vzb-mountainchart-svg vzb-export\">\n        <g class=\"vzb-mc-graph\">\n            <rect class=\"vzb-mc-eventarea\"></rect>\n            <g class=\"vzb-mc-year\"></g>\n\n            <g class=\"vzb-mc-mountains-mergestacked\"></g>\n            <g class=\"vzb-mc-mountains-mergegrouped\"></g>\n            <g class=\"vzb-mc-mountains\"></g>\n\n            <g class=\"vzb-mc-decorations\">\n                <g class=\"vzb-mc-x-axis-groups\"></g>\n            </g>\n    \n            <g class=\"vzb-mc-mountains-labels\"></g>\n\n\n            <g class=\"vzb-mc-axis-y-title\">\n                <text></text>\n            </g>\n\n            <g class=\"vzb-mc-axis-x-title\">\n                <text></text>\n            </g>\n\n            <g class=\"vzb-mc-axis-info vzb-noexport\">\n            </g>\n\n            <g class=\"vzb-data-warning vzb-noexport\">\n                <svg></svg>\n                <text></text>\n            </g>\n\n            <g class=\"vzb-mc-axis-x\"></g>\n\n            <g class=\"vzb-mc-axis-labels\"></g>\n            <g class=\"vzb-mc-probe\">\n                <text class=\"vzb-shadow vzb-mc-probe-value-ul\"></text>\n                <text class=\"vzb-shadow vzb-mc-probe-value-ur\"></text>\n                <text class=\"vzb-shadow vzb-mc-probe-value-dl\"></text>\n                <text class=\"vzb-shadow vzb-mc-probe-value-dr\"></text>\n                <text class=\"vzb-mc-probe-value-ul\"></text>\n                <text class=\"vzb-mc-probe-value-ur\"></text>\n                <text class=\"vzb-mc-probe-value-dl\"></text>\n                <text class=\"vzb-mc-probe-value-dr\"></text>\n                <text class=\"vzb-mc-probe-extremepoverty\"></text>\n                <line></line>\n            </g>\n\n            <g class=\"vzb-mc-tooltip vzb-hidden\">\n                <rect class=\"vzb-tooltip-border\"></rect>\n                <text class=\"vzb-tooltip-text\"></text>\n            </g>\n        </g>\n        <rect class=\"vzb-mc-forecastoverlay vzb-hidden\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#vzb-mc-pattern-lines)\" pointer-events='none'></rect>\n    </svg>\n    <svg>\n        <defs>\n            <pattern id=\"vzb-mc-pattern-lines\" x=\"0\" y=\"0\" patternUnits=\"userSpaceOnUse\" width=\"50\" height=\"50\" viewBox=\"0 0 10 10\"> \n                <path d='M-1,1 l2,-2M0,10 l10,-10M9,11 l2,-2' stroke='black' stroke-width='3' opacity='0.08'/>\n            </pattern> \n        </defs>\n    </svg>\n</div>\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Axes dialog
 */

var Axes = Vizabi.Component.get("_dialog").extend("axesmc", {

  /**
   * Initializes the dialog component
   * @param config component configuration
   * @param context component context (parent)
   */
  init: function init(config, parent) {
    this.name = "axesmc";
    var _this = this;

    this.model_binds = {
      "change:ui.chart.xLogStops": function changeUiChartXLogStops() {
        _this.updateView();
      },
      "change:ui.chart.yMaxMethod": function changeUiChartYMaxMethod() {
        _this.updateView();
      }
    };

    this.components = [{
      component: Vizabi.Component.get("minmaxinputs"),
      placeholder: ".vzb-xlimits-container",
      model: ["state.marker", "state.time", "locale"],
      markerID: "axis_x",
      ui: {
        selectDomainMinMax: false,
        selectZoomedMinMax: true
      }
    }];

    this._super(config, parent);
    this.template = __webpack_require__(9);
  },
  readyOnce: function readyOnce() {
    this._super();

    var _this = this;

    this.yMaxRadio = this.element.select(".vzb-yaxis-container").selectAll("input").on("change", function () {
      _this.setModel("yMaxMethod", d3.select(this).node().value);
    });

    this.xLogStops = this.element.select(".vzb-xaxis-container").selectAll("input").on("change", function () {
      _this.setModel("xLogStops", d3.select(this).node().value);
    });

    this.probeCheck = this.element.select(".vzb-probe-check").on("change", function () {
      _this.setModel("showProbeX", d3.select(this).property("checked"));
    });

    this.probeFieldEl = this.element.select(".vzb-probe-field").on("change", function () {
      var result = parseFloat(this.value.replace(",", "."));
      if (!result || result <= _this.model.state.marker.axis_x.tailCutX) {
        this.value = _this.model.ui.chart.probeX;
        return;
      } else if (result > _this.model.state.marker.axis_x.domainMax) {
        result = _this.model.state.marker.axis_x.domainMax;
      }
      this.value = result;
      _this.setModel("probeX", result);
    });

    this.updateView();
  },
  updateView: function updateView() {
    var _this = this;

    this.yMaxRadio.property("checked", function () {
      return d3.select(this).node().value === _this.model.ui.chart.yMaxMethod;
    });
    this.xLogStops.property("checked", function () {
      return _this.model.ui.chart.xLogStops.indexOf(+d3.select(this).node().value) !== -1;
    });
    this.probeCheck.property("checked", this.model.ui.chart.showProbeX);
    this.probeFieldEl.property("value", this.model.ui.chart.probeX);
  },
  setModel: function setModel(what, value) {
    var result = void 0;

    if (what == "yMaxMethod") {
      result = value;
    }
    if (what == "xLogStops") {
      result = [];
      this.xLogStops.each(function () {
        if (d3.select(this).property("checked")) result.push(+d3.select(this).node().value);
      });
    }
    if (what == "probeX" || what == "showProbeX") {
      result = value;
    }

    this.model.ui.chart[what] = result;
  }
});

exports.default = Axes;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class='vzb-dialog-modal'>\n    <span class=\"thumb-tack-class thumb-tack-class-ico-pin fa\" data-dialogtype=\"axesmc\" data-click=\"pinDialog\"></span>\n    <span class=\"thumb-tack-class thumb-tack-class-ico-drag fa\" data-dialogtype=\"axesmc\" data-click=\"dragDialog\"></span>\n    <div class=\"vzb-dialog-title\">\n        <%=t (\"buttons/axes\") %>\n    </div>\n    <div class=\"vzb-dialog-content\">\n        <div class=\"vzb-yaxis-container\">\n            <p class=\"vzb-dialog-sublabel\"><%=t (\"hints/mount/maxYvalue\") %></p>\n            <form class=\"vzb-dialog-paragraph\">\n                <label><input type=\"radio\" name=\"ymax\" value=\"immediate\"><%=t (\"mount/maxYmode/immediate\") %></label>\n                <label><input type=\"radio\" name=\"ymax\" value=\"latest\"><%=t (\"mount/maxYmode/latest\") %></label>\n            </form>\n        </div>\n        <div class=\"vzb-xaxis-container\">\n            <p class=\"vzb-dialog-sublabel\">\n                <%=t (\"hints/mount/logXstops\") %>\n            </p>\n            <form class=\"vzb-dialog-paragraph\">\n                <input type=\"checkbox\" name=\"logstops\" value=\"1\">1\n                <input type=\"checkbox\" name=\"logstops\" value=\"2\">2\n                <input type=\"checkbox\" name=\"logstops\" value=\"5\">5\n            </form>\n        </div>\n        <p class=\"vzb-dialog-sublabel\">\n            <%=t (\"hints/mount/xlimits\") %>\n        </p>\n        <div class=\"vzb-xlimits-container vzb-dialog-paragraph\"></div>\n        <div class=\"vzb-probe-container\">\n            <p class=\"vzb-dialog-sublabel\">\n              <input type=\"checkbox\" name=\"probe\" class=\"vzb-probe-check\"> <%=t (\"hints/mount/probe\") %>\n            </p>\n            <input type=\"text\" class=\"vzb-probe-field\" name=\"probe\">\n        </div>\n    </div>\n    <div class=\"vzb-dialog-buttons\">\n        <div data-click=\"closeDialog\" class=\"vzb-dialog-button vzb-label-primary\">\n            <%=t (\"buttons/ok\") %>\n        </div>\n    </div>\n</div>";

/***/ })
/******/ ]);
//# sourceMappingURL=mountainchart.js.map