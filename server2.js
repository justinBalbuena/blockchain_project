const express = require('express')
const Gun = require('gun')
const app = express()
const port = 3001


app.use(express.static('./public'))
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});


// Specify peers (add the other server's address)
Gun({ web: server, peers: ['https://gun-manhattan.herokuapp.com/gun'] })