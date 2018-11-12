class CustomInterfaz {
  constructor(preferencesInterfaz) {
    this.fontSize = preferencesInterfaz.font_size
    this.sizeLineSpacing = preferencesInterfaz.size_line_spacing
    this.fontTypeId = preferencesInterfaz.font_type_id
    this.cursorSizeId = preferencesInterfaz.cursor_size_id
    this.trailCursorSizeId = preferencesInterfaz.trail_cursor_size_id
    this.contrastColorsId = preferencesInterfaz.contrast_colors_id
    this.cursorColor = preferencesInterfaz.color_cursor
    this.customColors = preferencesInterfaz.custom_colors

    if(preferencesInterfaz.invert_color_general == 'f') {
      preferencesInterfaz.invert_color_general = false  
    } else if(preferencesInterfaz.invert_color_general == 't'){
      preferencesInterfaz.invert_color_general = true
    }

    if(preferencesInterfaz.invert_color_image == 'f') {
      preferencesInterfaz.invert_color_image = false  
    } else if(preferencesInterfaz.invert_color_image == 't'){
      preferencesInterfaz.invert_color_image = true
    }

    this.invertColorGeneral = preferencesInterfaz.invert_color_general
    this.invertColorImage = preferencesInterfaz.invert_color_image
    this.trailCursorColor = preferencesInterfaz.trail_cursor_color
    this.cursorUrl = preferencesInterfaz.cursor_url
    this.cursorTrail = new CursorTrail(0)

    this._addEventChangeFontSize()
    this._addEventChangeSizeLineSpacing()
    this._addEventChangeFontType()
    this._addEventChangeContrast()
    this._addEventChangeCursorSize()
    this._addEventChangeTrailCursorSize()
    this._addEventChangeInvertGeneral()
    this._addEventChangeInvertImages()
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
    document.querySelector(`input[name='fontSize']`).value = parseInt(this.fontSize)
    document.querySelector(`input[name='fontSize']`).dispatchEvent(new Event('change'))
    
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
    document.querySelector(`input[name='radioOptionscontrast'][value='${ this.contrastColorsId }']`).checked = true
    document.querySelector(`input[name='radioOptionscontrast'][value='${ this.contrastColorsId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='type-font'][value='${ this.fontTypeId }']`).checked = true
    document.querySelector(`input[name='type-font'][value='${ this.fontTypeId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='colorCursorTrails']`).value = this.trailCursorColor
    document.querySelector(`input[name='colorCursorTrails']`).dispatchEvent(new Event('change'))
    document.querySelector(`input[name='radioOptionsSizeCursorTrails'][value='${ this.trailCursorSizeId }']`).checked = true
    document.querySelector(`input[name='radioOptionsSizeCursorTrails'][value='${ this.trailCursorSizeId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='colorMousePointer']`).value = this.cursorColor
    document.querySelector(`input[name='colorMousePointer']`).dispatchEvent(new Event('change'))
    document.querySelector(`input[name='radioOptionsSizeCursor'][value='${ this.cursorSizeId }']`).checked = true
    document.querySelector(`input[name='radioOptionsSizeCursor'][value='${ this.cursorSizeId }']`).dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='invertImages']`).checked = this.invertColorImage == 't' || this.invertColorImage == 'true' ? true : false
    document.querySelector(`input[name='invertImages']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='invertGeneral']`).checked = this.invertColorGeneral == 't' || this.invertColorGeneral == 'true' ? true : false
    document.querySelector(`input[name='invertGeneral']`).dispatchEvent(new Event('change'))

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

  _addEventChangeFontSize() {
    let inputFontSize = document.querySelector('input[name="fontSize"]')

    inputFontSize.addEventListener('change', this.changeFontSize)
  }

  _addEventChangeSizeLineSpacing() {
    let inputSizeLineSpacing = document.querySelector('input[name="interlineSpaceSize"]')
  
    inputSizeLineSpacing.addEventListener('change', this.changeSizeLine)
  }
  _addEventChangeContrast() {
    let optionsContrast = document.querySelectorAll('input[name="radioOptionscontrast"]')

    Array.prototype.forEach.call(optionsContrast, opt => opt.addEventListener('change', (e) => {
      if (parseInt(e.target.value) == 7) {
        this._showCustomContrastColors()
      } else {
        this._hideCustomContrastColors()
      }

      this.changeContrastColors()
    }))
  }

  _showCustomContrastColors() {
    document.getElementById('div-color-foreground').style.display = 'block'
    document.getElementById('div-color-background').style.display = 'block'
    document.getElementById('div-color-link').style.display = 'block'
    document.getElementById('div-color-highlight').style.display = 'block'
  
    this._addEventChangeBackgroundColor()
    this._addEventChangeForegroundColor()
    this._addEventChangeHighlightColor()
    this._addEventChangeLinkColor()

    let inputForegroundColor = document.getElementsByName('foregroundColor')[0]
    let inputBackgroundColor = document.getElementsByName('backgroundColor')[0]
    let inputHighlightColor = document.getElementsByName('highlightColor')[0]
    let inputLinkColor = document.getElementsByName('linkColor')[0]

    inputForegroundColor.value = localStorage.getItem('foreground_color') || '000000'
    inputForegroundColor.dispatchEvent(new Event('change'))

    inputBackgroundColor.value = localStorage.getItem('background_color') || 'FFFFFF'
    inputBackgroundColor.dispatchEvent(new Event('change'))

    inputHighlightColor.value = localStorage.getItem('highlight_color') || 'D3D3D3'
    inputHighlightColor.dispatchEvent(new Event('change'))

    inputLinkColor.value = localStorage.getItem('link_color') || 'FFFF00'
    inputLinkColor.dispatchEvent(new Event('change'))
  }

  _hideCustomContrastColors() {
    document.getElementById('div-color-foreground').style.display = 'none'
    document.getElementById('div-color-background').style.display = 'none'
    document.getElementById('div-color-link').style.display = 'none'
    document.getElementById('div-color-highlight').style.display = 'none'
  }

  _addEventChangeFontType() {
    let optionsFontType = document.querySelectorAll('input[name="type-font"]')
  
    Array.prototype.forEach.call(optionsFontType, opt => opt.addEventListener('change', this.changeFontType))
  }

  _addEventChangeCursorSize() {
    let optionsCursorSize = document.querySelectorAll('input[name="radioOptionsSizeCursor"]')
  
    Array.prototype.forEach.call(optionsCursorSize, opt => opt.addEventListener('change', (e) => {
      let containerColorCursor = document.getElementById('div-color-cursor')
      
      if(parseInt(e.target.value) != 1) {
        containerColorCursor.style.display = 'block'
        this._addEventChangeColorCursor()
      } else {
        containerColorCursor.style.display = 'none'
      }

      this.changeCursorSize()
    }))    
  }

  _addEventChangeColorCursor() {
    let inputColorCursor = document.getElementsByName('colorMousePointer')[0]

    inputColorCursor.addEventListener('change', this.changeCursorSize)
  }

  _addEventChangeTrailCursorSize() {
    let optionsTrailCursorSize = document.querySelectorAll('input[name="radioOptionsSizeCursorTrails"')

    Array.prototype.forEach.call(optionsTrailCursorSize, opt => opt.addEventListener('change', (e) => {
      let containerTrailCursorColor = document.getElementById('div-color-cursor-trails')

      if((parseInt(e.target.value) != 1)) {
        containerTrailCursorColor.style.display = 'block'

        this._addEventChangeTrailCursorColor()
      } else {
        containerTrailCursorColor.style.display = 'none'
      }

      this.changeCursorTrail()
    }))
  }

  _addEventChangeTrailCursorColor() {
    let inputColorTrailCursor = document.getElementsByName('colorCursorTrails')[0]

    inputColorTrailCursor.addEventListener('change', this.changeCursorTrail.bind(this))
  }

  _addEventChangeForegroundColor() {
    let inputForegroundColor = document.getElementsByName('foregroundColor')[0]

    inputForegroundColor.addEventListener('change', this.changeForegroundColor.bind(this))
  }

  _addEventChangeBackgroundColor() {
    let inputBakgroundColor = document.getElementsByName('backgroundColor')[0]

    inputBakgroundColor.addEventListener('change', this.changeBackgroundColor.bind(this))
  }

  _addEventChangeLinkColor() {
    let inputLinkColor = document.getElementsByName('linkColor')[0]

    inputLinkColor.addEventListener('change', this.changeLinkColor.bind(this))
  }

  _addEventChangeHighlightColor() {
    let inputHighlightColor = document.getElementsByName('highlightColor')[0]

    inputHighlightColor.addEventListener('change', this.changeHighlightColor.bind(this))
  }

  _addEventChangeInvertGeneral() {
    let checkboxInvertGeneral = document.getElementsByName('invertGeneral')[0]
    
    checkboxInvertGeneral.addEventListener('change', this.changeInvertGeneral)
  }

  _addEventChangeInvertImages() {
    let checkboxInvertImages = document.getElementsByName('invertImages')[0]

    checkboxInvertImages.addEventListener('change', this.changeInvertImages)
  }

  changeFontSize() {
    console.log("change font size")
    let inputFontSize = document.getElementsByName('fontSize')[0]
    let html = document.getElementsByTagName('html')[0]

    this.fontSize = parseInt(inputFontSize.value)
    html.style.fontSize = `${ this.fontSize }px`

    if((this.fontSize != parseInt(localStorage.getItem('font_size')))){
      accessibilityBar.updatePreferencesInterfaz({
        font_size: this.fontSize
      })
    }

    localStorage.setItem('font_size', this.fontSize) 
  }

  changeSizeLine() {
    let inputSizeLine = document.getElementsByName("interlineSpaceSize")[0]
    let body = document.getElementsByTagName('body')[0]

    this.sizeLineSpacing = parseFloat(inputSizeLine.value)
    body.style.lineHeight = `${ this.sizeLineSpacing }`
    
    if((this.sizeLineSpacing != parseFloat(localStorage.getItem('size_line_spacing')))){
      accessibilityBar.updatePreferencesInterfaz({
        size_line_spacing: this.sizeLineSpacing
      })
    }
    
    localStorage.setItem('size_line_spacing', this.sizeLineSpacing)    
  }

  changeContrastColors() {
    let optionContrastSelected = parseInt(Array.from(document.getElementsByName('radioOptionscontrast')).filter(radioOption => radioOption.checked)[0].value)
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
    this.contrastColorsId = optionContrastSelected    

    if((this.contrastColorsId != parseInt(localStorage.getItem('contrast_colors_id')))) {
      accessibilityBar.updatePreferencesInterfaz({
        contrast_colors_id: this.contrastColorsId
      })
    }

    localStorage['contrast_colors_id'] = optionContrastSelected
  }

  changeForegroundColor() {
    let color = document.getElementsByName('foregroundColor')[0].value
    document.documentElement.style.setProperty('--foreground-color', `#${ color }`)
    this.customColors.foreground_colour = color

    if((this.customColors.foreground_colour != localStorage.getItem('foreground_color'))){
      accessibilityBar.updateCustomColors({
        foreground_colour: this.customColors.foreground_colour
      })
    }

    localStorage.setItem('foreground_color', color)
  }

  changeBackgroundColor() {
    let color = document.getElementsByName('backgroundColor')[0].value
    document.documentElement.style.setProperty('--background-color', `#${ color }`)
    this.customColors.background_colour = color

    if((this.customColors.background_colour != localStorage.getItem('background_color'))){
      accessibilityBar.updateCustomColors({
        background_colour: this.customColors.background_colour
      })
    }
    
    localStorage.setItem('background_color', color)
  }

  changeLinkColor() {
    let color = document.getElementsByName('linkColor')[0].value
    document.documentElement.style.setProperty('--link-color', `#${ color }`)
    this.customColors.link_colour = color

    if((this.customColors.link_colour != localStorage.getItem('link_color'))){
      accessibilityBar.updateCustomColors({
        link_colour: this.customColors.link_colour
      })
    }

    localStorage.setItem('link_color', color)
  }

  changeHighlightColor() {
    let color = document.getElementsByName('highlightColor')[0].value
    document.documentElement.style.setProperty('--highlight-color', `#${ color }`)
    this.customColors.highlight_colour = color

    if((this.customColors.highlight_colour != localStorage.getItem('highlight_color'))){
      accessibilityBar.updateCustomColors({
        highlight_colour: this.customColors.highlight_colour
      })
    }

    localStorage.setItem('highlight_color', color)
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
    
    if((this.fontTypeId != parseInt(localStorage.getItem('font_type_id')))) {
      accessibilityBar.updatePreferencesInterfaz({
        font_type_id: this.fontTypeId
      })
    }
    
    localStorage['font_type_id'] = this.fontTypeId
  }

  changeCursorSize() {
    let optionSizeSelected = parseInt(Array.from(document.getElementsByName('radioOptionsSizeCursor')).filter(radioOption => radioOption.checked)[0].value)
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
    let body = document.getElementsByTagName('body')[0]
    
    if(sizeSelected != 0) {
      $('body').awesomeCursor('mouse-pointer', {
        size: sizeSelected,
        color: `#${ this.cursorColor }`
      })
    } else {
      body.style.cursor = 'auto'
    }

    if((this.cursorSizeId != localStorage.getItem('cursor_size_id') || 
    this.cursorColor != localStorage.getItem('color_cursor'))) {
      accessibilityBar.updatePreferencesInterfaz({
        cursor_size_id: this.cursorSizeId,
        color_cursor: this.cursorColor,
        cursor_url: body.style.cursor
      })
    }
    
    localStorage.setItem('cursor_size_id', this.cursorSizeId)
    localStorage.setItem('color_cursor', this.cursorColor)
    localStorage.setItem('cursor_url', body.style.cursor)
  }

  changeCursorTrail() {
    let optionCursorTrailSelected = parseInt(Array.from(document.getElementsByName('radioOptionsSizeCursorTrails')).filter(radioOption => radioOption.checked)[0].value)
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
    if(validCursorSizeTrailSelected >  0){
      this.cursorTrail.animate()
    }

    if((this.trailCursorSizeId != parseInt(localStorage.getItem('trail_cursor_size_id')) ||
    this.trailCursorColor != localStorage.getItem('trail_cursor_color'))) {
      accessibilityBar.updatePreferencesInterfaz({
        trail_cursor_size_id: this.trailCursorSizeId,
        trail_cursor_color: this.trailCursorColor
      })
    }

    localStorage.setItem('trail_cursor_size_id', this.trailCursorSizeId)
    localStorage.setItem('trail_cursor_color', this.trailCursorColor)
  }

  changeInvertGeneral() {
    let isChecked = document.getElementsByName('invertGeneral')[0].checked
    let body = document.getElementsByTagName('body')[0]
    this.invertColorGeneral = isChecked

    if (isChecked) {
      body.style.filter = 'invert(1)'
    } else {
      body.style.filter = 'invert(0)'
    }

    if((this.invertColorGeneral != localStorage.getItem('invert_color_general'))){
      accessibilityBar.updatePreferencesInterfaz({
        invert_color_general: `${ this.invertColorGeneral }`
      })
    }

    localStorage.setItem('invert_color_general', this.invertColorGeneral)

  }

  changeInvertImages() {
    let isChecked = document.getElementsByName('invertImages')[0].checked
    let images = document.querySelectorAll('img')
    console.log(isChecked)
    this.invertColorImage = isChecked

    if(isChecked) {
      Array.from(images).forEach((image) => {
        image.style.filter = 'invert(1)'
      })
    } else {
      Array.from(images).forEach((image) => {
        image.style.filter = 'invert(0)'
      })
    }

    if((this.invertColorImage != localStorage.getItem('invert_color_image'))){
      accessibilityBar.updatePreferencesInterfaz({
        invert_color_image: `${ this.invertColorImage }`
      })
    }

    localStorage.setItem('invert_color_image', this.invertColorImage)
  }
}
