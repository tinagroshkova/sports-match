import React, { useState, useEffect, useRef } from "react";
import userManager from ".././services/UserManager";
import { useNavigate } from "react-router-dom";
import "./Messages.scss"

const CHAT_STORAGE_KEY = "chatState";

const Chat = ({ otherUser }) => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const broadcastChannel = new BroadcastChannel("chatMessages");
  const messageListRef = useRef(null);

  useEffect(() => {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
    // Load the chat messages from localStorage
    const chatState = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
    if (chatState && chatState.messages) {
      setMessages(chatState.messages);
    }

    // Listen for messages from other tabs/windows
    broadcastChannel.onmessage = (event) => {
      setMessages(event.data);
    };

    return () => {
      // Close the Broadcast Channel when the component unmounts
      broadcastChannel.close();
    };
  }, [otherUser]);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever the messages are updated
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    const messageInput = event.target.elements.message;
    const message = {
      text: messageInput.value,
      timestamp: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString(),
      user: userManager.getLoggedInUser()?.username,
      receiver: otherUser // why this doesnt work?
    };

    // Update the state with the new message
    setMessages((prevState) => [...prevState, message]);

    // Store the updated messages in localStorage
    localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify({ messages: [...messages, message] })
    );

    // Broadcast the updated messages to other tabs/windows
    broadcastChannel.postMessage([...messages, message]);

    // Clear the message input field
    messageInput.value = "";
  };

  const handleResetClick = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  return (
    <div className="chatContainer">
      {/* <h1>Chat</h1> */}
      {/* <p>Logged in as: {userManager.getLoggedInUser()?.username}</p> */}
      <ul className="messageList" ref={messageListRef}>
        {messages.map((message, index) => (
          <li key={index} className={message.user === userManager.getLoggedInUser()?.username ? 'sender' : 'receiver'}>
            <strong>{message.user === userManager.getLoggedInUser()?.username ? "You" : message.user}: </strong>
            {message.text} ({message.timestamp})
          </li>
        ))}
      </ul>
      <form className="messagesForm" onSubmit={handleMessageSubmit}>
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" />
        <div className="buttonWrapper">
          <button type="submit">Send</button>
          <button type="button" onClick={handleResetClick}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;






// import React, { useState, useEffect } from "react";
// import userManager from ".././services/UserManager";
// import { useNavigate } from "react-router-dom";
// import "./Messages.scss"

// const CHAT_STORAGE_KEY = "chatState";

// const Chat = ({ otherUser }) => {
//   const [messages, setMessages] = useState([]);
//   const navigate = useNavigate();
//   const broadcastChannel = new BroadcastChannel("chatMessages");

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
//   }, []);

//   const handleMessageSubmit = (event) => {
//     event.preventDefault();

//     const messageInput = event.target.elements.message;
//     const message = {
//       text: messageInput.value,
//       // timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
//       timestamp: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString(),
//       user: userManager.getLoggedInUser()?.username,
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
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>
//             <strong>{message.user === userManager.getLoggedInUser()?.username ? "You" : message.user}: </strong>
//             {message.text} ({message.timestamp})
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleMessageSubmit}>
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




// const CHAT_STORAGE_KEY = "chatState";

// const Chat = ({ otherUser }) => {
//   const [messages, setMessages] = useState([]);
//   const navigate = useNavigate();
//   const broadcastChannel = new BroadcastChannel("chatMessages");

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
//   }, []);

//   const handleMessageSubmit = (event) => {
//     event.preventDefault();

//     const messageInput = event.target.elements.message;
//     const message = {
//       text: messageInput.value,
//       timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
//       user: userManager.getLoggedInUser()?.username,
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

//   return (
//     <div className="chatContainer">
//       {/* <h1>Chat</h1> */}
//       {/* <p>Logged in as: {userManager.getLoggedInUser()?.username}</p> */}
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>
//             <strong>{message.user === userManager.getLoggedInUser()?.username ? "You" : message.user}: </strong>
//             {message.text} ({message.timestamp})
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleMessageSubmit}>
//         <label htmlFor="message">Message:</label>
//         <input type="text" id="message" />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;


// import React, { useState, useEffect } from "react";

// const CHAT_STORAGE_KEY = "chatState";

// const Chat = ({ currentUser, otherUser }) => {
//   const [messages, setMessages] = useState([]);

//   const broadcastChannel = new BroadcastChannel("chatMessages");

//   useEffect(() => {
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
//   }, []);

//   const handleMessageSubmit = (event) => {
//     event.preventDefault();

//     const messageInput = event.target.elements.message;
//     const message = {
//       text: messageInput.value,
//       timestamp: new Date().toISOString(),
//       user: currentUser,
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

//   return (
//     <div>
//       <h1>Chat Interface</h1>
//       <p>Logged in as: {currentUser}</p>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>
//             <strong>{message.user}: </strong>
//             {message.text} ({message.timestamp})
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleMessageSubmit}>
//         <label htmlFor="message">Message:</label>
//         <input type="text" id="message" />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
