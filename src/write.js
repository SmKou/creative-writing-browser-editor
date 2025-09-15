import {v4 as gen_id } from 'uuid'

const untitled = {
	work: 1,
	chapter: 1,
	section: 1
}

const reset_untitled = (level) => {
	switch (level) {
		case "work":
		case "draft":
			untitled.chapter = 1
		case "chapter":
			untitled.section = 1
	}
}

const current = {
	work: "",
	draft: "",
	chapter: "",
	section: "",
	paragraph: "",
	sentence: ""
}

const get_current = (level) => current[level]
export { get_current as current }

export const settings = {
	view: true,		// true: lst, false: elm
	theme: true,	// true: light, false: dark
	color: "deeppink"
}

const set_title = (level, title) => {
	if (title)
		return title
	const n = untitled[level]
	untitled[level]++
	return "Untitled-" + n
}

const works = new Map()
const drafts = new Map()

/* params
 * action {string}		command executed
 * cond {object}		input and implicit data
 * src {string}			branched-from change-id
 * req {object}			intermediate action required
 * - type: error || warning
 * - msg: alert presented to user
 * from {object}		source location
 * - addr (d-c-n-p-s)
 * - initial state
 * to {object}			destination location
 * - addr (d-c-n-p-s)
 * - final state
 * res {object}			content creation
 */
const record = (params) => {
	const change_id = gen_id()
	const draft = drafts.get(current.draft)
	draft.history.changes.set(change_id, params)
	draft.history.current = history.timeline.length
	draft.history.timeline.push(change_id)
}

const error = {
	invalid_argument: ({ action, target, arg }) => ({
		error: true,
		msg: `${action}${target ? " " + target : ""}: invalid argument: ${arg}`,
		issue: "either argument is unusable, same as an existing value, or has no value"
	})
}

export const create = {
	work: (title) => {
		const work_id = gen_id()
		const work_title = set_title("work", title)
		works.set(work_id, {
			title: work_title,
			drafts: [],
			outline: []
		})
		current.work = work_id
		reset_untitled("work")
		return work_title
	},
	draft: () => {
		const draft_id = gen_id()
		drafts.set(draft_id, {
			order: [],
			chapters: new Map(),
			sections: new Map(),
			paragraphs: new Map(),
			sentences: new Map()
		})
		works.get(current.work).drafts.push(draft_id)
		current.draft = draft_id
		reset_untitled("draft")
	},
	chapter: (title) => {
		const chapter_id = gen_id()
		const chapter_title = set_title("chapter", title)
		const draft = drafts.get(current.draft)
		draft.chapters.set(chapter_id, {
			title: chapter_title,
			order: []
		})
		draft.order.push(chapter_id)
		current.chapter = chapter_id
		reset_untitled("chapter")
		return { id: chapter_id, title: chapter_title }
	},
	section: (title) => {
		const data = { last: current.section }
		const section_id = gen_id()
		const section_title = set_title("section", title)
		drafts.get(current.draft).sections.set(section_id, {
			title: section_title,
			order: []
		})
		current.section = section_id
		data.id = section_id
		data.title = section_title
		return data
	},
	paragraph: () => {
		const data = { last: current.paragraph }
		const paragraph_id = gen_id()
		drafts.get(current.draft).paragraphs.set(paragraph_id, [])
		current.paragraph = paragraph_id
		data.id = paragraph_id
		return data
	},
	sentence: () => {
		const data = { last: current.sentence }
		const sentence_id = gen_id()
		current.sentence = sentence_id
		data.id = sentence_id
		return data
	}
}

export const name = {
	work: (id, title) => {
		const work = works.get(id)
		const work_title = set_title(title)
		if (work.title === work_title || work_title.includes("Untitled-"))
			return error.invalid_argument({
				action: "rename",
				target: "work",
				arg: title
			})
		record({
			action: "rename",
			cond: { id, title, level: "work" },
			from: { title: works.get(id).title },
			to: { title: work_title }
		})
		work.title = work_title
	},
	chapter: (id, title) => {
		const chapter = drafts.get(current.draft).chapters[id]
		const chapter_title = set_title(title)
		if (chapter.title === chapter_title || chapter_title.includes("Untitled-"))
			return error.invalid_argument({
				action: "rename",
				target: "chapter",
				arg: title
			})
		record({
			action: "rename",
			cond: { id, title, level: "chapter" },
			from: { title: chapter.title },
			to: { title: chapter_title }
		})
		chapter.title = chapter_title
	},
	section: (id, title) => {
		const section = drafts.get(current.draft).sections[id]
		const section_title = set_title(title)
		if (section.title === section_title || section_title.includes("Untitled-"))
			return error.invalid_argument({
				action: "rename",
				target: "section",
				arg: title
			})
		section.title = section_title
	}
}

export const commit = {
	sentence: (txt) => {
		if (!txt)
			return error.invalid_argument({
				action: "commit",
				target: "sentence",
				arg: "cannot be empty"
			})
		const draft = drafts.get(current.draft)
		draft.sentences.set(current.sentence, txt)
		draft.paragraphs.get(current.paragraph).push(current.sentence)
		return current.sentence
	},
	paragraph: () => {
		const draft = drafts.get(current.draft)
		const container = current.section
			? draft.sections.get(current.section)
			: draft.chapters.get(current.chapter)
		container.order.push(current.paragraph)
		return current.paragraph
	},
	section: () => {
		const draft = drafts.get(current.draft)
		const chapter = draft.chapters.get(current.chapter)
		if (!current.section) {
			if (!chapter.order.length) {
				console.error("cannot commit when no current section")
				return;
			}
			else {
				const section = create.section("")
				while (chapter.order.length)
					section.order.push(chapter.order.shift())
				current.section = section.id
			}
		}
		chapter.order.push(current.section)
		return current.section
	}
}
