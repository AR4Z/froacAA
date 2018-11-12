class LscTranslator {
  constructor(preferencesLscTranslator) {
    this.signSpeed = preferencesLscTranslator.sign_speed
    this.modelId = preferencesLscTranslator.model_id
    
    this._addEventChangeModel()
    this._addEventChangeSignSpeed()
    this._setValuesInLocalStorage()
    this._loadLscTranslator()
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('sign_speed', this.signSpeed)
    localStorage.setItem('model_id', this.modelId)
  }

  _loadLscTranslator() {
    document.getElementsByName('signSpeed')[0].value = parseInt(this.signSpeed)
    document.getElementsByName('signSpeed')[0].dispatchEvent(new Event('change'))

    document.querySelector(`input[name='LSC-translator-model'][value='${ this.modelId }']`).checked = true
    document.querySelector(`input[name='LSC-translator-model'][value='${ this.modelId }']`).dispatchEvent(new Event('change'))
  }

  _addEventChangeModel() {
    let optionsModel = document.querySelectorAll('input[name="LSC-translator-model"]')

    Array.prototype.forEach.call(optionsModel, opt => opt.addEventListener('change', this.changeModel))
  }

  _addEventChangeSignSpeed() {
    let inputSignSpeed = document.getElementsByName('signSpeed')[0]

    inputSignSpeed.addEventListener('change', this.changeSignSpeed)
  }

  changeModel() {
    let modelSelected = parseInt(Array.from(document.getElementsByName('LSC-translator-model')).filter(radioOption => radioOption.checked)[0].value)
    this.modelId = modelSelected

    if(this.modelId != parseInt(localStorage.getItem('model_id'))) {
      accessibilityBar.updatePreferencesLscTranslator({
        model_id: this.modelId
      })
    }

    localStorage.setItem('model_id', this.modelId)
  }

  changeSignSpeed() {
    let signSpeed = parseInt(document.getElementsByName('signSpeed')[0].value)
    this.signSpeed = signSpeed

    if(this.signSpeed != parseInt(localStorage.getItem('sign_speed'))) {
      accessibilityBar.updatePreferencesLscTranslator({
        sign_speed: this.signSpeed
      })
    }

    localStorage.setItem('sign_speed', this.signSpeed)
  }

}
