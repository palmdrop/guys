<script lang="ts">
	import './global.css';

	import { onMount } from 'svelte';
	import { fetchStatus$, fetchToStores, guys$ } from './stores/guyData';
	import Header from './components/header/Header.svelte';
  import GuyList from './components/guys/GuyList.svelte';

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

	<main>
		<h1>guys</h1>

		{ #if $fetchStatus$ === 'fetching' }
			<div class="loading">
				<p>
					guys are loading...
				</p>
			</div>
		{ /if }

		<GuyList />

		{ #if !$guys$.length }
			<p class="no-guys">
				...
			</p>
		{ /if }
	</main>
</div>

<style>
	.app {
		width: 100vw;

		display: flex;
		flex-direction: column;
	}

	main {
		margin: auto;
		box-sizing: border-box;
  	scroll-behavior: smooth;
	}

	h1 {
		text-align: center;
		font-size: 10rem;
		padding-bottom: 3rem;
	}

	.loading {
		position: fixed;
		bottom: 0;
		left: 0;

		width: 100%;
		text-align: center;
		padding: 1em 0em;
		opacity: 1;

		background-color: black;
		color: white;

		font-family: 'Bandeins-strange';
		font-weight: 100;
	}

	.no-guys {
		width: 100%;
		text-align: center;
	}
</style>