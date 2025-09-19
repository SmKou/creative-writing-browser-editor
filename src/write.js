import {v4 as index } from 'uuid'

export const settings = {
	view_pgh: false
}

const untitled = {
	work: 1,
	chapter: 1,
	section: 1
}

const current = {
	work: "",
	draft: "",
	chapter: "",
	section: "",
	paragraph: "",
	sentence: ""
}

const set_title = (level, title) => {
	if (title)
		return title
	const n = untitled[level]
	untitled[level]++
	return "Untitled-" + n
}

const normalize_title = (title) => title.toLowerCase().split(/[ ]+/).join("-")
export const temp_id = () => index()

const works = new Map()
const drafts = new Map()

const format = {
	work: (title) => ({
		title,
		drafts: [],
		outline: []
	}),
	draft: () => ({
		order: [],
		chapters: new Map(),
				  sections: new Map(),
				  paragraphs: new Map(),
				  sentences: new Map()
	}),
	chapter: (title) => ({
		title,
		order: []
	}),
	section: (title) => ({
		title,
		order: []
	}),
	paragraph: () => [],
	sentence: () => ""
}

export const get = {
	work: (id) => works.get(id || current.work),
	draft: (id) => drafts.get(id || current.draft),
	chapter: (id, title) => {
		const draft = drafts.get(current.draft)
		if (id && draft)
			return draft.chapters.get(id || current.chapter)
		else if (id) {
			console.error("get.chapter: no draft")
			return;
		}
		else {
			const normalized = normalize_title(title)
			const chapters = draft.chapters.values()
			const chapter = chapters.filter(chapter => normalize_title(chapter.title) === normalized)[0]
			return chapter
		}
	},
	section: (id, title) => {
		const draft = drafts.get(current.draft)
		if (id && draft)
			return draft.sections.get(id || current.section)
		else if (id) {
			console.error("get.section: no draft")
			return;
		}
		else {
			const normalized = normalize_title(title)
			const sections = draft.sections.values()
			const section = sections.filter(section => normalize_title(section.title) === normalized)[0]
			return section
		}
	},
	paragraph: (id) => drafts.get(current.draft).paragraphs.get(id || current.paragraph),
	sentence: (id) => drafts.get(current.draft).sentences.get(id || current.sentence)
}

const set = {
	work: (id, title) => works.set(id, format.work(title)),
	draft: (id) => drafts.set(id, format.draft()),
	chapter: (id, title) => drafts.get(current.draft).chapters.set(id, format.chapter(title)),
	section: (id, title) => drafts.get(current.draft).sections.set(id, format.section(title)),
	paragraph: (id) => drafts.get(current.draft).paragraphs.set(id, format.paragraph()),
	sentence: (id) => drafts.get(current.draft).sentences.set(id, format.sentence())
}

export const create_segment = {
	sentence: () => {
		const data = { last: current.sentence }
		const id = index()
		drafts.get(current.draft).paragraphs.get(current.paragraph).push(id)
		current.sentence = id
		data.id = id
		return data
	}
}
