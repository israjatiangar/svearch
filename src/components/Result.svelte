<script lang="ts">
	import { untrack } from 'svelte';
	import { slide } from 'svelte/transition';

	function getHostName(url: string): string | null {
		try {
			return new URL(url).hostname;
		} catch {
			return null;
		}
	}

	function preloadFavicon(hostName: string | null): Promise<string> {
		const fallback = '/fallback-favicon.svg';
		if (!hostName) return Promise.resolve(fallback);

		const src = `https://www.google.com/s2/favicons?domain=${hostName}&sz=64`;
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(src);
			img.onerror = () => resolve(fallback);
			img.src = src;
		});
	}

	const { result } = $props(),
		highlights = $derived(new Set([...result.title_highlights, ...result.content_highlights])),
		urlString = $derived(result.url),
		betterUrl = `${new URL(untrack(() => urlString))?.hostname}${new URL(untrack(() => urlString)).pathname.split('/').join(' › ')}`;

	function openLink() {
		navigation.navigate(urlString);
	}

	const hostName = $derived(getHostName(result.url));
	const favicon = $derived(await preloadFavicon(hostName));
</script>

<div
	transition:slide={{ duration: 500, axis: 'y' }}
	class="card w-4xl max-w-full cursor-pointer bg-base-100 transition card-border hover:scale-105 hover:shadow-lg"
	onclick={() => openLink()}
	role="button"
	tabindex="0"
	onkeypress={(event) => event.key === 'enter' && openLink()}
>
	<div class="card-body">
		<header class="flex h-auto w-full place-items-center gap-2 text-primary">
			<figure class="aspect-square h-8 w-8 flex-none rounded-selector bg-base-200 p-2">
				<img src={favicon} alt={`${hostName} favicon`} class=" h-auto max-w-full" />
			</figure>
			<div class=" flex-auto flex-col">
				<h2 class=" card-title line-clamp-1">
					{result.title}
				</h2>
				<a href={result.url} class=" text-xs not-visited:text-accent visited:text-accent/90"
					>{betterUrl}</a
				>
			</div>
		</header>
		<p class="line-clamp-3">{result.content}</p>
		{#if highlights}
			<div class=" flex gap-2">
				{#each highlights as keyword, key (key)}
					<span class="badge badge-soft badge-primary">{keyword}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
