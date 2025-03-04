import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // For __dirname equivalent
import hbs from 'hbs';
import { createLibp2p } from 'libp2p';
import { tcp } from '@libp2p/tcp';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { kadDHT } from '@libp2p/kad-dht';
import { bootstrap } from '@libp2p/bootstrap'; 

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
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

app.get('/game', (req, res) => {
    res.render('game', {
        title: 'Game Page',
        name: 'Justin Balbuena',
    });
});

// Start the Express server
const expressServer = app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});

// Initialize libp2p with DHT
const startLibp2p = async () => {
    const node = await createLibp2p({
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0'], // Listen on TCP
        },
        transports: [tcp()], // Use TCP transport
        connectionEncrypters: [noise()], // Use NOISE for encryption
        streamMuxers: [yamux()], // Use Yamux for stream multiplexing
        dht: kadDHT(), // Enable DHT for peer discovery
        peerDiscovery: [{
            list: []
        }]
    });

    // Start libp2p
    await node.start();
    console.log('libp2p has started');

    // Print out listening addresses
    console.log('libp2p listening on addresses:');
    node.getMultiaddrs().forEach((addr) => {
        console.log(addr.toString());
    });
    console.log('\n')

    // Handle peer discovery
    node.addEventListener('peer:discovery', (evt) => {
        const peer = evt.detail
        console.log(`Discovered Peer: ${peer.id.toString()}`)

        startLibp2p.dial(peer.id).catch(error => {
            console.log(`Could not dial ${peer.id}`)
        })
    });

    // Handle peer connections
    node.addEventListener('peer:connect', (evt) => {
        const connection = evt.detail
        console.log('Connected to peer:', connection.remotePeer.toB58String());
    });

    // Handle peer disconnections
    node.addEventListener('peer:disconnect', (evt) => {
        console.log('Disconnected from peer:', evt.remotePeer.toB58String());
    });

    // Stop libp2p when the express server stops
    expressServer.on('close', async () => {
        await node.stop();
        console.log('libp2p has stopped');
    });
};

// Start libp2p
startLibp2p().catch(console.error);