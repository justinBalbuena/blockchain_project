console.log("🔥 New chainDisplay.js loaded");

// Assume Gun is already loaded via gunConfig.js
const gun = window.gun;

async function loadChain() {
  const container = document.querySelector(".chain_container");
  container.innerHTML = "";

  const blocks = [];

  // Fetch all blocks from Gun
  gun.get("chain").map().once((block, blockKey) => {
    if (!block) return;
    blocks.push(block);
  });

  // Give time for blocks to stream in
  setTimeout(() => {
    if (blocks.length === 0) {
      container.innerHTML = "<p>❗ No Blocks Found</p>";
      return;
    }

    // Sort by index (lowest to highest)
    blocks.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

    // Display each block
    blocks.forEach((block) => {
      const blockDiv = document.createElement("div");
      blockDiv.classList.add("block_card");

      blockDiv.innerHTML = `
        <h3>Block #${block.index}</h3>
        <p><strong>Mined by:</strong> ${block.username ?? "Unknown"}</p>
        <p><strong>Score:</strong> ${block.score ?? "?"}</p>
        <p><strong>Timestamp:</strong> ${block.timestamp ? new Date(block.timestamp).toLocaleString() : "?"}</p>
        <p><strong>Hash:</strong> ${block.hash ?? "?"}</p>
        <p><strong>Previous Hash:</strong> ${block.previousHash ?? "?"}</p>
      `;

      container.append(blockDiv);
    });

  }, 2000); // Allow time for Gun to finish syncing
}

document.addEventListener("DOMContentLoaded", () => {
  loadChain();
  setInterval(loadChain, 600000); // Refresh every 10 minutes
});

const refreshButton = document.getElementById("refresh-chain")
refreshButton.addEventListener("click", () => {
    loadChain()
})