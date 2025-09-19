/* UI Management
 * Case: User writes sentence, press end trigger ("| ) after end mark (.|?|!)
 * - create new sentence
 * - add txt to .current sentence and move .current to new sentence
 * - last.after(new sentence)
 *
 * Case: User writes sentence, press Enter after end mark (.|?|!)
 * - create new paragraph
 * - create new sentence
 * - add txt to .current sentence and move .current to new sentence
 * - new paragraph.apend(new sentence)
 * - last.after(new paragraph)
 *
 * Case: User press Enter after end mark (.|?|!)
 * - create new section (user input: title)
 * - create new paragraph
 * - remove .current&#ipt and new paragraph.append(.current&#ipt)
 * - (if no sections yet in chapter but were paragraphs: create prologue section)
 * - new section.append(new paragraph)
 * - last.after(new section)
 *
 * loc: d-c-n-p-s = segment[idx + 1]
 *
 * Case: User type command and input, press Enter
 * - Case: command contains "#"
 *   - #: new work
 *   - ##: new chapter
 *   - ###: new section
 * - Case: add <loc>
 *   default: last sentence of last paragraph (of last section)
 * - Case: ins <loc>
 *   default: first sentence of first paragraph (of first section)
 * - Case: mv <loc> -a|-i <loc>
 * - Case: rm <loc> -f <feature> <feature-keyword>
 * - Case: rn <[work|chapter|section]> <title>
 */

const make = e => document.createElement(e)
const text = e => document.createTextNode(e)
const query = e => document.querySelector(e)

const selected = {
	draft: "",
	chapter: "",
	section: "",
	paragraph: "",
	sentence: ""
}

const locate = (addr) => {}

const sentence = {
	create: (id) => {
		const sentence = make("li")
		sentence.id = id
		sentence.setAttribute("class", "current")
		return sentence
	},
	move: {
		current: (next, txt, ipt) => {
			const current = query(".current")
			current.classList.remove("current")
			ipt.remove()
			if (txt)
				current.append(txt)
			next.classList.add("current")
			next.append(ipt)
		},
		ipt: (level, ent, pos) => {
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
			}
		}
	}
}

const paragraph = {
	create: (id) => {
		const paragraph = make("li")
		paragraph.id = id
		paragraph.setAttribute("class", "paragraph")
		paragraph.append(make("ol"))
		return paragraph
	},
	move: {
		after: (id, paragraph) => {
			paragraph.remove()
			query("#" + id).after(paragraph)
		},
		before: (id, paragraph) => {
			paragraph.remove()
			query("#" + id).before (paragraph)
		},
		into: (id, paragraph) => {
			paragraph.remove()
			query("#" + id).append(paragraph)
		}
	}
}

export const create = {
	sentence: (id) => {

	},
	paragraph: ,
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
	work: (title) => query("h1").innerHTML = title
}

export const load = (ipt) => {
	create.work("Untitled 1")
	const chapter = create.chapter("Untitled chapter")
	const section = create.section()
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
	query("article").replaceChildren(...chapter)
	ipt.focus()
}
