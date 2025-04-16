<script>
    export let task;
    import { taskStore } from '$lib/stores/tasks';
    let review = '';
  </script>
  
  {#if task.completed && !task.review}
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h4 class="text-sm font-medium mb-2 dark:text-white">How was this task?</h4>
      <textarea
        bind:value={review}
        class="w-full p-2 mb-2 text-sm border rounded dark:bg-gray-700 dark:text-white"
        placeholder="Any notes about this task..."
      ></textarea>
      <button
        on:click={() => {
          taskStore.addReview(task.id, review);
          review = '';
        }}
        class="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
      >
        Save Review
      </button>
    </div>
  {/if}