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
		drafts: []
		// drafts_histories: new Map()
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
			return n
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

const set_title = (level, title) => {
	if (title)
		return title
	switch (level) {
		case "work":
			return "Untitled-" + local.untitled.work()
		case "chapter":
			return "Untitled-" + local.untitled.chapter(current.draft)
		case "section":
			return "Untitled-" + local.untitled.section(current.draft, current.chapter)
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
		console.log(section_title)
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
		draft.sections.get(current.section).order.push(id)
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

const move = {
	section: {},
	paragraph: {},
	sentence: {}
}

const load = {
	last_session() {
		const levels = Object.keys(current).slice(0, -1)
		const data = {}
		for (const level of levels) {
			if (!current[level])
				return {...data, ...create.cascade(level, "")}
			data[level] = current.get(level)
		}
		const draft = db.drafts.get(current.draft)
		const chapter = draft.chapters.get(current.chapter)
		const compose = (level, ord = [...chapter.order], toc = {}, ctt = []) => {
			switch (level) {
				case "section":
					data.ns = {}
					ord.forEach(n_id => {
						const section = draft.sections.get(n_id)
						data.ns[n_id] = section.title
						const sub_level = comp("paragraph", [...section.order])
						toc[n_id] = sub_level.toc
						ctt.push(sub_level.ctt)
					})
					return { toc, ctt }
				case "paragraph":
					ord.forEach(p_id => {
						const paragraph = draft.paragraphs.get(p_id)
						const sub_level = comp("sentence", [...paragraph])
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
		}
		const { toc, ctt } = compose("section")
		data.toc = toc
		data.ctt = ctt
		return data
	}
}

const save = {
	sentence(txt) {
		db.drafts.get(current.draft).sentences.set(current.sentence, txt)
	}
}

const test_init_wipe = () => {
	localStorage.setItem("untitled-work", 1)
	localStorage.setItem("unassigned-untitled", "")
}

export default {
	create,
	move,
	load,
	save,
	test: test_init_wipe
}
