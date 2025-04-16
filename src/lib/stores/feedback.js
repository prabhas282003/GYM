import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const FEEDBACK_KEY = 'user-feedback';

function createFeedbackStore() {
    const initialData = browser ? JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || [] : [];
    
    const { subscribe, set, update } = writable(initialData);

    return {
        subscribe,
        addFeedback: (feedback) => {
            if (!browser) return;
            update(feedbacks => {
                const newFeedback = {
                    ...feedback,
                    id: Date.now(),
                    date: new Date().toISOString()
                };
                const updated = [...feedbacks, newFeedback];
                localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
                return updated;
            });
        },
        clear: () => {
            if (!browser) return;
            localStorage.removeItem(FEEDBACK_KEY);
            set([]);
        }
    };
}

export const feedbackStore = createFeedbackStore();