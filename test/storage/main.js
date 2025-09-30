
let selected = {}
const data = {
	"abc": { title: "Alphabet", drafts: [], current: "", history: "a0b1-y1" },
	"xyz": { title: "Gen Z", drafts: [], current: "", history: "d2f3-y2" },
	"f00": { title: "Colors of the Rainbow", drafts: [], curernt: "", history: "n32n-y3" },
	"a11": { title: "", drafts: [], current: "", history: "1234-y4" }
}
const ipt = document.querySelector("input")
const database = new Worker("data.js")
database.postMessage({ action: "open" })

ipt.addEventListener("change", evt => {
	const input = evt.target.value
	const [cmd, ...args] = input.split(" ")
	switch (cmd) {
		case "all":
			database.postMessage({
				action: "get-all",
				store: "works",
				only: ["id", "title"]
			})
			console.log("main sent")
			break;
		case "get":
			database.postMessage({
				action: "get",
				store: "works",
				type: "id",
				id: args
			})
			break;
		case "add":
			if (args) {
				database.postMessage({ action: "add", store: "works", data: args })
				return;
			}
			const ids = Object.keys(data)
			const id = ids[Math.floor(Math.random() * ids.length)]
			const item = data[id]
			database.postMessage({
				action: "add",
				store: "works",
				data: { id, ...item }
			})
			break;
	}
})

database.onmessage = function DatasbaseResponse(e) {
	console.log("main received", e.data)
	if (e.data.success) {
		console.log(e.data.success)
		console.log("data", e.data.data || "")
		console.log("res", e.data.res || "")
	}
	else if (e.data.error) {
		console.error(e.data.error)
	}
}
