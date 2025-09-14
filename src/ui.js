const create = {
	work: ({ title }) => {
		document.querySelector("h1").innerHTML = title
	},
	draft: () => {
		const article = document.querySelector("article")
		while (article.firstChild)
			article.firstChild.remove()
	},
	chapter: ({ title }) => {
		const h2 = document.createElement("h2")
		h2.append(document.createTextNode(title))
		return h2
	},
	section: ({ id, title, view_setting, pre_section }) => {
		const h3 = document.querySelector("h3")
		h3.append(document.createTextNode(title))
		const section = view_setting === "lst"
			? document.createElement("ol")
			: document.createElement("section")
		section.id = id
		section.setAttribute("class", "section")
		if (pre_section) {
			const paragraphs = view_setting === "lst"
				? document.querySelectorAll(".paragraph")
				: document.querySelectorAll("p")
			const fill = view_setting === "lst"
				? (paragraph) => {
					const li = document.createElement("li")
					li.append(paragraph)
					section.append(li)
				}
				: (paragraph) => paragraph
			paragraphs.forEach(paragraph => paragraph => {
				paragraph.remove()
				const child = fill(paragraph)
				section.append(child)
			})
		}
		h3.after(section)
		return h3
	},
	paragraph: ({ id, view_setting }) => {
		const paragraph = view_setting === "lst"
			? document.createElement("ol")
			: document.createElement("p")
		paragraph.id = id
		if (view_setting = "lst")
			paragraph.setAttribute("class", "paragraph")
		return paragraph
	},
	sentence: ({ id, ipt, view_setting }) => {
		const sentence = view_setting === "lst"
			? document.createElement("li")
			: document.createElement("span")
		sentence.id = id
		sentence.setAttribute("class", "current")
		if (view_setting === "pgh")
			sentence.classList.add("sentence")
		sentence.append(ipt)
		return sentence
	}
}
