import Utils from "./Utils"

export default class Vector {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  static zero () {
    return new Vector(0, 0)
  }

  setZero () {
    this.x = 0
    this.y = 0
  }

  get length () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  set length (length) {
    this.normalize().multiply(length)
  }

  normalize () {
    this.divide(this.length)
    return this
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
    return new Vector(this.x, this.y)
  }

  add (v) {
    this.x += v.x
    this.y += v.y
    return this
  }

  divide (s) {
    this.x /= s
    this.y /= s
    return this
  }

  multiply (s) {
    this.x *= s
    this.y *= s
    return this
  }

  rotate (r) {
    const rSin = Math.sin(r)
    const rCos = Math.cos(r)

    const nx = this.x * rCos - this.y * rSin
    const ny = this.x * rSin + this.y * rCos

    this.x = nx
    this.y = ny
    return this
  }
}