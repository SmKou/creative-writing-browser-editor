# Creative Writing Browser editor

## Description

Creative Writing Browser editor (CWBe) is a browser-based editor for writing, explorative creative writing in particular, and management of world-building notes. Most writing editors are designed for structured writing as in outlines, even encouraging the use of formulas, and while there is software and web apps for world-building, they're mainly for reference and note-keeping. The best that can be asked of either is a side-by-side interface. In explorative creative writing, or pantsing, there's a lot of writing that gets recycled or saved separately for later use or reference. If these pieces could be saved the same as world-building notes or in conjunction with an outline and timelines, it'd be easier for the writer to build progressively through exploration, not having to eventually resort to the outline for thinking and plotting.

**Concerns**
1. Remove segments and make notes of them
2. Text navigation
3. Share-view
4. Features: outline, timelines, world-building
   - profiles
   - maps
   - rules
   - languages

Issue: Sharing of local or copyright data

### User Interactions
All interaction is through the textarea. Clicking anywhere else only refocuses on the textarea for entry.

- ENTER: new paragraph
- .|?|!: new sentence

### Writing mode
Page: /

Focus: writing

In writing mode, user can navigate and edit their draft of a story. All other features are for reference only. The most the user can use of the other features is notes on changed or removed text, and adding or copying text from a feature.

```html
<h1>Story Title</h1>
<div id="draft-num">n</div>
<h2 id="<chapter-uuid>">Chapter title</h2>
<h3>Scene title</h3>
<ol id="<scene-uuid>">
	<li>
		<ol id="<paragraph-uuid">
			<li id="<sentence-uuid>"></li>
		</ol>
	</li>
</ol>
```
Note: if no title = untitled_n (by scope)

Note: if no scene title, outer ol uses chapter-uuid

Note: scene titles are ignored in generation unless noted otherwise (scene_titles: true)

Note: <loc> is location, formatted as d-c-n-p-s, and <loc:loc> is a range from one starting location to an ending location (start inclusive, end exclusive)

**Commands**

	- create
	  new <c|s> <[chapter|scene]-title>
	  :: new chapter or scene

	- select
	  slt <loc:loc>
	  :: set reference location for next non-select action
	  does not require selection all at once
	- mselect
	  msl <loc:loc>
	  :: set reference locations for next non-mselect action
	  does not require selection all at once
	- deselect
	  dsl
	  :: clear selected, both select and mselect
	  defers initial locations to current location for next actions

	- add
	  :: write from end of current chapter (and scene)
		- _title
		  _ttl <c|scn> <title>
		  :: add title by scope
		- _note <loc:loc> <[feature]-destination> <description>
		  :: add note on location in feature
		- _todo <loc:loc> <description>
		  :: add to-do note to outline on location
		- _container
		  _cntr <loc:loc>
		  :: add chapter or scene containing location
	- insert
	  ins <loc>
	  :: write and insert before location
	- rewrite
	  rw <loc:loc>
	  :: write from and overwrite until location

	- copy
	  cp <loc:loc> <loc:loc>
	  :: duplicate from starting location to ending location
	- move
	  mv <loc:loc> <loc:loc>
	  :: move from starting location to ending location

	- find "" <a|c|s|p>
	  :: find first instance of "" in all, chapter, scene, or paragraph after selected
	- find_all
	  fa "" <a|c|s|p>
	  :: find all instances of "" in all, chapter, scene, or paragraph
	- replace
	  rpc "" "" <a|c|s|p> <loc:loc>
	  :: replace first instance of "" with "" after selected
	  add location to change selected used for reference
	- replace all
	  ra "" "" <a|c|s|p> <loc:loc>
	  :: replace all instances of "" with "" in all, chapter, scene, or paragraph
	  add location to change selected used for reference
Note: only locations for destinations are needed if using the selected or current context

Note: current context will always shift to destination of an action

### Features List

**Universal**
- UI: main (3-1), side-by-side (1-1), textarea
- Commands: select, undo, redo, join
  Flags: -n (note)

| command | action                            | shorthand |
|---------|-----------------------------------|-----------|
| select  | remember for input of next cmd    | sel       |
| mselect | select multiple                   | ms        |
|         | does not use same store as select |           |
| undo    | undo last change                  | un        |
| redo    | redo last change                  | re        |
| join    | connect entity to entity          | jn        |
|         | -n: add a note to connection      |           |
| unjoin  | disconnect entity from entity     | ujn       |
| history | view history of all changes       | hst       |
|         | version control of feature        | vc        |

	Note: segment
	- chapter
	- scene
	- parargraph
	- sentence
	- word

	Note: How to refer segments
	1. d-c-p-s: draft-chapter-paragraph-sentence
	2. t-e: timeline-event
	3. scn: scene

| command | interface                         |
|---------|-----------------------------------|
| wmod    | writing mode                      |
| pmod    | planning mode                     |
| emod    | editing mode                      |
| sbs     | side-by-side views                |
| main    | main view w/out aside             |
| side    | change feature viewed in aside    |
| exp     | expand aside                      |
| cls     | collapse (close) aside            |

