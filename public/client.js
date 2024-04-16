const nameModal = document.querySelector("#name-modal");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const messageInput = document.querySelector("#message-input");
const messageForm = document.querySelector("#message-form");
const roomInput = document.querySelector("#room-input");
const roomForm = document.querySelector("#room-form");

let username = "";
let room = "";

const socket = io();

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (nameInput.value) {
    username = nameInput.value;
    socket.emit("new user", { username: nameInput.value, room: room });
    addNotificationMessage("You are join to global room", room);
    nameInput.value = "";
    nameModal.style.display = "none";
  }
});

socket.on("new user", (data) => {
  addNotificationMessage(data.username + " joined", data.room);
});

// submit new message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (messageInput.value) {
    addOwnMessage(messageInput.value, room);
    socket.emit("chat message", {
      sender: username,
      message: messageInput.value,
      room: room,
    });
    messageInput.value = "";
  }
});

// enter a room
roomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (roomInput.value) {
    socket.emit("join room", { user: username, room: roomInput.value });
    createRoomMessages(roomInput.value);
    changeRoomMessage(room, roomInput.value);
    room = roomInput.value;
    roomInput.value = "";
  } else {
    changeRoomMessage(room, roomInput.value);
    room = roomInput.value;
  }
});

socket.on("new message", (data) => {
  addOtherMessage(data.message, data.sender, data.room);
});

socket.on("user leave", (data) => {
  addNotificationMessage(data.username + " leave", data.room);
});
