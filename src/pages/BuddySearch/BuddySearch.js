import React, { useState } from 'react';
import selectValues from './activities.json';
import UserManager from '../../services/UserManager';

export default function BuddySearchPage() {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // Filter the users array to find users with matching activities
    const filteredUsers = UserManager.users.filter((user) =>
        user.activities.some((activity) => activity.name === selectedValue)
    );
    console.log("QQQ", UserManager.users)

    return (
        <div>
            <h2>This is the buddy search page</h2>
            <label htmlFor="activity-select">Select an activity:</label>
            <select id="activity-select" value={selectedValue} onChange={handleChange}>
                <option value="">Select an activity</option>
                {selectValues.map((activity) => (
                    <option key={activity.type} value={activity.type}>
                        {activity.type}
                    </option>
                ))}
            </select>
            {filteredUsers.map((user) => (
                <div key={user.username}>
                    <img src={user.image} alt={user.username} />
                    <h3>{user.username}</h3>
                    <p>Activities: {user.activities.map((activity) => activity.name).join(', ')}</p>
                </div>
            ))}
        </div>
    );
}
