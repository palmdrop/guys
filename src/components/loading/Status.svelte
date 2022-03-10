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
    <p>
      <em>{loadingMessage}</em>
    </p>
  {:else if error}
    <p>
      <em>{errorMessage}</em>
    </p>
  {/if}
</div>

<style>
  div {
    position: relative;
  }

  p {
    position: absolute;
    font-size: 1.0em;

    left: 50%;
    transform: translate(-50%, 50%);
  }

  .loading {
    color: var(--faint);
  }

  .error {
    color: var(--error);
  }

</style>