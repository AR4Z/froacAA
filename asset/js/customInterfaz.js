/**
 * @typedef CustomColors
 * @property {string} foregroundColor - Font color
 * @property {string} backgroundColor - Background color
 * @property {string} highlightColor  - Highlight color
 * @property {string} linkColor       - Link color
 */
/** Class representing Custom Interface. */
class CustomInterfaz {
  /**
   * Create Custom Interface.
   * @param {object} preferencesInterfaz 
   */
  constructor(preferencesInterfaz) {
    /** @type {number} */
    this.fontSize = preferencesInterfaz.font_size
    /** @type {number} */
    this.sizeLineSpacing = preferencesInterfaz.size_line_spacing
    /**
     * Id for font type.
     * 1 => Open sans
     * 2 => Serif
     * 3 => Cantarell
     * 4 => Source code PRO
     * @type {number}
     */
    this.fontTypeId = preferencesInterfaz.font_type_id
    /**
     * Id for cursor size.
     * 1 => not change
     * 2 => 16x16 px
     * 3 => 32x32 px
     * 4 => 40x40 px
     * @type {number}
     */
    this.cursorSizeId = preferencesInterfaz.cursor_size_id
    /**
     * Id for cursor trail size.
     * 1 => not use
     * 2 => 12 dots
     * 3 => 24 dots
     * @type {number} 
     */
    this.trailCursorSizeId = preferencesInterfaz.trail_cursor_size_id
    /**
     * Id for contrast colors.
     * 1 => not change
     * 2 => black - white
     * 3 => white - black
     * 4 => black -yellow
     * 5 => yellow - black
     * 6 => gray
     * 7 => custom
     * 8 => reverse-colors
     * @type {number}
     */
    this.contrastColorsId = preferencesInterfaz.contrast_colors_id
    /** @type {string} */
    this.cursorColor = preferencesInterfaz.color_cursor
    /** @type {CustomColors} */
    this.customColors = preferencesInterfaz.custom_colors

    /** @type {string} */
    this.trailCursorColor = preferencesInterfaz.trail_cursor_color
    /** @type {string} */
    this.cursorUrl = preferencesInterfaz.cursor_url
    /** @type {CursorTrail} */
    this.cursorTrail = new CursorTrail(0)
    this.letterSpacing = preferencesInterfaz.letter_spacing
    this.wordSpacing = preferencesInterfaz.word_spacing
    this.limitCharsPerLine = preferencesInterfaz.limit_chars_per_line

    if (idView == 'lo_view') {
      /** @type {LearningObject} */
      this.learningObject = window.learningObject
      /** @type {Document} */
      this.learningObjectDoc = this.learningObject.getDocument()
    } else {
      this.learningObject = null
    }

    this._addEventChangeFontSize()
    this._addEventChangeLetterSpacing()
    this._addEventChangeWordSpacing()
    this._addEventChangeSizeLineSpacing()
    this._addEventChangeFontType()
    this._addEventChangeContrast()
    this._addEventChangeCursorSize()
    this._addEventChangeTrailCursorSize()
    this._addEventChangeLimitCharsPerLine()

    this._setValuesInLocalStorage()
    this._loadCustomInterfaz()
    this.disableTextJustify()
  }

  /**
   * Save preferences user of custom interface in localStorage
   * @private
   * @returns {void}
   */
  _setValuesInLocalStorage() {
    localStorage.setItem('cursor_size_id', this.cursorSizeId)
    localStorage.setItem('color_cursor', this.cursorColor)
    localStorage.setItem('trail_cursor_size_id', this.trailCursorSizeId)
    localStorage.setItem('trail_cursor_color', this.trailCursorColor)
    localStorage.setItem('contrast_colors_id', this.contrastColorsId)
    localStorage.setItem('font_size', this.fontSize)
    localStorage.setItem('letter_spacing', this.letterSpacing)
    localStorage.setItem('word_spacing', this.wordSpacing)
    localStorage.setItem('size_line_spacing', this.sizeLineSpacing)
    localStorage.setItem('font_type_id', this.fontTypeId)
    localStorage.setItem('cursor_url', this.cursorUrl)
    localStorage.setItem('limit_chars_per_line', this.limitCharsPerLine)
  }

