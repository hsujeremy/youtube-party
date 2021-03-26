const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

let numUsers = 0;

// "connects" each time the react page rerenders
io.on('connection', (socket) => {
    numUsers++;
    console.log(`User connected. There are now ${numUsers} user(s)`);
    io.emit('connection', { 'numUsers': numUsers });

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        numUsers--;
        console.log(`User disconnected. There are now ${numUsers} user(s)`);
        io.emit('disconnection', { 'numUsers': numUsers });
    });
});

http.listen(8080, () => {
    console.log('Server listening on http://localhost:8080')
});
