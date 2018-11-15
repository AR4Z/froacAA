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
        if (data.path_lo == '404') {
          document.getElementById('name-lo').style.display = 'none'
          document.getElementById('error').style.display = ''
          window.loading_screen.finish()
        } else {
          this.iframeElement.onload = () => {
            this.setLanguage()
            this.createAccessibilityBar()
            document.getElementById('div-lo').style.display = ''
            window.loading_screen.finish()
          }
          this.iframeElement.src = `${ base_url }LOs/${data.path_lo}?time=${Date.now()}`
        }
      })
      .catch(() => window.loading_screen.finish())
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
      .catch(e => window.loading_screen.finish())
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
          en: 'english',
          es: 'spanish',
          pt: 'portuguese'
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

    if (this.language == language) {
      let iframeDocument = this.getDocument()

      try {
        iframeDocument.getElementById(":2.container").contentWindow.document.getElementById(":2.restore").click();
      } catch (e) {
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

  createAccessibilityBar() {
    accessibilityBar.fetchDataAccessibilityBar()
    .then(data => {
      accessibilityBar.dataAccessibilityBar = data
      accessibilityBar.createAccessibilityElements()
      
      if(accessibilityBar.needStructuralNavigation) {
        accessibilityBar.structuralNavigation.htmlTableOfContents(this.getDocument())
      }

      /*if(accessibilityBar.needNarrator) {
        accessibilityBar.narrator._loadTreeNarrator()
      }*/
    })
    .catch(e => console.error(e))
  }
}
