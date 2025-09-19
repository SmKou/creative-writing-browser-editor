const make = e => document.createElement(e)
const text = e => document.createTextNode(e)
const select = e => document.querySelector(e)

export const create = {
	sentence: (id) => {
		const sentence = make("li")
		sentence.id = id
		sentence.setAttribute("class", "current")
		return sentence
	},
	paragraph: (id) => {
		const paragraph = make("li")
		paragraph.id = id
		paragraph.setAttribute("class", "paragraph")
		paragraph.append(make("ol"))
		return paragraph
	},
	section: (id, title) => {
		const section = make("li")
		section.id = id
		section.setAttribute("class", "section")
		const h3 = make("h3")
		h3.append(text(title))
		section.append(h3)
		section.append(make("ol"))
		return section
	},
	chapter: (title) => {
		const h2 = make("h2")
		h2.append(text(title))
		const chapter = make("ol")
		chapter.setAttribute("class", "chapter")
		return [h2, chapter]
	},
	work: (title) => select("h1").innerHTML = title
}

export const move = {
	sentence: {
		current: (next, txt, ipt) => {
			const current = select(".current")
			current.classList.remove("current")
			ipt.remove()
			if (txt)
				current.append(txt)
			next.classList.add("current")
			next.append(ipt)
		},
		ipt: (level, ent, pos) => {
			const current = select(".current")
			current.remove()
			switch (level) {
				case "paragraph":
					ent.append(current)
					break;
				case "sentence":
					switch (pos) {
						case "after":
							ent.after(current)
							break;
						case "before":
							ent.before(current)
							break;
					}
			}
		}
	}
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
