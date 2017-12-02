import sinon from 'sinon'
import cb from './callbackHandler'

describe('callbackHandler', () => {
  it('should call a function with the passed arguments', () => {
    const spy = sinon.spy()
    cb(spy, 'Hallo', 'Welt')
    expect(spy.calledWithExactly('Hallo', 'Welt')).to.equal(true)
  })

  it('should not throw an error, if passed first param is not a function', () => {
    const param = 5
    cb(param, 'Hello')
  })

  it('should not throw an error, if passed first param is not a function - 1', () => {
    const param = {}
    cb(param, 'Hello')
  })

  it('should not throw an error, if passed first param is not a function - 2', () => {
    const param = true
    cb(param, 'Hello')
  })
})
