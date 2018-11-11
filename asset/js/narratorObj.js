class Narrator {
  constructor(preferencesNarrator) {
    this.speedReading = preferencesNarrator.speed_reading
    this.pitch = preferencesNarrator.pitch_nr
    this.volume = preferencesNarrator.volume_id
    this.voiceGenderId = preferencesNarrator.voice_gender_id
    this.linksId = preferencesNarrator.links_id
    this.highlightId = preferencesNarrator.highlight_id
    this.readingUnitId = preferencesNarrator.reading_unit_id
    
    this._addEventChangeSpeedReading()
    this._addEventChangePitch()
    this._addEventChangeVolume()
    this._addEventChangeVoiceGender()
    this._addEventChangeLinks()
    this._addEventChangeHighlight()
    this._addEventChangeReadingUnit()

    this._setValuesInLocalStorage()
    this._loadNarrator()
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

  changeSpeedReading() {
    let optionSpeedSelected = parseInt(Array.from(document.getElementsByName('speed-nr')).filter(radioOption => radioOption.checked)[0].value)
    let validSpeeds = {
      1: 0.5,
      2: 1,
      3: 2
    }
    let validSpeed = validSpeeds[optionSpeedSelected]
    this.speedReading = optionSpeedSelected

    if(this.speedReading != localStorage.getItem('speed_reading_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        speed_reading: this.speedReading
      })
    }

    localStorage.setItem('speed_reading_nr', this.speedReading)
  }

  changePitch() {
    let optionPitchSelected = parseInt(Array.from(document.getElementsByName('pitch-nr')).filter(radioOption => radioOption.checked)[0].value)
    let validPitchs = {
      1: 0.5,
      2: 1,
      3: 2
    }
    let validPitch = validPitchs[optionPitchSelected]
    this.pitch = optionPitchSelected

    if(this.pitch != localStorage.getItem('pitch_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        pitch_nr: this.pitch
      })
    }
    
    localStorage.setItem('pitch_nr', this.pitch)
  }

  changeVolume() {
    let optionVolumeSelected = parseInt(Array.from(document.getElementsByName('volume-narrator')).filter(radioOption => radioOption.checked)[0].value)
    let validVolumes = {
      1: 0.2,
      2: 0.5,
      3: 1
    }
    let validVolume = validVolumes[optionVolumeSelected]
    this.volume = optionVolumeSelected

    if(this.volume != localStorage.getItem('volume_id_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        volume_id: this.volume
      })
    }
    
    localStorage.setItem('volume_id_nr', this.volume)
  }

  changeVoiceGender() {
    let optionGenderSelected = parseInt(Array.from(document.getElementsByName('gender-narrator')).filter(radioOption => radioOption.checked)[0].value)
    let validGenders = {
      1: 'f5',
      2: 'm7'
    }
    let validGender = validGenders[optionGenderSelected]
    this.voiceGenderId = optionGenderSelected

    if(this.voiceGenderId != localStorage.getItem('voice_gender_id_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        voice_gender_id: this.voiceGenderId
      })
    }
    
    localStorage.setItem('voice_gender_id_nr', this.voiceGenderId)
  }

  changeLinks() {
    let optionLinkSelected = parseInt(Array.from(document.getElementsByName('gender-narrator')).filter(radioOption => radioOption.checked)[0].value)
    this.linksId = optionLinkSelected

    if(this.linksId != localStorage.getItem('links_id_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        links_id: this.linksId
      })
    }
    
    localStorage.setItem('links_id_nr', this.voiceLinksId)
  }

  changeHighlight() {
    let optionHighlightSelected = parseInt(Array.from(document.getElementsByName('highlight-narrator')).filter(radioOption => radioOption.checked)[0].value)
    let validHighlights = {
      1: 'word',
      2: 'line',
      3: 'sentence',
      4: 'paragraph'
    }

    let validHighlight = validHighlights[optionHighlightSelected]
    this.highlightId = optionHighlightSelected

    if(this.highlightId != localStorage.getItem('highlight_id_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        highlight_id: this.highlightId
      })
    }
    
    localStorage.setItem('highlight_id_nr', this.highlightId)
  }

  changeReadingUnit() {
    let optionReadingUnitSelected = parseInt(Array.from(document.getElementsByName('reading-unit-narrator')).filter(radioOption => radioOption.checked)[0].value)
    this.readingUnitId = optionReadingUnitSelected

    if(this.readingUnitId != localStorage.getItem('reading_unit_id_nr')) {
      accessibilityBar.updatePreferencesNarrator({
        reading_unit_id: this.readingUnitId
      })
    }
    
    localStorage.setItem('reading_unit_id_nr', this.readingUnitId)
  }
}
