const screen_orientation = {
	main: "",
	side: ""
}
// { id, title, feature, side }

const ce = (e) => document.createElement(e)
const ctn = (e, t) => e.append(document.createTextNode(t))

const features = {
	work(data) {
		const article = ce("article")

		const { setting } = data
		let section = ce("section")
		const setting_banner = ce("div")
		const setting_label = ce("span")
		ctn(setting_label, `setting: ${setting.scale}`)
		const setting_name = ce("h3")
		ctn(setting_name, setting.name)
		setting_banner.append(setting_label)
		setting_banner.append(setting_name)
		section.append(setting_banner)
		const setting_description = document.createTextNode("p")
		ctn(setting_description, setting.description)
		section.append(setting_description)
		const setting_notes = ce("ul")
		setting_notes.setAttribute("class", "bottom-scroll")
		setting.notes.forEach(note => {
			const li = ce("li")
			li.id = note.id
			ctn(li, note.txt)
			Object.entries(note.links).forEach(link => {
				const a = ce("a")
				a.target = "_blank"
				a.href = link[1]
				ctn(a, link[0])
			})
			setting_notes.append(li)
		})
		section.append(setting_notes)
		article.append(section)

		const { drafts } = data
		section = ce("section")
		const drafts_label = ce("h3")
		ctn(drafts_label, "Drafts")
		const drafts_list = ce("div")
		drafts_list.setAttribute("class", "side-scroll")
		drafts.forEach(draft => {
			const draft_item = ce("div")
			if (draft.current)
				draft_item.setAttribute("class", "highlight")
			const about_item = ce("div")
			about_item.setAttribute("class", "draft-description")
			ctn(about_item, draft.description)
			draft_item.append(about_item)
			const chapters_list = ce("ol")
			draft.chapters.forEach(chapter => {
				const li = ce("li")
				li.id = chapter.id
				li.title = chapter.title
				ctn(li, chapter.title)
				li.innerhtML += "<p>" + chapter.excerpt.replace(/\n+/, "</p><p>") + "</p>"
				chapters_list.append(li)
			})
			draft_item.append(chapters_list)
			drafts_list.append(draft_item)
		})

	}
}

const load_data = (feature, data) => {}

const init = (last_session, main, side) => {
	screen_orientation.main = last_session.main
	const main_info = last_session.main
	const main_ctt = load_data(main_info.feature, main_info.data)
	main.append(main_ctt)

	if (last_session.side) {
		screen_orientation.side = last_session.side
		const side_info = last_session.side
		const side_ctt = load_data(side_info.feature, side_info.data)
		side.append(side_ctt)
	}
}

const ui_controller = {
	focus() {
		if (document.fullscreenElement)
			document.exitFullscreen()
		else {
			const main = document.querySelector("main")
			main.requestFullscreen()
		}
	},
	main() {},
	side() {
	},
	split() {}
	open() {}
	close() {}
}

const cmds = Object.keys(ui_controller)
