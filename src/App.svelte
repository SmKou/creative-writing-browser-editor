<script>
	import Dashboard from './Dashboard.svelte'
	import data, { current } from './storage'
	const screen_orientation = $state({
		main: {
			id: "",
			title: "",
			feature: "dashboard",
			side: "left"
		},
		side: {
			id: "",
			title: "",
			feature: "dashboard"
		}
	})
	let layout = $derived.by(() => screen_orientation.main.side.includes("split")
		? "splitscreen"
		: screen_orientation.side.feature
		? "main-side"
		: "main-none"
	)
	let main_class = $derived.by(() => `main ${screen_orientation.main.side}`)

	const dashboard = ({ works, languages, settings } = data) => ({ works, languages, settings })
</script>

<header>
    <h1>{ current.work.title }</h1>
</header>
<main class={layout}>
	<article class={main_class}>
		<h2>Dashboard</h2>
		<div class="data">
			<Dashboard view_mode="main" data={dashboard} />
		</div>
	</article>
	<article class="side">
		<h2>Dashboard</h2>
		<div class="data">
			<Dashboard view_mode="side" data={dashboard} />
		</div>
	</article>
</main>
<footer>
	<p><a href="https://github.com/SmKou/creative-writing-browser-editor">Creative Writing Browser editor</a> © 2025 by <a href="https://github.com/SmKou">Sm Kou</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"></p>
</footer>

<style>
	header {
		width: 100%;
		height: 48px;
		/*border-bottom: 3px solid light-dark(var(--light), var(--dark));*/
		display: flex;
		align-items: center;
		background: light-dark(black, white);

		h1 {
			margin-left: 12px;
			display: inline-block;
			color: light-dark(white, black);
		}
	}

	main {
		position: relative;
		width: 100%;
		height: calc(100% - 84px);
		display: flex;
		align-items: center;

		&:has(.main.right) {
			flex-direction: row-reverse;
		}

		article {
			height: 100%;
			padding: 8px;
			overflow-y: scroll;
			color: light-dark(black, white);
			background: light-dark(white, black);

			div.data {
				height: 100%;
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: 16px;
			}
		}

		@media (max-width: 800px) and (orientation: landscape) {
			article { grid-template-columns: 1fr }
		}

		&.main-none, &.main-side {
			.right {
				border-left: 1px solid light-dark(black, white);
			}
			.left {
				border-right: 1px solid light-dark(black, white);
			}
		}

		&.main-none {
			article.main {
				width: 80vw;
				max-width: 960px;
			}
			article.side { display: none }
		}

		&.main-side {
			article.main {
				width: 70vw;
				max-width: 960px;
			}
			article.side {
				width: 30vw;
				max-width: 480px;
			}
		}

		&.splitscreen {
			article.split {
				width: 50vw;
				max-width: 720px;
			}
		}
	}

	footer {
		width: 100%;
		height: 36px;
		/*border-top: 3px solid light-dark(var(--light), var(--dark));*/
		display: flex;
		justify-content: end;
		color: light-dark(gray, #242424);
		background: light-dark(black, white);

		p {
			margin: 12px;
			display: flex;
			align-items: center;

			a {
				margin: 0 8px;
				color: var(--color);
				text-decoration: none;
			}
			a:hover { color: white }
		}
	}
</style>
