import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const LOCAL_STORAGE_KEY = "daily-planner-tasks";

function createTaskStore() {
  const initialTasks = browser ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [] : [];
  
  const { subscribe, set, update } = writable(initialTasks);

  // Helper function to save tasks to localStorage
  const saveTasks = (tasks) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    return tasks;
  };

  // Reschedule a task to a specific date and time
  const rescheduleTask = (task, newDateTime) => {
    const newDueDate = new Date(newDateTime);

    return {
      ...task,
      dueDate: newDueDate.toISOString(),
      wasRescheduled: true,
      lastLocationAlert: null // Reset location alerts
    };
  };

  const store = {
    subscribe,
    addTask: (task) => {
      if (!browser) return;
      
      update(tasks => {
        const newTask = {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          completed: false,
          priority: task.priority || 'medium',
          space: task.space || 'Personal',
          category: task.category || '',
          description: task.description || '',
          location: task.location || null,
          lastLocationAlert: null,
          wasRescheduled: false
        };
        return saveTasks([...tasks, newTask]);
      });
    },
    toggleTask: (id) => {
      if (!browser) return;
      
      update(tasks => {
        const newTasks = tasks.map(t => 
          t.id === id ? { 
            ...t, 
            completed: !t.completed,
            completedAt: !t.completed ? new Date().toISOString() : null,
            lastLocationAlert: !t.completed ? null : t.lastLocationAlert
          } : t
        );
        return saveTasks(newTasks);
      });
    },
    deleteTask: (id) => {
      if (!browser) return;
      
      update(tasks => saveTasks(tasks.filter(t => t.id !== id)));
    },
    updateTask: (id, updates) => {
      if (!browser) return;
      
      update(tasks => {
        const newTasks = tasks.map(t => 
          t.id === id ? { ...t, ...updates } : t
        );
        return saveTasks(newTasks);
      });
    },
    rescheduleOverdueTasks: (selectedDateTime) => {
      if (!browser) return;
      
      update(tasks => {
        const now = new Date();
        const newTasks = tasks.map(task => {
          if (task.completed || !task.dueDate) return task;
          
          const dueDate = new Date(task.dueDate);
          const isOverdue = dueDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          if (isOverdue) {
            return rescheduleTask(task, selectedDateTime);
          }
          return task;
        });
        return saveTasks(newTasks);
      });
    },
    manuallyRescheduleTask: (taskId, selectedDateTime) => {
      if (!browser) return;
      
      update(tasks => {
        const newTasks = tasks.map(task => {
          if (task.id === taskId) {
            return rescheduleTask(task, selectedDateTime);
          }
          return task;
        });
        return saveTasks(newTasks);
      });
    }
  };

  // Initialize auto-rescheduling when store is created
  if (browser) {
    // First run immediately
    store.rescheduleOverdueTasks(new Date());

    // Calculate time until next midnight
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );
    const msUntilMidnight = midnight - now;
    
    // Set up daily check at midnight
    setTimeout(() => {
      store.rescheduleOverdueTasks(new Date());
      // Repeat every 24 hours
      setInterval(() => store.rescheduleOverdueTasks(new Date()), 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
  }

  return store;
}

export const taskStore = createTaskStore();