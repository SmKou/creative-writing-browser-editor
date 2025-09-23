const make = e => document.createElement(e)
const text = e => document.createTextNode(e)
const query = e => document.querySelector(e)

/* ------------------------------------------------------- UI actions */

const create = {
	sentence(id) {
		const sentence = make("li")
		sentence.id = id
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
			ipt.remove()
			const current = query(".current")
			if (current) {
				current.classList.remove("current")
				current.append(text(txt) || "")
			}
			next.classList.add("current")
			next.append(ipt)
			return current
		}, // move the .current class
		ipt(level, ent, pos) {
			const current = query(".current")
			switch (level) {
				case "paragraph":
					const p = query("li.paragraph:has(.current) ol")
					if (p && !p.children.length)
						p.remove()
					current.remove()
					ent.append(current)
					break;
				case "sentence":
					current.remove()
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
		} // move the ipt element's container'
	},
	paragraph: {}
}

const name = {
	work(title) { query("h1").innerHTML = title },
	chapter(title) { query("h2").innerHTML = title },
	section(id, title) { query(`#${id} h3`).innerHTML = title }
}

/* ------------------------------------------------------- UI commands */

const load = {
	decompose(level, toc_pointer, ctt_pointer) {
		switch (level) {
			case "section":
				const section_ids = Object.keys(toc_pointer)
				const ns = data.ns
				const chapter_sections = []
				section_ids.forEach((n_id, idx) => {
					const section = create.section(n_id, ns[n_id])
					const paragraphs = this.decompose("paragraph", toc_pointer[n_id], ctt_pointer[idx])
					paragraphs.forEach(paragraph => section.lastChild.append(paragraph))
					chapter_sections.push(section)
				})
				return chapter_sections
			case "paragraph":
				const paragraph_ids = Object.keys(toc_pointer)
				const container_paragraphs = []
				paragraph_ids.forEach((p_id, idx) => {
					const paragraph = create.paragraph(p_id)
					const sentences = this.decompose("sentence", toc_pointer[p_id], ctt_pointer[idx])
					sentences.forEach(sentence => paragraph.lastChild.append(sentence))
					container_paragraphs.push(paragraph)
				})
				return container_paragraphs
			case "sentence":
				const sentence_ids = toc_pointer
				const paragraph_sentences = []
				sentence_ids.forEach((s_id, idx) => {
					const sentence = create.sentence(s_id, false)
					sentence.append(text(ctt_pointer[idx]))
					paragraph_sentences.push(sentence)
				})
				return paragraph_sentences
		}
	},
	last_session(data, ipt) {
		name.work()
		const chapter = create.chapter(data.chapter.title)
		if (data.toc) {
			// assuming sections by default (diff: data depth)
			const containers = this.decompose("section", data.toc, data.ctt)
			containers.forEach(container => chapter.at(-1).append(container))
		}
		else {
			const section = create.section(data.section.id, data.section.title)
			const paragraph = create.paragraph(data.paragraph.id)
			const sentence = create.sentence(data.sentence.id)
			move.sentence.current(sentence, "", ipt)
			paragraph.lastChild.append(sentence)
			section.lastChild.append(paragraph)
			chapter.at(-1).append(section)
		}
		query("article").replaceChildren(...chapter)
		ipt.focus()
	}
}

export default {
	load,
	end_trigger(sentence_id, txt, ipt) {
		const sentence = create.sentence(sentence_id)
		const current = move.sentence.current(sentence, txt, ipt)
		current.after(sentence)
	},
	end_mark_enter(paragraph_id, sentence_id, txt, ipt) {
		const paragraph = create.paragraph(paragraph_id)
		const sentence = create.sentence(sentence_id)
		const current = query(".paragraph:has(.current)")
		move.sentence.current(sentence, txt, ipt)
		paragraph.lastChild.append(sentence)
		current.after(paragraph)
	},
	enter(section_id, section_title, is_empty, paragraph_id) {
		const new_section = create.section(section_id, section_title)
		if (is_empty) {
			move.sentence.ipt("paragraph", new_section.lastChild)
		}
		else {
			const new_paragraph = create.paragraph(paragraph_id)
			move.paragraph.ipt()
		}
		query(".chapter").append(new_section)
	},
	create: {
		chapter(chapter_title, section_id, section_title, paragraph_id, sentence_id, ipt) {
			const chapter = create.chapter(chapter_title)
			const section = create.section(section_id, section_title)
			const paragraph = create.paragraph(paragraph_id)
			const sentence = create.sentence(sentence_id)
			move.sentence.current(sentence, "", ipt)
			paragraph.lastChild.append(sentence)
			section.lastChild.append(paragraph)
			chapter.at(-1).append(section)
			query("article").replaceChildren(...chapter)
		},
		draft(data, ipt) {
			this.chapter(
				data.chapter.title,
				data.section.id, data.section.title,
				data.paragraph.id,
				data.sentence.id,
				ipt
			)
		},
		work(data, ipt) {
			name.work(data.work.title)
			this.draft(data, ipt)
		}
	}
}
