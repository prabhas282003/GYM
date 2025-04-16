<script>
	import { diaryStore } from '$lib/stores/diary';
	import { onDestroy } from 'svelte';

	let inputContent = '';
	let isEditing = false;
	let editingId = null;
	let entries = [];

	// Subscribe to store
	const unsubscribe = diaryStore.subscribe(value => {
	entries = value;
	});

	onDestroy(unsubscribe);

	function saveEntry() {
	if (inputContent.trim() === '') {
	alert('Content cannot be empty!');
	return;
	}

	if (isEditing && editingId !== null) {
	console.log('Saving edited entry:', { editingId, inputContent }); // Debug log
	diaryStore.editEntry(editingId, { content: inputContent });
	alert('Entry updated successfully!');
	isEditing = false;
	editingId = null;
	} else {
	diaryStore.addEntry({ content: inputContent });
	alert('Entry added successfully!');
	}

	inputContent = '';
	}

	function startEditing(id, content) {
	isEditing = true;
	editingId = id;
	inputContent = content;
	console.log('Editing started:', { id, content }); // Debug log
	}

	function cancelEditing() {
	isEditing = false;
	editingId = null;
	inputContent = '';
	}

	function deleteEntry(id) {
	if (confirm("Are you sure you want to delete this entry?")) {
	diaryStore.deleteEntry(id);
	}
	}

	$: console.log('Entries updated:', entries); // Debug log
</script>

<div class="p-4">
	<h1 class="text-2xl font-bold mb-4 dark:text-white">Daily Journal</h1>
	<textarea
		bind:value={inputContent}
		class="w-full h-64 p-4 border rounded dark:bg-gray-700 dark:text-white"
		placeholder="Write your thoughts..."
	></textarea>

	<div class="flex space-x-4 mt-4">
		<button on:click={"saveEntry"} class="bg-blue-500 text-white p-2 rounded">
			{isEditing ? 'Update Entry' : 'Save Entry'}
		</button>
		{#if isEditing}
		<button on:click={"cancelEditing"} class="bg-gray-500 text-white p-2 rounded">
			Cancel
		</button>
		{/if}
	</div>

	<div class="mt-8">
		{#each entries as item (item.id)}
		<div class="p-4 border rounded mb-4 dark:bg-gray-800 dark:text-white">
			<p class="whitespace-pre-wrap">{item.content}</p>
			<p class="text-xs text-gray-400 mt-1">Created: {new Date(item.createdAt).toLocaleString()}</p>
			<div class="mt-2 flex space-x-2">
				<button
					on:click=""{() =>
					startEditing(item.id, item.content)}
					class="bg-yellow-500 text-white p-2 rounded"
					>
					Edit
				</button>
				<button
					on:click=""{() =>
					deleteEntry(item.id)}
					class="bg-red-500 text-white p-2 rounded"
					>
					Delete
				</button>
			</div>
		</div>
		{/each}
	</div>
</div>
