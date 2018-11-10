class CursorTrail {
  constructor(size, color) {
    this.size = size
    this.color = color
    this.dots = []
    this.mouse = {
      x: 0,
      y: 0
    }
    this.requestAnimationId = undefined
    this.createTrail(this.size)
    this._addMouseEvent()
  }

  _addMouseEvent() {
    addEventListener('mousemove', (e) => {
      this.mouse.x = e.pageX
      this.mouse.y = e.pageY
    })
  }

  createTrail(size) {
    this.size = size

    for(let i = 0; i < this.size; i++) {
      let dot = new Dot()
      this.dots.push(dot)
    }
  }

  setSize(size) {
    this.size = size
    cancelAnimationFrame(this.requestAnimationId)
    this.requestAnimationId = undefined
    this.removeTrail()
    this.createTrail(size)
  }

  setColor(color) {
    this.color = color
    this.dots.forEach((dot) => {
      dot.node.style.backgroundColor = `#${ this.color }`
    })
  }

  removeTrail() {
    let dots = document.getElementsByClassName('trail')
    
    Array.from(dots).forEach((dot) => {
      dot.remove()
    })
    this.dots = []
  }

  draw() {
    let x = this.mouse.x
    let y = this.mouse.y

    this.dots.forEach((dot, index, dots) => {
      let nextDot = dots[index + 1] || dots[0]

      dot.x = x
      dot.y = y
      dot.draw()
      x += (nextDot.x - dot.x) * .6
      y += (nextDot.y - dot.y) * .6
    })
  }

  animate() {
    this.draw()
    this.requestAnimationId = requestAnimationFrame(this.animate.bind(this))
  }
}
