<script>
    import { authStore } from '$lib/stores/auth';
  
    function handleLogout() {
      authStore.logout();
    }
  </script>
  
  <button 
    on:click={handleLogout}
    class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
  >
    Log Out
  </button>