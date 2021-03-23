const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

// "connects" each time the react page rerenders
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('message', (message) => {
        io.emit('message', message);
    });
});

http.listen(8080, () => console.log('Server listening on http://localhost:8080'));
