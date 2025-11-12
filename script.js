// DOM elements
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// 🔹 Clear old chat on page refresh
window.onload = () => {
  localStorage.removeItem("chatMessages"); // <-- this line clears old messages
};

// Save a message to localStorage
function saveMessage(text, type, time) {
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  messages.push({ text, type, time });
  localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Render message bubble
function displayMessage(text, type, time) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", type);
  msgDiv.innerHTML = `
    <div>${text}</div>
    <div class="timestamp">${time}</div>
  `;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Get time in HH:MM format
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Simple bot responses
function botResponse(userMsg) {
  const responses = {
    hello: "Hey there! 👋 How can I help you today?",
    hi: "Hi! Nice to see you 😄",
    help: "Sure! What do you need help with? 🤔",
    bye: "Goodbye! 👋 Take care!",
    thanks: "You're welcome! 😊",
    default: "That’s interesting! Tell me more..."
  };

  const msg = userMsg.toLowerCase();
  let reply = responses.default;

  for (let key in responses) {
    if (msg.includes(key)) {
      reply = responses[key];
      break;
    }
  }

  setTimeout(() => {
    const time = getTime();
    displayMessage(reply, "received", time);
    saveMessage(reply, "received", time);
  }, 700);
}

// Send message
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const time = getTime();
  displayMessage(text, "sent", time);
  saveMessage(text, "sent", time);
  messageInput.value = "";
  botResponse(text);
}

// Events
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
