const colors = {
  blue: "#7AA2E3",
  beige: "#F8F6E3",
  tosca: "#6AD4DD",
  red: "#FF204E",
  mint: "#CDFADB",
  navy: "#496989",
  grey: "#DDDDDD",
  black: "#222831",
  white: "#F6F5F5",
  skyblue: "#DFD5FF",
};

const roomList = document.querySelector("#rooms");

function setAuthCookie(cvalue) {
  document.cookie = `auth_token=${cvalue}`;
}

function getAuthCookie() {
  let name = "auth_token=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// add own message to messages list
function addOwnMessage(msg, room) {
  // get the messages container based on room
  const messages = document.querySelector(`#${room}-messages`);

  // create list element
  let newMessage = document.createElement("li");
  newMessage.className = "ownMessage";

  // create sender element
  let sender = document.createElement("h1");
  sender.className = "chat-sender";
  sender.textContent = "You";
  newMessage.appendChild(sender);

  // create chat bubble element
  let chatBubble = document.createElement("div");
  chatBubble.className = "chat-bubble";
  chatBubble.textContent = msg;
  chatBubble.style.backgroundColor = colors["mint"];
  newMessage.appendChild(chatBubble);

  messages.appendChild(newMessage);
  window.scrollTo(0, document.body.scrollHeight);
}

// add message from another user to messages list
function addOtherMessage(msg, sender, room) {
  // get the messages container based on room
  const messages = document.querySelector(`#${room}-messages`);

  // create list element
  let newMessage = document.createElement("li");

  // create sender element
  let senderElement = document.createElement("h1");
  senderElement.className = "chat-sender";
  senderElement.textContent = sender;
  newMessage.appendChild(senderElement);

  // create chat bubble element
  let chatBubble = document.createElement("div");
  chatBubble.className = "chat-bubble";
  chatBubble.textContent = msg;
  chatBubble.style.backgroundColor = colors["skyblue"];
  newMessage.appendChild(chatBubble);

  messages.appendChild(newMessage);
  window.scrollTo(0, document.body.scrollHeight);
}

// add connection error message
function addNotificationMessage(msg, room) {
  // get the messages container based on room
  const messages = document.querySelector(`#${room}-messages`);

  // create list message element
  let newMessage = document.createElement("li");
  newMessage.className = "notification";

  // create notification bubble
  let notificationBubble = document.createElement("div");
  notificationBubble.className = "notification-bubble";
  notificationBubble.textContent = msg;
  notificationBubble.style.backgroundColor = colors["grey"];
  newMessage.appendChild(notificationBubble);

  messages.appendChild(newMessage);
  window.scrollTo(0, document.body.scrollHeight);
}

// function to create messages container for a new room
function createRoomMessages(room) {
  // check if the room is exist
  if (document.querySelector(`#${room}-room`) != null) {
    return;
  }

  // create the messages container based on room
  const newRoom = document.createElement("li");
  newRoom.id = `${room}-room`;
  newRoom.style.display = "none";
  const messages = document.createElement(`ul`);
  messages.className = "messages";
  messages.id = `${room}-messages`;

  newRoom.appendChild(messages);
  roomList.appendChild(newRoom);

  addNotificationMessage("Join " + room + " room", room);
}

// function to swap room
function changeRoomMessage(prevRoom, currRoom) {
  // get prev and curr room
  const prevRoomElement = document.querySelector(`#${prevRoom}-room`);
  const currRoomElement = document.querySelector(`#${currRoom}-room`);

  prevRoomElement.style.display = "none";
  currRoomElement.style.display = "block";
}
