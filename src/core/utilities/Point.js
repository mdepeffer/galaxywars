import Utils from "./Utils"

export default class Point {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  translate (deltaX, deltaY) {
    this.x = this.x += deltaX
    this.y = this.y += deltaY
    return this
  }

  clampX (min, max) {
    this.x = Utils.clamp(this.x, min, max)
    return this
  }

  clampY (min, max) {
    this.y = Utils.clamp(this.y, min, max)
    return this
  }

  clamp (min, max) {
    this.x = Utils.clamp(this.x, min, max)
    this.y = Utils.clamp(this.y, min, max)
    return this
  }

  copy () {
    return new Point(this.x, this.y)
  }
}