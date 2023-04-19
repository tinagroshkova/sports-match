
import React, { useState, useEffect, useRef } from "react";
import userManager from "../services/UserManager";
import { Message, MessagesManager, MessageComponent } from "../services/MessagesManager";
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



















// import React, { useState, useEffect, useRef } from "react";
// import userManager from ".././services/UserManager";
// import { useNavigate } from "react-router-dom";
// import "./Messages.scss"

// const CHAT_STORAGE_KEY = "chatState";

// const Chat = ({ otherUser }) => {
//     const [messages, setMessages] = useState([]);
//     const [toUser, setToUser] = useState("");
//     const navigate = useNavigate();
//     const broadcastChannel = new BroadcastChannel("chatMessages");
//     const messageListRef = useRef(null);
  
//     useEffect(() => {
//       const loggedInUser = userManager.getLoggedInUser();
//       if (!loggedInUser) {
//         alert("You have to log in first!");
//         navigate('/login');
//         return;
//       }
//       // Load the chat messages from localStorage
//       const chatState = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
//       if (chatState && chatState.messages) {
//         setMessages(chatState.messages);
//         setToUser(chatState.toUser);
//       }
  
//       // Listen for messages from other tabs/windows
//       broadcastChannel.onmessage = (event) => {
//         setMessages(event.data);
//       };
  
//       return () => {
//         // Close the Broadcast Channel when the component unmounts
//         broadcastChannel.close();
//       };
//     }, [otherUser]);
  
//     useEffect(() => {
//       // Scroll to the bottom of the message list whenever the messages are updated
//       if (messageListRef.current) {
//         messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//       }
//     }, [messages]);
  
//     const handleMessageSubmit = (event) => {
//       event.preventDefault();
  
//       const messageInput = event.target.elements.message;
//       const message = {
//         text: messageInput.value,
//         timestamp: new Date().toLocaleTimeString(),
//         user: userManager.getLoggedInUser().username,
//       };
//       const newMessages = [...messages, message];
//       const newChat = { messages: newMessages, toUser };
//       window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newChat));
//       broadcastChannel.postMessage(newMessages);
//       setMessages(newMessages);
//       messageInput.value = "";
//     };
//     const handleResetClick = () => {
//         setMessages([]);
//         localStorage.removeItem(CHAT_STORAGE_KEY);
//       };
  
//     return (
//       <div className="chatContainer">
//         {/* <h2>Chatting with {toUser}</h2> */}
//           <ul className="messagesList" ref={messageListRef}>
//             {messages.map((message, index) => (
//               <li key={index} className={message.user === userManager.getLoggedInUser()?.username ? 'sender' : 'receiver'}>
// <strong>{message.user === userManager.getLoggedInUser()?.username ? "You" : message.user}: </strong>
//             {message.text} ({message.timestamp})
//               </li>
//             ))}
//           </ul>
//           <form className="messagesForm" onSubmit={handleMessageSubmit}>
//             <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
//             <button type="submit">Send</button>
//             <button type="button" onClick={handleResetClick}>Reset</button>
//           </form>
//         </div>
//     );
//   };

// export default Chat;




























//тук има напредък в сториджа
// import React, { useState, useEffect, useRef } from "react";
// import userManager from ".././services/UserManager";
// import { useNavigate } from "react-router-dom";
// import "./Messages.scss"

// const CHAT_STORAGE_KEY = "chatState";

// const Chat = ({ otherUser }) => {
//     const [messages, setMessages] = useState([]);
//     const [toUser, setToUser] = useState("");
//     const navigate = useNavigate();
//     const broadcastChannel = new BroadcastChannel("chatMessages");
//     const messageListRef = useRef(null);
  
//     useEffect(() => {
//       const loggedInUser = userManager.getLoggedInUser();
//       if (!loggedInUser) {
//         alert("You have to log in first!");
//         navigate('/login');
//         return;
//       }
//       // Load the chat messages from localStorage
//       const chatState = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
//       if (chatState && chatState.messages) {
//         setMessages(chatState.messages);
//         setToUser(chatState.toUser);
//       }
  
//       // Listen for messages from other tabs/windows
//       broadcastChannel.onmessage = (event) => {
//         setMessages(event.data);
//       };
  
//       return () => {
//         // Close the Broadcast Channel when the component unmounts
//         broadcastChannel.close();
//       };
//     }, [otherUser]);
  
