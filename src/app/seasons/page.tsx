import axios from "axios";
import LoadingIndicator from "@/components/LoadingIndicator";
import SeasonsData from "@/components/Seasons";

async function getSeasons() {
  const response = await axios.get("https://ergast.com/api/f1/seasons.json?limit=74");

  const seasons = response.data.MRData.SeasonTable.Seasons;

  return seasons;
}

export default async function Seasons() {

  const seasons = await getSeasons();

  if (seasons === null) {
    return <LoadingIndicator title="Seasons are loading..." />;
  }

  return (
    <SeasonsData season={seasons} />
  );

  
}
