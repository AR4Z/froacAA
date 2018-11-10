class Dot {
  constructor() {
    this.x = 0
    this.y = 0
    this.node = this.createNode()
  }

  createNode() {
    let nodeDot = document.createElement('div')
    nodeDot.className = 'trail no-high-contrast no-invert-color'
      
    document.body.appendChild(nodeDot)
    return nodeDot
  }

  draw() {
    this.node.style.left = `${ this.x }px`
    this.node.style.top = `${ this.y }px`
  }
}