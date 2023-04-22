import React, { useState, useEffect } from "react";
import userManager from "../../services/UserManager";
import "./BuddySearch.scss";
import { useNavigate } from "react-router-dom";
import userImage from "../../images/user.png";
import BuddyCard from "../../components/BuddyCard/BuddyCard";
import activitiesData from "../Activities/activitiesData";

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

  const handleStartChat = (otherUser) => { navigate('/messages', { state: { receiver: otherUser.username } }); }

  return (
    <div className="buddyPage">
      <h2 className="siteSloganTitle">Find someone that shares your sport passion</h2>
      <div className="buddySearchWrapper">
        <select className='buddySearchSelect' id="activity-select" value={selectedValue} onChange={handleChange}>
          <option value="">Search buddy by activity</option>
          {activitiesData.sort((a, b) => a.name.localeCompare(b.name)).map((activity) => (
            <option key={activity.name} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <div className="buddiesHolder">
        {filteredUsers.map((user) => (
          <div className="buddyCardContainer" key={user.username}>
            <BuddyCard user={user} defaultImage={userImage} onStartChat={() => handleStartChat(user)} />
          </div>
        ))}
      </div>
    </div>
  );
}

