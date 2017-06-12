'use strict'

const {wrap} = require('co')
const debounce = require('..')


function wait (tm) {
  return new Promise((resolve) => setTimeout(resolve, tm))
}


describe('parent-child', () => {
  it('should not throw when save without changes', function * () {
    this.timeout(10000)
    const start = new Date()
    const opts = {wait: 200, initialWait: 1000, maxWait: 500}
    let f = debounce(opts, wrap(function * (acc, done) {
      console.log(' acc',Date.now() - start, acc)
      yield wait(2000)
      console.log('---acc',Date.now() - start, acc)
      done()
    }))

    f({i: 1})
    yield wait(500)
    f({i: 2})
    yield wait(100)
    f({i: 3})
    yield wait(100)
    f({i: 4})
    yield wait(100)
    f({i: 5})
    yield wait(500)
    f({i: 6})
    f({i: 7})
    yield wait(3000)
    f({i: 8})
    f({i: 9})
    yield wait(9000)


  })
})
