import "./HomeCard.scss";
import React from "react";
import { Link } from "react-router-dom";


export default function HomeCard({image, description, to}) {
   
    return (
        
        <div className="homePageContainer">
            <img src={image} alt={1} />
            <Link to={to}> <h2>{description}</h2></Link>
        </div>
    )
}



