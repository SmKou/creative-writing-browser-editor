// write mode
/*
const write = {
	end_trigger(txt, ipt) {
		store.save.sentence(txt)
		const { id: sentence_id } = store.create.sentence()
		dom.end_trigger(sentence_id, txt, ipt)
	},
	end_mark_enter(txt, ipt) {
		store.save.sentence(txt)
		const { id: paragraph_id } = store.create.paragraph()
		const { id: sentence_id } = store.create.sentence()
		dom.end_mark_enter(paragraph_id, sentence_id, txt, ipt)
	}, // Enter + input
	enter() {
		const { id: section_id, title: section_title } = store.create.section(user_input)
		const is_not_empty = store.move.paragraph.in()
		store.move.paragraph.ipt()
		dom.enter(section_id, section_title, !is_not_empty)
	}, // Enter + no_input, "###", create section
	create: {
		chapter(ipt, title) {
			const data = store.create.cascade("chapter", title)
			const { title: chapter_title } = data.chapter
			const { id: section_id, title: section_title } = data.section
			const { id: paragraph_id } = data.paragraph
			dom.create.chapter(chapter_title, section_id, section_title, paragraph_id, ipt)
		}, // "##", create chapter
		draft(ipt) {
			const data = store.create.cascade("draft")
			dom.create.draft(data, ipt)
		}, // create draft
		work(ipt, title) {
			const data = store.create.cascade("work", title)
			dom.create.work(data, ipt)
		} // "#", create work
	},
	init(ipt) {
		store.test()
		const data = store.load.last_session()
		dom.load.last_session(data, ipt)
	}
}
*/
