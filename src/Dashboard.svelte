<script>
	const { view_mode } = $props()
</script>

<h2>Dashboard</h2>
<section class="full-width">
	<h3>Works</h3>
	<div class="list">
		{#each data.works as work}
		{/each}
	</div>
</section>
<section>
	<h3>Languages</h3>
	<div class="list">
		{#each data.langs as lang}
		{/each}
	</div>
</section>
<section>
	<h3 title="alternatively worlds or environments">Settings</h3>
	<div class="list">
		{#each data.envs as env}
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
