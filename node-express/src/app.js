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

// 必须加斜杠
app.use('/static', express.static('public'))

app.listen('8001', () => {
  console.log('app running at port 8001')
})