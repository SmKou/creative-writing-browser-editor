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
const end_action = (ipt) => {
	state.last_key = ""
	state.shifted = true
	ipt.focus()
}

const ipt = document.createElement("textarea")
ipt.id = "ipt"
ipt.addEventListener("keydown", evt => {
	if (evt.key == "Backspace" && !evt.target.value) {
		evt.preventDefault()
		// Undo: use of backspace between sentences, paragraphs, and sections
		evt.target.focus()
	}
	if (!action_keys.includes(evt.key)) {
		state.last_key = evt.key
		return;
	}
	const user_input = evt.target.value.split("\n")[0]
	if (state.end_trigger.includes(evt.key)) {
		if (state.end_quote) {
			if (state.end_marks.includes(state.last_key)) {
				controller.end_trigger(user_input, evt.target)
				end_action(evt.target)
				return;
			}
			else
				state.end_quote = false
		}
		state.last_key = evt.key
		return;
	}
	if (state.end_marks.includes(evt.key)) {
		if (!state.end_quote)
			state.end_quote = true
		state.last_key = evt.key
		return;
	}
	if (evt.key == "Enter") {
		if (!user_input) {
			controller.enter()
		} // "Enter" with no txt: new section
		else {
			controller.end_mark_enter(user_input, evt.target)
		} // "Enter" with txt: new paragraph
		end_action(evt.target)
		return;
	}
	const [cmd, ...args] = user_input.split(" ")
	switch (cmd) {
		case "#":
			controller.create(`work ${args.join(" ")}`, evt.target)
			break;
		case "##":
			controller.create(`chapter ${args.join(" ")}`, evt.target)
			break;
		case "###":
			controller.enter(args)
			break; // new section
		case "create":
			controller.create(args.join(" "), evt.target)
			break;
		/*
		case "add":
			break;
		case "insert":
		case "ins":
			break;
		case "name":
		case "rename":
		case "nm":
			break;
		case "move":
		case "mv":
			break;
		case "remove":
		case "rm":
			break;
		case "record":
		case "rcd":
			break;
		*/
		default:
			console.error("unspecified command entered")
	}
	end_action(evt.target)
})
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
