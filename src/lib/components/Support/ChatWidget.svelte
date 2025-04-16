<script>
    import { chatStore } from '$lib/stores/chat';
    
    let message = '';
    let isOpen = false;
    let isLoading = false;

    const sendMessage = () => {
        if (!message.trim()) return;
        
        // Add user message
        chatStore.addMessage({
            text: message,
            sender: 'user'
        });
        
        const userMessage = message;
        message = '';
        isLoading = true;
        
        // Simulate bot response
        setTimeout(() => {
            let response = "Thanks for your message! Our team will get back to you soon.";
            
            if (userMessage.toLowerCase().includes('help')) {
                response = "I can help with account issues, feature questions, or bug reports. What do you need assistance with?";
            } else if (userMessage.toLowerCase().includes('feature')) {
                response = "We're always working on new features! Your feedback helps us prioritize what to build next.";
            }
            
            chatStore.addMessage({
                text: response,
                sender: 'support'
            });
            isLoading = false;
        }, 1000);
    };
</script>

<div class="fixed bottom-4 right-4 z-50">
    {#if isOpen}
        <div class="w-80 bg-white dark:bg-gray-800 rounded-t-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
                <h3 class="font-medium">Customer Support</h3>
                <button on:click={() => isOpen = false} class="text-white hover:text-gray-200">
                    ×
                </button>
            </div>
            
            <div class="h-64 p-3 overflow-y-auto">
                {#each $chatStore as msg}
                    <div class={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <div class={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            {msg.text}
                        </div>
                        <p class="text-xs text-gray-500 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                    </div>
                {/each}
                
                {#if isLoading}
                    <div class="text-left">
                        <div class="inline-block p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                            <div class="flex space-x-1">
                                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            
            <div class="p-3 border-t border-gray-200 dark:border-gray-700">
                <form on:submit|preventDefault={sendMessage} class="flex">
                    <input
                        bind:value={message}
                        class="flex-1 p-2 border rounded-l-lg dark:bg-gray-700 dark:text-white"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    {:else}
        <button
            on:click={() => isOpen = true}
            class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
            💬
        </button>
    {/if}
</div>