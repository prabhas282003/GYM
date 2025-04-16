<script>
    import { userStore } from '$lib/stores/user';
    import { theme } from '$lib/stores/theme';
    import { authStore } from '$lib/stores/auth';
  
    let name = $userStore.name;
    let email = $authStore.user?.email || '';
    let avatar = $userStore.avatar;
    let fileInput;
  
    function handleSubmit() {
      userStore.updateProfile({
        name,
        avatar
      });
    }
  
    function handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  </script>
  
  <div class="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">Profile Settings</h1>
  
    <form on:submit|preventDefault={handleSubmit}>
      <!-- Avatar Upload -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative mb-4">
          <img 
            src={avatar || `https://ui-avatars.com/api/?name=${name || 'User'}&background=random`}
            alt="Profile picture"
            class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
          />
          <button
            type="button"
            on:click={() => fileInput.click()}
            class="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
          >
            ✏️
          </button>
          <input 
            bind:this={fileInput}
            type="file" 
            accept="image/*"
            on:change={handleAvatarUpload}
            class="hidden"
          />
        </div>
      </div>
  
      <!-- Name -->
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
        <input
          id="name"
          bind:value={name}
          type="text"
          class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Your name"
        />
      </div>
  
      <!-- Email (read-only) -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
        <div class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
          {email}
        </div>
      </div>
  
      <!-- Theme Preference -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2 dark:text-gray-300">Theme</label>
        <div class="flex items-center gap-4">
          <button
            type="button"
            on:click={() => theme.set('light')}
            class={`p-2 rounded-lg border ${$theme === 'light' ? 'bg-blue-100 border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            ☀️ Light
          </button>
          <button
            type="button"
            on:click={() => theme.set('dark')}
            class={`p-2 rounded-lg border ${$theme === 'dark' ? 'bg-blue-100 border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            🌙 Dark
          </button>
        </div>
      </div>
  
      <!-- Save Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
      >
        Save Changes
      </button>
    </form>
  </div>