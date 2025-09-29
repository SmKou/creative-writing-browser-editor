import store from './storage'

const works = store.db("works")
const drafts = store.db("drafts")

const create = {
	work() {
		store.db.id()
	}
}
