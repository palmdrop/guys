<script lang="ts">
	import './global.css';

	import { onMount } from 'svelte';
	import { fetchToStores, guys$ } from './stores/guyData';
	import GuyCard from './components/card/GuyCard.svelte';
	import Bar from './components/controls/Bar.svelte';
	import Placeholder from './components/loading/Placeholder.svelte';
	import Status from './components/loading/Status.svelte';
	import Header from './components/header/Header.svelte';
import { RandomOrder } from './util/RandomOrder';

	const HASH_NUMBER_REGEX = /^#[0-9]+$/;

	// If the url contains a valid index, parse and use as the current index
	// If not, default to -1, indicating that the latest guy should be displayed once loaded
	let index = HASH_NUMBER_REGEX.test(window.location.hash) 
		? Number.parseInt(window.location.hash.slice(1))
		: -1;

	// Every time the index changes, update the url hash (if valid index)
	$: {
		if (index >= 1 && index <= $guys$.length) {
			window.location.hash = '' + index;
		}
	}

	// Used for better randomness
	const randomOrder = new RandomOrder(1);

	// Make sure the index is valid when the guys data updates (length might have changed)
	guys$.subscribe(guys => {
		if (guys.length) {
			index = (index === -1) 
				? guys.length // Default to last guy
				: Math.min(Math.max(index, 1), guys.length);

			randomOrder.setLength(guys.length);
		}
	})

	const handleNext = () => {
		index = Math.min(index + 1, $guys$.length)
	}

	const handlePrevious = () => {
		index = Math.max(index - 1, 1)
	}

	const handleRandom = () => {
		index = randomOrder.next() + 1;
	}

	// Fetch guys
	onMount(async () => {
		await fetchToStores();
	})
</script>

<svelte:head>
	<title>Guys</title>
</svelte:head>

<div class="app">
	<Header />

	<div class="container">
		<main>
			<h1>guys</h1>

			{#if index > 0 && index <= $guys$.length }
				<Status />

				<GuyCard 
					index={index - 1}
					guyData={$guys$[index - 1]}
					numberOfGuys={$guys$.length}
				/>
			{:else}
				<Placeholder
					text="A guy is coming your way..."
				/>
			{/if}
		</main>
	</div>

	<Bar 
		onPrevious={handlePrevious}
		onNext={handleNext}
		onRandom={handleRandom}

		previousDeactivated={index === 1}
		randomDeactivated={false}
		nextDeactivated={index === $guys$.length}
	/>
</div>

<style>
	.app {
		position: fixed;
		width: 100vw;
		height: 100vh;

		display: flex;
		flex-direction: column;
	}

	.container {
		flex-grow: 2;
		overflow-y: auto;
	}

	main {
		width: 650px;
		max-width: calc(100vw - 8px);

		margin: auto;

		box-sizing: border-box;
		border: 1px solid var(--border);

		margin-top: clamp(8vh, calc((10vw + 10vh) / 2), 12vh);
	}

	h1 {
		text-align: center;
		font-size: 7rem;
		margin: 0em 0em;
  	padding: 0em;
	}

</style>