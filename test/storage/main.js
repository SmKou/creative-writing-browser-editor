
let selected = {}
let draft = []
const data = {
	"abc": { title: "Alphabet", drafts: [], current: "", history: "a0b1-y1" },
	"xyz": { title: "Gen Z", drafts: [], current: "", history: "d2f3-y2" },
	"f00": { title: "Colors of the Rainbow", drafts: [], current: "", history: "n32n-y3" },
	"a11": { title: "", drafts: [], current: "", history: "1234-y4" }
}
const create_work = (id, title) => ({ id, title, drafts: [], current: "", history: data.a11.history })
const create_draft = (id) => ({ id, sentences: [] })
const ipt = document.querySelector("input")
const database = new Worker("data.js")
database.postMessage({ action: "open" })

ipt.addEventListener("change", evt => {
	const input = evt.target.value
	const [cmd, ...args] = input.split(" ")
	switch (cmd) {
		case "work":
			console.log(selected.id, selected.title)
			break;
		case "draft":
			console.log(selected.current, selected.drafts)
			break;
		case "load":
			database.postMessage({
				action: "load",
				stores: ["works", "drafts"],
				ids: [selected.id, selected.current]
			})
		case "all":
			database.postMessage({
				action: "get-all",
				store: "works",
				only: ["id", "title"]
			})
			console.log("main sent")
			break;
		case "get":
			const work_id = args[0]
			database.postMessage({
				action: "get",
				store: "works",
				id: work_id
			})
			break;
		case "add":
			if (!args) {
				console.error("requires title to add a work")
				evt.target.value = ""
				return;
			}
			if (args[0] === "draft") {
				const draft_id = [
					String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					 String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					 String.fromCharCode(Math.floor(Math.random() * 26) + 97),
				].join("")
				if (!Object.keys(selected).length) {
					const id = [
						String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					 String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					 String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					].join("")
					selected = create_work(id, "")
				}
				selected.drafts.push(draft_id)
				selected.current = draft_id
				database.postMessage({
					action: "put",
					store: "works",
					data: selected
				})
				database.postMessage({
					action: "add",
					store: "drafts",
					data: create_draft(draft_id)
				})
			}
			else {
				const title = args.join(" ")
				const id = [
					String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					 String.fromCharCode(Math.floor(Math.random() * 26) + 97),
					 String.fromCharCode(Math.floor(Math.random() * 26) + 97),
				].join("")
				database.postMessage({
					action: "add",
					store: "works",
					data: create_work(id, title)
				})
			}
			break;
		case "del":
			database.postMessage({
				action: "del",
				store: "works",
				id: selected.id || args[0]
			})
			break;
		default:
			draft.push(input)
			database.postMessage({
				action: "put",
				store: "drafts",
				data: { id: selected.current, sentences: draft }
			})
	}
	evt.target.value = ""
})

database.onmessage = function DatasbaseResponse(e) {
	if (e.data.error) {
		console.error(e.data.error)
		return;
	}
	const res = e.data
	switch (res.success) {
		case "open":
		case "upgrade":
			console.log("success: " + res.success)
			break;
		case "get-all":
			console.log(res.data)
			break;
		case "get":
		case "add":
			switch (res.src) {
				case "works":
					selected = res.data
					console.log("current", selected)
					break;
				case "drafts":
					console.log(res.data)
					break;
			}
			break;
		case "put":
			switch (res.src) {
				case "works":
					console.log("sent", selected)
					console.log("result", res.data)
					break;
				case "drafts":
					console.log("sent", draft)
					console.log("result", res.data)
			}

			break;
		case "del":
			selected = {}
			break;
	}
}
