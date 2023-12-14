// /src/indexedDB/indexedDB.js
const dbName = 'characterDB';
const dbVersion = 1;

let db;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
    console.error('Error al abrir la base de datos:', event.target.error);
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('Base de datos abierta con éxito:', db);
};

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Crea un objeto de almacén (store) para contener la información de los personajes
    const store = db.createObjectStore('characters', { keyPath: 'id' });

    // Define los índices
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('house', 'house', { unique: false });

    console.log('Estructura de la base de datos creada con éxito.');
};
