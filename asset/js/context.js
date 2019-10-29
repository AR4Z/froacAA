class Context {
    constructor() {
        this.contextModal = document.getElementById('contextModal');
        this.contextModalInit = new Modal(this.contextModal);
        this.contextForm = document.getElementById('contextForm');
        this.isMobile = WURFL.is_mobile;
        this.isTablet = this.isMobile && WURFL.form_factor == 'Tablet';
        this.isSmartphone = this.isMobile && WURFL.form_factor == 'Smartphone';
        this.isDesktop = !this.isMobile;
        this.uaParser = new UAParser();
        this.uaParser.setUA(navigator.userAgent);
        this.resultUAParser = this.uaParser.getResult();
        this.hasMouse = false;

        window.addEventListener('mousemove', () => { this.hasMouse = true });
        this.validator = new Validator(this.contextForm, {
            fields: {
                availableTime: {
                    required: true,
                    numeric: {
                        min: 1.0,
                        max: 2.0
                    }
                }
            },
            rules: {
                numeric: (value, params) => {
                    console.log(params)
                    return value >= params.min && value <= params.max
                }
            },
            messages: {
                numeric: () => "<br><div aria-hidden='false' aria-live='assertive' role='alert' class='alert alert-danger'><?php echo $this->lang->line('invalid_username'); ?></div>"
            },
            submit: e => {
                return new Promise((resolve, reject) => {
                    const form = e.target;
                    console.log("submit")
                    const inputDevice = document.createElement('input');
                    inputDevice.setAttribute('type', 'hidden');
                    inputDevice.setAttribute('name', 'deviceId');
                    inputDevice.value = this.getDeviceId();
                    form.appendChild(inputDevice);

                    const inputBrowser = document.createElement('input');
                    inputBrowser.setAttribute('type', 'hidden');
                    inputBrowser.setAttribute('name', 'browser');
                    inputBrowser.value = this.resultUAParser.browser.name;
                    form.appendChild(inputBrowser);


                    if (!document.getElementById('has_speakers')) {
                        const inputSpeaker = document.createElement('input');
                        inputSpeaker.setAttribute('type', 'hidden');
                        inputSpeaker.setAttribute('name', 'has_speakers');
                        inputSpeaker.value = DetectRTC.hasSpeakers;
                        form.appendChild(inputSpeaker);
                    }


                    const inputMicrophone = document.createElement('input');
                    inputMicrophone.setAttribute('type', 'hidden');
                    inputMicrophone.setAttribute('name', 'has_microphone');
                    inputMicrophone.value = DetectRTC.hasMicrophone;
                    form.appendChild(inputMicrophone);

                    const inputMouse = document.createElement('input');
                    inputMouse.setAttribute('type', 'hidden');
                    inputMouse.setAttribute('name', 'mouse');
                    inputMouse.value = this.hasMouse;
                    form.appendChild(inputMouse);
                    /*const inputInternetConnection = document.createElement('input');
                    inputInternetConnection.setAttribute('type', 'hidden');
                    inputInternetConnection.setAttribute('name', 'internetConnectionId');
                    inputInternetConnection.value = this.detectInternetConnection();
                    form.appendChild(inputInternetConnection);*/
                    console.log("final")
                    
                    return resolve();
                })
            }
        })
    }

    getDeviceId() {
        if (this.isDesktop) {
            return 1;
        } else if (this.isSmartphone) {
            return 2;
        } else {
            return 3;
        }
    }
}