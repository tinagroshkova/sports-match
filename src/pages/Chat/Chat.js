
// import userManager from '../../services/UserManager';
// import React, { useState, useEffect } from "react";

// export class Chat {
//     constructor(user1, user2) {
//         this.users = [user1, user2];
//         this.messages = [];
//     }
//     sendMessage(sender, text) {
//         if (this.users.includes(sender)) {
//             const message = {
//                 sender,
//                 text,
//             };
//             this.messages.push(message);
//         }
//     }
// }


// export default function ChatPage() {
//     const [chat, setChat] = useState(JSON.parse(sessionStorage.getItem('chat')));
//     // const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

//     const handleSendMessage = (event) => {
//         event.preventDefault();
//         const message = {
//             sender: userManager.getLoggedInUser(),
//             text: event.target.message.value,
//         };
//         setChat({
//             ...chat,
//             messages: [...chat.messages, message],
//         });
//         sessionStorage.setItem('chat', JSON.stringify(chat));
//     };
//     if (!chat) {
//         return;
//         // return <div>Loading...</div>;
//       }

//     return (
//         <div>
//             <h2>Chat with {chat && chat.users[1].username}</h2>
//             <ul>
//                 {chat.messages.map((message, index) => (
//                     <li key={index}>
//                         <strong>{message.sender.username}:</strong> {message.text}
//                     </li>
//                 ))}
//             </ul>
//             <form onSubmit={handleSendMessage}>
//                 <input type="text" name="message" />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// }



// Secondaries

import React, { Component } from "react";

class Chat extends Component {
  constructor(props) {
    super(props);

    // Check if the chat state exists in session storage
    const chatState = sessionStorage.getItem("chatState");
    if (chatState) {
      this.state = JSON.parse(chatState);
    } else {
      this.state = {
        messages: [],
        currentUser: props.currentUser || "Guest",
      };
    }

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.broadcastChannel = new BroadcastChannel("chatMessages");
  }

  componentDidMount() {
    // Listen for messages from other tabs/windows
    this.broadcastChannel.onmessage = (event) => {
      this.setState({ messages: event.data });
    };
  }

  componentWillUnmount() {
    // Close the Broadcast Channel when the component unmounts
    this.broadcastChannel.close();
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const messageInput = event.target.elements.message;
    const message = {
      text: messageInput.value,
      timestamp: new Date().toISOString(),
      user: this.state.currentUser,
    };

    // Update the state with the new message
    this.setState(
      (prevState) => ({
        messages: [...prevState.messages, message],
      }),
      () => {
        // Store the updated state in session storage
        sessionStorage.setItem("chatState", JSON.stringify(this.state));

        // Broadcast the updated messages to other tabs/windows
        this.broadcastChannel.postMessage(this.state.messages);
      }
    );

    // Clear the message input field
    messageInput.value = "";
  }

  render() {
    const { messages, currentUser } = this.state;

    return (
      <div>
        <h1>Chat Interface</h1>
        <p>Logged in as: {currentUser}</p>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.user}: </strong>
              {message.text} ({message.timestamp})
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleMessageSubmit}>
          <label htmlFor="message">Message:</label>
          <input type="text" id="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;




