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

var VERSION_INFO = { version: "2.3.1", build: 1547630490980 };

//BAR CHART TOOL
var BubbleMap = Vizabi.Tool.extend("BubbleMap", {

  /**
   * Initializes the tool (Bar Chart Tool).
   * Executed once before any template is rendered.
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init: function init(placeholder, external_model) {

    this.name = "bubblemap";

    //specifying components
    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.marker", "locale", "ui", "data"] //pass models to component
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
        hook_lat: {
          use: "property",
          "autoconfig": {
            index: 0,
            type: "measure"
          },
          _important: true
        },
        hook_lng: {
          use: "property",
          "autoconfig": {
            index: 1,
            type: "measure"
          },
          _important: true
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
      map: {
        path: null,
        colorGeo: false,
        preserveAspectRatio: true,
        scale: 0.95,
        offset: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        projection: "robinson",
        topology: {
          path: null,
          objects: {
            geo: "land",
            boundaries: "countries"
          },
          geoIdProperty: null
        }
      },
      chart: {
        superhighlightOnMinimapHover: true,
        labels: {
          dragging: true
        }
      },
      datawarning: {
        doubtDomain: [],
        doubtRange: []
      },
      "buttons": ["colors", "find", "size", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"],
      "dialogs": {
        "popup": ["colors", "find", "size", "moreoptions"],
        "sidebar": ["colors", "find", "size"],
        "moreoptions": ["opacity", "speed", "size", "colors", "presentation", "technical", "about"]
      },
      presentation: false
    }
  },

  versionInfo: VERSION_INFO
});

exports.default = BubbleMap;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Vizabi = Vizabi,
    globals = _Vizabi._globals,
    utils = _Vizabi.utils,
    Component = _Vizabi.Component,
    _Vizabi$helpers = _Vizabi.helpers,
    Labels = _Vizabi$helpers.labels,
    topojson = _Vizabi$helpers.topojson,
    d3GeoProjection = _Vizabi$helpers["d3.geoProjection"],
    DynamicBackground = _Vizabi$helpers["d3.dynamicBackground"],
    _Vizabi$iconset = _Vizabi.iconset,
    iconWarn = _Vizabi$iconset.warn,
    iconQuestion = _Vizabi$iconset.question;

// BUBBLE MAP CHART COMPONENT

var BubbleMapComponent = Component.extend("bubblemap", {
  /**
   * Initializes the component (Bubble Map Chart).
   * Executed once before any template is rendered.
   * @param {Object} config The config passed to the component
   * @param {Object} context The component's parent
   */
  init: function init(config, context) {
    var _this2 = this;

    this.name = "bubblemap";
    this.template = __webpack_require__(4);
    this.bubblesDrawing = null;

    this.isMobile = utils.isMobileOrTablet();

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
    }, {
      name: "data",
      type: "data"
    }];

    var _this = this;
    this.model_binds = {
      "change:time.value": function changeTimeValue(evt) {
        if (!_this._readyOnce) return;
        _this.model.marker.getFrame(_this.model.time.value, _this.frameChanged.bind(_this));
      },
      "change:marker.highlight": function changeMarkerHighlight(evt) {
        if (!_this._readyOnce) return;
        _this.highlightMarkers();
        _this.updateOpacity();
      },
      "change:marker": function changeMarker(evt, path) {
        // bubble size change is processed separately
        if (!_this._readyOnce) return;

        if (path.indexOf("scaleType") > -1) {
          _this.ready();
        }
      },
      "change:ui.chart.showForecastOverlay": function changeUiChartShowForecastOverlay(evt) {
        if (!_this._readyOnce) return;
        _this._updateForecastOverlay();
      },
      "change:marker.size.extent": function changeMarkerSizeExtent(evt, path) {
        //console.log("EVENT change:marker:size:max");
        if (!_this._readyOnce || !_this.entityBubbles) return;
        _this.updateMarkerSizeLimits();
        _this.redrawDataPoints(null, false);
      },
      "change:marker.color.palette": function changeMarkerColorPalette(evt, path) {
        if (!_this._readyOnce) return;
        _this.redrawDataPoints(null, false);
      },
      "change:marker.select": function changeMarkerSelect(evt) {
        if (!_this._readyOnce) return;
        _this.selectMarkers();
        _this.redrawDataPoints(null, false);
        _this.updateOpacity();
        _this.updateDoubtOpacity();
      },
      "change:marker.opacitySelectDim": function changeMarkerOpacitySelectDim(evt) {
        _this.updateOpacity();
      },
      "change:marker.opacityRegular": function changeMarkerOpacityRegular(evt) {
        _this.updateOpacity();
      },
      "change:marker.superHighlight": function changeMarkerSuperHighlight() {
        return _this2._readyOnce && _this2._blinkSuperHighlighted();
      }
    };

    //this._selectlist = new Selectlist(this);

    //contructor is the same as any component
    this._super(config, context);

    this.sScale = null;
    this.cScale = d3.scaleOrdinal(d3.schemeCategory10);

    _this.COLOR_WHITEISH = "#fdfdfd";

    d3GeoProjection();

    this._labels = new Labels(this);
    this._labels.config({
      CSS_PREFIX: "vzb-bmc",
      LABELS_CONTAINER_CLASS: "vzb-bmc-labels",
      LINES_CONTAINER_CLASS: "vzb-bmc-lines",
      SUPPRESS_HIGHLIGHT_DURING_PLAY: false
    });
  },


  /**
   * DOM is ready
   */
  readyOnce: function readyOnce() {

    this.element = d3.select(this.element);

    this.graph = this.element.select(".vzb-bmc-graph");
    this.mapSvg = this.element.select(".vzb-bmc-map-background");

    this.bubbleContainerCrop = this.graph.select(".vzb-bmc-bubbles-crop");
    this.bubbleContainer = this.graph.select(".vzb-bmc-bubbles");
    this.labelListContainer = this.graph.select(".vzb-bmc-bubble-labels");
    this.dataWarningEl = this.graph.select(".vzb-data-warning");

    this.yTitleEl = this.graph.select(".vzb-bmc-axis-y-title");
    this.cTitleEl = this.graph.select(".vzb-bmc-axis-c-title");
    this.yInfoEl = this.graph.select(".vzb-bmc-axis-y-info");
    this.cInfoEl = this.graph.select(".vzb-bmc-axis-c-info");
    this.forecastOverlay = this.element.select(".vzb-bmc-forecastoverlay");

    this.entityBubbles = null;

    // year background
    this.yearEl = this.graph.select(".vzb-bmc-year");
    this.year = new DynamicBackground(this.yearEl);
    this.year.setConditions({ xAlign: "left", yAlign: "bottom" });

    var _this = this;
    this.on("resize", function () {
      //return if updatesize exists with error
      if (_this.updateSize()) return;
      _this.updateMarkerSizeLimits();
      _this._labels.updateSize();
      _this.redrawDataPoints();
      //_this._selectlist.redraw();
    });

    this.initMap();

    this.TIMEDIM = this.model.time.getDimension();
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();
    this.labelNames = this.model.marker.getLabelHookNames();

    this.updateUIStrings();

    this.wScale = d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange);

    this._labels.readyOnce();
  },


  /*
   * Both model and DOM are ready
   */
  ready: function ready() {
    var _this = this;
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.KEY = this.KEYS.join(",");
    this.dataKeys = this.model.marker.getDataKeysPerHook();
    this.labelNames = this.model.marker.getLabelHookNames();

    this.updateUIStrings();
    this.updateIndicators();
    this.updateSize();
    this.updateMarkerSizeLimits();
    this.model.marker.getFrame(this.model.time.value, function (values, time) {
      // TODO: temporary fix for case when after data loading time changed on validation
      if (time.toString() != _this.model.time.value.toString()) {
        utils.defer(function () {
          _this.ready();
        });
        return;
      } // frame is outdated

      if (!values) return;
      _this.values = values;
      _this.updateEntities();
      _this.updateTime();
      _this._labels.ready();
      _this.redrawDataPoints();
      _this.highlightMarkers();
      _this.selectMarkers();
      //    this._selectlist.redraw();
      _this.updateDoubtOpacity();
      _this.updateOpacity();
    });
  },
  frameChanged: function frameChanged(frame, time) {
    if (time.toString() != this.model.time.value.toString()) return; // frame is outdated
    if (!frame) return;

    this.values = frame;
    this.updateTime();
    this.updateDoubtOpacity();
    this.redrawDataPoints(null, false);
  },
  updateUIStrings: function updateUIStrings() {
    var _this = this;

    this.translator = this.model.locale.getTFunction();
    var conceptPropsS = _this.model.marker.size.getConceptprops();
    var conceptPropsC = _this.model.marker.color.getConceptprops();

    this.strings = {
      title: {
        S: conceptPropsS.name,
        C: conceptPropsC.name
      }
    };

    this.yTitleEl.select("text").text(this.translator("buttons/size") + ": " + this.strings.title.S).on("click", function () {
      _this.parent.findChildByName("gapminder-treemenu").markerID("size").alignX(_this.model.locale.isRTL() ? "right" : "left").alignY("top").updateView().toggle();
    });

    this.cTitleEl.select("text").text(this.translator("buttons/color") + ": " + this.strings.title.C).on("click", function () {
      _this.parent.findChildByName("gapminder-treemenu").markerID("color").alignX(_this.model.locale.isRTL() ? "right" : "left").alignY("top").updateView().toggle();
    });

    utils.setIcon(this.dataWarningEl, iconWarn).select("svg").attr("width", "0px").attr("height", "0px");
    this.dataWarningEl.append("text").attr("text-anchor", "end").text(this.translator("hints/dataWarning"));

    this.dataWarningEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datawarning").toggle();
    }).on("mouseover", function () {
      _this.updateDoubtOpacity(1);
    }).on("mouseout", function () {
      _this.updateDoubtOpacity();
    });

    this.yInfoEl.html(iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsS.description || conceptPropsS.sourceLink)));

    //TODO: move away from UI strings, maybe to ready or ready once
    this.yInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.yInfoEl.on("mouseover", function () {
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("size").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.yInfoEl.on("mouseout", function () {
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });

    this.cInfoEl.html(iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsC.description || conceptPropsC.sourceLink)));

    //TODO: move away from UI strings, maybe to ready or ready once
    this.cInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.cInfoEl.on("mouseover", function () {
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("color").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.cInfoEl.on("mouseout", function () {
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });
  },


  // show size number on title when hovered on a bubble
  updateTitleNumbers: function updateTitleNumbers() {
    var _this = this;

    var mobile = void 0; // if is mobile device and only one bubble is selected, update the ytitle for the bubble
    if (_this.isMobile && _this.model.marker.select && _this.model.marker.select.length === 1) {
      mobile = _this.model.marker.select[0];
    }

    if (_this.hovered || mobile) {
      var conceptPropsS = _this.model.marker.size.getConceptprops();
      var conceptPropsC = _this.model.marker.color.getConceptprops();

      var hovered = _this.hovered || mobile;
      var formatterS = _this.model.marker.size.getTickFormatter();
      var formatterC = _this.model.marker.color.getTickFormatter();

      var unitS = conceptPropsS.unit || "";
      var unitC = conceptPropsC.unit || "";

      var valueS = _this.values.size[utils.getKey(hovered, this.dataKeys.size)];
      var valueC = _this.values.color[utils.getKey(hovered, this.dataKeys.color)];

      //resolve value for color from the color legend model
      if (_this.model.marker.color.isDiscrete() && valueC) {
        valueC = this.model.marker.color.getColorlegendMarker().label.getItems()[valueC] || "";
      }

      _this.yTitleEl.select("text").text(_this.translator("buttons/size") + ": " + formatterS(valueS) + " " + unitS);

      _this.cTitleEl.select("text").text(_this.translator("buttons/color") + ": " + (valueC || valueC === 0 ? formatterC(valueC) + " " + unitC : _this.translator("hints/nodata")));

      this.yInfoEl.classed("vzb-hidden", true);
      this.cInfoEl.classed("vzb-hidden", true);
    } else {
      this.yTitleEl.select("text").text(this.translator("buttons/size") + ": " + this.strings.title.S);
      this.cTitleEl.select("text").text(this.translator("buttons/color") + ": " + this.strings.title.C);

      this.yInfoEl.classed("vzb-hidden", false);
      this.cInfoEl.classed("vzb-hidden",  false || this.cTitleEl.classed("vzb-hidden"));
    }
  },
  updateDoubtOpacity: function updateDoubtOpacity(opacity) {
    if (opacity == null) opacity = this.wScale(+this.time.getUTCFullYear().toString());
    if (this.someSelected) opacity = 1;
    this.dataWarningEl.style("opacity", opacity);
  },
  updateOpacity: function updateOpacity() {
    var _this = this;
    /*
     this.entityBubbles.classed("vzb-selected", function (d) {
     return _this.model.marker.isSelected(d);
     });
     */

    var OPACITY_HIGHLT = 1.0;
    var OPACITY_HIGHLT_DIM = 0.3;
    var OPACITY_SELECT = 1.0;
    var OPACITY_REGULAR = this.model.marker.opacityRegular;
    var OPACITY_SELECT_DIM = this.model.marker.opacitySelectDim;

    this.entityBubbles.style("opacity", function (d) {

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

    this.entityBubbles.classed("vzb-selected", function (d) {
      return _this.model.marker.isSelected(d);
    });

    var nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;

    // when pointer events need update...
    if (nonSelectedOpacityZero !== this.nonSelectedOpacityZero) {
      this.entityBubbles.style("pointer-events", function (d) {
        return !_this.someSelected || !nonSelectedOpacityZero || _this.model.marker.isSelected(d) ? "visible" : "none";
      });
    }

    this.nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
  },


  /**
   * Changes labels for indicators
   */
  updateIndicators: function updateIndicators() {
    this.sScale = this.model.marker.size.getScale();
    this.cScale = this.model.marker.color.getScale();
  },


  /**
   * Updates entities
   */
  updateEntities: function updateEntities() {

    var _this = this;
    var KEYS = this.KEYS;
    var KEY = this.KEY;
    var TIMEDIM = this.TIMEDIM;

    var getKeys = function getKeys(prefix) {
      prefix = prefix || "";
      return _this.model.marker.getKeys().map(function (d) {
        var pointer = Object.assign({}, d);
        //pointer[KEY] = d[KEY];
        pointer[TIMEDIM] = endTime;
        pointer.sortValue = _this.values.size[utils.getKey(d, _this.dataKeys.size)] || 0;
        pointer[KEY] = prefix + utils.getKey(d, KEYS);
        return pointer;
      }).sort(function (a, b) {
        return b.sortValue - a.sortValue;
      });
    };

    // get array of GEOs, sorted by the size hook
    // that makes larger bubbles go behind the smaller ones
    var endTime = this.model.time.end;
    this.model.marker.setVisible(getKeys.call(this));

    //unselecting bubbles with no data is used for the scenario when
    //some bubbles are selected and user would switch indicator.
    //bubbles would disappear but selection would stay
    if (!this.model.time.splash) {
      this.unselectBubblesWithNoData();
    }

    // TODO: add to csv
    //Africa 9.1021° N, 18.2812°E
    //Europe 53.0000° N, 9.0000° E
    //Asia 49.8380° N, 105.8203° E
    //north American 48.1667° N and longitude 100.1667° W
    /*
     var pos = {
     "afr": {lat: 9.1, lng: 18.3},
     "eur": {lat: 53.0, lng: 9.0},
     "asi": {lat: 49.8, lng: 105.8},
     "ame": {lat: 48.2, lng: -100.2},
     };
     */

    this.entityBubbles = this.bubbleContainer.selectAll(".vzb-bmc-bubble").data(this.model.marker.getVisible(), function (d) {
      return d[KEY];
    }).order();

    //exit selection
    this.entityBubbles.exit().remove();

    //enter selection -- init circles
    this.entityBubbles = this.entityBubbles.enter().append("circle").attr("class", "vzb-bmc-bubble").on("mouseover", function (d, i) {
      if (utils.isTouchDevice()) return;
      _this._interact()._mouseover(d, i);
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
    }).onLongTap(function (d, i) {}).merge(this.entityBubbles);
  },
  unselectBubblesWithNoData: function unselectBubblesWithNoData(frame) {
    var _this = this;
    if (!frame) frame = this.values;

    if (!frame || !frame.size) return;

    this.model.marker.select.forEach(function (d) {
      var valueS = frame.size[utils.getKey(d, _this.dataKeys.size)];
      if (!valueS && valueS !== 0) _this.model.marker.selectMarker(d);
    });
  },
  redrawDataPoints: function redrawDataPoints(duration, reposition) {
    var _this = this;
    if (!duration) duration = this.duration;
    if (!reposition) reposition = true;
    if (!this.entityBubbles) return utils.warn("redrawDataPoints(): no entityBubbles defined. likely a premature call, fix it!");
    var dataKeys = this.dataKeys;
    var values = this.values;

    this.entityBubbles.each(function (d, index) {
      var view = d3.select(this);
      var geo = d3.select("#" + d[_this.KEY]);

      var valueX = values.hook_lng[utils.getKey(d, dataKeys.hook_lng)];
      var valueY = values.hook_lat[utils.getKey(d, dataKeys.hook_lat)];
      var valueS = values.size[utils.getKey(d, dataKeys.size)];
      var valueC = values.color[utils.getKey(d, dataKeys.color)];
      var valueL = values.label[utils.getKey(d, dataKeys.label)];

      d.hidden_1 = d.hidden;
      d.hidden = !valueS && valueS !== 0 || valueX == null || valueY == null;
      var showhide = d.hidden !== d.hidden_1;

      if (d.hidden) {
        if (showhide) {
          if (duration) {
            view.transition().duration(duration).ease(d3.easeLinear).style("opacity", 0).on("end", function () {
              return view.classed("vzb-hidden", d.hidden).style("opacity", _this.model.marker.opacityRegular);
            });
          } else {
            view.classed("vzb-hidden", d.hidden);
          }
        }
        _this._updateLabel(d, index, 0, 0, valueS, valueC, valueL, duration);
      } else {

        d.r = utils.areaToRadius(_this.sScale(valueS || 0));
        d.label = valueL;

        view.attr("fill", valueC != null ? _this.cScale(valueC) : _this.COLOR_WHITEISH);

        if (_this.model.ui.map.colorGeo) geo.style("fill", valueC != null ? _this.cScale(valueC) : "#999");

        if (reposition) {
          d.cLoc = _this.skew(_this.projection([valueX || 0, valueY || 0]));

          view.attr("cx", d.cLoc[0]).attr("cy", d.cLoc[1]);
        }

        if (duration) {
          if (showhide) {
            var opacity = view.style("opacity");
            view.classed("vzb-hidden", d.hidden);
            view.style("opacity", 0).attr("r", d.r).transition().duration(duration).ease(d3.easeExp).style("opacity", opacity);
          } else {
            view.transition().duration(duration).ease(d3.easeLinear).attr("r", d.r);
          }
        } else {
          view.interrupt().attr("r", d.r).transition();

          if (showhide) view.classed("vzb-hidden", d.hidden);
        }

        _this._updateLabel(d, index, d.cLoc[0], d.cLoc[1], valueS, valueC, d.label, duration);
      }
    });
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
    this.year.setText(this.model.time.formatDate(this.time), this.duration);
    this._updateForecastOverlay();

    //possibly update the exact value in size title
    this.updateTitleNumbers();
  },
  _updateForecastOverlay: function _updateForecastOverlay() {
    this.forecastOverlay.classed("vzb-hidden", this.model.time.value <= this.model.time.endBeforeForecast || !this.model.time.endBeforeForecast || !this.model.ui.chart.showForecastOverlay);
  },
  fitSizeOfTitles: function fitSizeOfTitles() {
    // reset font sizes first to make the measurement consistent
    var yTitleText = this.yTitleEl.select("text");
    yTitleText.style("font-size", null);

    var cTitleText = this.cTitleEl.select("text");
    cTitleText.style("font-size", null);

    var yTitleBB = yTitleText.node().getBBox();
    var cTitleBB = this.cTitleEl.classed("vzb-hidden") ? yTitleBB : cTitleText.node().getBBox();

    var font = Math.max(parseInt(yTitleText.style("font-size")), parseInt(cTitleText.style("font-size"))) * this.width / Math.max(yTitleBB.width, cTitleBB.width);

    if (Math.max(yTitleBB.width, cTitleBB.width) > this.width) {
      yTitleText.style("font-size", font + "px");
      cTitleText.style("font-size", font + "px");
    } else {

      // Else - reset the font size to default so it won't get stuck
      yTitleText.style("font-size", null);
      cTitleText.style("font-size", null);
    }
  },
  initMap: function initMap() {
    var _this3 = this;

    if (!this.topology) utils.warn("bubble map afterPreload: missing country shapes " + this.topology);

    // http://bl.ocks.org/mbostock/d4021aa4dccfd65edffd patterson
    // http://bl.ocks.org/mbostock/3710566 robinson
    // map background

    //stage

    this.projection = d3["geo" + utils.capitalize(this.model.ui.map.projection)]();

    this.mapPath = d3.geoPath().projection(this.projection);

    this.mapGraph = this.element.select(".vzb-bmc-map-graph");
    this.mapGraph.html("");

    this.mapFeature = topojson.feature(this.topology, this.topology.objects[this.model.ui.map.topology.objects.geo]);
    var boundaries = topojson.mesh(this.topology, this.topology.objects[this.model.ui.map.topology.objects.boundaries], function (a, b) {
      return a !== b;
    });

    // project to bounding box https://bl.ocks.org/mbostock/4707858
    this.projection.scale(1).translate([0, 0]);

    this.mapBounds = this.mapPath.bounds(this.mapFeature);

    if (this.mapFeature.features) {
      this.mapGraph.selectAll(".land").data(this.mapFeature.features).enter().insert("path").attr("d", this.mapPath).attr("id", function (d) {
        return d.properties[_this3.model.ui.map.topology.geoIdProperty].toLowerCase();
      }).attr("class", "land");
    } else {
      this.mapGraph.insert("path").datum(this.mapFeature).attr("class", "land");
    }

    this.mapGraph.insert("path").datum(boundaries).attr("class", "boundary");
  },


  profiles: {
    small: {
      margin: { top: 10, right: 10, left: 10, bottom: 0 },
      infoElHeight: 16,
      minRadiusPx: 0.5,
      maxRadiusEm: 0.05
    },
    medium: {
      margin: { top: 20, right: 20, left: 20, bottom: 30 },
      infoElHeight: 20,
      minRadiusPx: 1,
      maxRadiusEm: 0.05
    },
    large: {
      margin: { top: 30, right: 30, left: 30, bottom: 35 },
      infoElHeight: 22,
      minRadiusPx: 1,
      maxRadiusEm: 0.05
    }
  },

  presentationProfileChanges: {
    medium: {
      infoElHeight: 26
    },
    large: {
      infoElHeight: 32
    }
  },

  /**
   * Executes everytime the container or vizabi is resized
   * Ideally,it contains only operations related to size
   */
  updateSize: function updateSize() {

    this.activeProfile = this.getActiveProfile(this.profiles, this.presentationProfileChanges);

    var containerWH = this.root.getVizWidthHeight();
    this.activeProfile.maxRadiusPx = Math.max(this.activeProfile.minRadiusPx, this.activeProfile.maxRadiusEm * utils.hypotenuse(containerWH.width, containerWH.height));

    var margin = this.activeProfile.margin;

    this.height = parseInt(this.element.style("height"), 10) - margin.top - margin.bottom || 0;
    this.width = parseInt(this.element.style("width"), 10) - margin.left - margin.right || 0;

    if (this.height <= 0 || this.width <= 0) {
      this.height = 0;
      this.width = 0;
      utils.warn("Bubble map chart updateSize(): vizabi container is too little or has display:none");
    }

    this.repositionElements();
    this.rescaleMap();
  },
  repositionElements: function repositionElements() {

    var margin = this.activeProfile.margin;
    var infoElHeight = this.activeProfile.infoElHeight;
    var isRTL = this.model.locale.isRTL();

    this.graph.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.year.setConditions({
      widthRatio: 2 / 10
    });
    this.year.resize(this.width, this.height);

    this.yTitleEl.style("font-size", infoElHeight).attr("transform", "translate(" + (isRTL ? this.width : 0) + "," + margin.top + ")");

    var yTitleBB = this.yTitleEl.select("text").node().getBBox();

    //hide the second line about color in large profile or when color is constant
    this.cTitleEl.attr("transform", "translate(" + (isRTL ? this.width : 0) + "," + (margin.top + yTitleBB.height) + ")").classed("vzb-hidden", this.getLayoutProfile() === "large" || this.model.marker.color.use == "constant");

    var warnBB = this.dataWarningEl.select("text").node().getBBox();
    this.dataWarningEl.select("svg").attr("width", warnBB.height * 0.75).attr("height", warnBB.height * 0.75).attr("x", -warnBB.width - warnBB.height * 1.2).attr("y", -warnBB.height * 0.65);

    this.dataWarningEl.attr("transform", "translate(" + this.width + "," + (this.height - warnBB.height * 0.5) + ")").select("text");

    if (this.yInfoEl.select("svg").node()) {
      var titleBBox = this.yTitleEl.node().getBBox();
      var t = utils.transform(this.yTitleEl.node());
      var hTranslate = isRTL ? titleBBox.x + t.translateX - infoElHeight * 1.4 : titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4;

      this.yInfoEl.select("svg").attr("width", infoElHeight).attr("height", infoElHeight);
      this.yInfoEl.attr("transform", "translate(" + hTranslate + "," + (t.translateY - infoElHeight * 0.8) + ")");
    }

    this.cInfoEl.classed("vzb-hidden", this.cTitleEl.classed("vzb-hidden"));

    if (!this.cInfoEl.classed("vzb-hidden") && this.cInfoEl.select("svg").node()) {
      var _titleBBox = this.cTitleEl.node().getBBox();
      var _t = utils.transform(this.cTitleEl.node());
      var _hTranslate = isRTL ? _titleBBox.x + _t.translateX - infoElHeight * 1.4 : _titleBBox.x + _t.translateX + _titleBBox.width + infoElHeight * 0.4;

      this.cInfoEl.select("svg").attr("width", infoElHeight).attr("height", infoElHeight);
      this.cInfoEl.attr("transform", "translate(" + _hTranslate + "," + (_t.translateY - infoElHeight * 0.8) + ")");
    }
  },
  rescaleMap: function rescaleMap() {

    var offset = this.model.ui.map.offset;
    var margin = this.activeProfile.margin;

    // scale to aspect ratio
    // http://bl.ocks.org/mbostock/4707858
    var s = this.model.ui.map.scale / Math.max((this.mapBounds[1][0] - this.mapBounds[0][0]) / this.width, (this.mapBounds[1][1] - this.mapBounds[0][1]) / this.height);

    // dimensions of the map itself (regardless of cropping)
    var mapWidth = s * (this.mapBounds[1][0] - this.mapBounds[0][0]);
    var mapHeight = s * (this.mapBounds[1][1] - this.mapBounds[0][1]);

    // dimensions of the viewport in which the map is shown (can be bigger or smaller than map)
    var viewPortHeight = mapHeight * (1 + offset.top + offset.bottom);
    var viewPortWidth = mapWidth * (1 + offset.left + offset.right);
    var mapTopOffset = mapHeight * offset.top;
    var mapLeftOffset = mapWidth * offset.left;

    // translate projection to the middle of map
    var t = [(mapWidth - s * (this.mapBounds[1][0] + this.mapBounds[0][0])) / 2, (mapHeight - s * (this.mapBounds[1][1] + this.mapBounds[0][1])) / 2];

    this.projection.scale(s).translate(t);

    this.mapGraph.selectAll("path").attr("d", this.mapPath);

    // handle scale to fit case
    var widthScale = void 0,
        heightScale = void 0;
    if (!this.model.ui.map.preserveAspectRatio) {

      // wrap viewBox around viewport so map scales to fit viewport
      var viewBoxHeight = viewPortHeight;
      var viewBoxWidth = viewPortWidth;

      // viewport is complete area (apart from scaling)
      viewPortHeight = this.height * this.model.ui.map.scale;
      viewPortWidth = this.width * this.model.ui.map.scale;

      this.mapSvg.attr("preserveAspectRatio", "none").attr("viewBox", [0, 0, viewBoxWidth, viewBoxHeight].join(" "));

      //            ratio between map, viewport and offset (for bubbles)
      widthScale = viewPortWidth / (mapWidth || 1) / (1 + offset.left + offset.right);
      heightScale = viewPortHeight / (mapHeight || 1) / (1 + offset.top + offset.bottom);
    } else {

      // no scaling needed
      widthScale = 1;
      heightScale = 1;
    }

    // internal offset against parent container (mapSvg)
    this.mapGraph.attr("transform", "translate(" + mapLeftOffset + "," + mapTopOffset + ")");

    // resize and put in center
    this.mapSvg.style("transform", "translate3d(" + (margin.left + (this.width - viewPortWidth) / 2) + "px," + (margin.top + (this.height - viewPortHeight) / 2) + "px,0)").attr("width", viewPortWidth).attr("height", viewPortHeight);

    // set skew function used for bubbles in chart
    var _this = this;
    this.skew = function () {
      var w = _this.width;
      var h = _this.height;
      //input pixel loc after projection, return pixel loc after skew;
      return function (points) {
        //      input       scale         translate                    translate offset
        var x = points[0] * widthScale + (w - viewPortWidth) / 2 + mapLeftOffset * widthScale;
        var y = points[1] * heightScale + (h - viewPortHeight) / 2 + mapTopOffset * heightScale;
        return [x, y];
      };
    }();
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
  _interact: function _interact() {
    var _this = this;

    return {
      _mouseover: function _mouseover(d, i) {
        if (_this.model.time.dragging) return;

        _this.model.marker.highlightMarker(d);

        _this.hovered = d;
        //put the exact value in the size title
        _this.updateTitleNumbers();
        _this.fitSizeOfTitles();

        if (_this.model.marker.isSelected(d)) {
          // if selected, not show hover tooltip
          _this._setTooltip();
        } else {
          //position tooltip
          _this._setTooltip(d);
        }
      },
      _mouseout: function _mouseout(d, i) {
        if (_this.model.time.dragging) return;
        _this._setTooltip();
        _this.hovered = null;
        _this.updateTitleNumbers();
        _this.fitSizeOfTitles();
        _this.model.marker.clearHighlighted();
      },
      _click: function _click(d, i) {
        _this.model.marker.selectMarker(d);
      }
    };
  },
  _blinkSuperHighlighted: function _blinkSuperHighlighted() {
    var _this4 = this;

    this.entityBubbles.classed("vzb-super-highlighted", function (d) {
      return _this4.model.marker.isSuperHighlighted(d);
    });
  },
  highlightMarkers: function highlightMarkers() {
    var _this = this;
    this.someHighlighted = this.model.marker.highlight.length > 0;

    if (utils.isTouchDevice()) {
      if (this.someHighlighted) {
        _this.hovered = this.model.marker.highlight[0];
      } else {
        _this.hovered = null;
      }
      _this.updateTitleNumbers();
      _this.fitSizeOfTitles();
    }

    //      if (!this.selectList || !this.someSelected) return;
    //      this.selectList.classed("vzb-highlight", function (d) {
    //          return _this.model.entities.isHighlighted(d);
    //      });
    //      this.selectList.each(function (d, i) {
    //        d3.select(this).selectAll(".vzb-bmc-label-x")
    //          .classed("vzb-invisible", function(n) {
    //            return !_this.model.entities.isHighlighted(d);
    //          });
    //
    //      });
  },
  _updateLabel: function _updateLabel(d, index, valueX, valueY, valueS, valueC, valueL, duration) {
    var _this = this;
    var KEY = this.KEY;
    if (d[KEY] == _this.druging) return;
    if (duration == null) duration = _this.duration;

    // only for selected entities
    if (_this.model.marker.isSelected(d)) {

      var showhide = d.hidden !== d.hidden_1;
      var valueLST = null;
      var cache = {};
      cache.labelX0 = valueX / this.width;
      cache.labelY0 = valueY / this.height;
      cache.scaledS0 = valueS ? utils.areaToRadius(_this.sScale(valueS)) : null;
      cache.scaledC0 = valueC != null ? _this.cScale(valueC) : _this.COLOR_WHITEISH;
      var labelText = this._getLabelText(this.values, this.labelNames, d);

      this._labels.updateLabel(d, index, cache, valueX / this.width, valueY / this.height, valueS, valueC, labelText, valueLST, duration, showhide);
    }
  },
  selectMarkers: function selectMarkers() {
    var _this = this;
    var KEY = this.KEY;
    this.someSelected = this.model.marker.select.length > 0;

    //      this._selectlist.rebuild();
    if (utils.isTouchDevice()) {
      _this._labels.showCloseCross(null, false);
      if (_this.someHighlighted) {
        _this.model.marker.clearHighlighted();
      } else {
        _this.updateTitleNumbers();
        _this.fitSizeOfTitles();
      }
    } else {
      // hide recent hover tooltip
      if (!_this.hovered || _this.model.marker.isSelected(_this.hovered)) {
        _this._setTooltip();
      }
    }

    this.nonSelectedOpacityZero = false;
  },
  _getLabelText: function _getLabelText(values, labelNames, d) {
    return this.KEYS.map(function (key) {
      return values[labelNames[key]] ? values[labelNames[key]][d[key]] : d[key];
    }).join(", ");
  },
  _setTooltip: function _setTooltip(d) {
    if (d) {
      var KEY = this.KEY;
      var values = this.values;
      var labelValues = {};
      var tooltipCache = {};
      var mouse = d3.mouse(this.graph.node()).map(function (d) {
        return parseInt(d);
      });
      var x = d.cLoc[0] || mouse[0];
      var y = d.cLoc[1] || mouse[1];
      var offset = d.r || 0;

      labelValues.valueS = values.size[utils.getKey(d, this.dataKeys.size)];
      labelValues.labelText = this._getLabelText(values, this.labelNames, d);
      tooltipCache.labelX0 = labelValues.valueX = x / this.width;
      tooltipCache.labelY0 = labelValues.valueY = y / this.height;
      tooltipCache.scaledS0 = offset;
      tooltipCache.scaledC0 = null;

      this._labels.setTooltip(d, labelValues.labelText, tooltipCache, labelValues);
    } else {
      this._labels.setTooltip();
    }
  },
  preload: function preload() {
    var _this5 = this;

    var _this = this;

    //this component shall fetch the preload geoshape information from a file
    var loadFromFile = function loadFromFile(assetName, onSuccess) {
      _this.model.data.getAsset(assetName, function (response) {
        _this.topology = response;
        onSuccess();
      });
    };

    //where the path to preload geoshape can be defined either directly in config:
    var topoPath = utils.getProp(this, ["model", "ui", "map", "topology", "path"]);

    //or via an entity property in dataset:
    var topoWhich = utils.getProp(this, ["model", "ui", "map", "topology", "which"]);
    var topoKey = utils.getProp(this, ["model", "ui", "map", "topology", "key"]);

    return new Promise(function (resolve, reject) {

      // priority 1: direct URL to the topojson file
      if (topoPath) {
        loadFromFile(topoPath, resolve);

        // priority 2: getting URL to the topojson file via DDF request
      } else if (topoWhich) {
        var KEY = _this5.model.marker._getFirstDimension({ exceptType: "time" });

        //build a query to the reader to fetch preload info
        var query = {
          language: _this5.model.locale.id,
          from: "entities",
          select: {
            key: [KEY],
            value: [topoWhich]
          },
          where: {
            $and: [_defineProperty({}, KEY, "$" + KEY)]
          },
          join: _defineProperty({}, "$" + KEY, { key: KEY, where: _defineProperty({}, KEY, { $in: [topoKey || "world"] }) })
        };

        var dataPromise = _this5.model.data.load(query, _defineProperty({}, topoWhich, function (d) {
          return d;
        }));

        dataPromise.then(function (dataId) {
          loadFromFile(_this.model.data.getData(dataId)[0][topoWhich], resolve);
        }, function (err) {
          return utils.warn("Problem with Preload query: ", err, JSON.stringify(query));
        });

        // priority 3: no clues provided, go for a hardcoded filename for a world map
      } else {
        loadFromFile("assets/world-50m.json", resolve);
      }
    });
  }
});

exports.default = BubbleMapComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<!-- Bubble Map Chart Component -->\n<div class=\"vzb-bubblemap\">\n    <svg class=\"vzb-bmc-map-background vzb-export\">\n        <g class=\"vzb-bmc-map-graph\"></g>\n    </svg>\n    <svg class=\"vzb-bubblemap-svg vzb-export\">\n        <g class=\"vzb-bmc-graph\">\n            <g class=\"vzb-bmc-year\"></g>\n\n            <g class=\"vzb-bmc-lines\"></g>\n            <g class=\"vzb-bmc-bubbles\"></g>\n            <g class=\"vzb-bmc-bubble-labels\"></g>\n\n\n            <g class=\"vzb-bmc-axis-y-title\">\n                <text></text>\n            </g>\n\n            <g class=\"vzb-bmc-axis-c-title\">\n                <text></text>\n            </g>\n\n            <g class=\"vzb-bmc-axis-y-info vzb-noexport\">\n            </g>\n\n            <g class=\"vzb-bmc-axis-c-info vzb-noexport\">\n            </g>\n\n            <g class=\"vzb-data-warning vzb-noexport\">\n                <svg></svg>\n                <text></text>\n            </g>\n            <g class=\"vzb-bmc-labels\"></g>\n        </g>\n        <rect class=\"vzb-bmc-forecastoverlay vzb-hidden\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#vzb-bmc-pattern-lines)\" pointer-events='none'></rect>\n    </svg>\n    <svg>\n        <defs>\n            <pattern id=\"vzb-bmc-pattern-lines\" x=\"0\" y=\"0\" patternUnits=\"userSpaceOnUse\" width=\"50\" height=\"50\" viewBox=\"0 0 10 10\"> \n                <path d='M-1,1 l2,-2M0,10 l10,-10M9,11 l2,-2' stroke='black' stroke-width='3' opacity='0.08'/>\n            </pattern> \n        </defs>\n    </svg>\n</div>\n";

/***/ })
/******/ ]);
//# sourceMappingURL=bubblemap.js.map