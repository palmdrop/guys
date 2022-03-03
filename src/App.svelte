<script lang="ts">
	import './global.css';
	import { onMount } from 'svelte';
	import GuyCard from './components/GuyCard.svelte';
	import { fetchToStores, guys$ } from './stores/guyData';

	onMount(async () => {
		await fetchToStores();
	})

</script>

<svelte:head>
	<title>Guys</title>
</svelte:head>

<div class="app">
	<main>
		<h1>guys</h1>

		<GuyCard 
			index={2}
		/>

	</main>
</div>

<style>

	.app {
		width: 100vw;
		height: 100vh;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	main {
		max-width: calc( 100vw - 4em );
		width: 600px;
		padding: 2em;

		border: 1px solid var(--border);
	}

	h1 {
		text-align: center;
		font-size: 7rem;
		margin: 0;

	}

</style>