import { store } from '../_storage/storage'

export default {
	has_last: () => store.has_last(),
	last: () => store.get_last()
}
