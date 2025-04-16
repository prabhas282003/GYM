<script>
    import { taskStore } from '$lib/stores/tasks';
    import { browser } from '$app/environment';
    
    export let task;
  
    const priorityClasses = {
      high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    };
  
    const spaceClasses = {
      Personal: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      Work: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      Health: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
      Finance: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
    };
  
    function formatDate(dateString) {
      if (!dateString) return 'No deadline';
      const date = new Date(dateString);
      return date.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  
    function handlePriorityChange(newPriority) {
      if (browser) {
        taskStore.updateTask(task.id, { priority: newPriority });
      }
    }
  
    function handleSpaceChange(newSpace) {
      if (browser) {
        taskStore.updateTask(task.id, { space: newSpace });
      }
    }
  </script>
  
  <div class={`p-4 rounded-lg shadow mb-3 transition-all duration-200 
    ${task.completed ? 'bg-gray-50 dark:bg-gray-800/50 opacity-80' : 'bg-white dark:bg-gray-800'}
    ${task.priority === 'high' ? 'border-l-4 border-red-500' : 
      task.priority === 'medium' ? 'border-l-4 border-yellow-500' : 
      'border-l-4 border-green-500'}`}>
  
    <!-- Task Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-start flex-1 gap-3 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          on:change={() => taskStore.toggleTask(task.id)}
          class="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        />
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class={`font-medium truncate ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </p>
            
            <!-- Priority Badge -->
            <select
              value={task.priority}
              on:change={(e) => handlePriorityChange(e.target.value)}
              class={`text-xs px-2 py-1 rounded-full cursor-pointer ${priorityClasses[task.priority]}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <!-- Description -->
          {#if task.description}
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">
              {task.description}
            </p>
          {/if}
        </div>
      </div>
      
      <!-- Delete Button -->
      <button 
        on:click={() => taskStore.deleteTask(task.id)}
        class="text-gray-400 hover:text-red-500 transition-colors"
        title="Delete task"
      >
        ✕
      </button>
    </div>
    
    <!-- Task Metadata -->
    <div class="mt-3 flex flex-wrap gap-2 text-xs">
      <!-- Space Selector -->
      <select
        value={task.space}
        on:change={(e) => handleSpaceChange(e.target.value)}
        class={`px-2 py-1 rounded-full cursor-pointer ${spaceClasses[task.space]}`}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Health">Health</option>
        <option value="Finance">Finance</option>
      </select>
      
      <!-- Category -->
      {#if task.category}
        <span class="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
          {task.category}
        </span>
      {/if}
      
      <!-- Due Date -->
      {#if task.dueDate}
        <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          Due: {formatDate(task.dueDate)}
        </span>
      {/if}
      
      <!-- Location -->
      {#if task.location}
        <span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center gap-1">
          📍 {task.location.name || 'Location'}
        </span>
      {/if}
      
      <!-- Rescheduled Notice -->
      {#if task.wasRescheduled}
    <div class="mt-2 text-xs text-yellow-600 dark:text-yellow-300 flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Rescheduled to {new Date(task.dueDate).toLocaleString()}
  </div>
    {/if}
      
      <!-- Completed Date -->
      {#if task.completed && task.completedAt}
        <span class="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
          Completed: {new Date(task.completedAt).toLocaleDateString()}
        </span>
      {/if}
    </div>
    
    <!-- Created Date -->
    <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Created: {new Date(task.createdAt).toLocaleString()}
    </div>
  </div>
  
  <style>
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.5rem center;
      background-size: 1em;
      padding-right: 2rem;
    }
  </style>