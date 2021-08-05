const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app)
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Client connects
io.on('connection', socket => {
    console.log("New socket connection");
})