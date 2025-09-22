import controller from './write'
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
				dom.end_triggered(user_input, evt.target)
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
		const current = document.querySelector(".section:has(.current)") || document.querySelector("section:has(.current)")
		const section = create.section(uid(), "untitled")
		const paragraph = create.paragraph(uid())
		move(paragraph)
		section.append(paragraph)
		current.after(section)
	} // "Enter" with no txt: new section

	if (evt.key == "Enter") {
		dim.enter.w_input(user_input, evt.target)
	} // "Enter" with txt: new paragraph

	const [cmd, ...args] = user_input.split(" ")
	const segs = {
		section: "",
		paragraph: "",
		sentence: ""
	}
	switch (cmd) {
		case "#":
			create.work(args)
			clear.work()
			break;
		case "##":
			const chapter = create.chapter(args)
			document.querySelector("article").replaceChildren(...chapter)
			segs.section = create.section(uid(), "")
			segs.paragraph = create.paragraph(uid())
			move.sentence(segs.paragraph)
			segs.section.append(segs.paragraph)
			chapter.at(-1).append(segs.section)
			break;	// new chapter
		case "###":
			const current = document.querySelector(".section:has(.current)") || document.querySelector("section:has(.current)")
			segs.section = create.section(uid(), args)
			segs.paragraph = create.paragraph(uid())
			segs.sentence = create.sentence(uid(), evt.target)
			segs.paragraph.append(segs.sentence)
			segs.section.append(segs.paragraph)
			current.after(segs.section)
			break;	// new section
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
	if (state.shifted) {
		evt.target.value = ""
		state.shifted = false
	}
	if (evt.key == "Backspace")
		evt.preventDefault()
})
document.addEventListener("click", () => ipt.focus())
controller.init(ipt)
