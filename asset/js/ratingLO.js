class RatingLO {
    constructor(url, name) {
        this.simpleRatingObjects = []
        this.instanceRatingObjects();
        //this.setLeavePage()

        this.rate = {
            effectiveness: 0,
            motivation: 0,
            usability: 0,
            accessibility: 0,
            adaptability: 0
        }
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
            console.log("eyyyy")
            // Cancel the event
            e.preventDefault();
            // Chrome requires returnValue to be set
            e.returnValue = '';
        });
    }
}