/**
 * @typedef mouse
 * @type {object}
 * @property {number} x - x coordinate of the cursor.
 * @property {number} y - y coordinate of the cursor.
 */

/** Class representing Cursor Trail. */
class CursorTrail {
  /**
   * Create Cursor Trail.
   * @param {number} size - cursor trail size (number of dots) 
   * @param {string} color - cursor trail color (background color of dots)
   */
  constructor(size, color) {
    this.size = size
    this.color = color

    /**
     * Store each of the dots that make up the cursor trail.
     * @type {Dot[]}
     */
    this.dots = []

    /** @type {mouse} */
    this.mouse = {
      x: 0,
      y: 0
    }
    /**
     * identifies the animation made so that the trail follows the cursor.
     * @type {number}
     */
    this.requestAnimationId = null

    /*
      In case of finding myself in the view of a learning object I must save the 
      iframe document to add the tracking event to the cursor to the two documents.
    */
    if(idView == 'lo_view'){
      /**
       * save instance of the class LearningObject
       * @type {LearningObject}
       */
      this.learningObject = window.learningObject
      /**
       * Save document of learning object.
       * @type {document}
       */
      this.learningObjectDoc = this.learningObject.getDocument()
      /**
       * Save html node (<iframe>) of the learning object.
       * @type {HTMLElement}
       */
      this.learningObjectNode = this.learningObject.iframeElement
    } else {
      this.learningObject = null
    }

    this.createTrail(this.size)
    this._addMouseEvent()
  }
  /**
   * Listen to the movement of the mouse so that the trail cursor follows the cursor.
   * @private
   * @returns {void}
   */
  _addMouseEvent() {
    // update coordenates mouse Object with the mouse coordenates
    addEventListener('mousemove', (e) => {
      this.mouse.x = e.pageX
      this.mouse.y = e.pageY
    })

    if(this.learningObject) {
      this.learningObjectDoc.querySelector('body').addEventListener('mousemove', (e) => {
        let nodeLearningObject = this.learningObjectNode
        // trail cursor follow cursor inside iframe
        this.mouse.x = e.clientX + nodeLearningObject.getBoundingClientRect().x;
        this.mouse.y = e.clientY + nodeLearningObject.getBoundingClientRect().y;
      })
    }
  }
  
  /**
   * Create trail cursor, an array with size length and Dots objects.
   * @param {number} size - size trail cursor
   * @public
   * @returns {void}
   */
  createTrail(size) {
    this.size = size

    for(let i = 0; i < this.size; i++) {
      let dot = new Dot()
      this.dots.push(dot)
    }
  }

  /**
   * Change size property.
   * @param {number} size - size trail cursor
   * @public
   * @returns {void}
   */
  setSize(size) {
    this.size = size

    // cancel current animation
    cancelAnimationFrame(this.requestAnimationId)
    this.requestAnimationId = null

    // delete current tail and create new trail with new size
    this.removeTrail()
    this.createTrail(size)
  }

  /**
   * Change color property
   * @param {string} color - background color Dots objects (color cursor trail)
   * @public
   * @returns {void}
   */
  setColor(color) {
    this.color = color
    // change background color for current trail cursor
    this.dots.forEach((dot) => {
      dot.node.style.backgroundColor = `#${ this.color }`
    })
  }

  /**
   * Remove trail, delete current HtmlElements that represents Dot objects of the DOM
   * @public
   * @returns {void}
   */
  removeTrail() {
    let dots = document.getElementsByClassName('trail')
    
    Array.from(dots).forEach((dot) => {
      dot.remove()
    })
    this.dots = []
  }
  /**
   * Updates the coordinates of each of the points 
   * of the cursor trace according to the movement of the cursor.
   * @public
   * @returns {void}
   */
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

  /**
   * Start animation effect
   * @public
   * @returns {void}
   */
  animate() {
    this.draw()
    this.requestAnimationId = requestAnimationFrame(this.animate.bind(this))
  }
}
