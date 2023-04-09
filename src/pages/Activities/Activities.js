
// import { useState } from "react";

export default function ActivitiesPage() {

    return (
        <h2>This is the activity page</h2>
    )
}

// export default function ActivitiesPage() {
//     const [addedActivities, setAddedActivities] = useState([]);

//     function handleAddActivity(activity) {
//         setAddedActivities([...addedActivities, activity]);
//     }

//     return (
//         <div>
//             <h2>Activities</h2>
//             <div className="activities-list">
//                 {activities.map((activity) => (
//                     <Activity
//                         key={activity.name}
//                         activity={activity}
//                         onAdd={handleAddActivity}
//                     />
//                 ))}
//             </div>
//             <h1>My List</h1>
//             <div className="added-activities-list">
//                 {addedActivities.map((activity) => (
//                     <div key={activity.name}>
//                         <h2>{activity.name}</h2>
//                         <img src={activity.image} alt={activity.name} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }






