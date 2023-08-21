const DB_NAME = 'formula-1';
const DB_VERSION = 1;

let db;

export function openDb(storeName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onsuccess = function (evt) {
            db = req.result as IDBDatabase;
            console.log("openDb DONE");
            resolve(db);
        };

        req.onerror = function (evt) {
            console.error("openDb:", (evt.target as IDBOpenDBRequest).error);
            reject((evt.target as IDBOpenDBRequest).error);
        };

        req.onupgradeneeded = async function (evt) {
            console.log("openDb.onupgradeneeded");
            db = (evt.target as IDBOpenDBRequest).result as IDBDatabase;
            db.createObjectStore(
                "seasons", { keyPath: 'id', autoIncrement: true });
            db.createObjectStore(
                "races", { keyPath: 'id', autoIncrement: true });
            db.createObjectStore(
                "circuits", { keyPath: 'id', autoIncrement: true });
            db.createObjectStore(
                "drivers", { keyPath: 'id', autoIncrement: true });
            db.createObjectStore(
                "constructors", { keyPath: 'id', autoIncrement: true });
            db.createObjectStore(
                "constructorStandings", { keyPath: 'id', autoIncrement: true });
            db.createObjectStore(
                "driverStandings", { keyPath: 'id', autoIncrement: true });
        };
    });
}

export async function addToDatabase(storeName: string, data: any[]) {
    try {
        const db = await openDb(storeName);
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);

        for (const item of data) {
            const request = objectStore.add(item);
            request.onsuccess = (evt) => {
                console.log(`Added data with ID: ${request.result}`);
            };
            request.onerror = (evt) => {
                console.error(`Error adding data: ${request.error}`);
            };
        }

        transaction.oncomplete = (evt) => {
            console.log('Transaction completed.');
        };

        transaction.onerror = (evt) => {
            console.error('Transaction error:', transaction.error);
        };
    } catch (error) {
        console.error('Error opening database:', error);
    }
}

export async function clearObjectStore(storeName: string) {
    try {
        const db = await openDb(storeName);
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);

        const request = objectStore.clear();

        request.onsuccess = (evt) => {
            console.log('Object store cleared.');
        };

        request.onerror = (evt) => {
            console.error(`Error clearing object store: ${request.error}`);
        };

        transaction.oncomplete = (evt) => {
            console.log('Transaction completed.');
        };

        transaction.onerror = (evt) => {
            console.error('Transaction error:', transaction.error);
        };
    } catch (error) {
        console.error('Error opening database:', error);
    }
}

export async function getAllDataFromObjectStore(storeName: string) {
    try {
        const db = await openDb(storeName);
        const transaction = db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);

        const request = objectStore.getAll();

        request.onsuccess = (evt) => {
            const data = request.result;
            console.log('Data from object store:', data);
        };

        request.onerror = (evt) => {
            console.error(`Error retrieving data from object store: ${request.error}`);
        };

        transaction.oncomplete = (evt) => {
            console.log('Transaction completed.');
        };

        transaction.onerror = (evt) => {
            console.error('Transaction error:', transaction.error);
        };
    } catch (error) {
        console.error('Error opening database:', error);
    }
}

export async function resetObjectStore(storeName: string) {
    try {
        const db = await openDb(storeName);
        db.close();
        const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

        deleteRequest.onsuccess = (evt) => {
            console.log('Database deleted successfully.');

            openDb(storeName).then((newDb) => {
                console.log('Database re-created.');
            });
        };

        deleteRequest.onerror = (evt) => {
            console.error('Error deleting database:', deleteRequest.error);
        };
    } catch (error) {
        console.error('Error opening database:', error);
    }
}
