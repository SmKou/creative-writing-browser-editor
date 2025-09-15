# Creative Writing Browser editor (CWBe)

## Description

Creative Writing Browser editor (CWBe) is a browser-based editor for writing, explorative creative writing in particular, and management of world-building notes. Most writing editors are designed for structured writing as in outlines, even encouraging the use of formulas, and while there is software and web apps for world-building, they're mainly for reference and note-keeping. The best that can be asked of either is a side-by-side interface. In explorative creative writing, or pantsing, there's a lot of writing that gets recycled or saved separately for later use or reference. If these pieces could be saved the same as world-building notes or in conjunction with an outline and timelines, it'd be easier for the writer to build progressively through exploration, not having to eventually resort to the outline for thinking and plotting.

**Concerns**
1. Remove segments and make notes of them
2. Text navigation
3. Share-view
4. Features:
   - outline
   - timelines
   - profiles
   - maps
   - world
   - languages

Issue: Sharing of local or copyright data

### User Interface
```html
<header>
	<h1>Work title</h1>
</header>
<main>
	<article>
		<h2>Chapter title</h2>
		<ol class="chapter">
			<li id="section-id" class="section">
				<h3>Section title</h3>
				<ol>
					<li id="paragraph-id" class="paragraph">
						<div class="n-p-addr"></div>
						<ol>
							<li class="current"><textarea id="ipt" autofocus></textarea></li>
						</ol>
					</li>
				</ol>
			</li>
		</ol>
		<!-- alternative format-->
		<h3 id="section-id">Section title</h3>
		<section id="section-id">
			<div class="n-p-addr"></div>
			<p id="paragraph-id">
				<span id="sentence-id" class="current">
					<span><textarea id="ipt" autofocus></textarea></span>
					<span class="sentence-end">
						<span class="sentence-n"></span>
						<span class="end-mark">.|?|!</span>
					</span>
				</span>
			</p>
		</section>
	</article>
</main>
```

	Definition: work
	A writing project consisting of a world and multiple drafts, as well as an outline, timelines, profiles, languages, maps, and views cross-referencing between entities of these features

	Definition: draft
	A version of the writing project consisting of all chapters, sections, paragraphs, and sentences written with a working draft determining which are the most recent or used for the current arrangement.

	Definition: segment
	A contained piece of writing, i.e. chapter, section, paragraph, sentence


**What if there are no sections?**: At the beginning of a chapter, paragraphs are added to the current chapter, but if a section is encountered later on, either by ENTER, `create section`, or `###`, then the paragraphs prior are removed from the chapter, added to a section, and that section is added to the chapter before adding a new section.

## How to Use

NOT LIVE YET @ [CWBe](https://github.com/SmKou/creative-writing-browser-editor)

## Setup
User interface: main.js

Controllers
- wmod, pmod (/): editor.js
- emod (/view): view.js

Storage: not provided

- Create a (sub)directory: storage or _storage

	Note: _storage
	Included in .gitignore

- Create script: storage.js

	Note: storage.js
	Handles memory in localstorage and indexeddb
	Can include scripts for backup and conversion files

- Add import statement to editor.js

	Note: editor.js
	To avoid use of replace, call import: store
	```js
	import store from '_storage/storage'
	```

## License

[Creative Writing Browser editor](https://github.com/SmKou/creative-writing-browser-editor) © 2025 by [Sm Kou](https://github.com/SmKou) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ![CC](https://mirrors.creativecommons.org/presskit/icons/cc.svg) ![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg) ![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg) ![SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)
