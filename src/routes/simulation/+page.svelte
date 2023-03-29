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
		minMiceSpeed,
		maxMiceSpeed,
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
		maxMiceAttractiveness,
		minMiceFoodValue,
		maxMiceFoodValue,
		minMiceMinHunger,
		maxMiceMinHunger,
		minMiceMaxHunger,
		maxMiceMaxHunger,
		minMiceVision,
		maxMiceVision,
		minSnakeRestTime,
		maxSnakeRestTime,
		minSnakeReproductiveRestTime,
		maxSnakeReproductiveRestTime,
		minSnakeTimeAliveUntilReproduction,
		maxSnakeTimeAliveUntilReproduction,
		minSnakeGeneMutationChance,
		maxSnakeGeneMutationChance,
		minSnakeGeneMutationAmount,
		maxSnakeGeneMutationAmount,
		minSnakeStandards,
		maxSnakeStandards,
		minSnakeAttractiveness,
		maxSnakeAttractiveness,
		minSnakeMinHunger,
		maxSnakeMinHunger,
		minSnakeMaxHunger,
		maxSnakeMaxHunger,
		minSnakeVision,
		maxSnakeVision,
		minSnakePreyStandards,
		maxSnakePreyStandards,
		minSnakeAggression,
		maxSnakeAggression,
		minSnakeFoodValue,
		maxSnakeFoodValue,
		minCatRestTime,
		maxCatRestTime,
		minCatReproductiveRestTime,
		maxCatReproductiveRestTime,
		minCatTimeAliveUntilReproduction,
		maxCatTimeAliveUntilReproduction,
		minCatGeneMutationChance,
		maxCatGeneMutationChance,
		minCatGeneMutationAmount,
		maxCatGeneMutationAmount,
		minCatStandards,
		maxCatStandards,
		minCatAttractiveness,
		maxCatAttractiveness,
		minCatMinHunger,
		maxCatMinHunger,
		minCatMaxHunger,
		maxCatMaxHunger,
		minCatPreyStandards,
		maxCatPreyStandards,
		minCatAggression,
		maxCatAggression
	} from '$lib/stores.js';
	import RangeSlider from 'svelte-range-slider-pips';
	import { writable } from 'svelte/store';
	export let sizeX2 = writable([$sizeX]);
	export let sizeY2 = writable([$sizeY]);
	export let generations2 = writable([$generations]);
	export let amMice2 = writable([$amMice]);
	export let amSnakes2 = writable([$amSnakes]);
	export let amCats2 = writable([$amCats]);
	export let miceCamouflage2 = writable([$minMiceCamouflage,$maxMiceCamouflage]);
	export let miceSpeed2 = writable([$minMiceSpeed,$maxMiceSpeed]);
	export let snakeCamouflage2 = writable([$minSnakeCamouflage,$maxSnakeCamouflage]);
	export let snakeSpeed2 = writable([$minSnakeSpeed,$maxSnakeSpeed]);
	export let catSpeed2 = writable([$minCatSpeed,$maxCatSpeed]);
	export let miceHungerGainedFromResting2 = writable([$minMiceHungerGainedFromResting,$maxMiceHungerGainedFromResting]);
	export let miceRestTime2 = writable([$minMiceRestTime,$maxMiceRestTime]);
	export let miceReproductiveRestTime2 = writable([$minMiceReproductiveRestTime,$maxMiceReproductiveRestTime]);
	export let miceTimeAliveUntilReproduction2 = writable([$minMiceTimeAliveUntilReproduction,$maxMiceTimeAliveUntilReproduction]);
	export let miceGeneMutationChance2 = writable([$minMiceGeneMutationChance,$maxMiceGeneMutationChance]);
	export let miceGeneMutationAmount2 = writable([$minMiceGeneMutationAmount,$maxMiceGeneMutationAmount]);
	export let miceStandards2 = writable([$minMiceStandards,$maxMiceStandards]);
	export let miceAttractiveness2 = writable([$minMiceAttractiveness,$maxMiceAttractiveness]);
	export let miceFoodValue2 = writable([$minMiceFoodValue,$maxMiceFoodValue]);
	export let miceMinHunger2 = writable([$minMiceMinHunger,$maxMiceMinHunger]);
	export let miceMaxHunger2 = writable([$minMiceMaxHunger,$maxMiceMaxHunger]);
	export let miceVision2 = writable([$minMiceVision,$maxMiceVision]);


	export let snakeRestTime2 = writable([$minSnakeRestTime,$maxSnakeRestTime]);
	export let snakeReproductiveRestTime2 = writable([$minSnakeReproductiveRestTime,$maxSnakeReproductiveRestTime]);
	export let snakeTimeAliveUntilReproduction2 = writable([$minSnakeTimeAliveUntilReproduction,$maxSnakeTimeAliveUntilReproduction]);
	export let snakeGeneMutationChance2 = writable([$minSnakeGeneMutationChance,$maxSnakeGeneMutationChance]);
	export let snakeGeneMutationAmount2 = writable([$minSnakeGeneMutationAmount,$maxSnakeGeneMutationAmount]);
	export let snakeStandards2 = writable([$minSnakeStandards,$maxSnakeStandards]);
	export let snakeAttractiveness2 = writable([$minSnakeAttractiveness,$maxSnakeAttractiveness]);
	export let snakeFoodValue2 = writable([$minSnakeFoodValue,$maxSnakeFoodValue]);
	export let snakeMinHunger2 = writable([$minSnakeMinHunger,$maxSnakeMinHunger]);
	export let snakeMaxHunger2 = writable([$minSnakeMaxHunger,$maxSnakeMaxHunger]);
	export let snakeVision2 = writable([$minSnakeVision,$maxSnakeVision]);
	export let snakePreyStandards2 = writable([$minSnakePreyStandards,$maxSnakePreyStandards]);
	export let snakeAggression2 = writable([$minSnakeAggression,$maxSnakeAggression]);

	export let catRestTime2 = writable([$minCatRestTime,$maxCatRestTime]);
	export let catReproductiveRestTime2 = writable([$minCatReproductiveRestTime,$maxCatReproductiveRestTime]);
	export let catTimeAliveUntilReproduction2 = writable([$minCatTimeAliveUntilReproduction,$maxCatTimeAliveUntilReproduction]);
	export let catGeneMutationChance2 = writable([$minCatGeneMutationChance,$maxCatGeneMutationChance]);
	export let catGeneMutationAmount2 = writable([$minCatGeneMutationAmount,$maxCatGeneMutationAmount]);
	export let catStandards2 = writable([$minCatStandards,$maxCatStandards]);
	export let catAttractiveness2 = writable([$minCatAttractiveness,$maxCatAttractiveness]);
	export let catMinHunger2 = writable([$minCatMinHunger,$maxCatMinHunger]);
	export let catMaxHunger2 = writable([$minCatMaxHunger,$maxCatMaxHunger]);
	export let catPreyStandards2 = writable([$minCatPreyStandards,$maxCatPreyStandards]);
	export let catAggression2 = writable([$minCatAggression,$maxCatAggression]);$: $sizeX2, ($sizeX = $sizeX2[0]);
	$: $sizeY2, ($sizeY = $sizeY2[0]);
	$: $generations2, ($generations = $generations2[0]);
	$: $amMice2, ($amMice = $amMice2[0]);
	$: $amSnakes2, ($sizeY = $amSnakes2[0]);
	$: $amCats2, ($amCats = $amCats2[0]);
	$: $miceCamouflage2, ($minMiceCamouflage = $miceCamouflage2[0], $maxMiceCamouflage = $miceCamouflage2[1]);
	$: $miceSpeed2, ($minMiceSpeed = $miceSpeed2[0], $maxMiceSpeed = $miceSpeed2[1]);
	$: $miceHungerGainedFromResting2, ($minMiceHungerGainedFromResting = $miceHungerGainedFromResting2[0], $maxMiceHungerGainedFromResting = $miceHungerGainedFromResting2[1]);
	$: $miceRestTime2, ($minMiceRestTime = $miceRestTime2[0], $maxMiceRestTime = $miceRestTime2[1]);
	$: $miceReproductiveRestTime2, ($minMiceReproductiveRestTime = $miceReproductiveRestTime2[0], $maxMiceReproductiveRestTime = $miceReproductiveRestTime2[1]);
	$: $miceTimeAliveUntilReproduction2, ($minMiceTimeAliveUntilReproduction = $miceTimeAliveUntilReproduction2[0], $maxMiceTimeAliveUntilReproduction = $miceTimeAliveUntilReproduction2[1]);
	$: $miceGeneMutationChance2, ($minMiceGeneMutationChance = $miceGeneMutationChance2[0], $maxMiceGeneMutationChance = $miceGeneMutationChance2[1]);
	$: $miceGeneMutationAmount2, ($minMiceGeneMutationAmount = $miceGeneMutationAmount2[0], $maxMiceGeneMutationAmount = $miceGeneMutationAmount2[1]);
	$: $miceStandards2, ($minMiceStandards = $miceStandards2[0], $maxMiceStandards = $miceStandards2[1]);
	$: $miceAttractiveness2, ($minMiceAttractiveness = $miceAttractiveness2[0], $maxMiceAttractiveness = $miceAttractiveness2[1]);
	$: $miceFoodValue2, ($minMiceFoodValue = $miceFoodValue2[0], $maxMiceFoodValue = $miceFoodValue2[1]);
	$: $snakeCamouflage2, ($minSnakeCamouflage = $snakeCamouflage2[0], $maxSnakeCamouflage = $snakeCamouflage2[1]);
	$: $snakeSpeed2, ($minSnakeSpeed = $snakeSpeed2[0], $maxSnakeSpeed = $snakeSpeed2[1]);
	$: $catSpeed2, ($minCatSpeed = $catSpeed2[0], $maxCatSpeed = $catSpeed2[1]);
</script>

<body>
	<div class="geneCatagory1" id="firstScreen">
		<h1>Parameter Page</h1>
		<p>
			This is where you change anything you want to in the simulation. I have included all genes
			present in the simulation, and they are all set to the best levels for a balanced simulation.
			If you would like to see how different genes affect the animals, try setting one to the max
			and see what changes. Most genes are set to ranges, and the gene of each animal will be
			selected randomly from that range at the start.
		</p>
		<a href="/simulation/play" id="startButton"><button id="simButton">Start Simulation</button></a>
		<div style="padding-top: 1em">
			<a href="#misc"><button>Miscellaneous</button></a>
			<a href="#animalNum"><button>Amount of Animals</button></a>
			<a href="#speed"><button>Speed</button></a>
			<a href="#vision"><button>Vision</button></a>
		</div>
		<div>
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
		<p>This is how close predators have to be for animals to see them and start running away.</p>
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
		<p>
			Cats do not need camouflage since they are the top predator, and cannot be eaten by anything,
			therefore never evolved to be camouflage.
		</p>
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
	#simButton {
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
	button:hover {
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
