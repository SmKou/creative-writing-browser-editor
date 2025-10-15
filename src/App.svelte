<script>
	import Work from './lib/Work.svelte'

	const screen_orientation = {
		main: "",
		side: ""
	}
	// { id, title, feature, side }
	const session = {}
	const work = $state({
		id: "",
		title: ""
	})
</script>

<header>
    <h1>{ work.title }</h1>
</header>
<main class="main-none">
	
</main>
<footer>
	<p><a href="https://github.com/SmKou/creative-writing-browser-editor">Creative Writing Browser editor</a> © 2025 by <a href="https://github.com/SmKou">Sm Kou</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"></p>
</footer>

<style>
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
</style>
