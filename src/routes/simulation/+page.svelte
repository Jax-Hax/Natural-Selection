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
export let generations2 = writable([$generations]);
export let sizeX2 = writable([$sizeX]);
export let sizeY2 = writable([$sizeY]);
$: $sizeX2, $sizeX = $sizeX2;
$: $sizeY2, $sizeY = $sizeY2;
</script>

<body>
	<div class="geneCatagory1" id="firstScreen">
			<h1>Parameter Page</h1>
			<p>This is where you change anything you want to in the simulation. I have included all genes present in the simulation, but they are all set to the best levels for a balanced simulation. If you would like to see how different genes affect the animals, try setting one to the max and see what changes.</p>
		<a href="/simulation/play" id="startButton"><button>Start Simulation</button></a>
	</div>
	<div class="spacer blackToWhite"></div>
<div class="geneCatagory2">
		<h1>Miscellaneous Genes</h1>
				<h2>Width of Simulation</h2>
<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={100} all='label' bind:values={$sizeX2} min={50} max={1050}/>
		<h2>Length of Simulation</h2>
<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={100} all='label' bind:values={$sizeY2} min={50} max={1050}/>
		<h2>Generations</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all='label' bind:values={$generations2} min={20} max={500}/>
	</div>
			<div class="spacer whiteToBlack"></div>
	<div class="geneCatagory1">
		<h1>Starting Animals</h1>
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
	<div class="spacer blackToWhite"></div>
	<div class="geneCatagory2">
		<h1>Starting Animals</h1>
	</div>
		<div class="spacer whiteToBlack"></div>

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
body {
			width: 100%; overflow-x:hidden
		}
.geneCatagory1{
	display: flex;
	flex-direction: column;
  justify-content: center;
	padding: 3em;
	gap: 0.5em;
	background-color: #161a21;
	padding-bottom: 5em;
		padding-top: 0;
	color: white;
}
#firstScreen{
	align-items: center;
	padding-top: 3em;
}
h2{
	font-size: 2rem;
}
p{
	font-size: 1.5rem;
}
.geneCatagory2{
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
}
.spacer{
	aspect-ratio: 960/200;
	width: 100%;
	background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.blackToWhite{
	background-image: url('/blackToWhite.svg');
}
.whiteToBlack{
	background-image: url('/whiteToBlack.svg');
}
</style>
