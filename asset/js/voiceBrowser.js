class voiceBrowser {
  constructor(language='es-CO', useSpaces=true) {
    this.language = language
    this.useSpaces = useSpaces
    this._createPoppers()

    this.commands = {
      'Ir a *textLink': this._goTo,
      'Formulario *numForm': this._focusForm,
      'Enfocar campo *textPlaceholder': this._focusField,
      'Enviar formulario *numForm': this._sendForm,
      'Desactivar espacios': () => { this.setUseSpaces(false) },
      'Activar espacios': () => { this.setUseSpaces(true) },
      'Escribir *text': (text) => { this._writeInField(text) },
      'Añadir *text': this._addTextInField,
      'Borrar todo': this._deleteFieldContent,
      'Borrar letra número *indexCharacter': (indexCharacter) => { this._deleteFieldContent(indexCharacter - 1) },
      'Bajar *pixels': (pixels) => { this._scroll(pixels, true, false) },
      'Subir *pixels': (pixels) => { this._scroll(pixels, false, true) }
    }
  }

  _scroll(pixels=20, down=false, up=false){
    let page = document.getElementsByClassName('page')[0]
    let scrollConfig

    if(down) {
      scrollConfig = {
        top: pixels,
        behavior: 'smooth'
      }
    } else if(up) {
      scrollConfig = {
        top: -pixels,
        behavior: 'smooth'
      }
    }

    page.scrollBy(scrollConfig)
  }
  _deleteFieldContent(index=-1) {
    let field = document.activeElement

    if(index === -1) {
      field.value = ''
    } else {
      let currentValue = field.value
      field.value = currentValue.slice(0, index) + currentValue.slice(index + 1,)
    }
  }

  _addTextInField(text) {
    let field = document.activeElement
    field.value += text
  }

  _writeInField(text) {
    let field = document.activeElement
    
    if(!this.useSpaces) {
      field.value = text.replace(/ /g,'')
    } else {
      field.value = text
    }
  }

  _sendForm(numForm) {
    console.log(numForm)
    let form = document.getElementsByTagName('form')[parseInt(numForm) - 1]
    form.querySelector('input[type="submit"]').click()
  }

  _focusField(textPlaceholder) {
    console.log(textPlaceholder)
    document.querySelectorAll(`[placeholder='${textPlaceholder}'i]`)[0].focus()
  }

  _focusForm(numForm) {
    console.log(numForm)
    let form = document.getElementsByTagName('form')[parseInt(numForm) - 1]
    form.elements[0].focus()
  }

  _goTo(textLink) {
    let link = contains('a', textLink)[0]
    link.click()
  }

  start() {
    annyang.setLanguage(this.language)
    annyang.addCommands(this.commands);
    annyang.addCallback('result', function(phrases) {
      console.log('Speech recognized. Possible sentences said:');
      console.log(phrases);
    });
    annyang.start({ 
      continuous: false,
      debug: true
     })
  }

  getLanguage() {
    return this.language
  }

  setLanguage(language) {
    this.language = language
    annyang.setLanguage(this.language)
  }

  setUseSpaces(useSpaces) {
    this.useSpaces = useSpaces
  }
}