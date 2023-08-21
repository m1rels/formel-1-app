import { openDb } from "../src/utils/database";
const STORE_NAME = "drivers";

export async function getDrivers(): Promise<any[]>  {
    return new Promise(async (resolve, reject) => {
    const db = await openDb(STORE_NAME);
    const driverStandingsObjectStore = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
    const value = driverStandingsObjectStore.getAll();
    value.onsuccess = function(evt) {
        const result = value.result;
        resolve(result);
    }
    value.onerror = function(evt) {
        console.error("getDrivers:", (evt.target as IDBRequest).error);
        reject((evt.target as IDBRequest).error);
    }
})}