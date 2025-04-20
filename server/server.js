const mongoose = require('../src/db/mongoose.js')
const userRouter = require('../src/routers/user.js')

const express = require('express')
const path = require('path')
const Gun = require('gun')
const http = require('http')
// const hbs = require('hbs')
const { gameBlockChain } = require('../blockchain/blockchain.js') // if using CommonJS

const app = express()
const port = process.argv[2] || 5000

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

app.get("/chain", (req, res) => {
  res.json(gameBlockChain.chain);
});

// Create HTTP server
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Express + Gun.js server running on port ${port}`)
})

// Attach Gun.js to the server
const gun = Gun({ web: server, peers: ['https://gun-manhattan.herokuapp.com/gun'] })

// console.log('Gun.js is running with peers:', gun._.opt.peers)

// app.post('/create-user', async (req, res) => {
//   try {
//     const user = new User({
//       name: "TestUser",
//       email: "test@example.com",
//       password: "test1234"
//     });

//     await user.save();
//     res.send({ user });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });







// Block Creation
setInterval(() => {
  let topScore = 0;
  let topUser = "none";

  gun.get("users").map().once((userData, username) => {
    if (userData && userData.highScore > topScore) {
      topScore = userData.highScore
      topUser = username
    }
  });

  // slight delay to ensure map() finishes
  setTimeout(() => {
    if (topUser !== "none") {
      const blockData = {
        username: topUser,
        score: topScore,
        timestamp: Date.now()
      }

      gameBlockChain.addBlock(JSON.stringify(blockData), Math.floor(Math.random() * 100000))
      console.log("🔗 New block created:", gameBlockChain.getLatestBlock())
    }
  }, 2000)

  gun.get("users").map().once((userData, userName) => {
    gun.get("users").get(userName).get("highScore").put(0)
  })
}, 60 * 1000) // Every 1 minute (for now)