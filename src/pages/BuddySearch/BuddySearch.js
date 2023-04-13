import React, { useState, useEffect } from "react";
import selectValues from './activities.json';
import userManager from '../../services/UserManager';
import Chat from '../../components/Chat/Chat';
import "./BuddySearch.scss";

// import ChatPage from '../Chat/Chat';
// import { Navigate } from 'react-router-dom';

export default function BuddySearchPage() {
    const [selectedValue, setSelectedValue] = useState('');

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
        const chat = new Chat(loggedInUser, otherUser);
        sessionStorage.setItem('chat', JSON.stringify(chat));
        window.location.href = "/chat";
    };


    return (
        <div>
            {/* <h2 className="siteNameTitle">Buddy search</h2> */}
            <h2 className="siteSloganTitle">Find someone that share your sport passion</h2>
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
                        <p>Activities: {user.activities.map((activity) => activity.name).join(', ')}</p>
                        <form onSubmit={() => handleStartChat(user)}>
                            <button type="submit">Start Chat</button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}
