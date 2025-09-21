import store from './storage'
import dom from './ui'

const end_trigger = (txt, ipt) => {
	const sentence_id = store.create.sentence({})
	dom.end_trigger(sentence_id, txt, ipt)
}

export default {
	end_trigger
}
