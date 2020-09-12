import Core from './core/Core.js'
import Scene from './core/Scene'

import shipImage from './assets/images/ship.png'
import circleImage from './assets/images/circle.png'

import Vector from './core/utilities/Vector'

import Ship from './game/Ship'

import Color from './core/utilities/Color'
import Utils from './core/utilities/Utils'

window.color = Color
window.utils = Utils

const core = new Core(document.querySelector('#gamewindow'), 600, 400)
const scene = new Scene(core)

window.core = core
window.vector = Vector

let rotation = 0
const renderer = core.renderer
const input = core.input.keyboard

core.ontick = function (delta) {
  update()
  render()
}

core.assets.setImageAssets({
  ship: shipImage,
  circle: circleImage
})

core.assets.load().then(() => {
  new Ship(scene, input, new Vector(10, 10), core.assets.getImage('ship', false))

  core.start()
}).catch((exception) => {
  console.error(exception)
})

function update () {
  scene.update()
}

function render () {
  renderer.preRender()
  scene.render()
}