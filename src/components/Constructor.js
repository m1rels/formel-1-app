import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Constructor() {
    const [constructorStandings, setConstructorStandings] = useState(null);
    const {constructorId} = useParams();

  useEffect(() => {
    const loadConstructor = async () => {
        const options = {};
        if (localStorage.getItem("constructorStandings") === null) {

          const url = `http://ergast.com/api/f1/constructors/${constructorId}.json`;
          const response = await fetch(url, options);
          const constructor = await response.json();
          const result = constructor.MRData.ConstructorTable.Constructors;
          setConstructorStandings(result[0]);
          localStorage.setItem("construtorStandings - " + constructorId, JSON.stringify(result[0]));
          return;

        } else {

          const saved = localStorage.getItem("constructorStandings - " + constructorId)
          const initialValue = JSON.parse(saved);
          return setConstructorStandings(initialValue);

        }

      };
    loadConstructor();
   
  }, []);

  if (!constructorStandings) {
    return <LoadingIndicator />;
  }

    return(
      <React.Fragment>
        <h2>{constructorStandings.name}</h2>
        <ul className="nav">
          <li className="nav-item">
            Nationality: {constructorStandings.nationality}
          </li>
          <li className="nav-item">
            More Information: <a href={constructorStandings.url}>Wikipedia</a>
          </li>
        </ul>
      </React.Fragment>
    );
}