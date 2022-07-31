import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Constructor() {
    const [constructorStandings, setConstructorStandings] = useState(null);
    const {constructorId} = useParams();

  useEffect(() => {
    const loadConstructor = async () => {
        const options = {};
        const url = `http://ergast.com/api/f1/constructors/${constructorId}.json`;
        const response = await fetch(url, options);
        const constructor = await response.json();
        console.log(constructor);
        const result = constructor.MRData.ConstructorTable.Constructors;
        console.log("constructor", result);

        if (result.length) {
            setConstructorStandings(result[0]);
            return;
        }

        setConstructorStandings([])
      };
    loadConstructor();
  }, []);

  if (!constructorStandings) {
    return <LoadingIndicator />;
  }

    return(
      <ul className="nav">
      <li className="nav-item active">
        <a href="#">{constructorStandings.name}</a>
        <ul className="nav">
          <li className="nav-item">
            Nationality: {constructorStandings.nationality}
          </li>
          <li className="nav-item">
            More Information: <a href={constructorStandings.url}>Wikipedia</a>
          </li>
        </ul>
      </li>
    </ul>
    );
}