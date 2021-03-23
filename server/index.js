const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

// "connects" each time the react page rerenders
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(8080, () => {
    console.log('Server listening on http://localhost:8080')
});
