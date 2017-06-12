'use strict'

const {wrap} = require('co')
const debounce = require('..')

describe('parent-child', () => {
  it('should not throw when save without changes', function * () {
    this.timeout(30000)
    const start = new Date()
    const opts = {wait: 200, initialWait: 5000, maxWait: 5000}
    let f = debounce(opts, function (acc, done) {
      console.log(' acc',Date.now() - start, acc)
      wait(2000).then(() => {
        console.log('---acc',Date.now() - start, acc)
        done()
      })
    })

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
    yield wait(6000)
    f({i: 8})
    f({i: 9})
    yield wait(30000)


  })
})

function wait (tm) {
  return new Promise((resolve) => setTimeout(resolve, tm))
}
