// import editor from 'editor'
import { create, commit } from '../_storage/test/simple'
import 'animate.css'
import './style.css'


const work = (title) => document.querySelector("h1").innerHTML = title
const draft = () => {
	const article = document.querySelector("article")
	while (article.firstChild)
		article.firstChild.remove()
}
const chapter = (title) => {
	const h2 = document.createElement("h2")
	h2.append(document.createTextNode(title))
	return h2
}
const section = (id, title, pre_section) => {
	const h3 = document.createElement("h3")
	h3.append(document.createTextNode(title))
	const section = document.createElement("ol")
	section.id = id
	section.setAttribute("class", "section")
	if (pre_section) {
		document.querySelectorAll(".paragraph").forEach(paragraph => {
			paragraph.remove()
			const li = document.createElement("li")
			li.append(paragraph)
			section.append(li)
		})
	}
	else {
		const li = document.createElement("li")
		section.append(li)
	}
	h3.after(section)
	return h3
}
const paragraph = (id) => {
	const paragraph = document.createElement("ol")
	paragraph.id = id
	paragraph.setAttribute("class", "paragraph")
	return paragraph
}
const sentence = (id, ipt) => {
	const li = document.createElement("li")
	li.id = id
	li.setAttribute("class", "current")
	li.append(ipt)
	return li
}

const load = (ipt, title = "") => {
	const work_title = create.work(title)
	work(work_title)
	create.draft()
	draft()
	const chapter_title = create.chapter("")
	document.querySelector("article").append(chapter(chapter_title))
	const paragraph_id = create.paragraph()
	document.querySelector("article").append(paragraph(paragraph_id))
	const sentence_id = create.sentence()
	document.getElementById(paragraph_id).append(sentence(sentence_id, ipt))
}

const state = {
	last_key: "",
	end_quote: false,
	end_marks: [".", "?", "!"],
	end_trigger: [" ", "\""],
	shifted: false
}
const action_keys = [...state.end_marks, ...state.end_trigger, "Enter"]

const handle_type = evt => {
	if (evt.key == "Backspace" && !evt.target.value) {
		evt.preventDefault()
		// back
		evt.target.focus()
	}

	if (!action_keys.includes(evt.key)) {
		state.last_key = evt.key
		return;
	} // non-action key: continue writing

	const user_input = evt.target.value.split("\n")[0]
	if (state.end_trigger.includes(evt.key)) {
		if (state.end_quote)
			if (state.end_marks.includes(state.last_key)) {
				evt.target.remove()
				const { last, s } = create.sentence()
				const sentence = sentence(s.id, evt.target)
				document.getElementById(last).after(sentence)
				return;
			}
			else
				state.end_quote = false
				state.last_key = evt.key
				return;
	}

	if (state.end_marks.includes(evt.key)) {
		if (!state.end_quote)
			state.end_quote = true
			state.last_key = evt.key
			return;
	}

	if (!user_input) {
		evt.target.remove()
		const res = commit.section()
		if (res) {
			const pre_section = section(res, "", true)
			document.querySelector("h2").after(pre_section)
		}
		const sentences = create.sentence()
		const s = sentence(sentences.n.id, evt.target)
		const paragraphs = create.paragraph()
		const p = paragraph(paragraphs.p.id)
		p.append(s)
		const sections = create.section()
		const n = section(sections.n.id, sections.n.title)
		n.append(p)
		if (sections.last)
			document.getElementById(sections.last).after(n)
		else
			document.querySelector("h2").after(n)
	} // "Enter" with no txt: new section

	if (evt.key == "Enter") {
		evt.target.remove()
		document.querySelector(".current").remove()
		const sentences = create.sentence()
		const s = sentence(sentences.s.id, evt.target)
		const paragraphs = create.paragraph()
		const p = paragraph(paragraphs.p.id)
		p.append(s)
		document.getElementById(paragraphs.last).after(p)
	} // "Enter" with txt: new paragraph

	const cmd = user_input.split(" ")[0]
	switch (cmd) {
		case "#":
			const work_title = create.work(user_input.slice(2))
			work(work_title)
			create.draft()
			draft()
			break;
		case "##":
			evt.target.remove()
			commit.chapter()
			const chapter_title = create.chapter(user_input.slice(3))
			const h = chapter(chapter_title)
			const sen = sentence(sentence.create().id, evt.target)
			const pgh = paragraph(paragraph.create().id)
			pgh.append(sen)
			h.after(pgh)
			break;
		case "###":
			evt.target.remove()
			const res = commit.section()
			if (res) {
				const pre_section = section(res, "", true)
				document.querySelector("h2").after(pre_section)
			}
			const sentences = create.sentence()
			const s = sentence(sentences.n.id, evt.target)
			const paragraphs = create.paragraph()
			const p = paragraph(paragraphs.p.id)
			p.append(s)
			const sections = create.section(user_input.slice(4))
			const n = section(sections.n.id, sections.n.title)
			n.append(p)
			if (sections.last)
				document.getElementById(sections.last).after(n)
			else
				document.querySelector("h2").after(n)
			break;
		default:
			if (editor.has(cmd))
				editor[cmd]()
	}
	state.last_key = ""
	state.shifted = true
	evt.target.focus()
}

const ipt = document.createElement("textarea")
ipt.id = "ipt"
ipt.addEventListener("keydown", handle_type)
ipt.addEventListener("keyup", evt => {
	if (state.shifted) {
		evt.target.value = ""
		state.shifted = false
	}
	if (evt.key == "Backspace")
		evt.preventDefault()
})
document.addEventListener("click", () => ipt.focus())
load(ipt)
