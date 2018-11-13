class StructuralNavigation {
  constructor(preferencesStructuralNavigation) {
    this.navStrategyId = preferencesStructuralNavigation.nav_strategy_id
    this.showToc = preferencesStructuralNavigation.showtoc
    
    this.minimized = localStorage.getItem('isMinimizedToc') || 'true'
    this.tocTop = localStorage.getItem('tocTopPos')
    this.tocLeft = localStorage.getItem('tocLeftPos')
    
    this.containerBodyToc = document.getElementById('container-body-toc')
    this.containerToc = document.getElementById('container-toc')
    this.minimizeTocButton = document.getElementById('minimize-toc')
    this.maximizeTocButton = document.getElementById('maximize-toc')

    $(this.containerToc).draggable({
      containment: "parent",
      scroll: false,
      create: () => {
        this.containerToc.style.top = this.tocTop,
          this.containerToc.style.left = this.tocLeft

        if (this.minimized == 'true') {
          this.minimize()
        } else {
          this.maximize()
        }
      },
      stop: () => {
        localStorage.setItem('tocTopPos', this.containerToc.style.top)
        localStorage.setItem('tocLeftPos', this.containerToc.style.left)

        this.tocTop = localStorage.getItem('tocTopPos')
        this.tocLeft = localStorage.getItem('tocLeftPos')
      },
    });
    
    if(idView != 'lo_view'){
      this.htmlTableOfContents()
    }
    
    this._addEventChangeNavStrategy()
    this._addEventChangeShowToc()
    this._addEventClickMaximize()
    this._addEventClickMinimize()

    this._setValuesInLocalStorage()
    this._loadStructuralNavigation()
  }

  _setValuesInLocalStorage() {
    localStorage.setItem('nav_strategy_id', this.navStrategyId)
    localStorage.setItem('show_toc', this.showToc)
  }

  _loadStructuralNavigation() {
    document.querySelector(`input[name='navigation-strategy'][value='${ this.navStrategyId }']`).checked = true
    document.querySelector(`input[name='navigation-strategy'][value='${ this.navStrategyId }']`).dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='showTOC']`).checked = this.showToc == 't' || this.showToc == 'true' ? true : false
    document.querySelector(`input[name='showTOC']`).dispatchEvent(new Event('change'))
  }

  _addEventChangeNavStrategy() {
    let optionsNavStrategy = document.querySelectorAll('input[name="navigation-strategy"]')
    
    Array.prototype.forEach.call(optionsNavStrategy, opt => opt.addEventListener('change', this.changeNavStrategy))
  }

  _addEventChangeShowToc() {
    let checkboxShowToc = document.getElementsByName('showTOC')[0]
    
    checkboxShowToc.addEventListener('change', this.changeShowToc.bind(this))
  }

  _addEventClickMaximize() {
    this.maximizeTocButton.addEventListener('click', this.maximize.bind(this))
  }

  _addEventClickMinimize() {
    this.minimizeTocButton.addEventListener('click', this.minimize.bind(this))
  }

  setDefaultValues(all) {
    document.querySelector(`input[name='navigation-strategy']`).setAttribute('default', true)
    document.querySelector(`input[name='navigation-strategy'][value='1']`).checked = true
    document.querySelector(`input[name='navigation-strategy'][value='1']`).dispatchEvent(new Event('change'))
  
    document.querySelector(`input[name='showTOC']`).setAttribute('default', true)
    document.querySelector(`input[name='showTOC']`).checked = true
    document.querySelector(`input[name='showTOC']`).dispatchEvent(new Event('change'))

    if(!all) {
      accessibilityBar.updatePreferencesStructuralNav({
        nav_strategy_id: 1,
        showtoc: 'true'
      })
    }
  }

  minimize() {
    $(this.containerBodyToc).slideUp('fast', () => {
      this.containerToc.style.height = '49px'
      this.containerToc.style.paddingTop = '9px'
      this.minimizeTocButton.style.display = 'none'
      this.maximizeTocButton.style.display = ''
    })

    localStorage.setItem('isMinimizedToc', true)
    this.minimized = true
  }

  maximize() {
    let maxVwHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    if (maxVwHeight - parseInt(this.containerToc.style.top) < 475) {
      this.containerToc.style.top = '155px'
    }

    this.minimizeTocButton.style.display = ''
    this.maximizeTocButton.style.display = 'none'
    this.containerToc.style.height = '475px'
    this.containerToc.style.paddingTop = '10px'
    $(this.containerBodyToc).slideDown('fast')

    localStorage.setItem('isMinimizedToc', false)
    this.minimized = false
  }

  changeNavStrategy() {
    let optSelectedElm = Array.from(document.getElementsByName('navigation-strategy')).filter(radioOption => radioOption.checked)[0]
    let optionNavStrategySelected = parseInt(optSelectedElm.value)
    let isDefault = optSelectedElm.default == 'true'
    this.navStrategyId = optionNavStrategySelected

    if(this.navStrategyId != parseInt(localStorage.getItem('nav_strategy_id')) && !isDefault) {
      accessibilityBar.updatePreferencesStructuralNav({
        nav_strategy_id: this.navStrategyId
      })
    }

    optSelectedElm.setAttribute('default', false)
    localStorage.setItem('nav_strategy_id', this.navStrategyId)
  }

  changeShowToc() {
    let checkbox = document.getElementsByName('showTOC')[0]
    let isChecked = checkbox.checked
    let isDefault = checkbox.default == 'true'
    this.showToc = isChecked

    if(this.showToc != localStorage.getItem('show_toc') && !isDefault) {
      accessibilityBar.updatePreferencesStructuralNav({
        showtoc: `${ this.showToc }`
      })
    }
    if(!isChecked) {
      this.containerToc.style.display = 'none'
    } else {
      this.containerToc.style.display = ''
    }

    checkbox.setAttribute('default', false)
    localStorage.setItem('show_toc', this.showToc)
  }

  htmlTableOfContents(customDoc) {
    let documentRef = customDoc || document;
    let headings = [].slice.call(documentRef.body.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let ul = documentRef.createElement('ul')
    headings.forEach((heading, index) => {
        let anchor = documentRef.createElement('a');
        anchor.setAttribute('name', 'toc' + index);
        anchor.setAttribute('id', 'toc' + index);
        

        let link = documentRef.createElement('a');
        link.textContent = heading.textContent;
        
        if(customDoc) {
          link.addEventListener('click', () => {
            this.scrollInsideIframe(`toc${ index }`)
          })
        } else {
          link.setAttribute('href', '#toc' + index);
        }

        let li = documentRef.createElement('li');
        
        li.appendChild(link);
        ul.appendChild(li);
        heading.parentNode.insertBefore(anchor, heading);
    });

    this.containerBodyToc.appendChild(ul)
  }

  scrollInsideIframe(id) {
    let iframeDocument = learningObject.getDocument()
    let posElement = iframeDocument.getElementById(id).offsetTop
    $(iframeDocument).contents().scrollTop(posElement)
}
}
