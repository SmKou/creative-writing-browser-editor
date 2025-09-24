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



const save = {
	sentence(txt) {
		db.drafts.get(current.draft).sentences.set(current.sentence, txt)
	}
}

const test = {
	wipe() {
		localStorage.setItem("untitled-work", 1)
		localStorage.setItem("unassigned-untitled", "")
	}
}

export default {
	save,
	test
}
