export default class GameTimer {
  constructor () {
    this.ontick = () => {}
    this.__running = false
    this.__tickcount = 0
    this.__lastTickTime = 0
  }

  start () {
    this.__running = true
    this.__lastTickTime = Date.now()
    requestAnimationFrame(this.__tick.bind(this))
  }

  stop () {
    this.running = false
  }

  __tick () {
    const now = Date.now()
    const delta = now - this.__lastTickTime
    
    if (typeof this.ontick == 'function') this.ontick(delta)
    
    this.__lastTickTime = now
    this.__tickcount++

    if (this.__running) {
      requestAnimationFrame(this.__tick.bind(this))
    }
  }
}