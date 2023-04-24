import React, { useState, useEffect, useRef } from "react";
import userManager from "../../services/UserManager";
import { Message, messagesManager } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";
import "../../sweetalert2-custom.scss";
import LoginModal from "../../components/Modals/LoginModal";
import userImage from "../../images/user.png";
import ReactEmoji from 'react-emoji';

const Messages = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(location.state?.receiver || props.location?.state?.receiver || "");
  const messageListRef = useRef(null);
  const loggedInUser = userManager.getLoggedInUser();
  const [updatedImage, setUpdatedImage] = useState(null);
  const [shouldUpdateMessages, setShouldUpdateMessages] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (!loggedInUser) {
        const isLoggedIn = await LoginModal();
        if (!isLoggedIn) {
          navigate('/home');
          return;
        } else {
          navigate('/login', { state: { from: '/profile' } });
          return;
        }
      }
    }
    checkLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchMessages = () => {
      const loadedMessages = JSON.parse(localStorage.getItem('chatState')) || [];
      if (JSON.stringify(loadedMessages) !== JSON.stringify(messages)) {
        setMessages(loadedMessages);
      }
    };
  
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [messages]);


  useEffect(() => {
    messagesManager.loadMessagesFromStorage();
    // messagesManager.setOnUpdate(handleMessageUpdate);
    setMessages(messagesManager.loadMessagesFromStorage());
  }, []);

  useEffect(() => {
    if (shouldUpdateMessages) {
      setMessages(messagesManager.loadMessagesFromStorage());
      setShouldUpdateMessages(false);
    }
  }, [shouldUpdateMessages]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = event.target.message.value;
    const message = new Message(messageText, new Date(), loggedInUser.username, currentReceiver);
  
    const currentChatState = JSON.parse(localStorage.getItem('chatState')) || [];
    currentChatState.push(message);
    localStorage.setItem('chatState', JSON.stringify(currentChatState));
    
    event.target.reset();
    setMessages(currentChatState);
  };

  const hasUnreadMessages = (receiver) => {
    return messages.some(
      (message) =>
        message.status === "unread" &&
        message.receiver === loggedInUser?.username &&
        message.sender === receiver
    );
  };

  const handleConversationClick = (receiver) => {
    setCurrentReceiver(receiver);
  
    const currentChatState = JSON.parse(localStorage.getItem('chatState')) || [];
  
    const updatedChatState = currentChatState.map((message) => {
      if (
        message.sender === receiver &&
        message.receiver === loggedInUser?.username &&
        message.status === "unread"
      ) {
        return { ...message, status: "read" };
      }
      return message;
    });
  
    localStorage.setItem('chatState', JSON.stringify(updatedChatState));
    setMessages(updatedChatState);
  };

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
  const getSenderImage = (sender) => {
    const senderObj = userManager.users.find((user) => user.username === sender);
    return updatedImage || (senderObj ? senderObj.getImage() : userImage);
  };

  const getReceiverImage = (receiver) => {
    const receiverObj = userManager.users.find((user) => user.username === receiver);
    return receiverObj && receiverObj.getImage() ? receiverObj.getImage() : userImage;
  };

  return (
    <div className="chatPage">
      <div className="conversationList">
        <h1>Chats</h1>
        <ul>
          {messagesManager.getConversations(loggedInUser?.username).map((receiver, index) => (
            <li key={index} onClick={() => handleConversationClick(receiver)}>
              <img
                src={getReceiverImage(receiver)}
                alt={receiver}
                className="receiverImage"
              />
              {receiver}
              {hasUnreadMessages(receiver) && (
                <span
                  className="unreadIndicator"
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    display: "inline-block",
                    marginLeft: "5px",
                  }}
                ></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chatContainer">
        {loggedInUser && (
          <div className="receiverHeader">
            <h1>{currentReceiver ? currentReceiver : "Go back and find a buddy"}</h1>
            {currentReceiver && (
              <img
                src={getReceiverImage(currentReceiver)}
                alt={currentReceiver}
                className="receiverImage"
              />
            )}
          </div>
        )}
        <div className="messagesWrapper">
          <ul className="messagesList" ref={messageListRef}>
            {messages
              .filter(
                (message) =>
                  (message.sender === loggedInUser?.username && message.receiver === currentReceiver) ||
                  (message.sender === currentReceiver && message.receiver === loggedInUser?.username)
              )
              .map((message, index) => (
                <MessageComponent key={index} message={message} loggedInUser={loggedInUser} formatDate={formatDate} getSenderImage={getSenderImage} getReceiverImage={getReceiverImage} setUpdatedImage={setUpdatedImage} />
              ))}
          </ul>
          <form className="messagesForm" onSubmit={handleSendMessage}>
            <input type="text" name="message" placeholder="Type a message..." autoComplete="off" disabled={!currentReceiver} />
            <button type="submit" disabled={!currentReceiver}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const MessageComponent = ({ message, loggedInUser, formatDate, getReceiverImage, getSenderImage }) => {
  const isSentByLoggedInUser = message.sender === loggedInUser?.username;
  const sender = userManager.users.find((user) => user.username === message.sender);
  const timestamp = formatDate(message.timestamp);
  const senderImage = getSenderImage(message.sender);

  const emojifiedText = ReactEmoji.emojify(message.text).map((item, index) => (
    <span key={index} className={typeof item === 'string' ? '' : 'emoji'}>
      {item}
    </span>
  ));

  return (
    <>
      <span className="shortTimestamp">{timestamp}</span>
      <li className={`message ${isSentByLoggedInUser ? "sender" : "receiver"}`}>
        {!isSentByLoggedInUser && (
          <div className="senderInfo">
            <img
              src={senderImage ? senderImage : userImage}
              alt={message.sender}
              className="senderImage"
            />
          </div>
        )}
        <span className="messageText">{emojifiedText}</span>
      </li>
    </>
  );
}
export default Messages;
