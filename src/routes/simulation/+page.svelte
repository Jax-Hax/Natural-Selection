<script>
	import {
		sizeX,
		sizeY,
		generations,
		amMice,
		amSnakes,
		amCats,
		minMiceCamouflage,
		maxMiceCamouflage,
		minMiceVision,
		maxMiceVision,
		minMiceSpeed,
		maxMiceSpeed,
		minMiceMinHunger,
		maxMiceMinHunger,
		minMiceMaxHunger,
		maxMiceMaxHunger,
		minSnakeCamouflage,
		maxSnakeCamouflage,
		minSnakeSpeed,
		maxSnakeSpeed,
		minCatSpeed,
		maxCatSpeed,
		minMiceHungerGainedFromResting,
		maxMiceHungerGainedFromResting,
		minMiceRestTime,
		maxMiceRestTime,
		minMiceReproductiveRestTime,
		maxMiceReproductiveRestTime,
		minMiceTimeAliveUntilReproduction,
		maxMiceTimeAliveUntilReproduction,
		minMiceGeneMutationChance,
		maxMiceGeneMutationChance,
		minMiceGeneMutationAmount,
		maxMiceGeneMutationAmount,
		minMiceStandards,
		maxMiceStandards,
		minMiceAttractiveness,
		maxMiceAttractiveness
	} from '$lib/stores.js';
	import RangeSlider from 'svelte-range-slider-pips';
	let current = 'mouse';
	let params = [
		{
			name: 'This website!',
			bind: 'sizeX',
			description: 'A website for my small business.'
		}
	];
	let currentVar = 'current';
	import { writable } from 'svelte/store';
	export let miceCamouflage = writable([$minMiceCamouflage, $maxMiceCamouflage]);
	export let miceSpeed = writable([$minMiceCamouflage, $maxMiceCamouflage]);
	export let snakeSpeed = writable([$minMiceCamouflage, $maxMiceCamouflage]);
	export let catSpeed = writable([$minMiceCamouflage, $maxMiceCamouflage]);
	export let generations2 = writable([$generations]);
	export let sizeX2 = writable([$sizeX]);
	export let sizeY2 = writable([$sizeY]);
	$: $sizeX2, ($sizeX = $sizeX2[0]);
	$: $sizeY2, ($sizeY = $sizeY2[0]);
</script>

<body>
	<div class="geneCatagory1" id="firstScreen">
		<h1>Parameter Page</h1>
		<p>
			This is where you change anything you want to in the simulation. I have included all genes
			present in the simulation, but they are all set to the best levels for a balanced simulation.
			If you would like to see how different genes affect the animals, try setting one to the max
			and see what changes.
		</p>
		<a href="/simulation/play" id="startButton"><button id="simButton">Start Simulation</button></a>
		<div style="padding-top: 1em">
			<a href="#misc"><button>Miscellaneous</button></a>
			<a href="#animalNum"><button>Amount of Animals</button></a>
			<a href="#speed"><button>Speed</button></a>
			<a href="#vision"><button>Vision</button></a>
			<a href="#hunger"><button>Hunger</button></a>
			<a href="#reproductive"><button>Reproductive</button></a>
			<a href="#geneMutation"><button>Gene Mutation</button></a>
			<a href="#camouflage"><button>Camouflage</button></a>
		</div>
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="misc">
		<h1>Miscellaneous Genes</h1>
		<h2>Width of Simulation</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={100}
			all="label"
			bind:values={$sizeX2}
			min={50}
			max={1050}
		/>
		<h2>Length of Simulation</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={100}
			all="label"
			bind:values={$sizeY2}
			min={50}
			max={1050}
		/>
		<h2>Generations</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={20}
			all="label"
			bind:values={$generations2}
			min={20}
			max={500}
		/>
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="animalNum">
		<h1>Amount of Animals to Start</h1>
		<h2>Amount of Mice</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={10}
			all="label"
			bind:values={$generations2}
			min={10}
			max={200}
		/>
		<h2>Amount of Snakes</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={10}
			all="label"
			bind:values={$generations2}
			min={10}
			max={200}
		/>
		<h2>Amount of Cats</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={10}
			all="label"
			bind:values={$generations2}
			min={20}
			max={200}
		/>
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="speed">
		<h1>Speed</h1>
		<h2>Mice</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceSpeed} max={30} />
		<h2>Snakes</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeSpeed} max={30} />
		<h2>Cats</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catSpeed} max={30} />
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="vision">
			<h1>Vision</h1>
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="hunger">
		<h1>Hunger</h1>
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="reproductive">
		<h1>Reproductive</h1>
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="geneMutation">
		<h1>Genetic Mutation</h1>
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="camouflage">
		<h1>Camouflage</h1>
	</div>




	<!--range slider with two values-->
	<RangeSlider
		range
		float
		pips
		pipstep={100}
		all="label"
		bind:values={$miceCamouflage}
		max={1000}
	/>
	<!--for gene variation percent-->
	<RangeSlider
		range
		float
		pips
		pipstep={100}
		suffix="%"
		all="label"
		bind:values={$miceCamouflage}
		max={1000}
	/>
</body>

<style>
	:root {
		--range-range: #fb8500; /* active range bar background color */
		--range-handle: #fb8500; /* non-focussed handle color */
		--range-handle-focus: #fb8500; /* focussed handle color */
	}
	body {
		width: 100%;
		overflow-x: hidden;
	}
	#simButton{
		background-color: #fb8500;
		border: -2px solid #fb8500;
		font-size: 1.5em;
		border-radius: 25px;
	}
	#simButton:hover {
		background-color: white; /* Green */
		color: #fb8500;
		border: -2px solid #fb8500; /* Green */
		margin-bottom: -2px;
	}
	button:hover{
		background-color: white; /* Green */
		box-shadow: 0 4px;
		color: #0077b6;
		transform: translateY(-0.25em);
		transition: transform 0.25s;
		border: -2px solid #0077b6; /* Green */
		border-width: 1px;
		border-style: solid;
		margin-bottom: -2px;
	}
	.geneCatagory1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 3em;
		gap: 0.5em;
		background-color: #161a21;
		padding-bottom: 5em;
		padding-top: 0;
		color: white;
		margin: -1px 0;
	}
	#firstScreen {
		align-items: center;
		padding-top: 3em;
	}
	h2 {
		font-size: 2rem;
	}
	p {
		font-size: 1.5rem;
	}
	.geneCatagory2 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 3em;
		padding-bottom: 1em;
		padding-bottom: 5em;
		padding-top: 0;
		gap: 0.5em;
		background-color: #fdfdfd;
		color: black;
		margin: -1px 0;
	}
	.spacer {
		aspect-ratio: 960/200;
		width: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.blackToWhite {
		background-image: url('/blackToWhite.svg');
	}
	.whiteToBlack {
		background-image: url('/whiteToBlack.svg');
	}
</style>
