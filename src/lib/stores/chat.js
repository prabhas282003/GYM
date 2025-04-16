import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CHAT_KEY = 'chat-messages';

function createChatStore() {
    const initialMessages = browser ? JSON.parse(localStorage.getItem(CHAT_KEY)) || [] : [];
    
    const { subscribe, set, update } = writable(initialMessages);

    return {
        subscribe,
        addMessage: (message) => {
            if (!browser) return;
            update(messages => {
                const newMessage = {
                    ...message,
                    id: Date.now(),
                    timestamp: new Date().toISOString()
                };
                const updated = [...messages, newMessage];
                localStorage.setItem(CHAT_KEY, JSON.stringify(updated));
                return updated;
            });
        },
        clear: () => {
            if (!browser) return;
            localStorage.removeItem(CHAT_KEY);
            set([]);
        }
    };
}

export const chatStore = createChatStore();