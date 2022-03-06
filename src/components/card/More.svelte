<script lang="ts">
  import type { GuyData } from "../../stores/guyData";

  export let guyData: GuyData;

  let expanded = false;

  $: if(guyData) expanded = false; // Reactive to make sure it resets on guy change

  $: rest = guyData
    .content
    .slice(1)
    .filter(file => file);

</script>

{#if rest.length}
  <button 
    on:click="{() => { expanded = !expanded }}"
  >
    { expanded ? "less" : "more" }
  </button> 

  <div class="more">

    {#if expanded}

      {#each rest as line }
        <p>
          <em>{ line }</em>
        </p>
      {/each}

    {/if}
  </div> 
{/if}

<style>
  .more {
    display: flex;
    flex-direction: column;

    transition: 0.5s;

    max-height: 200px;
    overflow-y: auto;
    padding: 2px;
  }

  button {
    background-color: inherit;
    border: none;

    color: var(--faint);
    text-decoration: underline;
    cursor: pointer;

    margin: 0em;
  }

  button:active {
    background-color: inherit;
  }
</style>