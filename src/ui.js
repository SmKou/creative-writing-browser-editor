import { temp_id } from "./write"

const make = e => document.createElement(e)
const text = e => document.createTextNode(e)
const query = e => document.querySelector(e)

const create = {
	sentence(id) {
		const sentence = make("li")
		sentence.id = id
		sentence.setAttribute("class", "current")
		return sentence
	},
	paragraph(id) {
		const paragraph = make("li")
		paragraph.id = id
		paragraph.setAttribute("class", "paragraph")
		paragraph.append(make("ol"))
		return paragraph
	},
	section(id, title) {
		const section = make("li")
		section.id = id
		section.setAttribute("class", "section")
		const h3 = make("h3")
		h3.append(text(title))
		section.append(h3)
		section.append(make("ol"))
		return section
	},
	chapter(title) {
		const h2 = make("h2")
		h2.append(text(title))
		const chapter = make("ol")
		chapter.setAttribute("class", "chapter")
		return [h2, chapter]
	}
}

const move = {
	sentence: {
		current(next, txt, ipt) {
			const current = query(".current")
			current.classList.remove("current")
			ipt.remove()
			if (txt)
				current.append(txt)
			next.classList.add("current")
			next.append(ipt)
		},
		ipt(level, ent, pos) {
			const current = query(".current")
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
					break;
			}
		}
	},
	paragraph: {},
	section: {
		has_pre_section: () =>
	}
}

const name = {
	work(title) {
		query("h1").innerHTML = title
	},
	chapter(title) {
		query("h2").innerHTML = title
	},
	section(id, title) {
		query(`#${id} h3`).innerHTML = title
	}
}

export default {
	end_trigger(sentence_id, txt, ipt) {
		const new_sentence = create.sentence(sentence_id)
		const current = move.sentence.current(new_sentence, txt, ipt)
		current.after(new_sentence)
		ipt.focus()
	},
	end_mark_enter(paragraph_id, sentence_id, txt, ipt) {
		const new_paragraph = create.paragraph(paragraph_id)
		const new_sentence = create.sentence(sentence_id)
		const current = query(".paragraph:has(.current)")
		move.sentence.current(new_sentence, txt, ipt)
		new_paragraph.append(new_sentence)
		current.after(new_paragraph)
		ipt.focus()
	},
	enter(section_id, section_title, paragraph_id, sentence_id, ipt) {

		const new_section = create.section(section_id, section_title)
		const new_paragraph = create.paragraph(paragraph_id)
		const current = query(".section:has(.current)")
		sentence.move.ipt("paragraph", new_paragraph)
		new_section.append(new_paragraph)
	}

	enter: {
		w_input: (txt,ipt) => {
			const current =
			const new_paragraph = paragraph.create(temp_id())
			const new_sentence = sentence.create(temp_id())
			sentence.move.current(new_sentence, txt, ipt)
			new_paragraph.append(new_sentence)
			current.after(new_paragraph)
			ipt.focus()
		},
		no_input: (title) => {
			section.check_and_transfer()
			const current = query(".section:has(.current)")
			const new_section = section.create(temp_id(), title)
			const new_paragraph =
		}
	}
}

export const load = (ipt) => {

	work.create("Untitled 1")
	const chapter_elms = chapter.create("Untitled chapter")
	const section_parent = section.create(temp_id(), "Untitled section")
	const paragraph_parent = paragraph.create(temp_id())
	const sentence_child = sentence.create(temp_id())
	sentence_child.append(ipt)
	paragraph_parent.lastChild.append(sentence_child)
	section_parent.lastChild.append(paragraph_parent)
	chapter_elms[1].append(section_parent)
	query("article").replaceChildren(...chapter_elms)
	ipt.focus()
}
