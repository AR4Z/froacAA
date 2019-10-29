/** Class representing Lsc Translator*/
class LscTranslator {
  /**
   * Create Lsc Translator.
   * @param {object} preferencesLscTranslator 
   */
  constructor(preferencesLscTranslator) {
    /** 
     * This object save the animation. Can play, pause or stop the animation.     
     * @type {object} 
     */
    this.canvidControl = null
    /** @type {object[]}*/
    this.clips = []
    /** @type {number} */
    this.signSpeed = preferencesLscTranslator.sign_speed
    /**
     * Id for model that interprets the signs.
     * 1 => Avatar
     * 2 => Human
     * @type {number} 
     */
    this.modelId = preferencesLscTranslator.model_id
    /** @type {boolean} */
    this.isTranslating = false

    /** @type {string} */
    this.minimized = localStorage.getItem('isMinimized') || 'true'
    /**
     * Top pos for iris container 
     * @type {string}
     */
    this.irisTop = localStorage.getItem('irisTopPos') || 'calc(100% - 49px)'
    /**
     * Left pos for iris container 
     * @type {string}
     */
    this.irisLeft = localStorage.getItem('irisLeftPos') || 'calc(100% - 340px)'

    /** @type {HTMLElement} */
    this.containerIris = document.getElementById('container-iris')    
    /** @type {HTMLElement} */    
    this.containerBodyIris = document.getElementById('container-body-iris')
    /** @type {HTMLElement} */    
    this.minimizeIrisButton = document.getElementById('minimize-iris')
    /** @type {HTMLElement} */    
    this.maximizeIrisButton = document.getElementById('maximize-iris')
    /** @type {HTMLElement} */    
    this.stopIrisButton = document.getElementById('stop-iris')
    /** @type {HTMLElement} */    
    this.pauseIrisButton = document.getElementById('pause-iris')
    /** @type {HTMLElement} */    
    this.playIrisButton = document.getElementById('play-iris')

    /** 
     * Array of images (signs) availables, containes images name.
     * @type {string[]}
     */
    this.images = imagesLscTranslator
    /** 
     * Signs that are composed of more than one word.
     * @type {string[]}
     */
    this.phrases = phrasesLscTranslator
    /**
     * Execute when there finished a traduction.
     * @returns {null}
     */
    this.onEnd = () => null

    $(this.containerIris).draggable({
      containment: "parent",
      scroll: false,
      create: () => {
        this.containerIris.style.top = this.irisTop,
        this.containerIris.style.left = this.irisLeft

        if (this.minimized == 'true') {
          this.minimize()
        } else {
          this.maximize()
        }

        this.containerIris.style.display = ''
      },
      stop: () => {
        localStorage.setItem('irisTopPos', this.containerIris.style.top)
        localStorage.setItem('irisLeftPos', this.containerIris.style.left)

        this.irisTop = localStorage.getItem('irisTopPos')
        this.irisLeft = localStorage.getItem('irisLeftPos')
      }
    });



    this._addEventChangeModel()
    this._addEventChangeSignSpeed()
    this._addEventClickTranslate()
    this._addEventClickPlay()
    this._addEventClickStop()
    this._addEventClickPause()
    this._addEventSelectionText()

    this._setValuesInLocalStorage()
    this._loadLscTranslator()
  }
  /**
   * Save preferences user of lsc translator in localStorage
   * @private
   * @returns {void}
   */
  _setValuesInLocalStorage() {
    localStorage.setItem('sign_speed', this.signSpeed)
    localStorage.setItem('model_id', this.modelId)
  }

  /**
   * It gives a value to each one of the options of the lsc translator and I execute 
   * each one of the functions so that the given value is reflected in the next traduction.
   * @private
   * @returns {void}
   */
  _loadLscTranslator() {
    document.getElementsByName('signSpeed')[0].value = parseInt(this.signSpeed)
    document.getElementsByName('signSpeed')[0].dispatchEvent(new Event('change'))

    document.querySelector(`input[name='LSC-translator-model'][value='${ this.modelId }']`).checked = true
    document.querySelector(`input[name='LSC-translator-model'][value='${ this.modelId }']`).dispatchEvent(new Event('change'))
  }

