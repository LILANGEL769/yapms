<script lang="ts">
    import { fly } from 'svelte/transition';
    import { CurrentQuestion, Questions } from '$lib/stores/GameState';

	let messages = [
		{
			text: 'Testing...',
			type: 'start'
		},
		{
			text: 'Another one...',
			type: 'end'
		}
	];

    $: console.log(Questions);

</script>

{#each $Questions as message, index}
    {#if message.answer !== null || $CurrentQuestion === index}
	<div class="chat chat-start"
        in:fly={{ x: -200, duration: 200, delay: 200 }}
    >
		<div class="chat-bubble">{message.text}</div>
	</div>
    {/if}
    {#if message.answer !== null}
        <div class="chat chat-end"
            in:fly={{ x: 200, duration: 200, delay: 200 }}
        >
            <div class="chat-bubble">{message.answer}</div>
        </div>
    {/if}
{/each}

<button
	class="btn btn-primary sticky"
	on:click={() => {
		messages = [
			...messages,
			{
				text: 'Testing...',
				type: Math.random() > 0.5 ? 'start' : 'end'
			}
		];
	}}
>
	Add message
</button>
