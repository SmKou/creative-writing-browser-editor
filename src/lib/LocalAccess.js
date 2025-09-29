const LocalAccess = {
	create_untitled_work() {
		const unassigned = localStorage.getItem("unassigned-untitled")
		if (unassigned) {
			const arr = unassigned.split(",")
			const n = arr.shift()
			const store_arr = arr.length ? arr : ""
			localStorage.setItem("unassigned-untitled", store_arr)
			return n
		}
		const work_n = localStorage.getItem("untitled-work") || 1
		localStorage.setItem("untitled-work", +work_n + 1)
		return "Untitled-" + work_n
	},
	remove_untitled_work(title) {
		if (!title.toLowerCase().includes("untitled-"))
			return;
		const unassigned = localStorage.getItem("unassigned-untitled")
		const arr = unassigned?.split(",") || []
		arr.push(title.split("-").at(-1))
		localStorage.setItem("unassigned-untitled", arr)
	}
}

export default LocalAccess