  /**
   * Listen change model radio buttons
   * @private
   * @returns {void}
   */
  _addEventChangeModel() {
    let optionsModel = document.querySelectorAll('input[name="LSC-translator-model"]')

    Array.prototype.forEach.call(optionsModel, opt => opt.addEventListener('change', this.changeModel))
  }
  /**
   * Listen change sign speed input
   * @private
   * @returns {void}
   */
  _addEventChangeSignSpeed() {
    let inputSignSpeed = document.getElementsByName('signSpeed')[0]

    inputSignSpeed.addEventListener('change', this.changeSignSpeed)
  }

  /**
   * Listen the click event in button for start translation
   * @private
   * @returns {void}
   */
  _addEventClickTranslate() {
    let button = document.getElementById('lscTranslate')

    button.addEventListener('click', this.translate.bind(this))
  }

  /**
   * Listen the click event in button for play translation
   * @private
   * @returns {void}
   */
  _addEventClickPlay() {
    this.playIrisButton.addEventListener('click', this.play.bind(this))
  }

  /**
   * Listen the click event in button for pause translation
   * @private
   * @returns {void}
   */
  _addEventClickPause() {
    this.pauseIrisButton.addEventListener('click', this.pause.bind(this))
  }

  /**
   * Listen the click event in button for stop translation
   * @private
   * @returns {void}
   */
  _addEventClickStop() {
    this.stopIrisButton.addEventListener('click', this.stop.bind(this))
  }

  /**
   * Listen the selection text event, the selected text will be traduced
   * @private
   * @returns {void}
   */
  _addEventSelectionText() {
    if(window.idView == 'lo_view') {
      learningObject.getDocument().onmouseup = () => { this.setSelectionText(learningObject.getDocument()) }
    }
    document.onmouseup = () => { this.setSelectionText(document) }
  }

  /**
   * Fix each of the options of the lsc translator to its default value.
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

    document.getElementsByName('signSpeed')[0].value = 20
    document.getElementsByName('signSpeed')[0].setAttribute('default', true)
    document.getElementsByName('signSpeed')[0].dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='LSC-translator-model'][value='1']`).checked = true
    document.querySelector(`input[name='LSC-translator-model']`).setAttribute('default', true)
    document.querySelector(`input[name='LSC-translator-model'][value='1']`).dispatchEvent(new Event('change'))
  
    if(!all) {
      window.accessibilityBar.updatePreferencesLscTranslator({
        sign_speed: 20,
        model_id: 1
      })
    }
  }

  /**
   * Apply changes model interprete and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeModel() {
    let optSelectedElm = Array.from(document.getElementsByName('LSC-translator-model')).filter(radioOption => radioOption.checked)[0]
    let modelSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    this.modelId = modelSelected

    if (this.modelId != parseInt(localStorage.getItem('model_id')) && !isDefault) {
      window.accessibilityBar.updatePreferencesLscTranslator({
        model_id: this.modelId
      })
    }

    optSelectedElm.setAttribute('default', false)
    localStorage.setItem('model_id', this.modelId)
  }

  /**
   * Apply changes to new sign speed and update value in accessibility bar data
   * @public
   * @returns {void}
   */
  changeSignSpeed() {
    let inputSignSpeed = document.getElementsByName('signSpeed')[0]
    let signSpeed = parseInt(inputSignSpeed.value)
    let isDefault = inputSignSpeed.default == 'true'
    this.signSpeed = signSpeed

    if (this.signSpeed != parseInt(localStorage.getItem('sign_speed')) && !isDefault) {
      window.accessibilityBar.updatePreferencesLscTranslator({
        sign_speed: this.signSpeed
      })
    }

    inputSignSpeed.setAttribute('default', false)

    localStorage.setItem('sign_speed', this.signSpeed)
  }
  /**
   * Method for minimize iris window
   * @public
   * @returns {void}
   */
  minimize() {
    $(this.containerBodyIris).slideUp('fast', () => {
      this.containerIris.style.height = '49px'
      this.containerIris.style.paddingTop = '9px'
      this.minimizeIrisButton.style.display = 'none'
      this.maximizeIrisButton.style.display = ''
    })

    localStorage.setItem('isMinimized', true)
    this.minimized = true
  }

