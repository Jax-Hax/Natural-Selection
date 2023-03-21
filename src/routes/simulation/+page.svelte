<script>
	import { sizeX,
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
		maxMiceAttractiveness } from '$lib/stores.js';
		  import RangeSlider from "svelte-range-slider-pips";
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
export let miceCamouflage = writable([$minMiceCamouflage,$maxMiceCamouflage]);
export let generations2 = writable([1]);
</script>

<body>
	<div class="firstScreen">
		<a href="/simulation/play" id="startButton"><button>Start Simulation</button></a>
	</div>

	<div class="geneCatagory1">
		<h1>Starting Animals</h1>
		<h2>Generations</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all='label' bind:values={$generations2} min={20} max={500}/>
		<h2>Amount of Mice</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all='label' bind:values={$generations2} min={20} max={500}/>
		<h2>Amount of Snakes</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all='label' bind:values={$generations2} min={20} max={500}/>
		<h2>Amount of Cats</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all='label' bind:values={$generations2} min={20} max={500}/>
	</div>
	<div class="geneCatagory2">
		<h1>Starting Animals</h1>
	</div>
	<!--range slider with two values-->
<RangeSlider range float pips pipstep={100} all='label' bind:values={$miceCamouflage} max={1000}/>
	<!--for gene variation percent-->
<RangeSlider range float pips pipstep={100} suffix="%" all='label' bind:values={$miceCamouflage} max={1000}/>
</body>
<style>
:root {
 --range-range:  #fb8500; /* active range bar background color */
 --range-handle:          #fb8500; /* non-focussed handle color */
 --range-handle-focus:    #fb8500; /* focussed handle color */
}
.geneCatagory1{
	display: flex;
	flex-direction: column;
  justify-content: center;
	padding: 3em;
	gap: 0.5em;
	background-color: black;
	color: white;
}
</style>