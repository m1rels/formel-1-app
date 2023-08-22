import { openDb } from "../src/utils/database";
const STORE_NAME = "drivers";

export async function getDrivers(): Promise<any[]>  {
    return new Promise(async (resolve, reject) => {
    const db = await openDb(STORE_NAME);
    const driversObjectStore = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
    const value = driversObjectStore.getAll();
    value.onsuccess = function(evt) {
        const result = value.result;
        resolve(result);
    }
    value.onerror = function(evt) {
        console.error("getDrivers:", (evt.target as IDBRequest).error);
        reject((evt.target as IDBRequest).error);
    }
})}

export async function getDriverById(driverId: string): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
        const db = await openDb(STORE_NAME);
        const driversObjectStore = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
        const request = driversObjectStore.get(driverId);
        
        request.onsuccess = function(evt) {
            const driver = request.result;
            resolve(driver || null);
        };
        
        request.onerror = function(evt) {
            console.error("getDriverById:", (evt.target as IDBRequest).error);
            reject((evt.target as IDBRequest).error);
        };
    });
}