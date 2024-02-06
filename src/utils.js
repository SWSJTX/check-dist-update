/**
 * create worker
 * @param func
 * @returns {Worker}
 */
const createWorker = (func) => {
  const blob = new Blob(["(" + func.toString() + ")()"]);
  const url = window.URL.createObjectURL(blob)
  const worker = new Worker(url)
  window.URL.revokeObjectURL(url)
  return worker
}

/**
 * worker function
 * @returns {Window | (WorkerGlobalScope & Window)}
 */
const workerFunc = () => {
  let initInterval = 1000 * 10

  let loopInterval = 1000 * 60

  const REGEXP = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>|<link(?:\s+[^>]*)?>(.*?)/gi)

  let websiteUrl = `${location.origin}/index.html`

  let timer = undefined

  let noCompare = false

  let enable = false

  /**
   * getResource
   * @returns {Promise<string>}
   */
  const getResource = () => {
    return new Promise((resolve) => {
      if (!websiteUrl) {
        noCompare = true
        return resolve('')
      }
      fetch(`${websiteUrl}?t=${Date.now()}`).then(res => {
        if (res.status === 200) {
          res.text().then(html => {
            noCompare = false
            return resolve(html)
          }).catch(e => {
            console.log(e)
            noCompare = true
            return resolve('')
          })
        } else {
          noCompare = true
          return resolve('')
        }
      }).catch(e => {
        console.log(e)
        noCompare = true
        return resolve('')
      })
    })
  }

  /**
   * getSignature
   * @param {string} html
   * @returns {string[]}
   */
  const getSignature = (html) => html?.match(REGEXP) || []

  /**
   * clear timer
   */
  const clearTimer = () => {
    clearInterval(timer)
  }

  self.onmessage = (e) => {
    const { code, data } = e.data
    const {
      url = websiteUrl,
      init = initInterval,
      loop = loopInterval
    } = data || {}

    websiteUrl = url
    initInterval = init
    loopInterval = loop
    enable = true

    /**
     * Get sign and compare difference
     */
    const compareHandler = () => {
      getResource().then(html => {
        const sign = getSignature(html)
        self.postMessage({
          sign,
          noCompare
        })
      })
    }

    if (code === 'pause') {
      clearTimer()
    } else {
      if (!enable) return
      setTimeout(() => {
        compareHandler()
        clearTimer()
        timer = setInterval(() => {
          compareHandler()
        }, loopInterval)
      }, initInterval)
    }
  }
  return self
}

/**
 * terminate worker
 * @param worker
 */
const cancelWorker = (worker) => {
  worker.postMessage({
    code: "pause",
  })
  worker.terminate()
  worker = null
}

export {
  createWorker,
  workerFunc,
  cancelWorker
}
