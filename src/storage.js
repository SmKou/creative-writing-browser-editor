import DataFormat from './lib/DataFormat'
import LocalAccess from './lib/LocalAccess'
// import {v4 as index } from 'uuid'

const storage = { db: "" }

class DatabaseAccess {
	constructor(db) {
		this.db = db,
		this.res = []
	}

	add_item(type, data, store_name) {
		const txn = this.db.transaction(store_name, "readwrite")
		const store = txn.objectStore(store_name)
		const obj = DataFormat[type](data)
		store.add(obj)
		txn.oncomplete = () => this.res.push({
			action: "add",
			status: true,
			res: obj
		})
	}

	// add_items: used for loaded creations, ie. create work

	get_item(store_name, id) {
		const txn = this.db.transaction(store_name, "readonly")
		const store = txn.objectStore(store_name)
		const res = store.get(id)
		res.onsuccess = () => this.res.push({
			action: "retrieve",
			status: true,
			res: res.result
		})
	}

	clear() {
		console.log("deleted", JSON.stringify(this.res))
		this.res = []
	}
}

const req = indexedDB.open("CWBe", 1)
req.onupgradeneeded = evt => {
	const db = evt.target.result
	if (!db.objectStoreNames.contains("works"))
		db.createObjectStore("works", { keyPath: "id" })
	if (!db.objectStoreNames.contains("drafts"))
		db.createObjectStore("drafts", { keyPath: "id" })
}
req.onsuccess = evt => {
	storage.db = evt.target.result
}

export default {
	untitled_work: {
		create: () => LocalAccess.create_untitled_work(),
		delete: (title) => LocalAccess.remove_untitled_work(title)
	},
	db: () => new DatabaseAccess(storage.db)
}
// consider: database access by object store (What about cross-transactions?)
