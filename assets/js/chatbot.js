
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
    // IMPORTANT: For security, your Gemini API key should NEVER be exposed directly in client-side code.
    // You need a backend proxy to handle the API calls securely.
    // This function will send the user's message to a hypothetical backend endpoint.

    try {
        const response = await fetch('/chat-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming your backend sends back a JSON object with a 'text' field for the bot's response
        const botMessage = data.text || "I'm sorry, I couldn't get a response from the AI.";
        addMessage('bot', botMessage);
    } catch (error) {
        console.error('Error fetching bot response:', error);
        addMessage('bot', "Oops! Something went wrong. Please try again later.");
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
