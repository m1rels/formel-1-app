import React from "react";
import {Link} from "react-router-dom";

export default function SeasonsTable(props) {
    const seasonsDetails = props.seasons.MRData.SeasonTable.Seasons;
    const seasons = [];

    seasonsDetails.forEach((saison) => {
        seasons.push(
            <li className="nav-item">
                <Link to="/seasons">{saison.season}</Link>
            </li>
        )
    });
    
    return(
        <ul className="nav">
                {seasons}
        </ul>
        )
        
}