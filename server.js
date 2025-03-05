import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // For __dirname equivalent
import hbs from 'hbs';
import http from 'http'; // Required for socket.io
import { Server } from 'socket.io'; // Required for socket.io

import { createLibp2p } from 'libp2p';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { kadDHT } from '@libp2p/kad-dht';
import { webRTC } from '@libp2p/webrtc';
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2';
import { identify } from '@libp2p/identify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
const server = http.createServer(app); // Using http server to work with socket.io
const io = new Server(server); // Create Socket.IO instance attached to the server
const PORT = process.argv[2] || 3000;

// Setup for Handlebars
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, './public/templates/views');
const partialsPath = path.join(__dirname, './public/templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve static files from the "public" folder
app.use(express.static(publicDirectoryPath));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index Page',
        name: 'Justin Balbuena',
    });
});

// Route for the game page
app.get('/game', (req, res) => {
    res.render('game', {
        title: 'Game Page',
        name: 'Justin Balbuena',
    });
});

// Socket.io logic for signaling
io.on('connection', (socket) => {
    console.log('A peer connected:', socket.id);

    // Handle offer signal
    socket.on('offer', (offer, to) => {
        console.log(`Sending offer to peer ${to}`);
        socket.to(to).emit('offer', offer, socket.id);
    });

    // Handle answer signal
    socket.on('answer', (answer, to) => {
        console.log(`Sending answer to peer ${to}`);
        socket.to(to).emit('answer', answer);
    });

    // Handle ICE candidate signal
    socket.on('candidate', (candidate, to) => {
        console.log(`Sending ICE candidate to peer ${to}`);
        socket.to(to).emit('candidate', candidate);
    });

    // Handle peer disconnect
    socket.on('disconnect', () => {
        console.log('Peer disconnected:', socket.id);
    });
});

// Start the Express server with socket.io
server.listen(PORT, () => {
    console.log(`Express server with signaling is running on http://localhost:${PORT}`);
});

// Initialize libp2p with DHT and WebRTC
const startLibp2p = async () => {
    const node = await createLibp2p({
        addresses: {
            listen: ['/webrtc'],
        },
        transports: [webRTC(), circuitRelayTransport()],
        connectionEncrypters: [noise()],
        streamMuxers: [yamux()],
        dht: kadDHT({ protocolPrefix: '/ipfs' }),
        services: {
            identify: identify()
        },
    });

    // Start libp2p
    await node.start();
    console.log('libp2p has started');

    // Print out listening addresses
    console.log('libp2p listening on addresses:');
    node.getMultiaddrs().forEach((addr) => {
        console.log(addr.toString());
    });

    // Handle peer discovery
    node.addEventListener('peer:discovery', (evt) => {
        const peer = evt.detail;
        console.log(`Discovered Peer: ${peer.id.toString()}`);
        node.dial(peer.id).catch((error) => {
            console.log(`Could not dial ${peer.id}`);
        });
    });

    // Handle peer connections
    node.addEventListener('peer:connect', (evt) => {
        const connection = evt.detail;
        console.log('Connected to peer:', connection.remotePeer.toB58String());
    });

    // Handle peer disconnections
    node.addEventListener('peer:disconnect', (evt) => {
        console.log('Disconnected from peer:', evt.remotePeer.toB58String());
    });

    // Stop libp2p when the express server stops
    server.on('close', async () => {
        await node.stop();
        console.log('libp2p has stopped');
    });
};

// Start libp2p
startLibp2p().catch(console.error);