  /**
   * It gives a value to each one of the options of the interface and I execute 
   * each one of the functions so that the given value is reflected in the user interface.
   * @private
   * @returns {void}
   */
  _loadCustomInterfaz() {
    document.querySelector(`input[name='fontSize']`).value = parseInt(this.fontSize)
    document.querySelector(`input[name='fontSize']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='letterSpacing']`).value = parseFloat(this.letterSpacing)
    document.querySelector(`input[name='letterSpacing']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='wordSpacing']`).value = parseFloat(this.wordSpacing)
    document.querySelector(`input[name='wordSpacing']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='interlineSpaceSize']`).value = parseFloat(this.sizeLineSpacing)
    document.querySelector(`input[name='interlineSpaceSize']`).dispatchEvent(new Event('change'))

    document.querySelector('input[name="foregroundColor"]').value = this.customColors.foreground_colour
    document.querySelector('input[name="foregroundColor"]').dispatchEvent(new Event('change'))
    document.querySelector('input[name="backgroundColor"]').value = this.customColors.background_colour
    document.querySelector('input[name="backgroundColor"]').dispatchEvent(new Event('change'))
    document.querySelector('input[name="highlightColor"]').value = this.customColors.highlight_colour
    document.querySelector('input[name="highlightColor"]').dispatchEvent(new Event('change'))
    document.querySelector('input[name="linkColor"]').value = this.customColors.link_colour
    document.querySelector('input[name="linkColor"]').dispatchEvent(new Event('change'))
    document.querySelector('input[name="focusColor"]').value = this.customColors.focus_color
    document.querySelector('input[name="focusColor"]').dispatchEvent(new Event('change'))
    document.querySelector('input[name="focusBorderColor"]').value = this.customColors.focus_border_color
    document.querySelector('input[name="focusBorderColor"]').dispatchEvent(new Event('change'))
    document.querySelector('input[name="focusBackgroundColor"]').value = this.customColors.focus_background_color
    document.querySelector('input[name="focusBackgroundColor"]').dispatchEvent(new Event('change'))
    document.querySelector(`input[name='radioOptionscontrast'][value='${this.contrastColorsId}']`).checked = true
    document.querySelector(`input[name='radioOptionscontrast'][value='${this.contrastColorsId}']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='type-font'][value='${this.fontTypeId}']`).checked = true
    document.querySelector(`input[name='type-font'][value='${this.fontTypeId}']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='colorCursorTrails']`).value = this.trailCursorColor
    document.querySelector(`input[name='colorCursorTrails']`).dispatchEvent(new Event('change'))
    document.querySelector(`input[name='radioOptionsSizeCursorTrails'][value='${this.trailCursorSizeId}']`).checked = true
    document.querySelector(`input[name='radioOptionsSizeCursorTrails'][value='${this.trailCursorSizeId}']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='colorMousePointer']`).value = this.cursorColor
    document.querySelector(`input[name='colorMousePointer']`).dispatchEvent(new Event('change'))
    document.querySelector(`input[name='radioOptionsSizeCursor'][value='${this.cursorSizeId}']`).checked = true
    document.querySelector(`input[name='radioOptionsSizeCursor'][value='${this.cursorSizeId}']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='limitCharsPerLine']`).checked = this.limitCharsPerLine == 'true' || this.limitCharsPerLine != 'false' ? true : false
    document.querySelector(`input[name='limitCharsPerLine']`).dispatchEvent(new Event('change'))
  }

