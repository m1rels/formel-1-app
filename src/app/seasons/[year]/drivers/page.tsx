import React from "react";
import axios from "axios";
import LoadingIndicator from "@/components/LoadingIndicator";
import DriversStandingsData from "@/components/DriverStandings";

export async function generateStaticParams() {
  const season: any = await axios.get("https://ergast.com/api/f1/seasons.json?limit=74");
  const seasons = season.data.MRData.SeasonTable.Seasons;

  return seasons.map((season: any) => ({
    year: season.season
  }))
}

async function getDriverStandings(year: string) {
  const response = await axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json?limit=120`);

  const driverStandings = response.data.MRData.StandingsTable.StandingsLists;

  return driverStandings;
}

export default async function DriverStandings({ params }: { params: { year: string } }) {

  const driver = await getDriverStandings(params.year);
  
  if (driver === null) {
    return <LoadingIndicator title="Driver Standings are loading..." />;
  }

  return (
    <DriversStandingsData driver={driver[0]} season={params.year}  />
  );
}
