# Specification: CWBe

- editor.js: controller for UI and features
- features

	- write.js: active draft
	- draft.js: drafts, including removed and marked segments
	- outline.js: draft structure and story notes
	- profile.js: characters, people, and places
	- timeline.js: events, encounters, and their intersections
	- language.js

		- dictionary
		- glossary
		- grammar

	- journal.js: notes, reflections, and free write entries
	- world.js: notes, rules, and magic system
	- map(s): layout of locations, including image imports and distance calculations

- dashboard.js: cursory view of a work and its features

## Manage view

1.	views
	a. focus			`class="focusview"`
	b. main				`class="main-none"`
	c. main-aside		`class="main-aside"`
	d. split screen		`class="splitscreen"`
2.	view commands
	a. `open`
	b. `switch <focus>`
	c. `close`
3.	formats
	a. work-draft (write|read)
	b. journal
	c. outline
	d. environment
	e. timeline
	f. profile
	g. language
	   - lexicon
	   - grammar
	   - glossary
	10. map
	11. history
4.	Dashboard(s)
5.	UI commands
	a. `create`
	b. `move`
	c. `delete`

```js
if (state.left && state.right) {
	const dialog = document.createElement("dialog")
	const p = document.createElement("p")
	p.append(document.createTextNode(`Feature ${feature} cannot be opened. There are already two features open. Either use close or use left or right.`))
	dialog.append(p)
	const form = document.createElement("form")
	form.method = "dialog"
	const close_btn = document.createElement("button")
	close_btn.append(document.createTextNode("close"))
	close_btn.addEventListener("click", evt => {
		dialog.close()
		dialog.remove()
	})
	const left_btn = document.createElement("button")
	left_btn.append(document.createTextNode("left"))
	left_btn.addEventListener("click", evt => {})
	const right_btn = document.createElement("button")
	right_btn.append(document.createTextNode("right"))
	right_btn.addEventListener("click", evt => {})
	document.querySelector("body").append(dialog)
	dialog.showModal()
}
else {
	const side = state.left ? "right" : "left"
	state[side] = feature
	body.setAttribute("class", ORIENTATIONS("split"))
	// load side content
}
```


## default
- last session/work
- if none: new work

works
drafts
- chapters
- sections
- paragraphs
- sentences

## Write

Enter
- with text:				create paragraph
- w/o text:					create section

`# <title>`					create work
`create work <title>`

`## <title>`				create chapter
`create chapter <title>`

`### <title>`				create section
`create section <title>`

```js
switch (cmd) {
	case "#":
		controller.create(`work ${args.join(" ")}`, evt.target)
		break;
	case "##":
		controller.create(`chapter ${args.join(" ")}`, evt.target)
		break;
	case "###":
		controller.enter(args)
		break; // new section
	case "create":
		controller.create(args.join(" "), evt.target)
		break;
	/*
	case "add":
		break;
	case "insert":
	case "ins":
		break;
	case "name":
	case "rename":
	case "nm":
		break;
	case "move":
	case "mv":
		break;
	case "remove":
	case "rm":
		break;
	case "record":
	case "rcd":
		break;
	*/
	default:
		console.error("unspecified command entered")
}
end_action(evt.target)
```
