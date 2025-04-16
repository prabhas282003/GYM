import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const USER_KEY = 'daily-planner-user';

function createAuthStore() {
    const initialUser = browser ? JSON.parse(localStorage.getItem(USER_KEY)) || null : null;
    
    const { subscribe, set, update } = writable({
        user: initialUser,
        error: null
    });

    return {
        subscribe,
        signUp: async (email, password, name) => {
            if (!browser) return;
            
            try {
                // Check if user exists
                const users = JSON.parse(localStorage.getItem('daily-planner-users')) || [];
                if (users.some(u => u.email === email)) {
                    throw new Error('Email already exists');
                }

                // Create new user
                const newUser = {
                    id: Date.now().toString(),
                    email,
                    password, // Note: In production, hash passwords!
                    name,
                    createdAt: new Date().toISOString()
                };

                // Save user
                localStorage.setItem('daily-planner-users', JSON.stringify([...users, newUser]));
                localStorage.setItem(USER_KEY, JSON.stringify(newUser));
                
                // Update store
                set({ user: newUser, error: null });
                
                return true; // Success
            } catch (error) {
                update(s => ({ ...s, error: error.message }));
                throw error;
            }
        },
        login: async (email, password) => {
            if (!browser) return;
            
            try {
                // Check credentials
                const users = JSON.parse(localStorage.getItem('daily-planner-users')) || [];
                const user = users.find(u => u.email === email && u.password === password);
                
                if (!user) {
                    throw new Error('Invalid email or password');
                }

                // Save session
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                
                // Update store
                set({ user, error: null });
                
                return true; // Success
            } catch (error) {
                update(s => ({ ...s, error: error.message }));
                throw error;
            }
        },
        logout: () => {
            if (!browser) return;
            localStorage.removeItem(USER_KEY);
            set({ user: null, error: null });
        }
    };
}

export const authStore = createAuthStore();