const store_names = ["works", "drafts"]
const store_indexes = {
	works: ["id", "title", "history"],
	drafts: ["id"]
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
			get_data(e.data.store, e.data.id)
			break;
		case "add":
			add_data(e.data.store, e.data.data)
			break;
		case "put":
			edit_data(e.data.store, e.data.data)
			break;
		case "del":
			delete_data(e.data.store, e.data.id)
			break;
	}
}

function open_database() {
	const request = indexedDB.open("test-CWBe", 13)
	request.onupgradeneeded = evt => {
		db = evt.target.result
		store_names.forEach(name => {
			if (!db.objectStoreNames.contains(name)) {
				const [keyPath, ...idxs] = store_indexes[name]
				const store = db.createObjectStore(name, { keyPath } )
				idxs.forEach(index => store.createIndex(index, index, { unique: true }))
			}
		})
		self.postMessage({ success: "upgrade" })
	}
	request.onsuccess = evt => {
		db = evt.target.result
		self.postMessage({ success: "open" })
	}
	request.onerror = evt => self.postMessage({ error: `Error: database open (${evt.target.error})` })
}

// function load_data(store_names, data) {
// 	store_names.forEach((store_name, idx) => {
// 		const req = db.
// 	})
// }

function add_data(store_name, data) {
	const req = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.add(data)
	req.onsuccess = evt => {
		self.postMessage({ success: "add", data: {
			...data,
			id: evt.target.result,
			src: store_name
		} })
	}
	req.onerror = evt => self.postMessage({ error: `Error: data entry (${evt.target.errorCode})` })
}

function edit_data(store_name, data) {
	const req = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.put(data)
	req.onsuccess = evt => {
		console.log("reached")
		self.postMessage({ success: "put", data: evt.target.result, src: store_name })
	}
	req.onerror = evt => self.postMessage({ error: `Error: data update (${evt.target.errorCode})` })
}

function get_data(store_name, id) {
	const req = db
		.transaction([store_name], "readonly")
		.objectStore(store_name)
		.get(id)
	req.onsuccess = evt => {
		self.postMessage({ success: "get", data: evt.target.result, src: store_name })
	}
	req.onerror = evt => {
		self.postMessage({ error: `Error: data retrieval (${evt.target.errorCode})` })
	}
}

function get_all_data(store_name, props) {
	const req = db
		.transaction([store_name], "readonly")
		.objectStore(store_name)
		.getAll()
	req.onsuccess = evt => {
		const data = evt.target.result
		self.postMessage({ success: "get-all", data: data.map(entry => {
			const data_only = {}
			props.forEach(prop => data_only[prop] = entry[prop])
			return data_only
		})})
	}
	req.onerror = evt => self.postMessage({ error: `Error: data retrieval (${evt.target.errorCode})` })
}

function delete_data(store_name, id) {
	const req = db
		.transaction([store_name], "readwrite")
		.objectStore(store_name)
		.delete(id)
	req.onsuccess = evt => {
		self.postMessage({ success: "del", data: evt.target.result })
	}
	req.onerror = evt => self.postMessage({ error: `Error: data deletion (${evt.target.errorCode})` })
}
