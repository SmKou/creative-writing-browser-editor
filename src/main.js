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

// <span id="end-here" class="animate__animated animate__flash">&#10566;</span>
setTimeout(() => {
	const span = document.createElement("span")
	span.setAttribute("class", "animate__animated animate__flash")
	span.id = "end-here"
	span.innerHTML = "&#10566;"
	document.getElementById("start-here").after(span)

	setTimeout(() => {
		span.remove()
		document.querySelector("#start-here + span").after(span)
	}, 1000)
}, 3000)
