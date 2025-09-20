import {v4 as index } from 'uuid'

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

const works = new Map()
const drafts = new Map()

const format = {
	work: (title) => ({
		title,
		normalized: normalize_title(title),
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
		normalized: normalize_title(title),
		order: []
	}),
	section: (title) => ({
		title,
		normalized: normalize_title(title),
		order: []
	}),
	paragraph: () => [],
	sentence: () => ""
}

const create = {
	sentence() {
		const id = index()
		drafts.get(current.draft).sentences.set(id, format.sentence())
		drafts.get(current.draft).paragraphs.get(current.paragraph).push(id)
		return id
	},
	paragraph() {
		const id = index()
		drafts.get(current.draft).paragraphs.set(id, format.paragraph())
		const container = current.section
			? drafts.get(current.draft).sections.get(current.section).order
			: drafts.get(current.draft).chapters.get(current.chapter).order
		container.push(id)
		return id
	},
	section(section_title) {
		const id = index()
		const title = set_title(section_title)
		drafts.get(current.draft).sections.set(id, format.section(title))
		drafts.get(current.draft).chapters.get(current.chapter).order.push(id)
		return { id, title }
	},
	chapter(chapter_title) {
		const id = index()
		const title = set_title(chapter_title)
		drafts.get(current.draft).chapters.set(id, format.chapter(title))
		drafts.get(current.draft).order.push(id)
		return { id, title }
	},
	draft() {
		const id = index()
		drafts.set(id, format.draft())
		works.get(current.work).drafts.push(id)
		return id
	},
	work(work_title) {
		const id = index()
		const title = set_title(work_title)
		works.set(id, format.work(title))
		return { id, title }
	}
}

const set = {
	segment: (level, id) => {
		const last = current[level]
		current[level] = id
		return { last, id }
	},
	draft: (id) => current.draft = id,
	work: (id) => current.work = id
}

const get = {
	segment: (level, id) => drafts.get(current.draft)[level + "s"].get(id || current[level]),
	draft: (id) => drafts.get(id || current.draft),
	work: (id) => works.get(id || current.work)
}

export default {}
