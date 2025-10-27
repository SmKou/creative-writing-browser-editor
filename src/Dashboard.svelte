<script>
	const { view_mode, data } = $props()
	const { works, languages, settings } = data()
</script>

<section class="full-width">
	<h3>Works</h3>
	<div class="list">
		{#each works as work}
		{/each}
	</div>
</section>
<section>
	<h3>Languages</h3>
	<div class="list">
		{#each languages as lang}
		{/each}
	</div>
</section>
<section>
	<h3 title="alternatively worlds or environments">Settings</h3>
	<div class="list">
		{#each settings as setting}
		{/each}
	</div>
</section>

<style>
	.full-width {
		grid-column: span 2;
	}

	.list {
		width: 100%;
		padding: 12px;
		border: 1px solid light-dark(var(--dark), var(--light));
	}
</style>
