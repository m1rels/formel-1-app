import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Constructor() {
    const [constructorStandings, setConstructorStandings] = useState(null);
    const {constructorId} = useParams();

  useEffect(() => {
    const loadConstructor = async () => {
        const options = {};
        if (localStorage.getItem("constructors/" + constructorId) === null) {

          const url = `http://localhost:8081/constructors/${constructorId}`;
          const response = await fetch(url, options);
          const constructor = await response.json();
          console.log(constructor)
          setConstructorStandings(constructor);
          localStorage.setItem("constructors/" + constructorId, JSON.stringify(constructor));
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
        <h2>{(constructorStandings[0] as any).name}</h2>
        <ul className="nav">
          <li className="nav-item">
            Nationality: {(constructorStandings[0] as any).nationality}
          </li>
          <li className="nav-item">
            More Information: <a href={(constructorStandings[0] as any).url}>Wikipedia</a>
          </li>
        </ul>
      </React.Fragment>
    );
}