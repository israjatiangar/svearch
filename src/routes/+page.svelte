<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { resolve } from '$app/paths';
	import SearchResults from '../components/SearchResults.svelte';

	let query = $derived(page.url.searchParams.get('query'));
	let showResults = $state(false);

	function onsubmit() {
		if (query !== null && query !== '') {
			showResults = true;
		} else {
			showResults = false;
		}
		return showResults;
	}
	function onkeydown(event: KeyboardEvent) {
		if (event.code === 'Enter') {
			const form = document.querySelector('form')!;
			form.requestSubmit();
		} else {
			return;
		}
	}
	function onclick() {
		query = '';
		const form = document.querySelector('form')!;
		form.requestSubmit();
	}
</script>

<svelte:head>
	{#if showResults}
		<title>{query} at Svearch</title>
	{:else}
		<title>Svearch</title>
	{/if}
</svelte:head>

<header class="sticky top-0 z-10 flex h-full w-11/12 flex-col place-items-center">
	<form
		name="Search"
		class={`flex w-full max-w-4xl flex-col gap-8 transition transition-discrete duration-500 ${showResults ? 'm-2 rounded bg-base-200 p-4 backdrop-blur-2xl' : ''}`}
		action="/"
		method="get"
		{onsubmit}
	>
		<span
			class={`flex place-items-center gap-2 transition transition-discrete *:transition ${showResults ? '*:[.btn]:btn-lg *:[input]:input-lg' : '*:[.btn]:btn-xl *:[input]:input-xl'}`}
		>
			{#if showResults}
				<a
					transition:slide
					{onclick}
					data-sveltekit-preload-data="tap"
					href={resolve('/')}
					class="btn btn-soft btn-accent">‹</a
				>
			{/if}
			<input
				contenteditable="true"
				id="Search"
				class="input flex-1"
				name="query"
				type="search"
				placeholder="Search here..."
				{onkeydown}
			/>
			<button type="submit" class="btn btn-primary">Search</button>
		</span>
	</form>
</header>
{#if showResults}
	<section
		transition:slide={{ duration: 500, axis: 'y' }}
		class="w-full place-items-center space-y-4 py-4"
	>
		<SearchResults {query} />
	</section>
{/if}