  /**
   * Fix each of the options of the interface to its default value.
   * @param {boolean} all - all accessibilityBar tools at their default value?
   * @returns {void}
   */
  setDefaultValues(all) {
    /*
      The default attribute given to each of the elements serves to know, 
      in each of the functions that are responsible for applying 
      the changes to the user interface, if the change is due to the user wants to set the 
      preferences of the interface to its default value this in order to avoid making a request to the server for each of the preferences. 

      At the end of this method a request is made to update all the values to their default 
      value in the user's model and in the data of the object accessibilityBar. 
      In the case that all is true then the accessiblityBar object is responsible for changing all preferences to their default 
      value of all the tools in the accessibility bar.
    */

    document.querySelector(`input[name='fontSize']`).setAttribute('default', true)
    document.querySelector(`input[name='fontSize']`).value = 12
    document.querySelector(`input[name='fontSize']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='letterSpacing']`).setAttribute('default', true)
    document.querySelector(`input[name='letterSpacing']`).value = 12 * 0.12
    document.querySelector(`input[name='letterSpacing']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='wordSpacing']`).setAttribute('default', true)
    document.querySelector(`input[name='wordSpacing']`).value = 12 * 0.16
    document.querySelector(`input[name='wordSpacing']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='interlineSpaceSize']`).setAttribute('default', true)
    document.querySelector(`input[name='interlineSpaceSize']`).value = 1.5
    document.querySelector(`input[name='interlineSpaceSize']`).dispatchEvent(new Event('change'))

    document.querySelector("input[name='radioOptionscontrast']").setAttribute('default', true)
    document.querySelector("input[name='radioOptionscontrast'][value='1']").checked = true
    document.querySelector("input[name='radioOptionscontrast'][value='1']").dispatchEvent(new Event('change'))

    document.querySelector("input[name='type-font']").setAttribute('default', true)
    document.querySelector("input[name='type-font'][value='1']").checked = true
    document.querySelector("input[name='type-font'][value='1']").dispatchEvent(new Event('change'))

    document.querySelector("input[name='radioOptionsSizeCursorTrails']").setAttribute('default', true)
    document.querySelector("input[name='radioOptionsSizeCursorTrails'][value='1']").checked = true
    document.querySelector("input[name='radioOptionsSizeCursorTrails'][value='1']").dispatchEvent(new Event('change'))

    document.querySelector("input[name='radioOptionsSizeCursor']").setAttribute('default', true)
    document.querySelector("input[name='radioOptionsSizeCursor'][value='1']").checked = true
    document.querySelector("input[name='radioOptionsSizeCursor'][value='1']").dispatchEvent(new Event('change'))

    document.querySelector(`input[name='limitCharsPerLine']`).checked = true
    document.querySelector(`input[name='limitCharsPerLine']`).dispatchEvent(new Event('change'))

    if (!all) {
      window.accessibilityBar.updatePreferencesInterfaz({
        color_cursor: 'rgb(255,18,18)',
        contrast_colors_id: 1,
        cursor_size_id: 1,
        cursor_url: 'auto',
        font_size: 12,
        letter_spacing: 12 * 0.12,
        word_spacing: 12 * 0.16,
        font_type_id: 1,
        limit_chars_per_line: 'false',
        invert_color_general: 'false',
        invert_color_image: 'false',
        size_line_spacing: 1.5,
        trail_cursor_color: 'rgb(255,18,18)',
        trail_cursor_size_id: 1
      })
    }
  }

  /**
   * Listen change font size input
   * @private
   * @returns {void}
   */
  _addEventChangeFontSize() {
    let inputFontSize = document.querySelector('input[name="fontSize"]')

    inputFontSize.addEventListener('change', this.changeFontSize.bind(this))
  }

  _addEventChangeLetterSpacing() {
    let inputLetterSpacing = document.querySelector('input[name="letterSpacing"')

    inputLetterSpacing.addEventListener('change', this.changeLetterSpacing.bind(this))
  }

  _addEventChangeWordSpacing() {
    let inputWordSpacing = document.querySelector('input[name="wordSpacing"')

    inputWordSpacing.addEventListener('change', this.changeWordSpacing.bind(this))
  }

  _addEventChangeLimitCharsPerLine() {
    let checkboxLimitCharsPerLine = document.getElementsByName('limitCharsPerLine')[0]

    checkboxLimitCharsPerLine.addEventListener('change', this.changeLimitCharsPerLine.bind(this))
  }

  /**
   * Listen change size line spacing input
   * @private
   * @returns {void}
   */
  _addEventChangeSizeLineSpacing() {
    let inputSizeLineSpacing = document.querySelector('input[name="interlineSpaceSize"]')

    inputSizeLineSpacing.addEventListener('change', this.changeSizeLine.bind(this))
  }

  /**
   * Listen change contrast colors radio buttons
   * @private
   * @returns {void}
   */
  _addEventChangeContrast() {
    let optionsContrast = document.querySelectorAll('input[name="radioOptionscontrast"]')

    Array.prototype.forEach.call(optionsContrast, opt => opt.addEventListener('change', (e) => {
      // decide if show custom colors inputs, 7 is id for use custom colors
      if (parseInt(e.target.value) == 7) {
        this._showCustomContrastColors()
      } else {
        this._hideCustomContrastColors()
      }

      this.changeContrastColors()
    }))
  }

