import {Injectable} from '@angular/core';

const defaultModel = {
  BubbleChart: {
    state: {
      entities: {
        dim: 'geo'
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
        label: {
          use: 'property',
          which: 'name'
        },
        axis_y: {
          use: 'indicator',
          which: 'life_expectancy_years'
        },
        axis_x: {
          use: 'indicator',
          which: 'income_per_person_gdppercapita_ppp_inflation_adjusted'
        },
        size: {
          use: 'indicator',
          which: 'population_total'
        }
      },
      marker_minimap: {
        space: ['entities_minimap'],
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
  public originalModel: any;
  public originalModelString: string;
  public isReadOnly;

  constructor(name: string, url: string, model: any, isReadOnly = false) {
    this.name = name;
    this.url = url;
    this.model = model;
    this.isReadOnly = isReadOnly;
    this.originalModelString = JSON.stringify(model, null, '\t');
    this.originalModel = JSON.parse(this.originalModelString);
  }

  changeModel(model) {
    this.model = model;
    this.originalModelString = JSON.stringify(model, null, '\t');
    this.originalModel = JSON.parse(this.originalModelString);
  }

  clone(name): Preset {
    const preset = new Preset(name, null, JSON.parse(this.originalModelString));

    return preset;
  }

  toObject(): any {
    const name = this.name;
    const url = this.url;
    const model = this.model;
    const isReadOnly = this.isReadOnly;

    return {name, url, model, isReadOnly};
  }
}

@Injectable()
export class PresetService {
  private items: Array<Preset>;

  constructor() {
    this.items = [
      new Preset('Default', null, defaultModel, true),
      new Preset('Alternative', null, alternativeModel, true)
    ];
  }

  isPresetNameUnique(presetToAdd: Preset): boolean {
    return this.items
        .filter(preset => preset.name === presetToAdd.name)
        .length === 0;
  }

  addPreset(preset: Preset) {
    if (this.isPresetNameUnique(preset)) {
      this.items.push(preset);

      return preset;
    }

    return null;
  }

  getItems(): Array<Preset> {
    return this.items;
  }

  getContent(): string {
    return JSON.stringify(this.items.map(item => item.toObject()));
  }

  setContent(content: string): boolean {
    let result = true;

    try {
      const contentObj = JSON.parse(content);

      this.items = contentObj
        .map(record =>
          new Preset(record.name, record.url, record.model, record.isReadOnly));
    } catch (e) {
      result = false;
    }

    return result;
  }
}
