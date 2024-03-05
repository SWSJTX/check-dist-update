# check-dist-update

English | [中文文档](./README-zh_CH.md)

A simple tool to check dist version update

This is a tool to detect the change of dist version by detecting the updates of js and css file signature values referenced by the entrance page file in dist constructed by webpack, vite, etc

# Install

```shell
npm install check-dist-update
```

```shell
yarn add check-dist-update
```

```shell
pnpm add check-dist-update
```

# Usage

- import

```javascript
import { checkUpdate, cancelDetect } from 'check-dist-update'

checkUpdate({
  url: `${location.origin}/index.html`,
  loop: 1000 * 60,
  init: 1000 * 10,
  cb: () => {},
  cacheKey: 'last_signature'
})

// cancel detection
setTimeout(() => {
  cancelDetect()
}, 1000 * 60)
```

- require

```javascript
const check = require('check-dist-update')

check.checkUpdate({
  url: `${location.origin}/index.html`,
  loop: 1000 * 60,
  init: 1000 * 10,
  cb: () => {},
  cacheKey: 'last_signature'
})

// cancel detection
setTimeout(() => {
  check.cancelDetect()
}, 1000 * 60)
```

# checkUpdate params config

|   name   |           description            |   type   |             default             |
| :------: | :------------------------------: | :------: | :-----------------------------: |
|   init   |     Initial request interval     |  number  |              10000              |
|   loop   |      Loop request interval       |  number  |              60000              |
|   url    |      Detection address URL       |  string  | `${location.origin}/index.html` |
|    cb    | Detects update callback function | function |            () => {}             |
| cacheKey |            Cached Key            |  string  |         last_signature          |

# Thanks
This tool is affected by [`version polling`](https://www.npmjs.com/package/version-polling). Thank you very much for your inspiration!

