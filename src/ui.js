import { setting } from 'write'

const create = {
	work: (title) => {
		document.querySelector("h1").innerHTML = title
	},
	draft: () => {
		const article = document.querySelector("article")
		while (article.firstChild)
			article.firstChild.remove()
	},
	chapter: (title) => {
		const h2 = document.createElement("h2")
		h2.append(document.createTextNode(title))
		return h2
	},
	section: (id, title, pre) => {
		const h3 = document.querySelector("h3")
		h3.append(document.createTextNode(title))
		let section;
		switch (setting) {
			case "lst":
				section = document.createElement("ol")
				section.setAttribute("class", "section")
				if (pre) {
					section.classList.add("section-" + 1)
					document.querySelector(".paragraph").forEach((paragraph, idx) => {
						paragraph.remove()
						const li = document.createElement("li")
						li.append(paragraph)
						const addr = document.createElement("div")
						addr.setAttribute("class", "section-paragraph-n")
						addr.append(document.createTextNode(`n1-p${idx + 1}`))
						li.append(addr)
						li.append(paragraph)
						section.append(li)
					})
				}
				else {
					const li = document.createElement("li")
					section.append(li)
					set_section_n = (n) => section.classList.add("section-" + n)
				}
				break;
			case "pgh":
				section = document.createElement("section")
				if (pre) {
					section.setAttribute("class", "section-" + 1)
					document.querySelectorAll("p").forEach((paragraph, idx) => {
						paragraph.remove()
						const addr = document.createElement("div")
						addr.setAttribute("class", "section-paragraph-n")
						addr.append(document.createTextNode(`n1-p${idx + 1}`))
						section.append(paragraph)
					})
				}
				else
					set_section_n = (n) => section.setAttribute("class", "section-" + n)
				break;
		}
		section.id = id
		h3.after(section)
		return h3
	},
	paragraph: (id) => {
		let paragraph;
		switch (setting) {
			case "lst":
				break;
			case "pgh":
				break;
		}
		const paragraph = view_setting === "lst"
			? document.createElement("ol")
			: document.createElement("p")
		paragraph.id = id
		if (view_setting = "lst")
			paragraph.setAttribute("class", "paragraph")
		return paragraph
	},
	sentence: (id, ipt) => {
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

export const dom = {
	create
}
