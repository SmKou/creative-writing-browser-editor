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
				controller.end_trigger(user_input, evt.target)
				state.shifted = true
				evt.target.focus()
				return;
			} // end of sentence: new sentence
			else { state.end_quote = false }
		}
		state.last_key = evt.key
		return;
	}

	if (state.end_marks.includes(evt.key)) {
		if (!state.end_quote) {
			state.end_quote = true
		}
		state.last_key = evt.key
		return;
	}

	if (!user_input) {
		controller.enter()
	} // "Enter" with no txt: new section

	if (evt.key == "Enter") {
		controller.end_mark_enter(user_input, evt.target)
		state.last_key = ""
		state.shifted = true
		evt.target.focus()
		return;
	} // "Enter" with txt: new paragraph

	const [cmd, ...args] = user_input.split(" ")
	switch (cmd) {
		case "#":
			controller.create(`work ${args.join(" ")}`, evt.target)
			break;	// new work
		case "##":
			controller.create(`chapter ${args.join(" ")}`, evt.target)
			break;	// new chapter
		case "###":
			controller.enter(args)
			break;	// new section
		case "create":
			controller.create(args.join(" "), evt.target)
			break;
		default:
			console.log("shouldn't be")
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
		state.shifted = false
		evt.target.value = ""
		evt.target.focus()
	}
	if (evt.key == "Backspace")
		evt.preventDefault()
})
document.addEventListener("click", () => ipt.focus())
controller.init(ipt)
