class CustomInterfaz {
  constructor(preferencesInterfaz) {

    this.fontSize = preferencesInterfaz.font_size
    this.sizeLineSpacing = preferencesInterfaz.size_line_spacing
    this.fontTypeId = preferencesInterfaz.font_type_id
    this.cursorSizeId = preferencesInterfaz.cursor_size_id
    this.trailCursorSizeId = preferencesInterfaz.trail_cursor_size_id
    this.contrastColorsId = preferencesInterfaz.contrast_colors_id
    this.cursorColor = preferencesInterfaz.color_cursor
    this.invertColorGeneral = preferencesInterfaz.invert_color_general
    this.invertColorImage = preferencesInterfaz.invert_color_image
    this.trailCursorColor = preferencesInterfaz.trail_cursor_color
    this.cursorUrl = preferencesInterfaz.cursor_url

    this._addEventChangeFontType()
    this._addEventChangeContrast()
    // I keep the values of each of the interface characteristics in the localStorage
    this._setValuesInLocalStorage()
    // charge the values received in each one of the characteristics of the interface to be applied
    this._loadCustomInterfaz()

    
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('cursor_size_id', this.cursorSizeId)
    localStorage.setItem('color_cursor', this.cursorColor)
    localStorage.setItem('trail_cursor_size_id', this.trailCursorSizeId)
    localStorage.setItem('trail_cursor_color', this.trailCursorColor)
    localStorage.setItem('invert_color_general', this.invertColorGeneral)
    localStorage.setItem('invert_color_image', this.invertColorImage)
    localStorage.setItem('contrast_colors_id', this.contrastColorsId)
    localStorage.setItem('font_size', this.fontSize)
    localStorage.setItem('size_line_spacing', this.sizeLineSpacing)
    localStorage.setItem('font_type_id', this.fontTypeId)
    localStorage.setItem('cursor_url', this.cursorUrl)
  }

  _loadCustomInterfaz() {
    document.getElementById('inputFontSize').value = parseInt(this.fontSize)
    document.getElementById('inputFontSize').dispatchEvent(new Event('change'))

    document.getElementById("inputInterlineSize").value = parseFloat(this.sizeLineSpacing)
    document.getElementById("inputInterlineSize").dispatchEvent(new Event('change'))

    document.querySelector(`input[name='radioOptionscontrast'][value='${ this.contrastColorsId }']`).checked = true
    document.querySelector(`input[name='radioOptionscontrast'][value='${ this.contrastColorsId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='type-font'][value='${ this.fontTypeId }']`).checked = true
    document.querySelector(`input[name='type-font'][value='${ this.fontTypeId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='radioOptionsSizeCursorTrails'][value='${ this.trailCursorSizeId }']`).checked = true
    document.querySelector(`input[name='radioOptionsSizeCursorTrails'][value='${ this.trailCursorSizeId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='radioOptionsSizeCursor'][value='${ this.cursorSizeId }']`).checked = true
    document.querySelector(`input[name='radioOptionsSizeCursor'][value='${ this.cursorSizeId }']`).dispatchEvent(new Event('change'))
  }

  setDefaultValues() {
    document.getElementById('inputFontSize').setAttribute('default', true)
    document.getElementById('inputFontSize').value = 12
    document.getElementById('inputFontSize').dispatchEvent(new Event('change'))
    
    document.getElementById("inputInterlineSize").setAttribute('default', true)
    document.getElementById("inputInterlineSize").value = 1.5
    document.getElementById("inputInterlineSize").dispatchEvent(new Event('change'))

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
  }

  _addEventChangeContrast() {
    let optionsContrast = document.querySelectorAll('input[name="radioOptionscontrast"]')

    Array.prototype.forEach.call(optionsContrast, opt => opt.addEventListener('change', this.changeContrastColors))
  }

  _addEventChangeFontType() {
    let optionsFontType = document.querySelectorAll('input[name="type-font"]')
  
    Array.prototype.forEach.call(optionsFontType, opt => opt.addEventListener('change', this.changeFontType))
  }

  changeFontSize() {
    let inputFontSize = document.getElementById('inputFontSize')
    let html = document.getElementsByTagName('html')[0]

    this.fontSize = parseInt(inputFontSize.value)
    html.style.fontSize = `${ this.fontSize }px`
    inputFontSize.setAttribute('default', false)
    localStorage.setItem('font_size', this.fontSize) 
  }

  changeSizeLine() {
    let inputSizeLine = document.getElementById("inputInterlineSize")
    let body = document.getElementsByTagName('body')[0]

    this.sizeLineSpacing = parseFloat(inputSizeLine.value)
    body.style.lineHeight = `${ this.sizeLineSpacing }`
    document.getElementById("inputInterlineSize").setAttribute('default', false)
    localStorage.setItem('size_line_spacing', this.sizeLineSpacing)    
  }

  changeContrastColors() {
    let optionContrastSelected = parseInt(Array.from(document.getElementsByName('radioOptionscontrast')).filter(radioOption => radioOption.checked)[0].value)
    this.contrastColorsId = optionContrastSelected
    let classNameContrastOptions = {
      1: 'default',
      2: 'fl-theme-bw',
      3: 'fl-theme-wb',
      4: 'fl-theme-by',
      5: 'fl-theme-yb',
      6: 'fl-theme-lgdg',
      7: 'customized'
    }

    let classNameContrastSelected = classNameContrastOptions[optionContrastSelected]
    document.getElementsByTagName('body')[0].classList.remove(classNameContrastOptions[this.contrastColorsId])
    document.getElementsByTagName('body')[0].classList.add(classNameContrastSelected)
    localStorage['contrast_colors_id'] = optionContrastSelected
  }

  changeFontType() {
    let optionFontSelected = parseInt(Array.from(document.getElementsByName('type-font')).filter(radioOption => radioOption.checked)[0].value)
    this.fontTypeId = optionFontSelected
    let validFonts = {
      1: "'Open Sans', sans-serif",
      2: "'PT Serif', serif",
      3: "'Cantarell', sans-serif",
      4: "'Source Code Pro', monospace"
    }

    let body = document.getElementsByTagName('body')[0]
    body.style.fontFamily = validFonts[optionFontSelected]
    localStorage['font_type_id'] = this.fontTypeId
  }
}

