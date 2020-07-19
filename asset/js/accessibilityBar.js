/** Class representing Accessibility Bar. */
class AccessibilityBar {
  /**
   * Create Accessibility Bar.
   * @param {boolean} loggedIn - user is logged?
   * @param {string} url - base url froac.
   * @param {boolean} needCustomInterfaz - Need use custom interfaz tool.
   * @param {boolean} needNarrator - Need use narrator tool.
   * @param {boolean} needScreenReader - Need use screen reader tool.
   * @param {boolean} needLscTranslator - Need use lsc translator tool.
   * @param {boolean} needVirtualKeyboard  - Need virtual keyboard tool.
   * @param {boolean} needStructuralNavigation - Need structural navigation tool.
   */
  constructor(loggedIn, url, needCustomInterfaz, needNarrator, needScreenReader, needLscTranslator, needVirtualKeyboard, needStructuralNavigation) {
    this.needCustomInterfaz = needCustomInterfaz
    this.needNarrator = needNarrator
    this.needLscTranslator = needLscTranslator
    this.needVirtualKeyboard = needVirtualKeyboard
    this.needStructuralNavigation = needStructuralNavigation
    this.needScreenReader = needScreenReader
    this.loggedIn = loggedIn
    this.url = url

    /**
     * HtmlElement button that open accessibility bar.
     * @type {HTMLElement}
     */
    this.button = document.getElementById('accessibilityBarButton')
    /**
     * HtmlElement where it's accessibility bar tabs.
     * @type {HTMLElement}
     */
    this.collapse = document.getElementById(this.button.getAttribute('href').replace('#', ''))
    /**
     * Bootstrap Collapse instance.
     * @type {Collapse}
     */
    this.collapseInstance = new Collapse(this.button)
    /**
     * Contains HtmlElements that represent are each of the tabs in the accessibility bar.
     * 
     * For example:
     * {
     *  'myAccessiblityBarFeature': HtmlElementTabOfMyFeature
     *  ...
     * }
     * @type {object}
     */
    this.tabs = {}
    /**
     * Contains Bootstrap Tabs instances that represent are each of the tabs in the accessibility bar.
     * 
     * For example:
     * {
     *  'myAccessiblityBarFeature': new Tab(...)
     *  ...
     * }
     * @type {object}
     */
    this.tabsCollection = {}
    /**
     * HtmlElement that represents carousel of custom interfaz tab.
     * @type {?HTMLElement}
     */
    this.carouselCustomInterfazElm = null
    /**
     * HtmlElement that represents carousel of narrator tab.
     * @type {?HTMLElement}
     */
    this.carouselNarratorElm = null
    /**
     * Bootstrap Carousel instance for custom interfaz.
     * @type {?Carousel}
     */
    this.carouselCustomInterfaz = null
    /**
     * Bootstrap Carousel instance for narrator.
     * @type {?Carousel}
     */
    this.carouselNarrator = null

    /**
     * Narrator object.
     * @type {?Narrator}
     */
    this.narrator = null
    /**
     * Custom interfaz object.
     * @type {?CustomInterfaz}
     */
    this.customInterfaz = null
    /**
     * Lsc translator object.
     * @type {?LscTranslator}
     */
    this.lscTranslator = null
    /**
     * Virtual keyboard object.
     * @type {?VirtualKeyboard}
     */
    this.virtualKeyboard = null
    /**
     * Structural Navigation object.
     * @type {?StructuralNavigation}
     */
    this.structuralNavigation = null
    /**
     * Screen Reader object.
     * @type {?ScreenReader}
     */
    this.screenReader = null
    /**
     * Voice Browser object.
     * @type {?VoiceBrowser}
     */
    this.voiceBrowser = new VoiceBrowser()

    // Voice Browser does not depend of user model, so automatically on.
    this.voiceBrowser.start()

    this.gralProfiles = {
      'visual': {
      },
      'audible': {
      },
      'none' : {}
    }
    this.magnifier = new Magnifier()
  }

  /**
   * Obtain user preferences for accessibility tools or 
   * for a visitor use local storage data or values by default.
   * @public
   * @returns {Promise} Promise object with preferences for accessibility bar tools
   */
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
            letter_spacing: parseFloat(localStorage.getItem('letter_spacing')) || 1.44,
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

  /**
   * Create accessibility tools based in user preferences.
   * @public
   * @returns {void}
   */
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

  /**
   * Updates of the preferences interface in the user model and the dataAccesibilityBar.data_custom_interfaz 
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccessibilityBar.data_custom_interfaz property.
   * @param {object} preferencesInterface - Preferences that have been changed by the user.
   * @public
   * @returns {void}
   */
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
  /**
   * Update the custom colors of the interface in the user model and the dataAccesibilityBar.data_custom_interfaz.custom_colors
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccessibilityBar.data_custom_interfaz.custom_colors property.
   * @param {object} customColors - Colors that have been changed by the user.
   * @public
   * @returns {void}
   */
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

  /**
   * Update the narrator preferences in the user model and the dataAccesibilityBar.data_narrator
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccesibilityBar.data_narrator property.
   * @param {object} preferencesNarrator - Preferences that have been changed by the user.
   * @public
   * @returns {void}
   */
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

  /**
   * Update the screen reader preferences in the user model and the dataAccesibilityBar.data_screen_reader
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccesibilityBar.data_screen_reader property.
   * @param {object} preferencesScreenReader - Preferences that have been changed by the user.
   * @public
   * @returns {void}
   */
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

  /**
   * Update the lsc translator preferences in the user model and the dataAccesibilityBar.data_lsc_translator
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccesibilityBar.data_lsc_translator property.
   * @param {object} preferencesLscTranslator - Preferences that have been changed by the user.
   * @public
   * @returns {void}
   */
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

  /**
   * Update the structural navigation preferences in the user model and the dataAccesibilityBar.data_structural_nav
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccesibilityBar.data_structural_nav property.
   * @param {object} preferencesStructuralNav - Preferences that have been changed by the user.
   * @public
   * @returns {void}
   */
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

  /**
   * Update the virtual keyboard preferences in the user model and the dataAccesibilityBar.data_virtual_keyboard
   * property of the accessibilityBar object, if the user is not logged in 
   * just update the dataAccesibilityBar.data_virtual_keyboard property.
   * @param {object} preferencesKeyboard - Preferences that have been changed by the user.
   * @public
   * @returns {void}
   */
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
  /**
   * Update the values of all the tools in the accessibility bar in the user model and call 
   * setDataAccessibilityToDefault to update the accessibility bar object data to its default values.
   * @private
   * @returns {void}
   */
  _updateAllPreferencesToDefault() {
    if (this.loggedIn) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch(`${ this.url }usuario/set_all_preferences_to_default`, fetchData)
        .then(() => {
          this._setDataAccessibilityToDefault()
        })
    } else {
      this._setDataAccessibilityToDefault()
    }
  }
  /**
   * According to the accessibility bar tools that the user is using, thie method changes his values to his value by defect
   * in the dataAccessibilityBar property of the accessibilityBar object.
   * @private
   * @returns {void}
   */
  _setDataAccessibilityToDefault() {
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

  /**
   * This method is used to update the values of all the accessibility bar tools that the user is using to their default values.
   * @public
   * @returns {void}
   */
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

    this._updateAllPreferencesToDefault()
  }

  open() {
    this.collapseInstance.show();
  }
}
