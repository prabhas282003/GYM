<script>
    import { authStore } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
    let error = '';
    let isLoading = false;
  
    async function handleLogin() {
      error = '';
      isLoading = true;
      
      try {
        const success = await authStore.login(email, password);
        if (success) {
          goto('/dashboard');
        }
      } catch (err) {
        error = err.message;
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-6 text-center dark:text-white">Log In</h1>
      
      {#if error}
        <div class="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      {/if}
  
      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div class="mt-4 text-center text-sm dark:text-gray-400">
        Don't have an account? <a href="/signup" class="text-blue-600 hover:underline dark:text-blue-400">Sign up</a>
      </div>
    </div>
  </div>