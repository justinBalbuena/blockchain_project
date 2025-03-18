// // /public/blockchain.js
// import gun from './gunConfig';

// const blockchain = gun.get('blockchain');

// // Listen for new blocks
// blockchain.map().on((block) => {
//   console.log(`New Block Received:`, block);
// });

// export function submitScoreToBlockchain(username, score) {
//   const block = {
//     index: Date.now(),
//     username,
//     score,
//     timestamp: Date.now(),
//     previousHash: blockchain.back(-1) || '0',
//   };

//   blockchain.set(block);
//   console.log(`Block Created: ${JSON.stringify(block)}`);
// }