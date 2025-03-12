const express = require('express');
const Gun = require('gun');

const app = express();
const port = process.argv[2] || 5000; // Default backend to 5000

console.log(`Gun.js backend running on port: ${port}`);

app.use(express.static('./public'));

const server = app.listen(port, () => {
  console.log(`Gun.js server listening on port ${port}`);
});

// Attach Gun to the backend server
Gun({ web: server });