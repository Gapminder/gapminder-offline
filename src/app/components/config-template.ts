const configTemplate: any = {
  BubbleChart: {
    state: {
      entities: {
        dim: '#domain#',
        show: {
          'is--#entity#': true
        }
      },
      entities_colorlegend: {
        opacityRegular: 0.8,
        opacityHighlightDim: 0.3,
        dim: 'world_4region'
      },
      entities_tags: {
        dim: 'tag'
      },
      time: {
        dim: 'time'
      },
      marker: {
        space: ['entities', 'time'],
        label: {
          use: 'property',
          which: '#nameProperty#'
        },
        axis_y: {
          use: 'indicator',
          which: '#yAxis#',
        },
        axis_x: {
          use: 'indicator',
          scaleType: 'log',
          which: '#xAxis#'
        },
        size: {
          use: 'indicator',
          which: '#size#',
          scaleType: 'linear',
          allow: {
            scales: ['linear']
          }
        },
        color: {
          use: 'property',
          which: 'world_4region',
          syncModels: ['marker_colorlegend']
        }
      },
      marker_colorlegend: {
        space: ['entities_colorlegend'],
        label: {
          use: 'property',
          which: '#nameProperty#'
        },
        hook_rank: {
          use: 'property',
          which: 'rank'
        },
        hook_geoshape: {
          use: 'property',
          which: 'shape_lores_svg'
        }
      },
      marker_tags: {
        space: ['entities_tags'],
        label: {
          use: 'property',
          which: '#nameProperty#'
        },
        hook_parent: {
          use: 'property',
          which: 'parent'
        }
      }
    },
    data: {
      reader: 'ddf1-csv-ext',
      splash: true
    },
    locale: {
      id: 'en',
      filePath: './preview-data/translation/'
    },
    ui: {
      datawarning: {
        doubtDomain: [1800, 1950, 2015],
        doubtRange: [1.0, 0.3, 0.2]
      },
      buttons: ['colors', 'find', 'size', 'trails', 'lock', 'moreoptions', 'fullscreen', 'presentation'],
      dialogs: {
        popup: ['colors', 'find', 'size', 'zoom', 'moreoptions'],
        sidebar: ['colors', 'find', 'size', 'zoom'],
        moreoptions: ['opacity', 'speed', 'axes', 'size', 'colors', 'label', 'zoom', 'presentation', 'about']
      }
    }
  }
};

export default configTemplate;