//     useEffect(() => {
//       // Scroll to the bottom of the message list whenever the messages are updated
//       if (messageListRef.current) {
//         messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//       }
//     }, [messages]);
  
//     const handleMessageSubmit = (event) => {
//       event.preventDefault();
  
//       const messageInput = event.target.elements.message;
//       const message = {
//         text: messageInput.value,
//         timestamp: new Date().toLocaleTimeString(),
//         user: userManager.getLoggedInUser().username,
//       };
//       const newMessages = [...messages, message];
//       const newChat = { messages: newMessages, toUser };
//       window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newChat));
//       broadcastChannel.postMessage(newMessages);
//       setMessages(newMessages);
//       messageInput.value = "";
//     };
  
//     return (
//       <div className="messagesPage">
//         <h2>Chatting with {toUser}</h2>
//         <div className="messagesWrapper">
//           <ul className="messagesList" ref={messageListRef}>
//             {messages.map((message, index) => (
//               <li key={index} className={message.user === userManager.getLoggedInUser().username ? "sent" : "received"}>
//                 <div>{message.text}</div>
//                 <div>{message.timestamp}</div>
//               </li>
//             ))}
//           </ul>
//           <form className="messageInputForm" onSubmit={handleMessageSubmit}>
//             <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       </div>
//     );
//   };

// export default Chat;
// import React, { useState, useEffect, useRef } from "react";
// import userManager from ".././services/UserManager";
// import { useNavigate } from "react-router-dom";
// import "./Messages.scss"

// const CHAT_STORAGE_KEY = "chatState";

// const Chat = ({ otherUser }) => {
//   const [messages, setMessages] = useState([]);
//   const navigate = useNavigate();
//   const broadcastChannel = new BroadcastChannel("chatMessages");
//   const messageListRef = useRef(null);

//   useEffect(() => {
//     const loggedInUser = userManager.getLoggedInUser();
//     if (!loggedInUser) {
//       alert("You have to log in first!");
//       navigate('/login');
//       return;
//     }
//     // Load the chat messages from localStorage
//     const chatState = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
//     if (chatState && chatState.messages) {
//       setMessages(chatState.messages);
//     }

//     // Listen for messages from other tabs/windows
//     broadcastChannel.onmessage = (event) => {
//       setMessages(event.data);
//     };

//     return () => {
//       // Close the Broadcast Channel when the component unmounts
//       broadcastChannel.close();
//     };
//   }, [otherUser]);

//   useEffect(() => {
//     // Scroll to the bottom of the message list whenever the messages are updated
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleMessageSubmit = (event) => {
//     event.preventDefault();

//     const messageInput = event.target.elements.message;
//     const message = {
//       text: messageInput.value,
//       timestamp: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString(),
//       user: userManager.getLoggedInUser()?.username,
//       receiver: otherUser // why this doesnt work?
//     };

//     // Update the state with the new message
//     setMessages((prevState) => [...prevState, message]);

//     // Store the updated messages in localStorage
//     localStorage.setItem(
//       CHAT_STORAGE_KEY,
//       JSON.stringify({ messages: [...messages, message] })
//     );

//     // Broadcast the updated messages to other tabs/windows
//     broadcastChannel.postMessage([...messages, message]);

//     // Clear the message input field
//     messageInput.value = "";
//   };

//   const handleResetClick = () => {
//     setMessages([]);
//     localStorage.removeItem(CHAT_STORAGE_KEY);
//   };

//   return (
//     <div className="chatContainer">
//       {/* <h1>Chat</h1> */}
//       {/* <p>Logged in as: {userManager.getLoggedInUser()?.username}</p> */}
//       <ul className="messageList" ref={messageListRef}>
//         {messages.map((message, index) => (
//           <li key={index} className={message.user === userManager.getLoggedInUser()?.username ? 'sender' : 'receiver'}>
//             <strong>{message.user === userManager.getLoggedInUser()?.username ? "You" : message.user}: </strong>
//             {message.text} ({message.timestamp})
//           </li>
//         ))}
//       </ul>
//       <form className="messagesForm" onSubmit={handleMessageSubmit}>
//         <label htmlFor="message">Message:</label>
//         <input type="text" id="message" />
//         <div className="buttonWrapper">
//           <button type="submit">Send</button>
//           <button type="button" onClick={handleResetClick}>Reset</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Chat;





