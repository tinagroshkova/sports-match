import React from "react";
import "./BuddyCard.scss";
import userImage from "../../images/user.png";

export default function BuddyCard(props) {
  const { user, onStartChat } = props;

  return (
    <div className="box">
      <div className="imgBx">
        <img src={user.image || userImage} alt={user.username} />
      </div>
      <div className="content">
        <h3>{user.username} <br></br>
          <span>Favourite activities: {user.activities.map((activity) => activity.name).join(", ")} <br></br></span>
          <button className="chatBtn" onClick={() => onStartChat(user)}>Start Chat</button></h3>
      </div>
    </div>
  );
}

{/* <div className="buddyCardContainer">
<div className="buddyCard">
  <img src={user.image || userImage} alt={user.username} />
  <h3>{user.username}</h3>
  <p>Favourite activities: {user.activities.map((activity) => activity.name).join(", ")}</p>
  <button className="chatBtn" onClick={() => onStartChat(user)}>Start Chat</button>
</div>
</div> */}