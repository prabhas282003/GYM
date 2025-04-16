import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize theme
const initialTheme = browser ? 
  localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') 
  : 'light';

export const theme = writable(initialTheme);

// Sync with localStorage and DOM
if (browser) {
  theme.subscribe($theme => {
    localStorage.setItem('theme', $theme);
    document.documentElement.classList.toggle('dark', $theme === 'dark');
  });
  
  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (e) => {
    if (!localStorage.getItem('theme')) { // Only if user hasn't set preference
      theme.set(e.matches ? 'dark' : 'light');
    }
  };
  mediaQuery.addEventListener('change', handleSystemThemeChange);
}

// Toggle function remains the same
export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light');
}