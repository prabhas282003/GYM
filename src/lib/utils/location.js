export function setupLocationReminders(tasks) {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        tasks.forEach(task => {
          if (task.location) {
            const distance = calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              task.location.lat,
              task.location.lng
            );
            if (distance < 0.5) { // 500m proximity
              alert(`You're near ${task.title}`); // Replace with Toast
            }
          }
        });
      });
    }
  }
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }