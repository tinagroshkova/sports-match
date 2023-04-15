import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userManager from "../../services/UserManager";
import activitiesData from "./activitiesData";
import { Activity } from "./activitiesData";
import "./Activities.scss";

import { ActivityComponent } from '../../components/Activity/Activity';

const activities = activitiesData.map(activity => new Activity(activity.name, activity.image));

export default function ActivitiesPage() {
    const [addedActivities, setAddedActivities] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    function handleSearchInputChange(event) {
        setSearchInput(event.target.value);
    }

    activities.sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        const user = userManager.getLoggedInUser();
        setAddedActivities(user ? user.activities || [] : []);
    }, []);

    function handleAddActivity(activity) {
        const user = userManager.getLoggedInUser();
        if (!user) {
            alert("You have to log in first!");
            navigate('/login');
            return;
        }
        if (user.hasActivity(activity)) {
            user.removeActivity(activity);
            user.saveUserData();
            // userManager.setLoggedInUser(user);
            setAddedActivities(prevActivities =>
                prevActivities.filter(a => a.name !== activity.name)
            );
        } else {
            user.addActivity(activity);
            console.log(user);
            user.saveUserData();
            // userManager.setLoggedInUser(user);
            setAddedActivities(prevActivities => [...prevActivities, activity]);
        }
    }

    return (
        <div className="activitiesPageContainer">
            <div className="titleWrapper">
                <h2 className="siteNameTitle">ADD favorite sports to your profile so that other people can find YOU</h2>
            </div>
            <div className="searchContainer">
                <label htmlFor="activitySearch"></label>
                <input
                    id="activitySearch"
                    type="text"
                    value={searchInput}
                    placeholder="Search for sport"
                    onChange={handleSearchInputChange}
                />
            </div>

            <div className="activitiesContainer">
                {activities
                    .filter((activity) =>
                        activity.name.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .map((activity) => (
                        <ActivityComponent
                            className="activity"
                            key={activity.name}
                            activity={activity}
                            onAdd={handleAddActivity}
                            added={addedActivities.some((a) => a.name === activity.name)}
                        />
                    ))}
            </div>
        </div>
    );
}
