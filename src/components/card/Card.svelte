<script lang="ts">
  import type { GuyData } from "../../stores/guyData";
  import Meta from "./Meta.svelte";
  import More from "./More.svelte";

  export let index: number;
  export let numberOfGuys: number;
  export let guyData: GuyData;
</script>

<div class="card">
  <Meta
    index={index}
    numberOfGuys={numberOfGuys}
    guyData={guyData}
  />

  <p class="guy">
    <em>{ guyData.content[0] }</em>
  </p>

  <More
    guyData={guyData}
  />
</div>

<style>
  .card {
    padding: 2em;
    margin: 0.5em;
    border: 1px solid var(--border);
    background-color: var(--background);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loading {
    margin: 1em;
    text-align: center;
    color: var(--faint);
  }

  .guy {
    line-height: 1.2em;
  }

</style>