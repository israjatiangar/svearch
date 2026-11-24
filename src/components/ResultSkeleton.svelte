<script>
	import { slide } from 'svelte/transition';
</script>

<div
	transition:slide={{ duration: 500, axis: 'y' }}
	class="card w-4xl max-w-full bg-base-100 card-border"
	aria-busy="true"
	aria-label="Loading search result"
>
	<div class="card-body">
		<header class="flex h-auto w-full place-items-center gap-2">
			<div class="h-8 w-8 flex-none skeleton rounded-selector"></div>

			<div class="flex flex-auto flex-col gap-2">
				<div class="h-5 w-2/3 skeleton"></div>
				<div class="h-3 w-1/3 skeleton"></div>
			</div>
		</header>

		<div class="flex flex-col gap-2">
			<div class="h-4 w-full skeleton"></div>
			<div class="h-4 w-full skeleton"></div>
			<div class="h-4 w-4/5 skeleton"></div>
		</div>

		<div class="flex gap-2">
			<div class="h-5 w-16 skeleton rounded-selector"></div>
			<div class="h-5 w-20 skeleton rounded-selector"></div>
			<div class="h-5 w-14 skeleton rounded-selector"></div>
		</div>
	</div>
</div>
