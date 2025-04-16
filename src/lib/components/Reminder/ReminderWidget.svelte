<script>
    export let tasks = [];
    
    let upcomingReminders = [];
    let pastDueReminders = [];
    
    $: {
      const now = new Date();
      const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Next 24 hours
      
      upcomingReminders = tasks
        .filter(task => 
          !task.completed && 
          task.dueDate && 
          new Date(task.dueDate) > now && 
          new Date(task.dueDate) < soon
        )
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      
      pastDueReminders = tasks
        .filter(task => 
          !task.completed && 
          task.dueDate && 
          new Date(task.dueDate) < now
        )
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }
  
    function formatDueDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffHours = Math.floor((date - now) / (1000 * 60 * 60));
      
      if (diffHours < 0) {
        return `${Math.abs(diffHours)}h overdue`;
      } else if (diffHours < 24) {
        return `in ${diffHours}h`;
      } else {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
  </script>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="font-semibold p-4 border-b dark:border-gray-700 dark:text-white">Reminders</h3>
    
    <div class="divide-y dark:divide-gray-700">
      <!-- Past Due Reminders -->
      {#if pastDueReminders.length > 0}
        <div class="p-4 bg-red-50 dark:bg-red-900/20">
          <h4 class="text-sm font-medium mb-2 text-red-600 dark:text-red-300">Overdue ({pastDueReminders.length})</h4>
          <ul class="space-y-3">
            {#each pastDueReminders as task}
              <li class="flex items-start gap-3">
                <div class="flex-1">
                  <p class="text-sm font-medium dark:text-white">
                    {task.title}
                    <span class="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                      OVERDUE
                    </span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-300">
                    {formatDueDate(task.dueDate)} • {task.space}
                  </p>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      
      <!-- Upcoming Reminders -->
      <div class="p-4">
        <h4 class="text-sm font-medium mb-2 dark:text-gray-300">Upcoming ({upcomingReminders.length})</h4>
        {#if upcomingReminders.length === 0}
          <p class="text-xs text-gray-500 dark:text-gray-400">No upcoming reminders</p>
        {:else}
          <ul class="space-y-3">
            {#each upcomingReminders as task}
              <li class="flex items-start gap-3">
                <div class="flex-1">
                  <p class="text-sm font-medium dark:text-white">
                    {task.title}
                    {#if task.priority === 'high'}
                      <span class="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                        URGENT
                      </span>
                    {/if}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-300">
                    {formatDueDate(task.dueDate)} • {task.space}
                    {#if task.category}
                      • <span class="text-blue-500">{task.category}</span>
                    {/if}
                  </p>
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>