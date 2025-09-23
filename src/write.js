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
// command: create section
const enter = (user_input) => {
	const { id: section_id, title: section_title } = store.create.section(user_input)
	store.move.paragraph.ipt()
	dom.enter(section_id, section_title)
}

// command: "##"
// command: create chapter
const create_chapter = (ipt, title) => {
	const data = store.create.cascade("chapter", title)
	const { title: chapter_title } = data.chapter
	const { id: section_id, title: section_title } = data.section
	const { id: paragraph_id } = data.paragraph
	dom.cmd_create_chapter(chapter_title, section_id, section_title, paragraph_id, ipt)
}

const create_draft = (ipt) => {
	const data = store.create.cascade("draft")
	dom.cmd_create_draft(data, ipt)
}

// command: "#"
// command: create work
const create_work = (ipt, title) => {
	const data = store.create.cascade("work", title)
	dom.cmd_create_work(data, ipt)
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
	create: (user_input, ipt) => {
		const [level, ...title] = user_input
		switch (level) {
			case "work":
				create_work(ipt, title)
				break;
			case "draft":
				create_draft(ipt)
				break;
			case "chapter":
				create_chapter(ipt, title)
				break;
			case "section":
				enter(title)
				break;
		}
	}
}
