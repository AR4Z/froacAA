class Behavior {
    constructor(preferencesBehavior) {
        this.disableAlerts = preferencesBehavior.disable_alerts

        this._addEventChangeDisableAlerts()
        this._setValuesInLocalStorage()
        this._loadBehavior()
    }

    _setValuesInLocalStorage() {
        localStorage.setItem('disable_alerts', this.disable_alerts)
    }

    _loadBehavior() {
        document.querySelector(`input[name='disableAlerts']`).checked = this.disableAlerts == 'true' ? true : false
        document.querySelector(`input[name='disableAlerts']`).dispatchEvent(new Event('change'))
    }

    _addEventChangeDisableAlerts() {
        let checkboxDisableAlerts = document.getElementsByName('disableAlerts')[0]

        checkboxDisableAlerts.addEventListener('change', this.changeDisableAlerts.bind(this))
    }

    setDefaultValues(all) {
        document.querySelector(`input[name='disablealerts']`).setAttribute('default', true)
        document.querySelector(`input[name='disablealerts']`).checked = true
        document.querySelector(`input[name='disablealerts']`).dispatchEvent(new Event('change'))
    }

    changeDisableAlerts() {
        return
    }

}