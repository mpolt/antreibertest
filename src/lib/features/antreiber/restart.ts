let onRestart: (() => void) | undefined;

export function registerRestart(handler: () => void): () => void {
	onRestart = handler;
	return () => {
		if (onRestart === handler) onRestart = undefined;
	};
}

export function requestRestart(): void {
	onRestart?.();
}
