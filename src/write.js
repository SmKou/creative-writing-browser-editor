export const settings = {
	view: true
}

export const current = {
	work: "",
	draft: "",
	chapter: "",
	section: "",
	paragraph: "",
	sentence: ""
}

const works = new Map()
const drafts = new Map()

export const format = {
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
	})
}

export const get = {
	work: (id) => works.get(id || current.work),
	draft: (id) => drafts.get(id || current.draft)
}

export const set = {
	work: (id, title) => works.set(id, format.work(title)),
	draft: (id) => drafts.set(id, format.draft())
}
