// // Placeholder for content script functionality
// // This script can be used to interact with web pages if needed.

// // Example: You can listen for messages from the popup script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'checkLoginStatus') {
//       chrome.storage.local.get('loggedIn', (result) => {
//         sendResponse({ loggedIn: result.loggedIn });
//       });
//       return true; // Keep the message channel open for sendResponse
//     }
//   });
  
//------------------------------------------------------------------------------------------------------------

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'askChatbot') {
//         // Check if the user is logged in
//         chrome.storage.local.get('loggedIn', (result) => {
//             if (result.loggedIn) {
//                 // Open the chatbot with the selected text
//                 openChatbot(message.text);
//             } else {
//                 // Open the login popup first
//                 openLoginForm(message.text);
//             }
//         });
//     } else if (message.type === 'checkLoginStatus') {
//         chrome.storage.local.get('loggedIn', (result) => {
//             sendResponse({ loggedIn: result.loggedIn });
//         });
//         return true; // Keep the message channel open for sendResponse
//     }
// });

// function openChatbot(selectedText) {
//     // Inject chatbot sidebar and pass the selected text
//     const existingSidebar = document.getElementById('chatbot-sidebar');
//     if (existingSidebar) {
//         existingSidebar.remove();
//     }

//     const sidebar = document.createElement('div');
//     sidebar.id = 'chatbot-sidebar';
//     sidebar.style.position = 'fixed';
//     sidebar.style.top = '0';
//     sidebar.style.right = '0';
//     sidebar.style.width = '300px';
//     sidebar.style.height = '400px';
//     sidebar.style.backgroundColor = '#f1f1f1';
//     sidebar.style.borderLeft = '1px solid #ccc';
//     sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
//     sidebar.style.zIndex = '10000';
//     sidebar.style.padding = '10px';
//     sidebar.style.display = 'flex';
//     sidebar.style.flexDirection = 'column';
//     sidebar.style.borderRadius = '8px 0 0 8px';
//     sidebar.style.fontFamily = 'Arial, sans-serif';
//     sidebar.innerHTML = `
//         <div id="chatbot-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0;">
//             Chatbot
//             <button id="close-chatbot" style="float: right; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
//         </div>
//         <div id="chatbot-content" style="flex: 1; overflow-y: auto; margin-top: 10px;">
//             <div id="chat-output" style="padding: 10px; background-color: white; border-radius: 8px; box-shadow: inset 0 0 5px rgba(0,0,0,0.1); height: 200px; overflow-y: auto;"></div>
//             <input type="text" id="chat-input" placeholder="Type a message..." style="width: calc(100% - 20px); margin-top: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//             <button id="send-btn" style="margin-top: 10px; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer; width: 100%;">Send</button>
//         </div>
//     `;

//     document.body.appendChild(sidebar);

//     document.getElementById('close-chatbot').addEventListener('click', () => {
//         document.body.removeChild(sidebar);
//     });

//     document.getElementById('send-btn').addEventListener('click', async function() {
//         const message = document.getElementById('chat-input').value.trim();
//         if (!message) {
//             return;
//         }

//         addMessageToChat('User', message);
//         document.getElementById('chat-input').value = '';

//         try {
//             const newMessage = { role: 'user', content: message };
//             const chatHistory = []; // Assuming chat history is empty for now

//             const response = await fetch('http://localhost:5000/api/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     message: newMessage,
//                     chat_history: chatHistory,
//                     knowledge_base: 'commercientKnowledgebase' // Adjust knowledge_base as needed
//                 })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Unknown error');
//             }

//             const data = await response.json();
//             if (data.reply) {
//                 addMessageToChat('Charlie', data.reply);
//             } else {
//                 addMessageToChat('System', 'Charlie did not understand the question.');
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             addMessageToChat('System', `Error: ${error.message}`);
//         }
//     });

//     function addMessageToChat(sender, message) {
//         const chatOutput = document.getElementById('chat-output');
//         const messageElement = document.createElement('div');
//         messageElement.className = 'chat-message';
//         messageElement.style.padding = '8px';
//         messageElement.style.marginBottom = '8px';
//         messageElement.style.borderRadius = '8px';
//         messageElement.style.backgroundColor = sender === 'User' ? '#007bff' : '#e0e0e0';
//         messageElement.style.color = sender === 'User' ? 'white' : 'black';
//         messageElement.innerText = `${sender}: ${message}`;
//         chatOutput.appendChild(messageElement);
//         chatOutput.scrollTop = chatOutput.scrollHeight;
//     }

//     // Put the selected text into the input box
//     document.getElementById('chat-input').value = selectedText;
// }

// function openLoginForm(selectedText) {
//     const existingSidebar = document.getElementById('login-sidebar');
//     if (existingSidebar) {
//         existingSidebar.remove();
//     }

//     const sidebar = document.createElement('div');
//     sidebar.id = 'login-sidebar';
//     sidebar.style.position = 'fixed';
//     sidebar.style.top = '0';
//     sidebar.style.right = '0';
//     sidebar.style.width = '300px';
//     sidebar.style.height = '400px';
//     sidebar.style.backgroundColor = '#f1f1f1';
//     sidebar.style.borderLeft = '1px solid #ccc';
//     sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
//     sidebar.style.zIndex = '10000';
//     sidebar.style.padding = '10px';
//     sidebar.style.display = 'flex';
//     sidebar.style.flexDirection = 'column';
//     sidebar.style.borderRadius = '8px 0 0 8px';
//     sidebar.style.fontFamily = 'Arial, sans-serif';
//     sidebar.innerHTML = `
//         <div id="login-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0;">
//             Login
//             <button id="close-login" style="float: right; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
//         </div>
//         <div id="login-content" style="flex: 1; margin-top: 10px;">
//             <form id="login-form" style="display: flex; flex-direction: column;">
//                 <input type="email" id="email" placeholder="Email" required style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//                 <input type="password" id="password" placeholder="Password" required style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//                 <button type="submit" style="padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">Login</button>
//             </form>
//             <p id="error-message" style="color: red; display: none; margin-top: 10px;"></p>
//         </div>
//     `;

//     document.body.appendChild(sidebar);

//     document.getElementById('close-login').addEventListener('click', () => {
//         document.body.removeChild(sidebar);
//     });

//     document.getElementById('login-form').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message === 'Login successful') {
//                 chrome.runtime.sendMessage({ type: 'login' }, (response) => {
//                     if (response.status === 'success') {
//                         document.body.removeChild(sidebar);
//                         openChatbot(selectedText);
//                     }
//                 });
//             } else {
//                 document.getElementById('error-message').innerText = data.message;
//                 document.getElementById('error-message').style.display = 'block';
//             }
//         })
//         .catch(error => console.error('Error:', error));
//     });
// }

// -------------------------------------------------------------------------------------------------------------------------------

// UI Changes similar to comemrcient

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'askChatbot') {
//         // Check if the user is logged in
//         chrome.storage.local.get('loggedIn', (result) => {
//             if (result.loggedIn) {
//                 // Open the chatbot with the selected text
//                 openChatbot(message.text);
//             } else {
//                 // Open the login popup first
//                 openLoginForm(message.text);
//             }
//         });
//     } else if (message.type === 'checkLoginStatus') {
//         chrome.storage.local.get('loggedIn', (result) => {
//             sendResponse({ loggedIn: result.loggedIn });
//         });
//         return true; // Keep the message channel open for sendResponse
//     }
// });

// function openChatbot(selectedText) {
//     const existingSidebar = document.getElementById('chatbot-sidebar');
//     if (existingSidebar) {
//         existingSidebar.remove();
//     }

//     const sidebar = document.createElement('div');
//     sidebar.id = 'chatbot-sidebar';
//     sidebar.style.position = 'fixed';
//     sidebar.style.top = '0';
//     sidebar.style.right = '0';
//     sidebar.style.width = '300px';
//     sidebar.style.height = '400px';
//     sidebar.style.backgroundColor = '#f1f1f1';
//     sidebar.style.borderLeft = '1px solid #ccc';
//     sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
//     sidebar.style.zIndex = '10000';
//     sidebar.style.display = 'flex';
//     sidebar.style.flexDirection = 'column';
//     sidebar.style.borderRadius = '8px 0 0 8px';
//     sidebar.style.fontFamily = 'Arial, sans-serif';
//     sidebar.innerHTML = `
//         <div id="chatbot-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0; display: flex; align-items: center; justify-content: space-between;">
//             <span>Chatbot</span>
//             <button id="close-chatbot" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
//         </div>
//         <div id="chatbot-content" style="flex: 1; overflow-y: auto; padding: 10px; background-color: white; border-bottom: 1px solid #ccc;">
//             <div class="message bot" style="display: flex; align-items: center; margin-bottom: 10px;">
//                 <img src="${chrome.runtime.getURL('robot.png')}" alt="Bot" style="width: 40px; height: 40px; margin-right: 10px;">
//                 <div style="background-color: #e0e0e0; padding: 10px; border-radius: 8px;">
//                     Hello! How can I help you?
//                 </div>
//             </div>
//         </div>
//         <div style="display: flex; padding: 10px; border-top: 1px solid #ccc; align-items: center;">
//             <input type="text" id="chat-input" placeholder="Please ask your question here." style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//             <button id="send-btn" style="margin-left: 10px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">&rarr;</button>
//         </div>
//         <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ccc; border-radius: 0 0 8px 0;">
//             Powered by Commercient AI
//         </div>
//     `;

//     document.body.appendChild(sidebar);

//     document.getElementById('close-chatbot').addEventListener('click', () => {
//         document.body.removeChild(sidebar);
//     });

//     document.getElementById('send-btn').addEventListener('click', async function() {
//         const message = document.getElementById('chat-input').value.trim();
//         if (!message) {
//             return;
//         }

//         addMessageToChat('User', message);
//         document.getElementById('chat-input').value = '';

//         try {
//             const newMessage = { role: 'user', content: message };
//             const chatHistory = []; // Assuming chat history is empty for now

//             const response = await fetch('http://localhost:5000/api/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     message: newMessage,
//                     chat_history: chatHistory,
//                     knowledge_base: 'commercientKnowledgebase' // Adjust knowledge_base as needed
//                 })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Unknown error');
//             }

//             const data = await response.json();
//             if (data.reply) {
//                 addMessageToChat('Charlie', data.reply);
//             } else {
//                 addMessageToChat('System', 'Charlie did not understand the question.');
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             addMessageToChat('System', `Error: ${error.message}`);
//         }
//     });

//     function addMessageToChat(sender, message) {
//         const chatContent = document.getElementById('chatbot-content');
//         const messageElement = document.createElement('div');
//         messageElement.className = 'message';
//         messageElement.style.display = 'flex';
//         messageElement.style.alignItems = 'center';
//         messageElement.style.marginBottom = '10px';

//         if (sender === 'User') {
//             messageElement.innerHTML = `
//                 <div style="flex: 1; text-align: right; padding-right: 10px;">
//                     <div style="background-color: #007bff; color: white; padding: 10px; border-radius: 8px; display: inline-block;">
//                         ${message}
//                     </div>
//                 </div>
//             `;
//         } else {
//             messageElement.innerHTML = `
//                 <img src="${chrome.runtime.getURL('robot.png')}" alt="${sender}" style="width: 40px; height: 40px; margin-right: 10px;">
//                 <div style="background-color: #e0e0e0; padding: 10px; border-radius: 8px;">
//                     ${message}
//                 </div>
//             `;
//         }

//         chatContent.appendChild(messageElement);
//         chatContent.scrollTop = chatContent.scrollHeight;
//     }

//     // Put the selected text into the input box
//     document.getElementById('chat-input').value = selectedText;
// }

// function openLoginForm(selectedText) {
//     const existingSidebar = document.getElementById('login-sidebar');
//     if (existingSidebar) {
//         existingSidebar.remove();
//     }

//     const sidebar = document.createElement('div');
//     sidebar.id = 'login-sidebar';
//     sidebar.style.position = 'fixed';
//     sidebar.style.top = '0';
//     sidebar.style.right = '0';
//     sidebar.style.width = '300px';
//     sidebar.style.height = '400px';
//     sidebar.style.backgroundColor = '#f1f1f1';
//     sidebar.style.borderLeft = '1px solid #ccc';
//     sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
//     sidebar.style.zIndex = '10000';
//     sidebar.style.display = 'flex';
//     sidebar.style.flexDirection = 'column';
//     sidebar.style.borderRadius = '8px 0 0 8px';
//     sidebar.style.fontFamily = 'Arial, sans-serif';
//     sidebar.innerHTML = `
//         <div id="login-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0;">
//             Login
//             <button id="close-login" style="float: right; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
//         </div>
//         <div id="login-content" style="flex: 1; margin-top: 10px;">
//             <form id="login-form" style="display: flex; flex-direction: column;">
//                 <input type="email" id="email" placeholder="Email" required style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//                 <input type="password" id="password" placeholder="Password" required style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//                 <button type="submit" style="padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">Login</button>
//             </form>
//             <p id="error-message" style="color: red; display: none; margin-top: 10px;"></p>
//         </div>
//     `;

//     document.body.appendChild(sidebar);

//     document.getElementById('close-login').addEventListener('click', () => {
//         document.body.removeChild(sidebar);
//     });

//     document.getElementById('login-form').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message === 'Login successful') {
//                 chrome.runtime.sendMessage({ type: 'login' }, (response) => {
//                     if (response.status === 'success') {
//                         document.body.removeChild(sidebar);
//                         openChatbot(selectedText);
//                     }
//                 });
//             } else {
//                 document.getElementById('error-message').innerText = data.message;
//                 document.getElementById('error-message').style.display = 'block';
//             }
//         })
//         .catch(error => console.error('Error:', error));
//     });
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'askChatbot') {
        // Check if the user is logged in
        chrome.storage.local.get('loggedIn', (result) => {
            if (result.loggedIn) {
                // Open the chatbot with the selected text
                openChatbot(message.text);
            } else {
                // Open the login popup first
                openLoginForm(message.text);
            }
        });
    } else if (message.type === 'checkLoginStatus') {
        chrome.storage.local.get('loggedIn', (result) => {
            sendResponse({ loggedIn: result.loggedIn });
        });
        return true; // Keep the message channel open for sendResponse
    }
});

