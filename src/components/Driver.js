import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Driver() {
  const { driverId } = useParams();
  const [driverStandings, setDriverStandings] = useState(null);

  useEffect(() => {
    const loadDriver = async () => {
        const options = {};


        if (localStorage.getItem("driverStandings") === null) {

          const url = `http://ergast.com/api/f1/drivers/${driverId}.json`;
          const response = await fetch(url, options);
          const driver = await response.json();
          const result = driver.MRData.DriverTable.Drivers;
          setDriverStandings(result[0]);
          localStorage.setItem("driverStandings- " + driverId, JSON.stringify(result[0]));
          return;

        } else {

          const saved = localStorage.getItem("driverStandings- " + driverId);
          const initialValue = JSON.parse(saved);
          return setDriverStandings(initialValue) || "";

        }

  
      };
    loadDriver();
    

  }, []);

  if (!driverStandings) {
    return <LoadingIndicator />;
  }

    return(
      <React.Fragment>
        <h2>{driverStandings.givenName + " " + driverStandings.familyName}</h2>
        <ul className="nav">
          <li className="nav-item">
            Birth of Date: {driverStandings.dateOfBirth}
          </li>
          <li className="nav-item">
            Nationality: {driverStandings.nationality}
          </li>
          <li className="nav-item">
            More Information:<a href={driverStandings.url}>Wikipedia</a>
          </li>
        </ul>
      </React.Fragment>
    );
}