class voiceBrowser {
  constructor(language = 'es-CO') {
    this.language = language
    this.commands = {
      'Ir a *textLink': this._goTo,
      'Formulario *numForm': this._focusForm,
      'Enfocar campo *textPlaceholder': this._focusField,
      'Enviar formulario *numForm': this._sendForm,
    
    }
  }

  _sendForm(numForm) {
    console.log(numForm)
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
}
