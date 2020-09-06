import GameTimer from './GameTimer'
import Screen from './Screen'
import KeyboardInput from './input/KeyboardInput'
import AssetLoader from './assets/AssetLoader'

export default class Core {
  constructor (gameCanvas, width, height) {
    this.screen  = new Screen(gameCanvas, width, height)
    this.timer = new GameTimer()
    this.input = {
      keyboard: new KeyboardInput()
    }
    this.assets = new AssetLoader()

    this.ontick = () => {}

    this.timer.ontick = this.__tick.bind(this)
  }

  start () {
    this.timer.start()
  }

  __tick (delta) {
    if (typeof this.ontick == 'function') this.ontick(delta)
    this.input.keyboard.update()
  }
}