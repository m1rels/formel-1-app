import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Constructor() {
    const [constructorStandings, setConstructorStandings] = useState(null);
    const {constructorId} = useParams();

  useEffect(() => {
    const loadConstructor = async () => {
        const options = {};
        if (localStorage.getItem("constructors/") === null) {

          const url = `http://ergast.com/api/f1/constructors/${constructorId}.json`;
          const response = await fetch(url, options);
          const constructor = await response.json();
          const result = constructor.MRData.ConstructorTable.Constructors;
          setConstructorStandings(result[0]);
          localStorage.setItem("construtors/" + constructorId, JSON.stringify(result[0]));
          return;

        } else {

          const saved = localStorage.getItem("constructors/" + constructorId)
          if (saved) {
            const initialValue = JSON.parse(saved);
            setConstructorStandings(initialValue);
          }

          return;

        }

      };
    loadConstructor();
   
  }, []);

  if (!constructorStandings) {
    return <LoadingIndicator />;
  }

    return(
      <React.Fragment>
        <h2>{(constructorStandings as any).name}</h2>
        <ul className="nav">
          <li className="nav-item">
            Nationality: {(constructorStandings as any).nationality}
          </li>
          <li className="nav-item">
            More Information: <a href={(constructorStandings as any).url}>Wikipedia</a>
          </li>
        </ul>
      </React.Fragment>
    );
}