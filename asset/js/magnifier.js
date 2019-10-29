class Magnifier {
    constructor() {
        this._addMagnifierEvent()
    }

    _addMagnifierEvent() {
        addEventListener('click', (e) => {
            if (e.ctrlKey) {
                zoom.to({
                    x: e.clientX,
                    y: e.clientY,
                    scale: 2
                })
            }
        })
    }
}