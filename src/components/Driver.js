import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Driver() {
  const { driverId } = useParams();
    const [driverStandings, setDriverStandings] = useState(null);

  useEffect(() => {
    const loadDriver = async () => {
        const options = {};
        const url = `http://ergast.com/api/f1/drivers/${driverId}.json`;
        const response = await fetch(url, options);
        const driver = await response.json();
        console.log(driver);
        const result = driver.MRData.DriverTable.Drivers;
        console.log("driver", result);

        if (result.length) {
            setDriverStandings(result[0]);
            return;
        }

        setDriverStandings([])
      };
    loadDriver();
  }, []);

  if (!driverStandings) {
    return <LoadingIndicator />;
  }

    return(
      <ul className="nav">
      <li className="nav-item active">
        <a href="#">{driverStandings.givenName + " " + driverStandings.familyName}</a>
        <ul className="nav">
          <li className="nav-item">
            Birth of Date: {driverStandings.dateOfBirth}
          </li>
          <li className="nav-item">
            Nationality: {driverStandings.nationality}
          </li>
          <li className="nav-item">
            More Information: <a href={driverStandings.url}>Wikipedia</a>
          </li>
        </ul>
      </li>
    </ul>
    );
}