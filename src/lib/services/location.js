import { taskStore } from '$lib/stores/tasks';
import { browser } from '$app/environment';

let watchId = null;
const MAX_DISTANCE_KM = 0.5; // 500 meters

export function startLocationReminders() {
    if (!browser || !navigator.geolocation) return;
    
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
    
    watchId = navigator.geolocation.watchPosition(
        (position) => checkNearbyTasks(position.coords),
        (error) => console.error('Geolocation error:', error),
        { enableHighAccuracy: true, maximumAge: 10000 }
    );
}

export function stopLocationReminders() {
    if (watchId && browser) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function checkNearbyTasks(coords) {
    const tasks = $taskStore;
    const now = new Date();
    
    tasks.forEach(task => {
        if (task.completed || !task.location) return;
        
        const distance = getDistance(
            coords.latitude,
            coords.longitude,
            task.location.lat,
            task.location.lng
        );
        
        if (distance <= MAX_DISTANCE_KM && (!task.lastLocationAlert || 
            new Date(now - new Date(task.lastLocationAlert)) > 30 * 60 * 1000)) {
            
            showLocationAlert(task);
            
            // Update task to prevent repeated alerts
            taskStore.update(t => t.id === task.id ? {
                ...t,
                lastLocationAlert: new Date().toISOString()
            } : t);
        }
    });
}

function showLocationAlert(task) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`📍 You're near a task location`, {
            body: `${task.title} - ${task.location.name || 'Task location'}`,
            icon: '/map-icon.png'
        });
    } else {
        alert(`You're near "${task.title}" task location!`);
    }
}

// Haversine formula to calculate distance between coordinates
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}