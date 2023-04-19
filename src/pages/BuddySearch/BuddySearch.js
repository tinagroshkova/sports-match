import React, { useState, useEffect } from "react";
import selectValues from "./activities.json";
import userManager from "../../services/UserManager";
import "./BuddySearch.scss";
import { useNavigate } from "react-router-dom";
import userImage from "../../images/user.png";
import BuddyCard from "../../components/BuddyCard/BuddyCard";

export default function BuddySearchPage() {
  const [users, setUsers] = useState(userManager.users);
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
    setUsers(userManager.users);
  }, []);

  useEffect(() => {
    setUsers(userManager.users);
  }, [userManager.getLoggedInUser()?.activities]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Filter the users array to find users with matching activities
  const filteredUsers = users.filter(
    (user) =>
      user.username !== userManager.getLoggedInUser()?.username &&
      user.activities.some((activity) => activity.name === selectedValue)
  );

  // const handleStartChat = (otherUser) => {
  //   // const loggedInUser = userManager.getLoggedInUser();
  //   const newChat = { messages: [], toUser: otherUser.username };
  //   window.localStorage.setItem('chatState', JSON.stringify(newChat));
  //   navigate ("/messages");
  // };

  const handleStartChat = (otherUser) => {
    navigate('/messages', { state: { receiver: otherUser.username } });
  };


  return (
    <div className="buddyPage">
      <h2 className="siteSloganTitle">Find someone that shares your sport passion</h2>
      <div className="buddySearchWrapper">
        <select className='buddySearchSelect' id="activity-select" value={selectedValue} onChange={handleChange}>
          <option value="">Select an activity</option>
          {selectValues.sort((a, b) => a.type.localeCompare(b.type)).map((activity) => (
            <option key={activity.type} value={activity.type}>
              {activity.type}
            </option>
          ))}
        </select>
      </div>
      {filteredUsers.map((user) => (
        <div className="buddyCardContainer" key={user.username}>
          <BuddyCard user={user} defaultImage={userImage} onStartChat={() => handleStartChat(user)} />
        </div>
      ))}
    </div>
  );
}













// import React, { useState, useEffect } from "react";
// import selectValues from "./activities.json";
// import userManager from "../../services/UserManager";
// import "./BuddySearch.scss";
// import { useNavigate } from "react-router-dom";
// import userImage from "../../images/user.png";
// import BuddyCard from "../../components/BuddyCard/BuddyCard";

// export default function BuddySearchPage() {
//   const [users, setUsers] = useState(userManager.users);
//   const [selectedValue, setSelectedValue] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInUser = userManager.getLoggedInUser();
//     if (!loggedInUser) {
//       alert("You have to log in first!");
//       navigate('/login');
//       return;
//     }
//     setUsers(userManager.users);
//   }, []);

//   useEffect(() => {
//     setUsers(userManager.users);
//   }, [userManager.getLoggedInUser()?.activities]);

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   // Filter the users array to find users with matching activities
//   const filteredUsers = users.filter(
//     (user) =>
//       user.username !== userManager.getLoggedInUser()?.username &&
//       user.activities.some((activity) => activity.name === selectedValue)
//   );

//   const handleStartChat = (otherUser) => {
//     // const loggedInUser = userManager.getLoggedInUser();
//     const newChat = { messages: [], toUser: otherUser.username };
//     window.localStorage.setItem('chatState', JSON.stringify(newChat));
//     navigate ("/messages");
//   };


//   return (
//     <div className="buddyPage">
//       <h2 className="siteSloganTitle">Find someone that shares your sport passion</h2>
//       <div className="buddySearchWrapper">
//         <select className='buddySearchSelect' id="activity-select" value={selectedValue} onChange={handleChange}>
//           <option value="">Select an activity</option>
//           {selectValues.sort((a, b) => a.type.localeCompare(b.type)).map((activity) => (
//             <option key={activity.type} value={activity.type}>
//               {activity.type}
//             </option>
//           ))}
//         </select>
//       </div>
//       {filteredUsers.map((user) => (
//         <div className="buddyCardContainer" key={user.username}>
//           <BuddyCard user={user} defaultImage={userImage} onChatClick={() => handleStartChat(user)} />
//         </div>
//       ))}
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import selectValues from "./activities.json";
// import userManager from "../../services/UserManager";
// import "./BuddySearch.scss";
// import { useNavigate } from "react-router-dom";


// export default function BuddySearchPage() {
//   const [selectedValue, setSelectedValue] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInUser = userManager.getLoggedInUser();
//     if (!loggedInUser) {
//       alert("You have to log in first!");
//       navigate('/login');
//       return;
//     }
//   }, []);

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   // Filter the users array to find users with matching activities
//   const filteredUsers = userManager.users.filter(
//     (user) =>
//       user.username !== userManager.getLoggedInUser()?.username &&
//       user.activities.some((activity) => activity.name === selectedValue)
//   );

//   const handleStartChat = (otherUser) => {
//     const loggedInUser = userManager.getLoggedInUser();
    
//     window.localStorage.removeItem('chatState'); // clear chat messages
//     window.location.href = "/messages";
//   };


//   return (
//     <div className="buddyPage">
//       <h2 className="siteSloganTitle">Find someone that shares your sport passion</h2>
//       <div className="buddySearchWrapper">
//         <select className='buddySearchSelect' id="activity-select" value={selectedValue} onChange={handleChange}>
//           {/* <option value="">Select an activity</option>
//           {selectValues.map((activity) => (
//             <option key={activity.type} value={activity.type}>
//               {activity.type}
//             </option> */}
//           <option value="">Select an activity</option>
//           {selectValues.sort((a, b) => a.type.localeCompare(b.type)).map((activity) => (
//             <option key={activity.type} value={activity.type}>
//               {activity.type}
//             </option>
//           ))}
//         </select>
//       </div>
//       {filteredUsers.map((user) => (
//         <div className="buddyCardContainer" key={user.username}>
//           <div className='buddyCard' >
//             <img src={user.image} alt={user.username} />
//             <h3>{user.username}</h3>
//             <p>Favourite activities: {user.activities.map((activity) => activity.name).join(', ')}</p>
//             <button onClick={() => handleStartChat(user)}>Start Chat</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


