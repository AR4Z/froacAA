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

    this.button = document.getElementById('accessibilityBarButton')
    this.collapse = document.getElementById(this.button.getAttribute('href').replace('#', ''))
    this.collapseInstance = new Collapse(this.button)
    this.tabs = {}
    this.tabsCollection = {}
    this.carouselCustomInterfazElm = null
    this.carouselNarratorElm = null
    this.carouselCustomInterfaz = {}
    this.carouselNarrator = {}

    this.narrator
    this.customInterfaz
    this.lscTranslator
    this.virtualKeyboard
    this.structuralNavigation
    this.screenReader
    this.voiceBrowser = new VoiceBrowser()
    this.voiceBrowser.start()
  }

  fetchDataAccessibilityBar() {
    if (this.loggedIn) {
      return fetch(`${ this.url }usuario/get_data_accessibility_bar`)
        .then(r => r.json())
        .catch(err => console.error(err))
    } else {
      return new Promise((resolve, reject) => {
        resolve({
          data_custom_interfaz: {
            color_cursor: localStorage.getItem('color_cursor') || 'rgb(255,18,18)',
            contrast_colors_id: parseInt(localStorage.getItem('contrast_colors_id')) || 1,
            cursor_size_id: parseInt(localStorage.getItem('cursor_size_id')) || 1,
            cursor_url: localStorage.getItem('cursor_url') || 'auto',
            font_size: parseInt(localStorage.getItem('font_size')) || 12,
            font_type_id: parseInt(localStorage.getItem('font_type_id')) || 1,
            invert_color_general: localStorage.getItem('invert_color_general') || 'f',
            invert_color_image: localStorage.getItem('invert_color_image') || 'f',
            size_line_spacing: parseFloat(localStorage.getItem('size_line_spacing')) || 1.5,
            trail_cursor_color: localStorage.getItem('trail_cursor_color') || 'rgb(255,18,18)',
            trail_cursor_size_id: parseInt(localStorage.getItem('trail_cursor_size_id')) || 1,
            custom_colors: {
              foreground_colour: localStorage.getItem('foreground_colour') || "rgb(0,0,0)",
              background_colour: localStorage.getItem('background_colour') || "rgb(255,255,255)",
              highlight_colour: localStorage.getItem('highlight_colour') || "rgb(211,211,211)",
              link_colour: localStorage.getItem('link_colour') || "rgb(255,255,0)"
            }
          },

          data_narrator: {
            speed_reading: parseInt(localStorage.getItem('speed_reading_nr')) || 2,
            pitch_nr: parseInt(localStorage.getItem('pitch_nr')) || 2,
            volume_id: parseInt(localStorage.getItem('volume_id_nr')) || 2,
            voice_gender_id: parseInt(localStorage.getItem('voice_gender_id_nr')) || 1,
            links_id: parseInt(localStorage.getItem('links_id_nr')) || 1,
            highlight_id: parseInt(localStorage.getItem('highlight_id_nr')) || 1,
            reading_unit_id: parseInt(localStorage.getItem('reading_unit_id_nr')) || 1
          },

          data_screen_reader: {
            speed_reading_id: parseInt(localStorage.getItem('speed_reading_sr')) || 2,
            pitch_id: parseInt(localStorage.getItem('pitch_id_sr')) || 2,
            volume_id: parseInt(localStorage.getItem('volume_id_sr')) || 2,
            voice_gender_id: parseInt(localStorage.getItem('voice_gender_id_sr')) || 1,
            links_id: parseInt(localStorage.getItem('links_id_sr')) || 2
          },

          data_lsc_translator: {
            sign_speed: parseInt(localStorage.getItem('sign_speed')) || 20,
            model_id: parseInt(localStorage.getItem('model_id')) || 1
          },

          data_structural_nav: {
            nav_strategy_id: parseInt(localStorage.getItem('nav_strategy_id')) || 1,
            showtoc: localStorage.getItem('show_toc') || 'f'
          },

          data_virtual_keyboard: {
            kb_size_id: parseInt(localStorage.getItem('kb_size_id')) || 2,
            play_key_sound: localStorage.getItem('play_key_sound') || 't'
          }
        })
      })
    }
  }

  createAccessibilityElements() {
    if (this.needStructuralNavigation) {
      this.tabs.structuralNav = document.getElementById('structural-navigation-tab')
      this.tabsCollection.structuralNav = new Tab(this.tabs.structuralNav)
      this.structuralNavigation = new StructuralNavigation(this.dataAccessibilityBar.data_structural_nav)
    }

    if (this.needVirtualKeyboard) {
      this.tabs.virtualKeyboard = document.getElementById('keyboard-tab')
      this.tabsCollection.virtualKeyboard = new Tab(this.tabs.virtualKeyboard)
      this.virtualKeyboard = new VirtualKeyboard(this.dataAccessibilityBar.data_virtual_keyboard)
    }

    if (this.needCustomInterfaz) {
      this.tabs.interfaz = document.getElementById('interfaz-tab')
      this.tabsCollection.interfaz = new Tab(this.tabs.interfaz)
      this.carouselCustomInterfazElm = document.getElementById('carouselInterfazCards')
      this.carouselCustomInterfaz = new Carousel(document.getElementById('carouselInterfazCards'), {
        interval: false,
        pause: false,
        keyboard: false
      })
      this.customInterfaz = new CustomInterfaz(this.dataAccessibilityBar.data_custom_interfaz)
    }

    if (this.needNarrator) {
      this.tabs.narrator = document.getElementById('narrator-tab')
      this.tabsCollection.narrator = new Tab(this.tabs.narrator)
      this.carouselNarratorElm = document.getElementById('carouselNarratorCards')
      this.carouselNarrator = new Carousel(document.getElementById('carouselNarratorCards', {
        interval: false,
        pause: false,
        keyboard: false
      }))
      this.narrator = new Narrator(this.dataAccessibilityBar.data_narrator)
    }

    if (this.needLscTranslator) {
      this.tabs.lscTranslator = document.getElementById('LSC-translator-tab')
      this.tabsCollection.lscTranslator = new Tab(this.tabs.lscTranslator)
      this.lscTranslator = new LscTranslator(this.dataAccessibilityBar.data_lsc_translator)
    }

    if (this.needScreenReader) {
      this.tabs.screenReader = document.getElementById('screen-reader-tab')
      this.tabsCollection.screenReader = new Tab(this.tabs.screenReader)
      this.screenReader = new ScreenReader(this.dataAccessibilityBar.data_screen_reader)
    }
  }

  updatePreferencesInterfaz(preferencesInterface) {
    if (this.loggedIn) {
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
    if (this.loggedIn) {
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
    if (this.loggedIn) {
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

  updatePreferencesScreenReader(preferencesScreenReader) {
    if (this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferencesScreenReader: preferencesScreenReader
        })
      }

      fetch(`${ this.url }usuario/update_screen_reader_preferences`, fetchData)
        .then(() => {
          Object.keys(preferencesScreenReader).forEach(key => {
            this.dataAccessibilityBar.data_screen_reader[key] = preferencesScreenReader[key]
          })
        })
    } else {
      Object.keys(preferencesScreenReader).forEach(key => {
        this.dataAccessibilityBar.data_screen_reader[key] = preferencesScreenReader[key]
      })
    }
  }

  updatePreferencesLscTranslator(preferencesLscTranslator) {
    if (this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferencesLscTranslator: preferencesLscTranslator
        })
      }

      fetch(`${ this.url }usuario/update_lsc_translator_preferences`, fetchData)
        .then(() => {
          Object.keys(preferencesLscTranslator).forEach(key => {
            this.dataAccessibilityBar.data_lsc_translator[key] = preferencesLscTranslator[key]
          })
        })
    } else {
      Object.keys(preferencesLscTranslator).forEach(key => {
        this.dataAccessibilityBar.data_lsc_translator[key] = preferencesLscTranslator[key]
      })
    }
  }

  updatePreferencesStructuralNav(preferencesStructuralNav) {
    if (this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferencesStructuralNav: preferencesStructuralNav
        })
      }

      fetch(`${ this.url }usuario/update_structural_nav_preferences`, fetchData)
        .then(() => {
          Object.keys(preferencesStructuralNav).forEach(key => {
            this.dataAccessibilityBar.data_structural_nav[key] = preferencesStructuralNav[key]
          })
        })
    } else {
      Object.keys(preferencesStructuralNav).forEach(key => {
        this.dataAccessibilityBar.data_structural_nav[key] = preferencesStructuralNav[key]
      })
    }
  }

  updatePreferencesKeyboard(preferencesKeyboard) {
    if (this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferencesKeyboard: preferencesKeyboard
        })
      }

      fetch(`${ this.url }usuario/update_keyboard_preferences`, fetchData)
        .then(() => {
          Object.keys(preferencesKeyboard).forEach(key => {
            this.dataAccessibilityBar.data_virtual_keyboard[key] = preferencesKeyboard[key]
          })
        })
    } else {
      Object.keys(preferencesKeyboard).forEach(key => {
        this.dataAccessibilityBar.data_virtual_keyboard[key] = preferencesKeyboard[key]
      })
    }
  }

  updateAllPreferencesToDefault() {
    if (this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch(`${ this.url }usuario/set_all_preferences_to_default`, fetchData)
        .then(() => {
          this.setDataAccessibilityToDefault()
        })
    } else {
      this.setDataAccessibilityToDefault()
    }
  }

  setDataAccessibilityToDefault() {
    if (this.needCustomInterfaz) {
      this.dataAccessibilityBar.data_custom_interfaz = {
        color_cursor: 'rgb(255,18,18)',
        contrast_colors_id: 1,
        cursor_size_id: 1,
        cursor_url: 'auto',
        font_size: 12,
        font_type_id: 1,
        invert_color_general: false,
        invert_color_image: false,
        size_line_spacing: 1.5,
        trail_cursor_color: 'rgb(255,18,18)',
        trail_cursor_size_id: 1,
        custom_colors: {
          foreground_colour: "rgb(0,0,0)",
          background_colour: "rgb(255,255,255)",
          highlight_colour: "rgb(211,211,211)",
          link_colour: "rgb(255,255,0)"
        }
      }
    }

    if (this.needNarrator) {
      this.dataAccessibilityBar.data_narrator = {
        speed_reading: 2,
        pitch_nr: 2,
        volume_id: 2,
        voice_gender_id: 1,
        links_id: 1,
        highlight_id: 1,
        reading_unit_id: 1
      }
    }

    if (this.needScreenReader) {
      this.dataAccessibilityBar.data_screen_reader = {
        speed_reading_id: 2,
        pitch_id: 2,
        volume_id: 2,
        voice_gender_id: 1,
        links_id: 2
      }
    }

    if (this.needLscTranslator) {
      this.dataAccessibilityBar.data_lsc_translator = {
        sign_speed: 20,
        model_id: 1
      }
    }

    if (this.needStructuralNavigation) {
      this.dataAccessibilityBar.data_structural_nav = {
        nav_strategy_id: 1,
        showtoc: false
      }
    }

    if (this.needVirtualKeyboard) {
      this.dataAccessibilityBar.data_virtual_keyboard = {
        kb_size_id: 2,
        play_key_sound: true
      }
    }
  }

  setDefaultAllValues() {
    if (this.customInterfaz) {
      this.customInterfaz.setDefaultValues(true)
    }

    if (this.lscTranslator) {
      this.lscTranslator.setDefaultValues(true)
    }

    if (this.narrator) {
      this.narrator.setDefaultValues(true)
    }

    if (this.screenReader) {
      this.screenReader.setDefaultValues(true)
    }

    if (this.virtualKeyboard) {
      this.virtualKeyboard.setDefaultValues(true)
    }

    if (this.structuralNavigation) {
      this.structuralNavigation.setDefaultValues(true)
    }

    this.updateAllPreferencesToDefault()
  }
}
