import axios from "axios";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import ConstructorStandings from "@/components/ConstructorStandings";

export async function generateStaticParams() {
  const season: any = await axios.get("https://ergast.com/api/f1/seasons.json?limit=74");
  const seasons = season.data.MRData.SeasonTable.Seasons;

  return seasons.map((season: any) => ({
    year: season.season
  }))
}

async function getConstructorStandings(year: string) {
  const response = await axios.get(`https://ergast.com/api/f1/${year}/constructorStandings.json?limit=100`);

  const driverStandings = response.data.MRData.StandingsTable.StandingsLists;

  return driverStandings;
}

export default async function Constructors({ params }: { params: { year: string } }) {

  const constructorStandings = await getConstructorStandings(params.year);

  if (constructorStandings === null) {
    return <LoadingIndicator title="Constructor Standings are loading..." />;
  }

  return (
    <ConstructorStandings constructorStandings={constructorStandings[0]} season={params.year} />
  )
  
}
