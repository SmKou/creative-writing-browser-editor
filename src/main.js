import 'animate.css'
import './style.css'

const ORIENTATIONS = (user_input) => {
	if (!user_input)
		return false
	const opts = [
		"focusview",
		"main-none",
		"main-aside",
		"splitscreen"
	]
	if (opts.includes(user_input))
		return true
	const opt = opts.filter(opt => opt.includes(user_input))
	if (!opts.length || opts.length > 1)
		return false
	return opt[0]
}
const FEATURES = (user_input) => {
	if (!user_input)
		return false
	const opts = [
		"dashboard",
		"work",
		"draft",
		"outline",
		"journal",
		"history",
		"timeline",
		"profile-character-people-place",
		"language-lexicon-glossary-grammar",
		"environment-world-setting",
		"map-geography"
	]
	const opt = opts.filter(opt => opt.includes(user_input))
	if (!opts.length || opts.length > 1)
		return false
	return opt[0]
}

const state = {
	last_key: "",
	end_quote: false,
	end_marks: [".", "?", "!"],
	end_trigger: [" ", "\""],
	shifted: false,
	// feature
	left: "",
	right: "",
	focus: true
}
const action_keys = [...state.end_marks, ...state.end_trigger, "Enter"]
const end_action = (ipt) => {
	state.last_key = ""
	state.shifted = true
	ipt.focus()
}

const body = document.querySelector("body")
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
		} // "Enter" with no txt: new section
		else {
		} // "Enter" with txt: new paragraph
		end_action(evt.target)
		return;
	}

	const [cmd, ...args] = user_input.split(" ")
	let orientation, feature;
	switch (cmd) {
		case "view":
		case "vw":
			orientation = ORIENTATIONS(args)
			document.querySelector("main").setAttribute("class", orientation)
			if (orientation == "focusview")
				document.requestFullscreen()
			break;
		case "left":
		case "lft":
			feature = FEATURES(args)
			break;
		case "right":
		case "rgh":
			feature = FEATURES(args)
			break;
		case "open":
		case "opn":
			feature = FEATURES(args)
			break;
		case "close":
		case "cls":
			feature = FEATURES(args)
			break;
	}
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
document.querySelector("article").append(ipt)
