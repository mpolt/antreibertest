export type Rating = 1 | 2 | 3 | 4 | 5;

export type Level = 'foerderlich' | 'beeintraechtigung' | 'gesundheitsgefaehrdend';

export type CategoryId =
	'sei-perfekt' | 'mach-schnell' | 'streng-dich-an' | 'mach-es-allen-recht' | 'sei-stark';

export type Question = {
	id: number;
	text: string;
};

export type Category = {
	id: CategoryId;
	label: string;
	questionIds: number[];
};

export type CategoryScore = {
	id: CategoryId;
	label: string;
	score: number;
	max: number;
	level: Level;
	levelLabel: string;
};

export const SCALE_LABELS: Record<Rating, string> = {
	5: 'voll und ganz',
	4: 'ziemlich',
	3: 'etwas',
	2: 'kaum',
	1: 'gar nicht'
};

export const questions: Question[] = [
	{ id: 1, text: 'Wenn ich eine Arbeit mache, dann mache ich sie gründlich.' },
	{
		id: 2,
		text: 'Ich fühle mich verantwortlich, dass diejenigen, die mit mir zu tun haben, sich wohlfühlen.'
	},
	{ id: 3, text: 'Ich bin ständig auf Trab.' },
	{ id: 4, text: 'Wenn ich raste, roste ich.' },
	{ id: 5, text: 'Anderen gegenüber zeige ich meine Schwächen nicht gerne.' },
	{
		id: 6,
		text: 'Häufig gebrauche ich den Satz: „Es ist schwierig, etwas so genau zu sagen“.'
	},
	{ id: 7, text: 'Ich sage oft mehr, als eigentlich nötig wäre.' },
	{ id: 8, text: 'Ich habe Mühe, Leute zu akzeptieren, die nicht genau sind.' },
	{ id: 9, text: 'Es fällt mir schwer, Gefühle zu zeigen.' },
	{ id: 10, text: '„Nur nicht lockerlassen“ ist meine Devise.' },
	{ id: 11, text: 'Wenn ich eine Meinung äußere, begründe ich sie.' },
	{ id: 12, text: 'Wenn ich einen Wunsch habe, erfülle ich ihn mir schnell.' },
	{
		id: 13,
		text: 'Ich liefere einen Bericht erst ab, wenn ich ihn mehrere Male überarbeitet habe.'
	},
	{ id: 14, text: 'Leute, die „herumtrödeln“, regen mich auf.' },
	{ id: 15, text: 'Es ist für mich wichtig, von anderen akzeptiert zu werden.' },
	{ id: 16, text: 'Ich habe eher eine harte Schale, aber einen weichen Kern.' },
	{
		id: 17,
		text: 'Ich versuche oft herauszufinden, was andere von mir erwarten, um mich danach zu richten.'
	},
	{
		id: 18,
		text: 'Leute, die unbekümmert in den Tag hineinleben, kann ich nur schwer verstehen.'
	},
	{ id: 19, text: 'Bei Diskussionen unterbreche ich die anderen oft.' },
	{ id: 20, text: 'Ich löse meine Probleme selbst.' },
	{ id: 21, text: 'Aufgaben erledige ich möglichst rasch.' },
	{ id: 22, text: 'Im Umgang mit anderen bin ich auf Distanz bedacht.' },
	{ id: 23, text: 'Ich sollte viele Aufgaben noch besser erledigen.' },
	{ id: 24, text: 'Ich kümmere mich persönlich auch um nebensächliche Dinge.' },
	{ id: 25, text: 'Erfolge fallen nicht vom Himmel, ich muss sie hart erarbeiten.' },
	{ id: 26, text: 'Für dumme Fehler habe ich wenig Verständnis.' },
	{
		id: 27,
		text: 'Ich schätze es, wenn andere meine Fragen rasch und bündig beantworten.'
	},
	{
		id: 28,
		text: 'Es ist mir wichtig, von anderen zu erfahren, ob ich meine Sache gut gemacht habe.'
	},
	{
		id: 29,
		text: 'Wenn ich eine Aufgabe einmal begonnen habe, führe ich sie auch zu Ende.'
	},
	{
		id: 30,
		text: 'Ich stelle meine Wünsche und Bedürfnisse zugunsten der Bedürfnisse anderer Personen zurück.'
	},
	{
		id: 31,
		text: 'Ich bin anderen gegenüber oft hart, um von ihnen nicht verletzt zu werden.'
	},
	{
		id: 32,
		text: 'Ich trommle oft ungeduldig mit den Fingern auf den Tisch (ich bin ungeduldig).'
	},
	{
		id: 33,
		text: 'Beim Erklären von Sachverhalten verwende ich gerne die klare Aufzählung: Erstens…, zweitens…, drittens.'
	},
	{
		id: 34,
		text: 'Ich glaube, dass die meisten Dinge nicht so einfach sind, wie viele meinen.'
	},
	{ id: 35, text: 'Es ist mir unangenehm, andere Leute zu kritisieren.' },
	{ id: 36, text: 'Bei Diskussionen nicke ich häufig mit dem Kopf.' },
	{ id: 37, text: 'Ich strenge mich an, um meine Ziele zu erreichen.' },
	{ id: 38, text: 'Mein Gesichtsausdruck ist eher ernst.' },
	{ id: 39, text: 'Ich bin nervös.' },
	{ id: 40, text: 'So schnell kann mich nichts erschüttern.' },
	{ id: 41, text: 'Meine Probleme gehen die anderen nichts an.' },
	{ id: 42, text: 'Ich sage oft: „Tempo, Tempo, das muss rascher gehen!“' },
	{ id: 43, text: 'Ich sage oft: „genau“, „exakt“, „logisch“, „klar“ u. ä.' },
	{ id: 44, text: 'Ich sage oft: „Das verstehe ich nicht…“' },
	{
		id: 45,
		text: 'Ich sage gerne: „Könnten Sie es nicht einmal versuchen?“ und sage nicht gerne: „Versuchen Sie es einmal.“'
	},
	{ id: 46, text: 'Ich bin diplomatisch.' },
	{ id: 47, text: 'Ich versuche, die an mich gestellten Erwartungen zu übertreffen.' },
	{ id: 48, text: 'Ich mache manchmal zwei Tätigkeiten gleichzeitig.' },
	{ id: 49, text: '„Die Zähne zusammenbeißen“ heißt meine Devise.' },
	{
		id: 50,
		text: 'Trotz enormer Anstrengungen will mir vieles einfach nicht gelingen.'
	}
];

