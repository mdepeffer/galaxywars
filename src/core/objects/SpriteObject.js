import GameObject from "./GameObject"
import Point from "../utilities/Point"

export default class SpriteObject extends GameObject {
  constructor(scene, position, bitmap) {
    super(scene)

    this.__position = position.copy()
    this.__bitmap = bitmap
    this.__width = bitmap.width
    this.__height = bitmap.height
    this.__origin = new Point(0.5, 0.5)
  }

  get position () { return this.__position }
  get x () { return this.__position.x }
  get y () { return this.__position.y }
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


}