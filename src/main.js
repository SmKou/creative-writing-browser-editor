import editor from 'editor'
import 'animate.css'
import './style.css'

if (editor.has_last) {
	const load = editor.get_last
	document.querySelector("h1").innerHTML = load.work_title
	document.getElementById("draft-num").innerHTML = load.draft_n
}

document.addEventListener("click", () => document.getElementById("cmd-ln").focus())

const ipt = document.getElementById("cmd-ln")
ipt.addEventListener("keydown", e => {
	switch (e.key) {
		case ".":
		case "?":
		case "!":
			console.log("end sentence")
			break;
		case "Enter":
			console.log("enter command or new segment")
			break;
	}
})
