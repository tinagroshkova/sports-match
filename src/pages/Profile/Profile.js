import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChild, faMapMarkerAlt, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import userManager from "../../services/UserManager";
import { ActivityComponentCircle } from "../../components/Activity/Activity";
import "./Profile.scss";
import profileImage from "../../images/user.png";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      window.location.replace("/login")
      return;
    }
    setUser(loggedInUser);
  }, []);

  const handleEdit = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSave = () => {
    if (!user.username) {
      setError("Username cannot be empty");
      return;
    }
    setIsEditing(false);
    if (imageFile) {
      // code to upload image file
    }
    userManager.setLoggedInUser(user);
  };

  const handleRemoveActivity = (activity) => {
    userManager.removeActivity(activity);
    setUser(prevUser => {
      const newActivities = prevUser.activities.filter(a => a.name !== activity.name);
      return { ...prevUser, activities: newActivities };
    });
  };

  return (
    <div className="profilePageContainer">
      <div className="profileInfo">
        <div className="profileImage">
          <img src={profileImage} alt={user.username} />
          {isEditing && (
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
          )}
        </div>
        <div className="userInfo">
          <h2>
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />{' '}
              {isEditing ? (
                <input type="text" name="username" value={user.username} onChange={handleEdit} placeholder="Edit your username" />
              ) : (
                user.username
              )}
            </span>
          </h2>
          <span className="icon">
            <FontAwesomeIcon icon={faChild} /> {' '}
            {isEditing ? (
              <input type="number" name="age" value={user.age || ''} onChange={handleEdit} placeholder="Edit your age" />
            ) : (
              typeof user.age === 'number' ? user.age : ''
            )}
          </span>
          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {' '}
            </span>
            {isEditing ? (
              <input type="text" name="city" value={user.city} onChange={handleEdit} placeholder="Edit your location" />
            ) : (
              user.city
            )}
          </p>
          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faVenusMars} /> {' '}
            </span>
            {isEditing ? (
              <select name="gender" value={user.gender} onChange={handleEdit}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              user.gender
            )}
          </p>
        </div>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
      <div>
        <h3>{user.username}'s activities:</h3>
        {user && user.activities && user.activities.length > 0 ? (
          <div className="activitiesList">
            {user.activities.map((activity) => (
              <div key={activity.name}>
                <ActivityComponentCircle activity={activity} onRemove={() => handleRemoveActivity(activity)} className="smallActivity" />
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't added any activities yet.</p>
        )}
      </div>
    </div >
  );
}
