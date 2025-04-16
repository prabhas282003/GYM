import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const DIARY_KEY = "daily-planner-diaries";

function createDiaryStore() {
	const initialEntries = browser ? JSON.parse(localStorage.getItem(DIARY_KEY)) || [] : [];
	const { subscribe, update } = writable(initialEntries);

	return {
		subscribe,
		addEntry: (entry) => {
			if (!browser) return;
			update(entries => {
				const newEntry = {
					...entry,
					id: Date.now().toString(),
					createdAt: new Date().toISOString()
				};
				const updated = [...entries, newEntry];
				localStorage.setItem(DIARY_KEY, JSON.stringify(updated));
				return updated;
			});
		},
		editEntry: (id, updatedContent) => {
			if (!browser) return;
			update(entries => {
				const updated = entries.map(entry =>
					entry.id === id ? { ...entry, ...updatedContent } : entry
				);
				localStorage.setItem(DIARY_KEY, JSON.stringify(updated));
				return updated;
			});
		},
		deleteEntry: (id) => {
			if (!browser) return;
			update(entries => {
				const updated = entries.filter(entry => entry.id !== id);
				localStorage.setItem(DIARY_KEY, JSON.stringify(updated));
				return updated;
			});
		}
	};
}

export const diaryStore = createDiaryStore();
