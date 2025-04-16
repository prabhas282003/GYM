<script>
    let listening = false;
    let error = '';
    
    export let onResult;
  
    function toggleListening() {
      if (!('webkitSpeechRecognition' in window)) {
        error = "Voice input not supported in your browser";
        return;
      }
  
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
  
      if (!listening) {
        recognition.start();
        recognition.onresult = (e) => {
          onResult(e.results[0][0].transcript);
        };
        recognition.onerror = (e) => {
          error = "Error occurred in recognition: " + e.error;
        };
      } else {
        recognition.stop();
      }
      listening = !listening;
    }
  </script>
  
  <button
    on:click|preventDefault={toggleListening}
    class="p-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center gap-2"
  >
    {#if listening}
      <span class="animate-pulse">🎤 Listening...</span>
    {:else}
      <span>🎤 Voice Input</span>
    {/if}
  </button>
  
  {#if error}
    <p class="text-red-500 text-sm mt-1">{error}</p>
  {/if}