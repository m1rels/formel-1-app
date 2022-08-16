import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";


export default function RacesList() {
    const { year } = useParams();
    const [allRaces, setAllRaces] = useState(null)

    useEffect(() => {
        const loadRaces = async () => {
            const options = {};
            if (localStorage.getItem("allRaces") === null) {
              const url = `http://ergast.com/api/f1/${year}.json`;
              const response = await fetch(url, options);
              const races = await response.json();
              const result = races.MRData.RaceTable.Races;
              setAllRaces(result);
              localStorage.setItem("allRaces - " + year, JSON.stringify(result));
              return;
            } else {
              const saved = localStorage.getItem("allRaces - " + year);
              const initialValue = JSON.parse(saved);
              return setAllRaces(initialValue);
            }
           
          };
        loadRaces();

      }, []);

  
      if (!allRaces) {
        return <LoadingIndicator />;
      }

      const raceDetails = [];
      allRaces.forEach((race) => {
        raceDetails.push(
        <tr key={race.round}><td className="text-normal column col-1 text-center">{race.round}</td>
                <td className="text-normal column col-1"><a href={race.url}>{race.raceName}</a></td>
                <td className="text-normal column col-1 text-center">{race.date}</td>
                <td className="text-normal column col-1"><Link to={`/circuits/${race.Circuit.circuitId}`}>{race.Circuit.circuitName}</Link></td>
                </tr>
                );
      });
 

      return (
            <React.Fragment>
              <h2>Race Schedule of {year}</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-normal column col-1 text-center">Round</th>
                    <th className="text-normal column col-5">Race Name</th>
                    <th className="text-normal column col-2 text-center">Date</th>
                    <th className="text-normal column col-2">Circuit</th>
                    </tr>
                </thead>
                <tbody>
                    {raceDetails}
                </tbody>
              </table>
            </React.Fragment>
      );
    }
