class VirtualKeyboard {
  constructor(preferencesKeyboard) {
    this.keyboardSizeId = preferencesKeyboard.kb_size_id
    this.playKeySound = preferencesKeyboard.play_key_sound
    
    this._addEventChangeKeyboardSize()
    this._addEventChangePlayKeySound()

    this._setValuesInLocalStorage()
    this._loadKeyboard()
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('kb_size_id', this.keyboardSizeId)
    localStorage.setItem('play_key_sound', this.playKeySound)
  }

  _loadKeyboard() {
    document.querySelector(`input[name='keyboard-size'][value='${ this.keyboardSizeId }']`).checked = true
    document.querySelector(`input[name='keyboard-size'][value='${ this.keyboardSizeId }']`).dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='play_key_sound']`).checked = this.playKeySound == 't' || this.playKeySound == 'true' ? true : false
    document.querySelector(`input[name='play_key_sound']`).dispatchEvent(new Event('change'))
  }

  _addEventChangeKeyboardSize() {
    let optionsKeyboardSize = document.querySelectorAll('input[name="keyboard-size"')
    
    Array.prototype.forEach.call(optionsKeyboardSize, opt => opt.addEventListener('change', this.changeKeyboardSize))
  }

  _addEventChangePlayKeySound() {
    let checkboxPlayKeySound = document.getElementsByName('play_key_sound')[0]

    checkboxPlayKeySound.addEventListener('change', this.changePlayKeySound.bind(this))
  }

  setDefaultValues(all) {
    document.querySelector(`input[name='keyboard-size']`).setAttribute('default', true) 
    document.querySelector(`input[name='keyboard-size'][value='2']`).checked = true
    document.querySelector(`input[name='keyboard-size'][value='2']`).dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='play_key_sound']`).setAttribute('default', true)
    document.querySelector(`input[name='play_key_sound']`).checked = true
    document.querySelector(`input[name='play_key_sound']`).dispatchEvent(new Event('change'))
  
    if(!all) {
      accessibilityBar.updatePreferencesKeyboard({
        kb_size_id: 2,
        play_key_sound: 'true'
      })
    }
  }

  changeKeyboardSize() {
    let optSelectedElm = Array.from(document.getElementsByName('keyboard-size')).filter(radioOption => radioOption.checked)[0]
    let optionKeyboardSizeSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    
    this.keyboardSizeId = optionKeyboardSizeSelected

    if(this.keyboardSizeId != parseInt(localStorage.getItem('kb_size_id')) && !isDefault) {
      accessibilityBar.updatePreferencesKeyboard({
        kb_size_id: this.keyboardSizeId
      })
    }

    optSelectedElm.setAttribute('default', false)
    localStorage.setItem('kb_size_id', this.keyboardSizeId) 
  }

  changePlayKeySound() {
    let checkbox = document.getElementsByName('play_key_sound')[0]
    let isChecked = checkbox.checked
    let isDefault = checkbox.default == 'true'
    this.playKeySound = isChecked

    if(this.playKeySound != localStorage.getItem('play_key_sound') && !isDefault) {
      accessibilityBar.updatePreferencesKeyboard({
        play_key_sound: `${ this.playKeySound }`
      })
    }

    checkbox.setAttribute('default', false)
    localStorage.setItem('play_key_sound', this.playKeySound)
  }
}
