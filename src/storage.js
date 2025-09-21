import {v4 as index } from 'uuid'

const db = {
	works: new Map(),
	drafts: new Map(),
	histories: new Map()
}

// Used for matching by title
const normalize_title = (title) => title.toLowerCase().split(/[ ]+/).join("-")

const format = {
	work: (title) => ({
		title,
		normalized: normalize_title(title),
		drafts_histories: new Map()
	}),
	draft: () => ({
		untitled: 1,				// used for untitled chapters
		order: [],					// used for chapters
		chapters: new Map(),
		sections: new Map(),
		paragraphs: new Map(),
		sentences: new Map(),
		outline: []
	}),
	chapter: (title) => ({
		title,
		normalized: normalize_title(title),
		untitled: 1,				// used for untitled sections
		order: [],					// used for paragraphs (or sections)
		type: ""					// used to designate special chapters
	}),
	section: (title) => ({
		title,
		normalized: normalize_title(title),
		order: []					// used for paragraphs
	}),
	paragraph: () => [],			// used for sentences
	sentence: () => "",
	history: () => ({
		current: 0,					// required for backtracking (or undo) changes
		timeline: [],				// linear: stores change ids
		changes: new Map()			// change objects
	}),
	change: () => ({
		action: "",
		cond: {},
		src: "",
		req: {},
		from: {},
		to: {},
		res: {}
	})
}
// Change formats vary by action
// action
// cond { args and implicit_data }
// src { change_id },
// req { user permissiona and confirmations }
// from { initial or source of change }
// to { final or destination of change }
// res: { new object or state }

const current = {
	work: localStorage.getItem("active-work") || "",
	draft: localStorage.getItem("active-draft") || "",
	chapter: localStorage.getItem("active-chapter") || "",
	section: localStorage.getItem("active-section") || "",
	paragraph: localStorage.getItem("active-paragraph") || "",
	sentence: localStorage.getItem("active-sentence") || "",
	get(level, req_is_empty) {
		switch (level) {
			case "work":
				return {
					id: this.work,
					title: db.works.get(this.work).title
				}
			case "draft":
				return {
					id: this.draft
				}
		}
		const draft = db.drafts.get(this.draft)
		switch (level) {
			case "chapter":
				const chapter = draft.chapters.get(this.chapter)
				return req_is_empty
					? chapter.order.length
					: {
						id: this.chapter,
						title: chapter.title,
						order: chapter.order
					}
			case "section":
				const section = draft.sections.get(this.section)
				return req_is_empty
					? section.order.length
					: {
						id: this.section,
						title: section.title,
						order: section.order
					}
			case "paragraph":
				const paragraph = draft.paragraphs.get(this.paragraph)
				return req_is_empty
					? paragraph.length
					: {
						id: this.paragraph,
						order: paragraph
					}
			case "sentence":
				const sentence = draft.sentences.get(this.sentence)
				return req_is_empty
					? sentence.length
					: {
						id: this.sentence,
						txt: sentence
					}
		}
	}
}

const selected = {}

const local = {
	untitled: {
		work() {
			const unassigned = localStorage.getItem("unassigned-untitled")
			if (unassigned) {
				const arr = unassigned.split(",")
				const n = arr.shift()
				localStorage.setItem("unassigned-untitled", arr.length ? arr : "")
				return n
			}
			const work = localStorage.getItem("untitled-work") || 1
			localStorage.setItem("untitled-work", +work + 1)
			return work
		},
		chapter(draft_id) {
			const draft = db.drafts.get(draft_id || current.draft.id)
			const n = draft.untitled
			draft.untitled++
			return n
		},
		section(draft_id, chapter_id) {
			const draft = db.drafts.get(draft_id || current.draft.id)
			const chapter = draft.chapters.get(chapter_id || current.chapter.id)
			const n = chapter.untitled
			chapter.untitled++
		}
	},
	remove: {
		work(title) {
			if (!title.toLowerCase().includes("untitled"))
				return;
			const unassigned = localStorage.getItem("unassigned-untitled")
			const arr = unassigned?.split(",") || []
			arr.push(title.split("-").at(-1))
			localStorage.setItem("unassigned-untitled", arr)
		}
	}
}

