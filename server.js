const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

let numUsers = 0;
let users = [];
app.use(express.static(join(__dirname, "public")));

io.on("connection", (socket) => {
  let addedUser = false;
  let rooms = [];
  socket.on("new user", (data) => {
    if (addedUser) return;

    // add username to socket session
    socket.username = data.username;
    numUsers += 1;
    addedUser = true;

    // add to user list
    users.push({ username: data.username });
    socket.broadcast.emit("new user", {
      username: data.username,
      room: data.room,
    });
  });

  socket.on("chat message", (data) => {
    chatData = {
      sender: data.sender,
      message: data.message,
      room: data.room,
    };
    if (data.room === "") {
      socket.broadcast.emit("new message", chatData);
    } else {
      socket.to(data.room).emit("new message", chatData);
    }
  });

  socket.on("join room", (data) => {
    socket.join(data.room);
    rooms.push(data.room);
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      numUsers -= 1;

      rooms.forEach((room) => {
        socket.broadcast.emit("user leave", {
          username: socket.username,
          room: room,
        });
      });
      socket.broadcast.emit("user leave", {
        username: socket.username,
        room: "",
      });
    }
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
