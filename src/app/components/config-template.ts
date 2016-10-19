const configTemplate: any = {
  BubbleChart: {
    state: {
      time: {
        dim: '#timeDim#'
      },
      entities: {
        dim: '#domain#'
      },
      entities_minimap: {
        dim: '#domain#',
        show: {
          'is--#entityMinimap#': true
        }
      },
      entities_tags: {
        dim: 'tag'
      },
      marker: {
        space: ['entities', 'time'],
        label: {
          use: 'property',
          which: '#nameProperty#'
        },
        axis_y: {
          use: 'indicator',
          which: '#yAxis#'
        },
        axis_x: {
          use: 'indicator',
          which: '#xAxis#'
        },
        size: {
          use: 'indicator',
          which: '#size#'
        }
      },
      marker_minimap: {
        space: ['entities_minimap'],
        label: {
          use: 'property',
          which: '#nameProperty#'
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

export default configTemplate;
