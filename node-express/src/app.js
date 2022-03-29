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
// app.use('/static', express.static('public'))
// 也可以不带路径，但都需要从根目录启动项目
app.use(express.static('public'))

app.listen('8001', () => {
  console.log('app running at port 8001')
})