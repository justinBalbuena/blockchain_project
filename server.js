require('dotenv').config();
const express = require('express');
const Gun = require('gun');
const app = express();
const port = process.argv[2];
console.log(port)

// Serve static files from the "public" folder
app.use(express.static('./public'));


const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Attach Gun to the same server
Gun({ web: server });