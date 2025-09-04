import { v4 as uuid } from 'uuid'
import 'animate.css'
import './style.css'

console.log(uuid())

document.addEventListener("click", () => document.getElementById("cmd-ln").focus())

document.getElementById("cmd-ln").addEventListener("keydown", e => {
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
