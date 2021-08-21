import express from "express";
import { Server } from "socket.io";
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const io = new Server(server, { cors: { origin: "*" } });

let userList = [];
let roomList = [];

// Client connects
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  userList.push(socket);

  // store userdata on socket
  socket.on("userData", (userData) => {
    socket.data.user = userData;
  });

  // Active Clients
  io.emit("count", userList.length);

  // Active Rooms
  socket.on("getRooms", () => socket.emit("getRooms", roomList));

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      console.log("room", room);
      socket.leave(room);
      updateRoomUsers(room);
    });
  });

  // User disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    userList.pop(userList.indexOf(socket));
    io.emit("count", userList.length);
  });

  // create new room and update roomlist
  socket.on("createRoom", (roomData) => {
    roomList.push(roomData);
    io.emit("getRooms", roomList);
  });

  // join room
  socket.on("joinRoom", (roomID) => {
    socket.join(roomID);
    console.log(socket.id, "joined", roomID);
    updateRoomUsers(roomID);
  });

  async function updateRoomUsers(roomID) {
    // send list of joined users to whole room
    const joinedSockets = await io.in(roomID).fetchSockets();
    io.to(roomID).emit(
      "getJoinedSockets",
      joinedSockets.map((socket) => socket.data.user)
    );
  }
});
