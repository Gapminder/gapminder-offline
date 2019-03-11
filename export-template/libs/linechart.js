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

var VERSION_INFO = { version: "2.3.1", build: 1547630336039 };

// LINE CHART TOOL
var LineChart = Vizabi.Tool.extend("LineChart", {
  /**
   * Initialized the tool
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init: function init(placeholder, external_model) {

    this.name = "linechart";

    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.marker", "locale", "ui"] //pass models to component
    }, {
      component: Vizabi.Component.get("timeslider"),
      placeholder: ".vzb-tool-timeslider",
      model: ["state.time", "state.marker", "ui"],
      ui: { show_value_when_drag_play: true, axis_aligned: false }
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


  default_model: {
    "state": {
      "time": {
        "autoconfig": {
          "type": "time"
        }
      },
      "entities": {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      "entities_colorlegend": {
        "autoconfig": {
          "type": "entity_domain",
          "excludeIDs": ["tag"]
        }
      },
      "marker": {
        limit: 5000,
        "space": ["entities", "time"],
        "axis_x": {
          "use": "indicator",
          "allow": { scales: ["time"] },
          "autoconfig": {
            "index": 0,
            "type": "time"
          }
        },
        "axis_y": {
          "use": "indicator",
          "allow": { scales: ["linear", "log"] },
          "autoconfig": {
            "type": "measure"
          }
        },
        "label": {
          "use": "property",
          "autoconfig": {
            "includeOnlyIDs": ["name"],
            "type": "string"
          }
        },
        "color": {
          "syncModels": ["marker_colorlegend"],
          "autoconfig": {}
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
    "ui": {
      "chart": {
        "curve": "curveMonotoneX",
        "labels": {
          "min_number_of_entities_when_values_hide": 2 //values hide when showing 2 entities or more
        },
        "whenHovering": {
          "hideVerticalNow": false,
          "showProjectionLineX": true,
          "showProjectionLineY": true,
          "higlightValueX": true,
          "higlightValueY": true,
          "showTooltip": false
        }
      },
      datawarning: {
        doubtDomain: [],
        doubtRange: []
      },
      "buttons": ["colors", "find", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"],
      "dialogs": {
        "popup": ["colors", "find", "moreoptions"],
        "sidebar": ["colors", "find"],
        "moreoptions": ["opacity", "speed", "axes", "colors", "presentation", "technical", "about"],
        "dialog": { "find": { "panelMode": "show" } }
      },
      "presentation": false
    }
  },

  versionInfo: VERSION_INFO
});

exports.default = LineChart;

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
var _Vizabi = Vizabi,
    utils = _Vizabi.utils,
    Component = _Vizabi.Component,
    _Vizabi$helpers = _Vizabi.helpers,
    axisSmart = _Vizabi$helpers["d3.axisWithLabelPicker"],
    collisionResolver = _Vizabi$helpers["d3.collisionResolver"],
    _Vizabi$iconset = _Vizabi.iconset,
    iconWarn = _Vizabi$iconset.warn,
    iconQuestion = _Vizabi$iconset.question;

// LINE CHART COMPONENT

var LCComponent = Component.extend("linechart", {
  init: function init(config, context) {
    var _this = this;
    this.name = "linechart";
    this.template = __webpack_require__(4);

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
      "change:time.value": function changeTimeValue() {
        if (!_this._readyOnce) return;
        _this.updateTime();
        _this.redrawDataPoints();
      },
      "change:time.playing": function changeTimePlaying() {
        // hide tooltip on touch devices when playing
        if (_this.model.time.playing && utils.isTouchDevice() && !_this.tooltip.classed("vzb-hidden")) _this.tooltip.classed("vzb-hidden", true);

        if (!_this.ui.chart.hideXAxisValue && _this.model.time.playing && _this.time - _this.model.time.start === 0) {
          _this.xAxisEl.call(_this.xAxis.highlightTransDuration(0).highlightValue(_this.time));
        }
      },
      "change:time.start": function changeTimeStart() {
        if (!_this._readyOnce || !_this.all_values || !_this.values) return;
        _this.updateIndicators();
        _this.updateShow();
        _this.zoomToMaxMin();
        _this.updateSize();
        _this.redrawDataPoints();
        _this.highlightLines();
      },
      "change:time.end": function changeTimeEnd() {
        if (!_this._readyOnce || !_this.all_values || !_this.values) return;
        _this.updateIndicators();
        _this.updateShow();
        _this.zoomToMaxMin();
        _this.updateSize();
        _this.redrawDataPoints();
        _this.highlightLines();
      },
      "change:marker": function changeMarker(evt, path) {
        if (!_this._readyOnce) return;
        if (path.indexOf("domainMin") > -1 || path.indexOf("domainMax") > -1 || path.indexOf("zoomedMin") > -1 || path.indexOf("zoomedMax") > -1) {
          if (!_this.yScale || !_this.xScale) return; //abort if building of the scale is in progress
          if (path.indexOf("axis_x") > -1) {
            var startOrigin = _this.model.time.formatDate(_this.model.marker.axis_x.getZoomedMin());
            var endOrigin = _this.model.time.formatDate(_this.model.marker.axis_x.getZoomedMax());
            _this.model.time.set({
              startOrigin: startOrigin,
              endOrigin: endOrigin
            });
            return;
          }
          if (!_this.all_values || !_this.values) return;
          _this.updateIndicators();
          _this.updateShow();
          _this.zoomToMaxMin();
          _this.updateSize();
          _this.updateTime();
          _this.redrawDataPoints();
          _this.highlightLines();
          return;
        }
        if (path.indexOf("scaleType") > -1) {
          if (!_this.all_values || !_this.values) return;
          _this.updateIndicators();
          _this.updateShow();
          _this.zoomToMaxMin();
          _this.updateSize();
          _this.redrawDataPoints();
          _this.highlightLines();
        }
      },
      "change:marker.highlight": function changeMarkerHighlight() {
        if (!_this._readyOnce) return;
        _this.highlightLines();
      },
      "change:marker.select": function changeMarkerSelect() {
        if (!_this._readyOnce) return;
        _this.updateDoubtOpacity();
        _this.highlightLines();
      },
      "change:marker.opacitySelectDim": function changeMarkerOpacitySelectDim() {
        if (!_this._readyOnce) return;
        _this.highlightLines();
      },
      "change:marker.opacityRegular": function changeMarkerOpacityRegular() {
        if (!_this._readyOnce) return;
        _this.highlightLines();
      },
      "change:marker.color": function changeMarkerColor() {
        if (!_this._ready) return;
        _this.model.marker.getFrame(_this.model.time.value, function (frame, time) {
          if (!_this._frameIsValid(frame)) return utils.warn("change:marker.color: empty data received from marker.getFrame(). doing nothing");
          _this.values = frame;
          _this.updateColors();
        });
      },
      "change:ui.chart.showForecastOverlay": function changeUiChartShowForecastOverlay() {
        if (!_this._readyOnce) return;
        _this._updateForecastOverlay();
      }
    };

    this._super(config, context);

    this.xScale = null;
    this.yScale = null;

    this.rangeXRatio = 1;
    this.rangeXShift = 0;

    this.rangeYRatio = 1;
    this.rangeYShift = 0;
    this.lineWidthScale = d3.scaleLinear().domain([0, 20]).range([7, 1]).clamp(true);
    this.xAxis = axisSmart("bottom");
    this.yAxis = axisSmart("left");

    this.COLOR_BLACKISH = "#333";
    this.COLOR_WHITEISH = "#fdfdfd";
    this.COLOR_WHITEISH_SHADE = "#555";

    this.isDataPreprocessed = false;
    this.timeUpdatedOnce = false;
    this.sizeUpdatedOnce = false;

    this.getNearestKey = utils.memoize(this.getNearestKey);
  },


  /*
   * domReady:
   * Executed after template is loaded
   * Ideally, it contains instantiations related to template
   */
  readyOnce: function readyOnce() {
    var _this2 = this;

    var _this = this;

    this.element = d3.select(this.element);
    this.graph = this.element.select(".vzb-lc-graph");

    this.yAxisElContainer = this.graph.select(".vzb-lc-axis-y");
    this.yAxisEl = this.yAxisElContainer.select("g");

    this.xAxisElContainer = this.graph.select(".vzb-lc-axis-x");
    this.xAxisEl = this.xAxisElContainer.select("g");

    this.xTitleEl = this.graph.select(".vzb-lc-axis-x-title");
    this.yTitleEl = this.graph.select(".vzb-lc-axis-y-title");
    this.yInfoEl = this.graph.select(".vzb-lc-axis-y-info");
    this.linesContainerCrop = this.graph.select(".vzb-lc-lines-crop");
    this.linesContainer = this.graph.select(".vzb-lc-lines");
    this.labelsContainerCrop = this.graph.select(".vzb-lc-labels-crop");
    this.labelsContainer = this.graph.select(".vzb-lc-labels");

    this.forecastOverlay = this.element.select(".vzb-lc-forecastoverlay");

    this.dataWarningEl = this.graph.select(".vzb-data-warning");

    this.verticalNow = this.labelsContainer.select(".vzb-lc-vertical-now");
    this.tooltip = this.element.select(".vzb-tooltip");
    //            this.filterDropshadowEl = this.element.select('#vzb-lc-filter-dropshadow');
    this.projectionX = this.graph.select(".vzb-lc-projection-x");
    this.projectionY = this.graph.select(".vzb-lc-projection-y");

    this.entityLabels = this.labelsContainer.selectAll(".vzb-lc-entity");
    this.entityLines = this.linesContainer.selectAll(".vzb-lc-entity");
    this.totalLength_1 = {};

    this.TIMEDIM = this.model.time.getDimension();
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();

    this.collisionResolver = collisionResolver().selector(".vzb-lc-label").value("valueY").filter(function (d, time) {
      return d.valueX - time === 0 && !d.hidden;
    });

    //component events

    var conceptPropsY = this.model.marker.axis_y.getConceptprops();
    utils.setIcon(this.yInfoEl, iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsY.description || conceptPropsY.sourceLink)));

    this.yInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.yInfoEl.on("mouseover", function () {
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      _this.parent.findChildByName("gapminder-datanotes").setHook("axis_y").show().setPos(coord.x, coord.y);
    });
    this.yInfoEl.on("mouseout", function () {
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });

    this.wScale = d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange);

    this.on("resize", function () {
      //return if updatesize exists with error
      if (_this.updateSize()) return;
      _this.updateTime();
      _this.redrawDataPoints();
    });
    this.graph.on("click", function () {
      if (_this2.model.marker.highlight.length == 1) {
        _this.model.marker.selectMarker(_this2.model.marker.highlight[0]);
      }
    });
  },
  ready: function ready() {
    var _this = this;
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();

    this.all_steps = this.model.time.getAllSteps();
    this.all_values = this.values = null;
    this.updateTime();
    this.updateUIStrings();
    this.updateIndicators();
    //this.updateShow();
    this.entityLines.remove();
    this.entityLabels.remove();
    //null means we need to calculate all frames before we get to the callback
    this.model.marker.getFrame(null, function (allValues) {
      _this.all_values = allValues;
      _this.model.marker.getFrame(_this.model.time.value, function (values) {
        if (!_this._frameIsValid(values)) return;
        _this.values = values;
        _this.updateShow();
        if (_this.updateSize()) return;
        _this.updateDoubtOpacity();
        _this.zoomToMaxMin();
        _this.redrawDataPoints();
        _this.highlightLines();
        _this.linesContainerCrop.on("mousemove", _this.entityMousemove.bind(_this, null, null, _this)).on("mouseleave", _this.entityMouseout.bind(_this, null, null, _this));
      });
    });
  },
  _frameIsValid: function _frameIsValid(frame) {
    return !(!frame || Object.keys(frame.axis_y).length === 0 || Object.keys(frame.axis_x).length === 0 || Object.keys(frame.color).length === 0);
  },
  updateUIStrings: function updateUIStrings() {
    var _this = this;
    var conceptPropsY = _this.model.marker.axis_y.getConceptprops();
    var conceptPropsX = _this.model.marker.axis_x.getConceptprops();
    var conceptPropsC = _this.model.marker.color.getConceptprops();
    this.translator = this.model.locale.getTFunction();

    this.strings = {
      title: {
        Y: conceptPropsY.name,
        X: conceptPropsX.name,
        C: conceptPropsC.name
      },
      unit: {
        Y: conceptPropsY.unit || "",
        X: conceptPropsX.unit || "",
        C: conceptPropsC.unit || ""
      }
    };

    if (this.strings.unit.Y === "unit/" + this.model.marker.axis_y.which) this.strings.unit.Y = "";
    if (this.strings.unit.X === "unit/" + this.model.marker.axis_x.which) this.strings.unit.X = "";
    if (this.strings.unit.C === "unit/" + this.model.marker.color.which) this.strings.unit.C = "";

    if (this.strings.unit.Y) this.strings.unit.Y = ", " + this.strings.unit.Y;
    if (this.strings.unit.X) this.strings.unit.X = ", " + this.strings.unit.X;
    if (this.strings.unit.C) this.strings.unit.C = ", " + this.strings.unit.C;

    utils.setIcon(this.dataWarningEl, iconWarn).select("svg").attr("width", "0px").attr("height", "0px");
    this.dataWarningEl.append("text").attr("text-anchor", "end").text(this.translator("hints/dataWarning"));

    this.dataWarningEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datawarning").toggle();
    }).on("mouseover", function () {
      _this.updateDoubtOpacity(1);
    }).on("mouseout", function () {
      _this.updateDoubtOpacity();
    });

    var xTitle = this.xTitleEl.selectAll("text").data([0]);
    xTitle = xTitle.enter().append("text").merge(xTitle);

    var yTitle = this.yTitleEl.selectAll("text").data([0]);
    yTitle = yTitle.enter().append("text").merge(yTitle);
    yTitle.on("click", function () {
      _this.parent.findChildByName("gapminder-treemenu").markerID("axis_y").alignX("left").alignY("top").updateView().toggle();
    });
  },
  updateDoubtOpacity: function updateDoubtOpacity(opacity) {
    if (opacity == null) opacity = this.wScale(+this.time.getUTCFullYear().toString());
    if (this.someSelected) opacity = 1;
    this.dataWarningEl.style("opacity", opacity);
  },


  /*
   * UPDATE INDICATORS
   */
  updateIndicators: function updateIndicators() {
    var _this = this;
    var KEY = this.KEY;

    //scales
    this.yScale = this.model.marker.axis_y.getScale();
    if (!this.splash) {
      var limits = this.model.marker.axis_y.getLimits(this.model.marker.axis_y.which);
      this.yScale.domain([limits.min, limits.max]);
    }
    this.xScale = this.model.marker.axis_x.getScale();
    this.cScale = this.model.marker.color.getScale();
    this.yAxis.tickFormat(this.model.marker.axis_y.getTickFormatter());
    this.xAxis.tickFormat(this.model.marker.axis_x.getTickFormatter());

    this.collisionResolver.scale(this.yScale).KEY(KEY);
  },


  /*
   * UPDATE SHOW:
   * Ideally should only update when show parameters change or data changes
   */
  updateShow: function updateShow() {
    var _this3 = this;

    var _this = this;
    var KEYS = this.KEYS;
    var KEY = this.KEY;
    var dataKeys = this.dataKeys;

    this.cached = {};

    this.dataHash = {};
    this.data = this.model.marker.getKeys().map(function (entity) {
      entity[KEY] = utils.getKey(entity, KEYS);
      _this3.dataHash[entity[KEY]] = entity;
      return entity;
    });
    this.linesContainer.selectAll(".vzb-lc-entity").remove();
    this.entityLines = this.linesContainer.selectAll(".vzb-lc-entity").data(this.data);

    this.lineWidth = this.lineWidthScale(this.data.length);
    if (this.lineWidth >= 2) {
      this.shadowWidth = this.lineWidth * 1.3;
    } else {
      this.shadowWidth = null;
    }
    this.labelsContainer.classed("small", !this.shadowWidth);
    this.entityLines = this.entityLines.enter().append("g").attr("class", function (d) {
      return "vzb-lc-entity vzb-lc-entity-" + d[KEY];
    }).each(function (d, index) {
      var entity = d3.select(this);
      if (_this.shadowWidth) {
        entity.append("path").attr("class", "vzb-lc-line-shadow");
      } else {}

      entity.append("path").attr("class", "vzb-lc-line");
    }).merge(this.entityLines);
    this.labelsContainer.selectAll(".vzb-lc-entity").remove();
    this.entityLabels = this.labelsContainer.selectAll(".vzb-lc-entity").data(this.data);
    this.entityLabels = this.entityLabels.enter().append("g").attr("class", "vzb-lc-entity").on("mouseover", function (d) {
      _this.model.marker.highlightMarker(d);
    }).on("mouseout", function (d) {
      _this.model.marker.clearHighlighted();
    }).each(function (d, index) {
      var entity = d3.select(this);

      entity.append("circle").attr("class", "vzb-lc-circle").attr("cx", 0);

      var labelGroup = entity.append("g").attr("class", "vzb-lc-label");

      labelGroup.append("text").attr("class", "vzb-lc-labelname vzb-lc-labelstroke").attr("dy", ".35em");

      labelGroup.append("text").attr("class", "vzb-lc-labelname vzb-lc-labelfill").attr("dy", ".35em");

      labelGroup.append("text").attr("class", "vzb-lc-label-value").attr("dy", "1.6em");
    }).merge(this.entityLabels);

    if (this.all_values && this.values) {
      this.entityLabels.each(function (d, index) {
        var entity = d3.select(this);

        var _this$getColorsByValu = _this.getColorsByValue(_this.values.color[utils.getKey(d, dataKeys.color)]),
            color = _this$getColorsByValu.color,
            colorShadow = _this$getColorsByValu.colorShadow;

        var label = _this.model.marker.getCompoundLabelText(d, _this.values);
        var value = _this.yAxis.tickFormat()(_this.values.axis_y[utils.getKey(d, dataKeys.axis_y)]);
        var name = label.length < 13 ? label : label.substring(0, 10) + "..."; //"…";
        var valueHideLimit = _this.ui.chart.labels.min_number_of_entities_when_values_hide;

        entity.select("circle").style("fill", color);
        entity.selectAll(".vzb-lc-labelname").text(name + " " + (_this.data.length < valueHideLimit ? value : ""));
        entity.select(".vzb-lc-labelfill").style("fill", colorShadow);
        entity.append("title").text(label + " " + value);

        entity.select(".vzb-lc-label-value").style("fill", colorShadow);
      });
    }

    //line template
    this.line = d3.line()
    //see https://bl.ocks.org/mbostock/4342190
    //"monotone" can also work. "basis" would skip the points on the sharp turns. "linear" is ugly
    .curve(d3[this.ui.chart.curve || "curveMonotoneX"]).x(function (d) {
      return _this.xScale(d[0]);
    }).y(function (d) {
      return _this.yScale(d[1]);
    });
  },
  getColorsByValue: function getColorsByValue(colorValue) {
    return {
      color: colorValue != null ? this.cScale(colorValue) : this.COLOR_WHITEISH,
      colorShadow: colorValue != null ? this.model.marker.color.getColorShade({
        colorID: colorValue,
        shadeID: "shade"
      }) : this.COLOR_WHITEISH_SHADE
    };
  },
  updateColors: function updateColors() {
    var _this = this;
    var dataKeys = this.dataKeys = this.model.marker.getDataKeysPerHook();
    var valuesColor = this.values.color;

    this.cScale = this.model.marker.color.getScale();

    this.entityLabels.each(function (d, index) {
      var entity = d3.select(this);

      var _this$getColorsByValu2 = _this.getColorsByValue(valuesColor[utils.getKey(d, dataKeys.color)]),
          color = _this$getColorsByValu2.color,
          colorShadow = _this$getColorsByValu2.colorShadow;

      entity.select("circle").style("fill", color);
      entity.select(".vzb-lc-labelfill").style("fill", colorShadow);
      entity.select(".vzb-lc-label-value").style("fill", colorShadow);
    });

    this.entityLines.each(function (d, index) {
      var entity = d3.select(this);

      var _this$getColorsByValu3 = _this.getColorsByValue(valuesColor[utils.getKey(d, dataKeys.color)]),
          color = _this$getColorsByValu3.color,
          colorShadow = _this$getColorsByValu3.colorShadow;

      entity.select(".vzb-lc-line").style("stroke", color);
      entity.select(".vzb-lc-line-shadow").style("stroke", colorShadow);
    });
  },

  /*
   * UPDATE TIME:
   * Ideally should only update when time or data changes
   */
  updateTime: function updateTime() {
    var _this = this;
    var KEY = this.KEY;
    var time_1 = this.time === null ? this.model.time.value : this.time;
    this.time = this.model.time.value;
    this.duration = this.model.time.playing && this.time - time_1 > 0 ? this.model.time.delayAnimations : 0;
    this._updateForecastOverlay();

    var timeDim = this.model.time.getDimension();
    var filter = {};

    filter[timeDim] = this.time;

    this.prev_steps = this.all_steps.filter(function (f) {
      return f < _this.time;
    });

    this.timeUpdatedOnce = true;
  },
  _updateForecastOverlay: function _updateForecastOverlay() {
    this.forecastOverlay.classed("vzb-hidden", this.model.time.value <= this.model.time.endBeforeForecast || !this.model.time.endBeforeForecast || !this.model.ui.chart.showForecastOverlay);
  },


  profiles: {
    "small": {
      margin: {
        top: 30,
        right: 20,
        left: 40,
        bottom: 20
      },
      infoElHeight: 16,
      yAxisTitleBottomMargin: 6,
      tick_spacing: 60,
      text_padding: 12,
      lollipopRadius: 6,
      limitMaxTickNumberX: 5
    },
    "medium": {
      margin: {
        top: 40,
        right: 60,
        left: 60,
        bottom: 25
      },
      infoElHeight: 20,
      yAxisTitleBottomMargin: 6,
      tick_spacing: 80,
      text_padding: 15,
      lollipopRadius: 7,
      limitMaxTickNumberX: 10
    },
    "large": {
      margin: {
        top: 50,
        right: 60,
        left: 75,
        bottom: 30
      },
      infoElHeight: 22,
      yAxisTitleBottomMargin: 6,
      tick_spacing: 100,
      text_padding: 20,
      lollipopRadius: 9,
      limitMaxTickNumberX: 0 // unlimited
    }
  },
  presentationProfileChanges: {
    "medium": {
      margin: { top: 70, bottom: 40, left: 70 },
      yAxisTitleBottomMargin: 20,
      xAxisTitleBottomMargin: 20,
      infoElHeight: 26,
      text_padding: 30
    },
    "large": {
      margin: { top: 70, bottom: 50, left: 70 },
      yAxisTitleBottomMargin: 20,
      xAxisTitleBottomMargin: 20,
      infoElHeight: 32,
      text_padding: 36,
      hideSTitle: true
    }
  },

  timeSliderProfiles: {
    small: {
      margin: {
        top: 7,
        right: 15,
        bottom: 10,
        left: 60
      }
    },
    medium: {
      margin: {
        top: 10,
        right: 15,
        bottom: 10,
        left: 60
      }
    },
    large: {
      margin: {
        top: 5,
        right: 15,
        bottom: 10,
        left: 75
      }
    }
  },

  /*
   * RESIZE:
   * Executed whenever the container is resized
   * Ideally, it contains only operations related to size
   */
  updateSize: function updateSize() {

    var _this = this;
    var values = this.values;
    var KEY = this.KEY;
    var isRTL = this.model.locale.isRTL();

    var padding = 2;

    this.activeProfile = this.getActiveProfile(this.profiles, this.presentationProfileChanges);
    this.margin = this.activeProfile.margin;
    this.tick_spacing = this.activeProfile.tick_spacing;

    var infoElHeight = this.activeProfile.infoElHeight;

    //adjust right this.margin according to biggest label

    var longestLabelWidth = 0;

    this.entityLabels.selectAll(".vzb-lc-labelname").attr("dx", _this.activeProfile.text_padding).each(function (d, index) {
      var width = this.getComputedTextLength();
      if (width > longestLabelWidth) longestLabelWidth = width;
    });

    this.entityLabels.selectAll(".vzb-lc-circle").attr("r", this.shadowWidth ? _this.activeProfile.lollipopRadius : _this.activeProfile.lollipopRadius * 0.8);

    var magicMargin = 20;
    this.margin.right = Math.max(this.margin.right, longestLabelWidth + this.activeProfile.text_padding + magicMargin);

    //stage
    this.height = parseInt(this.element.style("height"), 10) - this.margin.top - this.margin.bottom || 0;
    this.width = parseInt(this.element.style("width"), 10) - this.margin.left - this.margin.right || 0;

    if (this.height <= 0 || this.width <= 0) return utils.warn("Line chart updateSize() abort: vizabi container is too little or has display:none");

    this.linesContainerCrop.attr("width", this.width).attr("height", Math.max(0, this.height));

    this.labelsContainerCrop.attr("width", this.width + this.margin.right).attr("height", Math.max(0, this.height));

    this.collisionResolver.height(this.height);

    this.graph.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.yScale.range([this.height - this.activeProfile.lollipopRadius, this.activeProfile.lollipopRadius]);
    this.xScale.range([this.rangeXShift, this.width * this.rangeXRatio + this.rangeXShift]);

    this.yAxis.scale(this.yScale).tickSizeInner(-this.width).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.width, 0).labelerOptions({
      scaleType: this.model.marker.axis_y.scaleType,
      toolMargin: this.margin,
      limitMaxTickNumber: 6,
      viewportLength: this.height,
      formatter: this.model.marker.axis_y.getTickFormatter()
    });

    this.xAxis.scale(this.xScale).tickSizeInner(-this.height).tickSizeOuter(0).tickSizeMinor(-this.height, 0).tickPadding(6).labelerOptions({
      scaleType: this.model.marker.axis_x.scaleType,
      limitMaxTickNumber: this.activeProfile.limitMaxTickNumberX,
      toolMargin: this.margin,
      bump: this.activeProfile.text_padding * 2,
      formatter: this.model.marker.axis_x.getTickFormatter()
      //showOuter: true
    });

    this.xAxisElContainer.attr("width", this.width + this.activeProfile.text_padding * 2).attr("height", this.activeProfile.margin.bottom + this.height).attr("y", -1).attr("x", -this.activeProfile.text_padding);

    this.xAxisEl.attr("transform", "translate(" + (this.activeProfile.text_padding - 1) + "," + (this.height + 1) + ")");

    this.yAxisElContainer.attr("width", this.activeProfile.margin.left + this.width).attr("height", Math.max(0, this.height)).attr("x", -this.activeProfile.margin.left);
    this.yAxisEl.attr("transform", "translate(" + (this.activeProfile.margin.left - 1) + "," + 0 + ")");

    this.yAxisEl.call(this.yAxis);
    this.xAxisEl.call(this.xAxis);

    this.yTitleEl.style("font-size", infoElHeight + "px").attr("transform", "translate(" + (10 - this.activeProfile.margin.left + (isRTL ? infoElHeight * 1.4 : 0)) + ", -" + this.activeProfile.yAxisTitleBottomMargin + ")");

    var yTitleText = this.yTitleEl.select("text").text(this.strings.title.Y + this.strings.unit.Y);
    if (yTitleText.node().getBBox().width > this.width) yTitleText.text(this.strings.title.Y);

    if (this.yInfoEl.select("svg").node()) {
      var titleBBox = this.yTitleEl.node().getBBox();
      var t = utils.transform(this.yTitleEl.node());

      this.yInfoEl.select("svg").attr("width", infoElHeight + "px").attr("height", infoElHeight + "px");
      this.yInfoEl.attr("transform", "translate(" + (isRTL ? 10 - this.activeProfile.margin.left : titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4) + "," + (t.translateY - infoElHeight * 0.8) + ")");
    }

    var warnBB = this.dataWarningEl.select("text").node().getBBox();
    this.dataWarningEl.select("svg").attr("width", warnBB.height * 0.75).attr("height", warnBB.height * 0.75).attr("x", -warnBB.width - warnBB.height * 1.2).attr("y", -warnBB.height * 0.65);

    this.dataWarningEl.attr("transform", "translate(" + (this.width + this.margin.right * 0.85) + ",-" + this.activeProfile.yAxisTitleBottomMargin + ")").select("text");

    var xTitleText = this.xTitleEl.select("text").text(this.strings.title.X + this.strings.unit.X);

    this.xTitleEl.style("font-size", infoElHeight + "px").attr("transform", "translate(" + (this.width + this.activeProfile.text_padding + this.activeProfile.yAxisTitleBottomMargin) + "," + (this.height + xTitleText.node().getBBox().height * 0.72) + ")");

    if (xTitleText.node().getBBox().width > this.width - 100) xTitleText.text(this.strings.title.X);

    // adjust the vertical dashed line
    this.verticalNow.attr("y1", this.yScale.range()[0]).attr("y2", this.yScale.range()[1]).attr("x1", 0).attr("x2", 0);
    this.projectionX.attr("y1", _this.yScale.range()[0]);
    this.projectionY.attr("x2", _this.xScale.range()[0]);

    if (utils.isTouchDevice()) {
      _this.tooltip.classed("vzb-hidden", true);
      _this.verticalNow.style("opacity", 1);
      _this.projectionX.style("opacity", 0);
      _this.projectionY.style("opacity", 0);
      _this.xAxisEl.call(_this.xAxis.highlightValue(_this.time));
      _this.yAxisEl.call(_this.yAxis.highlightValue("none"));
      _this.graph.selectAll(".vzb-lc-entity").each(function () {
        d3.select(this).classed("vzb-dimmed", false).classed("vzb-hovered", false);
      });

      _this.hoveringNow = null;
    }
    var opts = {
      rangeMax: this.xScale.range()[1],
      mRight: longestLabelWidth - magicMargin,
      profile: this.timeSliderProfiles[this.getLayoutProfile()]
    };
    this.parent.trigger("myEvent", opts);

    this.sizeUpdatedOnce = true;
  },


  /*
   * REDRAW DATA POINTS:
   * Here plotting happens
   */
  redrawDataPoints: function redrawDataPoints() {
    var _this = this;
    var KEYS = this.KEYS;
    var KEY = this.KEY;
    var dataKeys = this.dataKeys = this.model.marker.getDataKeysPerHook();
    //    var values = this.values;

    if (!_this.all_values) return;
    this.model.marker.getFrame(this.time, function (values, time) {

      if (!_this._frameIsValid(values)) return utils.warn("redrawDataPoints(): empty data received from marker.getFrame(). doing nothing");
      _this.values = values;
      if (!_this.timeUpdatedOnce) {
        _this.updateTime();
      }
      if (!_this.sizeUpdatedOnce) {
        _this.updateSize();
      }
      _this.updateDoubtOpacity();

      _this.entityLines.each(function (d, index) {
        var entity = d3.select(this);

        var _this$getColorsByValu4 = _this.getColorsByValue(values.color[utils.getKey(d, dataKeys.color)]),
            color = _this$getColorsByValu4.color,
            colorShadow = _this$getColorsByValu4.colorShadow;

        //TODO: optimization is possible if getFrame would return both x and time
        //TODO: optimization is possible if getFrame would return a limited number of points, say 1 point per screen pixel
        //          const startTime = new Date();

        var xy = _this.prev_steps.map(function (frame, i) {
          return [frame, _this.all_values[frame] ? _this.all_values[frame].axis_y[utils.getKey(d, dataKeys.axis_y)] : null];
        }).filter(function (d) {
          return d[1] || d[1] === 0;
        });
        //          timer += new Date() - startTime;
        // add last point
        if (values.axis_y[utils.getKey(d, dataKeys.axis_y)] || values.axis_y[utils.getKey(d, dataKeys.axis_y)] === 0) {
          xy.push([values.axis_x[utils.getKey(d, dataKeys.axis_x)], values.axis_y[utils.getKey(d, dataKeys.axis_y)]]);
        }

        if (xy.length > 0) {
          _this.cached[d[KEY]] = {
            valueX: xy[xy.length - 1][0],
            valueY: xy[xy.length - 1][1]
          };
        } else {
          delete _this.cached[d[KEY]];
        }

        // the following fixes the ugly line butts sticking out of the axis line
        //if(x[0]!=null && x[1]!=null) xy.splice(1, 0, [(+x[0]*0.99+x[1]*0.01), y[0]]);
        var path2 = entity.select(".vzb-lc-line");

        if (_this.model.time.playing && _this.totalLength_1[d[KEY]] === null) {
          _this.totalLength_1[d[KEY]] = path2.node().getTotalLength();
        }
        var line = _this.line(xy) || "";

        var path1 = entity.select(".vzb-lc-line-shadow").style("stroke", colorShadow).style("stroke-width", _this.shadowWidth + "px").attr("transform", "translate(0, " + (_this.shadowWidth - _this.lineWidth) + ")").attr("d", line);
        path2
        //.style("filter", "none")
        .style("stroke", color).style("stroke-width", _this.lineWidth + "px").attr("d", line);
        var totalLength = path2.node().getTotalLength();

        // this section ensures the smooth transition while playing and not needed otherwise
        if (_this.model.time.playing) {

          path1.interrupt().attr("stroke-dasharray", totalLength).attr("stroke-dashoffset", totalLength - _this.totalLength_1[d[KEY]]).transition().delay(0).duration(_this.duration).ease(d3.easeLinear).attr("stroke-dashoffset", 0);
          path2.interrupt().attr("stroke-dasharray", totalLength).attr("stroke-dashoffset", totalLength - _this.totalLength_1[d[KEY]]).transition().delay(0).duration(_this.duration).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

          _this.totalLength_1[d[KEY]] = totalLength;
        } else {
          //reset saved line lengths
          _this.totalLength_1[d[KEY]] = null;

          path1.attr("stroke-dasharray", "none").attr("stroke-dashoffset", "none");

          path2.attr("stroke-dasharray", "none").attr("stroke-dashoffset", "none");
        }
      });

      _this.entityLabels.each(function (d, index) {
        var entity = d3.select(this);
        if (_this.cached[d[KEY]]) {
          d.valueX = _this.xScale(_this.cached[d[KEY]]["valueX"]);
          d.valueY = _this.yScale(_this.cached[d[KEY]]["valueY"]);
          entity.classed("vzb-hidden", false).transition().duration(_this.duration).ease(d3.easeLinear).attr("transform", "translate(" + d.valueX + ",0)");

          entity.select(".vzb-lc-circle").transition().duration(_this.duration).ease(d3.easeLinear).attr("cy", d.valueY + 1);

          if (_this.data.length < _this.ui.chart.labels.min_number_of_entities_when_values_hide * KEYS.length) {
            var label = _this.model.marker.getCompoundLabelText(d, _this.values);
            var value = _this.yAxis.tickFormat()(_this.cached[d[KEY]]["valueY"]);
            var name = label.length < 13 ? label : label.substring(0, 12) + "…"; //"…";

            entity.selectAll(".vzb-lc-labelname").text(name + " " + value);
          }

          entity.select(".vzb-lc-label").transition().duration(_this.duration).ease(d3.easeLinear).attr("transform", "translate(0," + d.valueY + ")");
        } else {
          entity.classed("vzb-hidden", true);
        }
      });
      _this.verticalNow.transition().duration(_this.duration).ease(d3.easeLinear).attr("transform", "translate(" + _this.xScale(d3.min([_this.model.marker.axis_x.getZoomedMax(), _this.time])) + ",0)");

      if (!_this.hoveringNow && _this.time - _this.model.time.start !== 0) {
        if (!_this.ui.chart.hideXAxisValue) _this.xAxisEl.call(_this.xAxis.highlightTransDuration(_this.duration).highlightValue(_this.time));
        _this.verticalNow.style("opacity", 1);
      } else {
        if (!_this.ui.chart.hideXAxisValue) _this.xAxisEl.call(_this.xAxis.highlightValue("none"));
        _this.verticalNow.style("opacity", 0);
      }

      // Call flush() after any zero-duration transitions to synchronously flush the timer queue
      // and thus make transition instantaneous. See https://github.com/mbostock/d3/issues/1951
      if (_this.duration == 0) {
        d3.timerFlush();
      }

      // cancel previously queued simulation if we just ordered a new one
      // then order a new collision resolving
      clearTimeout(_this.collisionTimeout);
      _this.collisionTimeout = setTimeout(function () {
        _this.entityLabels.call(_this.collisionResolver.time(_this.xScale(_this.time)));
      }, _this.model.time.delayAnimations * 1.5);
    });
  },
  entityMousemove: function entityMousemove(me, index, context, closestToMouse) {
    var _this = context;
    var KEY = _this.KEY;
    var values = _this.values;

    var mouse = d3.mouse(_this.element.node()).map(function (d) {
      return parseInt(d);
    });

    var resolvedTime = _this.xScale.invert(mouse[0] - _this.margin.left);
    if (_this.time - resolvedTime < 0) {
      resolvedTime = _this.time;
    } else if (resolvedTime < this.model.time["start"]) {
      resolvedTime = this.model.time["start"];
    }
    var resolvedValue = void 0;

    var mousePos = mouse[1] - _this.margin.top;

    if (!utils.isDate(resolvedTime)) resolvedTime = this.model.time.parse(resolvedTime);

    this.model.marker.getFrame(resolvedTime, function (data) {
      if (!_this._frameIsValid(data)) return;
      //const nearestKey = _this.getNearestKey(_this.yScale.invert(mousePos), data.axis_y);
      var nearestKey = _this.getNearestKey(mousePos, _this.dataHash, data.axis_y, _this.yScale.bind(_this));
      resolvedValue = data.axis_y[nearestKey];
      me = _this.dataHash[nearestKey];
      if (!_this.model.marker.isHighlighted(me)) {
        _this.model.marker.clearHighlighted();
        _this.model.marker.highlightMarker(me);
      }
      _this.hoveringNow = me;

      if (utils.isNaN(resolvedValue)) return;

      var scaledTime = _this.xScale(resolvedTime);
      var scaledValue = _this.yScale(resolvedValue);

      if (_this.ui.chart.whenHovering.showTooltip) {
        //position tooltip
        _this.tooltip
        //.style("right", (_this.width - scaledTime + _this.margin.right ) + "px")
        .style("left", scaledTime + _this.margin.left + "px").style("bottom", _this.height - scaledValue + _this.margin.bottom + "px").text(_this.yAxis.tickFormat()(resolvedValue)).classed("vzb-hidden", false);
      }

      // bring the projection lines to the hovering point
      if (_this.ui.chart.whenHovering.hideVerticalNow) {
        _this.verticalNow.style("opacity", 0);
      }

      if (_this.ui.chart.whenHovering.showProjectionLineX) {
        _this.projectionX.style("opacity", 1).attr("y2", scaledValue).attr("x1", scaledTime).attr("x2", scaledTime);
      }
      if (_this.ui.chart.whenHovering.showProjectionLineY) {
        _this.projectionY.style("opacity", 1).attr("y1", scaledValue).attr("y2", scaledValue).attr("x1", scaledTime);
      }

      if (_this.ui.chart.whenHovering.higlightValueX) _this.xAxisEl.call(_this.xAxis.highlightValue(resolvedTime).highlightTransDuration(0));

      if (_this.ui.chart.whenHovering.higlightValueY) _this.yAxisEl.call(_this.yAxis.highlightValue(resolvedValue).highlightTransDuration(0));

      clearTimeout(_this.unhoverTimeout);
    });
  },
  entityMouseout: function entityMouseout(me, index, context) {
    var _this = context;
    if (d3.event.relatedTarget && d3.select(d3.event.relatedTarget).classed("vzb-tooltip")) return;

    // hide and show things like it was before hovering
    _this.unhoverTimeout = setTimeout(function () {
      _this.tooltip.classed("vzb-hidden", true);
      _this.verticalNow.style("opacity", 1);
      _this.projectionX.style("opacity", 0);
      _this.projectionY.style("opacity", 0);
      _this.xAxisEl.call(_this.xAxis.highlightValue(_this.time));
      _this.yAxisEl.call(_this.yAxis.highlightValue("none"));

      _this.model.marker.clearHighlighted();

      _this.hoveringNow = null;
    }, 300);
  },


  /*
   * Highlights all hovered lines
   */
  highlightLines: function highlightLines() {
    var _this = this;
    var KEYS = this.KEYS;
    var KEY = this.KEY;
    var OPACITY_HIGHLT = 1.0;
    var OPACITY_HIGHLT_DIM = 0.3;
    var OPACITY_SELECT = 1.0;
    var OPACITY_REGULAR = this.model.marker.opacityRegular;
    var OPACITY_SELECT_DIM = this.model.marker.opacitySelectDim;

    var someHighlighted = this.model.marker.highlight.length > 0;
    this.someSelected = this.model.marker.select.length > 0;

    // when pointer events need update...

    this.nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
    var selected = {};
    _this.model.marker.getSelected().map(function (d) {
      selected[utils.getKey(d, KEYS)] = true;
    });
    //    const startTime = new Date();
    this.entityLines.style("opacity", function (d) {
      if (_this.model.marker.isHighlighted(d)) return OPACITY_HIGHLT;
      if (_this.someSelected) {
        return selected[d[KEY]] ? OPACITY_SELECT : OPACITY_SELECT_DIM;
      }
      if (someHighlighted) return OPACITY_HIGHLT_DIM;
      return OPACITY_REGULAR;
    });
    this.entityLabels.style("opacity", function (d) {
      if (_this.model.marker.isHighlighted(d)) {
        d.sortValue = 1;
        return OPACITY_HIGHLT;
      } else {
        d.sortValue = 0;
      }
      if (_this.someSelected) {
        return selected[d[KEY]] ? OPACITY_SELECT : OPACITY_SELECT_DIM;
      }
      if (someHighlighted) return OPACITY_HIGHLT_DIM;
      return OPACITY_REGULAR;
    }).attr("pointer-events", function (d) {
      if (!_this.someSelected || !_this.nonSelectedOpacityZero || selected[d[KEY]]) {
        d.hidden = false;
        return "visible";
      } else {
        d.hidden = true;
        return "none";
      }
    }).sort(function (x, y) {
      return d3.ascending(x.sortValue, y.sortValue);
    });
    /*
    //    const startTime = new Date();
    //    console.log(new Date() - startTime);
        this.graph.selectAll(".vzb-lc-entity").each(function() {
          d3.select(this)
            .style("opacity", d => {
              if (_this.model.marker.isHighlighted(d)) return OPACITY_HIGHLT;
              if (_this.someSelected) {
                return selected[d[KEY]] ? OPACITY_SELECT : OPACITY_SELECT_DIM;
              }
              if (someHighlighted) return OPACITY_HIGHLT_DIM;
              return OPACITY_REGULAR;
            })
        });
    */
  },
  zoomToMaxMin: function zoomToMaxMin() {
    if (this.model.marker.axis_x.getZoomedMin() != null && this.model.marker.axis_x.getZoomedMax() != null) {
      this.xScale.domain([this.model.marker.axis_x.getZoomedMin(), this.model.marker.axis_x.getZoomedMax()]);
      this.xAxisEl.call(this.xAxis);
    }

    if (this.model.marker.axis_y.getZoomedMin() != null && this.model.marker.axis_y.getZoomedMax() != null) {
      if ((this.model.marker.axis_y.getZoomedMin() <= 0 || this.model.marker.axis_y.getZoomedMax() <= 0) && this.model.marker.axis_y.scaleType == "log") {
        this.yScale = d3.scaleGenericlog().domain([this.model.marker.axis_y.getZoomedMin(), this.model.marker.axis_y.getZoomedMax()]).range(this.yScale.range());
        this.model.marker.axis_y.scale = d3.scaleGenericlog().domain([this.model.marker.axis_y.getZoomedMin(), this.model.marker.axis_y.getZoomedMax()]).range(this.yScale.range());
        this.yScale = this.model.marker.axis_y.scale;
      } else {
        this.yScale.domain([this.model.marker.axis_y.getZoomedMin(), this.model.marker.axis_y.getZoomedMax()]);
      }
      this.yAxisEl.call(this.yAxis);
    }
  },


  /**
   * Returns key from obj which value from values has the smallest difference with val
   */
  getNearestKey: function getNearestKey(val, obj, values, fn) {
    //const startTime = new Date();
    var KEYS = this.KEYS;
    var keys = Object.keys(obj);

    if (this.someSelected && this.nonSelectedOpacityZero) {
      keys = this.model.marker.select.map(function (keyObj) {
        return utils.getKey(keyObj, KEYS);
      });
    }
    var resKey = keys[0];
    for (var i = 1; i < keys.length; i++) {
      var key = keys[i];

      if (Math.abs((fn ? fn(values[key]) : values[key]) - val) < Math.abs((fn ? fn(values[resKey]) : values[resKey]) - val)) {
        resKey = key;
      }
    }
    //console.log(new Date() - startTime);
    return resKey;
  }
});

