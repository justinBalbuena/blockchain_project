const gun = Gun([
  'https://gun-manhattan.herokuapp.com/gun', // Public relay for peer discovery
]);

console.log('Connected peers:', gun._.opt.peers);
export default gun;