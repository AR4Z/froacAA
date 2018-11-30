class LearningObject {
  constructor(url, name) {
    this.url = url
    this.name = name
    this.iframeElement = document.getElementById('oa')

    this.processLearningObject()
  }

  getDocument() {
    return this.iframeElement.contentWindow.document
  }

  processLearningObject() {
    this.cloneLearningObject()
      .then(data => {
        let idTaskCloneLo = data.id_task_clone_lo

        if (idTaskCloneLo) {
          this.refreshId = setInterval(() => {
            this.checkCloneStatus(idTaskCloneLo)
          }, 1000)
        } else {
          this.loadLearningObjet(data.path_lo)
        }

      })
      .catch((e) => console.error(e))
  }

  loadLearningObjet(path_lo) {
    this.iframeElement.onload = () => {
      this.setLanguage()
      this.createAccessibilityBar()
      document.getElementById('div-lo').style.display = ''
      window.loading_screen.finish()
    }

    this.iframeElement.src = `${ base_url }LOs/${ path_lo }?time=${ Date.now() }`
  }

  cloneLearningObject() {
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

    return fetch('http://127.0.0.1:8000/v1/lo/', fetchData)
      .then(r => {
        if (r.status == 200) {
          return r.json()
        }
      })
      .catch(e => window.loading_screen.finish())
  }

  checkCloneStatus(task_clone_id) {
    let fetchData = {
      method: 'GET',
    }
    return fetch(`http://127.0.0.1:8000/v1/lo/${ task_clone_id }`, fetchData)
      .then(r => {
        if (r.status == 404) {
          clearInterval(this.refreshId)
          document.getElementById('name-lo').style.display = 'none'
          document.getElementById('error').style.display = ''
          window.loading_screen.finish()
          return Promise.reject()
        } else {
          return r.json()
        }
      })
      .then(data => {
        if (data.status == 'SUCCESS') {
          clearInterval(this.refreshId)
          this.loadLearningObjet(data.path_lo)
        }
      })
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
          en: 'english',
          es: 'spanish',
          pt: 'portuguese'
        }

        this.language = languages[data.language]
        this.translate(window.userLang)
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
    window.accessibilityBar.fetchDataAccessibilityBar()
      .then(data => {
        window.accessibilityBar.dataAccessibilityBar = data
        window.accessibilityBar.createAccessibilityElements()
      })
      .catch(e => console.error(e))
  }
}
