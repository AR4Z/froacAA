class customInterfaz {
  constructor(fontSize=12, 
    sizeLine=1.5, 
    contrastId=1, 
    fontTypeId=1, 
    cursorSizeId='normalSizeCursor', 
    trailCursorSizeId='normalSizeCursorTrails',
    cursorColor='black',
    trailCursorColor='black',
    invertColor=false,
    invertImageColor=false,
    cursorUrl='') {

    this.fontSize = fontSize
    this.sizeLine = sizeLine
    this.fontTypeId = fontTypeId
    this.cursorSizeId = cursorSizeId
    this.trailCursorSizeId = trailCursorSizeId
    this.contrastId = contrastId
    this.cursorColor = cursorColor
    this.invertColor = invertColor
    this.invertImageColor = invertImageColor
    this.trailCursorColor = trailCursorColor
    this.cursorUrl = cursorUrl

    // I keep the values of each of the interface characteristics in the localStorage
    this._setValuesInLocalStorage()
    // charge the values received in each one of the characteristics of the interface to be applied
    this._loadCustomInterfaz()
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('cursor_size_id', this.cursorSizeId)
    localStorage.setItem('cursor_color', this.cursorColor)
    localStorage.setItem('trail_cursor_size_id', this.trailCursorSizeId)
    localStorage.setItem('trail_cursor_color', this.trailCursorColor)
    localStorage.setItem('invert_color', this.invertColor)
    localStorage.setItem('invert_image_color', this.invertImageColor)
    localStorage.setItem('contrast_id', this.contrastId)
    localStorage.setItem('font_size', this.fontSize)
    localStorage.setItem('sizeLine', this.sizeLine)
    localStorage.setItem('font_type_id', this.fontTypeId)
    localStorage.setItem('cursor_url', this.cursorUrl)
  }

  _loadCustomInterfaz() {
    document.getElementById('inputFontSize').value = parseInt(this.fontSize)
    document.getElementById('inputFontSize').dispatchEvent(new Event('change'))

    document.getElementById("inputInterlineSize").value = parseInt(this.sizeLine)
    document.getElementById("inputInterlineSize").dispatchEvent(new Event('change'))

    document.querySelector(`input[name='radioOptionscontrast'][value='${ this.contrastId }']`).checked = true
    document.querySelector(`input[name='radioOptionscontrast'][value='${ this.contrastId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='type-font'][value='${ this.fontType }']`).checked = true
    document.querySelector(`input[name='type-font'][value='${ this.fontType }']`).dispatchEvent(new Event('change'))

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
    localStorage.setItem('font_size') = this.fontSize
  }

  changeSizeLine(sizeLine) {
    this.sizeLine = sizeLine
    let body = document.getElementsByTagName('body')[0]
    body.style.lineHeight = `${ this.sizeLine }`
    
    document.getElementById("inputInterlineSize").setAttribute('default', false)
    localStorage.setItem('sizeLine', this.sizeLine)    
  }
}