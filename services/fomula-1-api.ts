import axios from "axios";
import { addToDatabase } from "../src/utils/database";
import { getSeasons } from "./seasons";
import { getCircuits, getCircuitById } from "./circuits";
import { getRacesByYear } from "./races";
import { getDriverById, getDrivers } from "./drivers";
import { getDriverStandings } from "./driverStandings";
import { getConstructorStandings } from "./constructorsStandings";
import { getConstructorById, getConstructors } from "./constructors";

export async function fetchSeasonsData() {
  const apiUrl = "https://ergast.com/api/f1/seasons.json?limit=74";

  try {
    // Versuche, Daten aus IndexedDB zu holen
    const cachedData = await getSeasons();

    if (cachedData.length != 0) {
      return cachedData;
    }

    // Wenn keine Daten in IndexedDB vorhanden, Fetch von Server
    const response = await axios.get(apiUrl);
    const seasonsData = response.data.MRData.SeasonTable.Seasons;

    // Speichere die frischen Daten in IndexedDB
    if (seasonsData) {
      await addToDatabase("seasons", seasonsData);
    }

    return seasonsData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchCircuitsData() {
  const apiUrl = "https://ergast.com/api/f1/circuits.json?limit=77";

  try {
    const cachedData = await getCircuits();

    if (cachedData.length != 0) {
      console.log("Daten aus IndexedDB geholt.");
      return cachedData;
    }

    const response = await axios.get(apiUrl);
    const circuitsData = response.data.MRData.CircuitTable.Circuits;
    if (circuitsData) {
      await addToDatabase("circuits", circuitsData);
    }

    return circuitsData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchCircuitData(circuitId: string) {
    const apiUrl = `https://ergast.com/api/f1/circuits/${circuitId}.json?limit=77`;
  
    try {
      const cachedData = await getCircuitById(circuitId);
  
      if (cachedData) {
        return cachedData;
      }
  
      const response = await axios.get(apiUrl);
      const circuitsData = response.data.MRData.CircuitTable.Circuits;
      if (circuitsData) {
        await addToDatabase("circuits", circuitsData);
      }
  
      return circuitsData;
    } catch (error: any) {
      console.error("Fehler beim Abrufen der Daten:", error.message);
      return [];
    }
  }

export async function fetchRacesData(year: string) {
  const apiUrl = `https://ergast.com/api/f1/${year}.json`;

  try {
    const cachedData = await getRacesByYear(year);

    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(apiUrl);
    const racesData = response.data.MRData.RaceTable.Races;

    if (racesData) {
        await addToDatabase("races", racesData);
      }

    return racesData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchDriverStandingsData(year: string) {
  const apiUrl = `https://ergast.com/api/f1/${year}/driverStandings.json?limit=120`;

  try {
    const cachedData = await getDriverStandings(year);

    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(apiUrl);
    const driverStandingsData = response.data.MRData.StandingsTable.StandingsLists;

    if (driverStandingsData) {
        await addToDatabase("driverStandings", driverStandingsData);
      }

    return driverStandingsData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchConstructorStandingsData(year: string) {
  const apiUrl = `https://ergast.com/api/f1/${year}/constructorStandings.json?limit=100`;

  try {
    const cachedData = await getConstructorStandings(year);

    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(apiUrl);
    const constructorStandingsData = response.data.MRData.StandingsTable.StandingsLists;

    if (constructorStandingsData) {
        await addToDatabase("constructorStandings", constructorStandingsData);
      }

    return constructorStandingsData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchDriversData() {
  const apiUrl = `https://ergast.com/api/f1/drivers.json?limit=857`;

  try {
    const cachedData = await getDrivers();
    if (cachedData.length != 0) {
      return cachedData;
    }

    const response = await axios.get(apiUrl);
    const driversData = response.data.MRData.DriverTable.Drivers;
    if (driversData) {
        await addToDatabase("drivers", driversData);
      }

    return driversData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchDriverData(driverId: string) {
    const apiUrl = `https://ergast.com/api/f1/drivers/${driverId}.json?limit=857`;
  
    try {
        const cachedData = await getDriverById(driverId);
    if (cachedData) {
      return cachedData;
    }
      const response = await axios.get(apiUrl);
      const driverData = response.data.MRData.DriverTable.Drivers;
      if (driverData) {
        await addToDatabase("drivers", driverData);
      }
      return driverData;
    } catch (error: any) {
      console.error("Fehler beim Abrufen der Daten:", error.message);
      return [];
    }
  }


export async function fetchConstructorsData() {
  const apiUrl = `https://ergast.com/api/f1/constructors.json?limit=211`;

  try {
    const cachedData = await getConstructors();
    if (cachedData.length != 0) {
      return cachedData;
    }
    const response = await axios.get(apiUrl);
    const constructorsData = response.data.MRData.ConstructorTable.Constructors;

    if (constructorsData) {
        await addToDatabase("constructors", constructorsData);
      }

    return constructorsData;
  } catch (error: any) {
    console.error("Fehler beim Abrufen der Daten:", error.message);
    return [];
  }
}

export async function fetchConstructorData(constructorId: string) {
    const apiUrl = `https://ergast.com/api/f1/constructors/${constructorId}.json?limit=211`;
  
    try {
        const cachedData = await getConstructorById(constructorId);
    if (cachedData) {
      return cachedData;
    }
      const response = await axios.get(apiUrl);
      const constructorData = response.data.MRData.ConstructorTable.Constructors;
      if (constructorData) {
        await addToDatabase("constructors", constructorData);
      }
      return constructorData;
    } catch (error: any) {
      console.error("Fehler beim Abrufen der Daten:", error.message);
      return [];
    }
  }
