import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import {Link} from "react-router-dom";

export default function Constructors() {
    const { year } = useParams();
    const [allConstructors, setAllConstructors] = useState(null);

    useEffect(() => {
        const loadConstructors = async () => {
            const options = {};
            if(localStorage.getItem("allConstructors") === null) {

              const url = `http://ergast.com/api/f1/${year}/constructorStandings.json`;
              const response = await fetch(url, options);
              const constructors = await response.json();
              const result = constructors.MRData.StandingsTable.StandingsLists;
              setAllConstructors(result[0].ConstructorStandings);
              localStorage.setItem("constructors/" + year, JSON.stringify(result[0].ConstructorStandings));
              return;

            } else {

              const saved = localStorage.getItem("constructors/" + year);
              const initialValue = JSON.parse(saved);
              return setAllConstructors(initialValue);

            }
           
           
          };
        loadConstructors();

      }, []);

      if (!allConstructors) {
        return <LoadingIndicator />;
      }

      const constructors = [];

  allConstructors.forEach((constructor) => {
    constructors.push(
      <tr key={constructor.Constructor.constructorId}>
        <td className="text-center">{constructor.position}</td>
        <td><Link to={`/constructors/${constructor.Constructor.constructorId}`}>{constructor.Constructor.name}</Link></td>
        <td className="text-center">{constructor.points}</td>
        <td className="text-center">{constructor.wins}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
  {
    allConstructors.length ?
    <React.Fragment>
    <h2>Constructors</h2><table className="table">
    <thead>
      <tr>
        <th className="text-normal column col-1 text-center">Rank</th>
        <th className="text-normal column col-5">Driver</th>
        <th className="text-normal column col-2 text-center">Points</th>
        <th className="text-normal column col-2 text-center">Wins</th>
      </tr>
    </thead>
    <tbody>{constructors}</tbody>
  </table></React.Fragment> : 'Data is not loading...'
  }
  </React.Fragment>
  );
}