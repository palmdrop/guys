<script lang="ts">
	import { guys$ } from '../../stores/guyData';
  import GuyEntry from './GuyEntry.svelte';

  $: guys = $guys$.reverse();
</script>

<ol reversed class="guy-list">
  { #each guys as guyData, i (i + guyData.date) }
    <GuyEntry
      { guyData }
      index={$guys$.length - i}
    />
  { /each }
</ol>

<style>
  ol {
    max-width: 1500px;
    list-style: none;

    padding-left: 1em;
    padding-right: 1em;
  }

  @media only screen and (min-width: 500px) {
    ol {
      padding-left: 3em;
      list-style: decimal;
    } 
  }
</style>