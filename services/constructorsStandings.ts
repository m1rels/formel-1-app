import { openDb } from "../src/utils/database";
const STORE_NAME = "constructorStandings";

export async function getConstructorStandings(): Promise<any[]>  {
    return new Promise(async (resolve, reject) => {
    const db = await openDb(STORE_NAME);
    const constructorStandingsObjectStore = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
    const value = constructorStandingsObjectStore.getAll();
    value.onsuccess = function(evt) {
        const result = value.result;
        resolve(result);
    }
    value.onerror = function(evt) {
        console.error("getConstructors:", (evt.target as IDBRequest).error);
        reject((evt.target as IDBRequest).error);
    }
})}