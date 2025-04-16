<script>
    export let rating = 0;
  </script>
  
  <div class="flex items-center">
    {#each [1, 2, 3, 4, 5] as star}
      <button 
        on:click={() => rating = star}
        class="text-2xl {rating >= star ? 'text-yellow-400' : 'text-gray-300'}"
      >
        ★
      </button>
    {/each}
  </div>