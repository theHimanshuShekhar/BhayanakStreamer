import express from "express";
import { Server } from 'socket.io';
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = new Server(server, {cors: {origin: '*'}});


let userList = [];
let roomList = [];

// Client connects
io.on('connection', socket => {
    console.log("User connected", socket.id);
    userList.push(socket)

    // Active Clients
    io.emit('count', userList.length)

    // Active Rooms
    socket.on('getRooms', () => socket.emit('getRooms',roomList));

    // User disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        userList.pop(userList.indexOf(socket));
        io.emit('count', userList.length)
    });

    // create new room and update roomlist
    socket.on('createRoom', roomData => {
        roomList.push(roomData);
        io.emit('getRooms', roomList);
    });
})
