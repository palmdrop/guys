<script lang="ts">
	import './global.css';

	import { onMount } from 'svelte';
	import { fetchToStores, guys$ } from './stores/guyData';
	import GuyCard from './components/card/GuyCard.svelte';
	import Bar from './components/controls/Bar.svelte';
	import Placeholder from './components/loading/Placeholder.svelte';
	import Status from './components/loading/Status.svelte';
	import Header from './components/header/Header.svelte';

	const HASH_NUMBER_REGEX = /^#[0-9]+$/;

	let index = HASH_NUMBER_REGEX.test(window.location.hash) 
		? Number.parseInt(window.location.hash.slice(1))
		: 1;

	$: {
		window.location.hash = '' + index;
	}

	guys$.subscribe(guys => {
		if(guys.length && index >= guys.length) {
			index = guys.length - 1;
		} else if(guys.length) {
			index = 1;
		}
	})

	// TODO: fix line endings in description/more
	// TODO: remove swedish and references to our names
	// TODO: scroll in main guy card (for really long guys)
	// TODO: alignment of main slightly off, not lining up with controls?

	const handleNext = () => {
		index = Math.min(index + 1, $guys$.length)
	}

	const handlePrevious = () => {
		index = Math.max(index - 1, 1)
	}

	const handleRandom = () => {
		let newIndex;
		while(
			(newIndex = (Math.floor(Math.random() * $guys$.length)) + 1) === index
		);

		index = newIndex;
	}

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
				<GuyCard 
					index={index - 1}
					guyData={$guys$[index - 1]}
					numberOfGuys={$guys$.length}
				/>

				<Status />
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

		margin-top: clamp(5vh, 10vw, 15vh);
	}

	h1 {
		text-align: center;
		font-size: 7rem;
		margin: 0em 0em;
  	padding: 0em;
	}

</style>