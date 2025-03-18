// // /public/gameLogic.js
// import gun from './gunConfig.js';

// const leaderboard = gun.get('leaderboard');

// // Submit score to Gun.js leaderboard
// export function submitScore(username, score) {
//   leaderboard.set({
//     username,
//     score,
//     timestamp: Date.now(),
//   });
// }

// // Listen for new scores
// leaderboard.map().once((data) => {
//   console.log(`Leaderboard Update: ${data.username} - ${data.score}`);
// });