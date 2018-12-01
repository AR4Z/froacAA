class ScreenReader {
  constructor(preferencesScreenReader) {
    this.speedReadingId = preferencesScreenReader.speed_reading_id
    this.pitchId = preferencesScreenReader.pitch_id
    this.volumeId = preferencesScreenReader.volume_id
    this.voiceGenderId = preferencesScreenReader.voice_gender_id
    this.linksId = preferencesScreenReader.links_id

    this.synth = window.speechSynthesis
    this.configVoice = {
      rate: undefined,
      pitch: undefined,
      volume: undefined
    }
    this.voices = this.synth.getVoices()
    this.messages = {}
    this._loadMessages()

    this.mappings = {
      a: 'link',
      button: 'button',
      h1: 'heading',
      h2: 'heading',
      h3: 'heading',
      h4: 'heading',
      h5: 'heading',
      p: 'paragraph',
      html: 'page',
      img: 'image',
      textbox: 'textbox',
      input: 'input',
      iframe: 'iframe',
    }

    this.announcers = {
      link(element) {
        return `${ this.messages[userLang].link }, ${ this._computeAccessibleName(element) }. ${ this.messages[userLang].follow_link }.`;
      },

      /*button(element) {
        return `${ this.messages[userLang][3] }, ${ this._computeAccessibleName( element ) }. ${ this.messages[userLang[4]] }.`;
      },*/

      heading(element) {
        const level = element.getAttribute('aria-level') || element.tagName[1]

        return `${ this.messages[userLang].level_heading } ${ level }, ${ this._computeAccessibleName( element ) }`
      },

      paragraph(element) {
        return element.textContent
      },

      image(element) {
        return `${ this.messages[userLang].image }, ${ this._computeAccessibleName( element ) }`
      },

      input(element) {
        if (element.type == 'text') {
          return `
          ${ this.messages[userLang].text_field }, ${ this._computeAccessibleName(element) }. 
          ${ this.messages[userLang].value }: 
          ${ element.value ? element.value :  this.messages[userLang].empty }. 
          ${ this.messages[userLang].write_in_field }.`
        } else if(element.type == 'search') {
          return `Campo de formulario para búsqueda valor...`
        }else if (element.type == 'password') {
          return `
          ${ this.messages[userLang].password_field }, ${this._computeAccessibleName(element) }. 
          ${ this.messages[userLang].state }: 
          ${ element.value ? this.messages[userLang].full : this.messages[userLang][9].empty }.
          ${ this.messages[userLang].write_in_field }.`
        } else if (element.type == 'checkbox') {
          return `
          ${ this.messages[userLang].checkbox }, ${ this._computeAccessibleName(element) }.
          ${ this.messages[userLang].state }:
          ${ element.checked ? this.messages[userLang].selected : this.messages[userLang].not_selected }.`
        } else if (element.type == 'radio') {
          return `${ this.messages[userLang].unique_option }, para ${ this._getText(document.getElementById(element.closest('fieldset').getAttribute('aria-labelledby'))) } ${this._computeAccessibleName(element)}. 
          ${ this.messages[userLang].state }:
          ${ element.checked ? this.messages[userLang].selected : this.messages[userLang].not_selected }.`
        } else if (element.type == 'number') {
          return `Campo de formulario tipo número: ${ this._computeAccessibleName(element) } Acepta valores desde ${ element.getAttribute('min') } hasta ${ element.getAttribute('max') }. ${element.value ? `Valor: ${ element.value }` :  this.messages[userLang][9]}. ${this.messages[userLang][10]}.`
        }
      },

      textbox(element) {
        if (element.type == "text") {
          return `${ this.messages[userLang][7] }: ${this._computeAccessibleName(element)}. ${ this.messages[userLang][8] }: ${element.value ? element.value :  this.messages[userLang][9]}. ${this.messages[userLang][10]}.`;
        } else if (element.type == "password") {
          return `${ this.messages[userLang][11] }: ${this._computeAccessibleName(element)}. ${ this.messages[userLang][12] }: ${element.value ? this.messages[userLang][13] : this.messages[userLang][9]}. ${this.messages[userLang][10]}.`;
        } else if (element.type == "checkbox") {
          return `${this.messages[userLang][14]}: ${this._computeAccessibleName(element)}. ${ this.messages[userLang][12] }: ${element.checked ? this.messages[userLang][15] : this.messages[userLang][16]}`;
        } else if (element.type == "radio") {
          return `${this.messages[userLang[18]]}: ${this._computeAccessibleName(element)}. ${ this.messages[userLang][12] }: ${element.checked ? this.messages[userLang][15]: this.messages[userLang][17]} `;
        }
      },

      iframe(element) {
        return `Iframe, ${ this._computeAccessibleName(element)}. ${ this.messages[userLang].iframe }`;
      },

      tab(element) {
        return `Tab, ${ this._computeAccessibleName(element) }. ${ element.getAttribute('aria-selected') == 'true' ? 'Activa' : 'Presione enter para activar'}`
      },

      button(element) {
        let textElement = this._getText(element)

        if(element.tagName != 'BUTTON' && element.tagName != 'A') {
          console.log("entry")
          element = this._isALink(element).nodeLink
        }

        if (element.getAttribute('aria-haspopup')) {
          return `Menu desplegable, ${ this._computeAccessibleName(element) }. ${ element.getAttribute('aria-expanded') != 'true' ? 'Presione enter para leer' : 'Presione ctrl + g para leer.'}`
        } else if (element.getAttribute('aria-expanded')) {
          return `Botón para abrir, ${ document.getElementById(element.getAttribute('aria-controls')).getAttribute('aria-label') }. ${ element.getAttribute('aria-expanded') != 'true' ? 'Presione enter para abrir y leer.' : 'Presione ctrl + g para leer.'}`
        } else if(element.getAttribute('aria-controls')) {
          return `Botón para controlar ${ document.getElementById(element.getAttribute('aria-controls')).getAttribute('aria-label') }. Descripción: ${ textElement }`
        }
      },

      default (element) {
        return `${ element.tagName }: ${ this._computeAccessibleName( element ) }`;
      }
    };

    this.tree = undefined
    this.manualMode = false
    this.utterance = undefined

    hotkeys('ctrl+d,ctrl+p,ctrl+s,ctrl+a,ctrl+f,ctrl+g', (event, handler) => {
      event.preventDefault()

      switch (handler.key) {
        case 'ctrl+d':
          if (this.synth.speaking) {
            this.synth.cancel()
          }

          if (this.manualMode) {
            this._next()
          }
          break
        case 'ctrl+p':
          this._previous()
          break
        case 'ctrl+s':
          this._loadTree()
          this.tree.nextNode()
          this._screenReader()
          break
        case 'ctrl+a':
          this._stop()
          break
        case 'ctrl+f':
          this._changeMode()
          break
        case 'ctrl+g':
          let currentNode = this.tree.currentNode

          if (currentNode.tagName == 'IFRAME') {
            this._loadTree(currentNode.contentWindow.document)
            this._screenReader()
          }
          break
      }
    })

    hotkeys.filter = () => {
      return true;
    }

    this._addEventChangeSpeedReading()
    this._addEventChangePitch()
    this._addEventChangeVolume()
    this._addEventChangeVoiceGender()
    this._addEventChangeLinks()

    this._setValuesInLocalStorage()
    this._loadScreenReader()
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('speed_reading_sr', this.speedReadingId)
    localStorage.setItem('pitch_id_sr', this.pitchId)
    localStorage.setItem('volume_id_sr', this.volumeId)
    localStorage.setItem('voice_gender_id_sr', this.voiceGenderId)
    localStorage.setItem('links_id_sr', this.linksId)
  }

  _loadScreenReader() {
    document.querySelector(`input[name='speed-sr'][value='${ this.speedReadingId }']`).checked = true
    document.querySelector(`input[name='speed-sr'][value='${ this.speedReadingId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='pitch-sr'][value='${ this.pitchId }']`).checked = true
    document.querySelector(`input[name='pitch-sr'][value='${ this.pitchId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='volume-sr'][value='${ this.volumeId }']`).checked = true
    document.querySelector(`input[name='volume-sr'][value='${ this.volumeId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='gender-sr'][value='${ this.voiceGenderId }']`).checked = true
    document.querySelector(`input[name='gender-sr'][value='${ this.voiceGenderId }']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='link-sr'][value='${ this.linksId }']`).checked = true
    document.querySelector(`input[name='link-sr'][value='${ this.linksId }']`).dispatchEvent(new Event('change'))
  }

  _addEventChangeSpeedReading() {
    let optionsSpeedReading = document.querySelectorAll('input[name="speed-sr"]')

    Array.prototype.forEach.call(optionsSpeedReading, opt => opt.addEventListener('change', this.changeSpeedReading.bind(this)))
  }

  _addEventChangePitch() {
    let optionsPitch = document.querySelectorAll('input[name="pitch-sr"]')

    Array.prototype.forEach.call(optionsPitch, opt => opt.addEventListener('change', this.changePitch.bind(this)))
  }

  _addEventChangeVolume() {
    let optionsVolume = document.querySelectorAll('input[name="volume-sr"]')

    Array.prototype.forEach.call(optionsVolume, opt => opt.addEventListener('change', this.changeVolume.bind(this)))
  }

  _addEventChangeVoiceGender() {
    let optionsGender = document.querySelectorAll('input[name="gender-sr"]')

    Array.prototype.forEach.call(optionsGender, opt => opt.addEventListener('change', this.changeVoiceGender))
  }

  _addEventChangeLinks() {
    let optionsLinks = document.querySelectorAll('input[name="links-sr"]')

    Array.prototype.forEach.call(optionsLinks, opt => opt.addEventListener('change', this.changeLinks))
  }

  setDefaultValues(all) {
    document.querySelector(`input[name='speed-sr']`).setAttribute('default', true)
    document.querySelector(`input[name='speed-sr'][value='2']`).checked = true
    document.querySelector(`input[name='speed-sr'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='pitch-sr']`).setAttribute('default', true)
    document.querySelector(`input[name='pitch-sr'][value='2']`).checked = true
    document.querySelector(`input[name='pitch-sr'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='volume-sr']`).setAttribute('default', true)
    document.querySelector(`input[name='volume-sr'][value='2']`).checked = true
    document.querySelector(`input[name='volume-sr'][value='2']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='gender-sr']`).setAttribute('default', true)
    document.querySelector(`input[name='gender-sr'][value='1']`).checked = true
    document.querySelector(`input[name='gender-sr'][value='1']`).dispatchEvent(new Event('change'))

    document.querySelector(`input[name='link-sr']`).setAttribute('default', true)
    document.querySelector(`input[name='link-sr'][value='1']`).checked = true
    document.querySelector(`input[name='link-sr'][value='1']`).dispatchEvent(new Event('change'))

    if (!all) {
      accessibilityBar.updatePreferencesScreenReader({
        speed_reading_id: 2,
        pitch_id: 2,
        volume_id: 2,
        voice_gender_id: 1,
        links_id: 2
      })
    }
  }

  changeSpeedReading() {
    let optSelectedElm = Array.from(document.getElementsByName('speed-sr')).filter(radioOption => radioOption.checked)[0]
    let optionSpeedSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validSpeeds = {
      1: 0.5,
      2: 1,
      3: 2
    }
    let validSpeed = validSpeeds[optionSpeedSelected]
    this.speedReadingId = optionSpeedSelected

    if (this.speedReadingId != localStorage.getItem('speed_reading_sr') && !isDefault) {
      window.accessibilityBar.updatePreferencesScreenReader({
        speed_reading_id: this.speedReadingId
      })
    }

    optSelectedElm.setAttribute('default', false)
    this.configVoice.rate = validSpeed
    localStorage.setItem('speed_reading_sr', this.speedReadingId)
  }

  changePitch() {
    let optSelectedElm = Array.from(document.getElementsByName('pitch-sr')).filter(radioOption => radioOption.checked)[0]
    let optionPitchSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validPitchs = {
      1: 0.5,
      2: 1,
      3: 2
    }
    let validPitch = validPitchs[optionPitchSelected]
    this.pitchId = optionPitchSelected

    if (this.pitchId != localStorage.getItem('pitch_id_sr') && !isDefault) {
      window.accessibilityBar.updatePreferencesScreenReader({
        pitch_id: this.pitchId
      })
    }

    optSelectedElm.setAttribute('default', false)
    this.configVoice.pitch = validPitch
    localStorage.setItem('pitch_id_sr', this.pitchId)
  }

  changeVolume() {
    let optSelectedElm = Array.from(document.getElementsByName('volume-sr')).filter(radioOption => radioOption.checked)[0]
    let optionVolumeSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validVolumes = {
      1: 0.2,
      2: 0.5,
      3: 1
    }
    let validVolume = validVolumes[optionVolumeSelected]
    this.volumeId = optionVolumeSelected

    if (this.volumeId != localStorage.getItem('volume_id_sr') && !isDefault) {
      window.accessibilityBar.updatePreferencesScreenReader({
        volume_id: this.volumeId
      })
    }

    optSelectedElm.setAttribute('default', false)
    this.configVoice.volume = validVolume
    localStorage.setItem('volume_id_sr', this.volumeId)
  }

  changeVoiceGender() {
    let optSelectedElm = Array.from(document.getElementsByName('gender-sr')).filter(radioOption => radioOption.checked)[0]
    let optionGenderSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    let validGenders = {
      1: 'f5',
      2: 'm7'
    }
    let validGender = validGenders[optionGenderSelected]
    this.voiceGenderId = optionGenderSelected

    if (this.voiceGenderId != localStorage.getItem('voice_gender_id_sr') && !isDefault) {
      window.accessibilityBar.updatePreferencesScreenReader({
        voice_gender_id: this.voiceGenderId
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('voice_gender_id_nr', this.voiceGenderId)
  }

  changeLinks() {
    let optSelectedElm = Array.from(document.getElementsByName('gender-sr')).filter(radioOption => radioOption.checked)[0]
    let optionLinkSelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    this.linksId = optionLinkSelected

    if (this.linksId != localStorage.getItem('links_id_sr') && !isDefault) {
      window.accessibilityBar.updatePreferencesScreenReader({
        links_id: this.linksId
      })
    }

    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('links_id_sr', this.voiceLinksId)
  }

  _loadMessages() {
    fetch(`${ base_url }/asset/js/srMessages.json`)
    .then(r => r.json())
    .then(data => this.messages = data)
    .catch(e => console.error(e))
  }

  _getText(element) {
    let parentElement = element;

    return [].reduce.call(parentElement.childNodes, function (a, b) {
      return a + (b.nodeType === 3 ? b.textContent : '');
    }, '').trim();
  }

  _isAllWhiteSpaces(node) {
    return !(/[^\t\n\r ]/.test(node.textContent.trim()));
  }

  _isValidNode(node) {
    if(this.elementIsVisible(this.parentElement(node)) && node.classList.contains('sr-only')) {
      return true
    }

    if (!this.elementIsVisible(node)) {
      return false
    }

    if (this.parentElement(node).tagName == 'LABEL') {
      return false
    }

    if (node.tagName == 'LABEL' || node.tagName == 'LEGEND') {
      return false
    }

    if (node.tagName != "INPUT" &&
      node.tagName != "IMG" &&
      node.tagName != "IFRAME" &&
      this._isAllWhiteSpaces(node)) {
      return false
    }

    if (node.tagName != "INPUT" &&
      node.tagName != "IMG" &&
      node.tagName != "IFRAME" &&
      this._getText(node) == '') {
      return false
    }

    return true
  }

  _loadTree(doc = document) {
    let filterNodes = {
      acceptNode: node => {
        if (this._isValidNode(node)) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_SKIP;
        }
      }
    }

    this.tree = doc.createTreeWalker(doc.querySelector('body'), NodeFilter.SHOW_ELEMENT, filterNodes, false)
  }

  _findLabelForControl(el, doc) {
    let idVal = el.id;
    let labels = doc.getElementsByTagName('label');

    for (var i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor == idVal && idVal != '') {
        return labels[i];
      }
    }
  }

  _computeAccessibleName(element) {
    let content = '';

    if (element.getAttribute('aria-label')) {
      return element.getAttribute('aria-label')
    } else if (element.getAttribute('aria-control')) {
      return element.getAttribute('aria-control')
    } else if (element.getAttribute("title")) {
      return element.getAttribute("title")
    } else if (element.getAttribute('alt')) {
      return element.getAttribute('alt')
    } else if (element.getAttribute('aria-labelledby') || this._findLabelForControl(element, document)) {
      let textLabel = this._getText(this._findLabelForControl(element, document)) || this._findLabelForControl(element, document).textContent      
      return textLabel
    }

    content = this._getText(element);
    return content;
  }

  _isALink(node) {
    let currentNode = node;

    while (currentNode) {
      if (currentNode.tagName == 'A') {
        return {
          isLink: true,
          nodeLink: currentNode,
        }
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return {
      isLink: false,
    }
  }

  _computeRole(element) {
    const name = element.tagName.toLowerCase()
    const ROLES = {
      radio: 'input',
      textbox: 'input'
    }
    
    if (element.getAttribute('role')) {
      return ROLES[element.getAttribute('role')] || element.getAttribute('role')
    } else if (this._isALink(element).isLink) {
      if(this._isALink(element).nodeLink != element) {
        return this._computeRole(this._isALink(element).nodeLink)
      } else {
        this.mappings['a']
      }
    }

    return this.mappings[name] || 'default'
  }

  _setStyle() {
    const node = this.tree.currentNode

    node.style.outline = "solid black"
  }

  _removeStyle() {
    const node = this.tree.currentNode

    node.style.outline = ''
  }

  _previous() {
    this._removeStyle()
    this.tree.previousNode()
    this.utterance.onend = undefined

    if (this.synth.speaking) {
      this.synth.cancel()
    }

    this._screenReader()
  }

  _next() {
    this._removeStyle()

    if (this.tree.nextNode()) {
      this._screenReader()
    } else {
      return
    }
  }

  _stop() {
    if (this.synth.speaking) {
      this._removeStyle()
      this.tree = undefined
      this.stop = true
      this.utterance.onend = undefined
      this.synth.cancel()
    }
  }

  _play() {
    this.synth.speak(this.utterance)
  }

  _changeMode() {
    if (this.manualMode) {
      this.manualMode = false;
      this._next()
    } else {
      this.manualMode = true;
      this.utterance.onend = undefined
    }
  }

  _screenReader() {
    let node = this.tree.currentNode
    let role = this._computeRole(node)
    let text = ''

    if (this.announcers[role].bind(this)) {
      text = this.announcers[role].bind(this)(node)
    } else {
      text = this.announcers.default(node).bind(this)
    }

    if ((node.tagName == "INPUT" || node.tagName == "IFRAME") && !this.manualMode) {
      this._changeMode()
    }

    if (node.tagName != 'A' && this._isALink(node).isLink) {
      this._isALink(node).nodeLink.focus();
    } else {
      node.focus();
    }

    this.utterance = new SpeechSynthesisUtterance(text)

    if (!this.manualMode) {
      this.utterance.onend = this._next.bind(this)
    }

    this.utterance.pitch = this.configVoice.pitch
    this.utterance.volume = this.configVoice.volume
    this.utterance.rate = this.configVoice.rate

    if (userLang == 'english') {
      this.utterance.lang = 'en-GB'
      this.utterance.voice = this.voices[57]
    } else if (userLang == 'portuguese') {
      this.utterance.lang = 'pt-BR'
      this.utterance.voice = this.voices[46]
    } else {
      this.utterance.lang = 'es-419'
      this.voice = this.voices[65]
    }

    this._setStyle()
    this._play()
  }

  shadowHost(fragment) {
    if ('host' in fragment) {
      return fragment.host
    }

    return null
  }

  composedParentNode(node) {
    if (!node) {
      return null
    }
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return this.shadowHost(node)
    }

    let parentNode = node.parentNode;
    if (!parentNode) {
      return null
    }

    if (parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return this.shadowHost(parentNode)
    }

    if (!parentNode.shadowRoot) {
      return parentNode
    }

    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
      let assignedSlot = node.assignedSlot

      if (HTMLSlotElement && assignedSlot instanceof HTMLSlotElement) {
        return this.composedParentNode(assignedSlot)
      }
    }

    if (typeof node.getDestinationInsertionPoints === 'function') {
      let insertionPoints = node.getDestinationInsertionPoints()

      if (insertionPoints.length > 0) {
        return this.composedParentNode(insertionPoints[insertionPoints.length - 1])
      }
    }

    return null
  }

  elementIsTransparent(element) {
    return element.style.opacity == '0'
  }

  elementHasZeroArea(element) {
    let rect = element.getBoundingClientRect()
    let width = rect.right - rect.left
    let height = rect.top - rect.bottom

    if (!width || !height) {
      return true
    }

    return false
  }

  isAncestor(ancestor, node) {
    if (node == null) {
      return false
    }
    if (node === ancestor) {
      return true
    }

    let parentNode = this.composedParentNode(node)
    return this.isAncestor(ancestor, parentNode)
  }

  overlappingElements(element) {
    if (this.elementHasZeroArea(element)) {
      return null
    }

    let overlappingElements = []
    let clientRects = element.getClientRects()
    for (let i = 0; i < clientRects.length; i++) {
      let rect = clientRects[i]
      let center_x = (rect.left + rect.right) / 2
      let center_y = (rect.top + rect.bottom) / 2
      let elementAtPoint = document.elementFromPoint(center_x, center_y)

      if (elementAtPoint == null || elementAtPoint == element ||
        this.isAncestor(elementAtPoint, element) ||
        this.isAncestor(element, elementAtPoint)) {
        continue
      }

      let overlappingElementStyle = window.getComputedStyle(elementAtPoint, null)
      if (!overlappingElementStyle) {
        continue
      }

      let overlappingElementBg = this.getBgColor(overlappingElementStyle, elementAtPoint)
      if (overlappingElementBg && overlappingElementBg.alpha > 0 &&
        overlappingElements.indexOf(elementAtPoint) < 0) {
        overlappingElements.push(elementAtPoint)
      }
    }

    return overlappingElements
  }

  elementIsVisible(element) {
    if (this.elementIsTransparent(element)) {
      return false
    }
    if (this.elementHasZeroArea(element)) {
      return false
    }

    let overlappingElements = this.overlappingElements(element)
    if (overlappingElements.length) {
      return false
    }

    return true
  }

  getBgColor(style, element) {
    let bgColorString = style.backgroundColor;
    let bgColor = this.parseColor(bgColorString);

    if (!bgColor) {
      return null
    }

    if (style.opacity < 1) {
      bgColor.alpha = bgColor.alpha * style.opacity
    }

    if (bgColor.alpha < 1) {
      let parentBg = this.getParentBgColor(element)
      if (parentBg == null) {
        return null
      }

      bgColor = this.flattenColors(bgColor, parentBg)
    }

    return bgColor
  }

  flattenColors(fgColor, bgColor) {
    let alpha = fgColor.alpha
    let r = ((1 - alpha) * bgColor.red) + (alpha * fgColor.red)
    let g = ((1 - alpha) * bgColor.green) + (alpha * fgColor.green)
    let b = ((1 - alpha) * bgColor.blue) + (alpha * fgColor.blue)
    let a = fgColor.alpha + (bgColor.alpha * (1 - fgColor.alpha))

    return new Color(r, g, b, a)
  }

  parseColor(colorString) {
    if (colorString === "transparent") {
      return new Color(0, 0, 0, 0);
    }

    let rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/
    let match = colorString.match(rgbRegex)

    if (match) {
      let r = parseInt(match[1], 10)
      let g = parseInt(match[2], 10)
      let b = parseInt(match[3], 10)
      let a = 1

      return new Color(r, g, b, a);
    }

    let rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/
    match = colorString.match(rgbaRegex)

    if (match) {
      let r = parseInt(match[1], 10)
      let g = parseInt(match[2], 10)
      let b = parseInt(match[3], 10)
      let a = parseFloat(match[4])

      return new Color(r, g, b, a)
    }

    return null
  }


  getParentBgColor(element) {
    let parent = element
    let bgStack = []
    let foundSolidColor = null

    while ((parent = this.parentElement(parent))) {
      let computedStyle = window.getComputedStyle(parent, null)
      if (!computedStyle) {
        continue
      }

      let parentBg = this.parseColor(computedStyle.backgroundColor)
      if (!parentBg) {
        continue
      }

      if (computedStyle.opacity < 1) {
        parentBg.alpha = parentBg.alpha * computedStyle.opacity
      }

      if (parentBg.alpha == 0) {
        continue
      }

      bgStack.push(parentBg)

      if (parentBg.alpha == 1) {
        foundSolidColor = true
        break
      }
    }

    if (!foundSolidColor) {
      bgStack.push(new Color(255, 255, 255, 1))
    }

    let bg = bgStack.pop()
    while (bgStack.length) {
      let fg = bgStack.pop()
      bg = this.flattenColors(fg, bg)
    }

    return bg
  }

  composedParentNode(node) {
    if (!node) {
      return null
    }
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return this.shadowHost(node)
    }

    let parentNode = node.parentNode
    if (!parentNode) {
      return null
    }

    if (parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return this.shadowHost(parentNode)
    }

    if (!parentNode.shadowRoot) {
      return parentNode
    }

    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
      let assignedSlot = node.assignedSlot

      if (HTMLSlotElement && assignedSlot instanceof HTMLSlotElement)
        return this.composedParentNode(assignedSlot)
    }

    if (typeof node.getDestinationInsertionPoints === 'function') {
      let insertionPoints = node.getDestinationInsertionPoints()

      if (insertionPoints.length > 0)
        return this.composedParentNode(insertionPoints[insertionPoints.length - 1])
    }

    return null
  }


  parentElement(node) {
    if (!node) {
      return null
    }

    let parentNode = this.composedParentNode(node)
    if (!parentNode) {
      return null
    }

    switch (parentNode.nodeType) {
      case Node.ELEMENT_NODE:
        return parentNode
      default:
        return this.parentElement(parentNode)
    }
  }
}
