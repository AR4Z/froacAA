/** Class representing Virtual Keyboard */
class VirtualKeyboard {
  /**
   * Create virtual keyboard
   * @param {object} preferencesKeyboard 
   */
  constructor(preferencesKeyboard) {
    /**
     * Id for virtual keyboard size.
     * 1 => small
     * 2 => medium
     * 3 => large
     * @type {number}
     */
    this.keyboardSizeId = preferencesKeyboard.kb_size_id
    /** @type {boolean} */
    this.playKeySound = preferencesKeyboard.play_key_sound
    /** 
     * store to css class for apply size styles to virtual keyboard.
     * @type {string} 
     */
    this.keyboardSizeClass = ''
    /** @type {boolean} */
    this.useKeyboard = localStorage.getItem('use_keyboard') == 'true'

    this._addEventChangeKeyboardSize()
    this._addEventChangePlayKeySound()
    this._addEventChangeUseKeyboard()

    this._setValuesInLocalStorage()
    this._loadKeyboard()
    this.createKeyboard()
  }
  /**
   * Save preferences user of virtual keyboard in localStorage
   * @private
   * @returns {void}
   */
  _setValuesInLocalStorage() {
    localStorage.setItem('kb_size_id', this.keyboardSizeId)
    localStorage.setItem('play_key_sound', this.playKeySound)
    localStorage.setItem('use_keyboard', this.useKeyboard)
  }

  /**
   * It gives a value to each one of the options of the virtual keyboard and I execute 
   * each one of the functions so that the given value is reflected when the virtual keyboard its used.
   * @private
   * @returns {void}
   */
  _loadKeyboard() {
    document.querySelector(`input[name='keyboard-size'][value='${this.keyboardSizeId}']`).checked = true
    document.querySelector(`input[name='keyboard-size'][value='${this.keyboardSizeId}']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='play_key_sound']`).checked = this.playKeySound == 't' || this.playKeySound == 'true' ? true : false
    document.querySelector(`input[name='play_key_sound']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='useKeyboard']`).checked = this.useKeyboard
    document.querySelector(`input[name='useKeyboard']`).dispatchEvent(new Event('change'))
  }

  /**
   * Listen change virtual keyboard size radio options
   * @private
   * @returns {void}
   */
  _addEventChangeKeyboardSize() {
    let optionsKeyboardSize = document.querySelectorAll('input[name="keyboard-size"')

    Array.prototype.forEach.call(optionsKeyboardSize, opt => opt.addEventListener('change', this.changeKeyboardSize.bind(this)))
  }

  /**
   * Listen change play key sound checkbox
   * @private
   * @returns {void}
   */
  _addEventChangePlayKeySound() {
    let checkboxPlayKeySound = document.getElementsByName('play_key_sound')[0]

    checkboxPlayKeySound.addEventListener('change', this.changePlayKeySound.bind(this))
  }

  /**
   * Listen change for use virtual keyboard checkbox
   * @private
   * @returns {void}
   */
  _addEventChangeUseKeyboard() {
    let checkboxUseKeyboard = document.getElementsByName('useKeyboard')[0]

    checkboxUseKeyboard.addEventListener('change', (e) => {
      /** @type {boolean} */
      let useKeyboard = e.target.checked

      if (useKeyboard) {
        this.createKeyboard();
      }

      localStorage.setItem('use_keyboard', useKeyboard)
      this.useKeyboard = localStorage.getItem('use_keyboard')
    })
  }

  /**
   * Fix each of the options of the virtual keyboard to its default value.
   * @param {boolean} all - all accessibilityBar tools at their default value?
   * @returns {void}
   */
  setDefaultValues(all) {
    /*
      The default attribute given to each of the elements serves to know, 
      in each of the functions that are responsible for applying 
      the changes to the user interface, if the change is due to the user wants to set the 
      preferences of the interface to its default value this in order to avoid making a request to the server for each of the preferences. 

      At the end of this method a request is made to update all the values to their default 
      value in the user's model and in the data of the object accessibilityBar. 
      In the case that all is true then the accessiblityBar object is responsible for changing all preferences to their default 
      value of all the tools in the accessibility bar.
    */

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

  /**
   * Remove the css classes that change the size of the virtual keyboard
   * @param {HTMLCollection} elements - Is a array of elements of virtual keyboard
   * @private
   * @returns {void}
   */
  removeClassSize(elements) {
    Array.from(elements).forEach(element => {
      element.classList.remove('small')
      element.classList.remove('medio')
      element.classList.remove('large')
    })
  }

  /**
   * Add css class a to HtmlCollection
   * @param {HtmlCollection} elements - Array of html elements
   * @param {string} nameClass - css class name
   * @private
   * @returns {void}
   */
  addClassSize(elements, nameClass) {
    Array.from(elements).forEach(element => {
      element.classList.add(nameClass)
    })
  }

  /**
   * Method for play <audio> with key sound
   * @private
   * @returns {void}
   */
  playSoundKey() {
    let keySound = document.getElementById('key-sound');
    // its playing?
    if (keySound.played.length == 1) {
      keySound.pause();
      keySound.currentTime = 0;
    }
    keySound.play()
  }

  /**
   * Apply changes virtual keyboard size in virtual keyboard and update value in accessibility bar data
   * @public
   * @returns {void}
   */
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

  /**
   * Apply changes when user change play key sound value and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changePlayKeySound() {
    let checkbox = document.getElementsByName('play_key_sound')[0]
    let isChecked = checkbox.checked
    let isDefault = checkbox.default == 'true'
    this.playKeySound = isChecked

    if (this.playKeySound != localStorage.getItem('play_key_sound') && !isDefault) {
      accessibilityBar.updatePreferencesKeyboard({
        play_key_sound: `${this.playKeySound}`
      })
    }

    checkbox.setAttribute('default', false)
    localStorage.setItem('play_key_sound', this.playKeySound)
  }

  /**
   * create virtual keyboard object
   * @public
   * @returns {void}
   */
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
      tabNavigation: true,

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
        /*
          before show virtual keyboard, check if user use virtual keyboard and change
          virtual keyboard size to the current size
        */
        if (this.useKeyboard == 'false') {
          let keyboard = document.getElementsByClassName('ui-keyboard')[0]
          if (keyboard) {
            keyboard = $(keyboard).getkeyboard()
            keyboard.destroy()
          }
        } else {
          let keys = document.getElementsByClassName('ui-state-default')

          this.removeClassSize(keys)
          this.addClassSize(keys, this.keyboardSizeClass)
        }
      },

      visible: () => {
        let keyboardButtons = document.getElementsByClassName('ui-keyboard-button')
        // add event click handler each of key for play key sound, if user wants
        Array.prototype.forEach.call(keyboardButtons, button => {
          button.addEventListener('click', () => {
            if (this.playKeySound) {
              this.playSoundKey()
            }

            // dispatch keyup event when the user does click in a key of virtual keyboard
            let currentInput = document.getElementsByClassName('ui-keyboard-input-current')[0]
            currentInput.dispatchEvent(new Event('keyup'))
          })
        })
      }
    })
  }
}
