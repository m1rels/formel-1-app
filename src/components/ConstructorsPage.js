import React from "react";
import ConstructorsTable from "./ConstructorsTable";
import LoadingIndicator from "./LoadingIndicator";

export default function ConstructorsPage() {
  const [allConstructors, setAllConstructors] = React.useState(null);

  const loadConstructors = async () => {
    const options = {};

    const url = `http://ergast.com/api/f1/constructorStandings.json`;

    const response = await fetch(url, options);

    const constructors = await response.json();
    setAllConstructors(constructors);
    return;
  };

  React.useEffect(() => {
    loadConstructors();
  }, []);

  if (!allConstructors) {
    return <LoadingIndicator />;
  }

  return <ConstructorsTable constructors={allConstructors} />;
}
