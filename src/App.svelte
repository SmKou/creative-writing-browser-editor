<script>
	import Dashboard from './lib/Dashboard'
	const screen_orientation = $state({
		main: {
			title: "",
			feature: "dashboard",
			side: "left"
		},
		side: ""
	})
	// { id, title, feature, side }
	let layout = $derived.by(() => screen_orientation.main.side.includes("split")
		? "splitscreen"
		: screen_orientation.side
		? "main-side"
		: "main-none"
	)

	const current = $state({
		id: "",
		title: "Creative Writing Browser editor",
		type: "work"
	})
</script>

<header>
    <h1>{ current.title }</h1>
</header>
<main class={layout}>
	<article class="main">
		<Dashboard is_side="false" />
	</article>
	{#if screen_orientation.side}
	<article class="side"></article>
	{/if}
</main>
<footer>
	<p><a href="https://github.com/SmKou/creative-writing-browser-editor">Creative Writing Browser editor</a> © 2025 by <a href="https://github.com/SmKou">Sm Kou</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"></p>
</footer>

<style>
	header {
		width: 100%;
		height: 48px;
		border-bottom: 3px solid light-dark(var(--light), var(--dark));
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
		flex-direction: column;
		align-items: center;

		article {
			height: 100%;
			padding: 8px;
			overflow-y: scroll;
			color: light-dark();
			background: light-dark();

			&.left { left: 0 }
			&.right { right: 0 }
		}

		&.main-none {
			article.main {
				width: 80vw;
				max-width: 960px;
			}
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
		border-top: 3px solid light-dark(var(--light), var(--dark));
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
