const express = require('express');
const socket = require('socket.io');

//app setup
const app = express();
const server = app.listen(4000, ()=>{
    console.log(`Listening to http://localhost:4000`);
});

//static files
app.use(express.static('public'));

//socket setup
const io = socket(server);

//listening to connection from the front end
io.on('connection', (socket)=>{
    console.log("made socket connection");

    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data)
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});