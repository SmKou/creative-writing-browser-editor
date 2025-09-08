// import editor from 'editor'
import { default as test } from '../_storage/test/test_editor'
import 'animate.css'
import './style.css'

const ipt = document.getElementById("cmd-ln")

document.addEventListener("click", () => ipt.focus())

ipt.addEventListener("keydown", e => {
	if (e.key != "Enter")
		return;
	const user_input = ipt.value
	if (!user_input) {
		// todo: new paragraph
	}

	const cmd = user_input.split(" ")[0]
	if (test.has(cmd)) {
		// todo: execute command
	}
	else if (cmd[0] === "#") {
		switch (cmd.length) {
			case 1:
				// todo: rename
				break;
			case 2:
				// todo: new chapter
				break;
			case 3:
				// todo: new section
		}
	}
	else {
		test.fn.create.sentence(user_input)(ipt, document.querySelector(".current"))
	}
})

test.fn.load()
