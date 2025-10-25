# Old

## Svelte

### Views

- Timeline
- Profile
- Outline
- Language

History
```html
<script>
	let data = $props()
</script>

<dialog></dialog>
<article class={data.orientation}>
	<h3>History of {data.history.type}: {data.history.name}</h3>
	{#each data.changes as change}
	{@const keys = Object.keys(change)}
	<div class="row" on:click={() => }>
		{#each keys as key}
		<div class={key}>JSON.stringify(change[key])</div>
		{/each}
	</div>
	{/each}
</article>

<style>
	dialog { display: none }
</style>
```

Dashboard
```html
<script>
</script>

<h2>Dashboard</h2>
<section>
	<h3>Works</h3>
</section>
<section>
	<h3 title="Settings, worlds, or environments">Settings</h3>
</section>
<section>
	<h3>Languages</h3>
</section>
```

Work
```html
<script>
    let data = $props()
    const {
        setting,
        drafts,
        history
    } = data
    const draft_highlight = (draft) => draft.active || ""
    const excerpt = (chapter) => chapter.split(/\n+/)
    const change_data = (data) => {
        if (data.id)
            delete data.id
        return Object.keys(data).map(key => `key=${data[key]}`).join(", ")
    }
</script>


<article>
    <section>
        <div class="setting-banner">
            <span>setting: {setting.scale}</span>
            <h3>{ setting.name }</h3>
        </div>
        <p>{setting.description}</p>
        <div class="list bottom-scroll">
            {#each setting.notes as note}
            <div id={note.id}>
                <p>{note.txt}</p>
                {#if note.links}
                <ul>
                    {#each note.links as link}
                    <li><a
                        href={link[1]}
                        target="_blank"
                    >{link[0]}</a></li>
                    {/each}
                </ul>
                {/if}
            </div>
            {/each}
        </div>
    </section>
    <section>
        <h3>Drafts</h3>
        <div class="list side-scroll">
            {#each drafts as draft}
            <div class={draft_highlight(draft)}>
                <div class="draft-description">
                    {draft.description}
                </div>
                {#each draft.chapters as chapter}
                <div class="chapter-item">
                    <h4>{chapter.title}</h4>
                    {#each excerpt(chapter.excerpt) as pgh}
                    <p>{pgh}</p>
                    {/each}
                </div>
                {/each}
            </div>
            {/each}
        </div>
    </section>
    <section>

    </section>
    <section>
        <h3>History</h3>
        <div class="list bottom-scroll">
            {#each history as change}
            {@const { cond, src, from, to, res } = change}
            <div id={change.id}>
                <h4>{change.action}</h4>
                <ul class="props-list">
                    {#if cond}
                    <li>conditions: {change_data(cond)}</li>
                    {/if}
                    {#if src}
                    <li>branches from: {change_data(src)}</li>
                    {/if}
                    {#if from}
                    <li>from: {change_data(from)}</li>
                    {/if}
                    {#if to}
                    <li>into: {change_data(to)}</li>
                    {/if}
                    {#if res}
                    <li>creating: {change_data(res)}</li>
                    {/if}
                </ul>
            </div>
            {/each}
        </div>
    </section>
    <!--
    - id
    - title
    - current: draft_id
    - drafts: [draft_id]
    - setting: setting_id
    - timelines: [timeline_id]
    - profiles: [profile_id]
    - languages: [language_id]
    - maps: [map_id]
    - history: history_id
    - journal: journal_id
    -->
</article>

<style>
</style>

```

### Input

- storage
- editor

```html
<script>
    const key_manager = {
        last_key: "",
        end_quote: false,
        end_marks: [".", "?", "!"],
        end_trigger: [" ", "\""],
        shifted: false
    }
    const action_keys = [
        ...key_manager.end_marks,
        ...key_manager.end_trigger,
        "Enter"
    ]

    let ipt;

    const end_action = () => {
        key_manager.last_key = ""
        key_manager.shifted = true
        ipt.focus()
    }

    const controller = evt => {
        if (evt.key == "Backspace" && !ipt.value) {
            evt.preventDefault()
            ipt.focus()
            return;
        }
        if (!action_keys.includes(evt.key)) {
            key_manager.last_key = evt.key
            return;
        }
        const { key } = evt
        const user_input = ipt.value.trim()
        if (key_manager.end_trigger.includes(key)) {
            if (key_manager.end_quote) {
                if (key_manager.end_marks.includes(key_manager.last_key)) {
                    // commit sentence
                    // create new sentence
                    end_action()
                    return;
                }
                else
                    key_manager.end_quote = false
            }
            key_manager.last_key = key
            return;
        }
        if (key_manager.end_marks.includes(key)) {
            key_manager.end_quote = true
            key_manager.last_key = key
            return;
        }

        // "Enter"
        if (!user_input) {
            // create section
        }
        else {
            const [cmd, ...args] = user_input.split(" ")

        }
        end_action()
    }
    const cleanup = (evt) => {
        if (key_manager.shifted) {
            key_manager.shifted = false
            ipt.value = ""
            ipt.focus()
        }
        if (evt.key == "Backspace")
            evt.preventDefault()
    }
</script>

<textarea bind:this={ipt}
    on:keydown={controller}
    on:keyup={cleanup}
></textarea>
```

