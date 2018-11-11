class AccessibilityBar {
  constructor(loggedIn, url, needCustomInterfaz, needNarrator, needScreenReader, needLscTranslator, needVirtualKeyboard, needStructuralNavigation) {
    this.needCustomInterfaz = needCustomInterfaz
    this.needNarrator = needNarrator
    this.needLscTranslator = needLscTranslator
    this.needVirtualKeyboard = needVirtualKeyboard
    this.needStructuralNavigation = needStructuralNavigation
    this.needScreenReader = needScreenReader
    this.loggedIn = loggedIn
    this.url = url

    if (this.loggedIn) {
      this._fetchDataAccessibilityBar(this.url)
        .then(data => {
          this.dataAccessibilityBar = data
          this._createAccessibilityElements()
        }).catch(err => console.error(err))
    } else {
      this.dataAccessibilityBar = {
        data_custom_interfaz: {
          color_cursor: localStorage.getItem('color_cursor') || 'rgb(255,18,18)',
          contrast_colors_id: localStorage.getItem('contrast_colors_id') || 1,
          cursor_size_id: localStorage.getItem('cursor_size_id') || 1,
          cursor_url: localStorage.getItem('cursor_url') || 'auto',
          font_size: localStorage.getItem('font_size') || 12,
          font_type_id: localStorage.getItem('font_type_id') || 1,
          invert_color_general: localStorage.getItem('invert_color_general') || 'f',
          invert_color_image: localStorage.getItem('invert_color_image') || 'f',
          size_line_spacing: localStorage.getItem('size_line_spacing') || 1.5,
          trail_cursor_color: localStorage.getItem('trail_cursor_color') || 'rgb(255,18,18)',
          trail_cursor_size_id: localStorage.getItem('trail_cursor_size_id') || 1,
          custom_colors: {
            foreground_colour: localStorage.getItem('foreground_colour') || "rgb(0,0,0)",
            background_colour: localStorage.getItem('background_colour') || "rgb(255,255,255)",
            highlight_colour: localStorage.getItem('highlight_colour') || "rgb(211,211,211)",
            link_colour: localStorage.getItem('link_colour') || "rgb(255,255,0)"
          }
        },

        data_narrator: {
          speed_reading: 2,
          pitch_nr: 2,
          volume_id: 2,
          voice_gender_id: 1,
          links_id: 1,
          highlight_id: 1,
          speech_component_id: 1,
          reading_unit_id: 1
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
    if (this.needCustomInterfaz || !this.loggedIn) {
      this.customInterfaz = new CustomInterfaz(this.dataAccessibilityBar.data_custom_interfaz)
    }

    if (this.needNarrator || !this.loggedIn) {
      this.narrator = new Narrator(this.dataAccessibilityBar.data_narrator)
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

  updatePreferencesInterfaz(preferencesInterface) {
    if(this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferencesInterface: preferencesInterface
        })
      }
  
      fetch(`${ this.url }usuario/update_interface_preferences`, fetchData)
      .then(() => {
        Object.keys(preferencesInterface).forEach(key => {
          this.dataAccessibilityBar.data_custom_interfaz[key] = preferencesInterface[key]
        });
      })
      .catch((e) => {
        console.error(e)
      })
    } else {
      Object.keys(preferencesInterface).forEach(key => {
        this.dataAccessibilityBar.data_custom_interfaz[key] = preferencesInterface[key]
      });
    }
    
  }

  updateCustomColors(customColors) {
    if(this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customColors: customColors
        })
      }
  
      fetch(`${ this.url }usuario/update_custom_colors`, fetchData)
      .then(() => {
        Object.keys(customColors).forEach(key => {
          this.dataAccessibilityBar.data_custom_interfaz.custom_colors[key] = customColors[key]
        })
      })
    } else {
      Object.keys(customColors).forEach(key => {
        this.dataAccessibilityBar.data_custom_interfaz.custom_colors[key] = customColors[key]
      })
    }
  }

  updatePreferencesNarrator(preferencesNarrator) {
    if(this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferencesNarrator: preferencesNarrator
        })
      }
  
      fetch(`${ this.url }usuario/update_narrator_preferences`, fetchData)
      .then(() => {
        Object.keys(preferencesNarrator).forEach(key => {
          this.dataAccessibilityBar.data_narrator[key] = preferencesNarrator[key]
        })
      })
    } else {
      Object.keys(preferencesNarrator).forEach(key => {
        this.dataAccessibilityBar.data_narrator[key] = preferencesNarrator[key]
      })
    }
  }
}
