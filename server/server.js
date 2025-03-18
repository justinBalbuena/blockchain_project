const express = require('express');
const path = require('path');
const Gun = require('gun');
const http = require('http');
const hbs = require('hbs');

const app = express();
const port = process.argv[2] || 5000;

// Serve static assets (CSS, images, JS)
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// Serve JavaScript files correctly
app.use('/js', express.static(path.join(__dirname, '../public/js')));

// Set Handlebars as the templating engine
const viewsPath = path.join(__dirname, '../views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

console.log(`Views are being loaded from: ${viewsPath}`);

// Routes to render Handlebars views
app.get('/', (req, res) => 
  res.render('index', { title: 'Home Page' })
);

app.get('/game', (req, res) => {
  res.render('game', { title: 'Game Page' });
});

app.get('/leaderboard', (req, res) => {
  res.render('leaderboard', { title: 'Leaderboard' });
});

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile Page' });
});

// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express + Gun.js server running on port ${port}`);
});

// Attach Gun.js to the server
const gun = Gun({ web: server, peers: ['https://gun-manhattan.herokuapp.com/gun'] });

console.log('Gun.js is running with peers:', gun._.opt.peers);