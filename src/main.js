import editor from 'editor'
import 'animate.css'
import './style.css'

const state = {
	last_key: "",
	end_quote: false,
	end_marks: [".", "?", "!"],
	end_trigger: [" ", "\""],
	shifted: false,
	stash: {},
	// orientation and feature
	left: "",
	right: "",
	main: "",
	side: ""
}
const action_keys = [...state.end_marks, ...state.end_trigger, "Enter"]
const end_action = (ipt) => {
	state.last_key = ""
	state.shifted = true
	ipt.focus()
}

const ui = {
	focus(feature, is_side = false) {
		// default: main
		// if feature:
		// --> is_side: set side to feature
		// --> else: set main to feature
		if (feature) {
			const view = is_side ? "side" : "main"
			const side = state.left == state[view]
				? "left"
				: "right"
			const elm = document.querySelector(`.${view}.${side}`)
			elm.remove()
			const last_feature = state[view] || state[side]
			if (!state.stash[last_feature])
				state.stash[last_feature] = []
			state.stash[last_feature].push(elm)
			state[view] = feature
			state[side] = feature
			// load feature
		}
		document.requestFullscreen()
	},
	main: {},
	side: {},
	split: {},
	open: {},
	close: {},
	left: {},
	right: {}
}
const cmds = Object.keys(ui)

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
	console.log(user_input)
	if (state.end_trigger.includes(evt.key)) {
		if (state.end_quote) {
			if (state.end_marks.includes(state.last_key)) {
				// create sentence
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
			const [cmd, ...args] = user_input.split(" ")
			if (cmds.includes(cmd))
				cmds[cmd](args)
			else if (editor.cmds.includes(cmd))
				editor[cmd](args)
			else {
				// commit sentence
				// create paragraph
			}
		} // "Enter" with txt: new paragraph
		end_action(evt.target)
		return;
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
document.querySelector("article.main").append(ipt)
