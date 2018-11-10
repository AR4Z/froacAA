class CursorTrail {
  constructor(size) {
    this.size = size
    this.dots = []
  }

  createTrail() {
    for(let i = 0; i < this.size; i++) {
      let dot = new Dot()
      this.dots.push(dot)
    }
  }

  setSize(size) {
    this.size = size
    this.removeTrail()
    this.createTrail()
  }

  removeTrail() {
    let dots = document.getElementsByClassName('trail')
    
    Array.from(dots).forEach((dot) => {
      dot.remove()
    })
  }
}