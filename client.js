const gun = Gun(`http://localhost:8000/gun`);
    const chat = gun.get('chat');
    const messagesDiv = document.getElementById('messages');

    //
    // Object to store timestamps of displayed messages to prevent duplicates
    const displayedMessages = {};


    // Append a message if it hasn't been displayed yet
    function addMessage(prefix, message) {
      if (displayedMessages[message.time]) return;
      displayedMessages[message.time] = true;


      const div = document.createElement('div');
      div.className = 'message';
      div.textContent = `${prefix}: ${message.text} at ${new Date(message.time).toLocaleTimeString()}`;
      messagesDiv.appendChild(div);
    }


    // Listen for messages on the "chat" node and display them
    chat.on(data => {
      if (data && data.text) {
        addMessage("Received", data);
      }
    });


    // On click, send a message to the "chat" node and display it
    document.addEventListener('click', () => {
      const msg = { text: 'Hello from a browser node!', time: Date.now() };
      chat.put(msg);
      addMessage("Sent", msg);
    });