<div class="card">
  <slot />
</div>

<style>
  .card {
    padding: clamp(3px, 5vw, 2rem);
    border: 1px solid var(--border);
    background-color: var(--background);

    display: flex;
    flex-direction: column;

		margin-top: clamp(5px, 4vh, 3em);
		margin-bottom: clamp(5px, 4vh, 3em);
		
		margin-left: clamp(5px, 4vw, 2em);
		margin-right: clamp(5px, 4vw, 2em);
  }
</style>