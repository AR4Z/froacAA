class VoiceBrowser {
  constructor(language='es-CO', useSpaces=true) {
    this.language = language
    this.useSpaces = useSpaces

    this.commands = {
      'Ir a *textLink': (textLink) => {
        try {
          this._goTo(textLink)
        } catch(e) {
          console.log(textLink)
        }
      },
      'Formulario *numForm': this._focusForm,
      'Enfocar campo *textPlaceholder': this._focusField,
      'Enviar formulario *numForm': this._sendForm,
      'Desactivar espacios': () => { this.setUseSpaces(false) },
      'Activar espacios': () => { this.setUseSpaces(true) },
      'Escribir sigla *text': (text) => {
        this._writeInField(text.replace(/ /g,'').toUpperCase())
      },
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
    let form = document.getElementsByTagName('form')[parseInt(numForm) - 1]
    form.querySelector('input[type="submit"]').click()
  }

  _focusField(textPlaceholder) {
    document.querySelectorAll(`[placeholder='${textPlaceholder}'i]`)[0].focus()
  }

  _focusForm(numForm) {
    let form = document.getElementsByTagName('form')[parseInt(numForm) - 1]
    form.elements[0].focus()
  }

  _goTo(textLink) {
    let link = contains('a', textLink)[0]
    link.click()
  }

  start() {
    if(annyang) {
      annyang.setLanguage(this.language)
      annyang.addCommands(this.commands);
      annyang.addCallback('result', function(phrases) {
        console.log('Speech recognized. Possible sentences said:');
        console.log(phrases);
      });

      annyang.addCallback('result', this._processText.bind(this));

      annyang.start({ 
        continuous: false,
        debug: true
      })
    }
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

  getInitials(phrase) {
    let initials

    try {
      phrase.match(/sigla (.*?) sigla/g).map((x) => {
        initials = x.substr(5, x.length - 10).replace(/ /g,'').toUpperCase()
        phrase = phrase.replace(x, initials)
      })
    } catch(e) {
      console.log("there not initials")
    }
    
    return phrase
  }

  _processText(userSaid) {
    userSaid[0] = this.getInitials(userSaid[0])
  }
}
