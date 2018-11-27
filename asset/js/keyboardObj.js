class VirtualKeyboard {
  constructor(preferencesKeyboard) {
    this.keyboardSizeId = preferencesKeyboard.kb_size_id
    this.playKeySound = preferencesKeyboard.play_key_sound
    this.keyboardSizeClass = ''
    this.useKeyboard = localStorage.getItem('use_keyboard') || true

    this._addEventChangeKeyboardSize()
    this._addEventChangePlayKeySound()
    this._addEventChangeUseKeyboard()

    this._setValuesInLocalStorage()
    this._loadKeyboard()
    this.createKeyboard()
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
  
    document.querySelector(`input[name='useKeyboard']`).checked = this.useKeyboard == 'true' || true
    document.querySelector(`input[name='useKeyboard']`).dispatchEvent(new Event('change'))
  }

  _addEventChangeKeyboardSize() {
    let optionsKeyboardSize = document.querySelectorAll('input[name="keyboard-size"')

    Array.prototype.forEach.call(optionsKeyboardSize, opt => opt.addEventListener('change', this.changeKeyboardSize.bind(this)))
  }

  _addEventChangePlayKeySound() {
    let checkboxPlayKeySound = document.getElementsByName('play_key_sound')[0]

    checkboxPlayKeySound.addEventListener('change', this.changePlayKeySound.bind(this))
  }

  _addEventChangeUseKeyboard() {
    let checkboxUseKeyboard = document.getElementsByName('useKeyboard')[0]

    checkboxUseKeyboard.addEventListener('change', (e) => {
      let isChecked = e.target.checked
      
      if(isChecked) {
        this.createKeyboard();
      }
      
      localStorage.setItem('use_keyboard', isChecked)
      this.useKeyboard = localStorage.getItem('use_keyboard')
    })
  }

  setDefaultValues(all) {
    document.querySelector(`input[name='keyboard-size']`).setAttribute('default', true)
    document.querySelector(`input[name='keyboard-size'][value='2']`).checked = true
    document.querySelector(`input[name='keyboard-size'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='play_key_sound']`).setAttribute('default', true)
    document.querySelector(`input[name='play_key_sound']`).checked = true
    document.querySelector(`input[name='play_key_sound']`).dispatchEvent(new Event('change'))

    if (!all) {
      accessibilityBar.updatePreferencesKeyboard({
        kb_size_id: 2,
        play_key_sound: 'true'
      })
    }
  }

  removeClassSize(elements) {
    Array.from(elements).forEach(element => {
      element.classList.remove('small')
      element.classList.remove('medio')
      element.classList.remove('large')
    })
  }

  addClassSize(elements, nameClass) {
    Array.from(elements).forEach(element => {
      element.classList.add(nameClass)
    })
  }

  playSoundKey() {
    let keySound = document.getElementById('key-sound');

    if (keySound.played.length == 1) {
        keySound.pause();
        keySound.currentTime = 0;
    }
    keySound.play()
  }

  changeKeyboardSize() {
    let optSelectedElm = Array.from(document.getElementsByName('keyboard-size')).filter(radioOption => radioOption.checked)[0]
    let optionKeyboardSizeSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validClassSize = {
      1: 'small',
      2: 'medio',
      3: 'large'
    }
    
    this.keyboardSizeId = optionKeyboardSizeSelected
    this.keyboardSizeClass = validClassSize[this.keyboardSizeId]

    if (this.keyboardSizeId != parseInt(localStorage.getItem('kb_size_id')) && !isDefault) {
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

    if (this.playKeySound != localStorage.getItem('play_key_sound') && !isDefault) {
      accessibilityBar.updatePreferencesKeyboard({
        play_key_sound: `${ this.playKeySound }`
      })
    }

    checkbox.setAttribute('default', false)
    localStorage.setItem('play_key_sound', this.playKeySound)
  }

  createKeyboard() {
    $(':input[type=text], :input[type=password], :input[type=search]').keyboard({
      language: 'es',
      layout: 'qwerty',
      usePreview: false,
      customLayout: {
        'normal': ['{cancel}']
      },
      autoAccept: true,
      tabNavigation: true,
      css: {
        // input & preview
        input: 'ui-widget-content ui-corner-all',
        // keyboard container
        container: 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
        // keyboard container extra class (same as container, but separate)
        popup: '',
        // default state
        buttonDefault: `ui-state-default ui-corner-all`,
        // hovered button
        buttonHover: 'ui-state-hover',
        // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
        buttonAction: 'ui-state-active',
        // used when disabling the decimal button {dec}
        buttonDisabled: 'ui-state-disabled',
        // empty button class name {empty}
        buttonEmpty: 'ui-keyboard-empty'
      },

      position: {
        // optional - null (attach to input/textarea) or a jQuery object
        // (attach elsewhere)
        of: null,
        my: 'center top',
        at: 'center top',
        // used when "usePreview" is false
        // (centers keyboard at bottom of the input/textarea)
        at2: 'center bottom'
      },

      beforeVisible: () => {
        if (this.useKeyboard == 'false') {
          let keyboard = $(`#${$('.ui-keyboard')[0].id}`).getkeyboard();
          keyboard.destroy();
        } else {
          let keys = document.getElementsByClassName('ui-state-default')

          this.removeClassSize(keys)
          this.addClassSize(keys, this.keyboardSizeClass)
        }
      },

      visible: () => {
        let keyboardButtons = document.getElementsByClassName('ui-keyboard-button')
        
        Array.prototype.forEach.call(keyboardButtons, button => {
          button.addEventListener('click', () => {
            if(this.playKeySound) {
              this.playSoundKey()
            }

            let currentInput = document.getElementsByClassName('ui-keyboard-input-current')[0]
            
            currentInput.dispatchEvent(new Event('keyup'))
          })
        })
      }
    })
  }
}
