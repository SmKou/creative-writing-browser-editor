const current = {
	work: localStorage.getItem("active-work") || "",
	draft: localStorage.getItem("active-draft") || "",
	chapter: localStorage.getItem("active-chapter") || "",
	section: localStorage.getItem("active-section") || "",
	paragraph: localStorage.getItem("active-paragraph") || "",
	sentence: localStorage.getItem("active-sentence") || "",
}
// note: consider: use of order from chapter, section, and paragraph
// note: consider: providing chapter id

const work = () => ({
	id: current.work,
	title: db.works.get(current.work).title
})

const draft = (req_is_empty) => {
	const draft = db.drafts.get(current.draft)
	const { order } = draft
	const has_content = draft.order.filter(chapter_id => draft.chapters.get(chapter_id).order.length)
	return (req_is_empty)
		? !has_content.length
		: { id: current.draft, order }
}

const chapter = (req_is_empty) => {
	const draft = db.drafts.get(current.draft)
	const { id, title, order } = draft.chapters.get(current.chapter)
	return (req_is_empty)
		? order.length
		: { id, title, order }
}

const section = (req_is_empty) => {
	const draft = db.drafts.get(current.draft)
	const { id, title, order } = draft.sections.get(current.section)
	return (req_is_empty)
		? order.length
		: { id, title, order }
}

const paragraph = (req_is_empty) => {
	const draft = db.drafts.get(current.draft)
	const paragraph = draft.paragraphs.get(current.paragraph)
	return (req_is_empty)
		? paragraph.length
		: { id: current.paragraph, order: paragraph }
}

const sentence = (req_is_empty) => {
	const draft = db.drafts.get(current.draft)
	const sentence = draft.sentences.get(current.sentence)
	return (req_is_empty)
		? sentence.length
		: { id: current.sentence, txt: sentence }
}

const create = {
	work(work_title) {
		const id = index()
		const title = set_title("work", work_title)
		db.works.set(id, format.work(title))
		current.work = id
		return { id, title }
	},
	draft() {
		const id = index()
		db.drafts.set(id, format.draft())
		db.works.get(current.work).drafts.push(id)
		current.draft = id
		return { id }
	},
	chapter(chapter_title) {
		const id = index()
		const title = set_title("chapter", chapter_title)
		const draft = db.drafts.get(current.draft)
		draft.chapters.set(id, format.chapter(title))
		draft.order.push(id)
		current.chapter = id
		return { id, title }
	},
	section(section_title) {
		const id = index()
		const title = set_title("section", section_title)
		const draft = db.drafts.get(current.draft)
		draft.sections.set(id, format.section(title))
		draft.chapters.get(current.chapter).order.push(id)
		const last = current.section || ""
		current.section = id
		return { id, title, last }
	},
	paragraph() {
		const id = index()
		const draft = db.drafts.get(current.draft)
		draft.paragraphs.set(id, format.paragraph())
		draft.sections.get(current.section).order.push(id)
		const last = current.paragraph || ""
		current.paragraph = id
		return { id, last }
	},
	sentence() {
		const id = index()
		const draft = db.drafts.get(current.draft)
		draft.sentences.set(id, format.sentence())
		draft.paragraphs.get(current.paragraph).push(id)
		const last = current.sentence || ""
		current.sentence = id
		return { id, last }
	},
	cascade(level, segment_title) {
		const data = {}
		let title_used = false
		switch (level) {
			case "work":
				const work = this.work(segment_title)
				data.work = work
				title_used = true
			case "draft":
				const draft = this.draft()
				data.draft = draft
			case "chapter":
				const chapter = this.chapter(title_used ? "" : segment_title)
				data.chapter = chapter
				title_used = true
			case "section":
				const section = this.section(title_used ? "" : segment_title)
				data.section = section
			case "paragraph":
				const paragraph = this.paragraph()
				data.paragraph = paragraph
			case "sentence":
				const sentence = this.sentence()
				data.sentence = sentence
		}
		return data
	}
}

const move = {
	section: {},
	paragraph: {
		selected() {
			// paragraphs
		},
		ipt() {
			const draft = db.drafts.get(current.draft)
			const pre_section_id = draft.chapters.get(current.chapter).order.at(-2)
			const paragraph_id = draft.sections.get(pre_section_id).order.pop()
			draft.sections.get(current.section).order.push(paragraph_id)
		}
	},
	sentence: {
		selected() {
			// sentences in paragraph
		},
		ipt() {}
	},
	segments: {
		selected() {
			// sentence-paragraph-sentence
		}
	}
}

const load = {
	content(level, ord, toc = {}, ctt = []) {
		switch (level) {
			case "section":
				const sections = {}
				ord.forEach(n_id => {
					const section = draft.sections.get(n_id)
					data.sections[n_id] = section.title
					const sub_level = content("paragraph", [...section.order])
					toc[n_id] = sub_level.toc
					ctt.push(sub_level.ctt)
				})
				return { sections, toc, ctt }
			case "paragraph":
				ord.forEach(p_id => {
					const paragraph = draft.paragraphs.get(p_id)
					const sub_level = content("sentence", [...paragraph])
					toc[p_id] = sub_level.toc
					ctt.push(sub_level.ctt)
				})
				return { toc, ctt }
			case "sentence":
				return {
					toc: ord,
					ctt: ord.map(s_id => draft.sentences.get(s_id))
				}
		}
	},
	last_session() {
		const data = {}
		const get = (level) => {
			switch (level) {
				case "work":
					return work()
				case "draft":
					return draft(false)
				case "chapter":
					return chapter(false)
				case "section":
					return section(false)
				case "paragraph":
					return paragraph(false)
				case "sentence":
					return sentence(false)
			}
		}
		const levels = Object.keys(current)
		for (const level of levels) {
			if (!current[level])
				return { ...data, ...create.cascade(level, "") }
			data[level] = get(level)
		}
		const draft = db.drafts.get(current.draft)
		const chapter = draft.chapters.get(current.chapter)
		const highest_level = draft.sections.has(chapter.order.at(-1))
			? "section"
			: "paragraph"
		const { sections, toc, ctt } = this.content(highest_level, [...chapter.order])
		return {...data, sections, toc, ctt }
	}
}
