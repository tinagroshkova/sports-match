import React from "react";
import HomeCard from "../../components/HomeCard/HomeCard";
import "./Home.scss"

import myProfile from "../../images/homePage/homePageProfile.png";
import activities from "../../images/homePage/homePageActivities.png";
import buddySearch from "../../images/homePage/photo.jpg";
import messages from "../../images/homePage/homePageChat.png";
import places from "../../images/homePage/homePagePlaces.png";

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
    ]

    return (
        <div className="homeContainer">
            <h2 className="siteNameTitle">SPORTS MATCH</h2>
            <div className="logo">
                {/* <img src={tempLogo}></img> */}
            </div>
            <h2 className="siteSloganTitle">Choose an activity, meet new people, have fun doing it TOGETHER</h2>

            <div className="homeCardContainerWrapper">
                {navElements.map(data => (
                    <HomeCard
                        key={data.description}
                        image={data.image}
                        description={data.description}
                        to={data.to}
                        className="linkIcon"
                    />
                ))}
            </div>
        </div>
    )
}