  /**
   * Methos for maximize iris window
   * @public
   * @returns {void}
   */
  maximize() {
    let maxVwHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    if (maxVwHeight - parseInt(this.containerIris.style.top) < 475) {
      this.containerIris.style.top = '155px'
    }

    this.minimizeIrisButton.style.display = ''
    this.maximizeIrisButton.style.display = 'none'
    this.containerIris.style.height = '475px'
    this.containerIris.style.paddingTop = '10px'
    $(this.containerBodyIris).slideDown('fast')

    localStorage.setItem('isMinimized', false)
    this.minimized = false
  }
  /**
   * change all occurrences of search in string with replacement
   * @param {string} string - where will I make the changes
   * @param {string} search - what I am going to change
   * @param {string} replacement - so it changes
   */
  replaceAll(string, search, replacement) {
    return string.split(search).join(replacement);
  }

  /**
   * Change words in text for special signs, phrases that has a special sign.
   * For example:
   * For text = "habia un producto cartesiano en el punto de resistencia"
   * return "había un producto_cartesiano en el punto_de_resistencia"
   * @param {string} text - words
   * @public
   * @returns {string} - text with special signs
   */
  specialSigns(text) {
    let copyText = this.replaceAll(text, /  +/g, ' ')
    let re

    for (let iPhrase = 0; iPhrase < this.phrases.length; iPhrase++) {
      const normalPhrase = this.phrases[iPhrase];
      const underscorePhrase = this.replaceAll(normalPhrase, ' ', '_')

      re = new RegExp('\\b' + normalPhrase + '\\b');
      copyText = this.replaceAll(copyText, re, underscorePhrase);
    }

    return copyText
  }

  /**
   * Remove special characters of text.
   * @param {string} text - text that going to be cleaned
   * @public
   * @returns {string} text - text cleaned
   */
  prepareText(text) {
    let copyText = text

    copyText = copyText.toLowerCase()
    copyText = this.replaceAll(copyText, 'á', 'a')
    copyText = this.replaceAll(copyText, 'é', 'e')
    copyText = this.replaceAll(copyText, 'í', 'i')
    copyText = this.replaceAll(copyText, 'ó', 'o')
    copyText = this.replaceAll(copyText, 'ú', 'u')
    copyText = this.replaceAll(copyText, 'ñ', 'n-')
    copyText = this.replaceAll(copyText, '+', 'mas')
    copyText = this.replaceAll(copyText, /[.,\?\¿\/#!¡$%\^&\*;:{}=\-_`~()]/g, "")
    copyText = this.replaceAll(copyText, /\s{2,}/g, " ")

    copyText = copyText.trim()

    return copyText
  }

  /**
   * Returns an array with the name of the images that will be used to make 
   * the translation. If a word has a sign, it returns it; otherwise 
   * it will return the sign of each of the letters that make up that word.
   * For example:
   * For text = "poco me gusta la pasta ser platon"
   * return [
   *  "p/poco.jpg",
   *  "alfabeto/m.jpg",
   *  "alfabeto/e.jpg",
   *  "alfabeto/g.jpg",
   *  "alfabeto/u.jpg",
   *  "alfabeto/s.jpg",
   *  "alfabeto/t.jpg",
   *  "alfabeto/a.jpg",
   *  "alfabeto/l.jpg",
   *  "alfabeto/a.jpg",
   *  "p/pasta.jpg",
   *  "s/ser.jpg",
   *  "p/platon.jpg"
   * ]
   * @param {*} text
   * @public
   * @return {string[]}
   */
  splitWordsInValidSigns(text) {
    let imagesPath = []
    let imagesLetter = []
    let imagesNumbers = this.images.numeros

    const words = text.split(' ')

    for (let iWord = 0; iWord < words.length; iWord++) {
      const word = words[iWord]
      imagesLetter = this.images[word[0]]

      if (imagesNumbers.indexOf(word + ".jpg") != -1) {
        imagesPath.push("numeros" + '/' + imagesNumbers[imagesNumbers.indexOf(word + '.jpg')])
      } else if (imagesLetter.indexOf(word + '.jpg') != -1) {
        imagesPath.push(word[0] + '/' + imagesLetter[imagesLetter.indexOf(word + '.jpg')])
      } else {
        let alfabeto = this.images.alfabeto

        for (let iLetter = 0; iLetter < word.length; iLetter++) {
          imagesPath.push('alfabeto/' + alfabeto[alfabeto.indexOf(word[iLetter] + '.jpg')])
        }
      }
    }
    return imagesPath;
  }

  /**
   * The clips are created with each of the signs to be interpreted
   * @param {string[]} signsName - array with valid signs names
   * @public
   * @returns {void}
   */
  loadImages(signsName) {
    let base = `${ accessibilityBar.url }asset/img/lengua/`

    for (let index = 0; index < signsName.length; index++) {
      const element = signsName[index]

      if ((index + 1) < signsName.length) {
        this.clips[index] = {
          src: base + element,
          frames: 13,
          cols: 1,
          loops: 1,
          fps: this.signSpeed,
          onEnd: () => {
            // as it is not the last sign, to give the sensation of video we reproduce immediately the other sign
            this.canvidControl.play(index + 1);
          }
        };
      } else {
        this.clips[index] = {
          src: base + element,
          frames: 13,
          cols: 1,
          loops: 1,
          fps: this.signSpeed,
          onEnd: () => {
            this.canvidControl.destroy()
            this.stopIrisButton.style.display = 'none'
            this.playIrisButton.style.display = 'none'
            this.pauseIrisButton.style.display = 'none'
            this.isTranslating = false
            this.onEnd()
            this.onEnd = () => null
          }
        };
      }
    }

    this.canvidControl = canvid({
      selector: '.video',
      videos: this.clips,
      width: 320,
      height: 240,
      loaded: () => {
        this.canvidControl.play(0)
        this.isTranslating = true
        this.pauseIrisButton.style.display = ''
        this.stopIrisButton.style.display = ''
      }
    });
  }

  /**
   * Undo the selection of text made by the user.
   * @public
   * @returns {void}
   */
  forgetUserSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) { // Chrome
        window.getSelection().empty()
      } else if (window.getSelection().removeAllRanges) { // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) { // IE?
      document.selection.empty();
    }

    /*if (window.idView === 'lo_view') {
      if (learningObject.getDocument().getSelection) {
        if (learningObject.getDocument().getSelection().empty) { // Chrome
          learningObject.getDocument().empty();
        } else if (learningObject.getDocument().removeAllRanges) { // Firefox
          learningObject.getDocument().removeAllRanges()
        }
      }
    }*/
  }
  /**
   * Load selection text in text input of lsc translator.
   * @public
   * @returns {void}
   */
  setSelectionText(doc) {
    let selection = (doc.all) ? (doc.selection.createRange().text) : doc.getSelection()
    selection = selection.toString()

    let selectionText = selection

    if (selectionText.length > 0) {
      document.getElementById('input-iris').value = selectionText
      this.forgetUserSelection()
      this.translate()
    }
  }

