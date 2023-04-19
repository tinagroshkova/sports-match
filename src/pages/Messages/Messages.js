import React, { useState, useEffect, useRef } from "react";
import userManager from "../../services/UserManager";
import { Message, messagesManager, MessageComponent } from "../../services/MessagesManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss";
import { useLocation } from "react-router-dom";

const Messages = (props) => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState("");
  const navigate = useNavigate();
  const messageListRef = useRef(null);
  
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
    const message = new Message(messageText, new Date(), loggedInUser.username, receiver);
    messagesManager.addMessage(message);
    event.target.reset();
  };

  const handleResetClick = () => {
    localStorage.removeItem("chatState");
    messagesManager.loadMessagesFromStorage();
  };

  const handleMessageUpdate = () => {
    setMessages(messagesManager.getMessagesByReceiver(location.state?.receiver || ""));
  };

  useEffect(() => {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
  
    // Load messages from local storage
    messagesManager.loadMessagesFromStorage();
    
    // Set the onUpdate callback to update the messages state when new messages arrive
    messagesManager.setOnUpdate(handleMessageUpdate);
    
    // Start checking local storage for new messages
    messagesManager.startCheckingStorage();
  
    // Clean up the event listener when the component unmounts
    return () => {
      messagesManager.removeOnUpdate(handleMessageUpdate);
      messagesManager.stopCheckingStorage();
    };
  }, []);

  useEffect(() => {
    messagesManager.checkStorage();
  }, [location.state?.receiver]);

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
            <MessageComponent key={index} message={message} />
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
// import React, { useState, useEffect, useRef } from "react";
// import userManager from "../../services/UserManager";
// import { Message, MessagesManager, MessageComponent } from "../../services/MessagesManager";
// import { useNavigate } from "react-router-dom";
// import "./Messages.scss";
// import { useLocation } from "react-router-dom";

// const Messages = (props) => {
//   const location = useLocation();
//   // const { receiver } = location.state;

//   const [messages, setMessages] = useState([]);
//   const [receiverName, setReceiverName] = useState("");
//   const navigate = useNavigate();
//   const messageListRef = useRef(null);
//   const messagesManager = new MessagesManager();

//   function handleUpdateMessages(messages) {
//     console.log('New messages:', messages);
//   }

//   messagesManager.setOnUpdate(handleUpdateMessages);

//   const handleSendMessage = (event) => {
//     event.preventDefault();
//     const loggedInUser = userManager.getLoggedInUser();
//     if (!loggedInUser) {
//       alert("You have to log in first!");
//       navigate('/login');
//       return;
//     }
//     const messageText = event.target.message.value;
//     const receiver = location.state?.receiver || "";
//     const message = {
//       text: messageText,
//       timestamp: new Date(),
//       sender: loggedInUser.username,
//       receiver: receiver,
//     };
  
//     messagesManager.addMessage(message);
//     setMessages(messages => [...messages, message]);
//     event.target.reset();
//   };

//   const handleResetClick = () => {
//     localStorage.removeItem("chatState");
//     messagesManager.loadMessagesFromStorage();
//   };

//   function handleMessageUpdate(newMessages) {
//     const loggedInUser = userManager.getLoggedInUser();
//     const currentReceiverName = location.state?.receiver || "";
  
//     setMessages(messages => [
//       ...messages,
//       ...(Array.isArray(newMessages)
//         ? newMessages.filter(
//             message =>
//               (message.sender === loggedInUser.username && message.receiver === currentReceiverName) ||
//               (message.sender === currentReceiverName && message.receiver === loggedInUser.username)
//           ).filter(
//             message => message.receiver === loggedInUser.username || message.sender === loggedInUser.username
//           ).filter(
//             message => !messages.some(m => m.timestamp === message.timestamp)
//           )
//         : []
//       )
//     ]);
//   }

//   useEffect(() => {
//     const loggedInUser = userManager.getLoggedInUser();
//     if (!loggedInUser) {
//       alert("You have to log in first!");
//       navigate('/login');
//       return;
//     }
  
//     const receiverName = "andrei"; // update this to the name of Andrei's receiver
//     setReceiverName(receiverName);
//     setMessages(messagesManager.getMessagesByReceiver(receiverName));
//     messagesManager.startListening(handleMessageUpdate);
  
//     // Clean up the event listener when the component unmounts
//     return () => {
//       messagesManager.stopListening(handleMessageUpdate);
//       messagesManager.removeOnUpdate(handleUpdateMessages);
//     };
//   }, []);

//   useEffect(() => {
//     // Scroll to the bottom of the message list whenever the messages are updated
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="chatContainer">
//       <h1>Messages</h1>
//       <div className="messagesWrapper">
//         <ul className="messagesList" ref={messageListRef}>
//           {messages.map((message, index) => (
//             <li key={index} className={message.sender === userManager.getLoggedInUser()?.username ? 'sender' : 'receiver'}>
//               <strong>{message.sender === userManager.getLoggedInUser()?.username ? "You" : message.sender}: </strong>
//               {message.text} ({message.timestamp.toString()})
//             </li>
//           ))}
//         </ul>

//         <form className="messagesForm" onSubmit={handleSendMessage}>

//           <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
//           <button type="submit">Send</button>
//           <button type="button" onClick={handleResetClick}>Reset</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Messages;










































