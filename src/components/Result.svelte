<script lang="ts">
	import { untrack } from 'svelte';
	import { slide } from 'svelte/transition';

	const { result } = $props(),
		highlights = $derived(new Set([...result.title_highlights, ...result.content_highlights])),
		urlString = $derived(result.url),
		hostName = new URL(untrack(() => urlString))?.hostname;

	function openLink() {
		navigation.navigate(urlString);
	}
</script>

<div
	transition:slide={{ duration: 500, axis: 'y', delay: 75 }}
	class="card w-4xl max-w-full cursor-pointer bg-base-100 transition card-border hover:scale-105 hover:shadow-2xl"
	onclick={() => openLink()}
	role="button"
	tabindex="0"
	onkeypress={(event) => event.key === 'enter' && openLink()}
>
	<div class="card-body">
		<header class="card-title flex w-full text-primary">
			<figure class="aspect-square w-8 rounded-selector bg-base-200 p-2">
				<img
					src={`https://www.google.com/s2/favicons?domain=${hostName}&sz=64`}
					alt={`${hostName} favicon`}
					class=" h-auto max-w-full"
				/>
			</figure>
			<h2 class="w-full flex-1 truncate">
				{result.title}
			</h2>
		</header>
		<a href={result.url} class="not-visited:text-accent visited:text-accent/90">{result.url}</a>
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
