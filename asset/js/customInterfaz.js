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

    document.getElementById("inputInterlineSize").value = parseInt(this.sizeLineSpacing)
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

  changeFontSize(fontSize) {
    this.fontSize = fontSize
    let html = document.getElementsByTagName('html')[0]
    html.style.fontSize = `${ this.fontSize }px`
    
    document.getElementById('inputFontSize').setAttribute('default', false)
    localStorage.setItem('font_size', this.fontSize) 
  }

  changeSizeLine(sizeLine) {
    this.sizeLineSpacing = sizeLine
    let body = document.getElementsByTagName('body')[0]
    body.style.lineHeight = `${ this.sizeLineSpacing }`
    
    document.getElementById("inputInterlineSize").setAttribute('default', false)
    localStorage.setItem('sizeLine', this.sizeLineSpacing)    
  }
}