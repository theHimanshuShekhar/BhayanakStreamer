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

    // join room
    socket.on('joinRoom', roomName => {
        let roomID = (roomName.owner + roomName.name + roomName.created).replace(/\W/g, '');
        socket.join(roomID);
        console.log(socket.id,'joined',roomID);
        socket.emit('joinRoom', roomName)
    });

    // get users joined in a room
    socket.on('getRoomUsers', async (roomID) => {

        // Fetch sockets connected to room
        await io.in(roomID).fetchSockets().then(async joinedSockets => {
            let joinedUsers = [];

            // Loop over all connected sockets
            await joinedSockets.forEach(async joinedSocket => {
                await joinedSocket.emit("getUserData",'getUserData', (user) =>{
                    console.log('push user in list', user)
                    joinedUsers.push(user)
                });
            });
            console.log('userlist',joinedUsers)
            io.in(roomID).emit('getRoomUsers',joinedUsers)
        })
    });

    // ping pong
    socket.on('ping', (roomName) => {
        let roomID = (roomName.owner + roomName.name + roomName.created).replace(/\W/g, '');
        console.log('ping',roomID)
        io.to(roomID).emit('pong', socket.id + ' PONG!');
    });
})
