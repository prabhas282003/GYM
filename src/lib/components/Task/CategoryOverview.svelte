<script>
    export let tasks = [];
    
    $: categories = {};
    $: {
      // Calculate category counts
      const counts = {};
      tasks.forEach(task => {
        const cat = task.category || 'Uncategorized';
        counts[cat] = (counts[cat] || 0) + 1;
      });
      categories = counts;
    }
  </script>
  
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="font-bold mb-3 dark:text-white">Categories</h3>
    <div class="space-y-2">
      {#each Object.entries(categories) as [category, count]}
        <div class="flex justify-between">
          <span>{category}</span>
          <span class="bg-blue-100 dark:bg-blue-900 px-2 rounded-full">{count}</span>
        </div>
      {/each}
    </div>
  </div>