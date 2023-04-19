
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
    this.loadMessagesFromStorage();
    this.onUpdateCallbacks = [];
    this.timeoutId = null;
  }

  addMessage(message) {
    this.messages.push(message);
    this.saveMessagesToStorage();
    this.onUpdateCallbacks.forEach(callback => callback());
  }

  getMessagesByReceiver(receiverName) {
    return this.messages.filter((message) => message.receiver === receiverName);
  }

  loadMessagesFromStorage() {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
    if (Array.isArray(storedMessages)) {
      this.messages = storedMessages.map(message => ({
        text: message.text,
        timestamp: new Date(message.timestamp),
        sender: message.sender,
        receiver: message.receiver,
      }));
    } else {
      this.messages = [];
    }
  }

  saveMessagesToStorage() {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages));
  }

  checkStorage() {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
    if (storedMessages && Array.isArray(storedMessages)) {
      // Update messages if there are new ones in storage
      const newMessages = storedMessages.filter((message) => !this.messages.some(m => m.timestamp === message.timestamp));
      if (newMessages.length > 0) {
        this.messages.push(...newMessages.map(m => new Message(m.text, new Date(m.timestamp), m.sender, m.receiver)));
        this.onUpdateCallbacks.forEach(callback => callback());
      }
    }
    // Schedule the next check in 2 seconds
    this.timeoutId = setTimeout(() => this.checkStorage(), 2000);
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
    // Schedule the first check immediately
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
export { Message, MessagesManager, MessageComponent };

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
//     this.broadcastChannel = new BroadcastChannel("chatMessages");
//     this.loadMessagesFromStorage();
//     this.onUpdateCallbacks = [];
//   }

//   addMessage(message) {
//     this.messages.push(message);
//     this.saveMessagesToStorage();
//     this.broadcastChannel.postMessage(message);
//     this.onUpdateCallbacks.forEach(callback => callback());
//   }

//   getMessagesByReceiver(receiverName) {
//     return this.messages.filter((message) => message.receiver === receiverName);
//   }

//   loadMessagesFromStorage() {
//     const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
//     if (Array.isArray(storedMessages)) {
//       this.messages = storedMessages.map(message => ({
//         text: message.text,
//         timestamp: new Date(message.timestamp),
//         sender: message.sender,
//         receiver: message.receiver,
//       }));
//     } else {
//       this.messages = [];
//     }
//   }

//   saveMessagesToStorage() {
//     localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages));
//   }

//   checkStorage() {
//     const storedMessages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
//     if (storedMessages && Array.isArray(storedMessages)) {
//       // Update messages if there are new ones in storage
//       const newMessages = storedMessages.filter((message) => !this.messages.some(m => m.timestamp === message.timestamp));
//       if (newMessages.length > 0) {
//         this.messages.push(...newMessages.map(m => new Message(m.text, new Date(m.timestamp), m.sender, m.receiver)));
//         this.broadcastChannel.postMessage(newMessages);
//         this.onUpdateCallbacks.forEach(callback => callback());
//       }
//     }
//   }

//   setOnUpdate(onUpdate) {
//     this.onUpdate = onUpdate;
//   }

//   removeOnUpdate(callback) {
//     const index = this.onUpdateCallbacks.indexOf(callback);
//     if (index !== -1) {
//       this.onUpdateCallbacks.splice(index, 1);
//     }
//   }
//   startListening(onNewMessage) {
//     this.broadcastChannel.addEventListener('message', onNewMessage);
//   }

//   stopListening(onNewMessage) {
//     this.broadcastChannel.removeEventListener('message', onNewMessage);
//   }
// }

// // const MessageComponent = ({ message }) => {
// //   return (
// //     <li>
// //       <strong>{message.sender}: </strong>
// //       {message.text} ({message.timestamp.toString()})
// //     </li>
// //   );
// // };



// export { Message, MessagesManager };






