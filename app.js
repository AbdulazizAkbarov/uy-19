const api = "http://localhost:3000/messages";
function checkUserName() {
  const userName = localStorage.getItem("userName");
  if (userName) {
    document.getElementById("nameSelection").style.display = "none";
    document.getElementById("chatContainer").style.display = "block";
    fetchMessages();
  } else {
    document.getElementById("nameSelection").style.display = "block";
    document.getElementById("chatContainer").style.display = "none";
  }
}

async function fetchMessages() {
  const response = await fetch(api);
  const messages = await response.json();
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";
  messages.forEach((msg) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `
      <span class="sender">${msg.sender}:</span> ${msg.message}
      
    `;
    messagesContainer.appendChild(messageElement);
  });
}

async function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value.trim();
  const sender = localStorage.getItem("userName");

  if (messageText && sender) {
    const message = {
      sender: sender,
      message: messageText,
    };

    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    messageInput.value = "";
    fetchMessages();
  }
}

function changeUserName() {
  const newName = prompt("Enter your new name:");
  if (newName) {
    localStorage.setItem("userName", newName);
    fetchMessages();
  }
}

checkUserName();
