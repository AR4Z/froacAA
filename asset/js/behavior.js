class Behavior {
    constructor(preferencesBehavior) {
        this.disableAlerts = preferencesBehavior.disable_alerts
        this.confirmContextChange = preferencesBehavior.confirm_context_change == 'true'

        // copy default alert behavior
        this.defaultAlertBehavior = window.alert
        // select elements that need confirmation
        const elementsNeedConfirmation = document.getElementsByClassName('need-confirmation')

        Array.from(elementsNeedConfirmation).forEach(elm => {
            elm.addEventListener('click', (e) => {
                if (this.confirmContextChange) {
                    const msg = elm.getAttribute('data-allyxe-confirm')
                    const follow = confirm(`${msg}`)

                    if (!follow) {
                        e.preventDefault()
                    }
                }
            })
        })

        this._addEventChangeDisableAlerts()
        this._addEventChangeConfirmContextChange()
        this._setValuesInLocalStorage()
        this._loadBehavior()
    }

    _setValuesInLocalStorage() {
        localStorage.setItem('disable_alerts', this.disable_alerts)
    }

    _loadBehavior() {
        document.querySelector(`input[name='disableAlerts']`).checked = this.disableAlerts == 'true' ? true : false
        document.querySelector(`input[name='disableAlerts']`).dispatchEvent(new Event('change'))

        document.querySelector(`input[name='confirmContextChange']`).checked = this.confirmContextChange
    }

    _addEventChangeDisableAlerts() {
        let checkboxDisableAlerts = document.getElementsByName('disableAlerts')[0]

        checkboxDisableAlerts.addEventListener('change', this.changeDisableAlerts.bind(this))
    }

    _addEventChangeConfirmContextChange() {
        let checkboxConfirmContextChange = document.getElementsByName('confirmContextChange')[0]

        checkboxConfirmContextChange.addEventListener('change', (e) => {
            this.confirmContextChange = e.target.checked
            console.log(this.confirmContextChange)
            localStorage.setItem('confirm_context_change', this.confirmContextChange)
        })
    }

    setDefaultValues(all) {
        document.querySelector(`input[name='disableAlerts']`).setAttribute('default', true)
        document.querySelector(`input[name='disableAlerts']`).checked = true
        document.querySelector(`input[name='disableAlerts']`).dispatchEvent(new Event('change'))

        document.querySelector(`input[name='confirmContextChange']`).setAttribute('default', true)
        document.querySelector(`input[name='confirmContextChange']`).checked = false
    }

    changeDisableAlerts() {
        let disableAlerts = document.getElementsByName('disableAlerts')[0].checked
        this.disableAlerts = disableAlerts

        if (disableAlerts) {
            // overwrite default behavior
            window.alert = () => { }
        } else {
            window.alert = this.defaultAlertBehavior
        }

        localStorage.setItem('disable_alerts', this.disableAlerts)
    }

}