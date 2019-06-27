class RatingLO {
    constructor(idLO, idRep, username) {
        this.simpleRatingObjects = [];
        this.instanceRatingObjects();
        //this.setLeavePage()
        this.ratingModal = document.getElementById('ratingModal')
        this.ratingModalInit = new Modal(this.ratingModal)
        this.buttonSendRate = document.getElementById('sendRateButton')
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

        this.rate = {
            effectiveness: 0,
            motivation: 0,
            usability: 0,
            accessibility: 0,
            adaptability: 0,
            comments: null,
            lo_id: idLO,
            rep_id: idRep,
            use_username: username
        }

        this.setEventclickButtonSendRate();
    }

    instanceRatingObjects() {
        const htmlStarElements = document.getElementsByClassName('stars');

        Array.from(htmlStarElements).forEach(starElement => {
            let simpleRating = new SimpleStarRating(starElement)
            starElement.addEventListener('rate', e => {
                this.rate[starElement.id] = e.detail;
            });

            this.simpleRatingObjects.push(simpleRating)
        });
    }

    setLeavePage() {
        window.addEventListener('beforeunload', function (e) {
            // Cancel the event
            e.preventDefault();
            // Chrome requires returnValue to be set
            e.returnValue = '';
        });
    }

    setEventclickButtonSendRate() {
        this.buttonSendRate.addEventListener('click', this.setRate.bind(this));
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
            rep_id: idRep,
            use_username: username
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