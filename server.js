const mongoose = require('./src/db/mongoose.js')
const userRouter = require('./src/routers/user.js')
const os = require("os");
const crypto = require("crypto");
const express = require('express')
const path = require('path')
const Gun = require('gun')
const http = require('http')
const hbs = require('hbs')
const { gameBlockChain } = require('./config/blockchainServer.js')
const { syncChainFromGun } = require('./src/consensus/consensus.js')

const app = express()
const port = process.env.PORT

// Serve static assets (CSS, images, JS)
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// Serve JavaScript files correctly
app.use('/js', express.static(path.join(__dirname, '../public/js')))

// Using routes
app.use(express.json())
app.use(userRouter)


// Set Handlebars as the templating engine
const viewsPath = path.join(__dirname, '../views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// console.log(`Views are being loaded from: ${viewsPath}`)

// Routes to render Handlebars views
app.get('/', (req, res) => 
  res.render('index', { title: 'Home Page' })
)

app.get('/game', (req, res) => {
  res.render('game', { title: 'Game Page' })
});

app.get('/leaderboard', (req, res) => {
  res.render('leaderboard', { title: 'Leaderboard' })
})

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile Page' })
})

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page'})
})

app.get("/chain", (req, res) => {
  res.render('chain', {title: 'Blockchain Page'})
});

app.get("/chain/json", (req, res) => {
  res.json(gameBlockChain.chain);
})

// Create HTTP server
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Express + Gun.js server running on port ${port}`)
})

// Attach Gun.js to the server
const gun = Gun({ web: server, file: false, peers: ['https://gun-manhattan.herokuapp.com/gun'] })
console.log("🧹 Resetting high scores on startup...");
syncChainFromGun(gun, gameBlockChain)

/*---Saving Genesis Block---*/
const genesisBlock = gameBlockChain.getLatestBlock();

gun.get("chain").get(genesisBlock.index).once((existing) => {
  if (!existing) {
    console.log("🔧 Saving genesis block to Gun...");
    gun.get("chain").get(genesisBlock.index).put({ ...genesisBlock });
  } else {
    console.log("✅ Genesis block already exists in Gun.");
  }
});
/*---------------------------*/