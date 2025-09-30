const store_names = ["works"]
const store_indexes = {
	works: ["id", "title", "history"]
}
let db

self.onmessage = function DatabaseAccess(e) {
	console.log("worker received", e.data)
	switch (e.data.action) {
		case "open":
			open_database()
			break;
		case "get-all":
			get_all_data(e.data.store, e.data.only)
			break;
		case "get":
			const type = e.data.type
			if (type == "id")
				get_data(e.data.store, e.data.id)
			else
				get_associated_data(e.data.store, e.data.prop, e.data.key)
			break;
		case "add":
			add_data(e.data.store, e.data.data)
			break;
	}
}

function open_database() {
	const request = indexedDB.open("test-CWBe", 11)
	request.onupgradeneeded = evt => {
		db = evt.target.result
		store_names.forEach(name => {
			if (!db.objectStoreNames.contains(name)) {
				const [keyPath, ...idxs] = store_indexes[name]
				const store = db.createObjectStore(name, { keyPath } )
				idxs.forEach(index => store.createIndex(index, index, { unique: true }))
			}
		})
		self.postMessage({ success: "Database upgraded" })
	}
	request.onsuccess = evt => {
		db = evt.target.result
		self.postMessage({ success: "Database opened" })
	}
	request.onerror = evt => {
		self.postMessage({ error: `Error: database open (${evt.target.error})` })
	}
}

function add_data(store_name, data) {
	const req = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.add(data)
	req.onsuccess = evt => {
		self.postMessage({ success: "Data entered: " + evt.target.result })
	}
	req.onerror = evt => {
		self.postMessage({ error: `Error: data entry (${evt.target.errorCode})` })
	}
}

function get_data(store_name, id) {
	const req = db
		.transaction([store_name], "readonly")
		.objectStore(store_name)
		.get(id)
	req.onsuccess = evt => {
		self.postMessage({ success: "Data retrieved", data: evt.target.result })
	}
	req.onerror = evt => {
		self.postMessage({ error: `Error: data retrieval (${evt.target.errorCode})` })
	}
}

// function get_associated_data(store_name, prop, key) {
// 	const trx = db.transaction([store_name], "readonly")
// 	const store = trx.objectStore(store_name)
// 	const index = store.index(prop)
// 	const req = index.get(key)
// 	req.onsuccess = evt => {
// 		self.postMessage({ success: "Data retrieved", data: evt.target.result })
// 	}
// 	req.onerror = evt => {
// 		self.postMessage({ error: `Error: data retrieval (${evt.target.errorCode})` })
// 	}
// }

function get_all_data(store_name, props) {
	const data = new Map()
	const req = db
		.transaction([store_name], "readonly")
		.objectStore(store_name)
		.openCursor()
	req.onsuccess = evt => {
		const cursor = evt.target.result
		if (cursor) {
			const cursor_data = cursor.value
			const data_only = []
			props.forEach(prop => data_only.push(cursor_data[prop]))
			const id = cursor_data.id
			data.set(id, data_only)
			cursor.continue()
		}
	}
	req.oncomplete = evt => {
		self.postMessage({ success: "Data retrieved", data, res: evt.target.result })
	}
}
