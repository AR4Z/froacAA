class Behavior {
    constructor(preferencesBehavior) {
        this.disableAlerts = preferencesBehavior.disable_alerts
        this.confirmContextChange = preferencesBehavior.confirm_context_change == 'true'
        this.ctrl1 = preferencesBehavior.ctrl1
        this.ctrl2 = preferencesBehavior.ctrl2
        this.ctrl3 = preferencesBehavior.ctrl3
        this.ctrl4 = preferencesBehavior.ctrl4
        this.ctrl5 = preferencesBehavior.ctrl5
        this.ctrl6 = preferencesBehavior.ctrl6
        this.ctrl7 = preferencesBehavior.ctrl7
        this.ctrl8 = preferencesBehavior.ctrl8
        this.ctrl9 = preferencesBehavior.ctrl9

        // copy default alert behavior
        this.defaultAlertBehavior = window.alert
        // select elements that need confirmation
        const elementsNeedConfirmation = document.getElementsByClassName('need-confirmation')
        const accessibilityBarbutton = document.getElementById('accessibilityBarButton')

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
        this._addEventChangeControls()
        this._setValuesInLocalStorage()
        this._loadBehavior()

        this.shortcutsEvents = {
            'homePage': () => window.location.href = window.base_url,
            'createAccountPage': () => window.location.href = `${window.base_url}usuario/registro`,
            'repositoriesPage': () => window.location.href = `${window.base_url}repositorio/lista`,
            'aboutFROACPage': () => window.location.href = `${window.base_url}usuario/acerca`,
            'glossaryPage': () => window.location.href = `${window.base_url}usuario/glosario`,
            'signInPage': () => window.location.href = `${window.base_url}login`,
            'openAllyxe': () => { accessibilityBarbutton.click()},
            'backwardSection': () => {},
            'forwardSection': () => {}
        }

        hotkeys('ctrl+0,ctrl+1,ctrl+2,ctrl+3,ctrl+4,ctrl+5,ctrl+6,ctrl+7,ctrl+8,ctrl+9', (event, handler) => {
            event.preventDefault()
            const selectCtrl1 = document.getElementById("selectCtrl1")
            const selectCtrl2 = document.getElementById("selectCtrl2")
            const selectCtrl3 = document.getElementById("selectCtrl3")
            const selectCtrl4 = document.getElementById("selectCtrl4")
            const selectCtrl5 = document.getElementById("selectCtrl5")
            const selectCtrl6 = document.getElementById("selectCtrl6")
            const selectCtrl7 = document.getElementById("selectCtrl7")
            const selectCtrl8 = document.getElementById("selectCtrl8")
            const selectCtrl9 = document.getElementById("selectCtrl9")


            switch (handler.key) {
                case 'ctrl+0':
                    //
                    document.querySelector(`input[name='disableCursor']`).checked = false
                    document.querySelector(`input[name='disableCursor']`).dispatchEvent(new Event('change'))
                    break
                case 'ctrl+1':
                    this.shortcutsEvents[selectCtrl1.options[selectCtrl1.selectedIndex].value]()
                    break
                case 'ctrl+2':
                    this.shortcutsEvents[selectCtrl2.options[selectCtrl2.selectedIndex].value]()
                    break
                case 'ctrl+3':
                    this.shortcutsEvents[selectCtrl3.options[selectCtrl3.selectedIndex].value]()
                    break
                case 'ctrl+4':
                    this.shortcutsEvents[selectCtrl4.options[selectCtrl4.selectedIndex].value]()
                    break
                case 'ctrl+5':
                    this.shortcutsEvents[selectCtrl5.options[selectCtrl5.selectedIndex].value]()
                    break
                case 'ctrl+6':
                    this.shortcutsEvents[selectCtrl6.options[selectCtrl6.selectedIndex].value]()
                    break
                case 'ctrl+7':
                    this.shortcutsEvents[selectCtrl7.options[selectCtrl7.selectedIndex].value]()
                    break
                case 'ctrl+8':
                    this.shortcutsEvents[selectCtrl8.options[selectCtrl8.selectedIndex].value]()
                    break
                case 'ctrl+9':
                    this.shortcutsEvents[selectCtrl9.options[selectCtrl9.selectedIndex].value]()
                    break
            }
        })
    }

    _setValuesInLocalStorage() {
        localStorage.setItem('disable_alerts', this.disable_alerts)
    }

    _loadBehavior() {
        document.querySelector(`input[name='disableAlerts']`).checked = this.disableAlerts == 'true' ? true : false
        document.querySelector(`input[name='disableAlerts']`).dispatchEvent(new Event('change'))

        document.querySelector(`input[name='confirmContextChange']`).checked = this.confirmContextChange
        document.querySelector(`select[name='ctrl1']`).selectedIndex = this.ctrl1
        document.querySelector(`select[name='ctrl2']`).selectedIndex = this.ctrl2
        document.querySelector(`select[name='ctrl3']`).selectedIndex = this.ctrl3
        document.querySelector(`select[name='ctrl4']`).selectedIndex = this.ctrl4
        document.querySelector(`select[name='ctrl5']`).selectedIndex = this.ctrl5
        document.querySelector(`select[name='ctrl6']`).selectedIndex = this.ctrl6
        document.querySelector(`select[name='ctrl7']`).selectedIndex = this.ctrl7
        document.querySelector(`select[name='ctrl8']`).selectedIndex = this.ctrl8
        document.querySelector(`select[name='ctrl9']`).selectedIndex = this.ctrl9
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

    _addEventChangeControls() {
        const controls = [
            document.querySelector(`select[name='ctrl1']`),
            document.querySelector(`select[name='ctrl2']`),
            document.querySelector(`select[name='ctrl3']`),
            document.querySelector(`select[name='ctrl4']`),
            document.querySelector(`select[name='ctrl5']`),
            document.querySelector(`select[name='ctrl6']`),
            document.querySelector(`select[name='ctrl7']`),
            document.querySelector(`select[name='ctrl8']`),
            document.querySelector(`select[name='ctrl9']`),
        ]
        
        controls.forEach(control => {
            control.addEventListener('change', (e) => {
                localStorage.setItem(`${e.target.name}`, e.target.selectedIndex )
            })
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