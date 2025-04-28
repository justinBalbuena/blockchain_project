// —— IMPORTS ——
import Blockchain from "/js/blockchain/blockchain.js"; // path inside public

// —— SETUP ——
const gun = window.gun; // gun loaded via gunConfig.js
const gameBlockchain = new Blockchain();
let miningActive = false;
let miningTimer = null;

// —— MINING LOGIC ——
function mineIfTopScorer() {
  console.log("🔎 Checking scores for mining...");

  const scores = [];

  gun.get("tempScores").map().once((score, username) => {
    if (typeof score === "number") {
      scores.push({ username, score });
    }
  });

  setTimeout(() => {
    if (scores.length === 0) {
      console.log("⚠️ No scores available.");
      return;
    }

    const top = scores.reduce((max, user) =>
      user.score > max.score ? user : max,
    { username: "none", score: 0 });

    const localUsername = localStorage.getItem("username");

    if (!localUsername || localUsername === "anon") {
      console.log("⏳ Waiting for user login...");
      return;
    }

    if (localUsername === top.username) {
      console.log("✅ I am the top scorer! Mining new block...");

      // Add to local chain
      gameBlockchain.addBlock(top.username, top.score);
    //   console.log(gameBlockchain)

      // Save to Gun
      const blockKey = `block_${Date.now()}`;
      gun.get("chain").get(blockKey).put(gameBlockchain.getLatestBlock());

      console.log("✅ Block mined and saved:", gameBlockchain.getLatestBlock());
    } else {
      console.log(`⛔ Skipped mining. Top scorer is ${top.username}, I am ${localUsername}`);
    }

    // Clear temp scores
    gun.get("tempScores").map().once((_, username) => {
      gun.get("tempScores").get(username).put(null);
    });

  }, 3000);
}

// —— SYNCED MINING TIMER ——
function startSyncedMining() {
  const now = Date.now();
  const nextMinute = Math.ceil(now / 60000) * 60000;
  const delay = nextMinute - now;

  miningTimer = setTimeout(() => {
    if (miningActive) {
      mineIfTopScorer();
      startSyncedMining(); // Reschedule next mining
    }
  }, delay);

  console.log(`⏳ Mining scheduled in ${delay / 1000} seconds`);
}

// —— HANDLE MINING BUTTONS ——
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-mining");
  const stopButton = document.getElementById("stop-mining");

  startButton.addEventListener("click", () => {
    if (!miningActive) {
      miningActive = true;
      startSyncedMining();
      console.log("✅ Mining started.");
    }
  });

  stopButton.addEventListener("click", () => {
    if (miningTimer) {
      clearTimeout(miningTimer);
    }
    miningActive = false;
    console.log("🛑 Mining stopped.");
  });
});

// —— LISTEN FOR NETWORK BLOCKS ——
gun.get("chain").map().on((block, blockKey) => {
  if (!block) return;
  if (!gameBlockchain.chain.some(b => b.hash === block.hash)) {
    console.log("🆕 New block from network:", block);
    gameBlockchain.chain.push(block);
  }
});