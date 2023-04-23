import React, { useState, useEffect, useRef } from "react";
import userManager from "../../services/UserManager";
import { Message, messagesManager } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";
import "../../sweetalert2-custom.scss";
import LoginModal from "../../components/Modals/LoginModal";
import userImage from "../../images/user.png";

const Messages = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentReceiver, setCurrentReceiver] = useState(location.state?.receiver || props.location?.state?.receiver || "");
  // const [user, setUser] = useState(userManager.getLoggedInUser());
  const messageListRef = useRef(null);
  const loggedInUser = userManager.getLoggedInUser();

  const getReceiverImage = (receiver) => {
    const receiverObj = userManager.users.find((user) => user.username === receiver);
    return receiverObj ? receiverObj.getImage() : userImage;
  };


  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (!loggedInUser) {
        const isLoggedIn = await LoginModal();
        if (!isLoggedIn) {
          navigate('/login');
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
      setMessages(messagesManager.loadMessagesFromStorage());
    };

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    messagesManager.loadMessagesFromStorage();
    // messagesManager.setOnUpdate(handleMessageUpdate);
    setMessages(messagesManager.loadMessagesFromStorage());
  }, []);

  // useEffect(() => {
  //   const fetchMessages = () => {
  //     setMessages(messagesManager.loadMessagesFromStorage());
  //   };

  //   const intervalId = setInterval(() => {
  //     fetchMessages();
  //   }, 2000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = event.target.message.value;
    const message = new Message(messageText, new Date(), loggedInUser.username, currentReceiver);
    messagesManager.addMessage(message);
    event.target.reset();
    setMessages(messagesManager.loadMessagesFromStorage());
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
        <h2>Chats</h2>
        <ul>
          {messagesManager.getConversations(loggedInUser?.username).map((receiver, index) => (
            <li key={index} onClick={() => handleConversationClick(receiver)}>
              <img
                src={getReceiverImage(receiver)}
                alt={receiver}
                className="receiverImage"
              />
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
  const sender = userManager.users.find((user) => user.username === message.sender);
  const senderImage = sender ? sender.getImage() : null;
  const timestamp = formatDate(message.timestamp);

  return (
    <>
      <span className="shortTimestamp">{timestamp}</span>
      <li className={`message ${isSentByLoggedInUser ? "sender" : "receiver"}`}>
        {!isSentByLoggedInUser && (
          <div className="senderInfo">
            <img
              src={senderImage ? senderImage : userImage}
              alt={sender && sender.username ? sender.username : ''}
              className="senderImage"
            />
          </div>
        )}
        <span className="messageText">{message.text}</span>
      </li>
    </>
  );
};
export default Messages;
// import React, { useState, useEffect, useRef } from "react";
// import userManager from "../../services/UserManager";
// import { Message, messagesManager } from "../../services/MessagesManager";
// import { useNavigate } from "react-router-dom";
// import "./Messages.scss";
// import { useLocation } from "react-router-dom";
// import "../../sweetalert2-custom.scss";
// import LoginModal from "../../components/Modals/LoginModal";
// import userImage from "../../images/user.png";

// const Messages = (props) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [messages, setMessages] = useState([]);
//   const [currentReceiver, setCurrentReceiver] = useState(location.state?.receiver || props.location?.state?.receiver || "");
//   // const [user, setUser] = useState(userManager.getLoggedInUser());
//   const messageListRef = useRef(null);
//   const loggedInUser = userManager.getLoggedInUser();

//   const getReceiverImage = (receiver) => {
//     const receiverObj = userManager.users.find((user) => user.username === receiver);
//     return receiverObj ? receiverObj.getImage() : userImage;
//   };


//   useEffect(() => {
//     const checkLoggedInUser = async () => {
//       if (!loggedInUser) {
//         const isLoggedIn = await LoginModal();
//         if (!isLoggedIn) {
//           navigate('/login');
//           return;
//         } else {
//           navigate('/login', { state: { from: '/profile' } });
//           return;
//         }
//       }
//     }
//     checkLoggedInUser();
//   }, []);

//   useEffect(() => {
//     messagesManager.loadMessagesFromStorage();
//     // messagesManager.setOnUpdate(handleMessageUpdate);
//     setMessages(messagesManager.loadMessagesFromStorage());
//   }, []);

  // useEffect(() => {
  //   const fetchMessages = () => {
  //     setMessages(messagesManager.loadMessagesFromStorage());
  //   };

  //   const intervalId = setInterval(() => {
  //     fetchMessages();
  //   }, 2000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

//   const handleSendMessage = (event) => {
//     event.preventDefault();
//     // if (!loggedInUser) {
//     //   alert("You have to log in first!");
//     //   navigate('/login');
//     //   return;
//     // }
//     const messageText = event.target.message.value;
//     const message = new Message(messageText, new Date(), loggedInUser.username, currentReceiver);
//     messagesManager.addMessage(message);
//     event.target.reset();
//     setMessages([...messages, message]);
//   };

//   // const handleMessageUpdate = () => {
//   //   setMessages(messagesManager.getMessagesByReceiver(currentReceiver));
//   // };

//   useEffect(() => {
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const formatDate = (date) => {
//     const currentDate = new Date();
//     const messageDate = new Date(date);

//     let dateString = '';
//     if (currentDate.getDate() !== messageDate.getDate() ||
//       currentDate.getMonth() !== messageDate.getMonth() ||
//       currentDate.getFullYear() !== messageDate.getFullYear()) {
//       const dateOptions = {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       };
//       dateString = messageDate.toLocaleString('en-US', dateOptions) + ', ';
//     }

//     const timeOptions = {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false,
//     };
//     const timeString = messageDate.toLocaleString('bg-BG', timeOptions);

//     return dateString + timeString;
//   }

//   const handleConversationClick = (receiver) => {
//     setCurrentReceiver(receiver);
//   }

//   return (
//     <div className="chatPage">
//       <div className="conversationList">
//         <h2>Chats</h2>
//         <ul>
//           {messagesManager.getConversations(loggedInUser?.username).map((receiver, index) => (
//             <li key={index} onClick={() => handleConversationClick(receiver)}>
//               <img
//                 src={getReceiverImage(receiver)}
//                 alt={receiver}
//                 className="receiverImage"
//               />
//               {receiver}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="chatContainer">
//         {loggedInUser && (
//           <h1>{currentReceiver ? currentReceiver : "You have no messages yet from buddy match"}</h1>
//         )}
//         <div className="messagesWrapper">
//           <ul className="messagesList" ref={messageListRef}>
//             {messages
//               .filter(
//                 (message) =>
//                   (message.sender === loggedInUser?.username && message.receiver === currentReceiver) ||
//                   (message.sender === currentReceiver && message.receiver === loggedInUser?.username)
//               )
//               .map((message, index) => (
//                 <MessageComponent key={index} message={message} loggedInUser={loggedInUser} formatDate={formatDate} />
//               ))}
//           </ul>
//           <form className="messagesForm" onSubmit={handleSendMessage}>
//             <
//               input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MessageComponent = ({ message, loggedInUser, formatDate }) => {
//   const isSentByLoggedInUser = message.sender === loggedInUser?.username;
//   const sender = userManager.users.find((user) => user.username === message.sender);
//   const senderImage = sender ? sender.getImage() : null;
//   const timestamp = formatDate(message.timestamp);

//   return (
//     <>
//       <span className="shortTimestamp">{timestamp}</span>
//       <li className={`message ${isSentByLoggedInUser ? "sender" : "receiver"}`}>
//         {!isSentByLoggedInUser && (
//           <div className="senderInfo">
//             <img
//               src={senderImage ? senderImage : userImage}
//               alt={sender && sender.username ? sender.username : ''}
//               className="senderImage"
//             />
//           </div>
//         )}
//         <span className="messageText">{message.text}</span>
//       </li>
//     </>
//   );
// };
// export default Messages;
