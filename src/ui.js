import { settings, create as gen } from 'write'

const move = {
	section: {
		init: (section) => {
			if (settings.view) {
				const paragraphs = document.querySelectorAll("li.paragraph")
				paragraphs.forEach(paragraph => {
					const np = paragraph.childNodes[0]
					np.innerHTML = `n1-${np.innerHTML}`
					paragraph.remove()
					section.append(paragraph)
				})
			}
			else {
				const addresses = document.querySelectorAll(".n-p-addr")
				const paragraphs = document.querySelectorAll("p")
				addresses.forEach((addr, idx) => {
					addr.innerHTML = `n1-${addr.innerHTML}`
					addr.remove()
					paragraphs[idx].remove()
					addr.after(paragraphs[idx])
					section.append(addr)
				})
			}
		}
	},
	sentence: {
		current: (src, txt) => {
			const sentence = document.getElementById(src)
			sentence.classList.remove("current")
			sentence.append(txt)
		}
	}
}

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
		if (settings.view) {
			const ol = document.createElement("ol")
			ol.setAttribute("class", "chapter")
			h2.after(ol)
		}
		return h2
	},
	section: (id, title, n, pre) => {
		const h3 = document.querySelector("h3")
		if (settings.view) {
			const chapter_section = document.createElement("li")
			chapter_section.id = id
			chapter_section.setAttribute("class", "section")
			const section = document.createElement("ol")
			if (pre)
				move.section.init(section)
			h3.append(document.createTextNode(title))
			h3.after(section)
			chapter_section.append(h3)
			return chapter_section
		}
		else {
			h3.append(document.createTextNode(`${n}. ${title}`))
			const section = document.createElement("section")
			if (pre)
				move.section.init(section)
			h3.after(section)
			return h3
		}
	},
	paragraph: (id, p, n) => {
		const np = document.createElement("div")
		np.setAttribute("class", "n-p-addr")
		const addr = n ? `n${n}-p${p}` : "p" + p
		np.append(document.createTextNode(addr))
		if (settings.view) {
			const container_paragraph = document.createElement("li")
			container_paragraph.id = id
			container_paragraph.setAttribute("class", "paragraph")
			const paragraph = document.createElement("ol")
			np.after(paragraph)
			container_paragraph.append(np)
			return container_paragraph
		}
		else {
			const paragraph = document.createElement("p")
			paragraph.id = id
			np.after(paragraph)
			return np
		}
	},
	sentence: (id, ipt) => {
		const sentence = settings.view
			? document.createElement("li")
			: document.createElement("span")
		sentence.id = id
		sentence.setAttribute("class", "current")
		sentence.append(ipt)
		return sentence
	}
}

const load = (ipt) => {
	const work_title = gen.work("")
	create.work(work_title)
	create.draft()
	const { title: chapter_title } = gen.chapter("")
	const chapter = create.chapter(chapter_title)
	document.querySelector("article").append(chapter)

	const { id: sentence_id } = gen.sentence()
	const sentence = create.sentence(sentence_id, ipt)
	const { id: paragraph_id } = gen.paragraph()
	const paragraph = create.paragraph(paragraph_id, 1)
	paragraph.append(sentence)

	const container = settings.view
		? document.querySelector(".chapter")
		: document.querySelector("article")
	container.append(paragraph)
}

export const dom = {
	load,
	create,
	move
}
