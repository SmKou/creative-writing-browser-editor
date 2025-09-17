import {v4 as uid } from 'uuid'

const mode = true
const current = {
	section: "",
	paragraph: "",
	sentence: ""
}

const load_lst = (ipt) => {
	document.querySelector("h1").innerHTML = "Untitled 1"

	const h2 = document.createElement("h2")
	h2.append(document.createTextNode("Untitled Chapter"))
	const chapter = document.createElement("ol")
	chapter.setAttribute("class", "chapter")
	const section = document.createElement("li")
	section.id = uid()
	section.setAttribute("class", "section")
	const h3 = document.createElement("h3")
	h3.append(document.createTextNode("Untitled Section"))
	const paragraphs = document.createElement("ol")
	const paragraph = document.createElement("li")
	paragraph.id = uid()
	paragraph.setAttribute("class", "paragraph")
	const p_addr = document.createElement("div")
	p_addr.append(document.createTextNode("n1-p1"))
	const sentences = document.createElement("ol")
	const sentence = document.createElement("li")
	sentence.id = uid()
	sentence.setAttribute("class", "current")
	sentence.append(ipt)

	sentences.append(sentence)
	paragraph.append(p_addr)
	paragraph.append(sentences)
	paragraphs.append(paragraph)
	section.append(h3)
	section.append(paragraphs)
	chapter.append(section)
	document.querySelector("article").replaceChildren(h2, chapter)
	ipt.focus()
}

const load_pgh = (ipt) => {
	document.querySelector("h1").innerHTML = "Untitled 1"

	const h2 = document.createElement("h2")
	h2.append(document.createTextNode("Untitled Chapter"))
	const section = document.createElement("section")
	section.id = uid()
	const h3 = document.createElement("h3")
	h3.append(document.createTextNode("Untitled section"))
	const p = document.createElement("p")
	p.id = uid()
	const sentence = document.createElement("span")
	sentence.id = uid()
	sentence.setAttribute("class", "sentence current")
	sentence.append(ipt)

	p.append(sentence)
	section.append(h3)
	section.append(p)
	document.querySelector("article").replaceChildren(h2, section)
	ipt.focus()
}

// add modes: require restructure - been using true: lst, false: pgh
export const load = [load_lst, load_pgh]

const create_sentence_lst = (id, ipt) => {
	const current = document.querySelector(".current")
	current.classList.remove("current")
	ipt.remove()
	const sentence = document.createElement("li")
	sentence.id = id
	sentence.setAttribute("class", "current")
	sentence.append(ipt)
	return sentence
}

const create_sentence_pgh = (id, ipt) => {
	const sentence = document.createElement("span")
	sentence.id = id
	sentence.setAttribute("class", "current sentence")
	sentence.append(ipt)
	return sentence
}

const cascade = ({
	level,
	section_id,
	section_title,
	paragraph_id,
	sentence_id,
	txt,
	ipt
}) => {
	const segments = {}
	switch (level) {
		case "section":
			segments.section = mode
			? document.createElement("li")
			: document.createElement("section")
			segments.section.id = section_id
			if (mode)
				segments.section.setAttribute("class", "section")
			const title = document.createElement("h3")
			title.append(document.createTextNode(section_title))
			segments.section.append(title)
			if (mode)
				segments.section.append(document.createElement("ol"))
		case "paragraph":
			segments.paragraph = mode
			? document.createElement("li")
			: document.createElement("p")
			segments.paragraph.id = paragraph_id
			if (mode) {
				segments.paragraph.setAttribute("class", "paragraph")
				segments.paragraph.append(document.createElement("ol"))
			}
		case "sentence":
			ipt.remove()

			segments.sentence = mode
			? document.createElement("li")
			: document.createElement("span")
			segments.sentence.id = sentence_id
			segments.sentence.setAttribute("class", "current")
			if (mode)
				segments.sentence.classList.add("sentence")
	}
}

// Situations:
// New sentence: sentence after last
// New paragraph: sentence appended to paragraph
// New section: sentence appended to paragraph
const create_sentence = ({ id, txt, ipt }) => {
	ipt.remove()
	const current = id
	? document.getElementById(id)
	: document.querySelector(".current")
	current.classList.remove("current")
	current.append(document.createTextNode(txt))
	const sentence = mode
	? document.createElement("li")
	: document.createElement("span")
	sentence.id = uid()
	sentence.setAttribute("class", "current")
	if (!mode)
		sentence.classList.add("sentence")
	current.after(sentence)
}

const create_paragraph = () => {
	const dest =
}

export const create = {
	sentence: (ipt) => {
		const current = document.querySelector(".current")
		current.classList.remove("current")
		ipt.remove()
		const sentence = mode
		? document.createElement("li")
		: document.createElement("span")
		sentence.id = uid()
		sentence.setAttribute("class", "current")
		if (!mode)
			sentence.classList.add("sentence")
		sentence.append(ipt)
		return sentence
	},
	paragraph:
}