  /**
   * Shows the custom colors inputs and adds events for when those inputs are changed.
   * @private
   * @returns {void}
   */
  _showCustomContrastColors() {
    document.getElementById('div-color-foreground').style.display = 'block'
    document.getElementById('div-color-background').style.display = 'block'
    document.getElementById('div-color-link').style.display = 'block'
    document.getElementById('div-color-highlight').style.display = 'block'
    document.getElementById('div-focus-color').style.display = 'block'
    document.getElementById('div-focus-border-color').style.display = 'block'
    document.getElementById('div-focus-background-color').style.display = 'block'

    this._addEventChangeBackgroundColor()
    this._addEventChangeForegroundColor()
    this._addEventChangeHighlightColor()
    this._addEventChangeLinkColor()
    this._addEventChangeFocusColor()
    this._addEventChangeFocusBorderColor()
    this._addEventChangeFocusBackgroundColor()

    let inputForegroundColor = document.getElementsByName('foregroundColor')[0]
    let inputBackgroundColor = document.getElementsByName('backgroundColor')[0]
    let inputHighlightColor = document.getElementsByName('highlightColor')[0]
    let inputLinkColor = document.getElementsByName('linkColor')[0]
    let inputFocusColor = document.getElementsByName('focusColor')[0]
    let inputFocusBorderColor = document.getElementsByName('focusBorderColor')[0]
    let inputFocusBackgroundColor = document.getElementsByName('focusBackgroundColor')[0]

    inputForegroundColor.value = localStorage.getItem('foreground_color') || '000000'
    inputForegroundColor.dispatchEvent(new Event('change'))

    inputBackgroundColor.value = localStorage.getItem('background_color') || 'FFFFFF'
    inputBackgroundColor.dispatchEvent(new Event('change'))

    inputHighlightColor.value = localStorage.getItem('highlight_color') || 'D3D3D3'
    inputHighlightColor.dispatchEvent(new Event('change'))

    inputLinkColor.value = localStorage.getItem('link_color') || 'FFFF00'
    inputLinkColor.dispatchEvent(new Event('change'))

    inputFocusColor.value = localStorage.getItem('focus_color') || 'FFFF00'
    inputFocusColor.dispatchEvent(new Event('change'))

    inputFocusBorderColor.value = localStorage.getItem('focus_border_color') || 'FFFF00'
    inputFocusBorderColor.dispatchEvent(new Event('change'))

    inputFocusBackgroundColor.value = localStorage.getItem('focus_background_color') || 'FFFFFF'
    inputFocusBackgroundColor.dispatchEvent(new Event('change'))
  }

  /**
   * hide custom colors inputs
   * @private
   * @returns {void}
   */
  _hideCustomContrastColors() {
    document.getElementById('div-color-foreground').style.display = 'none'
    document.getElementById('div-color-background').style.display = 'none'
    document.getElementById('div-color-link').style.display = 'none'
    document.getElementById('div-color-highlight').style.display = 'none'
    document.getElementById('div-focus-color').style.display = 'none'
    document.getElementById('div-focus-border-color').style.display = 'none'
    document.getElementById('div-focus-background-color').style.display = 'none'
  }

  /**
   * Listen change for font type radio buttons
   * @private
   * @returns {void}
   */
  _addEventChangeFontType() {
    let optionsFontType = document.querySelectorAll('input[name="type-font"]')

    Array.prototype.forEach.call(optionsFontType, opt => opt.addEventListener('change', this.changeFontType.bind(this)))
  }

  /**
   * Listen change for cursor size radio buttons and show input cursor color
   * @private
   * @returns {void}
   */
  _addEventChangeCursorSize() {
    let optionsCursorSize = document.querySelectorAll('input[name="radioOptionsSizeCursor"]')

    Array.prototype.forEach.call(optionsCursorSize, opt => opt.addEventListener('change', (e) => {
      let containerColorCursor = document.getElementById('div-color-cursor')

      if (parseInt(e.target.value) != 1) {
        containerColorCursor.style.display = 'block'
        this._addEventChangeColorCursor()
      } else {
        containerColorCursor.style.display = 'none'
      }

      this.changeCursorSize()
    }))
  }

  /**
   * Listen change for cursor color input
   * @private
   * @returns {void}
   */
  _addEventChangeColorCursor() {
    let inputColorCursor = document.getElementsByName('colorMousePointer')[0]

    inputColorCursor.addEventListener('change', this.changeCursorSize.bind(this))
  }

  /**
   * Listen change for cursor trail radio buttons and show cursor trail color input
   * @private
   * @returns {void}
   */
  _addEventChangeTrailCursorSize() {
    let optionsTrailCursorSize = document.querySelectorAll('input[name="radioOptionsSizeCursorTrails"')

    Array.prototype.forEach.call(optionsTrailCursorSize, opt => opt.addEventListener('change', (e) => {
      let containerTrailCursorColor = document.getElementById('div-color-cursor-trails')

      if ((parseInt(e.target.value) != 1)) {
        containerTrailCursorColor.style.display = 'block'

        this._addEventChangeTrailCursorColor()
      } else {
        containerTrailCursorColor.style.display = 'none'
      }

      this.changeCursorTrail()
    }))
  }

