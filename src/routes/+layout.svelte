<script>
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import '../app.css';
  import { theme } from '$lib/stores/theme';

  export let children;

  // Apply theme on mount
  onMount(() => {
    document.documentElement.classList.toggle('dark', $theme === 'dark');
  });

  // Handle auth redirects
  $: if (browser) {
    const publicPaths = ['/', '/login', '/signup'];
    const isPublicPath = publicPaths.includes($page.url.pathname);
    
    if ($authStore.user && isPublicPath) {
      goto('/dashboard');
    } else if (!$authStore.user && !isPublicPath) {
      goto('/login');
    }
  }
</script>

{#if $authStore.user}
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <Navbar />
    <main class="container mx-auto p-4 pt-20">
      {@render children()}
    </main>
  </div>
{:else}
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <main>
      {@render children()}
    </main>
  </div>
{/if}

<style>
  main {
    min-height: calc(100vh - 5rem);
  }
</style>