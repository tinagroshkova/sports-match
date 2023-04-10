import HomeCard from "../../components/HomeCard/HomeCard";
import React from "react";

import myProfile from "../../images/homePageProfile.png";
import activities from "../../images/homePageActivities.png";
import buddySearch from "../../images/photo.jpg";
import messages from "../../images/homePageChat.png";
import places from "../../images/homePagePlaces.png";
import requests from "../../images/homePageRequests.png";

import NavBar from "../../components/NavBar/NavBar";

export default function HomePage() {

    const navElements = [
        {
            image: myProfile,
            description: "My profile",
            to: "/profile"
        },
        {
            image: activities,
            description: "Activities",
            to: "/activities"
        },
        {
            image: buddySearch,
            description: "Buddy search",
            to: "/buddySearch"
        },
        {
            image: messages,
            description: "Messages",
            to: "/messages"
        },
        {
            image: places,
            description: "Places",
            to: "/places"
        },
        {
            image: requests,
            description: "Requests",
            to: "/requests"
        }
    ]

    return (
        <div>

            <h2>Welcome to Sport Match</h2>
            <h2>Choose an activity, meet new people, have fun doing it together</h2>

            <div className="homePageContainerWrapper">
                {navElements.map(data => (
                    <HomeCard
                        key={data.description}
                        image={data.image}
                        description={data.description}
                        to={data.to}
                    />
                ))}

            </div>
        </div>

    )
}

