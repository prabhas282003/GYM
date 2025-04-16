<script>
    import { darkMode } from '$lib/stores/ui';
  </script>
  
  <button 
    on:click={() => $darkMode = !$darkMode}
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    {#if $darkMode}
      <span class="text-white">☀️ Light Mode</span>
    {:else}
      <span>🌙 Dark Mode</span>
    {/if}
  </button>