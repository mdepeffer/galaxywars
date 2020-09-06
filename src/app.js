import Core from './core/Core.js'

import shipImage from './assets/images/ship.png'
import circleImage from './assets/images/circle.png'

import Utils from './core/utilities/Utils'
import Point from './core/utilities/Point'

import SpriteObject from './core/objects/SpriteObject'

const core = new Core(document.querySelector('#gamewindow'), 600, 400)

window.core = core

core.ontick = function (delta) {
  core.screen.fill("#000000")

  obj = window.obj

  const input = core.input.keyboard
  const trans = new Point(0, 0)
  if (input.keyHold(input.KEYS.RIGHT)) { trans.x += 1 }
  if (input.keyHold(input.KEYS.LEFT)) { trans.x -= 1 }
  if (input.keyHold(input.KEYS.UP)) { trans.y -= 1 }
  if (input.keyHold(input.KEYS.DOWN)) { trans.y += 1 }
  obj.position.translate(trans.x, trans.y)

  core.screen.context.drawImage(obj.texture.canvas, obj.position.x, obj.position.y, obj.width, obj.height)
}

core.assets.setImageAssets({
  ship: shipImage,
  circle: circleImage
})

core.assets.load().then(() => {
  window.obj = new SpriteObject(null, new Point(10, 10), core.assets.getImage('ship', false))

  core.start()
}).catch((exception) => {
  console.log(exception)
})