const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('chat message', (msg) => {
        console.log(msg.user +': ' + msg.text);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
