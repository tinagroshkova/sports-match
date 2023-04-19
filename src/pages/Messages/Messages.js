import React, { useState, useEffect, useRef } from "react";
import userManager from "../../services/UserManager";
import { Message, MessagesManager, MessageComponent } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";

const Messages = (props) => {
  const location = useLocation();
  // const { receiver } = location.state;

  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState("");
  const navigate = useNavigate();
  const messageListRef = useRef(null);
  const messagesManager = new MessagesManager();

  function handleUpdateMessages(messages) {
    console.log('New messages:', messages);
  }

  messagesManager.setOnUpdate(handleUpdateMessages);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
    const messageText = event.target.message.value;
    const receiver = location.state?.receiver || "";
    const message = {
      text: messageText,
      timestamp: new Date(),
      sender: loggedInUser.username,
      receiver: receiver,
    };

    messagesManager.addMessage(message);
    event.target.reset();
  };

  const handleReceiverNameChange = (event) => {
    setReceiverName(event.target.value);
  };

  const handleResetClick = () => {
    localStorage.removeItem("chatState");
    messagesManager.loadMessagesFromStorage();
  };

  function handleMessageUpdate(newMessages) {
    console.log('New messages:', newMessages);
    setMessages(messages => [...messages, ...newMessages]);
  }

  useEffect(() => {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
    messagesManager.setOnUpdate(handleMessageUpdate);
    messagesManager.loadMessagesFromStorage();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever the messages are updated
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatContainer">
      <h1>Messages</h1>
      <div className="messagesWrapper">
        <ul className="messagesList" ref={messageListRef}>
          {messages.map((message, index) => (
            <li key={index} className={message.sender === userManager.getLoggedInUser()?.username ? 'sender' : 'receiver'}>
              <strong>{message.sender === userManager.getLoggedInUser()?.username ? "You" : message.sender}: </strong>
              {message.text} ({message.timestamp.toString()})
            </li>
          ))}
        </ul>

        <form className="messagesForm" onSubmit={handleSendMessage}>

          <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
          <button type="submit">Send</button>
          <button type="button" onClick={handleResetClick}>Reset</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
