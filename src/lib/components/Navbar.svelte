<script>
  import { userStore } from '$lib/stores/user';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav class="bg-white dark:bg-gray-800 shadow">
  <div class="container mx-auto px-4 py-3 flex justify-between items-center">
    <a href="/dashboard" class="text-xl font-bold text-gray-800 dark:text-white">
      Daily Planner
    </a>
    <div class="flex items-center gap-4">
      <ThemeToggle />
      <a 
        href="/profile" 
        class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
      >
        {#if $userStore.avatar}
          <img 
            src={$userStore.avatar} 
            alt="Profile" 
            class="w-8 h-8 rounded-full object-cover"
          />
        {:else}
          <span class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            {$userStore.name ? $userStore.name[0].toUpperCase() : 'U'}
          </span>
        {/if}
        <span class="hidden md:inline">{$userStore.name || 'Profile'}</span>
      </a>
    </div>
  </div>
</nav>