# Specification: CWBe

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

