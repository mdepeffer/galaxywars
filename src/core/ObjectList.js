export default class ObjectList {
  constructor () {
    this.__list = []
  }

  get length () { return this.__list.length }

  add (object) {
    if (this.isExistingInList(object)) return
    this.__list.push(object)
  }

  remove (object) {
    const index = this.indexOf(object)
    if (index === -1) return
    this.__list.splice(index, 1)
  }

  get (index) {
    return this.__list[index]
  }

  indexOf (object) {
    return this.__list.indexOf(object)
  }

  isExistingInList (object) {
    return (this.indexOf(object) !== -1)
  }

  each (callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this.get(i), i)
    }
  }
}