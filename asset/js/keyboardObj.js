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

  changeKeyboardSize() {
    let optionKeyboardSizeSelected = parseInt(Array.from(document.getElementsByName('keyboard-size')).filter(radioOption => radioOption.checked)[0].value)
    
    this.keyboardSizeId = optionKeyboardSizeSelected

    if(this.keyboardSizeId != parseInt(localStorage.getItem('kb_size_id'))) {
      accessibilityBar.updatePreferencesKeyboard({
        kb_size_id: this.keyboardSizeId
      })
    }

    localStorage.setItem('kb_size_id', this.keyboardSizeId) 
  }

  changePlayKeySound() {
    let isChecked = document.getElementsByName('play_key_sound')[0].checked
    this.playKeySound = isChecked

    if(this.playKeySound != localStorage.getItem('play_key_sound')) {
      accessibilityBar.updatePreferencesKeyboard({
        play_key_sound: this.playKeySound
      })
    }

    localStorage.setItem('play_key_sound', this.playKeySound)
  }
}
