const record = []

const edit = (cmd, loc, txt, ipt) => {
	if (cmd === "save") {
		record.unshift({
			commenter: ipt,
			reviewed: txt,
			draft: loc,
			date: (new Date()).toDateString()
		})
		const file = new File(record, "comments.txt")
		return file;
	}

	record.push({
		[cmd]: {
			ctt: [loc, txt],
			cor: ipt
		}
	})
}

const edits = [
	"spell",
	"strike",
	"segment",
	"mark",
	"note",
	"save"
]

export default {
	cmd: edits,
	fn: edit
}
