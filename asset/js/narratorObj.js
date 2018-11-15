class Narrator {
  constructor(preferencesNarrator) {
    this.speedReading = preferencesNarrator.speed_reading
    this.pitch = preferencesNarrator.pitch_nr
    this.volume = preferencesNarrator.volume_id
    this.voiceGenderId = preferencesNarrator.voice_gender_id
    this.linksId = preferencesNarrator.links_id
    this.highlightId = preferencesNarrator.highlight_id
    this.readingUnitId = preferencesNarrator.reading_unit_id

    this.learningObjectDocument = learningObject.getDocument()
    this.configVoice = {
      rate: this.speedReading,
      pitch: this.pitch,
      volume: this.volume
    }

    this.srClass = {
      'sr-av': true,
      'js-sr-av': true,
    }
    
    this.synth = window.speechSynthesis
    this.tree = undefined
    this.queue = []
    this.elmLining = undefined
    this.currentElements = []
    this.voices = this.synth.getVoices()

    this._addEventChangeSpeedReading()
    this._addEventChangePitch()
    this._addEventChangeVolume()
    this._addEventChangeVoiceGender()
    this._addEventChangeLinks()
    this._addEventChangeHighlight()
    this._addEventChangeReadingUnit()

    this._setValuesInLocalStorage()
    this._loadNarrator()
    this._loadLineStyle()

    hotkeys('ctrl+e', (event, handler) => {
      event.preventDefault() 
      this._narrator()
    });

    this._loadTreeNarrator()
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('speed_reading_nr', this.speedReading)
    localStorage.setItem('pitch_nr', this.pitch)
    localStorage.setItem('volume_id_nr', this.volume)
    localStorage.setItem('voice_gender_id_nr', this.voiceGenderId)
    localStorage.setItem('links_id_nr', this.linksId)
    localStorage.setItem('highlight_id_nr', this.highlightId)
    localStorage.setItem('reading_unit_id_nr', this.readingUnitId)
  }

  _loadNarrator() {
    document.querySelector(`input[name='speed-nr'][value='${ this.speedReading }']`).checked = true
    document.querySelector(`input[name='speed-nr'][value='${ this.speedReading }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='pitch-nr'][value='${ this.pitch }']`).checked = true
    document.querySelector(`input[name='pitch-nr'][value='${ this.pitch }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='volume-narrator'][value='${ this.volume }']`).checked = true
    document.querySelector(`input[name='volume-narrator'][value='${ this.volume }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='gender-narrator'][value='${ this.voiceGenderId }']`).checked = true
    document.querySelector(`input[name='gender-narrator'][value='${ this.voiceGenderId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='link-narrator'][value='${ this.linksId }']`).checked = true
    document.querySelector(`input[name='link-narrator'][value='${ this.linksId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='highlight-narrator'][value='${ this.highlightId }']`).checked = true
    document.querySelector(`input[name='highlight-narrator'][value='${ this.highlightId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='reading-unit-narrator'][value='${ this.readingUnitId }']`).checked = true
    document.querySelector(`input[name='reading-unit-narrator'][value='${ this.readingUnitId }']`).dispatchEvent(new Event('change'))
  }

  _addEventChangeSpeedReading() {
    let optionsSpeedReading = document.querySelectorAll('input[name="speed-nr"]')

    Array.prototype.forEach.call(optionsSpeedReading, opt => opt.addEventListener('change', this.changeSpeedReading))
  }

  _addEventChangePitch() {
    let optionsPitch = document.querySelectorAll('input[name="pitch-nr"]')

    Array.prototype.forEach.call(optionsPitch, opt => opt.addEventListener('change', this.changePitch))
  }

  _addEventChangeVolume() {
    let optionsVolume = document.querySelectorAll('input[name="volume-narrator"]')

    Array.prototype.forEach.call(optionsVolume, opt => opt.addEventListener('change', this.changeVolume))
  }

  _addEventChangeVoiceGender() {
    let optionsGender = document.querySelectorAll('input[name="gender-narrator"]')

    Array.prototype.forEach.call(optionsGender, opt => opt.addEventListener('change', this.changeVoiceGender))
  }

  _addEventChangeLinks() {
    let optionsLinks = document.querySelectorAll('input[name="links-narrator"]')

    Array.prototype.forEach.call(optionsLinks, opt => opt.addEventListener('change', this.changeLinks))
  }

  _addEventChangeHighlight() {
    let optionsHighlight = document.querySelectorAll('input[name="highlight-narrator"]')

    Array.prototype.forEach.call(optionsHighlight, opt => opt.addEventListener('change', this.changeHighlight))
  }

  _addEventChangeReadingUnit() {
    let optionsReadingUnit = document.querySelectorAll('input[name="reading-unit-narrator"]')

    Array.prototype.forEach.call(optionsReadingUnit, opt => opt.addEventListener('change', this.changeReadingUnit))
  }

  setDefaultValues(all) {
    document.querySelector(`input[name='speed-nr']`).setAttribute('default', true)
    document.querySelector(`input[name='speed-nr'][value='2']`).checked = true
    document.querySelector(`input[name='speed-nr'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='pitch-nr']`).setAttribute('default', true)
    document.querySelector(`input[name='pitch-nr'][value='2']`).checked = true
    document.querySelector(`input[name='pitch-nr'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='volume-narrator']`).setAttribute('default', true)
    document.querySelector(`input[name='volume-narrator'][value='2']`).checked = true
    document.querySelector(`input[name='volume-narrator'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='gender-narrator']`).setAttribute('default', true)
    document.querySelector(`input[name='gender-narrator'][value='1']`).checked = true
    document.querySelector(`input[name='gender-narrator'][value='1']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='link-narrator']`).setAttribute('default', true)
    document.querySelector(`input[name='link-narrator'][value='1']`).checked = true
    document.querySelector(`input[name='link-narrator'][value='1']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='highlight-narrator']`).setAttribute('default', true)
    document.querySelector(`input[name='highlight-narrator'][value='1']`).checked = true
    document.querySelector(`input[name='highlight-narrator'][value='1']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='reading-unit-narrator']`).setAttribute('default', true)
    document.querySelector(`input[name='reading-unit-narrator'][value='1']`).checked = true
    document.querySelector(`input[name='reading-unit-narrator'][value='1']`).dispatchEvent(new Event('change'))

    if (!all) {
      accessibilityBar.updatePreferencesNarrator({
        speed_reading: 2,
        pitch_nr: 2,
        volume_id: 2,
        voice_gender_id: 1,
        links_id: 1,
        highlight_id: 1,
        reading_unit_id: 1
      })
    }
  }

  changeSpeedReading() {
    let optSelectedElm = Array.from(document.getElementsByName('speed-nr')).filter(radioOption => radioOption.checked)[0]
    let optionSpeedSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validSpeeds = {
      1: 0.5,
      2: 1,
      3: 2
    }
    let validSpeed = validSpeeds[optionSpeedSelected]
    this.speedReading = optionSpeedSelected

    if (this.speedReading != localStorage.getItem('speed_reading_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        speed_reading: this.speedReading
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('speed_reading_nr', this.speedReading)
  }

  changePitch() {
    let optSelectedElm = Array.from(document.getElementsByName('pitch-nr')).filter(radioOption => radioOption.checked)[0]
    let optionPitchSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validPitchs = {
      1: 0.5,
      2: 1,
      3: 2
    }
    let validPitch = validPitchs[optionPitchSelected]
    this.pitch = optionPitchSelected

    if (this.pitch != localStorage.getItem('pitch_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        pitch_nr: this.pitch
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('pitch_nr', this.pitch)
  }

  changeVolume() {
    let optSelectedElm = Array.from(document.getElementsByName('volume-narrator')).filter(radioOption => radioOption.checked)[0]
    let optionVolumeSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validVolumes = {
      1: 0.2,
      2: 0.5,
      3: 1
    }
    let validVolume = validVolumes[optionVolumeSelected]
    this.volume = optionVolumeSelected

    if (this.volume != localStorage.getItem('volume_id_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        volume_id: this.volume
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('volume_id_nr', this.volume)
  }

  changeVoiceGender() {
    let optSelectedElm = Array.from(document.getElementsByName('gender-narrator')).filter(radioOption => radioOption.checked)[0]
    let optionGenderSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validGenders = {
      1: 'f5',
      2: 'm7'
    }
    let validGender = validGenders[optionGenderSelected]
    this.voiceGenderId = optionGenderSelected

    if (this.voiceGenderId != localStorage.getItem('voice_gender_id_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        voice_gender_id: this.voiceGenderId
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('voice_gender_id_nr', this.voiceGenderId)
  }

  changeLinks() {
    let optSelectedElm = Array.from(document.getElementsByName('link-narrator')).filter(radioOption => radioOption.checked)[0]
    let optionLinkSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    this.linksId = optionLinkSelected

    if (this.linksId != localStorage.getItem('links_id_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        links_id: this.linksId
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('links_id_nr', this.voiceLinksId)
  }

  changeHighlight() {
    let optSelectedElm = Array.from(document.getElementsByName('highlight-narrator')).filter(radioOption => radioOption.checked)[0]
    let optionHighlightSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validHighlights = {
      1: 'word',
      2: 'line',
      3: 'sentence',
      4: 'paragraph'
    }

    let validHighlight = validHighlights[optionHighlightSelected]
    this.highlightId = optionHighlightSelected

    if (this.highlightId != localStorage.getItem('highlight_id_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        highlight_id: this.highlightId
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('highlight_id_nr', this.highlightId)
  }

  changeReadingUnit() {
    let optSelectedElm = Array.from(document.getElementsByName('reading-unit-narrator')).filter(radioOption => radioOption.checked)[0]
    let optionReadingUnitSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    this.readingUnitId = optionReadingUnitSelected

    if (this.readingUnitId != localStorage.getItem('reading_unit_id_nr') && !isDefault) {
      accessibilityBar.updatePreferencesNarrator({
        reading_unit_id: this.readingUnitId
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('reading_unit_id_nr', this.readingUnitId)
  }

  _shouldBeignored(node) {
    let currentNode = node;
    while (currentNode) {
      if (this.srClass[$(currentNode).attr('class')]) {
        return true;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return false;
  }

  _cleanText(txt) {
    if (txt[0] == '-') {
      txt = '\\' + txt;
    }
    return txt;
  }

  _createQueue(texts) {
    for (let iText = 0; iText < texts.length; iText++) {
      const text = texts[iText]

      this.queue[iText] = new SpeechSynthesisUtterance(text);
      this.queue[iText].onstart = this._clearQueue.bind(this);
      this.queue[iText].onend = this._next.bind(this);
      this.queue[iText].pitch = this.configVoice.pitch;
      this.queue[iText].volume = this.configVoice.volume;
      this.queue[iText].rate = this.configVoice.rate;

      if (learningObject.language == 'en') {
        this.queue[iText].lang = 'en-GB';
        this.queue[iText].voice = this.voices[57];
      } else if (learningObject.language == 'pt') {
        this.queue[iText].lang = 'pt-BR'
        this.queue[iText].voice = this.voices[46];
      } else {
        this.queue[iText].lang = 'es-419';
        this.queue[iText].voice = this.voices[65];
      }
    }
  }

  _loadLineStyle() {
    let linesStyle = `
    <style id='line-style'>
        .reading {
            background-color: yellow;
        }
    </style>`

    let learningObjectHead = learningObject.getDocument().querySelector('head')
    learningObjectHead.append(linesStyle)
  }

  _isAllWhiteSpaces() {
    return !(/[^\t\n\r ]/.test(nod.textContent.trim()));
  }

  _isValidNode(node) {
    if (this._shouldBeignored(node)) {
      return false;
    }

    if (node.parentElement.tagName == 'OPTION') {
      return false;
    }

    if ($(node.parentElement).is(':hidden') && !$(node.parentElement).is(':visible')) {
      return false;
    }

    if (node.parentElement.tagName == 'SCRIPT') {
      return false;
    }

    if (this._isAllWhiteSpaces(node)) {
      return false;
    }

    return true;
  }

  _loadTreeNarrator() {
    let filterNodes = {
      acceptNode: node => {
        if (this._isValidNode(node)) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_SKIP;
        }
      }
    }
    let learningObjectBody = this.learningObjectDocument.querySelector('body')

    this.tree = this.learningObjectDocument.createTreeWalker(learningObjectBody,
      NodeFilter.SHOW_TEXT,
      filterNodes,
      false)
  }


  _getParentLine(node) {
    return node.getElementsByTagName('TEXT-LINE')[0] || node.closest('TEXT-LINE');
  }

  _splitInLines(node) {
    this.elmLining = lining(node, {
      autoResize: true,
      lineClass: 'my-line'
    })

    if (node.getElementsByTagName('text-line').length != 0) {
      return node.getElementsByTagName('text-line');
    } else {
      this.tree.nextNode();
      return [this._getParentLine(node)]
    }
  }

  _splitInSentences(node) {
    $(node).blast({
      delimiter: "sentence",
      search: false,
      tag: "span",
      customClass: "sentence",
      generateIndexID: true,
      generateValueClass: false,
      stripHTMLTags: false,
      returnGenerated: false,
      aria: true
    });

    let sentenceElms = Array.prototype.slice.call(node.getElementsByClassName('sentence'), 0);
    let validSentenceElms = sentenceElms.filter(sentenceElm => $(sentenceElm).is(':visible') && !$(sentenceElm).is(':hidden'));

    return validSentenceElms;
  }

  _splitInWords(node) {
    $(node).blast({
      delimiter: "word",
      search: false,
      tag: "span",
      customClass: "word",
      generateIndexID: true,
      generateValueClass: false,
      stripHTMLTags: false,
      returnGenerated: false,
      aria: true
    });

    let wordElms = Array.prototype.slice.call(node.getElementsByClassName('word'), 0);
    let validWordElms = wordElms.filter(wordElm => $(wordElm).is(':visible') && !$(wordElm).is(':hidden'));

    return validWordElms;
  }

  _removeHighlightText() {
    let currentReadElements = this.learningObjectDocument.querySelectorAll('.reading')

    Array.from(currentReadElements).map(elm => {
      elm.classList.remove('reading')
    })
  }

  _highlightText(listHtmlElements) {
    listHtmlElements.map(elm => {
      elm.classList.add('reading')
    })
  }

  _clearQueue() {
    this._removeHighlightText()
    this._highlightText(this.currentElements[0])
    this.queue.splice(0, 1);
    this.currentElements.splice(0, 1);
  }

  _play() {
    console.log(this.queue)
    this.synth.speak(this.queue[0]);
  }

  _next() {
    if (this.queue.length >= 1) {
      this._play();
    } else {
      if (this.tree.nextNode()) {
        try {
          this.learningObjectDocument.querySelector('.blast-root').blast(false)
          this.elmLining.unlining();
        } catch (e) {
          console.error(e)
        }
        this._narrator()
      }
    }
  }

  _narrator() {
    let textForSpeech = []
    this._removeHighlightText();

    switch (this.readingUnitId) {
      case 1:
        {
          switch (this.highlightId) {
            case 1:
              {
                let HTMLwords = this._splitInWords(this.tree.currentNode.parentNode);
                console.log(HTMLwords)
                textForSpeech = [];
                this.currentElements = [];

                for (let iWord = 0; iWord < HTMLwords.length; iWord++) {
                  const wordElement = HTMLwords[iWord];
                  let txt = this._cleanText(wordElement.textContent);
                  textForSpeech.push(txt);
                  this.currentElements.push([wordElement]);
                }

                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];

                break;
              }
            case 2:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                textForSpeech = [];
                this.currentElements = [];

                Array.from(HTMLlines).forEach(() => {
                  this.tree.nextNode()
                })

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const lineElement = HTMLlines[iLine];
                  let words = lineElement.textContent.split(' ');

                  for (let iWord = 0; iWord < words.length; iWord++) {
                    let txt = this._cleanText(words[iWord]);

                    textForSpeech.push(txt);
                    this.currentElements.push([lineElement]);
                  }
                }
                break;
              }
            case 3:
              {
                let HTMLSentences = this._splitInSentences(this.tree.currentNode.parentNode);
                textForSpeech = [];
                this.currentElements = [];

                for (let i = 0; i < HTMLSentences.length; i++) {
                  this.tree.nextNode();
                }

                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                  const sentenceElement = HTMLSentences[iSentence];
                  let words = sentenceElement.textContent.split(' ');

                  for (let iWord = 0; iWord < words.length; iWord++) {
                    var txt = this._cleanText(words[iWord]);

                    textForSpeech.push(txt);
                    this.currentElements.push([sentenceElement]);
                  }

                }
                break;
              }
            case 4:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                textForSpeech = [];
                this.currentElements = [];

                for (let i = 0; i < HTMLlines.length - 1; i++) {
                  this.tree.nextNode();
                }

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const lineElement = HTMLlines[iLine];
                  let words = lineElement.textContent.split(' ');

                  for (let iWord = 0; iWord < words.length; iWord++) {
                    var txt = this._cleanText(words[iWord]);

                    textForSpeech.push(txt);
                    this.currentElements.push(HTMLlines);
                  }
                }
                break;
              }
          }
          break;
        }
      case 2:
        {
          switch (this.highlightId) {
            case 1:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                let HTMLWords = [];
                textForSpeech = [];
                this.currentElements = [];

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  HTMLWords.push(this._splitInWords(HTMLlines[iLine]));
                }

                for (let iWords = 0; iWords < HTMLWords.length; iWords++) {
                  const wordsLineElements = HTMLWords[iWords];
                  for (let iWord = 0; iWord < wordsLineElements.length; iWord++) {
                    let txt = this._cleanText(wordsLineElements[iWord].textContent);

                    textForSpeech.push(txt);
                    this.currentElements.push([wordsLineElements[iWord]]);
                  }
                }
                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];
                break;
              }
            case 2:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                textForSpeech = [];
                this.currentElements = [];

                for (let i = 0; i < HTMLlines.length - 1; i++) {
                  this.tree.nextNode();
                }

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const lineElement = HTMLlines[iLine];

                  textForSpeech.push(lineElement.textContent);
                  this.currentElements.push([lineElement]);
                }

                break;
              }
            case 3:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                let HTMLSentences = [];
                textForSpeech = [];
                this.currentElements = [];

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  HTMLSentences.push(this._splitInSentences(HTMLlines[iLine]));
                }

                for (let iSentences = 0; iSentences < HTMLSentences.length; iSentence++) {
                  const sentencesLineElements = HTMLSentences[iSentences];

                  for (let iSentence = 0; iSentence < sentencesLineElements.length; iSentence++) {
                    let txt = this._cleanText(sentencesLineElements[iSentence].textContent);

                    textForSpeech.push(txt);
                    this.currentElements.push([sentencesLineElements[iSentence]]);
                  }
                }
                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];
                break;
              }
            case 4:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                textForSpeech = [];
                this.currentElements = [];

                for (let i = 0; i < HTMLlines.length - 1; i++) {
                  this.tree.nextNode();
                }

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const lineElement = HTMLlines[iLine];

                  textForSpeech.push(lineElement.textContent);
                  this.currentElements.push(HTMLlines);
                }
                break;
              }
          }
          break;
        }
      case 3:
        {
          switch (this.highlightId) {
            case 1:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                let HTMLWords = [];
                textForSpeech = [];
                this.currentElements = [];

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  HTMLWords.push(this._splitInWords(HTMLlines[iLine]));
                }

                for (let iWords = 0; iWords < HTMLWords.length; iWords++) {
                  const wordsLineElements = HTMLWords[iWords];
                  for (let iWord = 0; iWord < wordsLineElements.length; iWord++) {
                    let txt = this._cleanText(wordsLineElements[iWord].textContent);

                    textForSpeech.push(txt);
                    this.currentElements.push([wordsLineElements[iWord]]);
                  }
                }
                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];
                break;
              }
            case 2:
              {
                let HTMLlines = Array.prototype.slice.call(this._splitInLines(this.tree.currentNode.parentNode), 0);
                this.currentElements = [];
                textForSpeech = [];
                let HTMLSentences = [];

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  HTMLSentences.push(this._splitInSentences(HTMLlines[iLine]));
                }

                for (let iSentences = 0; iSentences < HTMLSentences.length; iSentences++) {
                  const sentencesInLineElements = HTMLSentences[iSentences];

                  for (let iSentence = 0; iSentence < sentencesInLineElements.length; iSentence++) {
                    let txt = this._cleanText(sentencesInLineElements[iSentence].textContent);

                    textForSpeech.push(txt);
                    this.currentElements.push([this._getParentLine(sentencesInLineElements[iSentence])]);
                  }
                }

                this.tree.currentNode = HTMLSentences[(HTMLSentences.length - 1)][HTMLSentences[(HTMLSentences.length - 1)].length - 1].childNodes[0];
                break;
              }
            case 3:
              {
                let HTMLSentences = this._splitInSentences(this.tree.currentNode.parentNode);
                textForSpeech = [];
                this.currentElements = [];

                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                  const sentenceElement = HTMLSentences[iSentence];
                  let txt = this._cleanText(sentenceElement.textContent);

                  textForSpeech.push(txt);
                  this.currentElements.push([sentenceElement]);
                }

                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];
                break;
              }
            case 4:
              {

                let HTMLlines = Array.prototype.slice.call(splitInLines(this.tree.currentNode.parentNode), 0);
                let HTMLSentences = [];
                textForSpeech = [];
                this.currentElements = [];


                for (let i = 0; i < HTMLlines.length - 1; i++) {
                  this.tree.nextNode();
                }

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const sentencesInLineElements = splitInSentences(HTMLlines[iLine]);

                  for (let iSentences = 0; iSentences < sentencesInLineElements.length; iSentences++) {
                    HTMLSentences.push(sentencesInLineElements[iSentences]);
                  }
                }

                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                  const sentenceElement = HTMLSentences[iSentence];
                  let txt = this._cleanText(sentenceElement.textContent);

                  textForSpeech.push(txt);
                  this.currentElements.push(HTMLlines);
                }

                this.tree.currentNode = HTMLSentences[HTMLSentences.length - 1].childNodes[0];
                break;
              }
          }
          break;
        }
      case 4:
        {
          switch (this.highlightId) {
            case 1:
              {
                let HTMLwords = splitInWords(this.tree.currentNode.parentNode);
                textForSpeech = [];
                this.currentElements = [];

                for (let iWord = 0; iWord < HTMLwords.length; iWord++) {
                  const wordElement = HTMLwords[iWord];
                  let txt = cleanText(wordElement.textContent);
                  textForSpeech.push(txt);
                  this.currentElements.push([wordElement]);
                }

                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];

                break;
              }
            case 2:
              {
                let HTMLlines = Array.prototype.slice.call(splitInLines(this.tree.currentNode.parentNode), 0);
                textForSpeech = [];
                this.currentElements = [];

                for (let i = 0; i < HTMLlines.length - 1; i++) {
                  this.tree.nextNode();
                }

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const lineElement = HTMLlines[iLine];

                  textForSpeech.push(lineElement.textContent);
                  this.currentElements.push([lineElement]);
                }

                break;
              }
            case 3:
              {
                let HTMLSentences = splitInSentences(this.tree.currentNode.parentNode);
                textForSpeech = [];
                this.currentElements = [];

                for (let iSentence = 0; iSentence < HTMLSentences.length; iSentence++) {
                  const sentenceElement = HTMLSentences[iSentence];
                  let txt = this._cleanText(sentenceElement.textContent);

                  textForSpeech.push(txt);
                  this.currentElements.push([sentenceElement]);
                }

                this.tree.currentNode = this.currentElements[(this.currentElements.length - 1)][this.currentElements[(this.currentElements.length - 1)].length - 1].childNodes[0];
                break;
              }
            case 4:
              {
                let HTMLlines = Array.prototype.slice.call(splitInLines(this.tree.currentNode.parentNode), 0);
                let txt = "";
                textForSpeech = [];
                this.currentElements = [];


                for (let i = 0; i < HTMLlines.length - 1; i++) {
                  this.tree.nextNode();
                }

                for (let iLine = 0; iLine < HTMLlines.length; iLine++) {
                  const lineElement = HTMLlines[iLine];

                  txt += this._cleanText(lineElement.textContent);
                  this.currentElements.push(HTMLlines);
                }
                textForSpeech.push(txt);
                break;
              }
          }
          break;
        }
      default:
        break;
    }

    this._createQueue(textForSpeech);
    this._play()
  }
}
