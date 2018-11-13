class StructuralNavigation {
  constructor(preferencesStructuralNavigation) {
    this.navStrategyId = preferencesStructuralNavigation.nav_strategy_id
    this.showToc = preferencesStructuralNavigation.showtoc
    
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

    checkbox.setAttribute('default', false)
    localStorage.setItem('show_toc', this.showToc)
  }
}
