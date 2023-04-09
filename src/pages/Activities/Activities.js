import Activity from "../../components/Activity/Activity"
import { useState } from "react";

import tennis from "../../images/tennis.png";
import tableTennis  from "../../images/tableTennis.png";
import football from "../../images/football.png";

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
            image: "https://example.com/badminton.jpg",
            added: false
        },
        {
            name: "Football",
            image: football,
            added: false
        },
        // Add the rest of the activities here
    ];

    function handleAddActivity(activity) {
        // Implement the logic to add the activity to a list
        setAddedActivities([...addedActivities, activity]);
    }

    return (
        <div>
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











