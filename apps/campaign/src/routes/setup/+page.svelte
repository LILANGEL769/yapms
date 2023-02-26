<script lang="ts">
  import { fly } from 'svelte/transition';
	import GameSchema from '../../lib/assets/schemas/Game';
  import gameList from '../../lib/assets/game_list.json';

  let selectedGame: string | null = null;
  let selectedCandidate: string | null = null;
  let selectedRunningMate: string | null = null;

  $: data = selectedGame !== null ? import(`../../lib/assets/games/${selectedGame}.json`) : null;

  $: game = async () => {
    return GameSchema.parse(await data);
  };

  $: runningMates = async () => {
    const game = GameSchema.parse(await data);
    return game.candidates.filter(c => c.firstName === selectedCandidate)[0].runningMates;
  };

</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-xlg">

      <h1 class="text-4xl font-bold pb-8">
        Where will you embark on your campaign?
      </h1>

      <form class="form-control">

        <div class="mt-4">
          <h2 class="text-2xl font-bold pb-4">
            Scenario
          </h2>

          <select class="select select-bordered w-full max-w-xs" bind:value={selectedGame}>
            {#each gameList.list as game}
              <option value={game.file}>{game.title}</option>
            {/each}
          </select>
        </div>

        {#if selectedGame !== null}
          <!-- svelte-ignore empty-block -->
          {#await game()}
          {:then game2}
            <div class="mt-4">
              <h2 class="text-2xl font-bold pb-4">
                Candidate
              </h2>
              <select class="select select-bordered" bind:value={selectedCandidate}>
                {#each game2.candidates as candidate}
                  <option value={candidate.firstName}>{candidate.firstName} {candidate.lastName}</option>
                {/each}
              </select>
            </div>
          {/await}
        {/if}

        {#if selectedCandidate !== null}
          <!-- svelte-ignore empty-block -->
          {#await runningMates()}
          {:then runningMates2}
            <div class="mt-4">
              <h2 class="text-2xl font-bold pb-4">
                Running Mate
              </h2>
              <select class="select select-bordered" bind:value={selectedRunningMate}>
                {#each runningMates2 as runningMate}
                  <option value={runningMate.firstName}>{runningMate.firstName} {runningMate.lastName}</option>
                {/each}
              </select>
            </div>
          {/await}
        {/if}

        {#if selectedRunningMate !== null}
          <div class="mt-4">
            <a href="/game">
              <button class="btn btn-primary">
                Start
              </button>
            </a>
          </div>
        {/if}

      </form>
    </div>
  </div>
</div>