## Vanilla JS

### index.html
```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<link rel="icon" type="image/svg+xml" href="/vite.svg" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>CWBe: Creative Writing Browser editor</title>
</head>
<body>
	<header>
		<h1>Untitled</h1>
	</header>
	<main class="main-none">
		<article class="main"></article>
		<article class="aside"></article>
	</main>
	<footer>
		<p><a href="https://github.com/SmKou/creative-writing-browser-editor">Creative Writing Browser editor</a> © 2025 by <a href="https://github.com/SmKou">Sm Kou</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"></p>
	</footer>
	<script type="module" src="/src/main.js"></script>
</body>
</html>

```

### style.css
```css
:root {
	color-scheme: light dark;
	--light: mistyrose;
	--mid: hotpink;
	--dark: deeppink;
}

* {
	box-sizing: border-box;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar { display: none }
}

body {
	position: relative;
	margin: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: monospace;
	font-size: 14px;
}

header {
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	background: black;

	h1 {
		margin-left: 12px;
		display: inline-block;
		color: white;
	}
}

main {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	&.focusview {
		article.main {
			width: 100%;
		}
		article.aside { display: none }
	}

	&.main-none {
		article.main {
			width: 75vw;
			height: 100%;
			max-width: 960px;
			height: calc(100vh - 84px);
		}
		article.aside { display: none }
	}

	&.main-side {
		article.main {
			width: 75vw;
			height: 100%;
			heigh
		}
	}

	&.splitscreen {}

	article {
		position: relative;
		padding: 8px;
		overflow-y: scroll;
		border-left: 1px solid light-dark(var(--dark), var(--light));
		border-right: 1px solid light-dark(var(--dark), var(--light));
		color: light-dark(black, white);
		background: light-dark(snow, black);

		ol.paragraph {
			margin-bottom: 24px;

			li {
				margin-bottom: 6px;
				padding: 0 12px;
			}
		}
	}

	aside {
		height: calc(100vh - 84px);
	}

	#ipt {
		width: 100%;
		min-height: 1lh;
		max-height: 3.2lh;
		border: 2px solid light-dark(var(--dark), var(--light));
		color: light-dark(black, white);
		background: light-dark(white, black);
		field-sizing: content;
		resize: none;

		&:focus { outline: none }
	}
}

footer {
	width: 100%;
	height: 36px;
	display: flex;
	justify-content: end;
	color: gray;
	background: black;

	p {
		margin: 12px;
		display: flex;
		align-items: center;

		a {
			margin: 0 8px;
			color: var(--light);
			text-decoration: none;
		}
		a:hover { color: white }
	}
}
```

### main.js
```js
import editor from 'editor'
import 'animate.css'
import './style.css'

const key_manager = {
	last_key: "",
	end_quote: false,
	end_marks: [".", "?", "!"],
	end_trigger: [" ", "\""],
	shifted: false
}
const action_keys = [...key_manager.end_marks, ...key_manager.end_trigger, "Enter"]
const end_action = (ipt) => {
	key_manager.last_key = ""
	key_manager.shifted = true
	ipt.focus()
}

const session = {
	work: new Map(),
	draft: new Map(),
	outline: new Map(),
	timeline: new Map(),
	profile: new Map(),
	language: new Map(),
	history: new Map()
}

const ipt = document.createElement("textarea")
ipt.id = "ipt"
ipt.addEventListener("keydown", evt => {
	if (evt.key == "Backspace" && !evt.target.value) {
		evt.preventDefault()
		// Undo: use of backspace between sentences, paragraphs, and sections
		evt.target.focus()
	}
	if (!action_keys.includes(evt.key)) {
		state.last_key = evt.key
		return;
	}

	const user_input = evt.target.value.split("\n")[0]
	console.log(user_input)
	if (state.end_trigger.includes(evt.key)) {
		if (state.end_quote) {
			if (state.end_marks.includes(state.last_key)) {
				// create sentence
				end_action(evt.target)
				return;
			}
			else
				state.end_quote = false
		}
		state.last_key = evt.key
		return;
	}
	if (state.end_marks.includes(evt.key)) {
		if (!state.end_quote)
			state.end_quote = true
		state.last_key = evt.key
		return;
	}
	if (evt.key == "Enter") {
		if (!user_input) {
		} // "Enter" with no txt: new section
		else {
			const [cmd, ...args] = user_input.split(" ")
			if (cmds.includes(cmd))
				cmds[cmd](args)
			else if (editor.cmds.includes(cmd))
				editor[cmd](args)
			else {
				// commit sentence
				// create paragraph
			}
		} // "Enter" with txt: new paragraph
		end_action(evt.target)
		return;
	}
})
ipt.addEventListener("keyup", evt => {
	if (state.shifted) {
		state.shifted = false
		evt.target.value = ""
		evt.target.focus()
	}
	if (evt.key == "Backspace")
		evt.preventDefault()
})
document.addEventListener("click", () => ipt.focus())
document.querySelector("article.main").append(ipt)
```

