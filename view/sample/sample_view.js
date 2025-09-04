document.addEventListener("selectionchange", () => {
	console.log(window.getSelection().toString())
	const selected = document.getSelection().baseNode
	console.log(selected.data, selected.parentElement.id);
})

// window.getSelection().toString(): highlighted portion
// document.getSelection().baseNode.data: containing sen.
// document.getSelection().baseNode.parentElement.id: location
