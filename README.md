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

Segment: piece of writing, ie chapter, scene, paragraph, or sentence

If no title for a segment, other than for paragraphs and sentences which have no titles, default is untitled_n (by scope). For the outermost ordered list, if there's no scene identifier (scene-uuid), default is chapter identifier (chapter-uuid). When a draft is generated, scene titles are ignored unless otherwise specified, ie. scene_titles: true, and should there be separation of scenes, the segments will be separated by an empty line or line break.

Location <loc>
<br>d(num)-c(num)-n(num)-p(num)-s(num): draft-chapter-scene-paragraph-sentence
<br>does not have to be complete in use

Location range <loc:loc>
<br>start from location (inclusive) and end at location (exclusive)
<br>only locations for destinations are needed if using the selected or current context, and current context will always shift to the destination of an action.

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

**Sample interaction**

	opn Lover in the Flesh
	+ ENTER
	- get last: chapter, scene
	- scene = paragraph-uuid[]
	- paragraph = segment-uuid[]
	- article:
	  h2, chapter title
	  ol: chapter
	  ol: scene
	  ol: paragraph
	  li: sentence

	new chapter
	+ ENTER
	- clear article
	- generate chapter-uuid, paragraph-uuid, sentence-uuid
	- set current: chapter, paragraph, sentence

	add
	+ ENTER
	(unnecessary after new chapter: start typing)

### Features List



### Input Processing
- cmd format: cmd orig dest
- keys
  - ENTER: add paragraph to writing
  - .|?|!: add sentence to writing

## Storage
Directory: _storage (.gitignore)
- img
- drafts (.md)

Setup: editor available as homepage with writing and planning modes available, separate view provided for editing mode open to visitors on github pages, pages for view generated by publish.js in storage.js (node script)

**Local storage**
- works			= titles[]
- <work_title>	= drafts[]
- drafts
  - chapters { id: uuid, title: chapter_title, outline: outline-uuid, contains: (scene-uuid|paragraph-uuid)[] }
    - scenes { id: uuid, title: scene_title, contains: (paragraph-uuid)[] }
	- paragraphs { id: uuid, contains: (sentence-uuid)[] }
	  - sentences
- outlines { id: uuid, work: work_title, contains: (chapter-uuid|scene-uuid)[] }

**Database**
- segments		= { id: uuid, txt: sentence }
- descriptions	= { id: uuid, txt: sentence-paragraph }

**Database (optional)**
- works
- drafts		= { id: uuid, last_date: <date>, }
- chapters
- scenes
- paragraphs
- outlines
- worlds
- timelines
- events (encounters)
- profiles
- maps
- languages
  - diction
  - syntax
  - glossary


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
## User Interface
```html
<header>
	<h1></h1>
</header>
<main>
	<article>
		<h2></h2>
		<ol id="chapter-id">
			<li class="section">
				<ol id="section-id">
					<li class="paragraph">
						<ol id="paragraph-id">
							<li></li>
						</ol>
					</li>
				</ol>
			</li>
		</ol>
	</article>
</main>
```

## License

[Creative Writing Browser editor](https://github.com/SmKou/creative-writing-browser-editor) © 2025 by [Sm Kou](https://github.com/SmKou) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ![CC](https://mirrors.creativecommons.org/presskit/icons/cc.svg) ![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg) ![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg) ![SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)
