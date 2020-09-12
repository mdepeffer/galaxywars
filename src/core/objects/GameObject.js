export default class GameObject {
  constructor (scene) {
    this.__scene = scene
  }

  get scene () { return this.__scene }
}