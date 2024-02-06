# check-dist-update

简体中文 | [English](./README.md)

一个检测 dist 版本更新的简单工具

这是一个通过检测由 webpack、vite 等构建的 dist 中的入口页面文件所引用的 js 和 css 文件签名值的变化来检测 dist 版本变化的工具

# 安装方式

```shell
npm install check-dist-update
```

```shell
yarn add check-dist-update
```

```shell
pnpm add check-dist-update
```

# 使用方式

- import 方式

```javascript
import { checkUpdate, cancelDetect } from 'check-dist-update'

checkUpdate({
  url: `${location.origin}/index.html`,
  loop: 1000 * 60,
  init: 1000 * 10,
  cb: () => {},
  cacheKey: 'last_signature'
})

// 取消检测
setTimeout(() => {
  cancelDetect()
}, 1000 * 60)
```

- require 方式

```javascript
const check = require('check-dist-update')

check.checkUpdate({
  url: `${location.origin}/index.html`,
  loop: 1000 * 60,
  init: 1000 * 10,
  cb: () => {},
  cacheKey: 'last_signature'
})

// 取消检测
setTimeout(() => {
  check.cancelDetect()
}, 1000 * 60)
```

# checkUpdate 接收参数设置

|   名称    |       描述      |   类型   |             默认值              |
| :------: | :------------: | :------: | :-----------------------------: |
|   init   |   初始请求间隔    |  number  |              10000              |
|   loop   |   循环请求间隔    |  number  |              60000              |
|   url    |   检测地址 URL   |  string  | `${location.origin}/index.html` |
|    cb    |  检测更新回调函数  | function |            () => {}             |
| cacheKey |    缓存 key     |  string  |         last_signature          |
