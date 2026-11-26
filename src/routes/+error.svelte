<script>
	import { resolve } from '$app/paths';
</script>

<div class="mockup-browser w-11/12 max-w-4xl border border-base-300">
	<div class="mockup-browser-toolbar">
		<div class="input">Error 404</div>
	</div>
	<div
		class="grid h-80 place-content-center place-items-center gap-4 border-t border-base-100 bg-base-300 p-4"
	>
		<h1 class="text-balanced text-center text-2xl md:text-4xl">
			The Page you are Trying to reach Doesn't exist.
		</h1>
		<a class="btn w-fit btn-primary" data-sveltekit-preload-data="tap" href={resolve('/')}
			>Go Home</a
		>
	</div>
</div>
