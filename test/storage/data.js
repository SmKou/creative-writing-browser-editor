import Dexie from "dexie";

const db = new Dexie("test-CWBe")
db.version(1).stores({
	works: "id,title,history"
})

db.works.bulkAdd([
	{ id: "abc", title: "Alphabet", drafts: [], current: "", history: "a0b1-y1" },
	{ id: "xyz", title: "Gen Z", drafts: [], current: "", history: "d2f3-y2" },
	{ id: "f00", title: "Colors of the Rainbow", drafts: [], curernt: "", history: "n32n-y3" },
	{ id: "a11", title: "", drafts: [], current: "", history: "1234-y4" }
]).then(() => {
	console.log("added")
})

