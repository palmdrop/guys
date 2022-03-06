<script lang="ts">
  import type { GuyData } from "../../stores/guyData";

  export let index: number;
  export let numberOfGuys: number;
  export let guyData: GuyData;

</script>

<div class="meta">
  <div class="item">{guyData.date}</div>

  {#if index === 0 }

    <div class="item">First</div>

  {:else if index === (numberOfGuys - 1)}
    
    <div class="item">latest</div>

  {/if}

  <div class="item">#{index + 1}</div>
</div>

<style>
  .meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .item {
    color: var(--faint);
    width: 33%;
    text-align: center;
    text-transform: lowercase;
  }

  .item:first-child {
    text-align: left;
  }

  .item:last-child {
    text-align: right;
  }
</style>