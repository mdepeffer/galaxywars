export default class Bitmap {
  constructor (image, name = "") {
    this.width = image.width
    this.height = image.height
    this.name = name
    this.__source = image

    this.__canvas = document.createElement('canvas')
    this.__canvas.width = this.width
    this.__canvas.height = this.height
    this.__context = this.__canvas.getContext('2d')

    this.__context.drawImage(image, 0, 0)
  }

  get context () {
    return this.__context
  }

  get canvas () {
    return this.__canvas
  }
}