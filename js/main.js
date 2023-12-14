// /src/scripts/main.js
const charactersList = document.getElementById('characters-list');

fetch('https://harry-potter-api.onrender.com/personajes')

    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Almacenar datos en indexedDB
        storeDataInIndexedDB(data);

        // Manipular datos y actualizar UI
        console.log(data);
        displayResults(data);
    })
    .catch(error => {
        console.error('Error en la solicitud Fetch:', error);
        displayError(error.message);
    });

function storeDataInIndexedDB(data) {
    const transaction = db.transaction('characters', 'readwrite');
    const store = transaction.objectStore('characters');

    data.forEach(character => {
        store.put(character);
    });

    console.log('Datos almacenados en indexedDB con éxito.');
}

