<script lang="ts">
	import ThemeSwitch from '#lib/components/ThemeSwitch.svelte';
	import { requestRestart } from '#lib/features/antreiber/restart';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import './layout.css';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Antreiber-Test</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-dvh">
	<header class="border-surface-200-800 border-b">
		<div class="mx-auto flex max-w-lg items-center justify-between px-4 py-3 sm:px-6">
			<button
				type="button"
				class="cursor-pointer rounded-md text-xl font-semibold tracking-wide hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
				onclick={requestRestart}
			>
				Antreiber-Test
			</button>
			<ThemeSwitch />
		</div>
	</header>

	<main class="mx-auto max-w-lg px-4 py-6 sm:px-6 sm:py-8">
		{@render children()}
	</main>
</div>
