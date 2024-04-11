<script lang="ts">
	import { onMount } from 'svelte';
	import { room } from './room.svelte';
	const { gameState, me, isHost } = $derived(room);
	let pbs: { buttons: number; pb: number }[] = $state([]);

	onMount(() => {
		pbs = [
			{ buttons: 1, pb: Number(localStorage.getItem(`pb1`) || Infinity) },
			{ buttons: 4, pb: Number(localStorage.getItem(`pb4`) || Infinity) },
			{ buttons: 9, pb: Number(localStorage.getItem(`pb9`) || Infinity) }
		];
	});
</script>

<div data-testid="waiting" class="flex w-full flex-col items-center gap-2">
	{#if me}
		<p class="text-xl">Hi, {me.userName} {isHost ? '(host)' : ''}</p>
		<div
			class="neon-red lit mt-4 flex flex-col items-center gap-2 rounded-xl border-2 border-red-500 p-4"
		>
			<div class="flex flex-nowrap gap-2">
				{#each pbs as pb, i}
					<div class="badge badge-accent h-8 gap-1 font-mono font-semibold">
						<span>{Math.pow(i + 1, 2)}:</span>
						<span>{pb.pb < Infinity ? (pb.pb / 1000).toFixed(3) : '__.___'}s</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if gameState.players.length > 1}
		<!-- content here -->
		<div class="divider">Other Players</div>
		{#each gameState.players as player, i}
			{#if player.id !== me?.id}
				<p class="p-2">
					{player.userName}
					{i === 0 ? '(host)' : ''}
				</p>
			{/if}
		{/each}
	{:else}
		<div class="divider w-full">Waiting for others</div>
	{/if}
</div>

<div class="flex-1"></div>

{#if isHost}
	<button onclick={() => room.startGame()} class="btn btn-primary btn-lg">Start Game</button>
{:else}
	<p class="text-sm">Waiting for host to start the game</p>
{/if}
<a href="/" class="underline">Leave Game</a>
