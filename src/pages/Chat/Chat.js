import userManager from '../../services/UserManager';
import React, { useState, useEffect } from "react";

export class Chat {
    constructor(user1, user2) {
      this.users = [user1, user2];
      this.messages = [];
    }
  
    sendMessage(sender, text) {
      if (this.users.includes(sender)) {
        const message = {
          sender,
          text,
        };
        this.messages.push(message);
      }
    }
  }
  
  export default function ChatPage() {
    const [chat, setChat] = useState(() => {
      const storedChat = sessionStorage.getItem('chat');
      return storedChat ? JSON.parse(storedChat) : null;
    });
  
    const handleSendMessage = (event) => {
      event.preventDefault();
      const message = {
        sender: userManager.getLoggedInUser(),
        text: event.target.message.value,
      };
      setChat({
        ...chat,
        messages: [...chat.messages, message],
      });
      sessionStorage.setItem('chat', JSON.stringify(chat));
    };
  
    if (!chat) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Chat with {chat.users[1].username}</h2>
        <ul>
          {chat.messages.map((message, index) => (
            <li key={index}>
              <strong>{message.sender.username}:</strong> {message.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage}>
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }