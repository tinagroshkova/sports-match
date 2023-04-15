import React, { useState, useEffect } from 'react';
import userManager from '../../services/UserManager';
import { ActivityComponentCircle } from '../../components/Activity/Activity';
import "./Profile.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChild, faMapMarkerAlt, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(userManager.getLoggedInUser());
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.image);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(userManager.getLoggedInUser());
    if (!user) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
  }, []);

  const handleRemoveActivity = (activity) => {
    const newUser = userManager.getLoggedInUser();
    newUser.removeActivity(activity);
    sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleEdit = (event) => {
    setUser({ ...user, [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value });
  };

  const handleSave = () => {
    userManager.setLoggedInUser(user);
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setUser({ ...user, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const loggedInUser = userManager.getLoggedInUser();
    if (!loggedInUser) {
      alert("You have to log in first!");
      navigate('/login');
      return;
    }
    setUser(loggedInUser);
  }, []);


  return (
    <div className="profilePageContainer">
      <div className="profileInfo">
        <div className="profileImage">
          <img src={profileImage} alt={user.username} />
          {isEditing && (
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
          )}
        </div>
        <h2>
          <span className="icon">
            <FontAwesomeIcon icon={faUser} />{' '}
            {isEditing ? (
              <input type="text" name="username" value={user.username} onChange={handleEdit} />
            ) : (
              user.username
            )}
          </span>
        </h2>
        <div className="userInfo">
          <span className="icon">
            <FontAwesomeIcon icon={faChild} /> {' '}
            {isEditing ? (
              <input type="number" name="age" value={user.age} onChange={handleEdit} />
            ) : (
              user.age
            )}
          </span>
          <p>
            <span className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {' '}
            </span>
            {isEditing ? (
              <input type="text" name="city" value={user.city} onChange={handleEdit} />
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

export default ProfilePage;