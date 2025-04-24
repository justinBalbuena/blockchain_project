console.log("🔥 chainDisplay.js loaded")
async function loadChain() {
    const container = document.querySelector(".chain_container")

    try {
        const response = await fetch("/chain/json")
        const chain = await response.json()

        // console.log("📦 Raw chain data:", chain);
        container.innerHTML = "";

        if (!Array.isArray(chain) || chain.length == 0) {
            container.innerHTML = "<p>There are no Blocks</p>"
            return
        }
        

        chain.forEach((block, index) => {
            const blockDiv = document.createElement("div")
            blockDiv.classList.add("block_card")

            let parsedData = {};
            try {
                parsedData = JSON.parse(block.data);
            } catch {
                parsedData = { username: "Unknown", timestamp: block.timestamp || Date.now() };
            }
            
            blockDiv.innerHTML = `
                <h3>Block ${block.index}</h3>
                <p>Mined by ${block.data.username}</p>
                <p>Data: ${block.data}</p>
                <p>Score: ${block.score}</p>
                <p><strong>Timestamp:</strong> ${new Date(parsedData.timestamp).toLocaleString()}</p>
                <p><strong>Block Hash:</strong> ${block.hash}</p>
                <p>Previous Hash: ${block.previousHash}</p>
            `

            container.append(blockDiv)
        }) 
    } catch(e) {
        container.innerHTML = `<p>Error Loading Blockchain</p>`
        console.log(e)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadChain()
    setInterval(loadChain, 5000)
})