<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import Footer from '../components/Footer.svelte';

	let { children }: LayoutProps = $props();
</script>

{@render children()}
<Footer />
