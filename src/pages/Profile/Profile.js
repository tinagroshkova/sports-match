import React, { useState, useEffect } from "react";
import userManager from "../../services/UserManager";
import { ActivityComponentCircle } from "../../components/Activity/Activity";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import userImage from "../../images/user.png";
import "../../sweetalert2-custom.scss";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import LoginModal from "../../components/Modals/LoginModal";

export default function ProfilePage() {
  const [user, setUser] = useState(userManager.getLoggedInUser());
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(userImage);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (!loggedInUser) {
        const isLoggedIn = await LoginModal();
        if (!isLoggedIn) {
          navigate('/home', { state: { from: '/profile' } });
          return; // User clicked "No", do not navigate
        }
        navigate('/login', { state: { from: '/profile' } });
      }
      const userImage = loggedInUser.image || profileImage; // check if the user has an image and use it, otherwise use the default image
      setProfileImage(userImage); // set the profile image to the retrieved image data
      setUser({ ...loggedInUser });
    };
    checkLoggedInUser();
  }, []);

  const loggedInUser = userManager.getLoggedInUser();
  if (!loggedInUser) {
    return;
  }
  const handleRemoveActivity = async (activity) => {
    const shouldRemove = await ConfirmModal(
      'Do you really want to remove this activity?',
      'This action cannot be undone.'
    );

    if (shouldRemove) {
      const newUser = userManager.getLoggedInUser();
      userManager.removeActivity(activity);
      const updatedUser = { ...newUser };
      updatedUser.activities = updatedUser.activities.filter((a) => a !== activity); // remove the activity from the updated user object
      setUser(updatedUser);
    }
  };

  const handleEdit = (event) => {
    setUser({
      ...user,
      [event.target.name]:
        event.target.type === "number"
          ? parseInt(event.target.value)
          : event.target.value.trim(),
    });
    if (event.target.name === "gender") {
      setUser({ ...user, gender: event.target.value });
    }
  };

  const handleSave = () => {
    if (user.username.trim() === "" || user.username.trim().length < 3) {
      alert("Username should have at least three characters");
      return;
    }
    if (user.age < 0) {
      setUser({ ...user, age: 0 });
    }
    userManager.setLoggedInUser(user);
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      const loggedInUser = userManager.getLoggedInUser();
      if (loggedInUser) {
        loggedInUser.image = reader.result;
        userManager.saveUserData(); // save the updated user data to localStorage
      }
      setUser({ ...loggedInUser });
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfileImage(userImage);
      const loggedInUser = userManager.getLoggedInUser();
      if (loggedInUser) {
        loggedInUser.image = "";
        userManager.saveUserData(); // save the updated user data to localStorage
      }
      setUser({ ...loggedInUser });
    }
  };

  return (
    <div className="profilePageContainer">
      <div className="profileInfo">
        <div className="profileImage">
          <img src={user && user.profilePic ? user.profilePic : profileImage} alt={user && user.username ? user.username : ''} />
          {isEditing && (
            <span className="changePicture">
              <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
            </span>
          )}
        </div>
        <div className="userInfo">
          <h2>
            <span className="icon">
              <ion-icon name="accessibility-outline"></ion-icon>{' '}
              {user.username}
            </span>
          </h2>
          <p>
            <span className="icon">
              <ion-icon name="calendar-outline"></ion-icon>{' '}
              {isEditing ? (
                <input style={{ position: "relative", left: "5px" }} type="number" name="age" value={user.age || ''} onChange={handleEdit} placeholder="Edit your age" />
              ) : (
                typeof user.age === 'number' ? user.age : ''
              )}
            </span>
          </p>
          <p>
            <span className="icon">
              <ion-icon name="location-outline"></ion-icon> {' '}
            </span>
            {isEditing ? (
              <input type="text" name="city" value={user.city} onChange={handleEdit} placeholder="Edit your location" />
            ) : (
              user.city
            )}
          </p>
          <p>
            <span className="icon">
              <ion-icon name="transgender-outline"></ion-icon>{' '}
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
          <p>No activities added yet</p>
        )}
      </div>
    </div >
  );
}