function openChatbot(selectedText) {
    const existingSidebar = document.getElementById('chatbot-sidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }

    const sidebar = document.createElement('div');
    sidebar.id = 'chatbot-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '400px'; // Make the sidebar larger
    sidebar.style.height = '600px'; // Make the sidebar larger
    sidebar.style.backgroundColor = '#fff'; // Ensure a white background
    sidebar.style.color = '#000'; // Ensure black text
    sidebar.style.borderLeft = '1px solid #ccc';
    sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    sidebar.style.zIndex = '10000';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.borderRadius = '8px 0 0 8px';
    sidebar.style.fontFamily = 'Arial, sans-serif';
    sidebar.innerHTML = `
        <div id="chatbot-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0; display: flex; align-items: center; justify-content: space-between;">
            <span>Chatbot</span>
            <button id="close-chatbot" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
        </div>
        <div id="chatbot-content" style="flex: 1; overflow-y: auto; padding: 10px; background-color: white; border-bottom: 1px solid #ccc;">
            <div class="message bot" style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${chrome.runtime.getURL('robot.png')}" alt="Bot" style="width: 40px; height: 40px; margin-right: 10px;">
                <div style="background-color: #e0e0e0; padding: 10px; border-radius: 8px;">
                    Hello! How can I help you?
                </div>
            </div>
        </div>
        <div style="display: flex; padding: 10px; border-top: 1px solid #ccc; align-items: center;">
            <input type="text" id="chat-input" placeholder="Please ask your question here." style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #ccc; background-color: white; color: black;">
            <button id="send-btn" style="margin-left: 10px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">&rarr;</button>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ccc; border-radius: 0 0 8px 0;">
            Powered by Commercient AI
        </div>
    `;

    document.body.appendChild(sidebar);

    document.getElementById('close-chatbot').addEventListener('click', () => {
        document.body.removeChild(sidebar);
    });

    document.getElementById('send-btn').addEventListener('click', async function() {
        const message = document.getElementById('chat-input').value.trim();
        if (!message) {
            return;
        }

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
    });

    function addMessageToChat(sender, message) {
        const chatContent = document.getElementById('chatbot-content');
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.style.display = 'flex';
        messageElement.style.alignItems = 'center';
        messageElement.style.marginBottom = '10px';

        if (sender === 'User') {
            messageElement.innerHTML = `
                <div style="flex: 1; text-align: right; padding-right: 10px;">
                    <div style="background-color: #007bff; color: white; padding: 10px; border-radius: 8px; display: inline-block;">
                        ${message}
                    </div>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <img src="${chrome.runtime.getURL('robot.png')}" alt="${sender}" style="width: 40px; height: 40px; margin-right: 10px;">
                <div style="background-color: #e0e0e0; padding: 10px; border-radius: 8px;">
                    ${message}
                </div>
            `;
        }

        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Put the selected text into the input box
    document.getElementById('chat-input').value = selectedText;
}

function openLoginForm(selectedText) {
    const existingSidebar = document.getElementById('login-sidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }

    const sidebar = document.createElement('div');
    sidebar.id = 'login-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '400px'; // Make the sidebar larger
    sidebar.style.height = '600px'; // Make the sidebar larger
    sidebar.style.backgroundColor = '#fff'; // Ensure a white background
    sidebar.style.color = '#000'; // Ensure black text
    sidebar.style.borderLeft = '1px solid #ccc';
    sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    sidebar.style.zIndex = '10000';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.borderRadius = '8px 0 0 8px';
    sidebar.style.fontFamily = 'Arial, sans-serif';
    sidebar.innerHTML = `
        <div id="login-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0;">
            Login
            <button id="close-login" style="float: right; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
        </div>
        <div id="login-content" style="flex: 1; margin-top: 10px;">
            <form id="login-form" style="display: flex; flex-direction: column;">
                <input type="email" id="email" placeholder="Email" required style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
                <input type="password" id="password" placeholder="Password" required style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
                <button type="submit" style="padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">Login</button>
            </form>
            <p id="error-message" style="color: red; display: none; margin-top: 10px;"></p>
        </div>
    `;

    document.body.appendChild(sidebar);

    document.getElementById('close-login').addEventListener('click', () => {
        document.body.removeChild(sidebar);
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
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
                chrome.storage.local.set({ loggedIn: true }, () => {
                    chrome.runtime.sendMessage({ type: 'login' }, (response) => {
                        if (response.status === 'success') {
                            document.body.removeChild(sidebar);
                            openChatbot(selectedText);
                        }
                    });
                });
            } else {
                document.getElementById('error-message').innerText = data.message;
                document.getElementById('error-message').style.display = 'block';
            }
        })
        .catch(error => console.error('Error:', error));
    });
}
