// Connect to both peer servers
const gun = Gun(['http://localhost:5000/gun', 'http://localhost:5001/gun']);
const chat = gun.get('chat');
const messagesDiv = document.getElementById('messages');

// Deduplication logic remains the same
const displayedMessages = {};

function addMessage(prefix, message) {
  if (displayedMessages[message.time]) return;
  displayedMessages[message.time] = true;

  const div = document.createElement('div');
  div.className = 'message';
  div.textContent = `${prefix}: ${message.text} at ${new Date(message.time).toLocaleTimeString()}`;
  messagesDiv.appendChild(div);
}

chat.on(data => {
  if (data && data.text) {
    addMessage("Received", data);
  }
});

document.addEventListener('click', () => {
  const msg = { text: 'Hello from a browser node!', time: Date.now() };
  chat.put(msg);
  addMessage("Sent", msg);
});
