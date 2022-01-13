# YouTube Party: A Synchronized Streaming Platform

YouTube Party is a full-stack web application that lets any number of users
stream YouTube videos in sync using the 
[Socket.IO](https://socket.io) library and the 
[YouTube iFrame](https://developers.google.com/youtube/iframe_api_reference)
API.

## Architecture Overview

In order to support synchronous message passing between multiple clients and a
server, YouTube Party uses the 
[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) 
API, which enables two-way communication
between each server and client. Notably, each client may receive messages from
the server without having to regularly poll the server.

Every time a client sends a message across the channel to the server, the server
will then broadcast that message out to all connected channels. This allows all
clients to share a single source of truth that is updated in real time.

The high-level architecture layout of YouTube Party is as follows:

<img
  src="images/full-architecture.png"
  title="Full Architecture"
  alt="Full Architecture"
/>

YouTube Party is written entirely in JavaScript. The server runs on Node.js
while the client is built using the React framework.

Both the server and client use Socket.IO to form the network connection but only
the client calls the YouTube iFrame API for its embedded video player.

## Contributing

```console
# Starting the server
cd server
node index.js

# Starting the client
cd client
yarn start
```

YouTube Party is no longer in active development and is currently in maintence
mode.
