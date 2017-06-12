'use strict'

module.exports = debounce

function debounce (opts, fn) {
  const acc = []
  let timeout
  let running
  let initialWaiting

  function invokeNow () {
    invokeNext(true)
  }

  function invokeFn () {
    if (running) return
    initialWaiting = false
    timeout = null
    if (acc.length) {
      running = true
      fn(acc.concat(), invokeNow)
      acc.length = 0
    }
  }

  function invokeNext (now) {
    running = false
    clearTimeout(timeout)
    if (acc.length === 1) initialWaiting = true
    const currentWait = opts.initialWait && acc.length <=1 ? opts.initialWait : opts.wait
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
