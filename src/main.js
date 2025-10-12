// import editor from 'editor'
import 'animate.css'
import './style.css'

const FEATURES = ([ft, subft]) => {
	const cmd_lst = {
		"DASHBOARD": ["dbd", "dash", "dashboard"],
		"WORK": ["wk", "work", "prj", "project"],
		"DRAFT": ["dft", "drft", "draft"],
		"OUTLINE": ["otln", "outline"],
		"JOURNAL": ["jrl", "jrnl", "journal"],
		"HISTORY": ["hst", "hsty", "history"],
		"TIMELINE": ["tmln", "timeline"],
		"PROFILE": ["prf", "prfl", "profile", "char", "character", "ppl", "people", "plc", "place"],
		// consider: person's language: slang | dialect
		"LANGUAGE": ["lng", "lang", "language"],
		"SETTING": ["env", "environment", "wrld", "world", "setting"],
		"MAP": ["mp", "map", "geo", "geography"]
	}
	const cmd_fts = Object.keys(cmd_lst)
	const feature = cmd_fts.filter(cmd_ft => cmd_lst[cmd_ft].includes(ft))
	if (!feature.length)
		return false
	if (subft) {
		if (feature == "MAP" && ["dst", "dist", "distance"].includes(subft)) 
			return [feature, "DISTANCE"]
		if (feature == "LANGUAGE") {
			const lng_lst = {
				"LEXICON": ["lxc", "lexi", "lexicon", "vcb", "vocab", "dct", "dict", "diction"],
				"GLOSSARY": ["gls", "glos", "glossary", "idx", "index"],
				"GRAMMAR": ["grm", "gram", "grammar", "stx", "sntx", "syntax"]
			}
			const lng_fts = Object.keys(lng_st)
			const sub_feature = lng_fts.filter(lng_ft => lng_lst[lng_ft].includes(subft))
			return [feature, sub_feature]
		}
		const sub_feature = cmd_fts.filter(cmd_ft => cmd_lst[cmd_ft].includes(subft))
		return [feature, sub_feature]
	}
	return [feature]
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
	switch (cmd) {
		case "left":
		case "lft":
			break;
		case "right":
		case "rgh":
			break;
		case "open":
		case "opn":
			break;
		case "close":
		case "cls":
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
