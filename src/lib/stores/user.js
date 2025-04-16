import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const USER_KEY = 'user-profile';

function createUserStore() {
  const initialUser = browser ? JSON.parse(localStorage.getItem(USER_KEY)) || {
    name: '',
    email: '',
    avatar: '',
    preferences: {}
  } : { name: '', email: '', avatar: '', preferences: {} };

  const { subscribe, set, update } = writable(initialUser);

  return {
    subscribe,
    updateProfile: (data) => {
      if (!browser) return;
      const newUser = { ...initialUser, ...data };
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      set(newUser);
    },
    clear: () => {
      if (!browser) return;
      localStorage.removeItem(USER_KEY);
      set({ name: '', email: '', avatar: '', preferences: {} });
    }
  };
}

export const userStore = createUserStore();