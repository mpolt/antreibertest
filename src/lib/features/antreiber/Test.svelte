<script lang="ts">
	import { fly, type TransitionConfig } from 'svelte/transition';
	import ResultView from './ResultView.svelte';
	import { registerRestart } from './restart';
	import { SCALE_LABELS, questions, scoreAll, totalScore, type Rating } from './model';

	type Step = 'intro' | 'question' | 'result';

	type SessionState = {
		step: Step;
		index: number;
		answers: Partial<Record<number, Rating>>;
	};

	const STORAGE_KEY = 'antreiber-test';

	function loadSession(): SessionState {
		if (typeof sessionStorage === 'undefined') {
			return { step: 'intro', index: 0, answers: {} };
		}
		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			if (!raw) return { step: 'intro', index: 0, answers: {} };
			const parsed = JSON.parse(raw) as SessionState;
			return {
				step: parsed.step ?? 'intro',
				index: Number.isFinite(parsed.index) ? parsed.index : 0,
				answers: parsed.answers ?? {}
			};
		} catch {
			return { step: 'intro', index: 0, answers: {} };
		}
	}

	const initial = loadSession();

	let step = $state<Step>(initial.step);
	let index = $state(initial.index);
	let answers = $state<Partial<Record<number, Rating>>>(initial.answers);

	const current = $derived(questions[index]);
	const progress = $derived(index + 1);
	const ratings = [5, 4, 3, 2, 1] as const;
	const scores = $derived(scoreAll(answers));
	const total = $derived(totalScore(answers));

	$effect(() => {
		if (typeof sessionStorage === 'undefined') return;
		const payload: SessionState = { step, index, answers };
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	});

	function placeQuestion() {
		const screen = document.getElementById('question-screen');
		if (!screen) return;
		window.scrollTo({ top: 0, left: 0 });
		const overflows = screen.getBoundingClientRect().bottom > window.innerHeight + 1;
		if (overflows) screen.scrollIntoView({ block: 'start' });
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		if (step !== 'question') {
			window.scrollTo({ top: 0, left: 0 });
			return;
		}
		void index;
		placeQuestion();
		window.addEventListener('resize', placeQuestion);
		return () => window.removeEventListener('resize', placeQuestion);
	});

	let direction = $state<1 | -1>(1);

	function slide(node: Element, { dir }: { dir: 1 | -1 }): TransitionConfig {
		const reduce =
			typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
		const distance = reduce ? 0 : Math.round((node.parentElement?.clientWidth ?? 320) * 0.55);
		return fly(node, {
			x: dir * distance,
			duration: reduce ? 0 : 260,
			opacity: reduce ? 1 : 0
		});
	}

	function start() {
		answers = {};
		index = 0;
		direction = 1;
		step = 'question';
	}

	function randomRating(): Rating {
		return (Math.floor(Math.random() * 5) + 1) as Rating;
	}

	function previewRandom() {
		const next: Record<number, Rating> = {};
		for (const question of questions) next[question.id] = randomRating();
		answers = next;
		index = questions.length - 1;
		step = 'result';
	}

	function choose(rating: Rating) {
		answers = { ...answers, [current.id]: rating };
		if (index >= questions.length - 1) {
			step = 'result';
			return;
		}
		direction = 1;
		index += 1;
	}

	function back() {
		if (index === 0) {
			step = 'intro';
			return;
		}
		direction = -1;
		index -= 1;
	}

	function restart() {
		answers = {};
		index = 0;
		step = 'intro';
		if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(STORAGE_KEY);
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0 });
	}

	$effect(() => registerRestart(restart));
</script>

