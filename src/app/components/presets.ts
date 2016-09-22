const defaultModel = {
  BubbleChart: {
    state: {
      entities: {
        dim: 'geo',
        show: {
          'is--country': true
        }
      },
      entities_minimap: {
        dim: 'geo',
        show: {
          'is--world_4region': true
        }
      },
      entities_tags: {
        dim: 'tag'
      },
      marker: {
        space: ['entities', 'time'],
        type: 'geometry',
        shape: 'circle',
        label: {
          use: 'property',
          which: 'name'
        },
        size_label: {
          use: 'constant',
          which: '_default',
          scaleType: 'ordinal',
          _important: false,
          extent: [0, 0.33]
        },

        axis_y: {
          use: 'indicator',
          //which: 'sg_child_mortality_rate_per1000', //systema globalis
          which: 'life_expectancy_years',
          scaleType: 'linear',
          zoomedMin: 19,
          domainMax: 85,
          domainMin: 0,
          allow: {
            scales: ['linear', 'log', 'time']
          }
        },
        axis_x: {
          use: 'indicator',
          //which: 'sg_gdp_p_cap_const_ppp2011_dollar',//systema globalis
          which: 'income_per_person_gdppercapita_ppp_inflation_adjusted',
          scaleType: 'log',
          domainMax: 150000,
          domainMin: 300,
          allow: {
            scales: ['linear', 'log', 'time']
          }
        },
        color: {
          use: 'property',
          which: 'world_4region',
          scaleType: 'ordinal',
          allow: {
            names: ['!name']
          }
        },
        size: {
          use: 'indicator',
          //which: 'sg_population',//systema globalis
          which: 'population_total',
          scaleType: 'linear',
          allow: {
            scales: ['linear']
          },
          extent: [0, 0.85]
        }
      },
      marker_minimap: {
        space: ['entities_minimap'],
        type: 'geometry',
        shape: 'svg',
        label: {
          use: 'property',
          which: 'name'
        },
        geoshape: {
          use: 'property',
          which: 'shape_lores_svg'
        }
      },
      marker_tags: {
        space: ['entities_tags'],
        label: {
          use: 'property',
          which: 'name'
        },
        parent: {
          use: 'property',
          which: 'parent'
        }
      }
    },
    data: {
      reader: 'ddf1-csv-ext',
      splash: false
    },
    language: {id: 'en', strings: {}},
    ui: {
      buttons: ['colors', 'find', 'size', 'trails', 'lock', 'moreoptions', 'fullscreen', 'presentation'],
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
        labels: {
          dragging: true,
          removeLabelBox: false
        },
        trails: true,
        lockNonSelected: 0
      },
      presentation: false,
      cursorMode: 'arrow',
      zoomOnScrolling: false,
      adaptMinMaxZoom: false
    }
  }
};

const alternativeModel: any = {
  BubbleChart: {
    state: {
      entities: {
        dim: 'geo',
        show: {
          'is--city': true
        }
      },
      entities_minimap: {
        dim: 'geo',
        show: {
          'is--country': true
        }
      },
      entities_tags: {
        dim: 'tag'
      },
      marker: {
        space: ['entities', 'time'],
        type: 'geometry',
        shape: 'circle',
        label: {
          use: 'property',
          which: 'name'
        },
        size_label: {
          use: 'constant',
          which: '_default',
          scaleType: 'ordinal',
          _important: false,
          extent: [0, 0.33]
        },

        axis_y: {
          use: 'indicator',
          //which: 'sg_child_mortality_rate_per1000', //systema globalis
          which: 'total_fertility_rate',
          scaleType: 'linear',
          allow: {
            scales: ['linear', 'log', 'time']
          }
        },
        axis_x: {
          use: 'indicator',
          //which: 'sg_gdp_p_cap_const_ppp2011_dollar',//systema globalis
          which: 'median_household_income_ppp_us_constant_prices',
          scaleType: 'log',
          allow: {
            scales: ['linear', 'log', 'time']
          }
        },
        color: {
          use: 'property',
          which: 'country',
          scaleType: 'ordinal',
          allow: {
            names: ['!name']
          }
        },
        size: {
          use: 'indicator',
          //which: 'sg_population',//systema globalis
          which: 'population_income_group_constant_ppp_gt10kppp',
          scaleType: 'linear',
          allow: {
            scales: ['linear']
          },
          extent: [0, 0.85]
        }
      },
      marker_minimap: {
        space: ['entities_minimap'],
        type: 'geometry',
        shape: 'svg',
        label: {
          use: 'property',
          which: 'name'
        },
        geoshape: {
          use: 'property',
          which: 'shape_lores_svg'
        }
      },
      marker_tags: {
        space: ['entities_tags'],
        label: {
          use: 'property',
          which: 'name'
        },
        parent: {
          use: 'property',
          which: 'parent'
        }
      }
    },
    data: {
      reader: 'ddf1-csv-ext',
      splash: false
    },
    language: {id: 'en', strings: {}},
    ui: {
      buttons: ['colors', 'find', 'size', 'trails', 'lock', 'moreoptions', 'fullscreen', 'presentation'],
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
        labels: {
          dragging: true,
          removeLabelBox: false
        },
        trails: true,
        lockNonSelected: 0
      },
      presentation: false,
      cursorMode: 'arrow',
      zoomOnScrolling: false,
      adaptMinMaxZoom: false
    },
  }
};

export class Preset {
  public name: string;
  public url: string;
  public model: any;

  constructor(name: string, url: string, model: any) {
    this.name = name;
    this.url = url;
    this.model = model;
  }
}

export class Presets {
  public items: Array<Preset>;

  constructor() {
    this.items = [
      new Preset('Default', null, defaultModel),
      new Preset('Alternative', null, alternativeModel)
    ];
  }
}
