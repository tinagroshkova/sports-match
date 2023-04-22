import React, { useState, useEffect, useRef } from "react";
import userManager from "../../services/UserManager";
import { Message, messagesManager } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";
import "../../sweetalert2-custom.scss";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import LoginModal from "../../components/Modals/LoginModal";
import swal from "sweetalert2";



const Messages = (props) => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(location.state?.receiver || props.location?.state?.receiver || "");
  const navigate = useNavigate();
  const messageListRef = useRef(null);
  const loggedInUser = userManager.getLoggedInUser();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (!loggedInUser) {
        const alertResult = await swal.fire({
          title: 'You are not logged in!',
          text: 'You need to be logged in to view messages.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
  
        if (alertResult.isConfirmed) {
          navigate('/login');
          return;
        }
      }
    };
  
    checkLoggedInUser();
  }, []);

  useEffect(() => {
    messagesManager.loadMessagesFromStorage();
    // messagesManager.setOnUpdate(handleMessageUpdate);
    setMessages(messagesManager.loadMessagesFromStorage());
  }, []);

  useEffect(() => {
    const fetchMessages = () => {
      setMessages(messagesManager.loadMessagesFromStorage());
    };

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    // if (!loggedInUser) {
    //   alert("You have to log in first!");
    //   navigate('/login');
    //   return;
    // }
    const messageText = event.target.message.value;
    const message = new Message(messageText, new Date(), loggedInUser.username, currentReceiver);
    messagesManager.addMessage(message);
    event.target.reset();
    setMessages([...messages, message]);
  };

  // const handleMessageUpdate = () => {
  //   setMessages(messagesManager.getMessagesByReceiver(currentReceiver));
  // };

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

  const handleConversationClick = (receiver) => {
    setCurrentReceiver(receiver);
  }

  return (
    <div className="chatPage">
      <div className="conversationList">
        <h2>Conversations:</h2>
        <ul>
          {messagesManager.getConversations(loggedInUser?.username).map((receiver, index) => (
            <li key={index} onClick={() => handleConversationClick(receiver)}>
              {receiver}
            </li>
          ))}
        </ul>
      </div>
      <div className="chatContainer">
        {loggedInUser && (
          <h1>{currentReceiver ? currentReceiver : "You have no messages yet from buddy match"}</h1>
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
                <MessageComponent key={index} message={message} loggedInUser={loggedInUser} formatDate={formatDate} />
              ))}
          </ul>
          <form className="messagesForm" onSubmit={handleSendMessage}>
            <
              input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
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

export default Messages;






