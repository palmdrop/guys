<script lang="ts">
  import type { GuyData } from "../../stores/guyData";
  import Card from "./Card.svelte";
  import Meta from "./Meta.svelte";
  import More from "./More.svelte";

  export let index: number;
  export let numberOfGuys: number;
  export let guyData: GuyData;
</script>

<Card>
  <Meta
    index={index}
    numberOfGuys={numberOfGuys}
    guyData={guyData}
  />

  <p class="guy">
    { guyData.content[0] }
  </p>

  <More
    guyData={guyData}
  />
</Card>

<style>
  p {
    padding: 0.5em 0em;

    max-height: 25vh;
    overflow-y: auto;
  }
</style>