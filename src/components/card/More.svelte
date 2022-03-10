<script lang="ts">
  import type { GuyData } from "../../stores/guyData";

  export let guyData: GuyData;

  let expanded = false;

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


  {#if expanded}
    <div class="more">

      {#each rest as line }
        <p>
          { line }
        </p>
      {/each}

    </div> 
  {/if}
{/if}

<style>
  .more {
    display: flex;
    flex-direction: column;

    transition: 0.5s;

    max-height: 200px;
    overflow-y: auto;

    padding-top: 1em;
  }

  p {
    white-space: pre-line;
  }

  p:not(:last-child) {
    padding-bottom: 1.0em;
  }

  button {
    background-color: inherit;
    border: none;

    color: var(--faint);
    text-decoration: underline;
    cursor: pointer;

    margin: 0em;
    padding-top: 1em;
  }

  button:active {
    background-color: inherit;
  }
</style>