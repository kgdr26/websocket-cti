const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send data every 1 second
    setInterval(() => {
        const data = [
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
            Math.floor(Math.random() * 10000),
        ];
        socket.emit('data', data);
    }, 1000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));