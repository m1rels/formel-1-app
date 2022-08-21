import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Driver() {
  const { driverId } = useParams();
  const [driverStandings, setDriverStandings] = useState(null);

  useEffect(() => {
    const loadDriver = async () => {
        const options = {};

        if (localStorage.getItem("drivers/" + driverId) === null) {

          const url = `http://localhost:8081/drivers/${driverId}`;
          const response = await fetch(url, options);
          const driver = await response.json();
          setDriverStandings(driver);
          console.log(driver)
          localStorage.setItem("drivers/" + driverId, JSON.stringify(driver));
          return;

        } else {

          const saved = localStorage.getItem("drivers/" + driverId);
          if (saved) {
            const initialValue = JSON.parse(saved);
            setDriverStandings(initialValue);
          }

        }

  
      };
    loadDriver();
    

  }, []);

  if (!driverStandings) {
    return <LoadingIndicator />;
  }

    return(
      <React.Fragment>
        <h2>{(driverStandings[0] as any).givenName + " " + (driverStandings[0] as any).familyName}</h2>
        <ul className="nav">
          <li className="nav-item">
            Birth of Date: {(driverStandings[0] as any).dateOfBirth}
          </li>
          <li className="nav-item">
            Nationality: {(driverStandings[0] as any).nationality}
          </li>
          <li className="nav-item">
            More Information:<a href={(driverStandings[0] as any).url}>Wikipedia</a>
          </li>
        </ul>
      </React.Fragment>
    );
}