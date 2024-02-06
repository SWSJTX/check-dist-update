import { createWorker, workerFunc, cancelWorker } from './utils'

let worker = null

let signKey = 'last_signature'

const cachedSignature = localStorage.getItem(signKey)

let lastSignature = cachedSignature ? JSON.parse(cachedSignature) : []

let noCompare = false

/**
 * Update triggered action detected
 */
let updateTrigger = () => {
  console.log('The system version has been updated！')
}

/**
 * compare
 * @param {string[]} lastSign
 * @param {string[]} curSign
 * @param {function} cb
 */
const compare = (lastSign, curSign, cb) => {
  // If the network is offline, the comparison is not performed
  if (!window.navigator.onLine) return false
  // If fetch is abnormal, no comparison is performed
  if (noCompare) return false
  const oldLength = lastSign.length
  const array = Array.from(new Set(lastSign.concat(curSign)))
  if (oldLength !== array.length) {
    lastSignature = curSign
    localStorage.setItem(signKey, JSON.stringify(lastSignature))
    // If the last time is empty, only the value is replaced, and no operation is triggered
    if (!oldLength) return false
    cb()
  }
}

const visibilityChangeHandler = (e) => {
  const state = e.target?.visibilityState || e.target?.webkitVisibilityState
  if (state === 'visible') {
    worker.postMessage({
      code: "resume",
    })
  } else {
    worker.postMessage({
      code: "pause",
    })
  }
}

/**
 * check update
 * @param {number} init Initial request interval
 * @param {number} loop Loop request interval
 * @param {function} cb Detects update callback functions
 * @param {string} url Detection address URL
 * @param {string} cacheKey Cached Key
 */
const checkUpdate = ({
                       init,
                       loop,
                       cb = updateTrigger,
                       url,
                       cacheKey = signKey
}) => {
  signKey = cacheKey
  updateTrigger = cb

  worker = createWorker(workerFunc)
  worker.postMessage({
    code: "start",
    data: {
      init,
      loop,
      url
    }
  })

  worker.onmessage = (e) => {
    const { sign, noCompare: noC } = e.data
    noCompare = noC
    compare(lastSignature, sign, updateTrigger)
  }

  document.addEventListener('visibilitychange', visibilityChangeHandler)
}

/**
 * cancel detect version changes
 */
const cancelDetect = () => {
  if (worker) cancelWorker(worker)
  document.removeEventListener('visibilitychange', visibilityChangeHandler)
}

export {
  cancelDetect,
  checkUpdate
}
