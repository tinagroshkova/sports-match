import ActivityComponent from "../../components/Activity/Activity";
import { useState, useEffect } from "react";
import userManager from "../../services/UserManager";
import activitiesData from "./activitiesData";
import { Activity } from "./activitiesData";

const activities = activitiesData.map(activity => new Activity(activity.name, activity.image));

export default function ActivitiesPage() {
    const [addedActivities, setAddedActivities] = useState([]);

    activities.sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        const user = userManager.getLoggedInUser();
        setAddedActivities(user.activities || []);
    }, []);

    function handleAddActivity(activity) {
        const user = userManager.getLoggedInUser();
        if (user.hasActivity(activity)) {
            user.removeActivity(activity);
            console.log(user);

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem("users", JSON.stringify(userManager.users));

            setAddedActivities(prevActivities =>
                prevActivities.filter(a => a.name !== activity.name)
            );
        } else {
            user.addActivity(activity);
            console.log(user);
            
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem("users", JSON.stringify(userManager.users));
            setAddedActivities(prevActivities => [...prevActivities, activity]);
        }
    }

    return (
        <div>
            <h2 className="siteNameTitle">Add favorite sports to your profile so that other people can find you</h2>

            <div className="activitiesContainer">
                {activities.map(activity => (
                    <ActivityComponent
                    key={activity.name}
                    activity={activity}
                    onAdd={handleAddActivity}
                    added={addedActivities.some(a => a.name === activity.name)}
                  />
                ))}
            </div>
        </div>
    );
}