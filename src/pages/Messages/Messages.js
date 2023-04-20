import React, { useState, useEffect, useRef } from "react";
import userManager from "../../services/UserManager";
import { Message, messagesManager } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";

const Messages = (props) => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(location.state?.receiver || props.location?.state?.receiver || "")
  const navigate = useNavigate();
  const messageListRef = useRef(null);
  const loggedInUser = userManager.getLoggedInUser();

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
    const messageText = event.target.message.value;
    const message = new Message(messageText, new Date(), loggedInUser.username, receiver);
    messagesManager.addMessage(message);
    event.target.reset();
  };

  const handleResetClick = () => {
    localStorage.removeItem("chatState");
    messagesManager.loadMessagesFromStorage();
  };

  const handleMessageUpdate = () => {
    setMessages(messagesManager.getMessagesByReceiver(receiver));
  };

  useEffect(() => {
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }

    messagesManager.loadMessagesFromStorage();
    messagesManager.setOnUpdate(handleMessageUpdate);

    return () => {
      messagesManager.removeOnUpdate(handleMessageUpdate);
    };
  }, [loggedInUser, location.state?.receiver]);

  useEffect(() => {
    setReceiver(location.state?.receiver || "");
  }, [location.state?.receiver]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const formatDate = (date) => {
    const options = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    };
    return new Date(date).toLocaleString('en-US', options);
  }

  return (
    <div className="chatContainer">
      <h1>Messages</h1>
      <div className="messagesWrapper">
        <ul className="messagesList" ref={messageListRef}>
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} loggedInUser={loggedInUser} formatDate={formatDate} />
          ))}
        </ul>

        <form className="messagesForm" onSubmit={handleSendMessage}>
          <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
          <button type="submit">Send</button>
          <button type="button" onClick={handleResetClick}>Reset</button>
        </form>
      </div>
      {loggedInUser && (
        <p>You are sending messages to {receiver ? receiver : "nobody"}</p>
      )}
    </div>
  );
};

const MessageComponent = ({ message, loggedInUser, formatDate }) => {
  const isSentByLoggedInUser = message.sender === loggedInUser?.username;
  const senderLabel = isSentByLoggedInUser ? "You:" : `${message.sender}:`;
  return (
    <li className={`message ${isSentByLoggedInUser ? "sent" : "received"}`}>
      <p className="senderLabel">{senderLabel}</p>
      <p className="messageContent">{message.text}</p>
      <p className="messageTimestamp">{formatDate(message.timestamp)}</p>
    </li>
  );
}

export default Messages;



