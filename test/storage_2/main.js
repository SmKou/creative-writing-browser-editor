const DB_NAME = "test-cwbe-storage-2"
const DB_VERSION = 1

const stores = {
	"works": {
		indexes: ["title"]
	},
	"drafts": {
		indexes: ["outline", "history"]
	},
	"chapters": {
		indexes: ["title"]
	},
	"sections": {
		indexes: ["title"]
	},
	"paragraphs": {},
	"sentences": {},
	"outlines": {
		indexes: ["draft"]
	},
	"segments": {
		indexes: ["title"]
	},
	"timelines": {
		indexes: ["history"]
	},
	"events": {
		indexes: ["title"]
	},
	"profiles": {
		indexes: ["name", "history"]
	},
	"languages": {
		indexes: ["name", "lexicon", "glossary", "grammar", "history"]
	},
	"lexicons": {},
	"glossaries": {},
	"grammars": {},
	"histories": {
		indexes: ["entity"]
	},
	"changes": {},
	"journals": {}
}

let db
const state = {}

const open = function() {
	const req = indexedDB.open(DB_NAME, DB_VERSION)
	req.onupgradeneeded = evt => {
		const db = evt.target.result
		const store_names = Object.keys(stores)
		store_names.forEach(store_name => {
			if (!db.objectStoreNames.contains(store_name)) {
				const idxs = stores[store_name].indexes || []
				const store = db.createObjectStore(store_name, { keyPath: "id" })
				idxs.forEach(index => store.createIndex(index, index, { unique: true }))
			}
		})
		console.log("upgrade")
	}
	req.onsuccess = evt => {
		db = evt.target.result
		console.log("open")
	}
	req.onerror = evt => console.error(evt.target.errorCode)
}
open()

const add = function(store_name, data) {
	const trx = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.add(data)
	trx.onsuccess = () => console.log("add")
	trx.onerror = evt => console.error(evt.target.errorCode)
}

const get = function(store_name, id) {
	const trx = db
		.transaction([store_name], "readonly")
		.objectStore(store_name)
		.get(id)
	trx.onsuccess = evt => state.data = evt.target.result
	trx.onerror = evt => console.error(evt.target.errorCode)
}

const put = function(store_name) {
	const trx = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.put(state.data)
	trx.onsuccess = () => console.log("change")
	trx.onerror = evt => console.error(evt.target.errorCode)
}

const del = function(store_name, id) {
	const trx = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.delete(id)
	trx.onsuccess = () => console.log("delete")
	trx.onerror = evt => console.error(evt.target.errorCode)
}

const ipt = document.getElementById("tester")
ipt.addEventListener("change", evt => {})
