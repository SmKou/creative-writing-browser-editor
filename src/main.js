import 'animate.css'
import './style.css'

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
			const is_command = ipt.value.split(" ")[0]
			console.log("enter command or new segment")
			break;
	}
})
