import { openDb } from "../src/utils/database";
const STORE_NAME = "races";

export async function getRaces(): Promise<any[]>  {
    return new Promise(async (resolve, reject) => {
    const db = await openDb(STORE_NAME);
    const racesObjectStore = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
    const value = racesObjectStore.getAll();
    value.onsuccess = function(evt) {
        const result = value.result;
        resolve(result);
    }
    value.onerror = function(evt) {
        console.error("getRaces:", (evt.target as IDBRequest).error);
        reject((evt.target as IDBRequest).error);
    }
})}