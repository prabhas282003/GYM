<script>
    import { feedbackStore } from '$lib/stores/feedback';
    
    let rating = 0;
    let comments = '';
    let isSubmitting = false;
    let showSuccess = false;

    const submitFeedback = () => {
        if (rating === 0) return;
        
        isSubmitting = true;
        feedbackStore.addFeedback({
            rating,
            comments
        });
        
        isSubmitting = false;
        showSuccess = true;
        rating = 0;
        comments = '';
        
        setTimeout(() => showSuccess = false, 3000);
    };
</script>

<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-3 dark:text-white">Give us feedback</h3>
    
    <div class="mb-4">
        <p class="text-sm mb-2 dark:text-gray-300">How would you rate your experience?</p>
        <div class="flex space-x-1">
            {#each [1, 2, 3, 4, 5] as star}
                <button
                    on:click={() => rating = star}
                    class="text-2xl focus:outline-none"
                >
                    {#if star <= rating}
                        <span class="text-yellow-400">★</span>
                    {:else}
                        <span class="text-gray-300 dark:text-gray-500">★</span>
                    {/if}
                </button>
            {/each}
        </div>
    </div>
    
    <div class="mb-4">
        <label for="comments" class="block text-sm mb-1 dark:text-gray-300">Additional comments</label>
        <textarea
            id="comments"
            bind:value={comments}
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            rows="3"
            placeholder="What can we improve?"
        ></textarea>
    </div>
    
    <button
        on:click={submitFeedback}
        disabled={isSubmitting || rating === 0}
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
    >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
    </button>
    
    {#if showSuccess}
        <p class="mt-2 text-green-500 text-center">Thank you for your feedback!</p>
    {/if}
</div>