const set_title = (level, title, { draft, chapter }) => {
	if (title)
		return title
	switch (level) {
		case "work":
			return "Untitled-" + local.untitled.work()
		case "chapter":
			return "Untitled-" + local.untitled.chapter(draft)
		case "section":
			return "Untitled-" + local.untitled.section(draft, chapter)
	}
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
		current.section = id
		return { id, title }
	},
	paragraph() {
		const id = index()
		const draft = db.drafts.get(current.draft)
		draft.paragraphs.set(id, format.paragraph())
		const container = current.section
		? draft.sections.get(current.section)
		: draft.chapters.get(current.chapter)
		container.order.push(id)
		current.paragraph = id
		return { id }
	},
	sentence() {
		const id = index()
		const draft = db.drafts.get(current.draft)
		draft.sentences.set(id, format.sentence())
		draft.paragraphs.get(current.paragraph).push(id)
		current.sentence = id
		return { id }
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

/* ------------------------------------------------------------ MOVE
 * Used for moving data between entities, usually on same segment level
 */

const move = {
	section: {
		pre_section() {
			if (current.section)
				return false
			const draft = db.drafts.get(current.draft)
			const chapter = draft.chapters.get(current.chapter)
			if (!chapter.order.length)
				return false
			const { id, title } = create.section("")
			const section = draft.sections.get(id)
			while (chapter.order.length)
				section.order.push(chapter.order.shift())
			chapter.order.push(id)
			return { id, title }
		}
	}
}

const load = {
	last_session() {
		const levels = Object.keys(current).slice(0, -1)
		const data = { }
		for (const level of levels) {
			if (!current[level])
				return {...data, ...cascade(level, "")}
			data[level] = current.get(level)
			if (data[level].order) {
				const ids = data[level].order
				data.otln.
			}
		}
		return data
	}
}

/* ------------------------------------------------------------ LOAD
 * Used for loading content into storage
 * - spinup: TEST
 *   onload = user's last session (consists of all segments)
 *   if none: creates session (new work)
 * - fileread: TODO
 *   user uploads file of content to be organized and stored
 *   file types accepted: .md, .txt
 */

const load_spinup = () => {
	const data = local.active()
	const draft = db.drafts.get(data.draft.id)
	const chapter = localStorage.getItem("active-chapter")
	if (!chapter) {
		const chapter_id = draft.order.at(-1)
		if (!chapter_id) {
			const { id, title } = create.chapter("")
			data.chapter.id = id
			data.chapter.title = title
			localStorage.setItem("active-chapter", id)
		}
		else {
			data.chapter.id = chapter_id
			data.chapter.title = draft.chapters.get(chapter_id).title
			localStorage.setItem("active-chapter", chapter_id)
		}
	}
	else {
		data.chapter.id = chapter
		data.chapter.title = draft.chapters.get(chapter).title
	}

	const section = localStorage.getItem("active-section")
	if (!section) {
		const section_id = draft.chapters.get(data.chapter.id).order.at(-1)
		if (section_id) {
			data.section.id = section_id
			data.section.title = draft.sections.get(section_id).title
			localStorage.setItem("active-section", section_id)
		}
		else { localStorage.setItem("active-section", "") }
	}
	else {
		data.section.id = section
		data.section.title = draft.sections.get(section).title
	}

	const paragraph = localStorage.getItem("active-paragraph")
	if (!paragraph) {
		const paragraph_id = data.section
		? draft.sections.get(data.section.id).order.at(-1)
		: draft.chapters.get(data.chapter.id).order.at(-1)
		if (!paragraph_id) {
			const id = create.paragraph({
				draft: data.draft.id,
				chapter: data.chapter.id,
				section: data.section?.id
			})
			data.paragraph.id = id
			localStorage.setItem("active-paragraph", id)
		}
		else {
			data.paragraph.id = paragraph_id
			localStorage.setItem("active-paragraph", paragraph_id)
		}
	}
	else { data.paragraph.id = paragraph }

	const sentence = localStorage.getItem("active-sentence")
	if (!sentence) {
		const sentence_id = draft.paragraphs.get(data.paragraph.id).at(-1)
		if (!sentence_id) {
			const id = create.sentence({ draft: data.draft, paragraph: data.paragraph })
			data,sentence.id = id
			localStorage.setItem("active-sentence", id)
		}
		else {
			data.sentence.id = sentence_id
			localStorage.setItem("active-sentence", sentence_id)
		}
	}
	else { data.sentence.id = sentence }
	return data
}

export default {
	current: {
		chapter: () => current_chapter.id(),
		section: () => current_section.id(),
		paragraph: () => current_paragraph.id(),
		sentence: () => current_sentence.id(),
		get: {
			chapter: () => current_chapter.data(),
			section: () => current_section.data(),
			paragraph: () => current_paragraph.data(),
			sentence: () => current_sentence.data()
		}
	},
	create: {
		work: () => create_work()
	},
	local: {
		untitled: {}
	},
	load: {
		spinup: () => load_spinup()
	}
}
