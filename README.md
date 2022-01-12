# YouTube Party: A Synchronized Streaming Platform

YouTube Party is a full-stack web application that lets any number of users
stream YouTube videos in sync using the Socket.IO library and the YouTube iFrame
API.

YouTube Party is no longer in active development and is currently in maintence
mode.

## Architecture Overview

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
