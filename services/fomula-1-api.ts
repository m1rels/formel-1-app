import axios from "axios";
import { addToDatabase } from "../src/utils/database";
import { cursorTo } from "readline";

export async function fetchSeasonsData() {
    const apiUrl = "https://ergast.com/api/f1/seasons.json?limit=74";

    try {
        const response = await axios.get(apiUrl);
        const seasonsData= response.data.MRData.SeasonTable.Seasons;
        return seasonsData;
    } catch (error: any )
     {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}

export async function fetchCircuitsData() {
    const apiUrl = "https://ergast.com/api/f1/circuits.json?limit=77";

    try {
        const response = await axios.get(apiUrl);
        const circuitsData= response.data.MRData.CircuitTable.Circuits;
        await addToDatabase("circuits", circuitsData);
        return circuitsData;
    } catch (error: any )
     {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}

async function fetchRacesData(year: number) {
    const apiUrl = `https://ergast.com/api/f1/${year}.json`;

    try {
        const response = await axios.get(apiUrl);
        const racesData = response.data.MRData.RaceTable.Races;
        return racesData;
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}

async function fetchDriversData(year: number) {
    const apiUrl = `https://ergast.com/api/f1/${year}/driverStandings.json?limit=120`;

    try {
        const response = await axios.get(apiUrl);
        const driversData = response.data.MRData.StandingsTable.StandingsLists;
        return driversData;
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}

async function fetchConstructorsData(year: number) {
    const apiUrl = `https://ergast.com/api/f1/${year}/constructorStandings.json?limit=100`;

    try {
        const response = await axios.get(apiUrl);
        const constructorsData = response.data.MRData.StandingsTable.StandingsLists;
        return constructorsData;
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}

export async function fetchFormulaDataForAllYears() {
    try {
        const seasonsData = await fetchSeasonsData();
        const availableYears= seasonsData.map((season: any) => parseInt(season.season));
        
        for (const year of availableYears) {
            try {
                const racesData = await fetchRacesData(year);
                await addToDatabase("races", racesData);
                const driversData = await fetchDriversData(year);
                await addToDatabase("driverStandings", driversData);
                if (year > 1957) {
                const constructorsData = await fetchConstructorsData(year);
                await addToDatabase("constructorStandings", constructorsData);
                }
                console.log("Year "+ year);
            } catch (error) {
                console.error(`Error fetching data for year ${year}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching available years:', error);
    }
}

export async function fetchDriverData() {
    const apiUrl = `https://ergast.com/api/f1/drivers.json?limit=857`;

    try {
        const response = await axios.get(apiUrl);
        const driverData = response.data.MRData.DriverTable.Drivers;
        await addToDatabase("drivers", driverData);
        return driverData;
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}

export async function fetchConstructorData() {
    const apiUrl = `https://ergast.com/api/f1/constructors.json?limit=211`;

    try {
        const response = await axios.get(apiUrl);
        const constructorData = response.data.MRData.ConstructorTable.Constructors;
        await addToDatabase("constructors", constructorData);
        return constructorData;
    } catch (error: any) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
        return [];
    }
}