  /**
   * Listen change for color of cursor trail input
   * @private
   * @returns {void}
   */
  _addEventChangeTrailCursorColor() {
    let inputColorTrailCursor = document.getElementsByName('colorCursorTrails')[0]

    inputColorTrailCursor.addEventListener('change', this.changeCursorTrail.bind(this))
  }

  /**
   * Listen change for foreground color input
   * @private
   * @returns {void}
   */
  _addEventChangeForegroundColor() {
    let inputForegroundColor = document.getElementsByName('foregroundColor')[0]

    inputForegroundColor.addEventListener('change', this.changeForegroundColor.bind(this))
  }

  /**
   * Listen change for background color input
   * @private
   * @returns {void}
   */
  _addEventChangeBackgroundColor() {
    let inputBakgroundColor = document.getElementsByName('backgroundColor')[0]

    inputBakgroundColor.addEventListener('change', this.changeBackgroundColor.bind(this))
  }

  /**
   * Listen change for link color input
   * @private
   * @returns {void}
   */
  _addEventChangeLinkColor() {
    let inputLinkColor = document.getElementsByName('linkColor')[0]

    inputLinkColor.addEventListener('change', this.changeLinkColor.bind(this))
  }

  /**
   * Listen change for highlight color input
   * @private
   * @returns {void}
   */
  _addEventChangeHighlightColor() {
    let inputHighlightColor = document.getElementsByName('highlightColor')[0]

    inputHighlightColor.addEventListener('change', this.changeHighlightColor.bind(this))
  }

  _addEventChangeFocusColor() {
    let inputFocusColor = document.getElementsByName('focusColor')[0]

    inputFocusColor.addEventListener('change', this.changeFocusColor.bind(this))
  }

  _addEventChangeFocusBorderColor() {
    let inputFocusBorderColor = document.getElementsByName('focusBorderColor')[0]

    inputFocusBorderColor.addEventListener('change', this.changeFocusBorderColor.bind(this))
  }

  _addEventChangeFocusBackgroundColor() {
    let inputFocusBackgroundColor = document.getElementsByName('focusBackgroundColor')[0]

    inputFocusBackgroundColor.addEventListener('change', this.changeFocusBackgroundColor.bind(this))
  }

