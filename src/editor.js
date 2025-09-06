import { store } from '../_storage/storage'

const load = (filename, ...params) => {
	const txt = Object.keys(params).length
		? store.read(filename, params)
		: store.read(filename)
}
