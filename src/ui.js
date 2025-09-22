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
	load(data, ipt) {
		name.work(data.work.title)
		const chapter = create.chapter(data.chapter.title)
		if (data.toc) {
			const decompose = (level, toc_pointer = data.toc, ctt_pointer = data.ctt) => {
				switch (level) {
					case "section":
						const section_ids = Object.keys(toc_pointer)
						const chapter_sections = []
						section_ids.forEach((n_id, idx) => {
							const section = create.section(n-id)
							const paragraphs = decompose("paragraph", toc_pointer[n_id], ctt_pointer[idx])
							for (const paragraph of paragraphs)
								section.lastChild.append(paragraph)
							chapter_sections.push(section)
						})
						return chapter_sections
					case "paragraph":
						const paragraph_ids = Object.keys(toc_pointer)
						const container_paragraphs = []
						paragraph_ids.forEach((p_id, idx) => {
							const paragraph = create.paragraph(p_id)
							const sentences = decompose("sentence", toc_pointer[p_id], ctt_pointer[idx])
							for (const sentence of sentences)
								paragraph.append(sentence)
							container_paragraphs.push(paragraph)
						})
						return container_paragraphs
					case "sentence":
						const sentence_ids = toc_pointer
						const paragraph_sentences = []
						sentence_ids.forEach((s_id) => {
							const sentence = create.sentence(s_id)
							sentence.append(text(ctt_pointer))
							paragraph_sentences.push(sentence)
						})
						return paragraph_sentences
				}
			}
			const containers = decompose(data.ctt[0][0][0] ? "section" : "paragraph")
			for (const container of containers)
				chapter.at(-1).append(container)
		}
		else {
			const section = create.section(data.section.id, data.section.title)
			const paragraph = create.paragraph(data.paragraph.id)
			const sentence = create.sentence(data.sentence.id)
			sentence.append(ipt)
			paragraph.lastChild.append(sentence)
			section.lastChild.append(paragraph)
			chapter.at(-1).append(section)
		}
		query("article").replaceChildren(...chapter)
		ipt.focus()
	},
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
	enter(section_id, section_title, paragraph_id, ipt) {
		const new_section = create.section(section_id, section_title)
		const new_paragraph = create.paragraph(paragraph_id)
		move.sentence.ipt("paragraph", new_paragraph)
		new_section.append(new_paragraph)
		ipt.focus()
	},

}
