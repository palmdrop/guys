<script lang="ts">
  export let text: string;
</script>

<div class="loading">
  <p><em>{ text }</em></p>
</div>

<style>
	.loading {
		border: 1px solid var(--border);
		display: flex;
		justify-content: center;
		align-content: center;
	}

	.loading p {
		padding: 1.5em;
		color: var(--faint);
	}
</style>