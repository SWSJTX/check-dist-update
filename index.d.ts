interface Options {
  /**
   * Initial request interval
   * default: 10s
   */
  init?: number,

  /**
   * Loop request interval
   * default: 60s
   */
  loop?: number,

  /**
   * Detects update callback function
   */
  cb?: () => void,

  /**
   * Detection address URL
   * default: `${location.origin}/index.html`
   */
  url?: string,

  /**
   * Cached Key
   * default: last_signature
   */
  cacheKey?: string
}

export function cancelDetect(): void

export function checkUpdate(options: Options): void
