<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { Menu } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';

	type ThemeMode = 'system' | 'light' | 'dark';

	const STORAGE_KEY = 'theme';

	const options = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Hell' },
		{ value: 'dark', label: 'Dunkel' }
	] as const;

	let mode = $state<ThemeMode>('system');

	const current = $derived(options.find((option) => option.value === mode) ?? options[0]);

	function isThemeMode(value: string | null): value is ThemeMode {
		return value === 'system' || value === 'light' || value === 'dark';
	}

	function readTheme(): ThemeMode {
		const stored = localStorage.getItem(STORAGE_KEY);
		return isThemeMode(stored) ? stored : 'system';
	}

	function applyTheme(next: ThemeMode) {
		const dark =
			next === 'dark' ||
			(next === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
	}

	function selectTheme(next: ThemeMode) {
		mode = next;
		localStorage.setItem(STORAGE_KEY, next);
		applyTheme(next);
	}

	onMount(() => {
		const stored = readTheme();
		mode = stored;
		applyTheme(stored);
	});
</script>

{#snippet icon(name: ThemeMode)}
	{#if name === 'system'}
		<Monitor class="size-4" aria-hidden="true" />
	{:else if name === 'light'}
		<Sun class="size-4" aria-hidden="true" />
	{:else}
		<Moon class="size-4" aria-hidden="true" />
	{/if}
{/snippet}

<Menu aria-label="Farbschema" positioning={{ placement: 'bottom-end', gutter: 8 }}>
	<Menu.Trigger
		class="btn-icon size-11 rounded-full cursor-pointer"
		aria-label="Farbschema: {current.label}"
	>
		{@render icon(mode)}
	</Menu.Trigger>
	<Menu.Positioner>
		<!-- Zag liest den z-index vom Inhalt und setzt ihn auf den Positioner. -->
		<Menu.Content class="relative z-50 font-medium">
			{#each options as option (option.value)}
				<Menu.OptionItem
					value={option.value}
					valueText={option.label}
					type="radio"
					checked={mode === option.value}
					onCheckedChange={(checked) => {
						if (checked) selectTheme(option.value);
					}}
				>
					<div class="flex items-center gap-2">
						{@render icon(option.value)}
						<Menu.ItemText>{option.label}</Menu.ItemText>
					</div>
					<Menu.ItemIndicator>
						<Check class="size-4" aria-hidden="true" />
					</Menu.ItemIndicator>
				</Menu.OptionItem>
			{/each}
		</Menu.Content>
	</Menu.Positioner>
</Menu>
