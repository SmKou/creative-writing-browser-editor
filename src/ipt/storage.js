const DATABASE_NAME = "cwbe"
const DATABASE_VERSION = 1

let db

function open_database() {
    const req = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
    req.onupgradeneeded = evt => {
        db = evt.target.result
    }
    req.onsuccess = evt => {}
    req.onerror = evt => {}
}

function add(storename, item) {
    const trx
}