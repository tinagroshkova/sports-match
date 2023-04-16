import React, { useState } from "react";
import selectValues from "./activities.json";
import userManager from "../../services/UserManager";
import Chat from "../../components/Chat/Chat";
import "./BuddySearch.scss";

export default function BuddySearchPage() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Filter the users array to find users with matching activities
  const filteredUsers = userManager.users.filter(
    (user) =>
      user.username !== userManager.getLoggedInUser().username &&
      user.activities.some((activity) => activity.name === selectedValue)
  );

  const handleStartChat = (otherUser) => {
    const loggedInUser = userManager.getLoggedInUser();
    window.localStorage.removeItem('chatState'); // clear chat messages
    window.location.href = "/messages";

    return (
      <Chat currentUser={loggedInUser.username} otherUser={otherUser.username} />
    );
  };


    return (
        <div className="buddyPage">
            <h2 className="siteSloganTitle">Find someone that shares your sport passion</h2>
            <div className="buddySearchWrapper">
                <select className='buddySearchSelect' id="activity-select" value={selectedValue} onChange={handleChange}>
                    <option value="">Select an activity</option>
                    {selectValues.map((activity) => (
                        <option key={activity.type} value={activity.type}>
                            {activity.type}
                        </option>
                    ))}
                </select>
            </div>
            {filteredUsers.map((user) => (
                <div className="buddyCardContainer" key={user.username}>
                    <div className='buddyCard' >
                        <img src={user.image} alt={user.username} />
                        <h3>{user.username}</h3>
                        <p>Favourite activities: {user.activities.map((activity) => activity.name).join(', ')}</p>
                        <button onClick={() => handleStartChat(user)}>Start Chat</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
// import React, { useState } from "react";
// import selectValues from "./activities.json";
// import userManager from "../../services/UserManager";
// import Chat from "../../components/Chat/Chat";
// import "./BuddySearch.scss";

// export default function BuddySearchPage() {
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   // Filter the users array to find users with matching activities
//   const filteredUsers = userManager.users.filter(
//     (user) =>
//       user.username !== userManager.getLoggedInUser().username &&
//       user.activities.some((activity) => activity.name === selectedValue)
//   );

//   const handleStartChat = (otherUser) => {
//     const loggedInUser = userManager.getLoggedInUser();
//     window.localStorage.removeItem('chatState'); // clear chat messages
//     window.location.href = "/messages";

//     return (
//       <Chat currentUser={loggedInUser.username} otherUser={otherUser.username} />
//     );
//   };


//     return (
//         <div className="buddyPage">
//             <h2 className="siteSloganTitle">Find someone that shares your sport passion</h2>
//             <div className="buddySearchWrapper">
//                 <select className='buddySearchSelect' id="activity-select" value={selectedValue} onChange={handleChange}>
//                     <option value="">Select an activity</option>
//                     {selectValues.map((activity) => (
//                         <option key={activity.type} value={activity.type}>
//                             {activity.type}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             {filteredUsers.map((user) => (
//                 <div className="buddyCardContainer" key={user.username}>
//                     <div className='buddyCard' >
//                         <img src={user.image} alt={user.username} />
//                         <h3>{user.username}</h3>
//                         <p>Favourite activities: {user.activities.map((activity) => activity.name).join(', ')}</p>
//                         <button onClick={() => handleStartChat(user)}>Start Chat</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }
