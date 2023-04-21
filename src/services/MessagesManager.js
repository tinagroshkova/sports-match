// import userManager from "./UserManager";

// class Message {
//   constructor(text, timestamp, sender, receiver) {
//     this.text = text;
//     this.timestamp = timestamp;
//     this.sender = sender;
//     this.receiver = receiver;
//     this.read = false;
//   }
// }

// const CHAT_STORAGE_KEY = 'chatState';

// class MessagesManager {
//   constructor() {
//     this.messages = [];
//     this.onUpdateCallbacks = [];
//     this.intervalId = null;
//     this.startCheckingStorage();
//   }

//   loadMessagesFromStorage() {
//     const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
//     if (Array.isArray(storedMessages)) {
//       console.log(storedMessages);
//       return this.messages = storedMessages.map(message => new Message(message.text, new Date(message.timestamp), message.sender, message.receiver));
//       // console.log(this.messages);
//     } else {
//       this.messages = [];
//     }
//   }

//   addMessage(message) {
//     this.messages.push(message);
//     this.saveMessagesToStorage();
//     this.onUpdateCallbacks.forEach(callback => callback());
//   }

//   saveMessagesToStorage() {
//     localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages));
//   }
//   getMessagesByReceiver(receiver) {
//     const loggedInUser = userManager.getLoggedInUser();
//     if (!loggedInUser) {
//       return [];
//     }
//     return this.messages.filter(message =>
//       (message.sender === receiver && message.receiver === loggedInUser.username) ||
//       (message.sender === loggedInUser.username && message.receiver === receiver)
//     );
//   }

//   getConversations(username) {
//     const conversationSet = new Set();
//     this.messages.forEach(message => {
//       if (message.sender === username) {
//         conversationSet.add(message.receiver);
//       } else if (message.receiver === username) {
//         conversationSet.add(message.sender);
//       }
//     });
//     return Array.from(conversationSet);
//   }


//   checkStorage() {
//     const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
//     if (storedMessages && Array.isArray(storedMessages)) {
//       const newMessages = storedMessages.filter(message => !this.messages.some(m => new Date(m.timestamp).toString() === new Date(message.timestamp).toString()));
//       if (newMessages.length > 0) {
//         this.messages.push(...newMessages.map(m => new Message(m.text, new Date(m.timestamp), m.sender, m.receiver)));
//         this.onUpdateCallbacks.forEach(callback => callback());
//       }
//     }
//   }

//   setOnUpdate(onUpdate) {
//     this.onUpdateCallbacks.push(onUpdate);
//   }
//   removeOnUpdate(callback) {
//     const index = this.onUpdateCallbacks.indexOf(callback);
//     if (index !== -1) {
//       this.onUpdateCallbacks.splice(index, 1);
//     }
//   }

//   startCheckingStorage() {
//     this.intervalId = setInterval(() => this.checkStorage(), 5000);
//   }
  
// }

// const messagesManager = new MessagesManager();
// export { Message, messagesManager };

import userManager from "./UserManager";

class Message {
  constructor(text, timestamp, sender, receiver) {
    this.text = text;
    this.timestamp = timestamp;
    this.sender = sender;
    this.receiver = receiver;
    this.read = false;
  }
}

const CHAT_STORAGE_KEY = 'chatState';

class MessagesManager {
  constructor() {
    this.messages = [];
    this.onUpdateCallbacks = [];
    this.intervalId = null;
    this.startCheckingStorage();
  }

  loadMessagesFromStorage() {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
    if (Array.isArray(storedMessages)) {
      console.log(storedMessages);
      return this.messages = storedMessages.map(message => new Message(message.text, new Date(message.timestamp), message.sender, message.receiver));
      // console.log(this.messages);
    } else {
      this.messages = [];
    }
  }

  addMessage(message) {
    this.messages.push(message);
    this.saveMessagesToStorage();
    this.onUpdateCallbacks.forEach(callback => callback());
  }

  getMessagesByReceiver(receiver) {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      return [];
    }
    return this.messages.filter(message =>
      (message.sender === receiver && message.receiver === loggedInUser.username) ||
      (message.sender === loggedInUser.username && message.receiver === receiver)
    );
  }

  saveMessagesToStorage() {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages));
  }

  checkStorage() {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
    if (storedMessages && Array.isArray(storedMessages)) {
      const newMessages = storedMessages.filter(message => !this.messages.some(m => new Date(m.timestamp).toString() === new Date(message.timestamp).toString()));
      if (newMessages.length > 0) {
        this.messages.push(...newMessages.map(m => new Message(m.text, new Date(m.timestamp), m.sender, m.receiver)));
        this.onUpdateCallbacks.forEach(callback => callback());
      }
    }
  }
  getConversations(username) {
    const conversationSet = new Set();
    this.messages.forEach(message => {
      if (message.sender === username) {
        conversationSet.add(message.receiver);
      } else if (message.receiver === username) {
        conversationSet.add(message.sender);
      }
    });
    return Array.from(conversationSet);
  }

  setOnUpdate(onUpdate) {
    this.onUpdateCallbacks.push(onUpdate);
  }
  removeOnUpdate(callback) {
    const index = this.onUpdateCallbacks.indexOf(callback);
    if (index !== -1) {
      this.onUpdateCallbacks.splice(index, 1);
    }
  }

  startCheckingStorage() {
    this.intervalId = setInterval(() => this.checkStorage(), 5000);
  }
}

const messagesManager = new MessagesManager();
export { Message, messagesManager };












