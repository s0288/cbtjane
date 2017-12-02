import callbackHandler from './callbackHandler'

class Listener {
  constructor() {
    this.callbacks = []
  }

  run() {
    this.callbacks.forEach(cb => callbackHandler(cb))
  }

  clear() {
    this.callbacks.length = 0
  }

  add(cb) {
    if (cb instanceof Array) {
      cb.forEach(callback => this.callbacks.push(callback))
    } else {
      this.callbacks.push(cb)
    }
  }
}

export default Listener
