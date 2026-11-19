<script lang="ts">
	let prop = $props();
	const highlights = $derived(
		new Set([...prop.result.title_highlights, ...prop.result.content_highlights])
	);
</script>

<div class="card w-4xl max-w-full bg-base-200 card-border">
	<div class="card-body">
		<h2 class="card-title truncate">{prop.result.title}</h2>
		<a href={prop.url}>{prop.result.url}</a>
		<p class="line-clamp-3">{prop.result.content}</p>
		{#if highlights}
			<div class="flex gap-2">
				{#each highlights as keyword, key (key)}
					<span class="badge badge-soft">{keyword}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
