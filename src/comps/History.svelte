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
