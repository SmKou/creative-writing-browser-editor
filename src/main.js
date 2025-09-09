// import editor from 'editor'
import { default as test } from '../_storage/test/simple'
import 'animate.css'
import './style.css'

const handle_type = evt => {
	if (evt.key == "Backspace" && !evt.target.value) {
		evt.preventDefault()
		test.back(evt.target)
		evt.target.focus()
	}
	if (evt.key != "Enter")
		return;
	const user_input = evt.target.value.split("\n")[0]
	const cmd = user_input.split(" ")[0]
	if (!user_input) {} // new paragraph
	else if (cmd[0] === "#") {}
	else if (test.has(cmd)) {}
	else {
		test.create.sentence(evt.target, user_input)
	} // new sentence
	evt.target.focus()
}

const ipt = document.createElement("textarea")
ipt.id = "ipt"
ipt.addEventListener("keydown", handle_type)
ipt.addEventListener("keyup", evt => {
	if (evt.key == "Enter")
		evt.target.value = ""
	if (evt.key == "Backspace")
		evt.preventDefault()
})
document.addEventListener("click", () => ipt.focus())

test.load(ipt)
