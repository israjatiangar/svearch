<script lang="ts">
	import { slide } from 'svelte/transition';
	import Result from '../../components/Result.svelte';
	import ResultSkeleton from '../../components/ResultSkeleton.svelte';

	const { query } = $props();
	let count = $state(10);

	let searchData: Search.Data = $state({
		query: '',
		number_of_results: 0,
		results: []
	});

	async function getSearchData(q: string) {
		if (!q) return;

		const localData: Search.Data[] | null = JSON.parse(
			localStorage.getItem('searchHistory') ?? 'null'
		);
		const cached = localData?.find((search) => search.query === q);

		if (cached) {
			searchData = cached;
			return;
		}

		const response = await fetch(`https://api.mwmbl.org/api/v2/search/?q=${encodeURIComponent(q)}`);
		const data: Search.Data = await response.json();
		searchData = data;

		const history = [data, ...(localData ?? [])].slice(0, 10);
		localStorage.setItem('searchHistory', JSON.stringify(history));

		return;
	}

	$effect(() => {
		getSearchData(query);
	});
</script>

<div transition:slide={{ axis: 'y' }} class="flex w-full flex-col place-items-center gap-2">
	{#each searchData.results.slice(0, count) as item (item.url)}
		<svelte:boundary>
			<Result result={item} />
			{#snippet pending()}
				<ResultSkeleton />
			{/snippet}
		</svelte:boundary>
	{/each}
</div>
<div>
	{#if count < searchData.number_of_results}
		<button class="btn btn-soft btn-primary" onclick={() => (count += 10)}>Show More</button>
	{/if}
	{#if count > 10}
		<button class="btn btn-soft btn-accent" onclick={() => (count = 10)}>Show less</button>
	{/if}
</div>
