# Creative Writing Browser editor (CWBe)

## Description

Creative Writing Browser editor (CWBe) is a browser-based editor for writing and management of world-building notes, focused mainly on an exlorative approach. The defining features of this app are side-by-side views, the list-oriented and semantic-oriented organization and navigation, and movement of text between the main text of the work and the world-building notes. For writers with a more explorative approach, there can be a lot of writing that gets reused, placed elsewhere, or saved separately for reference. The point of this app is to enable progression through exploration.

All writing requires editing to improve. The second most important point of this app was a means of rendering drafts and receiving corrections. A full draft is compiled and downloaded as a file that a user can then send to their editors for comments and corrections. To make these comments and corrections, the editor loads the file on the view page. Once finished, their edits are compiled and downloaded as a file to send back to the writer.

**Scope**
- Writing view mode: lists and semantic html
- Text address navigation
- View orientation mode: main, focus, and split screen
- CRUD and relations management of world-building features
	- drafts
	- outline
	- world
	- timelines
	- profiles
	- maps
	- languages: diction, glossary, syntax
- History of works, drafts, and features
- Storage: session, local, and indexedDB

**Out of Scope**
- Features for personalization and customization
- Features for academic writing and research
- Features for schedules and writing goals
- Features for exporting and publishing
- Cloud storage
- Format and templates
- Speech interface
- Color coding and highlighting

- slt <n-p-s>:<n-p-s>: select
- fnd <keywords>: find (all)
- cp: copy
- rp: replace
- set <setting> <[next]|setting-name>

	settings
	mode: wmod | pmod
	theme: dark | light
	write: pgh | lst
	accent: (generic color)

**Recommendations**: There are many options for writing software and web apps, such as Scrivener which mimics a folder-binder and index card management system. Scrivener requires a monthly subscription however. Some outline-oriented editors include Manuskript, bibisco, Quoll Writer, and Trelby. Note that none of these have been tried or used, but of those mentioned, Quoll Writer seems to have the most similar setup and design philosophy. There are other tools intended for world-building as welll, such as Anvil and Campfire.

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

## Complete Setup

## License

[Creative Writing Browser editor](https://github.com/SmKou/creative-writing-browser-editor) © 2025 by [Sm Kou](https://github.com/SmKou) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ![CC](https://mirrors.creativecommons.org/presskit/icons/cc.svg) ![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg) ![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg) ![SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)
