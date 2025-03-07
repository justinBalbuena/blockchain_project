import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { bootstrap } from '@libp2p/bootstrap'

const node = await createLibp2p({
  transports: [webSockets()],
  connectionEncrypters: [noise()],
  streamMuxers: [yamux()],
  addresses: {
    listen: ['/ip4/0.0.0.0/tcp/9090/ws'] // WebSockets relay
  },
  peerDiscovery: [
    bootstrap({
      list: ['/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb'],
    }),
  ],
})

await node.start()
console.log('Relay node started:', node.peerId.toString())

const listenAddresses = node.getMultiaddrs()
console.log('Listening on:', listenAddresses.map(addr => addr.toString()).join('\n'))