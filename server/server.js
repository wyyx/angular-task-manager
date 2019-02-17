const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const server = express()

var jsonServer = require('json-server')

// use middlewares
server.use(bodyParser.json())

// you may want to mount JSON Server on a specific end-point, for example /api
const dataPath = path.join(__dirname, '..', 'mock/data.json')
server.use('/api', jsonServer.router(dataPath))

// static resources
const staticPath = path.join(__dirname, '..', 'dist/angular-task-manager')
server.use(express.static(staticPath))
server.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// start app
const PORT = process.env.PORT || 8002
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Server is up on port', PORT)
  }
})
