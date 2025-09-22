import store from './storage'
import dom from './ui'

const end_trigger = (txt, ipt) => {
	store.save.sentence(txt)
	const { id: sentence_id } = store.create.sentence()
	dom.end_trigger(sentence_id, txt, ipt)
}

const end_mark_enter = (txt, ipt) => {
	store.save.sentence(txt)
	const { id: paragraph_id } = store.create.paragraph()
	const { id: sentence_id } = store.create.sentence()
	dom.end_mark_enter(paragraph_id, sentence_id, txt, ipt)
}

// Enter + no_input
// command: "###"
const enter = (ipt, user_input) => {
	store.move.section.pre_section()
	const { id: section_id, title: section_title } = store.create.section(user_input)
	const { id: paragraph_id } = store.create.paragraph()
	dom.enter(section_id, section_title, paragraph_id, ipt)
}

const init = (ipt) => {
	store.test()
	const data = store.load.last_session()
	dom.load(data, ipt)
}

export default {
	init,
	end_trigger,		// new sentence
	end_mark_enter,		// new paragraph
	enter,				// new section
}
