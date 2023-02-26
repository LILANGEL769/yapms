<script lang="ts">
	import { fly } from 'svelte/transition';
	import CampaignScreen from '$lib/screens/CampaignScreen.svelte';
	import PollsScreen from '$lib/screens/PollsScreen.svelte';

	let currentScreen = 'campaign';

	function gotoPolls() {
		currentScreen = 'polls';
	}

	function gotoCampaign() {
		currentScreen = 'campaign';
	}
</script>

<div class="w-screen">
	{#if currentScreen === 'campaign'}
		<div in:fly={{ x: 200, duration: 200, delay: 200 }} out:fly={{ x: 200, duration: 200 }} class="max-w-3xl m-auto">
			<CampaignScreen/>
		</div>
	{:else if currentScreen === 'polls'}
		<div in:fly={{ x: -200, duration: 200, delay: 200 }} out:fly={{ x: -200, duration: 200 }} class="max-w-2xl m-auto">
			<PollsScreen/>
		</div>
	{/if}
</div>

<div class="btm-nav-lg" />
<div class="btm-nav btm-nav-lg">
	<button on:click={gotoPolls} class:active={currentScreen === 'polls'}> Polls </button>
	<button on:click={gotoCampaign} class:active={currentScreen === 'campaign'}> Campaign </button>
</div>
