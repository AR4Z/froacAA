class StructuralNavigation {
  constructor(preferencesStructuralNavigation) {
    this.navStrategyId = preferencesStructuralNavigation.nav_strategy_id
    this.showToc = preferencesStructuralNavigation.show_toc
    
    this._addEventChangeNavStrategy()
    this._addEventChangeShowToc()

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

  changeNavStrategy() {
    let optionNavStrategySelected = parseInt(Array.from(document.getElementsByName('navigation-strategy')).filter(radioOption => radioOption.checked)[0].value)
    this.navStrategyId = optionNavStrategySelected

    if(this.navStrategyId != parseInt(localStorage.getItem('nav_strategy_id'))) {
      accessibilityBar.updatePreferencesStructuralNav({
        nav_strategy_id: this.navStrategyId
      })
    }

    localStorage.setItem('nav_strategy_id', this.navStrategyId)
  }

  changeShowToc() {
    let isChecked = document.getElementsByName('showTOC')[0].checked
    this.showToc = isChecked

    if(this.showToc != localStorage.getItem('show_toc')) {
      accessibilityBar.updatePreferencesStructuralNav({
        show_toc: `${ this.showToc }`
      })
    }

    localStorage.setItem('show_toc', this.showToc)
  }
}
