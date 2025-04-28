async function syncChainFromGun (gun, gameBlockChain) {
    console.log("Syncing From Gun")

    const blocks = []

    gun.get("chain").map().once((block) => {
        // console.log("blockMap: ", block)
        if (block && typeof block.index === 'number') {
            blocks.push(block)
        }
    })

    setTimeout(() => {
        if (blocks.length === 0) {
          console.log("There were no blocks");
          return;
        }
        
        // console.log(blocks)
        blocks.sort((a, b) => a.index - b.index);
        // console.log("blocks: ", blocks);
      
        const isValid = blocks.every((block, i) => {
          if (i === 0) return true;
          return block.previousHash === blocks[i - 1].hash;
        });
      
        if (isValid && blocks.length > gameBlockChain.getChainLength()) {
          gameBlockChain.chain = blocks;
          console.log(`✅ Chain synced: ${blocks.length} blocks`);
        } else {
          console.log("❌ Chain is invalid or not longer");
        }
      }, 5000);
}

module.exports = {
    syncChainFromGun
}