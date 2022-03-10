<script lang="ts">
  import Card from "../card/Card.svelte";

  export let text: string;
</script>

<Card>
  <p>
    <em>{ text }</em>
  </p>
</Card>

<style>
	p {
		padding: 1.5em;
		color: var(--faint);
	}
</style>