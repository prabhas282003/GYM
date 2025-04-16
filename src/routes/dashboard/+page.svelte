<script>
  import { taskStore } from '$lib/stores/tasks';
  import { diaryStore } from '$lib/stores/diary';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  // Dynamic imports for client-side only components
  let AddTask, TaskList, CategoryOverview, ReminderWidget, StatsCard, DiaryEntry, AddDiaryButton;
  let showModal = false;
  let selectedDateTime = '';

  if (browser) {
    Promise.all([
      import('$lib/components/Task/AddTask.svelte'),
      import('$lib/components/Task/TaskList.svelte'),
      import('$lib/components/Task/CategoryOverview.svelte'),
      import('$lib/components/Reminder/ReminderWidget.svelte'),
      import('$lib/components/StatsCard.svelte'),
      import('$lib/components/Diary/DiaryEntry.svelte'),
      import('$lib/components/Diary/AddDiaryButton.svelte')
    ]).then((modules) => {
      [
        AddTask, 
        TaskList, 
        CategoryOverview, 
        ReminderWidget, 
        StatsCard,
        DiaryEntry,
        AddDiaryButton
      ] = modules.map(m => m.default);
    });
  }

  // Calculate stats
  $: totalTasks = $taskStore.length;
  $: completedTasks = $taskStore.filter(t => t.completed).length;
  $: pendingTasks = totalTasks - completedTasks;
  $: urgentTasks = $taskStore.filter(t => t.priority === 'high' && !t.completed).length;
  
  // Safely handle diary entries
  $: recentDiaries = browser && $diaryStore ? $diaryStore.slice().reverse().slice(0, 3) : [];

  const rescheduleTasks = () => {
    if (selectedDateTime) {
      taskStore.rescheduleOverdueTasks(new Date(selectedDateTime));
      showModal = false;
    }
  };
</script>

<div class="py-6">
  <!-- Stats Cards Row -->
  {#if browser && StatsCard}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <svelte:component this={StatsCard} 
        title="Total Tasks" 
        value={totalTasks} 
        icon="📋"
        color="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" />
      
      <svelte:component this={StatsCard} 
        title="Completed" 
        value={completedTasks} 
        icon="✅"
        color="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" />
      
      <svelte:component this={StatsCard} 
        title="Pending" 
        value={pendingTasks} 
        icon="⏳" 
        color="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" />
      
      <svelte:component this={StatsCard} 
        title="Urgent" 
        value={urgentTasks} 
        icon="⚠️"
        color="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300" />
    </div>
  {/if}

  <!-- Main Content -->
  {#if browser && AddTask && TaskList && CategoryOverview && ReminderWidget && DiaryEntry && AddDiaryButton}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Tasks Section -->
      <div class="lg:col-span-2 space-y-6">
        <svelte:component this={AddTask} />
        <svelte:component this={TaskList} tasks={$taskStore} />
      </div>
      
      <!-- Sidebar Section -->
      <div class="space-y-6">
        <!-- Diary Journal Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold dark:text-white">Diary Entries</h2>
            <svelte:component this={AddDiaryButton} />
          </div>
          
          {#if recentDiaries.length === 0}
            <div class="text-center py-4 text-gray-500 dark:text-gray-400">
              No diary entries yet
            </div>
          {:else}
            <div class="space-y-4">
              {#each recentDiaries as entry}
                <svelte:component this={DiaryEntry} {entry} />
              {/each}
            </div>
          {/if}
        </div>

        <!-- Reminders and Categories -->
        <svelte:component this={ReminderWidget} tasks={$taskStore} />
        <svelte:component this={CategoryOverview} tasks={$taskStore} />

        <!-- Reschedule Button -->
        <button 
          on:click={() => showModal = true}
          class="w-full p-3 bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-300 rounded-lg transition flex items-center justify-center gap-2"
        >
          Reschedule Overdue Tasks
        </button>

        <!-- Modal for selecting date and time -->
        {#if showModal}
          <div class="modal">
            <div class="modal-content">
              <h2>Select Date and Time</h2>
              <input 
                type="datetime-local" 
                bind:value={selectedDateTime} 
                class="p-2 border rounded"
              />
              <div class="modal-actions">
                <button on:click={rescheduleTasks} class="p-2 bg-blue-500 text-white rounded">Reschedule</button>
                <button on:click={() => showModal = false} class="p-2 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
      Loading dashboard...
    </div>
  {/if}
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  .modal-actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>