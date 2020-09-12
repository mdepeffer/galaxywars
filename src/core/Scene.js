import ObjectList from './ObjectList'

export default class Scene {
  constructor (game) {
    this.game = game

    this.renderList = new ObjectList()
    this.updateList = new ObjectList()
  }

  update () {
    this.updateList.each(this.updateObject.bind(this))
  }

  render () {
    this.renderList.each(this.renderObject.bind(this))
  }

  updateObject(object) {
    object.update()
  }

  renderObject(object) {
    this.game.renderer.render(object)
  }
}