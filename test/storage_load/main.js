const database = new Worker("data.js")
const paragraphs = new Map()
const sentences = new Map()
const state = {
	p: false,
	s: false
}
const main = document.createElement("main")

database.postMessage({ action: "open" })

database.onmessage = function receive_response(evt) {
	if (evt.data.error) {
		console.error(evt.data.error)
		return;
	}

	console.log("main received", evt.data)
	const res = evt.data
	switch (res.success) {
		case "load":
			const data = res.data
			console.log(data)
			console.log(typeof data.paragraphs)
			console.log(typeof data.sentences)
			break;
		case "upgrade":
		case "open":
			console.log(res.success)
			database.postMessage({ action: "count" })
			break;
		case "count":
			console.log("count", res.data)
			const init = []
			if (!res.data.paragraphs)
				init.push("paragraphs")
			else if (!res.data.sentences)
				init.push("sentences")
			if (init.length) {
				database.postMessage({ action: "initial", data: init })
				return;
			}
		case "initialize":
			console.log(res.success, res.data)
			database.postMessage({ action: "load" })
			break;
		default:
			console.log(res.success)
			if (res.data) {
				const keys = Object.keys(res.data)
				keys.forEach(key => console.log(key, res.data[key]))
			}
			break;
	}
}