exports.default = LCComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<!-- LineChart Component -->\n<div class=\"vzb-linechart\">\n    <svg class=\"vzb-linechart-svg vzb-export\">\n        <g class=\"vzb-lc-graph\">\n\n            <svg class=\"vzb-lc-axis-x\"><g></g></svg>\n            <svg class=\"vzb-lc-axis-y\"><g></g></svg>\n            <text class=\"vzb-lc-axis-x-value\"></text>\n            <text class=\"vzb-lc-axis-y-value\"></text>\n            <svg class=\"vzb-lc-lines-crop\">\n                <svg class=\"vzb-lc-lines\"></svg>\n                <line class=\"vzb-lc-projection-x\"></line>\n                <line class=\"vzb-lc-projection-y\"></line>\n            </svg>\n            <svg class=\"vzb-lc-labels-crop\">\n                <g class=\"vzb-lc-labels\">\n                    <line class=\"vzb-lc-vertical-now\"></line>\n                </g>\n            </svg>\n\n            <g class=\"vzb-lc-axis-y-title\"></g>\n            <g class=\"vzb-lc-axis-x-title\"></g>\n            <g class=\"vzb-lc-axis-y-info\"></g>\n\n            <g class=\"vzb-data-warning vzb-noexport\">\n                <svg></svg>\n                <text></text>\n            </g>\n\n\n            <!--filter id=\"vzb-lc-filter-dropshadow\"> \n              <feOffset result=\"offOut\" in=\"SourceGraphic\" dx=\"0\" dy=\"2\" />\n              <feColorMatrix result = \"matrixOut\" in = \"offOut\" type = \"matrix\"\n                             values = \"0.3 .0 .0 .0 .0\n                                       .0 .3 .0 .0 .0\n                                       .0 .0 .3 .0 .0\n                                       1.0 1.0 1.0 1.0 .0\"/>\n              <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"0.8\" />\n              <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\" />\n            </filter-->\n\n        </g>\n        <rect class=\"vzb-lc-forecastoverlay vzb-hidden\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#vzb-lc-pattern-lines)\" pointer-events='none'></rect>\n    </svg>\n    <div class=\"vzb-tooltip vzb-hidden\"></div>\n    <svg>\n      <defs>\n          <pattern id=\"vzb-lc-pattern-lines\" x=\"0\" y=\"0\" patternUnits=\"userSpaceOnUse\" width=\"50\" height=\"50\" viewBox=\"0 0 10 10\"> \n              <path d='M-1,1 l2,-2M0,10 l10,-10M9,11 l2,-2' stroke='black' stroke-width='3' opacity='0.08'/>\n          </pattern> \n      </defs>\n    </svg>\n</div>\n";

/***/ })
/******/ ]);
//# sourceMappingURL=linechart.js.map