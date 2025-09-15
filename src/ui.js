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
		switch (setting.get("view")) {
			case "lst":
				paragraph = document.createElement("ol")
				paragraph.setAttribute("class", "paragraph")
				break;
			case "pgh":
				paragraph = document.createElement("p")
				break;
		}
		paragraph.id = id
		return paragraph
	},
	sentence: (id, ipt) => {
		let sentence;
		switch (setting.get("view")) {
			case "lst":
				sentence = document.createElement("li")
				sentence.setAttribute("class", "current")
				break;
			case "pgh":
				sentence = document.createElement("span")
				sentence.setAttribute("class", "current sentence")
				break;
		}
		sentence.id = id
		sentence.append(ipt)
		return sentence
	}
}

const move = {
	sentence: {
		current: (src, txt) => {
			const sentence = document.getElementById(src)
			sentence.classList.remove("current")
			sentence.append(txt)
		}
	}
}

export const dom = {
	create,
	move
}
