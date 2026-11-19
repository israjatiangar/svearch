<script lang="ts">
	import { slide } from 'svelte/transition';
	let prop = $props();
	let result = $derived(prop.result);
	const highlights = $derived(new Set([...result.title_highlights, ...result.content_highlights]));
	function openLink() {
		navigation.navigate(result.url);
	}
</script>

<div
	transition:slide={{ duration: 1000 }}
	class="card w-4xl max-w-full cursor-pointer bg-base-200 transition card-border hover:scale-105 hover:shadow-2xl"
	onclick={() => openLink()}
	role="button"
	tabindex="0"
	onkeypress={(event) => event.key === 'enter' && openLink()}
>
	<div class="card-body">
		<h2 class="card-title truncate">
			{result.title}
		</h2>
		<p>{result.url}</p>
		<p class="line-clamp-3">{result.content}</p>
		{#if highlights}
			<div class="flex gap-2">
				{#each highlights as keyword, key (key)}
					<span class="badge badge-soft">{keyword}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
