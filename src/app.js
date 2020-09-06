import Core from './core/Core.js'

import shipImage from './assets/images/ship.png'
import circleImage from './assets/images/circle.png'

const core = new Core(document.querySelector('#gamewindow'), 100, 100)

window.core = core

core.ontick = function (delta) {
  const input = core.input.keyboard
  if (input.keyHold(input.KEYS.SPACE)) {
    console.log('space!')
  }
}

core.assets.setImageAssets({
  ship: shipImage,
  circle: circleImage
})

core.assets.load().then(() => {
  core.start()
}).catch((exception) => {
  console.log(exception)
})