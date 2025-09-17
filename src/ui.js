import {v4 as uid } from 'uuid'

export const load = [
	(ipt) => {
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
	},
	(ipt) => {
		document.querySelector("h1").innerHTML = "Untitled 1"

		const h2 = document.createElement("h2")
		h2.append(document.createTextNode("Untitled Chapter"))
		const section = document.createElement("section")
		section.id = uid()
		const h3 = document.createElement("h3")
		h3.append(document.createTextNode("1: Untitled section"))
		const p_addr = document.createElement("div")
		p_addr.append(document.createTextNode("n1-p1"))
		const p = document.createElement("p")
		p.id = uid()
		const sentence = document.createElement("span")
		sentence.id = uid()
		sentence.setAttribute("class", "sentence current")
		sentence.append(ipt)

		p.append(sentence)
		section.append(h3)
		section.append(p_addr)
		section.append(p)
		document.querySelector("article").replaceChildren(h2, section)
		ipt.focus()
	}
]
