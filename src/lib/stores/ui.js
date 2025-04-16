
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialDarkMode = false;
if (browser) {
    // Retrieve the saved theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    initialDarkMode = storedTheme === 'dark';
}

export const darkMode = writable(initialDarkMode);

// Subscribe to changes and persist them
if (browser) {
    darkMode.subscribe(value => {
        localStorage.setItem('theme', value ? 'dark' : 'light');

        // Optionally update the HTML element's class to trigger global dark mode styles
        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}
