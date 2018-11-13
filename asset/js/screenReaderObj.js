class ScreenReader {
  constructor(preferencesScreenReader) {
    this.speedReadingId = preferencesScreenReader.speed_reading_id
    this.pitchId = preferencesScreenReader.pitch_id
    this.volumeId = preferencesScreenReader.volume_id
    this.voiceGenderId = preferencesScreenReader.voice_gender_id
    this.linksId = preferencesScreenReader.links_id
    
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

    Array.prototype.forEach.call(optionsSpeedReading, opt => opt.addEventListener('change', this.changeSpeedReading))
  }

  _addEventChangePitch() {
    let optionsPitch = document.querySelectorAll('input[name="pitch-sr"]')

    Array.prototype.forEach.call(optionsPitch, opt => opt.addEventListener('change', this.changePitch))
  }

  _addEventChangeVolume() {
    let optionsVolume = document.querySelectorAll('input[name="volume-sr"]')

    Array.prototype.forEach.call(optionsVolume, opt => opt.addEventListener('change', this.changeVolume))
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

    if(!all) {
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

    if(this.speedReadingId != localStorage.getItem('speed_reading_sr') && !isDefault) {
      accessibilityBar.updatePreferencesScreenReader({
        speed_reading_id: this.speedReadingId
      })
    }

    optSelectedElm.setAttribute('default', false)

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

    if(this.pitchId != localStorage.getItem('pitch_id_sr') && !isDefault) {
      accessibilityBar.updatePreferencesScreenReader({
        pitch_id: this.pitchId
      })
    }
    
    optSelectedElm.setAttribute('default', false)

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

    if(this.volumeId != localStorage.getItem('volume_id_sr') && !isDefault) {
      accessibilityBar.updatePreferencesScreenReader({
        volume_id: this.volumeId
      })
    }
    
    optSelectedElm.setAttribute('default', false)

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

    if(this.voiceGenderId != localStorage.getItem('voice_gender_id_sr') && !isDefault) {
      accessibilityBar.updatePreferencesScreenReader({
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

    if(this.linksId != localStorage.getItem('links_id_sr') && !isDefault) {
      accessibilityBar.updatePreferencesScreenReader({
        links_id: this.linksId
      })
    }
   
    optSelectedElm.setAttribute('default', false)

    localStorage.setItem('links_id_sr', this.voiceLinksId)
  }
}
