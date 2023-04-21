import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import userManager from "../../services/UserManager";
import { Message, messagesManager } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";

const CHAT_STORAGE_KEY = 'chatState';

const Messages = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(location.state?.receiver || props.location?.state?.receiver || "")
  const [conversations, setConversations] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const messageListRef = useRef(null);
  const loggedInUser = userManager.getLoggedInUser();

  const loadConversations = useCallback(() => {
    if (loggedInUser) {
      const allConversations = messagesManager.getConversations(loggedInUser.username);
      setConversations(allConversations);
    }
  }, [loggedInUser]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadConversations();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [loadConversations]);

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

    setMessages((prevMessages) => [...prevMessages, message]);

    event.target.reset();
  };

  const filteredMessagesMemo = useMemo(() => {
    return messages.filter(
      (message) =>
        (message.sender === loggedInUser.username && message.receiver === receiver) ||
        (message.sender === receiver && message.receiver === loggedInUser.username)
    );
  }, [messages, loggedInUser, receiver]);

  useEffect(() => {
    setFilteredMessages(filteredMessagesMemo);
  }, [filteredMessagesMemo]);

  const handleMessageUpdate = () => {
    setMessages(messagesManager.getMessagesByReceiver(receiver));
  };
  useEffect(() => {
    const uniqueReceivers = [...new Set(messages.map((message) => message.receiver))];
    setConversations(uniqueReceivers);
  }, [messages]);

  useEffect(() => {
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }

    messagesManager.loadMessagesFromStorage();
    messagesManager.setOnUpdate(handleMessageUpdate);
    setMessages(messagesManager.loadMessagesFromStorage());

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
  // console.log(loggedInUser.username);
  // console.log(receiver);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="conversations">
          <h2>Your conversations:</h2>
          <ul>
            {conversations.map((conversation, index) => (
              <li
                key={index}
                onClick={() => setReceiver(conversation)}
                className={conversation === receiver ? "activeConversation" : ""}
              >
                {conversation}
              </li>
            ))}
          </ul>
        </div>
  
        <div className="messagesWrapper">
          <ul className="messagesList" ref={messageListRef}>
            {messages
              .filter(
                (message) =>
                  (message.sender === loggedInUser.username && message.receiver === receiver) ||
                  (message.sender === receiver && message.receiver === loggedInUser.username)
              )
              .map((message, index) => (
                <MessageComponent key={index} message={message} loggedInUser={loggedInUser} formatDate={formatDate} />
              ))}
          </ul>

          <form className="messagesForm" onSubmit={handleSendMessage}>
            <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};


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
const Conversation = ({ receiver, loggedInUser, formatDate, messages, handleSendMessage }) => {
  const messageListRef = useRef(null);

  const filteredMessages = messages.filter(
    (message) =>
      (message.sender === receiver && message.receiver === loggedInUser.username) ||
      (message.sender === loggedInUser.username && message.receiver === receiver)
  );

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  return (
    <div className="chatContainer">
      {loggedInUser && <h1>{receiver ? receiver : "nobody"}</h1>}
      <div className="messagesWrapper">
        <ul className="messagesList" ref={messageListRef}>
          {filteredMessages.map((message, index) => (
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
};


export default Messages;



