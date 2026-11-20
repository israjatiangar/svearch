<script lang="ts">
	import SearchNav from '../../components/SearchNav.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<SearchNav />
{@render children()}
