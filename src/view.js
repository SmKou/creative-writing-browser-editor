const works = new Map()
works.set("lover_in_the_flesh", "The Lover in the Flesh")

for (const work of works.keys()) {
	const container = document.createElement("p")
	const link = document.createElement("a")
	link.href = `${work}/`
	link.title = works.get(work)
	link.append(document.createTextNode(works.get(work)))
	container.append(link)
	document.querySelector("main").append(container)
}
