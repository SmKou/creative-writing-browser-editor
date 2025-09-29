import store from '../storage'

const create = {
	work(work_title) {
		const id = store.db.id()
		const title = work_title || store.untitled_work.create()
		store.db.add_item("works", "work", { id, title })
		return store.res[0]
	}
}

export default {
	create
}
