<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const query = $derived(page.url.searchParams.get('query'));
	let SearchNavForm: HTMLFormElement | null;
</script>

<header class="navbar bg-base-300 shadow-sm">
	<nav class="flex w-full">
		<div class="flex-none">
			<a href={resolve('/')} class="btn btn-ghost text-xl">svearch</a>
		</div>
		<form bind:this={SearchNavForm} class="flex flex-1 justify-center" method="get" action="search">
			<input
				name="query"
				type="text"
				placeholder="Search"
				value={query}
				class="input w-2xl"
				aria-autocomplete="both"
				onkeydown={(event) => {
					if (event.key === 'Enter' && SearchNavForm) {
						SearchNavForm.requestSubmit();
					}
				}}
				required
			/>
		</form>
	</nav>
</header>
