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
    const currentDate = new Date();
    const messageDate = new Date(date);
    
    let dateString = '';
    if (currentDate.getDate() !== messageDate.getDate() ||
        currentDate.getMonth() !== messageDate.getMonth() ||
        currentDate.getFullYear() !== messageDate.getFullYear()) {
      const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      dateString = messageDate.toLocaleString('en-US', dateOptions) + ', ';
    }
  
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const timeString = messageDate.toLocaleString('bg-BG', timeOptions);
    
    return dateString + timeString;
  }

  return (
    <div className="chatContainer">
      {loggedInUser && (
        <h1>{receiver ? receiver : "nobody"}</h1>
      )}
      <div className="messagesWrapper">
        <ul className="messagesList" ref={messageListRef}>
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} loggedInUser={loggedInUser} formatDate={formatDate} />
          ))}
        </ul>

        <form className="messagesForm" onSubmit={handleSendMessage}>
          <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
const MessageComponent = ({ message, loggedInUser, formatDate }) => {
  const isSentByLoggedInUser = message.sender === loggedInUser?.username;
  const timestamp = formatDate(message.timestamp);

  return (
    <>
      <span className="shortTimestamp">{timestamp}</span>
      <li className={`message ${isSentByLoggedInUser ? "sender" : "receiver"}`}>
        {message.text}
      </li>
    </>
  );
}


export default Messages;



