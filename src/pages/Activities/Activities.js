import Activity from "../../components/Activity/Activity"
import { useState } from "react";

import tennis from "../../images/activitiesPage/tennis.png";
import tableTennis  from "../../images/activitiesPage/tableTennis.png";
import football from "../../images/activitiesPage/football.png";
import badminton from "../../images/activitiesPage/badminton.png";
import squash from "../../images/activitiesPage/squash.png";
import running from "../../images/activitiesPage/running.png";
import basketball from "../../images/activitiesPage/basketball.png";
import volleyball from "../../images/activitiesPage/volleyball.png";
import ski from "../../images/activitiesPage/ski.png";
import snowboard from "../../images/activitiesPage/snowboard.png";
import iceSkating from "../../images/activitiesPage/iceSkating.png";



export default function ActivitiesPage() {
    const [addedActivities, setAddedActivities] = useState([]);
    const activities = [
        {
            name: "Tennis",
            image: tennis,
            added: false
        },
        {
            name: "Table tennis",
            image: tableTennis,
            added: false
        },
        {
            name: "Badminton",
            image: badminton,
            added: false
        },
        {
            name: "Football",
            image: football,
            added: false
        },
        {
            name: "Squash",
            image: squash,
            added: false
        },
        {
            name: "Running",
            image: running,
            added: false
        },
        {
            name: "Basketball",
            image: basketball,
            added: false
        },
        {
            name: "Volleyball",
            image: volleyball,
            added: false
        },
        {
            name: "Ski",
            image: ski,
            added: false
        },
        {
            name: "Snowboard",
            image: snowboard,
            added: false
        },
        {
            name: "Ice skating",
            image: iceSkating,
            added: false
        },
    ];

    function handleAddActivity(activity) {
        // Implement the logic to add the activity to a list
        setAddedActivities([...addedActivities, activity]);
    }

    return (
        <div className="activitiesContainer">
            {activities.map(activity => (
                <Activity key={activity.name} activity={activity} onAdd={handleAddActivity} />
            ))}
        </div>
    );
}
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











