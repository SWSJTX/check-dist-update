let initInterval = 1000 * 10

let loopInterval = 1000 * 60

const REGEXP = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi)

let signKey = 'last_signature'

const cachedSignature = localStorage.getItem(signKey)

let lastSignature = cachedSignature ? JSON.parse(cachedSignature) : []

const URL = `${location.origin}/index.html`

let websiteUrl = ''

let timer = undefined

let noCompare = false

let enable = false


/**
 * getResource
 * @returns {Promise<string>}
 */
const getResource = async () => {
  try {
    if (!websiteUrl) {
      noCompare = true
      return ''
    }
    const res = await fetch(`${websiteUrl}?t=${Date.now()}`)
    if (res.status === 200) {
      const html = await res.text()
      noCompare = false
      return html
    } else {
      noCompare = true
      return ''
    }
  } catch (e) {
    noCompare = true
    return ''
  }
}

/**
 * getSignature
 * @param {string} html
 * @returns {string[]}
 */
const getSignature = (html) => html?.match(REGEXP) || []

/**
 * compare
 * @param {string[]} lastSign
 * @param {string[]} curSign
 * @param {function} cb
 */
const compare = async (lastSign, curSign, cb) => {
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


/**
 * Update triggered action detected
 */
let updateTrigger = () => {
  console.log('The system version has been updated！')
}

/**
 * Get sign and compare difference
 * @param {function} cb
 * @returns {Promise<void>}
 */
const compareHandler = async (cb) => {
  const html = await getResource()
  const sign = getSignature(html)
  await compare(lastSignature, sign, cb)
}

/**
 * clear timer
 */
const clearTimer = () => {
  clearInterval(timer)
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
                              init = initInterval,
                              loop = loopInterval,
                              cb = updateTrigger,
                              url = URL,
                              cacheKey = signKey
                            }) => {
  websiteUrl = url
  signKey = cacheKey
  updateTrigger = cb
  initInterval = init
  loopInterval = loop
  enable = true
  setTimeout(async () => {
    await compareHandler(cb)
    clearTimer()
    timer = setInterval(async () => {
      await compareHandler(cb)
    }, loop)
  }, init)
}

const visibilityChangeHandler = (e) => {
  if (!enable) return
  const state = e.target?.visibilityState || e.target?.webkitVisibilityState
  if (state === 'visible') {
    setTimeout(async () => {
      await compareHandler(updateTrigger)
      clearTimer()
      timer = setInterval(async () => {
        await compareHandler(updateTrigger)
      }, loopInterval)
    }, initInterval)
  } else {
    clearTimer()
  }
}

document.addEventListener('visibilitychange', visibilityChangeHandler)

export {
  clearTimer,
  checkUpdate
}
