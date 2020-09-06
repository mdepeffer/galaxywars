import keys from './keys'

export default class KeyboardInput {
  constructor () {
    this.initializeValues()
    this.initializeEvents()
    this.KEYS = keys
  }

  keyDown(keycode) {
    return (this.__keysdown.indexOf(keycode) !== -1)
  }

  keyHold(keycode) {
    return (this.__keyshold.indexOf(keycode) !== -1)
  }

  keyUp(keycode) {
    return (this.__keysup.indexOf(keycode) !== -1)
  }

  initializeValues () {
    this.__keysup = []
    this.__keyshold = []
    this.__keysdown = []
  }

  initializeEvents () {
    window.addEventListener('keydown', (e) => { this.__handleKeyDown(e) })
    window.addEventListener('keyup', (e) => { this.__handleKeyUp(e) })
  }

  update () {
    this.__transitionDownKeys()
    this.__removeReleasedKeys()
  }

  __handleKeyDown (e) {
    const key = e.keyCode

    if (key !== 116) e.preventDefault()

    if (this.__keyshold.indexOf(key) === -1) this.__addUniqueToList(key, this.__keysdown)
  }

  __handleKeyUp (e) {
    const key = e.keyCode
    this.__addUniqueToList(key, this.__keysup)

  }

  __transitionDownKeys () {
    for (let i = 0; i < this.__keysdown.length; i++) {
      this.__addUniqueToList(this.__keysdown[i], this.__keyshold)
    }

    this.__keysdown = []
  }

  __removeReleasedKeys () {
    for (let i = 0; i < this.__keysup.length; i++) {
      this.__removeFromList(this.__keysup[i], this.__keyshold)
    }

    this.__keysup = []
  }

  __addUniqueToList (value, list) {
    if (list.indexOf(value) === -1) list.push(value)
  }

  __removeFromList (value, list) {
    const index = list.indexOf(value)

    if (index !== -1) list.splice(index, 1)
  }
}