# check-dist-update

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
import { checkUpdate } from 'check-dist-update'

checkUpdate({
  url: `${location.origin}/index.html`,
  loop: 1000 * 60,
  init: 1000 * 10,
  cb: () => {},
  cacheKey: 'last_signature'
})
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
```

# params config
|   name   |            description            |   type   |             default             |
|:--------:|:---------------------------------:|:--------:|:-------------------------------:|
|   init   |     Initial request interval      |  number  |              10000              |
|   loop   |       Loop request interval       |  number  |              60000              |
|   url    |       Detection address URL       |  string  | `${location.origin}/index.html` |
|    cb    | Detects update callback function  | function |            () => {}             |
| cacheKey |            Cached Key             |  string  |         last_signature          |


