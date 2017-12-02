import sinon from 'sinon'

import Listener from './listener'

describe('Listener', () => {
  it('should create a instance', () => {
    const listener = new Listener()
    expect(listener instanceof Listener).to.equal(true)
  })

  it('should add a callback function to internal listener array', () => {
    const listener = new Listener()
    const cb = sinon.spy()
    listener.add(cb)
    expect(listener.callbacks[0]).to.equal(cb)
  })

  it('should add an array of callback functions and add them to internal listener array', () => {
    const listener = new Listener()
    const cb1 = sinon.spy()
    const cb2 = sinon.spy()
    listener.add([cb1, cb2])
    expect(listener.callbacks).to.deep.equal([cb1, cb2])
  })

  it('should clear internal listener array', () => {
    const listener = new Listener()
    const cb = sinon.spy()
    listener.add(cb)
    expect(listener.callbacks[0]).to.equal(cb)
    listener.clear()
    expect(listener.callbacks.length).to.equal(0)
  })

  it('should call all added listeners once', () => {
    const listener = new Listener()
    const cb1 = sinon.spy()
    const cb2 = sinon.spy()
    listener.add([cb1, cb2])
    listener.run()
    expect(cb1.calledOnce).to.equal(true)
    expect(cb2.calledOnce).to.equal(true)
  })
})
