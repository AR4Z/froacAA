class RatingLO {
    constructor(idLO, idRep, userLORank, gralLORank, iframeLODocument) {
        this.iframeLODocument = iframeLODocument
        this.userInteractWithLO = false
        this.showModalForAskRating = true
        this.simpleGralRatingObjects = []
        this.containerGralratingStars = document.getElementById('starsGralRatingContainer')

        if (userLORank) {
            this.showModalForAskRating = false
            this.rate = {
                effectiveness: Number(userLORank.effectiveness),
                motivation: Number(userLORank.motivation),
                usability: Number(userLORank.usability),
                accessibility: Number(userLORank.accessibility),
                adaptability: Number(userLORank.adaptability),
                lo_id: idLO,
                rep_id: idRep
            }
        } else {
            this.setEventInteractionLO()
            this.setLeavePage()
            this.rate = {
                effectiveness: 0,
                motivation: 0,
                usability: 0,
                accessibility: 0,
                adaptability: 0,
                lo_id: idLO,
                rep_id: idRep
            }
        }

        if (gralLORank) {
            this.gralLORank = {
                effectiveness: Number(gralLORank.effectiveness),
                motivation: Number(gralLORank.motivation),
                usability: Number(gralLORank.usability),
                accessibility: Number(gralLORank.accessibility),
                adaptability: Number(gralLORank.adaptability),
                lo_id: idLO,
                rep_id: idRep
            };
            this.gralLORank['gral'] = (this.gralLORank.effectiveness + this.gralLORank.motivation + this.gralLORank.usability + this.gralLORank.accessibility + this.gralLORank.adaptability ) / 5
            this.instanceGralRatingObjects();
        }

        this.simpleRatingObjects = [];

        this.instanceRatingObjects();
        this.ratingModal = document.getElementById('ratingModal')
        this.ratingModalInit = new Modal(this.ratingModal)
        this.buttonSendRate = document.getElementById('sendRateButton')
        this.buttonNeverAskAgain = document.getElementById('neverAskAgainButton')
        this.successRankedNotification = Toastify({
            text: 'Gracias por tu calificación',
            duration: 3000,
            close: true,
            gravity: 'top',
            positionLeft: false
        })

        this.failRankedNotification = Toastify({
            text: 'Ha ocurrido un error. Intenta de nuevo mas tarde',
            duration: 3000,
            close: true,
            gravity: 'top',
            positionLeft: false
        })

        this.setEventclickButtonSendRate();
        this.setEventClickbuttonNeverAskAgain();
    }

    instanceRatingObjects() {
        const htmlStarElements = document.getElementsByClassName('stars');

        Array.from(htmlStarElements).forEach(starElement => {
            let simpleRating = new SimpleStarRating(starElement)

            starElement.addEventListener('rate', e => {
                this.rate[starElement.id] = e.detail;
            });
            simpleRating.setCurrentRating(this.rate[starElement.id])


            this.simpleRatingObjects.push(simpleRating)
        });
    }

    instanceGralRatingObjects() {
        const htmlGralStarsElements = document.getElementsByClassName('gral-stars');

        Array.from(htmlGralStarsElements).forEach(starElement => {
            let simpleRating = new SimpleStarRating(starElement)
            switch (starElement.id) {
                case 'gralEffectiveness': {
                    simpleRating.setCurrentRating(this.gralLORank.effectiveness)
                    break;
                }
                case 'gralMotivation': {
                    simpleRating.setCurrentRating(this.gralLORank.motivation)
                    break;
                }
                case 'gralUsability': {
                    simpleRating.setCurrentRating(this.gralLORank.usability)
                    break;
                }
                case 'gralAccessibility': {
                    simpleRating.setCurrentRating(this.gralLORank.accessibility)
                    break;
                }
                case 'gralAdaptability': {
                    simpleRating.setCurrentRating(this.gralLORank.adaptability)
                    break;
                }
                case 'gral': {
                    simpleRating.setCurrentRating(this.gralLORank.gral)
                    break;
                }
            }
            simpleRating.disable()

            this.simpleGralRatingObjects.push(simpleRating)

        })
        this.containerGralratingStars.removeAttribute('style')
    }

    setLeavePage() {
        const aHtmlElements = document.getElementsByTagName('a')

        Array.from(aHtmlElements).forEach(aHtmlElement => {
            aHtmlElement.addEventListener('click', e => {
                if (this.userInteractWithLO && this.showModalForAskRating) {
                    e.preventDefault()
                    this.ratingModalInit.show()
                }
            })
        })
    }

    setEventInteractionLO() {
        this.iframeLODocument.addEventListener('click', e => {
            this.userInteractWithLO = true;
        })
    }

    setEventclickButtonSendRate() {
        this.buttonSendRate.addEventListener('click', this.setRate.bind(this));
    }

    setEventClickbuttonNeverAskAgain() {
        this.buttonNeverAskAgain.addEventListener('click', e => {
            this.showModalForAskRating = false
            this.ratingModalInit.hide()
        })
    }

    resetRanked() {
        this.rate = {
            effectiveness: 0,
            motivation: 0,
            usability: 0,
            accessibility: 0,
            adaptability: 0,
            comments: null,
            lo_id: idLO,
            rep_id: idRep
        }
    }

    setRate() {
        const fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rate: this.rate
            })
        }

        return fetch(`${window.base_url}lo/rateLearningObject`, fetchData)
            .then(r => {
                r.json()
                this.ratingModalInit.hide();
                this.successRankedNotification.showToast();
            }).catch(e => {
                this.ratingModalInit.hide();
                this.resetRanked();
                this.failRankedNotification.showToast();
            })
    }
}
