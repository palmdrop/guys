<script lang="ts">
  import { GuyData, guys$ } from "../stores/guyData";

  export let index: number | 'oldest' | 'latest';
  export let emphasized = false;

  let guyData: GuyData | undefined;
  let i;
  let count;

  guys$.subscribe(guys => {
    i = 
      index === 'oldest' ? 0 : 
      index === 'latest' ? guys.length - 1 :
      index;

    if (i < 0 || i >= guys.length) return;
    count = guys.length;
    guyData = guys[i];
  })
</script>

<div class="card">
  {#if guyData}
    <div class="meta">
      <div class="item">{guyData.date}</div>

      {#if i === 0 }
        <div class="item">First</div>
      {:else if i === (count - 1)}
        <div class="item">Latest</div>
      {/if}

      <div class="item">#{i + 1}</div>
    </div>
    <p class="guy">
      { guyData.content[0] }
    </p>

    {#if guyData.content.length > 1 } 
      <button class="more">more</button> 
    {/if}
  {:else}
    <p class="loading">A guy is coming your way...</p>
  {/if}
</div>

<style>
  .card {
    padding: 2em;
    margin: 1em;
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
  }

  .item:first-child {
    text-align: left;
  }

  .item:last-child {
    text-align: right;
  }

  .guy {
    line-height: 1.2em;
  }

  .more {
    background-color: inherit;
    border: none;

    color: var(--faint);
    text-decoration: underline;
    cursor: pointer;
  }

  .more:active {
    background-color: inherit;
  }

</style>