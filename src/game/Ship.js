import SpriteObject from '../core/objects/SpriteObject'

export default class Ship extends SpriteObject {
  constructor (scene, input, position, bitmap) {
    super(scene, position, bitmap)

    this.__input = input
    this.rotationSpeed = 0.1
    this.accSpeed = 0.1
    this.maxVelocity = 4
    this.dampVelocityFactor = 0.99
  }

  update () {
    this.handleInput()

    this.acceleration.rotate(this.rotation)

    this.applyMotion()

    this.applyEdgeTeleport()
  }

  handleInput () {
    if (this.__input.keyHold(this.__input.KEYS.RIGHT)) { this.rotation += this.rotationSpeed }
    if (this.__input.keyHold(this.__input.KEYS.LEFT)) { this.rotation -= this.rotationSpeed }

    if (this.__input.keyHold(this.__input.KEYS.UP)) { this.acceleration.y -= this.accSpeed }
    if (this.__input.keyHold(this.__input.KEYS.DOWN)) { this.acceleration.y += this.accSpeed }
  }

  applyEdgeTeleport () {
    const viewWidth = this.scene.game.screen.width
    const viewHeight = this.scene.game.screen.height

    if (this.position.x < -this.width) this.position.x = viewWidth + this.width
    if (this.position.x > viewWidth + this.width) this.position.x = -this.width
    if (this.position.y < -this.height) this.position.y = viewHeight + this.height
    if (this.position.y > viewHeight + this.height) this.position.y = -this.height
  }
}