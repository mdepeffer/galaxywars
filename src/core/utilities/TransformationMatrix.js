import Vector from './Vector'

export default class TransformationMatrix {
  /*
    a: scaleX
    b: skewX
    c: skewY
    d: scaleY
    e: translateX
    f: translateY
  */
  constructor (a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    this.matrix = [
      [a, c, e],
      [b, d, f],
      [0, 0, 1]
    ]
  }

  get a () { return this.matrix[0][0] }
  set a (a) { this.matrix[0][0] = a }
  get b () { return this.matrix[1][0] }
  set b (b) { this.matrix[1][0] = b }
  get c () { return this.matrix[0][1] }
  set c (c) { this.matrix[0][1] = c }
  get d () { return this.matrix[1][1] }
  set d (d) { this.matrix[1][1] = d }
  get e () { return this.matrix[0][2] }
  set e (e) { this.matrix[0][2] = e }
  get f () { return this.matrix[1][2] }
  set f (f) { this.matrix[1][2] = f }

  static resetMatrix () {
    return new TransformationMatrix(1, 0, 0, 1, 0, 0)
  }

  static fromPRS (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {
    const rotCos = Math.cos(rotation)
    const rotSin = Math.sin(rotation)

    let a = rotCos * scaleX
    let b = rotSin * scaleX
    let c = -rotSin * scaleY
    let d = rotCos * scaleY

    return new TransformationMatrix(a, b, c, d, x, y)
  }

  static fromArray (valueArray) {
    return new TransformationMatrix(valueArray[0], valueArray[1], valueArray[2], valueArray[3], valueArray[4], valueArray[5])
  }

  rotate (rotation) {
    const rotCos = Math.cos(rotation)
    const rotSin = Math.sin(rotation)
    
    var oldA = this.a
    var oldB = this.b
    var oldC = this.c
    var oldD = this.d

    this.a = (oldA * rotCos) + (oldC * rotSin)
    this.b = (oldB * rotCos) + (oldD * rotSin)
    this.c = (oldA * -rotSin) + (oldC * rotCos)
    this.d = (oldB * -rotSin) + (oldD * rotCos)

    return this
  }

  scale (scaleX = 1, scaleY = 1) {
    this.a *= scaleX
    this.b *= scaleX
    this.c *= scaleY
    this.d *= scaleY

    return this
  }

  getTransformedVector (vector) {
    const x = (vector.x * this.a) + (vector.y * this.c) + this.e
    const y = (vector.x * this.b) + (vector.y * this.d) + this.f

    return new Vector(x, y)
  }

  applyToContext (ctx) {
    ctx.setTransform(this.a, this.b, this.c, this.d, this.e, this.f)
  }

  exportArray () {
    return [this.a, this.b, this.c, this.d, this.e, this.f]
  }


}