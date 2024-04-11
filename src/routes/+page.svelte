<script lang="ts">
	import { getCode, getName } from '$lib';
	import { onMount } from 'svelte';
	let room = $state('');
	let name = $state('');

	let modal: HTMLDialogElement;

	onMount(() => {
		name = localStorage.getItem('name') || getName();
		const showHelp = !localStorage.getItem('name');
		if (showHelp) modal.showModal();
	});

	$effect(() => {
		localStorage.setItem('name', name);
	});

	$effect(() => {
		room = room.toUpperCase();
	});
</script>

<div class="flex flex-col items-center gap-2">
	<p class="neon-red neonText mb-12 font-[Neonderthaw] text-7xl font-extrabold">illumirace</p>
	<div class="mb-12 flex items-center justify-center gap-2">
		<span class="text-4xl">Hi</span>
		<input
			type="text"
			bind:value={name}
			class="input input-lg input-bordered w-60 border-red-500 text-center shadow-xl shadow-black"
			placeholder="Name"
		/>
		<button
			onclick={() => (name = getName())}
			class="btn btn-lg border-0 bg-transparent p-0 text-4xl">🎲</button
		>
	</div>

	<div class="flex gap-2">
		<input
			type="text"
			bind:value={room}
			class="input input-lg input-bordered border-red-500 pr-4 font-mono text-4xl tracking-widest shadow-xl shadow-black"
			autocorrect="off"
			autocomplete="off"
			autocapitalize="off"
			maxlength="4"
			size="4"
			placeholder="____"
		/>
		<a
			class="btn btn-primary btn-lg shadow-xl shadow-black"
			href={room.length < 4 ? 'javascript:void(0)' : `/${room}?name=${name}`}>Join</a
		>
	</div>
	<div class="divider select-none">OR</div>
	<a
		class="neon-red lit btn btn-outline btn-primary btn-lg w-60 border-2 shadow-xl shadow-black"
		href="/{getCode()}?name={name}">Host a New Game</a
	>

	<button class="mt-16 underline" onclick={() => modal.showModal()}>Show Help</button>
</div>

<dialog id="my_modal" class="modal" bind:this={modal}>
	<div class="modal-box flex flex-col gap-4">
		<h1 class="text-lg font-bold">Simple Multiplayer Reaction Game</h1>
		<div class="divider"></div>
		<p class="">
			Create a new game room, and share the code with friends, or join with a code shared with you.
		</p>
		<p class="">The "game" is simple - you'll be shown a grid of 1, 4, or 9 lights.</p>
		<p class="">They will light in a random order, but everyone in the same room gets the same.</p>
		<p class="">
			Click them all as fast as you can. A wrong move will be penalised with +0.5 seconds.
		</p>
		<p class="">Fastest to click them all wins!</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
