// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === 'Login successful') {
//             chrome.runtime.sendMessage({ type: 'login' }, (response) => {
//                 if (response.status === 'success') {
//                     document.getElementById('login-container').style.display = 'none';
//                     document.getElementById('chatbot-container').style.display = 'block';
//                 }
//             });
//         } else {
//             document.getElementById('errorMessage').innerText = data.message;
//             document.getElementById('errorMessage').style.display = 'block';
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });

// document.getElementById('send-btn').addEventListener('click', function() {
//     const message = document.getElementById('chat-input').value;
//     if (message.trim() !== '') {
//         addMessageToChat('User', message);
//         document.getElementById('chat-input').value = '';
        
//         // Simulate a bot response
//         setTimeout(() => {
//             addMessageToChat('Bot', 'This is a bot response.');
//         }, 1000);
//     }
// });

// function addMessageToChat(sender, message) {
//     const chatOutput = document.getElementById('chat-output');
//     const messageElement = document.createElement('div');
//     messageElement.className = 'chat-message';
//     messageElement.innerText = `${sender}: ${message}`;
//     chatOutput.appendChild(messageElement);
//     chatOutput.scrollTop = chatOutput.scrollHeight;
// }

// // Check login status on popup open
// document.addEventListener('DOMContentLoaded', function() {
//     chrome.runtime.sendMessage({ type: 'checkLoginStatus' }, (response) => {
//         if (response.loggedIn) {
//             document.getElementById('login-container').style.display = 'none';
//             document.getElementById('chatbot-container').style.display = 'block';
//         } else {
//             document.getElementById('login-container').style.display = 'block';
//             document.getElementById('chatbot-container').style.display = 'none';
//         }
//     });
// });

//-------------------------------------------------------------------------------------------------------------------------------


// working without backend
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === 'Login successful') {
//             chrome.runtime.sendMessage({ type: 'login' }, (response) => {
//                 if (response.status === 'success') {
//                     document.getElementById('login-container').style.display = 'none';
//                     document.getElementById('chatbot-container').style.display = 'block';
//                     showChatbotWithSelectedText();
//                 }
//             });
//         } else {
//             document.getElementById('errorMessage').innerText = data.message;
//             document.getElementById('errorMessage').style.display = 'block';
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });

// document.getElementById('send-btn').addEventListener('click', function() {
//     const message = document.getElementById('chat-input').value;
//     if (message.trim() !== '') {
//         addMessageToChat('User', message);
//         document.getElementById('chat-input').value = '';
        
//         // Simulate a bot response
//         setTimeout(() => {
//             addMessageToChat('Bot', 'This is a bot response.');
//         }, 1000);
//     }
// });

// function addMessageToChat(sender, message) {
//     const chatOutput = document.getElementById('chat-output');
//     const messageElement = document.createElement('div');
//     messageElement.className = 'chat-message';
//     messageElement.innerText = `${sender}: ${message}`;
//     chatOutput.appendChild(messageElement);
//     chatOutput.scrollTop = chatOutput.scrollHeight;
// }

// document.addEventListener('DOMContentLoaded', function() {
//     chrome.runtime.sendMessage({ type: 'checkLoginStatus' }, (response) => {
//         if (response.loggedIn) {
//             document.getElementById('login-container').style.display = 'none';
//             document.getElementById('chatbot-container').style.display = 'block';
//             showChatbotWithSelectedText();
//         } else {
//             document.getElementById('login-container').style.display = 'block';
//             document.getElementById('chatbot-container').style.display = 'none';
//         }
//     });
// });

// function showChatbotWithSelectedText() {
//     chrome.storage.local.get('selectedText', (result) => {
//         if (result.selectedText) {
//             addMessageToChat('User', result.selectedText);
//             // Optionally, send the selected text to the bot and display the response
//             setTimeout(() => {
//                 addMessageToChat('Bot', `Response to: ${result.selectedText}`);
//             }, 1000);
//         }
//     });
// }

//-------------------------------------------------------------------------------------------------------------------------------

// working with backend
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            chrome.runtime.sendMessage({ type: 'login' }, (response) => {
                if (response.status === 'success') {
                    document.getElementById('login-container').style.display = 'none';
                    document.getElementById('chatbot-container').style.display = 'block';
                    showChatbotWithSelectedText();
                }
            });
        } else {
            document.getElementById('errorMessage').innerText = data.message;
            document.getElementById('errorMessage').style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('send-btn').addEventListener('click', async function() {
    const message = document.getElementById('chat-input').value.trim();
    if (message) {
        addMessageToChat('User', message);
        document.getElementById('chat-input').value = '';

        try {
            const newMessage = { role: 'user', content: message };
            const chatHistory = []; // Assuming chat history is empty for now

            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: newMessage,
                    chat_history: chatHistory,
                    knowledge_base: 'commercientKnowledgebase' // Adjust knowledge_base as needed
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error');
            }

            const data = await response.json();
            if (data.reply) {
                addMessageToChat('Charlie', data.reply);
            } else {
                addMessageToChat('System', 'Charlie did not understand the question.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            addMessageToChat('System', `Error: ${error.message}`);
        }
    }
});

function addMessageToChat(sender, message) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerText = `${sender}: ${message}`;
    messageElement.style.padding = '8px';
    messageElement.style.marginBottom = '8px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.backgroundColor = sender === 'User' ? '#007bff' : '#e0e0e0';
    messageElement.style.color = sender === 'User' ? 'white' : 'black';
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ type: 'checkLoginStatus' }, (response) => {
        if (response.loggedIn) {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('chatbot-container').style.display = 'block';
            showChatbotWithSelectedText();
        } else {
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('chatbot-container').style.display = 'none';
        }
    });
});

function showChatbotWithSelectedText() {
    chrome.storage.local.get('selectedText', (result) => {
        if (result.selectedText) {
            addMessageToChat('User', result.selectedText);
            // Optionally, send the selected text to the bot and display the response
            setTimeout(() => {
                addMessageToChat('Bot', `Response to: ${result.selectedText}`);
            }, 1000);
        }
    });
}
