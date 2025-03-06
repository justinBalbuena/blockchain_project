import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { bootstrap } from '@libp2p/bootstrap'

const bootstrapMultiaddrs = [
  '/ip4/127.0.0.1/tcp/9090/ws/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb' // Replace with actual relay node ID
]

const node = await createLibp2p({
  transports: [webSockets()],
  connectionEncrypters: [noise()],
  streamMuxers: [yamux()],
  peerDiscovery: [
    bootstrap({
      list: bootstrapMultiaddrs
    }),
  ]
})

await node.start()
console.log('Browser Libp2p node started:', node.peerId.toString())

node.addEventListener('peer:discovery', async (evt) => {
  console.log('Discovered %s', evt.detail.id.toString())
  try {
    await node.dial(evt.detail.id)
    console.log('Connected to:', evt.detail.id)
  } catch (error) {
    console.error('Failed to connect:', evt.detail.id, error)
  }
})

node.addEventListener('peer:connect', (evt) => {
  console.log('Connected to:', evt.detail.toString())
})