### ui.js
```js
const screen_orientation = {
	main: "",
	side: ""
}
// { id, title, feature, side }

const ce = (e) => document.createElement(e)
const ctn = (e, t) => e.append(document.createTextNode(t))

const features = {
	work(data) {
		const article = ce("article")

		const { setting } = data
		let section = ce("section")
		const setting_banner = ce("div")
		const setting_label = ce("span")
		ctn(setting_label, `setting: ${setting.scale}`)
		const setting_name = ce("h3")
		ctn(setting_name, setting.name)
		setting_banner.append(setting_label)
		setting_banner.append(setting_name)
		section.append(setting_banner)
		const setting_description = document.createTextNode("p")
		ctn(setting_description, setting.description)
		section.append(setting_description)
		const setting_notes = ce("ul")
		setting_notes.setAttribute("class", "bottom-scroll")
		setting.notes.forEach(note => {
			const li = ce("li")
			li.id = note.id
			ctn(li, note.txt)
			Object.entries(note.links).forEach(link => {
				const a = ce("a")
				a.target = "_blank"
				a.href = link[1]
				ctn(a, link[0])
			})
			setting_notes.append(li)
		})
		section.append(setting_notes)
		article.append(section)

		const { drafts } = data
		section = ce("section")
		const drafts_label = ce("h3")
		ctn(drafts_label, "Drafts")
		const drafts_list = ce("div")
		drafts_list.setAttribute("class", "side-scroll")
		drafts.forEach(draft => {
			const draft_item = ce("div")
			if (draft.current)
				draft_item.setAttribute("class", "highlight")
			const about_item = ce("div")
			about_item.setAttribute("class", "draft-description")
			ctn(about_item, draft.description)
			draft_item.append(about_item)
			const chapters_list = ce("ol")
			draft.chapters.forEach(chapter => {
				const li = ce("li")
				li.id = chapter.id
				li.title = chapter.title
				ctn(li, chapter.title)
				li.innerhtML += "<p>" + chapter.excerpt.replace(/\n+/, "</p><p>") + "</p>"
				chapters_list.append(li)
			})
			draft_item.append(chapters_list)
			drafts_list.append(draft_item)
		})

	}
}

const load_data = (feature, data) => {}

const init = (last_session, main, side) => {
	screen_orientation.main = last_session.main
	const main_info = last_session.main
	const main_ctt = load_data(main_info.feature, main_info.data)
	main.append(main_ctt)

	if (last_session.side) {
		screen_orientation.side = last_session.side
		const side_info = last_session.side
		const side_ctt = load_data(side_info.feature, side_info.data)
		side.append(side_ctt)
	}
}

const ui_controller = {
	focus() {
		if (document.fullscreenElement)
			document.exitFullscreen()
		else {
			const main = document.querySelector("main")
			main.requestFullscreen()
		}
	},
	main() {},
	side() {
	},
	split() {}
	open() {}
	close() {}
}

const cmds = Object.keys(ui_controller)

const ui = {
	focus(feature, is_side = false) {
		// default: main
		// if feature:
		// --> is_side: set side to feature
		// --> else: set main to feature
		if (feature) {
			const view = is_side ? "side" : "main"
			const side = state.left == state[view]
				? "left"
				: "right"
			const elm = document.querySelector(`.${view}.${side}`)
			elm.remove()
			const last_feature = state[view] || state[side]
			if (!state.stash[last_feature])
				state.stash[last_feature] = []
			state.stash[last_feature].push(elm)
			state[view] = feature
			state[side] = feature
			// load feature
		}
		document.requestFullscreen()
	},
	main: {},
	side: {},
	split: {},
	open: {},
	close: {},
	left: {},
	right: {}
}
const cmds = Object.keys(ui)
```

## Svelte

### main.js
```js
import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
```

### App.svelte
script
```js
import svelteLogo from './assets/svelte.svg'
import viteLogo from '/vite.svg'
import Counter from './lib/Counter.svelte'
```

```html
<main>
	<div>
		<a href="https://vite.dev" target="_blank" rel="noreferrer">
		<img src={viteLogo} class="logo" alt="Vite Logo" />
		</a>
		<a href="https://svelte.dev" target="_blank" rel="noreferrer">
		<img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
		</a>
	</div>
	<h1>Vite + Svelte</h1>

	<div class="card">
		<Counter />
	</div>

	<p>
		Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
	</p>

	<p class="read-the-docs">
		Click on the Vite and Svelte logos to learn more
	</p>
</main>
```

style
```css
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.svelte:hover {
	filter: drop-shadow(0 0 2em #ff3e00aa);
}
.read-the-docs {
	color: #888;
}
```

### Counter.svelte
script
```js
let count = $state(0)
const increment = () => {
	count += 1
}
```

```html
<button onclick={increment}>
  count is {count}
</button>
```

### app.css
```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```
