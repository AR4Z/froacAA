/** Class representing Learning Object */
class LearningObject {
  /**
   * Create Learning Object.
   * @param {sting} url - learning object src
   * @param {string} name - learning object name
   */
  constructor(url, name, idLO, idRep, userLORank) {
    this.url = url;
    this.name = name;
    this.idLO = idLO;
    this.idRep = idRep;
    this.userLORank = userLORank;
  
    /** @type {HTMLElement} */
    this.iframeElement = document.getElementById('oa')
    this.ratingLO;
    this.cloneLearningObject()
      .then(data => {
        let idTaskCloneLo = data.id_task_clone_lo

        if (idTaskCloneLo) {
          // check cloning process status every second
          this.refreshId = setInterval(() => {
            this.checkCloneStatus(idTaskCloneLo)
          }, 1000)
        } else {
          this.loadLearningObjet(data.path_lo)
        }

      })
      .catch((e) => console.error(e))
  }
  /**
   * Get the html document of the current learning object.
   * @public
   * @returns {Document}
   */
  getDocument() {
    return this.iframeElement.contentWindow.document
  }

  /**
   * Set the src attribute to the iframe and check that the accessibility bar and the 
   * translation of the learning object are done once the iframe has 
   * finished loading so that the changes are also applied to the learning object.
   * @param {string} path_lo - path to the main file of the learning object 
   * @returns {void}
   */
  loadLearningObjet(path_lo) {
    this.iframeElement.onload = () => {
      this.setLanguage()
      this.createAccessibilityBar()
      // show div that contains iframe element
      document.getElementById('div-lo').style.display = ''
      // hide loading_screen splash
      window.loading_screen.finish()
      // object for rate lo
      this.ratingLO = new RatingLO(this.idLO, this.idRep, this.userLORank);
    }

    // use ?time=Date.now so that the iframe document is not loaded from the cache
    this.iframeElement.src = `${base_url}LOs/${path_lo}?time=${Date.now()}`
  }

  /**
   * In charge of cloning the learning object on the server, basically a request 
   * is made in which the name and url of the learning object that is required is sent, 
   * the server will check if the object already exists, in case there is a return a json 
   * with an attribute called path_lo with the path to the main file of the iframe to be loaded, 
   * otherwise it will try to clone it so it will return a json with an attribute called id_task_clone_lo 
   * so that we review there the status of the cloning process.
   * @public
   * @returns {Promise}
   */
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
        return r.json()
      })
      .catch(e => window.loading_screen.finish())
  }

  /**
   * Will check if the cloning process is finished.
   * There are two states to inform us about the cloning process
   *  -SUCCESS => Finish satisfactorily
   *  -PENDING => There still not terminated
   * if cloning process fail then status its 404 and show messages error,
   * otherwise the learning object will be loaded.
   * @param {string} task_clone_id
   * @returns {Promise}
   */
  checkCloneStatus(task_clone_id) {
    let fetchData = {
      method: 'GET',
    }
    return fetch(`http://127.0.0.1:8000/v1/lo/${task_clone_id}`, fetchData)
      .then(r => {
        if (r.status == 404) {
          // remove the interval that is responsible for reviewing the status of the cloning process
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
  /**
   * Get the language of the learning object
   * @public
   * @returns {Promise}
   */
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

    return fetch(`${window.base_url}lo/getLanguage`, fetchData)
      .then(r => r.json())
      .catch(e => console.error(e))
  }

  /**
   * set language property based on language of the learning object
   * @public
   * @returns {void}
   */
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

  /**
   * Using a google translator script that is embedded in the cloning process of the 
   * learning object translates that object.
   * @param {string} language - language to which you want to translate the object of learning
   * @returns {void}
   */
  translate(language) {
    let validLanguages = {
      english: 'Inglés',
      spanish: 'Español',
      portuguese: 'Portugués'
    }
    let validLanguage = validLanguages[language]

    // check if the language to be translated and the language of the learning object are the same
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

  /**
   * create the accessibility bar
   * @public
   * @returns {void}
   */
  createAccessibilityBar() {
    window.accessibilityBar.fetchDataAccessibilityBar()
      .then(data => {
        window.accessibilityBar.dataAccessibilityBar = data
        window.accessibilityBar.createAccessibilityElements()
      })
      .catch(e => console.error(e))
  }
}