{#if step === 'intro'}
	<section class="flex flex-col gap-6" aria-labelledby="intro-heading">
		<header class="flex flex-col gap-3">
			<!-- <h1 id="intro-heading" class="h2">Antreiber-Test</h1> -->
			<p class="text-surface-700-300 leading-relaxed">
				Finde heraus, wie stark die fünf inneren Antreiber bei dir ausgeprägt sind. Beantworte die
				Aussagen so, wie du dich im Moment in deiner Berufswelt siehst — spontan, ohne zu raten, was
				„richtig“ sein könnte.
			</p>
			<p class="text-surface-600-400 text-sm leading-relaxed">
				Stark ausgeprägte Antreiber (ab ca. 30 Punkten) können Stress erzeugen. Ab ca. 40 Punkten
				können sie sich sogar gesundheitsgefährdend auswirken.
			</p>
		</header>

		<div class="card preset-filled-surface-100-900 p-4">
			<p class="mb-3 text-sm font-semibold">Bewertungsskala</p>
			<p class="text-surface-600-400 mb-3 text-sm">
				Die Aussage trifft auf mich in meiner Berufswelt zu:
			</p>
			<ul class="space-y-2 text-sm font-medium">
				{#each ratings as rating (rating)}
					<li class="flex items-center gap-3">
						<span
							class="border-surface-950-50 size-5 shrink-0 rounded-full border-2"
							aria-hidden="true"
						></span>
						<span>{SCALE_LABELS[rating]}</span>
					</li>
				{/each}
			</ul>
		</div>

		<p class="text-surface-600-400 text-sm">{questions.length} Aussagen · etwa 5–10 Minuten</p>

		<button
			type="button"
			class="btn preset-filled-primary-500 w-full min-h-12 text-base font-semibold"
			onclick={start}
		>
			Test starten
		</button>

		{#if import.meta.env.DEV}
			<button
				type="button"
				class="btn preset-tonal w-full min-h-11 font-medium"
				onclick={previewRandom}
			>
				Ergebnis mit Zufallswerten
			</button>
		{/if}
	</section>
{:else if step === 'question'}
	<section
		id="question-screen"
		class="flex scroll-mt-4 flex-col gap-6"
		aria-labelledby="question-{current.id}"
	>
		<div class="flex flex-col gap-2">
			<div class="text-surface-600-400 flex items-center justify-between text-sm font-medium">
				<span>Frage {progress} von {questions.length}</span>
				<span class="tabular-nums">{Math.round((progress / questions.length) * 100)}%</span>
			</div>
			<div class="bg-surface-200-800 h-2 overflow-hidden rounded-full" aria-hidden="true">
				<div
					class="bg-primary-500 h-full rounded-full transition-[width] duration-300"
					style="width: {(progress / questions.length) * 100}%"
				></div>
			</div>
		</div>

		<div class="question-stage grid overflow-hidden">
			{#each [current] as question (question.id)}
				<div
					class="question-panel col-start-1 row-start-1 flex flex-col gap-6"
					in:slide={{ dir: direction }}
					out:slide={{ dir: direction === 1 ? -1 : 1 }}
				>
					<div
						class="card preset-filled-surface-100-900 flex min-h-40 flex-col justify-center gap-3 p-5"
					>
						<p class="text-surface-600-400 text-xs font-medium tracking-wide uppercase">Aussage</p>
						<h2 id="question-{question.id}" class="text-lg leading-snug font-bold sm:text-xl">
							{question.text}
						</h2>
					</div>

					<div
						class="flex flex-col gap-3"
						role="radiogroup"
						aria-label="Wie stark trifft die Aussage zu"
					>
						{#each ratings as rating (rating)}
							{@const selected = answers[question.id] === rating}
							<label
								class="
									group flex min-h-12 cursor-pointer items-center gap-3
									rounded-full border border-surface-500/30
									px-4 py-3
									transition
									hover:bg-surface-500/10
									has-checked:border-primary-500
									has-checked:bg-primary-500/20
									has-focus-visible:ring-2 has-focus-visible:ring-primary-500
								"
							>
								<input
									class="sr-only"
									type="radio"
									name="rating-{question.id}"
									value={rating}
									checked={selected}
									onchange={() => choose(rating)}
									onclick={() => {
										if (selected) choose(rating);
									}}
								/>

								<span
									class="
										grid size-5 shrink-0 place-items-center rounded-full border-2 border-surface-400
										group-has-checked:border-primary-500
									"
									aria-hidden="true"
								>
									<span
										class="size-2.5 scale-0 rounded-full bg-primary-500 transition group-has-checked:scale-100"
									></span>
								</span>

								<span class="font-medium">{SCALE_LABELS[rating]}</span>
							</label>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<button
			type="button"
			class="btn preset-tonal w-full min-h-11 cursor-pointer font-medium hover:bg-surface-200-800 rounded-full"
			onclick={back}
		>
			Zurück
		</button>
	</section>
{:else}
	<ResultView {scores} {total} onrestart={restart} />
{/if}

<style>
	.question-stage > .question-panel:first-child {
		z-index: 1;
	}

	.question-stage > .question-panel:last-child:not(:first-child) {
		z-index: 0;
		pointer-events: none;
	}
</style>
