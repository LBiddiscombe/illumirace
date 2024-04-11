<script lang="ts">
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { room } from './room.svelte';
	import type { Player } from '$lib/types';
	import { onMount } from 'svelte';

	const { gameState, me, isHost } = $derived(room);

	let leaderboard: Player[] = $state([]);
	let isPB: boolean = $state(false);

	onMount(() => {
		leaderboard = [...gameState.players].sort((a, b) => {
			return (
				Number(a.results[gameState.buttons.length - 1]) -
				Number(b.results[gameState.buttons.length - 1])
			);
		});

		if (me) {
			const prevPB = Number(localStorage.getItem(`pb${gameState.buttons.length}`) || Infinity);
			if (me.results[gameState.buttons.length - 1] < prevPB) {
				isPB = true;
				localStorage.setItem(
					`pb${gameState.buttons.length}`,
					JSON.stringify(me.results[gameState.buttons.length - 1])
				);
			}
		}
	});
</script>

<div data-testid="results" class="flex w-full flex-col items-center gap-2">
	<p>And the winner is...</p>

	{#each leaderboard as player, i (player.id)}
		<div
			class="rounded-lg p-2 px-4"
			class:bg-accent={i === 0}
			class:text-accent-content={i === 0}
			animate:flip={{ duration: 250, easing: quintOut }}
		>
			{i === 0 ? '🏆 ' : `${i + 1}:`}
			{player.userName}
			{player.id === me?.id ? ' (me)' : ''}
			{` - ${(+player.results[gameState.buttons.length - 1] / 1000).toFixed(3)}s`}
			{#if isPB}
				<div class="badge badge-warning ml-2">pb</div>
			{/if}
		</div>
	{/each}
</div>

<div class="flex-1"></div>

{#if isHost}
	<button onclick={() => room.resetGame()} class="btn btn-primary btn-lg">Play Again</button>
{:else}
	<p class="text-sm">Waiting for host to restart the game</p>
{/if}
<a href="/" class="underline">Leave Game</a>
