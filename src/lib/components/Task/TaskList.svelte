<script>
    import { taskStore } from '$lib/stores/tasks';
    export let tasks = [];
    
    const priorityColors = {
      high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    };
  
    function formatDate(dateString) {
      if (!dateString) return 'No deadline';
      const date = new Date(dateString);
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  </script>
  
  <div class="space-y-4">
    {#if tasks.length === 0}
      <div class="text-center py-8 text-gray-500">
        No tasks found. Add your first task above!
      </div>
    {:else}
      <!-- Active Tasks -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-3 dark:text-white">Active Tasks ({tasks.filter(t => !t.completed).length})</h3>
        <div class="space-y-3">
          {#each tasks.filter(t => !t.completed) as task (task.id)}
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 border-{task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-500">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      on:change={() => taskStore.toggleTask(task.id)}
                      class="h-4 w-4"
                    />
                    <span class="font-medium dark:text-white">{task.title}</span>
                  </div>
                  {#if task.description}
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
                  {/if}
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="px-2 py-1 rounded-full {priorityColors[task.priority]}">
                      {task.priority} priority
                    </span>
                    {#if task.space}
                      <span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {task.space}
                      </span>
                    {/if}
                    {#if task.category}
                      <span class="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        {task.category}
                      </span>
                    {/if}
                    {#if task.dueDate}
                      <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        Due: {formatDate(task.dueDate)}
                      </span>
                    {/if}
                  </div>
                </div>
                <button 
                  on:click={() => taskStore.deleteTask(task.id)}
                  class="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
  
      <!-- Completed Tasks -->
      <div>
        <h3 class="text-lg font-semibold mb-3 dark:text-white">Completed Tasks ({tasks.filter(t => t.completed).length})</h3>
        <div class="space-y-3">
          {#each tasks.filter(t => t.completed) as task (task.id)}
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow opacity-75">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      on:change={() => taskStore.toggleTask(task.id)}
                      class="h-4 w-4"
                    />
                    <span class="font-medium line-through dark:text-gray-400">{task.title}</span>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Completed on {new Date(task.completedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button 
                  on:click={() => taskStore.deleteTask(task.id)}
                  class="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>