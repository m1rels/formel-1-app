import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { Race, Root } from "../interfaces/Races";
import LoadingIndicator from "./LoadingIndicator";


export default function RacesList() {
    const { year } = useParams();
    const [allRaces, setAllRaces] = useState<Race[] | undefined>(undefined)

    useEffect(() => {
        const loadRaces = async () => {
            const options = {};
            if (localStorage.getItem("races/" + year) === null) {
              const url = `http://localhost:8081/seasons/${year}/races`;
              const response = await fetch(url, options);
              const races = await response.json();
              console.log(races)
              setAllRaces(races);
              localStorage.setItem("races/" + year, JSON.stringify(races));
              return;
            } else {
              const saved = localStorage.getItem("races/" + year);
              if (saved) {
                const initialValue = JSON.parse(saved);
                setAllRaces(initialValue);
              }
            }
           
          };
        loadRaces();

      }, []);

  
      if (!allRaces) {
        return <LoadingIndicator />;
      }

      const raceDetails: JSX.Element[] = [];

      allRaces.forEach((race: any): void => {
        raceDetails.push(
        <tr key={race.round}><td className="text-normal column col-1 text-center">{race.round}</td>
                <td className="text-normal column col-1"><a href={race.url}>{race.raceName}</a></td>
                <td className="text-normal column col-1 text-center">{race.date}</td>
                <td className="text-normal column col-1"><Link to={`/circuits/${race.circuitId}`}>{race.circuitName}</Link></td>
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
