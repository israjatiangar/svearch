<script lang="ts">
	import { page } from '$app/state';
	import Result from '../../components/Result.svelte';

	const query = $state(page.url.searchParams.get('query'));

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

<main>
	<h1 class="pb-4 text-center text-6xl">{query}</h1>
	<section class="flex w-full flex-col place-items-center gap-2">
		{#if searchData.number_of_results > 0}
			{#each searchData.results as item, key (key)}
				<Result result={item} />
			{/each}
		{/if}
	</section>
</main>
