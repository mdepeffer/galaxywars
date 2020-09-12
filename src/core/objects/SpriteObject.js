import GameObject from "./GameObject"
import Vector from "../utilities/Vector"

export default class SpriteObject extends GameObject {
  constructor(scene, position, bitmap) {
    super(scene)

    this.position = position.copy()
    this.__bitmap = bitmap
    this.__width = bitmap.width
    this.__height = bitmap.height
    this.__origin = new Vector(0.5, 0.5)

    this.visible = true

    this.rotation = 0

    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)

    this.maxVelocity = Infinity
    this.dampVelocityFactor = 1

    this.scene.renderList.add(this)
    this.scene.updateList.add(this)
  }

  get x () { return this.position.x }
  set x (x) { this.position.x = x }
  get y () { return this.position.y }
  set y (y) { this.position.y = y }

  get width () { return this.__bitmap.width }
  get height () { return this.__bitmap.height }
  get origin ()  { return this.__origin }
  get texture () { return this.__bitmap }

  set originX (newX) {
    this.__origin.x = newX
    this.__origin.clamp(0, 1)
  }

  set originY (newY) {
    this.__origin.y = newY
    this.__origin.clamp(0, 1)
  }

  get displayOffset () {
    return new Vector(-this.__origin.x * this.__width, -this.__origin.y * this.__height)
  }

  update () {}

  applyMotion () {
    this.velocity.add(this.acceleration)
    if (this.velocity.length > this.maxVelocity) this.velocity.length = this.maxVelocity
    if (this.velocity.length < -this.maxVelocity) this.velocity.length = -this.maxVelocity
    this.velocity.multiply(this.dampVelocityFactor)
    this.position.add(this.velocity)

    this.acceleration.setZero()
  }


}