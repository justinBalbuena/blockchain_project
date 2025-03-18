const express = require('express');
const path = require('path');
const Gun = require('gun');
const http = require('http');
const hbs = require('hbs');

const app = express();
const port = process.argv[2] || 5000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views');

// Create an HTTP server
const server = http.createServer(app);
console.log(`Gun.js backend running on port: ${port}`);

// Set Handlebars as the templating engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
console.log(`Views are being loaded from: ${viewsPath}`);


// Serve static assets (CSS, JS, images) from public folder
app.use(express.static(publicDirectoryPath));

// Routes to render Handlebars views
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.get('/game', (req, res) => {
  res.render('game', { title: 'Game Page' });
});

app.get('/leaderboard', (req, res) => {
  res.render('leaderboard', { title: 'Leaderboard' });
});

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile Page' });
});

// Start the server
server.listen(port, () => {
  console.log(`Express + Gun.js server with Handlebars running on port ${port}`);
});

// Attach Gun.js to the server
const gun = Gun({ web: server, peers: ['https://gun-manhattan.herokuapp.com/gun'] });

console.log('Gun.js is running with peers:', gun._.opt.peers);