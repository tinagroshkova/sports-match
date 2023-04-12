import React, { useState, useEffect } from 'react';
import userManager from '../../services/UserManager';
import ActivityComponent from '../../components/Activity/Activity';
import "./Profile.scss";

function ProfilePage() {
  const [user, setUser] = useState(userManager.getLoggedInUser());
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.image);

  useEffect(() => {
    setUser(userManager.getLoggedInUser());
  }, []);

  const handleRemoveActivity = (activity) => {
    const newUser = userManager.getLoggedInUser();
    newUser.removeActivity(activity);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
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
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }, [user]);

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
          {isEditing ? (
            <input type="text" name="username" value={user.username} onChange={handleEdit} />
          ) : (
            user.username
          )}
        </h2>
        <div className="userInfo">
          <p>
            Age:{' '}
            {isEditing ? (
              <input type="number" name="age" value={user.age} onChange={handleEdit} />
            ) : (
              user.age
            )}
          </p>
          <p>
            City:{' '}
            {isEditing ? (
              <input type="text" name="city" value={user.city} onChange={handleEdit} />
            ) : (
              user.city
            )}
          </p>
          <p>
            Gender:{' '}
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
        <h3>My Activities:</h3>
        {user && user.activities && user.activities.length > 0 ? (
          <div className="activitiesList">
            {user.activities.map((activity) => (
              <div key={activity.name}>
                <ActivityComponent activity={activity} onRemove={() => handleRemoveActivity(activity)} className="smallActivity"/>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't added any activities yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
// import React, { useState, useEffect } from 'react';
// import userManager from '../../services/UserManager';
// import ActivityComponent from '../../components/Activity/Activity';
// import { User } from '../../services/UserManager';
// import "./Profile.scss";

// function ProfilePage() {
//   const [user, setUser] = useState(userManager.getLoggedInUser());
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     setUser(userManager.getLoggedInUser());
//   }, []);

//   const handleRemoveActivity = (activity) => {
//     const newUser = userManager.getLoggedInUser();
//     newUser.removeActivity(activity);
//     localStorage.setItem('loggedInUser', JSON.stringify(newUser));
//     setUser(newUser);
//   };

//   const handleEdit = (event) => {
//     setUser({ ...user, [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value });
//   };

//   const handleSave = () => {
//     userManager.setLoggedInUser(user);
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     localStorage.setItem('loggedInUser', JSON.stringify(user));
//   }, [user]);

//   return (
//     <div className="profilePageContainer">
//       <div className="profileInfo">
//         <div className="profileImage">
//           <img src={`data:image/png;base64,${user.image}`} alt={user.username} />
//           {isEditing && (
//             <input type="file" name="image" onChange={handleEdit} accept="image/*" />
//           )}
//         </div>
//         <h2>
//           {isEditing ? (
//             <input type="text" name="username" value={user.username} onChange={handleEdit} />
//           ) : (
//             user.username
//           )}
//         </h2>
//         <div className="userInfo">
//           <p>
//             Age:{' '}
//             {isEditing ? (
//               <input type="number" name="age" value={user.age} onChange={handleEdit} />
//             ) : (
//               user.age
//             )}
//           </p>
//           <p>
//             City:{' '}
//             {isEditing ? (
//               <input type="text" name="city" value={user.city} onChange={handleEdit} />
//             ) : (
//               user.city
//             )}
//           </p>
//           <p>
//             Gender:{' '}
//             {isEditing ? (
//               <select name="gender" value={user.gender} onChange={handleEdit}>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             ) : (
//               user.gender
//             )}
//           </p>
//         </div>
//         {isEditing ? (
//           <button onClick={handleSave}>Save</button>
//         ) : (
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//         )}
//       </div>

//       <div className="activitiesList">
//         <h3>My Activities:</h3>
//         {user && user.activities && user.activities.length > 0 ? (
//           <div>
//             {user.activities.map((activity) => (
//               <div key={activity.name}>
//                 <ActivityComponent activity={activity} onRemove={() => handleRemoveActivity(activity)} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>You haven't added any activities yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;