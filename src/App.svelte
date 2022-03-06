<script lang="ts">
	import './global.css';

	import { onMount } from 'svelte';
	import { fetchToStores, guys$ } from './stores/guyData';
	import Card from './components/card/Card.svelte';
	import Bar from './components/controls/Bar.svelte';
	import Placeholder from './components/loading/Placeholder.svelte';
	import Status from './components/loading/Status.svelte';

	let index = 0;

	// TODO verify that subscribing to stores in functions like this actually works...

	const handleNext = () => {
		index = Math.min(index + 1, $guys$.length - 1)
	}

	const handlePrevious = () => {
		index = Math.max(index - 1, 0)
	}

	const handleRandom = () => {
		index = Math.floor(Math.random() * $guys$.length)
	}

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

		{#if $guys$.length }
			<Card 
				index={index}
				guyData={$guys$[index]}
				numberOfGuys={$guys$.length}
			/>
		{:else}
			<Placeholder
				text="A guy is coming your way..."
			/>
		{/if}

		<Status />
	</main>

	<Bar 
		onPrevious={handlePrevious}
		onNext={handleNext}
		onRandom={handleRandom}

		previousDeactivated={index === 0}
		randomDeactivated={false}
		nextDeactivated={index === $guys$.length - 1}
	/>
</div>

<style>
	.app {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}

	main {
		max-width: calc( 100vw - 4em );

		width: 600px;
		padding: 2em;

		margin: auto;
		margin-top: 10vh;

		border: 1px solid var(--border);
	}

	h1 {
		text-align: center;
		font-size: 7rem;
		margin: 0;
	}

</style>