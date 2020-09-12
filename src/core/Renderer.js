import TransformationMatrix from './utilities/TransformationMatrix'

export default class Renderer {
  constructor (screen) {
    this.screen = screen
    this.ctx = screen.context

    this.resetMatrix = TransformationMatrix.resetMatrix()
  }

  resetTransform () {
    this.resetMatrix.applyToContext(this.ctx)
  }

  preRender () {
    this.resetTransform()
    this.screen.fill("#000000")
  }

  render (sprite) {
    if (!sprite.visible) return
    const transform = new TransformationMatrix.fromPRS(sprite.x, sprite.y, sprite.rotation)
    transform.applyToContext(this.ctx)
    this.ctx.drawImage(sprite.texture.canvas, sprite.displayOffset.x, sprite.displayOffset.y, sprite.width, sprite.height)
  }


}