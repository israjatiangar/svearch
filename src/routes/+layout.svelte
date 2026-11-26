<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import Footer from '../components/Footer.svelte';

	let { children }: LayoutProps = $props();
</script>

<main class="min-h-dvh w-dvw place-content-center place-items-center **:rounded-selector">
	{@render children()}
</main>

<Footer />
