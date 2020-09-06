export default class Screen {
  constructor (width, height, canvas) {
    if (canvas) {
      this.canvas = canvas
    } else {
      this.canvas = document.createElement('canvas')
    }
    
    this.width = width
    this.height = height

    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext('2d')
  }

  clear () {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}