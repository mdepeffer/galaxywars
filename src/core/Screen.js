export default class Screen {
  constructor (gameCanvas, width, height) {
    this.canvas = gameCanvas
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