<script>
    export let task;
    let locationName = '';
    let isGettingLocation = false;
    let error = '';
    
    const addLocation = () => {
        if (!navigator.geolocation) {
            error = "Geolocation is not supported by your browser";
            return;
        }
        
        isGettingLocation = true;
        error = '';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                task.location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    name: locationName
                };
                isGettingLocation = false;
            },
            (err) => {
                error = "Could not get your location: " + err.message;
                isGettingLocation = false;
            },
            { enableHighAccuracy: true }
        );
    };
    
    const removeLocation = () => {
        task.location = null;
        locationName = '';
    };
</script>

<div class="mt-3">
    {#if task.location}
        <div class="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <div>
                <p class="text-sm font-medium dark:text-white">
                    {task.location.name || 'Current location'}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-300">
                    {task.location.lat.toFixed(4)}, {task.location.lng.toFixed(4)}
                </p>
            </div>
            <button
                on:click={removeLocation}
                class="text-red-500 hover:text-red-700"
            >
                ×
            </button>
        </div>
    {:else}
        <div class="space-y-2">
            <input
                bind:value={locationName}
                placeholder="Location name (optional)"
                class="w-full p-2 text-sm border rounded dark:bg-gray-700 dark:text-white"
            />
            <button
                on:click={addLocation}
                disabled={isGettingLocation}
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm disabled:opacity-50"
            >
                {isGettingLocation ? 'Getting Location...' : 'Add Location Reminder'}
            </button>
            {#if error}
                <p class="text-red-500 text-xs">{error}</p>
            {/if}
        </div>
    {/if}
</div>