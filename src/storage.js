import DataFormat from './lib/DataFormat'
import LocalAccess from './lib/LocalAccess'
import { v4 } from 'uuid'

const storage = { db: "", res: [] }
const req = indexedDB.open("CWBe", 1)
req.onupgradeneeded = evt => {
	const db = evt.currentTarget.result
	if (!db.objectStoreNames.contains("works"))
		db.createObjectStore("works", { keyPath: "id" })
	if (!db.objectStoreNames.contains("drafts"))
		db.createObjectStore("drafts", { keyPath: "id" })
}
req.onsuccess = evt => {
	const db = evt.result
	storage.db = {
		id: () => v4(),
		add_item(store_name, type, data) {
			const txn = db.transaction([store_name], "readwrite")
			const store = txn.objectStore(store_name)
			const obj = DataFormat[type](data)
			store.add(obj)
			txn.oncomplete = () => storage.res.push({
				action: "add",
				status: true,
				res: obj
			})
		}
	}
}
req.onerror = evt => console.error("open db: ", evt.target.errorCode)

// get_item(id) {
// 	const txn = this.db.transaction(store_name, "readonly")
// 	const store = txn.objectStore(store_name)
// 	const res = store.get(id)
// 	res.onsuccess = () => storage.res.push({
// 		action: "retrieve",
// 		status: true,
// 		res: res.result
// 	})
// }
// clear() {
// 	console.log("deleted", JSON.stringify(storage.res))
// 	storage.res = []
// }

export default {
	untitled_work: {
		create: () => LocalAccess.create_untitled_work(),
		delete: (title) => LocalAccess.remove_untitled_work(title)
	},
	db: storage.db,
	res: () => storage.res
}
// consider: database access by object store (What about cross-transactions?)
