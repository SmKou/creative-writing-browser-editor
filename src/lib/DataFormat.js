class DataFormat {
	static work({ id, title }) {
		return {
			id,
			title,
			drafts: [],
			current: 0
		}
	}

	static draft({ id, title }) {
		return {
			id,
			title: title || "",
			order: [],
			chapters: new Map(),
			sections: new Map(),
			paragraphs: new Map(),
			sentences: new Map(),
			current: {
				chapter: "",
				section: "",
				paragraph: "",
				sentence: ""
			},
			outline: "",
			history: ""
		}
	}

	static chapter({ id, title, type }) {
		return {
			id,
			title,
			untitled: 1,
			order: [],
			type: type || "segment"
		}
	}

	static section({ id, title }) {
		return {
			id,
			title,
			order: []
		}
	}

	static paragraph({ id }) {
		return {
			id,
			order: []
		}
	}

	static sentence({ id }) {
		return {
			id,
			txt: ""
		}
	}

	static outline(params) {
		const draft_id = params.draft_id || params.draft?.id || ""
		return {
			id: params.id,
			order: [],
			todos: [],
			reminders: [],
			segments: new Map(),
			draft: draft_id
		}
	}

	static segment(params) {
		const outline_obj = {
			id: params.id,
			title: params.title || "",
			description: params.description || ""
		}
		if (params.connections && Object.keys(params.connections).length)
			outline_obj.connections = connections
			return outline_obj
	} // TODO: add check of connections

	static history(params) {
		const draft_id = params.draft_id || params.draft?.id || ""
		return {
			id: params.id,
			order: [],
			current: 0,
			changes: new Map(),
			draft: draft_id
		}
	}

	static change(params) {
		const change_obj = { action: params.action }
		if (params.cond && Object.keys(params.cond).length)
			change_obj.cond = params.cond
			if (params.src)
				change_obj.src = params.src
				for (const param of ["cond", "from", "to", "res"])
					if (params[param] && Object.keys(params[param]).length)
						change_obj[param] = params[param]
						change_obj.date = (new Date()).toString()
						return change_obj
	} // add check of src
}

export default DataFormat
