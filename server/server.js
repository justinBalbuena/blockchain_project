const mongoose = require('../src/db/mongoose.js')
const userRouter = require('../src/routers/user.js')
const os = require("os");
const crypto = require("crypto");
const express = require('express')
const path = require('path')
const Gun = require('gun')
const http = require('http')
// const hbs = require('hbs')
const { gameBlockChain } = require('../blockchain/blockchain.js')
const { syncChainFromGun } = require('../blockchain/consensus.js')

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

const peerId = os.hostname() + "-" + crypto.randomBytes(4).toString("hex");

let localUsername = "anon";

// Listen for identity assigned to this node
gun.get("nodeIdentity").get(peerId).on((identity) => {
  if (identity?.username) {
    localUsername = identity.username;
    console.log("✅ Synced node identity:", localUsername, "via", peerId);
  }
});

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

gun.get("tempScores").map().once((userData, username) => {
  if (userData && userData.highScore !== undefined) {
    gun.get("tempScores").get(username).get("highScore").put(null); // clears it
    setTimeout(() => {
      gun.get("tempScores").get(username).get("highScore").put(0); // resets it
    }, 500);
  }
});

// console.log('Gun.js is running with peers:', gun._.opt.peers)



// Block Creation
setInterval(() => {
  console.log("⏱️ Checking scores...");

  const scores = [];

  gun.get("tempScores").map().once((score, username) => {
    if (typeof score === "number") {
      scores.push({ username, score });
    }
  });

  setTimeout(() => {
    if (scores.length === 0) {
      console.log("⚠️ No users found with scores.")
      return;
    }

    // ✅ Find the highest scoring user
    const top = scores.reduce((max, user) =>
      user.score > max.score ? user : max,
    { username: "none", score: 0 });

    const blockData = {
      username: top.username,
      timestamp: Date.now()
    };

    gun.get("nodeIdentity").once((identity) => {
      console.log(identity)
      const localUsername = identity?.username || "anon";
      
      console.log("localUsername: ", localUsername)
      if (!localUsername) {
        console.log("⏳ Waiting for node identity...");
        return; // wait for next interval
      }

      if (localUsername === top.username) {
        gameBlockChain.addBlock(JSON.stringify(blockData), top.score);
        const newBlock = gameBlockChain.getLatestBlock();
        gun.get("chain").get(newBlock.index).put({ ...newBlock });
    
        console.log("✅ Mined by:", localUsername);
      } else {
        console.log("⛔ Skipped mining — logged in as", localUsername, "but top scorer is", top.username);
      }
    });


    // gameBlockChain.addBlock(blockData, top.score)

    // //holds new block in the gun chain
    // const newBlock = gameBlockChain.getLatestBlock()
    // gun.get("chain").get(newBlock.index).put({ ... newBlock})

    // console.log("📝 Block saved to Gun at index", newBlock.index);

    // console.log("🔗 New block created:", gameBlockChain.getLatestBlock())
  }, 3000); // ⏱️ Give Gun enough time to finish streaming results

  // Reset temp scores for next round
  gun.get("tempScores").map().once((_, username) => {
    gun.get("tempScores").get(username).put(null);
  });
}, 60 * 1000);