<script>
	export let entry;
	import { diaryStore } from '$lib/stores/diary';

	let isEditing = false;
	let editedContent = entry.content;

	function formatDate(dateString) {
	return new Date(dateString).toLocaleString();
	}
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
	{#if isEditing}
	<textarea
      bind:value={editedContent}
      class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
      rows="4"
    ></textarea>
	<div class="flex justify-end space-x-2">
		<button
		  on:click={() =>isEditing = false}
			class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
			>
			Cancel
		</button>
		<button
		  on:click={() =>
			{
			diaryStore.editEntry(entry.id, { content: editedContent });
			isEditing = false;
			}}
			class="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
			>
			Save
		</button>
	</div>
	{:else}
	<p class="whitespace-pre-wrap dark:text-white">{entry.content}</p>
	<div class="flex justify-between items-center mt-2">
		<span class="text-xs text-gray-500 dark:text-gray-400">
			{formatDate(entry.updatedAt)}
		</span>
		<div class="flex space-x-2">
			<button
			  on:click={() =>
				{
				isEditing = true;
				editedContent = entry.content;
				}}
				class="text-xs text-blue-500 hover:text-blue-700"
				>
				Edit
			</button>
			<button
			  on:click={() =>
				diaryStore.deleteEntry(entry.id)}
				class="text-xs text-red-500 hover:text-red-700"
				>
				Delete
			</button>
		</div>
	</div>
	{/if}
</div>