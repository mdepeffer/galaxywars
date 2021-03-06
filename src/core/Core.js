import GameTimer from './GameTimer'
import Screen from './Screen'
import KeyboardInput from './input/KeyboardInput'
import AssetLoader from './assets/AssetLoader'
import Renderer from './Renderer'

export default class Core {
  constructor (gameCanvas, width, height) {
    this.screen  = new Screen(width, height, gameCanvas)
    this.timer = new GameTimer()
    this.input = {
      keyboard: new KeyboardInput()
    }
    this.assets = new AssetLoader()
    this.renderer = new Renderer(this.screen)

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