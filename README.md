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
							<li>
								<textarea id="ipt" autofocus></textarea>
							</li>
						</ol>
					</li>
				</ol>
			</li>
		</ol>
	</article>
</main>
```

	Definition: work
	A writing project consisting of multiple drafts, as well as an outline, timelines, profiles, languages, maps, and views cross-referencing between entities of these features

	Definition: draft
	A version of the writing project consisting of all chapters, sections, paragraphs, and sentences written with a working draft determining which are the most recent or used for the current arrangement.

	Definition: segment
	A contained piece of writing, i.e. chapter, section, paragraph, sentence

**What if there are no sections?**: At the beginning of a chapter, paragraphs are added to the current chapter, but if a section is encountered later on, either by a double ENTER, `create section`, or `###`, then the paragraphs prior are removed from the chapter, added to a scene, and that scene is added to the chapter before adding a new section.

| command | action                            | abbr |
|---------|-----------------------------------|------|
| load    | retrieve data from db for work    |      |
| save    | commit all changes to db          |      |
| undo    | undo last change: keep in history |      |
| redo    | redo last change                  |      |
| select  | set from-ref for next command     | slt  |
|         | multiple select (apply to each)   | msl  |
| join    | connect entity to entity w/ note  | jn   |
| unjoin  | disconnect entity from entity     | ujn  |
|         | deletes note                      |      |
| focus   | shift command relevance to ref(s) | fcs  |

**Reference and Side-by-side**
| command   | action                            | abbr |
|-----------|-----------------------------------|------|
| outline   | open working draft's outline      | oln  |
|           | -f: open or find outline          |      |
| timeline  | open timelines view               | tmln |
|           | default: last open timeline(s)    |      |
|           | -f: open or find timeline(s) view |      |
| profile   | open profiles view                | pfl  |
|           | default: last open profile(s)     |      |
|           | -f: open or find profile(s) view  |      |
| language  | open languages view               | lng  |
|           | default: last open language(s)    |      |
|           | -f: open or find language/feature |      |
|           | -d: dictionary                    |      |
|           | -s: syntax (grammar guide)        |      |
|           | -g: glossary (examples)           |      |
| map       | open maps view                    | mp   |
|           | default: last open map(s)         |      |
|           | -f: open or find map              |      |
|           | -s: set scale to open with        |      |
| view      | open saved or new view            | vw   |
|           | -t: set feature for top view      |      |
|           | -b: set feature for bottom view   |      |
|           | can embed above commands: `view -t mp <>` |

	Note:
	Reference features can only open views for up to two entities at once, which are shown top-and-bottom separately.

	View:
	A saved arrangement for viewing more than two entities of a feature at once (extended side), or two entities from different features. A view has its own notes and history, though still stored by features, and is only used for remembering the last state of an arrangement. The arrangement can be changed throughout a session, such as switching one side from a language's dictionary to a timeline.

### Writing mode
Page: /

Focus: writing

In writing mode, user can navigate and edit their draft of a story. All other features are for reference only. The most the user can use of the other features is notes on changed or removed text, and adding or copying text from a feature.



## Storage
Directory: _storage (.gitignore)
- drafts (.md)
- img (.png|.jpg)
- publish.js: converts working draft to .html in view/
- storage.js: manages data and storage

### Local storage
Used for basic memory (can only store string values)

```js
const local = localStorage

const store = {
	local: {
		add: (key, value = "") => local.setItem(key, value.toString()),
		get: (key) => {
			const itm = local.getItem(key)
			if (!itm)
				return {
					error: 404,
					msg: `not found: ${key}`
				}
			return itm
		},
		remove: (key) => local.delete(key),
		reset: () => local.clear()
	}
}
```

### Database storage
Used for persistent memory, stores objects and can contain blobs and images

```js
const req = indexedDB.open("CWBe", 1)

req.onupgradeneeded = evt => {
	const db = evt.target.result
	// create object stores
	if (!db.objectStoreNames.contains(objectStoreName))
		db.createObjectStore(objectStoreName, { keyPath: "id" })
	// populate initial data
}

req.onsuccess = evt => {
	const db = evt.target.result
	const txn = db.transaction(objectStoreName, "readonly")
	const obj_store = txn.objectStore(objectStoreName)
	const res = obj_store.get(id)
	res.onsuccess() => data.id = res.result
}

// single addition
req.onsuccess = evt => {
	const db = evt.target.result
	const txn = db.transaction(objectStoreName, "readwrite")
	const obj_store = txn.objectStore(objectStoreName)
	obj_store.add({ id, ...data })
	ids.push(id)
	txn.oncomplete = () => data.committed = id
}

// multiple addition
req.onsuccess = evt => {
	const ids = []
	const db = evt.target.result
	const txn = db.transaction(objectStoreName, "readwrite")
	const obj_store = txn.objectStore(objectStoreName)
	data.forEach(datum => {
		const res = obj_store.add({ id, ...datum })
		res.onsuccess = evt => ids.push(id)
	})
	txn.oncomplete = () => data.committed = ids
}

// single deletion
req.onsuccess = evt => {
	const db = evt.target.result
	const txn = db.transaction(objectStoreName, "readwrite")
	const obj_store = txn.objectStore(objectStoreName)
	const res = obj_store.delete(id)
	txn.oncomplete = () => data.removed = id
}
```

	Note:
	Only reason to close database explicitly is for versionchange, such as when two instances open (tabs).

## License

[Creative Writing Browser editor](https://github.com/SmKou/creative-writing-browser-editor) © 2025 by [Sm Kou](https://github.com/SmKou) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ![CC](https://mirrors.creativecommons.org/presskit/icons/cc.svg) ![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg) ![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg) ![SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)
