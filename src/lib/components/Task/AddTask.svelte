<script>
    import { taskStore } from '$lib/stores/tasks';
    import VoiceInput from './VoiceInput.svelte';
  
    let title = '';
    let description = '';
    let dueDate = '';
    let priority = 'medium';
    let space = 'Personal';
    let category = '';
    
    const spaces = ['Personal', 'Work', 'Health', 'Finance'];
    const priorities = [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ];
    const categories = ['Meeting', 'Study', 'Exercise', 'Shopping', 'Other'];
  
    function addTask() {
      if (!title.trim()) return;
      
      taskStore.addTask({
        title,
        description,
        dueDate,
        priority,
        space,
        category
      });
      
      // Reset form
      title = '';
      description = '';
      dueDate = '';
      priority = 'medium';
      category = '';
    }
  
    function handleVoiceResult(text) {
      title = text;
    }
  </script>
  
  <div class="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4 dark:text-white">Add New Task</h2>
    <form on:submit|preventDefault={addTask}>
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
          <input
            bind:value={title}
            placeholder="Task title"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <!-- Description -->
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
          <textarea
            bind:value={description}
            placeholder="Task description"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            rows="3"
          ></textarea>
        </div>
        
        <!-- Space and Priority -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Space</label>
            <select
              bind:value={space}
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {#each spaces as spaceOption}
                <option value={spaceOption}>{spaceOption}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Priority</label>
            <select
              bind:value={priority}
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {#each priorities as p}
                <option value={p.value}>{p.label}</option>
              {/each}
            </select>
          </div>
        </div>
        
        <!-- Due Date and Category -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Due Date</label>
            <input
              type="datetime-local"
              bind:value={dueDate}
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
            <select
              bind:value={category}
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select category</option>
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
          </div>
        </div>
        
        <!-- Submit and Voice Input -->
        <div class="flex gap-2">
          <button
            type="submit"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
          >
            Add Task
          </button>
          <VoiceInput onResult={handleVoiceResult} />
        </div>
      </div>
    </form>
  </div>