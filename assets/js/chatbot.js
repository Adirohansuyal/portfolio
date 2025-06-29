
const chatMessages = document.querySelector('.chat-messages');
const chatbotInput = document.querySelector('.chatbot-footer input');
const chatbotButton = document.querySelector('.chatbot-footer button');

chatbotButton.addEventListener('click', () => {
    const message = chatbotInput.value;
    if (message) {
        addMessage('user', message);
        chatbotInput.value = '';
        getBotResponse(message);
    }
});

function addMessage(sender, message) {
    const li = document.createElement('li');
    li.textContent = message;
    li.classList.add(sender);
    chatMessages.appendChild(li);
    scrollToBottom();
}

async function getBotResponse(message) {
    const response = await fetch(`https://api.gemini.com/v1/your-api-key/your-model/generate-content?prompt=${message}`);
    const data = await response.json();
    const botMessage = data.candidates[0].content.parts[0].text;
    addMessage('bot', botMessage);
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
