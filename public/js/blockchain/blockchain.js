import CryptoJS from "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/+esm";

class Block {
    constructor(index, username, previousHash = '', score = 0) {
        /* 
            index: block number
            nonce: nonce
            data: information like transactions
            previousHash: previous block's hash value
        */
        this.index = index
        this.username = username
        this.timestamp = Date.now()
        this.score = score
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        const data = (this.index + this.username + this.timestamp + this.score + this.previousHash).replaceAll(" ", "");
        return CryptoJS.SHA256(data).toString();
    }

    getHash() {
        return this.hash
    }
}

class Blockchain {
    constructor() {
        // This begins the chain and by calling createGenesisBlock(), the chain has a genesis block the moment its created
        this.chain = [this.createGenesisBlock()];
    }

    // no need to check if there is any genesis blokc in already
    createGenesisBlock() {
        return new Block(0, 'Genesis Block', '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    // When adding a block, "data" should only consist of the username and timestamp
    addBlock(username, score) {
        const usersBlock = new Block(this.getLatestBlock().index + 1, username, 0, score)
        usersBlock.previousHash = this.getLatestBlock().hash
        usersBlock.hash = usersBlock.calculateHash()

        this.chain.push(usersBlock)
    }

    // This checks to see if the hash values of a block match the previous blocks hash value
    // Then it checks to see if the hash value of the current block is different to what would be calculated
    // This'll be used more in the future probably
    isChainValid() {
        for (let i = 1; i < this.getChainLength(); i++) {
            if (this.chain[i].hash !== this.chain[i - 1].hash) {
                return false
            }

            if (this.chain[i].hash !== this.chain[i].calculateHash()) {
                return false
            }
        }
        return true
    }

    getChainLength() {
        return this.chain.length
    }

    getLatestHash() {
        return this.getLatestBlock().hash
    }

    getChain() {
        return this.chain
    }
}

const gameBlockChain =  new Blockchain()

export default Blockchain