  /**
   * Convert numbers to words.
   * @param {string} text
   * @public
   * @returns {string}
   */
  cleanNumbers(text) {
    let copyText = text;
    let numbersInString = copyText.match(/\d+/g);


    if (numbersInString) {
      numbersInString = numbersInString.map(Number);

      for (let index = 0; index < numbersInString.length; index++) {
        const element = numbersInString[index];

        copyText = this.replaceAll(copyText, element, writtenNumber(element, {
          lang: "es"
        }));
      }
    }

    return copyText;
  }

  /**
   * Play current interpretation
   * @public
   * @returns {void}
   */
  play() {
    this.pauseIrisButton.style.display = ''
    this.playIrisButton.style.display = 'none'
    this.canvidControl.resume()
  }
  /**
   * Pause current interpretation
   * @public
   * @returns {void}
   */
  pause() {
    this.pauseIrisButton.style.display = 'none'
    this.playIrisButton.style.display = ''
    this.canvidControl.pause()
  }

  /**
   * Stop current interpretation
   * @public
   * @returns {void}
   */
  stop() {
    this.pauseIrisButton.style.display = 'none'
    this.playIrisButton.style.display = 'none'
    this.stopIrisButton.style.display = 'none'
    this.isTranslating = false
    this.canvidControl.destroy()
    this.onEnd()
  }
  /**
   * Main translate function
   * @param {string} txt - texto that going to be traduced
   * @public
   * @returns {void}
   */
  translate(txt) {
    let text = document.getElementById('input-iris').value || txt

    if (this.isTranslating) {
      this.stop()
    }

    if (this.minimized == 'true') {
      return;
    } else {
      this.loadImages(this.splitWordsInValidSigns(this.specialSigns(this.cleanNumbers(this.prepareText(text)))));
    }
  }
}
