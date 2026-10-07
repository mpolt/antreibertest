<script lang="ts">
	import Crown from '@lucide/svelte/icons/crown';
	import type { CategoryScore, Level } from './model';

	type Props = {
		scores: CategoryScore[];
		total: number;
		onrestart: () => void;
	};

	let { scores, total, onrestart }: Props = $props();

	const strongest = $derived(Math.max(...scores.map((item) => item.score)));
	const leaders = $derived(scores.filter((item) => item.score === strongest));

	function barColor(level: Level): string {
		switch (level) {
			case 'foerderlich':
				return 'bg-success-500';
			case 'beeintraechtigung':
				return 'bg-warning-500';
			case 'gesundheitsgefaehrdend':
				return 'bg-error-500';
			default: {
				const _exhaustive: never = level;
				return _exhaustive;
			}
		}
	}
</script>

<section class="flex flex-col gap-6" aria-labelledby="result-heading">
	<header class="flex flex-col gap-2 text-center">
		<h1 id="result-heading" class="h2">Dein Ergebnis</h1>
		<p class="text-surface-600-400 text-sm">
			Summe aller Antworten und Ausprägung der fünf Antreiber
		</p>
	</header>

	<!-- <div class="card preset-filled-surface-100-900 flex flex-col items-center gap-1 p-5">
		<p class="text-surface-600-400 text-sm font-medium">Gesamtscore</p>
		<p class="text-4xl font-bold tracking-tight" aria-live="polite">{total}</p>
		<p class="text-surface-600-400 text-xs">von 50–250 Punkten</p>
	</div> -->

	<ul class="flex flex-col gap-4" aria-label="Antreiber nach Kategorie">
		{#each scores as item (item.id)}
			{@const lead = item.score === strongest}
			<li
				class="flex flex-col {lead ? 'gap-1.5 drop-shadow-lg font-medium' : 'gap-2'}  rounded-lg"
				class:top-driver={lead}
				data-level={item.level}
			>
				<!-- {#if lead}
					<p class="lead-label text-[0.65rem] leading-none font-semibold tracking-wide uppercase">
						{leaders.length > 1 ? 'Gleichauf am stärksten' : 'Stärkster Antreiber'}
					</p>
				{/if} -->
				<div class="flex items-baseline justify-between">
					<span class="font-semibold flex items-center gap-3">
						{item.label}
						{#if lead}
							<span class="badge preset-filled-brand">
								<Crown class="size-3" aria-hidden="true" />
								<span
									>{leaders.length > 1
										? 'Deine stärksten Antreiber'
										: 'Dein stärkster Antreiber'}</span
								>
							</span>
						{/if}
					</span>
					<span class="tabular-nums text-sm {lead ? 'font-bold' : 'font-medium'}">
						{item.score} / {item.max}
					</span>
				</div>

				<div
					class="bg-surface-200-800 relative h-4 overflow-hidden rounded-full"
					role="img"
					aria-label="{item.label}: {item.score} von {item.max} Punkten, {item.levelLabel}"
				>
					<div
						class="bar-fill h-full rounded-full transition-[width] duration-500 {barColor(
							item.level
						)}"
						style="width: {(item.score / item.max) * 100}%"
					></div>
					<span
						class="bg-surface-950-50/40 absolute inset-y-0 w-px"
						style="left: 60%"
						aria-hidden="true"
					></span>
					<span
						class="bg-surface-950-50/40 absolute inset-y-0 w-px"
						style="left: 80%"
						aria-hidden="true"
					></span>
				</div>

				<p class="text-surface-600-400 text-sm">{item.levelLabel}</p>
			</li>
		{/each}
	</ul>

	<div class="card preset-outlined-surface-200-800 text-surface-600-400 p-4 text-sm">
		<p class="mb-2 font-medium text-current">Auswertung je Antreiber</p>
		<ul class="list-inside list-disc space-y-1">
			<li>unter 30 Punkte: förderlich</li>
			<li>30–39 Punkte: mögliche Leistungsbeeinträchtigung</li>
			<li>ab 40 Punkte: möglicherweise gesundheitsgefährdend</li>
		</ul>
		<p class="mt-3 text-xs">Markierungen bei 30 und 40 Punkten</p>
	</div>

	<button
		type="button"
		class="btn preset-filled-primary-500 w-full min-h-11 font-semibold"
		onclick={onrestart}
	>
		Nochmal starten
	</button>
</section>

<style>
	/* .top-driver {
		--sheen: color-mix(in oklab, white 62%, transparent);
		--pool: color-mix(in oklab, var(--accent, var(--color-primary-500)) 14%, transparent);
		margin-inline: -0.35rem;
		padding: 0.55rem 0.75rem 0.5rem;
		border-radius: 0.85rem;
		border: 1px solid color-mix(in oklab, var(--accent, var(--color-primary-500)) 32%, transparent);
		background: linear-gradient(180deg, var(--sheen) 0%, transparent 46%), var(--pool);
		box-shadow:
			0 10px 16px -12px color-mix(in oklab, black 55%, transparent),
			inset 0 1px 0 color-mix(in oklab, white 75%, transparent);
	}

	.top-driver[data-level='foerderlich'] {
		--accent: var(--color-success-500);
	}

	.top-driver[data-level='beeintraechtigung'] {
		--accent: var(--color-warning-500);
	}

	.top-driver[data-level='gesundheitsgefaehrdend'] {
		--accent: var(--color-error-500);
	}

	.top-driver[data-level='foerderlich'] .lead-label {
		color: var(--color-success-800);
	}

	.top-driver[data-level='beeintraechtigung'] .lead-label {
		color: var(--color-warning-800);
	}

	.top-driver[data-level='gesundheitsgefaehrdend'] .lead-label {
		color: var(--color-error-700);
	}

	:global(.dark) .top-driver {
		--sheen: color-mix(in oklab, white 16%, transparent);
		--pool: color-mix(in oklab, var(--accent, var(--color-primary-500)) 22%, transparent);
		box-shadow:
			0 14px 18px -10px rgb(0 0 0 / 0.65),
			inset 0 1px 0 color-mix(in oklab, white 22%, transparent);
	}

	:global(.dark) .top-driver[data-level='foerderlich'] .lead-label {
		color: var(--color-success-200);
	}

	:global(.dark) .top-driver[data-level='beeintraechtigung'] .lead-label {
		color: var(--color-warning-200);
	}

	:global(.dark) .top-driver[data-level='gesundheitsgefaehrdend'] .lead-label {
		color: var(--color-error-200);
	}

	.top-driver .bar-fill {
		box-shadow: inset 0 1px 0 color-mix(in oklab, white 45%, transparent);
	} */
</style>
