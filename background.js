// chrome.runtime.onInstalled.addListener(() => {
//     console.log('Extension installed');
//     // Initialize storage for login state if necessary
//     chrome.storage.local.set({ loggedIn: false });
//   });
  
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'login') {
//       chrome.storage.local.set({ loggedIn: true }, () => {
//         sendResponse({ status: 'success' });
//       });
//       return true; // Keep the message channel open for sendResponse
//     } else if (message.type === 'logout') {
//       chrome.storage.local.set({ loggedIn: false }, () => {
//         sendResponse({ status: 'success' });
//       });
//       return true; // Keep the message channel open for sendResponse
//     }
//   });
  
// With simple chatwindow sidebar
// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Extension installed');
//   // Initialize storage for login state if necessary
//   chrome.storage.local.set({ loggedIn: false });

//   // Create context menu item
//   chrome.contextMenus.create({
//     id: "askChatbot",
//     title: "Ask Chatbot",
//     contexts: ["selection"]
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "askChatbot") {
//     // Send a message to the content script to handle the selected text
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: openChatbotSidebar,
//       args: [info.selectionText]
//     });
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'login') {
//     chrome.storage.local.set({ loggedIn: true }, () => {
//       sendResponse({ status: 'success' });
//     });
//     return true; // Keep the message channel open for sendResponse
//   } else if (message.type === 'logout') {
//     chrome.storage.local.set({ loggedIn: false }, () => {
//       sendResponse({ status: 'success' });
//     });
//     return true; // Keep the message channel open for sendResponse
//   }
// });

// function openChatbotSidebar(selectedText) {
//   if (!document.getElementById('chatbot-sidebar')) {
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
//       <div id="chatbot-header" style="font-size: 16px; font-weight: bold; color: white; background-color: #007bff; padding: 10px; border-radius: 8px 0 0 0;">
//         Chatbot
//         <button id="close-chatbot" style="float: right; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&times;</button>
//       </div>
//       <div id="chatbot-content" style="flex: 1; overflow-y: auto; margin-top: 10px;">
//         <div id="chat-output" style="padding: 10px; background-color: white; border-radius: 8px; box-shadow: inset 0 0 5px rgba(0,0,0,0.1); height: 200px; overflow-y: auto;"></div>
//         <input type="text" id="chat-input" placeholder="Type a message..." style="width: calc(100% - 20px); margin-top: 10px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
//         <button id="send-btn" style="margin-top: 10px; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer; width: 100%;">Send</button>
//       </div>
//     `;

//     document.body.appendChild(sidebar);

//     document.getElementById('close-chatbot').addEventListener('click', () => {
//       document.body.removeChild(sidebar);
//     });

//     document.getElementById('send-btn').addEventListener('click', function() {
//       const message = document.getElementById('chat-input').value;
//       if (message.trim() !== '') {
//         addMessageToChat('User', message);
//         document.getElementById('chat-input').value = '';
        
//         // Simulate a bot response
//         setTimeout(() => {
//           addMessageToChat('Bot', 'This is a bot response.');
//         }, 1000);
//       }
//     });

//     function addMessageToChat(sender, message) {
//       const chatOutput = document.getElementById('chat-output');
//       const messageElement = document.createElement('div');
//       messageElement.className = 'chat-message';
//       messageElement.style.padding = '8px';
//       messageElement.style.marginBottom = '8px';
//       messageElement.style.borderRadius = '8px';
//       messageElement.style.backgroundColor = sender === 'User' ? '#007bff' : '#e0e0e0';
//       messageElement.style.color = sender === 'User' ? 'white' : 'black';
//       messageElement.innerText = `${sender}: ${message}`;
//       chatOutput.appendChild(messageElement);
//       chatOutput.scrollTop = chatOutput.scrollHeight;
//     }
//   }

//   // Put the selected text into the input box
//   document.getElementById('chat-input').value = selectedText;
// }


// with login chatbot sidebar

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.storage.local.set({ loggedIn: false });

  chrome.contextMenus.create({
      id: "askChatbot",
      title: "Ask Charlie",
      contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "askChatbot") {
      chrome.tabs.sendMessage(tab.id, { type: 'askChatbot', text: info.selectionText });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'login') {
      chrome.storage.local.set({ loggedIn: true }, () => {
          sendResponse({ status: 'success' });
      });
      return true; // Keep the message channel open for sendResponse
  } else if (message.type === 'logout') {
      chrome.storage.local.set({ loggedIn: false }, () => {
          sendResponse({ status: 'success' });
      });
      return true; // Keep the message channel open for sendResponse
  }
});
// Clear session storage on extension startup
// chrome.runtime.onStartup.addListener(() => {
//   chrome.storage.session.clear();
// });
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.set({ loggedIn: false });
});