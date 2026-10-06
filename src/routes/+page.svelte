<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button
	type="button"
	class="btn preset-filled"
	onclick={() =>
		toaster.info({
			title: 'Skeleton',
			description: 'Der Test-Button funktioniert.'
		})}
>
	Skeleton testen
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
