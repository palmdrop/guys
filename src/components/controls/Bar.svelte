<script lang="ts">
  export let onPrevious: () => void;
  export let onRandom: () => void;
  export let onNext: () => void;

  export let nextDeactivated = true;
  export let previousDeactivated = true;
  export let randomDeactivated = true;

</script>

<div class="bar">

  <button 
    on:click={onPrevious}
    class:deactivated={previousDeactivated}
  >
    Previous
  </button>

  <button 
    on:click={onRandom}
    class:deactivated={randomDeactivated}
  >
    Random
  </button>

  <button 
    on:click={onNext}
    class:deactivated={nextDeactivated}
  >
    Next
  </button>
</div>

<style>
  .bar {
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100vw;
    margin: 0em;
    padding: 0em;
    background-color: var(--background);

    font-family: 'Bandeins-strange';
  }

  button {
    background-color: inherit;
    color: var(--foreground);

    border: 1px solid var(--border);

    width: 100%;

    cursor: pointer;
    text-transform: lowercase;

    margin: 0em;

    transition: 0.3s;
  }

  button:not(:last-child) {
    border-right: none;
  }

  button:active {
    background-color: inherit;
  }

  button:hover {
    color: var(--background);
    background-color: var(--foreground);
  }

  .deactivated {
    color: var(--faint);
    cursor: default;
    border: 1px solid var(--faint);
  }

  .deactivated:hover {
    color: var(--faint);
    background-color: var(--background);
  }

</style>