  /**
   * Apply changes font size in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeFontSize() {
    let inputFontSize = document.getElementsByName('fontSize')[0]
    let html = document.getElementsByTagName('html')[0]
    let isDefault = inputFontSize.default == 'true'

    this.fontSize = parseInt(inputFontSize.value)
    html.style.fontSize = `${this.fontSize}px`

    if (this.learningObject) {
      this.learningObjectDoc.querySelector('html').style.fontSize = `${this.fontSize}px`
    }

    if ((this.fontSize != parseInt(localStorage.getItem('font_size'))) && !isDefault) {
      accessibilityBar.updatePreferencesInterfaz({
        font_size: this.fontSize
      })
    }

    inputFontSize.setAttribute('default', false)

    localStorage.setItem('font_size', this.fontSize)
  }

  changeLetterSpacing() {
    let inputLetterSpacing = document.getElementsByName('letterSpacing')[0]
    let html = document.getElementsByTagName('html')[0]
    let isDefault = inputLetterSpacing.default == 'true'

    this.letterSpacing = parseFloat(inputLetterSpacing.value)
    html.style.letterSpacing = `${this.letterSpacing}px`

    if (this.learningObject) {
      this.learningObjectDoc.querySelector('html').style.letterSpacing = `${this.letterSpacing}px`
    }

    if ((this.letterSpacing != parseFloat(localStorage.getItem('letter_spacing'))) && !isDefault) {
      accessibilityBar.updatePreferencesInterfaz({
        letter_spacing: this.letterSpacing
      })
    }

    inputLetterSpacing.setAttribute('default', false)

    localStorage.setItem('letter_spacing', this.letterSpacing)
  }

  changeWordSpacing() {
    let inputWordSpacing = document.getElementsByName('wordSpacing')[0]
    let html = document.getElementsByTagName('html')[0]
    let isDefault = inputWordSpacing.default == 'true'

    this.wordSpacing = parseFloat(inputWordSpacing.value)
    html.style.wordSpacing = `${this.wordSpacing}px`

    if (this.learningObject) {
      this.learningObjectDoc.querySelector('html').style.wordSpacing = `${this.wordSpacing}px`
    }

    if ((this.wordSpacing != parseFloat(localStorage.getItem('word_spacing'))) && !isDefault) {
      accessibilityBar.updatePreferencesInterfaz({
        word_spacing: this.wordSpacing
      })
    }

    inputWordSpacing.setAttribute('default', false)

    localStorage.setItem('word_spacing', this.wordSpacing)

  }

  /**
   * Apply changes interline size in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeSizeLine() {
    let inputSizeLine = document.getElementsByName("interlineSpaceSize")[0]
    let body = document.getElementsByTagName('body')[0]
    let isDefault = inputSizeLine.default == 'true'

    this.sizeLineSpacing = parseFloat(inputSizeLine.value)
    body.style.lineHeight = `${this.sizeLineSpacing}`

    if (this.learningObject) {
      this.learningObjectDoc.querySelector('body').style.lineHeight = `${this.sizeLineSpacing}`
    }

    if ((this.sizeLineSpacing != parseFloat(localStorage.getItem('size_line_spacing'))) && !isDefault) {
      window.accessibilityBar.updatePreferencesInterfaz({
        size_line_spacing: this.sizeLineSpacing
      })
    }

    inputSizeLine.setAttribute('default', false)

    localStorage.setItem('size_line_spacing', this.sizeLineSpacing)
  }

  /**
   * Apply changes contrast colors in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeContrastColors() {
    let optionContrastSelected = Array.from(document.getElementsByName('radioOptionscontrast')).filter(radioOption => radioOption.checked)[0]
    let optionContrastSelectedValue = parseInt(optionContrastSelected.value)
    let isDefault = optionContrastSelected.default == 'true'
    let classNameContrastOptions = {
      1: 'default',
      2: 'fl-theme-bw',
      3: 'fl-theme-wb',
      4: 'fl-theme-by',
      5: 'fl-theme-yb',
      6: 'fl-theme-lgdg',
      7: 'customized',
      8: 'reverse-colors'
    }


    let classNameContrastSelected = classNameContrastOptions[optionContrastSelectedValue]

    document.querySelector('body').classList.remove(classNameContrastOptions[this.contrastColorsId])
    document.querySelector('body').style.filter = 'invert(0)'
    document.querySelector('body').classList.add(classNameContrastSelected)
    if (classNameContrastSelected === 'reverse-colors') {
      document.querySelector('body').style.filter = 'invert(1)'
    }


    if (this.learningObject) {
      if (!this.learningObjectDoc.getElementById('contrast-styles')) {
        let linkContrastStyles = document.getElementById('contrast-styles').cloneNode()
        this.learningObjectDoc.querySelector('head').appendChild(linkContrastStyles)
      }

      if (this.learningObjectDoc.querySelector('body').classList.contains(classNameContrastOptions[this.contrastColorsId])) {
        this.learningObjectDoc.querySelector('body').classList.remove(classNameContrastOptions[this.contrastColorsId])
      }

      this.learningObjectDoc.querySelector('body').classList.add(classNameContrastSelected)
      if (classNameContrastSelected === 'reverse-colors') {
        this.learningObjectDoc.querySelector('body').style.filter = 'invert(1)'
      }
    }

    this.contrastColorsId = optionContrastSelectedValue
    if ((this.contrastColorsId != parseInt(localStorage.getItem('contrast_colors_id'))) && !isDefault) {
      window.accessibilityBar.updatePreferencesInterfaz({
        contrast_colors_id: this.contrastColorsId
      })
    }

    optionContrastSelected.setAttribute('default', false)

    localStorage.setItem('contrast_colors_id', this.contrastColorsId)
  }

  /**
   * Apply changes foreground color in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeForegroundColor() {
    let inputColor = document.getElementsByName('foregroundColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--foreground-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--foreground-color', `#${color}`)
    }

    this.customColors.foreground_colour = color

    if ((this.customColors.foreground_colour != localStorage.getItem('foreground_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        foreground_colour: this.customColors.foreground_colour
      })
    }



    inputColor.setAttribute('default', false)

    localStorage.setItem('foreground_color', this.customColors.foreground_colour)
  }

  /**
   * Apply changes background color in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeBackgroundColor() {
    let inputColor = document.getElementsByName('backgroundColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--background-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--background-color', `#${color}`)
    }

    this.customColors.background_colour = color

    if ((this.customColors.background_colour != localStorage.getItem('background_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        background_colour: this.customColors.background_colour
      })
    }

    inputColor.setAttribute('default', false)

    localStorage.setItem('background_color', this.customColors.background_colour)
  }

  /**
   * Apply changes link color in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeLinkColor() {
    let inputColor = document.getElementsByName('linkColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--link-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--link-color', `#${color}`)
    }

    this.customColors.link_colour = color

    if ((this.customColors.link_colour != localStorage.getItem('link_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        link_colour: this.customColors.link_colour
      })
    }

    inputColor.setAttribute('default', false)

    localStorage.setItem('link_color', this.customColors.link_colour)
  }

  /**
   * Apply changes highlight color in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeHighlightColor() {
    let inputColor = document.getElementsByName('highlightColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--highlight-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--highlight-color', `#${color}`)
    }

    this.customColors.highlight_colour = color

    if ((this.customColors.highlight_colour != localStorage.getItem('highlight_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        highlight_colour: this.customColors.highlight_colour
      })
    }

    inputColor.setAttribute('default', false)

    localStorage.setItem('highlight_color', color)
  }

  changeFocusColor() {
    let inputColor = document.getElementsByName('focusColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--focus-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--focus-color', `#${color}`)
    }

    this.customColors.focus_color = color

    if ((this.customColors.focus_color != localStorage.getItem('focus_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        focus_color: this.customColors.focus_color
      })
    }

    inputColor.setAttribute('default', false)

    localStorage.setItem('focus_color', color)
  }

  changeFocusBorderColor() {
    let inputColor = document.getElementsByName('focusBorderColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--focus-border-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--focus-border-color', `#${color}`)
    }

    this.customColors.focus_border_color = color

    if ((this.customColors.focus_border_color != localStorage.getItem('focus_border_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        focus_border_color: this.customColors.focus_border_color
      })
    }

    inputColor.setAttribute('default', false)

    localStorage.setItem('focus_border_color', color)
  }

  changeFocusBackgroundColor() {
    let inputColor = document.getElementsByName('focusBackgroundColor')[0]
    let color = inputColor.value
    let isDefault = inputColor.default == 'true'
    document.documentElement.style.setProperty('--focus-background-color', `#${color}`)
    if (this.learningObject) {
      this.learningObjectDoc.documentElement.style.setProperty('--focus-background-color', `#${color}`)
    }

    this.customColors.focus_background_color = color

    if ((this.customColors.focus_background_color != localStorage.getItem('focus_background_color')) && !isDefault) {
      window.accessibilityBar.updateCustomColors({
        focus_background_color: this.customColors.focus_background_color
      })
    }

    inputColor.setAttribute('default', false)

    localStorage.setItem('focus_background_color', color)
  }

  /**
   * Apply changes font type in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeFontType() {
    let optionSelectedElm = Array.from(document.getElementsByName('type-font')).filter(radioOption => radioOption.checked)[0]
    let optionFontSelected = parseInt(optionSelectedElm.value)
    let isDefault = optionSelectedElm.default == 'true'
    this.fontTypeId = optionFontSelected
    let validFonts = {
      1: "'Open Sans', sans-serif",
      2: "'PT Serif', serif",
      3: "'Cantarell', sans-serif",
      4: "'Source Code Pro', monospace"
    }

    let idFonts = {
      2: 'serif',
      3: 'cantarell',
      4: 'source-code-pro',
    }

    let body = document.querySelector('body')
    body.style.fontFamily = validFonts[optionFontSelected]
    if (this.learningObject) {
      if (!this.learningObjectDoc.getElementById(idFonts[optionFontSelected]) && optionFontSelected != 1) {
        let linkFont = document.getElementById(idFonts[optionFontSelected]).cloneNode()
        this.learningObjectDoc.querySelector('head').appendChild(linkFont)
      }

      this.learningObjectDoc.querySelector('body').style.fontFamily = validFonts[optionFontSelected]
    }

    if ((this.fontTypeId != parseInt(localStorage.getItem('font_type_id'))) && !isDefault) {
      window.accessibilityBar.updatePreferencesInterfaz({
        font_type_id: this.fontTypeId
      })
    }

    optionSelectedElm.setAttribute('default', false)

    localStorage['font_type_id'] = this.fontTypeId
  }

  /**
   * Apply changes cursor size in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeCursorSize() {
    let optionSelectedElm = Array.from(document.getElementsByName('radioOptionsSizeCursor')).filter(radioOption => radioOption.checked)[0]
    let optionSizeSelected = parseInt(optionSelectedElm.value)
    let isDefault = optionSelectedElm.default == 'true'
    let cursorColor = document.getElementsByName('colorMousePointer')[0].value
    this.cursorSizeId = optionSizeSelected
    this.cursorColor = cursorColor
    let validSize = {
      1: 0,
      2: 16,
      3: 32,
      4: 48
    }

    let sizeSelected = validSize[optionSizeSelected]
    let body = document.querySelector('body')

    if (sizeSelected != 0) {
      $('body').awesomeCursor('mouse-pointer', {
        size: sizeSelected,
        color: `#${this.cursorColor}`
      })
    } else {
      body.style.cursor = 'auto'
    }

    if (this.learningObject) {
      this.learningObjectDoc.querySelector('body').style.cursor = document.querySelector('body').style.cursor
    }

    if ((this.cursorSizeId != localStorage.getItem('cursor_size_id') ||
      this.cursorColor != localStorage.getItem('color_cursor')) && !isDefault) {
      window.accessibilityBar.updatePreferencesInterfaz({
        cursor_size_id: this.cursorSizeId,
        color_cursor: this.cursorColor,
        cursor_url: body.style.cursor
      })
    }

    optionSelectedElm.setAttribute('default', false)

    localStorage.setItem('cursor_size_id', this.cursorSizeId)
    localStorage.setItem('color_cursor', this.cursorColor)
    localStorage.setItem('cursor_url', body.style.cursor)
  }

  /**
   * Apply changes cursor trail in user interface and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeCursorTrail() {
    let optionSelectedElm = Array.from(document.getElementsByName('radioOptionsSizeCursorTrails')).filter(radioOption => radioOption.checked)[0]
    let optionCursorTrailSelected = parseInt(optionSelectedElm.value)
    let isDefault = optionSelectedElm.default == 'true'
    let colorCursorTrail = document.getElementsByName('colorCursorTrails')[0].value

    this.trailCursorSizeId = optionCursorTrailSelected
    this.trailCursorColor = colorCursorTrail

    let validCursorSizeTrail = {
      1: 0,
      2: 12,
      3: 24
    }

    let validCursorSizeTrailSelected = validCursorSizeTrail[optionCursorTrailSelected]
    this.cursorTrail.setSize(validCursorSizeTrailSelected)
    this.cursorTrail.setColor(colorCursorTrail)
    if (validCursorSizeTrailSelected > 0) {
      this.cursorTrail.animate()
    }

    if ((this.trailCursorSizeId != parseInt(localStorage.getItem('trail_cursor_size_id')) ||
      this.trailCursorColor != localStorage.getItem('trail_cursor_color')) && !isDefault) {
      window.accessibilityBar.updatePreferencesInterfaz({
        trail_cursor_size_id: this.trailCursorSizeId,
        trail_cursor_color: this.trailCursorColor
      })
    }

    optionSelectedElm.setAttribute('default', false)

    localStorage.setItem('trail_cursor_size_id', this.trailCursorSizeId)
    localStorage.setItem('trail_cursor_color', this.trailCursorColor)
  }

  disableTextJustify() {
    let html = document.getElementsByTagName('html')[0]
    html.style.textJustify = 'none'
    if (this.learningObject) {
      this.learningObjectDoc.querySelector('html').style.textJustify = 'none'
    }
  }

  changeLimitCharsPerLine() {
    let limitCharsPerLine = document.getElementsByName('limitCharsPerLine')[0].checked
    this.limitCharsPerLine = limitCharsPerLine
    let css = `
        p {
          max-width: 80ch;
        }
      `

    if (limitCharsPerLine) {
      if (!document.getElementById('styleLimitCharsPerLine')) {
        let head = document.head
        let style = document.createElement('style')
        style.id = "styleLimitCharsPerLine"

        head.appendChild(style);
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css))
      }

      if (this.learningObject && !this.learningObjectDoc.getElementById('styleLimitCharsPerLine')) {
        let styleLO = document.createElement('style')
        styleLO.id = "styleLimitCharsPerLine"
        this.learningObjectDoc.head.appendChild(styleLO)
        styleLO.type = 'text/css';
        styleLO.appendChild(document.createTextNode(css));
      }
    } else {
      let style = document.getElementById('styleLimitCharsPerLine');
      if (style) {
        style.remove()
      }

      if (this.learningObject) {
        let styleLO = this.learningObjectDoc.getElementById('styleLimitCharsPerLine');
        if (styleLO) {
          styleLO.remove()
        }
      }
    }

    localStorage.setItem('limit_chars_per_line', this.limitCharsPerLine)
  }
}
