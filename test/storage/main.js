import Dexie from "dexie";

let selected = {}
const data = {
	"abc": { title: "Alphabet", drafts: [], current: "", history: "a0b1-y1" },
	"xyz": { title: "Gen Z", drafts: [], current: "", history: "d2f3-y2" },
	"f00": { title: "Colors of the Rainbow", drafts: [], curernt: "", history: "n32n-y3" },
	"a11": { title: "", drafts: [], current: "", history: "1234-y4" }
}
const ipt = document.querySelector("input")

const db = new Dexie("test-CWBe")
db.version(1).stores({
	works: "id,title,history"
})

const add = async function(key, val) {
	if (key) {
		selected[key] = val
		return;
	}

	const id = [
		String.fromCharCode(Math.floor(Math.random() * 26) + 97),
		String.fromCharCode(Math.floor(Math.random() * 26) + 97),
		String.fromCharCode(Math.floor(Math.random() * 26) + 97),
	].join("")
	data[id] = {...selected}
	await db.works.add({ id, ...selected })
	selected = {}
	return id
}

const get = async function(id) {
	const work = await db.works.get(id)
	// console.log(work)
	if (!work)
		console.error("DNE?")
	return work
}

const getAll = function() {
	const ids = Object.keys(data)
	const works = []
	ids.forEach((id) => {
		const work = get(id)
		works.push(work)
	})
	return works
}

ipt.addEventListener("change", async evt => {
	const input = evt.target.value
	const [cmd, ...args] = input.split(" ")
	switch (cmd) {
		case "all":
			console.log(getAll().map(async itm => await itm))
			break;
		case "get":
			console.log(await get(args))
			break;
		case "add":
			const res = add(...args)
			if (res)
				console.log(get(res))
			break;
	}
})
