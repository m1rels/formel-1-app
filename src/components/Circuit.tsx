import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";


export default function Circuit() {
    const { circuitId } = useParams();
    const [circuitStandings, setCircuitStandings] = useState([]);

  useEffect(() => {
    const loadCircuit = async () => {
        const options = {};

        if (localStorage.getItem("circuits/" + circuitId) === null) {

          const url = `http://localhost:8081/circuits/${circuitId}`;
          const response = await fetch(url, options);
          const circuit = await response.json();
          setCircuitStandings(circuit[0]);
          localStorage.setItem("circuits/" + circuitId, JSON.stringify(circuit));
          return;

        } else {

            const saved = localStorage.getItem("circuits/" + circuitId);
            if (saved) {
              const initialValue = JSON.parse(saved);
              setCircuitStandings(initialValue[0]);
            }
        
            return;

        }
        
      };

    loadCircuit();

  }, []);

  if (!circuitStandings) {
    return <LoadingIndicator />;
  }

  console.log(circuitStandings)

  return (
    <React.Fragment>
      <h2>{(circuitStandings as any).circuitName}</h2>
        <ul className="nav">
          <li className="nav-item">
            Country: {(circuitStandings as any).country}
          </li>
          <li className="nav-item">
            Locality: {(circuitStandings as any).locality}
          </li>
          <li className="nav-item">
            More Information:<a href={(circuitStandings as any).url}>Wikipedia</a>
          </li>
        </ul>
    </React.Fragment>
  )

  

}