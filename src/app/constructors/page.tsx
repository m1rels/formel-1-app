import LoadingIndicator from "@/components/LoadingIndicator";
import Constructors from "@/components/Constructors";
import axios from "axios";

async function getConstructors() {
  const response = await axios.get(`https://ergast.com/api/f1/constructors.json?limit=211`);

  const constructors = response.data.MRData.ConstructorTable.Constructors;

  return constructors;
}

export default async function Constructor() {  
const constructors = await getConstructors();

  if (constructors === null) { 
    return <LoadingIndicator title="Season is loading..." />;
  }

  return ( 
    <Constructors constructors={constructors}  />
  );
 
}
