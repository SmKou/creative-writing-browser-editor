import 'animate.css'
import './style.css'

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
		if (state.end_quote) {
			if (state.end_marks.includes(state.last_key)) {

				evt.target.focus()
				state.shifted = true
				return;
			} // end of sentence: new sentence
			else { state.end_quote = false }
		}
		state.last_key = evt.key
		return;
	}

	if (state.end_marks.includes(evt.key)) {
		if (!state.end_quote) { state.end_quote = true }
		state.last_key = evt.key
		return;
	}

	if (!user_input) {

	} // "Enter" with no txt: new section

	if (evt.key == "Enter") {

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
			// does command exist?
	}
	state.last_key = ""
	state.shifted = true
	evt.target.focus()
}

const ipt = document.createElement("textarea")
ipt.id = "ipt"
ipt.addEventListener("keydown", handle_type)
ipt.addEventListener("keyup", evt => {
	console.log("keyup", state.shifted)
	if (state.shifted) {
		evt.target.value = ""
		state.shifted = false
	}
	if (evt.key == "Backspace")
		evt.preventDefault()
})
document.addEventListener("click", () => ipt.focus())
load(ipt)
