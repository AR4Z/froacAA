class LscTranslator {
  constructor(preferencesLscTranslator) {
    this.canvidControl
    this.clips = []
    this.signSpeed = preferencesLscTranslator.sign_speed
    this.modelId = preferencesLscTranslator.model_id
    this.isTranslating = false

    this.minimized = localStorage.getItem('isMinimized') || 'true'
    this.irisTop = localStorage.getItem('irisTopPos') || 'calc(100% - 49px)'
    this.irisLeft = localStorage.getItem('irisLeftPos') || 'calc(100% - 340px)'

    this.containerIris = document.getElementById('container-iris')    
    this.containerBodyIris = document.getElementById('container-body-iris')
    this.minimizeIrisButton = document.getElementById('minimize-iris')
    this.maximizeIrisButton = document.getElementById('maximize-iris')
    this.stopIrisButton = document.getElementById('stop-iris')
    this.pauseIrisButton = document.getElementById('pause-iris')
    this.playIrisButton = document.getElementById('play-iris')

    this.images = imagesLscTranslator
    this.phrases = phrasesLscTranslator
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

  _addEventClickTranslate() {
    let button = document.getElementById('lscTranslate')

    button.addEventListener('click', this.translate.bind(this))
  }

  _addEventClickPlay() {
    this.playIrisButton.addEventListener('click', this.play.bind(this))
  }

  _addEventClickPause() {
    this.pauseIrisButton.addEventListener('click', this.pause.bind(this))
  }

  _addEventClickStop() {
    this.stopIrisButton.addEventListener('click', this.stop.bind(this))
  }

  _addEventSelectionText() {
    document.onmouseup = this.setSelectionText.bind(this)
  }

  setDefaultValues(all) {
    document.getElementsByName('signSpeed')[0].value = 20
    document.getElementsByName('signSpeed')[0].setAttribute('default', true)
    document.getElementsByName('signSpeed')[0].dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='LSC-translator-model'][value='1']`).checked = true
    document.querySelector(`input[name='LSC-translator-model']`).setAttribute('default', true)
    document.querySelector(`input[name='LSC-translator-model'][value='1']`).dispatchEvent(new Event('change'))
  
    if(!all) {
      accessibilityBar.updatePreferencesLscTranslator({
        sign_speed: 20,
        model_id: 1
      })
    }
  }

  changeModel() {
    let optSelectedElm = Array.from(document.getElementsByName('LSC-translator-model')).filter(radioOption => radioOption.checked)[0]
    let modelSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    this.modelId = modelSelected

    if (this.modelId != parseInt(localStorage.getItem('model_id')) && !isDefault) {
      accessibilityBar.updatePreferencesLscTranslator({
        model_id: this.modelId
      })
    }

    optSelectedElm.setAttribute('default', false)
    localStorage.setItem('model_id', this.modelId)
  }

  changeSignSpeed() {
    let inputSignSpeed = document.getElementsByName('signSpeed')[0]
    let signSpeed = parseInt(inputSignSpeed.value)
    let isDefault = inputSignSpeed.default == 'true'
    this.signSpeed = signSpeed

    if (this.signSpeed != parseInt(localStorage.getItem('sign_speed')) && !isDefault) {
      accessibilityBar.updatePreferencesLscTranslator({
        sign_speed: this.signSpeed
      })
    }

    inputSignSpeed.setAttribute('default', false)

    localStorage.setItem('sign_speed', this.signSpeed)
  }

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

  replaceAll(string, search, replacement) {
    return string.split(search).join(replacement);
  }

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

  prepareText(text) {
    let copyText = text;

    copyText = copyText.toLowerCase();
    copyText = this.replaceAll(copyText, 'á', 'a');
    copyText = this.replaceAll(copyText, 'é', 'e');
    copyText = this.replaceAll(copyText, 'í', 'i');
    copyText = this.replaceAll(copyText, 'ó', 'o');
    copyText = this.replaceAll(copyText, 'ú', 'u');
    copyText = this.replaceAll(copyText, 'ñ', 'n-');

    copyText = this.replaceAll(copyText, /[.,\?\¿\/#!¡$%\^&\*;:{}=\-_`~()]/g, "");
    copyText = this.replaceAll(copyText, /\s{2,}/g, " ");

    copyText = copyText.trim();

    return copyText;
  }

  splitWordsInValidSigns(text) {
    let imagesPath = [];
    let imagesLetter = [];
    let imagesNumbers = this.images.numeros;

    const words = text.split(' ');

    for (let iWord = 0; iWord < words.length; iWord++) {
      const word = words[iWord];
      imagesLetter = this.images[word[0]];

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


  loadImages(signsName) {
    let base = `${ accessibilityBar.url }asset/img/lengua/`

    for (let index = 0; index < signsName.length; index++) {
      const element = signsName[index];

      if ((index + 1) < signsName.length) {
        this.clips[index] = {
          src: base + element,
          frames: 13,
          cols: 1,
          loops: 1,
          fps: this.signSpeed,
          onEnd: () => {
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

  forgetUserSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) { // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) { // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) { // IE?
      document.selection.empty();
    }

    if (idView === "lo_view") {
      if (iframeDocument.getSelection) {
        if (iframeDocument.getSelection().empty) { // Chrome
          iframeDocument.getSelection().empty();
        } else if (iframeDocument.getSelection().removeAllRanges) { // Firefox
          iframeDocument.getSelection().removeAllRanges();
        }
      }
    }
  }

  setSelectionText() {
    let selection = (document.all) ? (document.selection.createRange().text) : document.getSelection()
    selection = selection.toString()

    let selectionText = selection

    if (selectionText.length > 0) {
      document.getElementById('input-iris').value = selectionText
      this.forgetUserSelection()
      this.translate()
    }
  }

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

  play() {
    this.pauseIrisButton.style.display = ''
    this.playIrisButton.style.display = 'none'
    this.canvidControl.resume()
  }

  pause() {
    this.pauseIrisButton.style.display = 'none'
    this.playIrisButton.style.display = ''
    this.canvidControl.pause()
  }

  stop() {
    this.pauseIrisButton.style.display = 'none'
    this.playIrisButton.style.display = 'none'
    this.stopIrisButton.style.display = 'none'
    this.isTranslating = false
    this.canvidControl.destroy()
    this.onEnd()
  }

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
