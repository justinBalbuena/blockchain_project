console.log("🔥 gunConfig.js is running");

const gun = Gun([
    'https://gun-manhattan.herokuapp.com/gun',  // Public relay for peer discovery
]);
    
window.gun = gun
console.log('Connected peers:', gun._.opt.peers)