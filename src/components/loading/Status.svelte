<script lang="ts">
  import { fetchStatus$ } from "../../stores/guyData";

  export let minMessagePersist = 1500; // in ms
  export let errorMessage = "Error loading...";
  export let loadingMessage = "Loading..."

  let error = false;
  let loading = false;

  const resetAfterDelay = () => setTimeout(
    () => {
      error = false;
      loading = false;
    },
    minMessagePersist
  );

	fetchStatus$.subscribe(status => {
    if(status === 'fetching') {
      loading = true;
    } else if(status === 'failed') {
      error = true;
      loading = false;
      resetAfterDelay();
    } else {
      error = false;
      loading = false;
    }
	})
     
</script>

<div class:loading class:error>
  {#if loading}
    <em>{loadingMessage}</em>
  {:else if error}
    <em>{errorMessage}</em>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1em;
  }

  .loading {
    color: var(--faint);
  }

  .error {
    color: var(--error);
  }

</style>