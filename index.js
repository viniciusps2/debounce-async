'use strict'

module.exports = debounce

function debounce ({wait = 0, initialWait, maxWait}, fn) {
  const acc = []
  let timeout
  let timeoutMaxWait
  let running
  let initialWaiting

  function invokeNow () {
    if (timeoutMaxWait) console.log('==timeoutMaxWait')
    timeoutMaxWait && clearTimeout(timeoutMaxWait)
    invokeNext(true)
  }

  function invokeFn () {
    if (running) return
    initialWaiting = false
    timeout = null
    if (acc.length) {
      running = true
      maxWait && (timeoutMaxWait = setTimeout(invokeNow, maxWait))
      fn(acc.concat(), invokeNow)
      acc.length = 0
    }
  }

  function invokeNext (now) {
    running = false
    clearTimeout(timeout)
    if (acc.length === 1) initialWaiting = true
    const currentWait = acc.length > 1 ? wait : initialWait
    console.log(' currentWait', currentWait, running)
    now
      ? invokeFn()
      : (timeout = setTimeout(invokeFn, currentWait))
  }

  return function (val) {
    acc.push(val)
    console.log('..',running, val)
    !running && !initialWaiting && invokeNext()
  }
}
