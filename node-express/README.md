# 搭建 node 服务器环境

先初始化 `npm init`，生成 `package.json` 文件

```json
{
  "name": "node-express",
  "version": "1.0.0",
  "description": "使用 express 搭建 node 服务器环境",
  "main": "index.js",
  "scripts": {
    "start": "node src/app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.17.3"
  }
}

```

创建 `src` 目录，作为应用主入口，创建 `app.js` 文件

```javascript
// app.js

const express = require('express')
const app = express()

app.get('/login', (req, res) => {
  res.cookie('user', 'Zeeep', { maxAge: 2000000, httpOnly: true })
  res.json({ code: 0, message: 'get login' })
})

app.get('/user', (req, res) => {
  console.log(req.headers.cookie)
  res.json({ code: 0, message: 'get user' })
})

// 必须加斜杠，映射到静态文件 public 目录
// 使用一下写法需注意：如果不使用命令行启动，需要从根目录使用 node src/app 启动项目
app.use('/static', express.static('public'))

app.listen('8001', () => {
  console.log('app running at port 8001')
})
```



再创建 `public` 目录，作为静态文件服务入口，创建 `index.html` 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zeeep</title>
</head>
<body>
  <div id="app">这是 Zeeep</div>
</body>
</html>
```

启动项目之后，就可以把静态文件随意地丢到 `public` 目录里面了，`express` 会自动把文件夹下的 `index.html` 当作主入口