**Writing mode**: focus on writing
- UI: main (writing)
- Features:
- Commands: create, add, insert, copy, remove

| command | action                            | shorthand |
|---------|-----------------------------------|-----------|
| create  | draft, chapter, scene             | new       |
| add     | free write from last segment      | add       |
| insert  | free write from segment location  | ins       |
| rewrite | overwrite from segment location   | rw        |
| copy    | duplicate                         | cp        |
| remove  | delete or store segment(s)        | rm        |
|         | -n: form unjoined segment w/ note |           |
|         | -j: join entity                   |           |

**Planning mode**: focus on management of information and text
- UI: main (feature || dashboard)
- Features: outline, timelines, profiles, maps, rules, languages
- Commands: move, find, fall (find_all), replace, add, update

| command | action                            | shorthand |
|---------|-----------------------------------|-----------|
| move    | move segments                     | mv        |
| find    | find first instance in main       | fn        |
| findall | find all instances in main        | fall      |
| replace | replace instance(s)               | rp        |
| create  | add instance of feature           | new       |
| name    | entitle segment or entity         | nm        |

	Note:
	- outline: scenes (and segments)
	- timelines: encounters and events
	  - scale: person, people, places
	  - intersections
	- character profiles: person, people, and places
	  - person: identity, appearance, personality and manner
	  - people: beliefs, customs, opinions
	  - places:
	- maps: upload and-or draw
	  - geographic
	  - demographic
	  - distance calculation
	  - locations between timelines and characters
	- rules
	- languages
	  - lexicon
	  - grammar guide
	  - glossary

**Editing mode**: focus on collection of feedback
- UI: side-by-side (writing : editing)
- Features: view, comment, markup
- Commands: spell, strike, segment, mark, note

| command | action                            | shorthand |
|---------|-----------------------------------|-----------|
| spell   | spelling or proper term           | sp        |
| strike  | remove                            | str       |
| segment | separation or delineate segments  | seg       |
| mark    | changes: insert, style, move      |           |
| note    | add comment                       |           |
| save    | generate downloadable file        |           |
|         | used to send edit notes           |           |

### Input Processing
- cmd format: cmd orig dest
- keys
  - ENTER: add paragraph to writing
  - .|?|!: add sentence to writing

## Storage
Directory: _storage (.gitignore)

Each use of the Creative Writing Browser editor requires its own _storage and storage.js, meaning if forked, storage is up to the developer to setup, structure, and operate.

Purpose: enable local development for singular uses and to use github pages for viewing and editing

Setup: editor available as homepage with writing and planning modes available, separate view provided for editing mode open to visitors on github pages, pages for view generated by publish.js in storage.js (node script)

### Data Structure

ObjectStore: **Segments**
- sentence
  - id, title
  - content: sentence

ObjectStore: **Descriptions**
- description
  - id, type (rule, encounter, event, profile, map, definition)
  - content: text

ObjectStore: **Outline**
- chapter
  - id, title
  - contains: scenes, paragraphs
- scene
  - id, title
  - contains: paragraphs
- paragraph
  - id, title
  - contains: sentences

ObjectStore: **Worlds**
- world
  - id, title
  - contains: timelines, profiles, maps, languages



ObjectStore: **Timeline**
- encounter
- event

ObjectStore: **Profiles**
- profile
  - person
  - people
  - place

ObjectStore: **Maps**

ObjectStore: **Languages**

### LocalStorage
Purpose: storage of selections, last points, and settings

**Use of localstorage**
```js
const storage = localStorage
storage.setItem("username", "JohnDoe")
storage.getItem("username")
storage.removeItem("username")
storage.clear()
```

### IndexedDB
Purpose: storage of writing and world-building data

**Open|Create database**
```js
const req = indexedDB.open("MyDatabase", 1)
req.onupgradeneeded = e => {
	const db = e.target.result
	if (!db.objectStoreNames.contains("users")) {
		db.createObjectStore("users", { keyPath: "id" })
	}
}
```

**Add data**
```js
req.onsuccess = e => {
	const db = e.target.result
	const txn = db.transaction("users", "readwrite")
	const store = txn.ObjectStore("users")
	store.add({ id: 1, name: "Alice", age: 25 })
	txn.oncomplete = () => console.log("User added")
}
```

**Read data**
```js
req.onsuccess = e => {
	const db = e.target.result
	const txn = db.transaction("users", "readonly")
	const store = txn.ObjectStore("users")
	const get_req = store.get(1)
	get_req.onsuccess = () => console.log(get_req.result)
}
```

**Delete data**
```js
req.onsuccess = e => {
	const db = e.target.result
	const txn = db.transaction("users", "readwrite")
	const store = txn.ObjectStore("users")
	store.delete(1)
	txn.oncomplete = () => console.log("User deleted")
}
```

## License

[Creative Writing Browser editor](https://github.com/SmKou/creative-writing-browser-editor) © 2025 by [Sm Kou](https://github.com/SmKou) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ![CC](https://mirrors.creativecommons.org/presskit/icons/cc.svg) ![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg) ![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg) ![SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)
