class Message {
  constructor(text, timestamp, sender, receiver) {
    this.text = text;
    this.timestamp = timestamp;
    this.sender = sender;
    this.receiver = receiver;
  }
}

const CHAT_STORAGE_KEY = 'chatState';

class MessagesManager {
  constructor() {
    this.messages = [];
    this.onUpdateCallbacks = [];
    this.timeoutId = null;
    this.checkStorage();
  }
  loadMessagesFromStorage() {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
    if (Array.isArray(storedMessages)) {
      this.messages = storedMessages.map(message => new Message(message.text, new Date(message.timestamp), message.sender, message.receiver));
    } else {
      this.messages = [];
    }
  }
  addMessage(message) {
    this.messages.push(message);
    this.saveMessagesToStorage();
    this.onUpdateCallbacks.forEach(callback => callback());
  }

  getMessagesByReceiver(receiverName) {
    return this.messages.filter(message => message.receiver === receiverName);
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
    this.timeoutId = setTimeout(() => this.checkStorage(), 5000);
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
    this.timeoutId = setTimeout(() => this.checkStorage(), 0);
  }

  stopCheckingStorage() {
    clearTimeout(this.timeoutId);
  }
}

const MessageComponent = ({ message }) => {
  return (
    <li>
      <strong>{message.sender}: </strong>
      {message.text} ({message.timestamp.toString()})
    </li>
  );
};

const messagesManager = new MessagesManager();
export { Message, messagesManager, MessageComponent };




// class Message {
//   constructor(text, timestamp, sender, receiver) {
//     this.text = text;
//     this.timestamp = timestamp;
//     this.sender = sender;
//     this.receiver = receiver;
//   }
// }

// const CHAT_STORAGE_KEY = 'chatState';

// class MessagesManager {
//   constructor() {
//     this.messages = [];
//     this.onUpdateCallbacks = [];
//     this.timeoutId = null;
//     this.checkStorage();
//   }
//   loadMessagesFromStorage() {
//     const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
//     if (Array.isArray(storedMessages)) {
//       this.messages = storedMessages.map(message => new Message(message.text, new Date(message.timestamp), message.sender, message.receiver));
//     } else {
//       this.messages = [];
//     }
//   }
//   addMessage(message) {
//     this.messages.push(message);
//     this.saveMessagesToStorage();
//     this.onUpdateCallbacks.forEach(callback => callback());
//   }

//   getMessagesByReceiver(receiverName) {
//     return this.messages.filter(message => message.receiver === receiverName);
//   }

//   saveMessagesToStorage() {
//     localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages));
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
//     this.timeoutId = setTimeout(() => this.checkStorage(), 5000);
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
//     this.timeoutId = setTimeout(() => this.checkStorage(), 0);
//   }

//   stopCheckingStorage() {
//     clearTimeout(this.timeoutId);
//   }
// }

// const MessageComponent = ({ message }) => {
//   return (
//     <li>
//       <strong>{message.sender}: </strong>
//       {message.text} ({message.timestamp.toString()})
//     </li>
//   );
// };

// const messagesManager = new MessagesManager(); 

// export { Message, messagesManager, MessageComponent };








