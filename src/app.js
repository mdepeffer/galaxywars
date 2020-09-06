import Core from './core/Core.js'

const core = new Core(document.querySelector('#gamewindow'), 100, 100)
core.ontick = tick

function tick (delta) {
  if (core.input.keyboard.keyHold(32)) {
    console.log('space!')
  }
}

core.start()