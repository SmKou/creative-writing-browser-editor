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
			console.log(data.cs[0], data.ps[0], data.ss[0])
			const chapter = document.querySelector(".chapter")
			const c_order = data.cs[0].order
			const paragraphs = data.ps.reduce((acc, val) => {
				const { id, order } = val
				acc.set(id, order)
				return acc
			}, new Map())
			const sentences = data.ss.reduce((acc, val) => {
				const { id, sentence } = val
				acc.set(id, sentence)
				return acc
			}, new Map())
			c_order.forEach(p_id => {
				const p_li = document.createElement("li")
				p_li.id = p_id
				p_li.setAttribute("class", "paragraph")
				const ol = document.createElement("ol")
				const p_order = paragraphs.get(p_id)
				p_order.forEach(s_id => {
					const s_li = document.createElement("li")
					s_li.id = s_id
					s_li.append(document.createTextNode(sentences.get(s_id)))
					ol.append(s_li)
				})
				p_li.append(ol)
				chapter.append(p_li)
			})
			break;
		case "upgrade":
		case "open":
			console.log(res.success)
			database.postMessage({ action: "initial" })
			break;
		case "initial":
			console.log(res.success)
			database.postMessage({ action: "load" })
			break;
		defaolt:
			console.log(res.success)
			if (res.data) {
				const keys = Object.keys(res.data)
				keys.forEach(key => console.log(key, res.data[key]))
			}
			break;
	}
}
