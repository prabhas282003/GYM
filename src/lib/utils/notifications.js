import { get } from 'svelte/store';
import { taskStore } from '$lib/stores/tasks';

export function checkReminders(tasks) {
  if (!('Notification' in window)) return;

  const now = new Date();
  const soon = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now

  tasks.forEach(task => {
    if (task.completed || !task.dueDate) return;
    
    const dueDate = new Date(task.dueDate);
    if (dueDate >= now && dueDate <= soon) {
      showNotification(task);
    }
  });
}

function showNotification(task) {
  if (Notification.permission === 'granted') {
    new Notification(`Reminder: ${task.title}`, {
      body: `Due: ${new Date(task.dueDate).toLocaleTimeString()}`,
      icon: '/notification-icon.png'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') showNotification(task);
    });
  }
}

// Check every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => checkReminders(get(taskStore)), 5 * 60 * 1000);
}