import { openDb } from "../src/utils/database";
const STORE_NAME = "seasons";

export async function getSeasons(): Promise<any[]>  {
    return new Promise(async (resolve, reject) => {
    const db = await openDb(STORE_NAME);
    const seasonsObjectStore = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
    const value = seasonsObjectStore.getAll();
    value.onsuccess = function(evt) {
        const result = value.result;
        resolve(result);
    }
    value.onerror = function(evt) {
        console.error("getSeasons:", (evt.target as IDBRequest).error);
        reject((evt.target as IDBRequest).error);
    }
})}
    
