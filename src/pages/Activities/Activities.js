import Activity from "../../components/Activity/Activity"
import { useState, useEffect } from "react";
import UserManager from "../../services/UserManager";

import tennis from "../../images/activitiesPage/tennis.png";
import tableTennis from "../../images/activitiesPage/tableTennis.png";
import football from "../../images/activitiesPage/football.png";
import badminton from "../../images/activitiesPage/badminton.png";
import squash from "../../images/activitiesPage/squash.png";
import running from "../../images/activitiesPage/running.png";
import basketball from "../../images/activitiesPage/basketball.png";
import volleyball from "../../images/activitiesPage/volleyball.png";
import ski from "../../images/activitiesPage/ski.png";
import snowboard from "../../images/activitiesPage/snowboard.png";
import iceSkating from "../../images/activitiesPage/iceSkating.png";
import padel from "../../images/activitiesPage/padel.png";
import wallClimbing from "../../images/activitiesPage/wallClimbing.png";
import darts from "../../images/activitiesPage/darts.png";
import paintball from "../../images/activitiesPage/paintball.png";
import billiards from "../../images/activitiesPage/billiards.png";
import bowling from "../../images/activitiesPage/bowling.png";
import karting from "../../images/activitiesPage/karting.png";


export default function ActivitiesPage() {
    const [addedActivities, setAddedActivities] = useState([]);
    const activities = [
        {
            name: "Tennis",
            image: tennis,
        },
        {
            name: "Table tennis",
            image: tableTennis,
        },
        {
            name: "Badminton",
            image: badminton,
        },
        {
            name: "Football",
            image: football,
        },
        {
            name: "Squash",
            image: squash,
        },
        {
            name: "Running",
            image: running,
        },
        {
            name: "Basketball",
            image: basketball,
        },
        {
            name: "Volleyball",
            image: volleyball,
        },
        {
            name: "Ski",
            image: ski,
        },
        {
            name: "Snowboard",
            image: snowboard,
        },
        {
            name: "Ice skating",
            image: iceSkating,
        },
        {
            name: "Padel",
            image: padel,
        },
        {
            name: "Wall climbing",
            image: wallClimbing,
        },
        {
            name: "Darts",
            image: darts,
        },
        {
            name: "Paintball",
            image: paintball,
        },
        {
            name: "Billiards",
            image: billiards,
        },
        {
            name: "Bowling",
            image: bowling,
        },
        {
            name: "Karting",
            image: karting,
        },
    ];
    activities.sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        const user = UserManager.getLoggedInUser();
        setAddedActivities(user.activities || []);
    }, []);

    function handleAddActivity(activity) {
        if (addedActivities.some(a => a.name === activity.name)) {
            return;
        }
        const user = UserManager.getLoggedInUser();
        user.addActivity(activity);
        console.log(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setAddedActivities([...addedActivities, activity]);
    }

    return (
        <div>
            <h2 className="siteNameTitle">Activities</h2>
            <h2 className="siteSloganTitle">Add favorite sports to your profile so that other people can find you</h2>

            <div className="activitiesContainer">
                {activities.map(activity => (
                    <Activity key={activity.name} activity={activity} onAdd={handleAddActivity} />
                ))}
            </div>
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
