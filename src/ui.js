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
		const sentence_n = document.createElement("span")
		sentence_n.setAttribute("class", "s")
		sentence_n.append(document.createTextNode(1))
		const sentence = document.createElement("span")
		sentence.id = uid()
		sentence.setAttribute("class", "sentence current")
		sentence.append(sentence_n)
		sentence.append(ipt)

		p.append(sentence)
		section.append(h3)
		section.append(p_addr)
		section.append(p)
		document.querySelector("article").replaceChildren(h2, section)
		ipt.focus()
	}
]

export const create = {
	sentence: [
		(txt, ipt) => {
			ipt.remove()
			const current = document.querySelector(".current")
			current.classList.remove("current")
			current.append(document.createTextNode(txt))
			const sentence = document.createElement("li")
			sentence.id = uid()
			sentence.setAttribute("class", "current")
			sentence.append(ipt)
			current.after(sentence)
		},
		(txt, ipt, s) => {
			ipt.remove()
			const current = document.querySelector(".current")
			current.classList.remove("current")
			current.append(document.createTextNode(txt))


			const sentence_content = document.createElement("span")
			sentence_content.append(document.createTextNode(side))
			const sentence_end = document.createElement("span")
			sentence_end.setAttribute("class", "sentence-end")
			const sentence_n = document.createElement("span")
			sentence_n.setAttribute("class", "sentence-n")
			sentence_n.append(document.createTextNode(s))
			sentence_end.append(sentence_n)
			const end_mark = document.createElement("span")
			end_mark.append(document.createTextNode(end))
			sentence_end.append(end_mark)
			current.append(side)
			current.append(sentence_end)

			const space = document.createElement("span")
			space.innerHTML = "&nbsp;"

			const sentence = document.createElement("span")
			sentence.id = uid()
			sentence.setAttribute("class", "sentence current")
			sentence.append(ipt)
			current.after(space)
			space.after(sentence)
		}
	]
}
