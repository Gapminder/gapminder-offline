export const mainQueryTemplate = {
  BubbleChart: {
    state: {
      time: {
        start: '', //
          end: '', //
          value: '', //
          step: 1
      },
      entities: {
        dim: 'geo',
          show: {'geo.is--country': true}
      },
      marker: {
        space: ['entities', 'time'],
          type: 'geometry',
          shape: 'circle',
          label: {use: 'property', which: 'geo.name'},
        size_label: {'use': 'constant'},
        axis_y: {
          use: 'indicator',
            which: '', //
            scaleType: 'linear',
            allow: {scales: ['linear', 'log']}
        },
        axis_x: {
          use: 'indicator',
            which: '', //
            scaleType: 'log',
            allow: {'scales': ['linear', 'log', 'time']}
        },
        color: {
          use: 'property',
            palette: {
            asia: [
              '#ff5872',
              '#ff5178',
              '#ff658a',
              '#da0025',
              '#fa4e73',
              '#b2043a'
            ],
              europe: [
              '#ffe700',
              '#fbdd00',
              '#fff400',
              '#fbaf09',
              '#ffe700',
              '#b17f4a'
            ],
              americas: [
              '#7feb00',
              '#5de200',
              '#81f201',
              '#00b900',
              '#b5ea32',
              '#008d36'
            ],
              africa: [
              '#00d5e9',
              '#00c8ec',
              '#00e1ec',
              '#0098df',
              '#77dff7',
              '#0586c6'
            ],
              _default: [
              '#ffb600',
              '#ffaa14',
              '#ffc500',
              '#fb6d19',
              '#ffb600',
              '#9b4838'
            ]
          },
          which: 'geo.world_4region', //
            scaleType: 'ordinal',
            allow: {names: ['!geo.name']}
        },
        size: {
          use: 'indicator',
            which: '', //
            scaleType: 'linear',
            allow: {scales: ['linear']},
          extent: [0.04, 0.9]
        }
      }
    },
    data: {
      reader: 'ddf1-csv-ext',
        splash: false
    },
    language: {id: 'en', strings: {}},
    ui: {
      buttons: ['colors', 'find', 'size', 'trails', 'lock', 'moreoptions', 'fullscreen'],
        buttons_expand: [],
        dialogs: {
        popup: ['colors', 'find', 'size', 'zoom', 'moreoptions'],
          sidebar: ['colors', 'find', 'size', 'zoom'],
          moreoptions: ['opacity', 'speed', 'axes', 'size', 'colors', 'label', 'zoom', 'presentation', 'about']
      },
      chart: {
        whenHovering: {
          showProjectionLineX: true,
            showProjectionLineY: true,
            higlightValueX: true,
            higlightValueY: true
        },
        labels: {dragging: true, removeLabelBox: false},
        trails: true,
          lockNonSelected: 0,
          adaptMinMaxZoom: false
      },
      presentation: false,
        cursorMode: 'arrow',
        noZoomOnScrolling: true
    }
  },
  MountainChart: {
    state: {
      time: {
        start: '', //
          end: '', //
          value: '', //
          step: 1,
          delay: 100,
          delayThresholdX2: 50,
          delayThresholdX4: 25,
          formatInput: '%Y',
          xLogStops: [1, 2, 5],
          yMaxMethod: 'latest',
          probeX: 1.85,
          tailFatX: 1.85,
          tailCutX: .2,
          tailFade: .7,
          xScaleFactor: 1.039781626,
          //0.9971005335,
          xScaleShift: -1.127066411,
          //-1.056221322,
          xPoints: 50
      },
      entities: {
        dim: 'geo',
          show: {'geo.is--country': true}
      },
      marker: {
        space: ['entities', 'time'],
          label: {
          use: 'property',
            which: 'geo.name'
        },
        axis_y: {
          use: 'indicator',
            //which: 'population',
            which: '', //
            scaleType: 'linear'
        },
        axis_x: {
          use: 'indicator',
            //which: 'gdp_p_cap_const_ppp2011_dollar',
            which: '', //
            scaleType: 'log'
        },
        size: {
          use: 'indicator',
            // which: 'gini',
            which: '', //
            scaleType: 'linear'
        },
        color: {
          use: 'property',
            palette: {
            asia: [
              '#ff5872',
              '#ff5178',
              '#ff658a',
              '#da0025',
              '#fa4e73',
              '#b2043a'
            ],
              europe: [
              '#ffe700',
              '#fbdd00',
              '#fff400',
              '#fbaf09',
              '#ffe700',
              '#b17f4a'
            ],
              americas: [
              '#7feb00',
              '#5de200',
              '#81f201',
              '#00b900',
              '#b5ea32',
              '#008d36'
            ],
              africa: [
              '#00d5e9',
              '#00c8ec',
              '#00e1ec',
              '#0098df',
              '#77dff7',
              '#0586c6'
            ],
              _default: [
              '#ffb600',
              '#ffaa14',
              '#ffc500',
              '#fb6d19',
              '#ffb600',
              '#9b4838'
            ]
          },
          which: 'geo.world_4region',
            scaleType: 'ordinal',
            allow: {
            names: ['!geo.name']
          }
        },
        stack: {
          use: 'constant',
            which: 'all' // set a property of data or values 'all' or 'none'
        },
        group: {
          use: 'property',
            which: 'geo.world4_region', // set a property of data
            manualSorting: ['asia', 'africa', 'americas', 'europe'],
            merge: false
        }
      }
    },
    language: {id: 'en', strings: {}},
    data: {
      reader: 'ddf1-csv-ext',
        splash: false
    },
    ui: {
      buttons: [],
        dialogs: {popup: [], sidebar: [], moreoptions: []},
      presentation: false
    }
  },
  BubbleMap: {
    state: {
      time: {
        start: '', //
          end: '', //
          value: '', //
          step: 1,
          speed: 300,
          formatInput: '%Y'
      },
      entities: {
        dim: 'geo',
          opacitySelectDim: .3,
          opacityRegular: 1,
          show: {'geo.is--country': true}
      },
      marker: {
        space: ['entities', 'time'],
          label: {
          use: 'property',
            which: 'geo.name'
        },
        size: {
          use: 'indicator',
            which: '', //
            scaleType: 'linear',
            allow: {
            scales: ['linear', 'log']
          },
          min: .04,
            max: .90
        },
        lat: {
          use: 'property',
            which: 'geo.latitude'
        },
        lng: {
          use: 'property',
            which: 'geo.longitude'
        },
        color: {
          use: 'property',
            palette: {
            asia: [
              '#ff5872',
              '#ff5178',
              '#ff658a',
              '#da0025',
              '#fa4e73',
              '#b2043a'
            ],
              europe: [
              '#ffe700',
              '#fbdd00',
              '#fff400',
              '#fbaf09',
              '#ffe700',
              '#b17f4a'
            ],
              americas: [
              '#7feb00',
              '#5de200',
              '#81f201',
              '#00b900',
              '#b5ea32',
              '#008d36'
            ],
              africa: [
              '#00d5e9',
              '#00c8ec',
              '#00e1ec',
              '#0098df',
              '#77dff7',
              '#0586c6'
            ],
              _default: [
              '#ffb600',
              '#ffaa14',
              '#ffc500',
              '#fb6d19',
              '#ffb600',
              '#9b4838'
            ]
          },
          which: 'geo.world_4region',
            scaleType: 'ordinal',
            allow: {
            names: ['!geo.name']
          }
        }
      }
    },
    language: {id: 'en', strings: {}},
    data: {
      reader: 'ddf1-csv-ext',
        splash: false
    },
    ui: {
      buttons: [],
        dialogs: {popup: [], sidebar: [], moreoptions: []},
      presentation: false
    }
  }
};
