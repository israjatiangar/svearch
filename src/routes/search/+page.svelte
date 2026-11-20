<script lang="ts">
	import { page } from '$app/state';
	import Result from '../../components/Result.svelte';

	const query = $derived(page.url.searchParams.get('query'));
	let count = $state(10);

	let searchData: Search.Data = $state({
		query: '',
		number_of_results: 0,
		results: []
	});

	$effect(() => {
		if (query) {
			const localData: Search.Data[] =
				JSON.parse(String(localStorage.getItem('searchHistory'))) ?? null;
			const localDataHasQuery = localData
				? localData.filter((search) => search.query === query)[0]
				: null;

			if (!localData || !localDataHasQuery) {
				fetch(`https://api.mwmbl.org/api/v2/search/?q=${query}`)
					.then((response) => response.json())
					.then((data) => (searchData = data))
					.then(() => {
						let history: Array<Search.Data> = localData ? [searchData, ...localData] : [searchData];
						if (history.length > 10) {
							history.splice(9);
						}
						localStorage.setItem('searchHistory', JSON.stringify(history));
					});
			} else {
				searchData = localDataHasQuery;
			}
		}
	});
</script>

<svelte:head>
	<title>{query} at svearch</title>
</svelte:head>

<main class="min-h-dvh bg-base-200">
	<section class="w-full place-items-center space-y-4 py-4">
		<div class="flex w-full flex-col place-items-center gap-2">
			{#if searchData.number_of_results > 0}
				{#each searchData.results.slice(0, count) as item, key (key)}
					<Result result={item} />
				{/each}
			{/if}
		</div>
		<div>
			{#if count < searchData.number_of_results}
				<button class="btn btn-soft btn-primary" onclick={() => (count += 10)}>Show More</button>
			{/if}
			{#if count > 10}
				<button class="btn btn-soft btn-accent" onclick={() => (count = 10)}>Show less</button>
			{/if}
		</div>
	</section>
</main>
