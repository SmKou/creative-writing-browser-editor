import {v4 as uid } from 'uuid'

const make = e => document.createElement(e)
const text = e => document.createTextNode(e)
const select = e => document.querySelector(e)
const mode = true

const current = {
	section: "",
	paragraph: "",
	sentence: ""
}

export const create = {
	sentence: (id, ipt) => {
		const current = document.querySelector(".current")
		if (current) {
			current.classList.remove("current")
			ipt.remove()
		}
		const sentence = mode ? make("li") : make("span")
		sentence.id = id
		sentence.setAttribute("class", "current")
		if (mode)
			sentence.classList.add("sentence")
		sentence.append(ipt)
		return sentence
	},
	paragraph: (id) => {
		const paragraph = mode ? make("li") : make("p")
		paragraph.id = id
		if (mode) {
			paragraph.setAttribute("class", "paragraph")
			const lst_p = make("ol")
			paragraph.append(lst_p)
			return { paragraph, lst_p }
		}
		return { paragraph }
	},
	section: (id, title) => {
		const section = mode ? make("li") : make("section")
		section.id = id
		if (mode)
			section.setAttribute("class", "section")
		const section_title = make("h3")
		section_title.append(text(title))
		section.append(section_title)
		if (mode) {
			const lst_n = make("ol")
			section.append(lst_n)
			return { section, lst_n }
		}
		return { section }
	},
	chapter: (title) => {
		const children = []
		const chapter_title = make("h2")
		chapter_title.append(text(title))
		children.push(chapter_title)
		if (mode) {
			const chapter = make("ol")
			chapter.setAttribute("class", "chapter")
			children.push(chapter)
		}
		return children
	},
	work: (title) => select("h1").innerHTML = title
}

export const clear = {
	work: () => select("article").replaceChildren()
}

export const move = {
	sentence: (paragraph) => {
		const sentence = document.querySelector(".current")
		sentence.remove()
		paragraph.append(sentence)
	}
}

export const commit = {
	sentence: (txt) => select(".current").append(text(txt))
}

export const load = (ipt) => {
	create.work("Untitled 1")
	const chapter = create.chapter("Untitled chapter")
	const { section, lst_n } = create.section(uid(), "Untitled section")
	const { paragraph, lst_p } = create.paragraph(uid())
	const sentence = create.sentence(uid(), ipt)

	if (mode) {
		lst_p.append(sentence)
		lst_n.append(paragraph)
	}
	else {
		paragraph.append(sentence)
		section.append(paragraph)
	}
	chapter.at(-1).append(section)
	select("article").replaceChildren(...chapter)
	ipt.focus()
}
