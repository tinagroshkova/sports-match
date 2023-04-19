import React from "react";
import "./BuddyCard.scss";
import userImage from "../../images/user.png";

export default function BuddyCard(props) {
  const { user, onStartChat } = props;

  return (
    <div className="buddyCardContainer">
      <div className="buddyCard">
        <img src={user.image || userImage} alt={user.username} />
        <h3>{user.username}</h3>
        <p>Favourite activities: {user.activities.map((activity) => activity.name).join(", ")}</p>
        <button className="chatBtn" onClick={() => onStartChat(user)}>Start Chat</button>
      </div>
    </div>
  );
}