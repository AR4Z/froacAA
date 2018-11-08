class AccessibilityBar {
  constructor(loggedIn, url, needCustomInterfaz, needNarrator, needScreenReader, needLscTranslator, needVirtualKeyboard, needStructuralNavigation) {
    this.needCustomInterfaz = needCustomInterfaz
    this.needNarrator = needNarrator
    this.needLscTranslator = needLscTranslator
    this.needVirtualKeyboard = needVirtualKeyboard
    this.needStructuralNavigation = needStructuralNavigation
    this.needScreenReader = needScreenReader
    this.loggedIn = loggedIn

    if (this.loggedIn) {
      this._fetchDataAccessibilityBar(url)
        .then(data => {
          this.dataAccessibilityBar = data
          this._createAccessibilityElements()
        }).catch(err => console.error(err))
    } else {
      this.dataAccessibilityBar = {
        data_custom_interfaz: {
          color_cursor: 'rgb(255,18,18)',
          contrast_colors_id: '1',
          cursor_size_id: '1',
          cursor_url: 'auto',
          font_size: '12',
          font_type_id: '1',
          invert_color_general: 'f',
          invert_color_image: 'f',
          size_line_spacing: '1.5',
          trail_cursor_color: 'rgb(255,18,18)',
          trail_cursor_size_id: '1'
        }
      }
      this._createAccessibilityElements()
    }
  }

  _fetchDataAccessibilityBar(url) {
    return fetch(`${ url }usuario/get_data_accessibility_bar`)
      .then(r => r.json())
      .catch(err => console.error(err))
  }

  _createAccessibilityElements() {
    if (this.needCustomInterfaz) {
      this.customInterfaz = new CustomInterfaz(this.dataAccessibilityBar.data_custom_interfaz)
    }

    if (this.needNarrator) {
      this.narrator = {}
    }

    if (this.needLscTranslator) {
      this.lscTranslator = {}
    }

    if (this.needVirtualKeyboard) {
      this.virtualKeyboard = {}
    }

    if (this.needStructuralNavigation) {
      this.structuralNavigation = {}
    }

    if (this.needScreenReader) {
      this.screenReader = {}
    }    
  }
}
