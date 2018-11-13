class LearningObject {
  constructor(url, name) {
    this.url = url
    this.name = name
    this.iframeElement = document.getElementById('oa')
    
    this.loadLearningObject()
  }

  getDocument() {
    return this.iframeElement.contentWindow.document
  }

  loadLearningObject() {
    this.proccessLearningObject()
    .then(data => {
      data = JSON.parse(data)
      if(data.path_lo == '404') {
        $('#loading').fadeOut(50);
        $('#name-lo').fadeOut(50);
        $('#error').fadeIn(600);
      } else {
        this.iframeElement.src = `${ base_url }LOs/${data.path_lo}?time=${Date.now()}`
        this.document = this.iframeElement.contentWindow.document
        $('#loading').fadeOut(50);
        $('#div-lo').fadeIn(600);
      }
      
    })
  }

  proccessLearningObject() {
    let fetchData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: this.url,
        name: this.name
      })
    }
  
    return fetch(`${ base_url }lo/getLO`, fetchData)
    .then(r => r.json())
    .catch(e => console.error(e))
  }

  getLanguage() {
    let fetchData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: this.url,
        name: this.name
      })
    }
  
    return fetch(`${ base_url }lo/getLanguage`, fetchData)
    .then(r => r.json())
    .catch(e => console.error(e))
  }

  setLanguage() {
    this.getLanguage()
    .then(data => {
      let languages = {
        en:'english',
        es:'spanish',
        pt:'portuguese'
      }

      this.language = languages[data.language]
      this.translate(userLang)
    })
    .catch(e => console.error(e))
  }

  translate(language) {
    let validLanguages = {
      english: 'Inglés',
      spanish: 'Español',
      portuguese: 'Portugués'
    }
    let validLanguage = validLanguages[language]
    
    if(this.language == language) {
      let iframeDocument = this.getDocument()
      
      try {
        iframeDocument.getElementById(":2.container").contentWindow.document.getElementById(":2.restore").click();
      } catch(e) {
        console.error(e)
      }
    } else {
      try {
        this.iframeElement.contentWindow.translate(validLanguage)
      } catch {
        this.iframeElement.contentWindow.translate(validLanguage.toLowerCase())        
      }
    }
  }
}
