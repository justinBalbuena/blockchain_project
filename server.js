import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { bootstrap } from '@libp2p/bootstrap'
import { mdns } from '@libp2p/mdns'
import { webRTCStar } from '@libp2p/webrtc-star'

const star = webRTCStar()
// Known peers addresses
const bootstrapMultiaddrs = [
  '/ip4/127.0.0.1/tcp/9090/ws/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
]

const node = await createLibp2p({
  transports: [webSockets()],
  connectionEncrypters: [noise()],
  streamMuxers: [yamux()],
  addresses: {
    listen: ['/ip4/0.0.0.0/tcp/0/ws']
  },
  peerDiscovery: [
    bootstrap({
      list: bootstrapMultiaddrs, // provide array of multiaddrs
    }),
  ]
})

await node.start()
console.log('libp2p has started')

const listenAddresses = node.getMultiaddrs()
console.log('libp2p is listening on the following addresses: ', listenAddresses)

node.addEventListener('peer:discovery', async (evt) => {
  console.log('Discovered %s', evt.detail.id.toString()) // Log discovered peer
  const discoveredPeer = evt.detail
  
  try { 
    await node.dial(discoveredPeer.id)
    console.log('Connected to: ', discoveredPeer.id)
  } catch (error) {
    console.error('Failed to connect to:', discoveredPeer.id, error)
  } 
})

node.addEventListener('peer:connect', (evt) => {
  // console.log('Connected to %s \n', evt.detail.toString(),) // Log connected peer
})