export const categories: Category[] = [
	{
		id: 'sei-perfekt',
		label: 'Sei perfekt',
		questionIds: [1, 8, 11, 13, 23, 24, 33, 38, 43, 47]
	},
	{
		id: 'mach-schnell',
		label: 'Mach schnell',
		questionIds: [3, 12, 14, 19, 21, 27, 32, 39, 42, 48]
	},
	{
		id: 'streng-dich-an',
		label: 'Streng dich an',
		questionIds: [4, 6, 10, 18, 25, 29, 34, 37, 44, 50]
	},
	{
		id: 'mach-es-allen-recht',
		label: 'Mach es allen recht',
		questionIds: [2, 7, 15, 17, 28, 30, 35, 36, 45, 46]
	},
	{
		id: 'sei-stark',
		label: 'Sei stark',
		questionIds: [5, 9, 16, 20, 22, 26, 31, 40, 41, 49]
	}
];

export const CATEGORY_MAX = 50;
export const TOTAL_MIN = questions.length;
export const TOTAL_MAX = questions.length * 5;

export function getLevel(score: number): Level {
	if (score >= 40) return 'gesundheitsgefaehrdend';
	if (score >= 30) return 'beeintraechtigung';
	return 'foerderlich';
}

export function getLevelLabel(level: Level): string {
	switch (level) {
		case 'foerderlich':
			return 'förderlich';
		case 'beeintraechtigung':
			return 'mögliche Leistungsbeeinträchtigung';
		case 'gesundheitsgefaehrdend':
			return 'möglicherweise gesundheitsgefährdend';
	}
}

export function scoreCategory(
	answers: Partial<Record<number, Rating>>,
	category: Category
): number {
	return category.questionIds.reduce((sum, id) => sum + (answers[id] ?? 0), 0);
}

export function scoreAll(answers: Partial<Record<number, Rating>>): CategoryScore[] {
	return categories.map((category) => {
		const score = scoreCategory(answers, category);
		const level = getLevel(score);
		return {
			id: category.id,
			label: category.label,
			score,
			max: CATEGORY_MAX,
			level,
			levelLabel: getLevelLabel(level)
		};
	});
}

export function totalScore(answers: Partial<Record<number, Rating>>): number {
	return questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}
