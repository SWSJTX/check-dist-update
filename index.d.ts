export interface checkOptions {
  /**
   * Initial request interval
   */
  init?: number,

  /**
   * Loop request interval
   */
  loop?: number,

  /**
   * Detects update callback functions
   */
  cb?: () => void,

  /**
   * Detection address URL
   */
  url?: string,

  /**
   * Cached Key
   */
  cacheKey?: string
}

export function clearTimer(): void

export function checkUpdate(options: checkOptions): void
