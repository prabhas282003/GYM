<script>
    import { diaryStore } from '$lib/stores/diary';
    import { goto } from '$app/navigation';
    
    let content = '';
    let isSubmitting = false;
  
    async function saveEntry() {
      if (!content.trim()) return;
      isSubmitting = true;
      await diaryStore.addEntry({ content });
      isSubmitting = false;
      goto('/dashboard');
    }
  </script>
  
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">New Diary Entry</h1>
    
    <textarea
      bind:value={content}
      class="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white mb-4"
      rows="10"
      placeholder="Write your thoughts here..."
    ></textarea>
    
    <div class="flex justify-end space-x-3">
      <a 
        href="/dashboard" 
        class="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Cancel
      </a>
      <button
        on:click={saveEntry}
        disabled={!content.trim() || isSubmitting}
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </button>
    </div>
  </div>