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
	let sizeX2 = writable([$sizeX]);
	let sizeY2 = writable([$sizeY]);
	let generations2 = writable([$generations]);
	let amMice2 = writable([$amMice]);
	let amSnakes2 = writable([$amSnakes]);
	let amCats2 = writable([$amCats]);
	let miceCamouflage2 = writable([$minMiceCamouflage, $maxMiceCamouflage]);
	let miceSpeed2 = writable([$minMiceSpeed, $maxMiceSpeed]);
	let snakeCamouflage2 = writable([$minSnakeCamouflage, $maxSnakeCamouflage]);
	let snakeSpeed2 = writable([$minSnakeSpeed, $maxSnakeSpeed]);
	let catSpeed2 = writable([$minCatSpeed, $maxCatSpeed]);
	let miceHungerGainedFromResting2 = writable([
		$minMiceHungerGainedFromResting,
		$maxMiceHungerGainedFromResting
	]);
	let miceRestTime2 = writable([$minMiceRestTime, $maxMiceRestTime]);
	let miceReproductiveRestTime2 = writable([
		$minMiceReproductiveRestTime,
		$maxMiceReproductiveRestTime
	]);
	let miceTimeAliveUntilReproduction2 = writable([
		$minMiceTimeAliveUntilReproduction,
		$maxMiceTimeAliveUntilReproduction
	]);
	let miceGeneMutationChance2 = writable([$minMiceGeneMutationChance, $maxMiceGeneMutationChance]);
	let miceGeneMutationAmount2 = writable([$minMiceGeneMutationAmount, $maxMiceGeneMutationAmount]);
	let miceStandards2 = writable([$minMiceStandards, $maxMiceStandards]);
	let miceAttractiveness2 = writable([$minMiceAttractiveness, $maxMiceAttractiveness]);
	let miceFoodValue2 = writable([$minMiceFoodValue, $maxMiceFoodValue]);
	let miceMinHunger2 = writable([$minMiceMinHunger, $maxMiceMinHunger]);
	let miceMaxHunger2 = writable([$minMiceMaxHunger, $maxMiceMaxHunger]);
	let miceVision2 = writable([$minMiceVision, $maxMiceVision]);

	let snakeRestTime2 = writable([$minSnakeRestTime, $maxSnakeRestTime]);
	let snakeReproductiveRestTime2 = writable([
		$minSnakeReproductiveRestTime,
		$maxSnakeReproductiveRestTime
	]);
	let snakeTimeAliveUntilReproduction2 = writable([
		$minSnakeTimeAliveUntilReproduction,
		$maxSnakeTimeAliveUntilReproduction
	]);
	let snakeGeneMutationChance2 = writable([
		$minSnakeGeneMutationChance,
		$maxSnakeGeneMutationChance
	]);
	let snakeGeneMutationAmount2 = writable([
		$minSnakeGeneMutationAmount,
		$maxSnakeGeneMutationAmount
	]);
	let snakeStandards2 = writable([$minSnakeStandards, $maxSnakeStandards]);
	let snakeAttractiveness2 = writable([$minSnakeAttractiveness, $maxSnakeAttractiveness]);
	let snakeFoodValue2 = writable([$minSnakeFoodValue, $maxSnakeFoodValue]);
	let snakeMinHunger2 = writable([$minSnakeMinHunger, $maxSnakeMinHunger]);
	let snakeMaxHunger2 = writable([$minSnakeMaxHunger, $maxSnakeMaxHunger]);
	let snakeVision2 = writable([$minSnakeVision, $maxSnakeVision]);
	let snakePreyStandards2 = writable([$minSnakePreyStandards, $maxSnakePreyStandards]);
	let snakeAggression2 = writable([$minSnakeAggression, $maxSnakeAggression]);

	let catRestTime2 = writable([$minCatRestTime, $maxCatRestTime]);
	let catReproductiveRestTime2 = writable([
		$minCatReproductiveRestTime,
		$maxCatReproductiveRestTime
	]);
	let catTimeAliveUntilReproduction2 = writable([
		$minCatTimeAliveUntilReproduction,
		$maxCatTimeAliveUntilReproduction
	]);
	let catGeneMutationChance2 = writable([$minCatGeneMutationChance, $maxCatGeneMutationChance]);
	let catGeneMutationAmount2 = writable([$minCatGeneMutationAmount, $maxCatGeneMutationAmount]);
	let catStandards2 = writable([$minCatStandards, $maxCatStandards]);
	let catAttractiveness2 = writable([$minCatAttractiveness, $maxCatAttractiveness]);
	let catMinHunger2 = writable([$minCatMinHunger, $maxCatMinHunger]);
	let catMaxHunger2 = writable([$minCatMaxHunger, $maxCatMaxHunger]);
	let catPreyStandards2 = writable([$minCatPreyStandards, $maxCatPreyStandards]);
	let catAggression2 = writable([$minCatAggression, $maxCatAggression]);
	$: $sizeX2, ($sizeX = $sizeX2[0]);
	$: $sizeY2, ($sizeY = $sizeY2[0]);
	$: $generations2, ($generations = $generations2[0]);
	$: $amMice2, ($amMice = $amMice2[0]);
	$: $amSnakes2, ($amSnakes = $amSnakes2[0]);
	$: $amCats2, ($amCats = $amCats2[0]);
	$: $miceCamouflage2,
		(($minMiceCamouflage = $miceCamouflage2[0]), ($maxMiceCamouflage = $miceCamouflage2[1]));
	$: $miceSpeed2, (($minMiceSpeed = $miceSpeed2[0]), ($maxMiceSpeed = $miceSpeed2[1]));
	$: $miceHungerGainedFromResting2,
		(($minMiceHungerGainedFromResting = $miceHungerGainedFromResting2[0]),
		($maxMiceHungerGainedFromResting = $miceHungerGainedFromResting2[1]));
	$: $miceRestTime2,
		(($minMiceRestTime = $miceRestTime2[0]), ($maxMiceRestTime = $miceRestTime2[1]));
	$: $miceReproductiveRestTime2,
		(($minMiceReproductiveRestTime = $miceReproductiveRestTime2[0]),
		($maxMiceReproductiveRestTime = $miceReproductiveRestTime2[1]));
	$: $miceTimeAliveUntilReproduction2,
		(($minMiceTimeAliveUntilReproduction = $miceTimeAliveUntilReproduction2[0]),
		($maxMiceTimeAliveUntilReproduction = $miceTimeAliveUntilReproduction2[1]));
	$: $miceGeneMutationChance2,
		(($minMiceGeneMutationChance = $miceGeneMutationChance2[0]),
		($maxMiceGeneMutationChance = $miceGeneMutationChance2[1]));
	$: $miceGeneMutationAmount2,
		(($minMiceGeneMutationAmount = $miceGeneMutationAmount2[0]),
		($maxMiceGeneMutationAmount = $miceGeneMutationAmount2[1]));
	$: $miceStandards2,
		(($minMiceStandards = $miceStandards2[0]), ($maxMiceStandards = $miceStandards2[1]));
	$: $miceAttractiveness2,
		(($minMiceAttractiveness = $miceAttractiveness2[0]),
		($maxMiceAttractiveness = $miceAttractiveness2[1]));
	$: $miceFoodValue2,
		(($minMiceFoodValue = $miceFoodValue2[0]), ($maxMiceFoodValue = $miceFoodValue2[1]));

	$: $miceMinHunger2,
		(($minMiceMinHunger = $miceMinHunger2[0]), ($maxMiceMinHunger = $miceMinHunger2[1]));
	$: $miceMaxHunger2,
		(($minMiceMaxHunger = $miceMaxHunger2[0]), ($maxMiceMaxHunger = $miceMaxHunger2[1]));
	$: $miceVision2, (($minMiceVision = $miceVision2[0]), ($maxMiceVision = $miceVision2[1]));

	$: $snakeCamouflage2,
		(($minSnakeCamouflage = $snakeCamouflage2[0]), ($maxSnakeCamouflage = $snakeCamouflage2[1]));
	$: $snakeSpeed2, (($minSnakeSpeed = $snakeSpeed2[0]), ($maxSnakeSpeed = $snakeSpeed2[1]));
	$: $catSpeed2, (($minCatSpeed = $catSpeed2[0]), ($maxCatSpeed = $catSpeed2[1]));

	$: $snakeRestTime2,
		(($minSnakeRestTime = $snakeRestTime2[0]), ($maxSnakeRestTime = $snakeRestTime2[1]));
	$: $snakeReproductiveRestTime2,
		(($minSnakeReproductiveRestTime = $snakeReproductiveRestTime2[0]),
		($maxSnakeReproductiveRestTime = $snakeReproductiveRestTime2[1]));
	$: $snakeTimeAliveUntilReproduction2,
		(($minSnakeTimeAliveUntilReproduction = $snakeTimeAliveUntilReproduction2[0]),
		($maxSnakeTimeAliveUntilReproduction = $snakeTimeAliveUntilReproduction2[1]));
	$: $snakeGeneMutationChance2,
		(($minSnakeGeneMutationChance = $snakeGeneMutationChance2[0]),
		($maxSnakeGeneMutationChance = $snakeGeneMutationChance2[1]));
	$: $snakeGeneMutationAmount2,
		(($minSnakeGeneMutationAmount = $snakeGeneMutationAmount2[0]),
		($maxSnakeGeneMutationAmount = $snakeGeneMutationAmount2[1]));
	$: $snakeStandards2,
		(($minSnakeStandards = $snakeStandards2[0]), ($maxSnakeStandards = $snakeStandards2[1]));
	$: $snakeAttractiveness2,
		(($minSnakeAttractiveness = $snakeAttractiveness2[0]),
		($maxSnakeAttractiveness = $snakeAttractiveness2[1]));
	$: $snakeFoodValue2,
		(($minSnakeFoodValue = $snakeFoodValue2[0]), ($maxSnakeFoodValue = $snakeFoodValue2[1]));
	$: $snakeMinHunger2,
		(($minSnakeMinHunger = $snakeMinHunger2[0]), ($maxSnakeMinHunger = $snakeMinHunger2[1]));
	$: $snakeMaxHunger2,
		(($minSnakeMaxHunger = $snakeMaxHunger2[0]), ($maxSnakeMaxHunger = $snakeMaxHunger2[1]));
	$: $snakeVision2, (($minSnakeVision = $snakeVision2[0]), ($maxSnakeVision = $snakeVision2[1]));
	$: $snakePreyStandards2,
		(($minSnakePreyStandards = $snakePreyStandards2[0]),
		($maxSnakePreyStandards = $snakePreyStandards2[1]));
	$: $snakeAggression2,
		(($minSnakeAggression = $snakeAggression2[0]), ($maxSnakeAggression = $snakeAggression2[1]));

	$: $catRestTime2, (($minCatRestTime = $catRestTime2[0]), ($maxCatRestTime = $catRestTime2[1]));
	$: $catReproductiveRestTime2,
		(($minCatReproductiveRestTime = $catReproductiveRestTime2[0]),
		($maxCatReproductiveRestTime = $catReproductiveRestTime2[1]));
	$: $catTimeAliveUntilReproduction2,
		(($minCatTimeAliveUntilReproduction = $catTimeAliveUntilReproduction2[0]),
		($maxCatTimeAliveUntilReproduction = $catTimeAliveUntilReproduction2[1]));
	$: $catGeneMutationChance2,
		(($minCatGeneMutationChance = $catGeneMutationChance2[0]),
		($maxCatGeneMutationChance = $catGeneMutationChance2[1]));
	$: $catGeneMutationAmount2,
		(($minCatGeneMutationAmount = $catGeneMutationAmount2[0]),
		($maxCatGeneMutationAmount = $catGeneMutationAmount2[1]));
	$: $catStandards2,
		(($minCatStandards = $catStandards2[0]), ($maxCatStandards = $catStandards2[1]));
	$: $catAttractiveness2,
		(($minCatAttractiveness = $catAttractiveness2[0]),
		($maxCatAttractiveness = $catAttractiveness2[1]));
	$: $catMinHunger2,
		(($minCatMinHunger = $catMinHunger2[0]), ($maxCatMinHunger = $catMinHunger2[1]));
	$: $catMaxHunger2,
		(($minCatMaxHunger = $catMaxHunger2[0]), ($maxCatMaxHunger = $catMaxHunger2[1]));
	$: $catPreyStandards2,
		(($minCatPreyStandards = $catPreyStandards2[0]),
		($maxCatPreyStandards = $catPreyStandards2[1]));
	$: $catAggression2,
		(($minCatAggression = $catAggression2[0]), ($maxCatAggression = $catAggression2[1]));
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
		<p>For example, the starting animals will be generation 1, and a child the have will be generation 2. It always takes the higher generation of its two parents, and adds 1. This gene is the generation number the simulation will stop at.</p>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={60}
			all="label"
			bind:values={$generations2}
			min={20}
			max={500}
		/>
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="animalNum">
		<h1>Amount of Animals to Start</h1>
		<p>DO NOT PUT THIS TOO HIGH UNLESS YOU HAVE A GOOD COMPUTER! A chromebook can only support about 60 animals total, so around 30 animals to start if you set the genes for the animals to grow.</p>
		<h2>Amount of Mice</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all="label" bind:values={$amMice2} max={200} />
		<h2>Amount of Snakes</h2>
		<!--slider with one value-->
		<RangeSlider
			range="min"
			float
			pips
			pipstep={20}
			all="label"
			bind:values={$amSnakes2}
			max={200}
		/>
		<h2>Amount of Cats</h2>
		<!--slider with one value-->
		<RangeSlider range="min" float pips pipstep={20} all="label" bind:values={$amCats2} max={200} />
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="speed">
		<h1>Speed</h1>
		<h2>Mice</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceSpeed2} max={30} />
		<h2>Snakes</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeSpeed2} max={30} />
		<h2>Cats</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catSpeed2} max={30} />
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="vision">
		<h1>Vision</h1>
		<p>This is how close predators have to be for animals to see them and start running away.</p>
		<h2>Mice</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceVision2} max={30} />
		<h2>Snakes</h2>
		<!--range slider with two values-->
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeVision2} max={30} />
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="hunger">
		<h1>Hunger</h1>
		<h2>Minimum Hunger</h2>
		<p>The minimum hunger that each animal starts hunting or eating grass (the animal will die at 0 hunger, and hunger goes down by 1 every second). This is basically the gene to say how long the animal has to hunt before it dies.</p>
		<p>Mouse</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceMinHunger2} max={20} />
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeMinHunger2} max={20} />
		<p>Cat</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catMinHunger2} max={20} />
		<h2>Maximum Hunger</h2>
		<p>The maximum hunger that each animal can have, and also the hunger value it starts at. Do not make this lower than the minimum hunger, or the animal will always be hunting.</p>
		<p>Mouse</p>
		<RangeSlider range float pips pipstep={10} all="label" bind:values={$miceMaxHunger2} max={50} min={10}/>
		<p>Snake</p>
		<RangeSlider range float pips pipstep={10} all="label" bind:values={$snakeMaxHunger2} max={50} min={10}/>
		<p>Cat</p>
		<RangeSlider range float pips pipstep={10} all="label" bind:values={$catMaxHunger2} max={50} min={10}/>
		<h2>Rest Time</h2>
		<p>The time that each animal has to rest after eating.</p>
		<p>Mouse</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceRestTime2} max={10} />
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeRestTime2} max={10} />
		<p>Cat</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catRestTime2} max={10} />
		<h2>Mouse: Hunger gained from resting</h2>
		<p>The mice gain hunger from sitting still while eating grass, while the snakes and cats gain hunger from eating their respective preys, and their hunger gain is based on the prey's food value.</p>
		<RangeSlider range float pips pipstep={10} all="label" bind:values={$miceHungerGainedFromResting2} max={40} min={10} />

		<h2>Aggression</h2>
		<p>How far in advance the animal will start hunting before it's minimum hunger.</p>
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeAggression2} max={10} />
		<p>Cat</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catAggression2} max={10} />
		<h2>Food Value</h2>
		<p>How much hunger the animal gives when eaten.</p>
		<p>Mouse</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceFoodValue2} max={40} />
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeFoodValue2} max={40} />
		
		<h2>Prey Standards</h2>
		<p>The minimum food value that the animal's prey needs to have for it to choose it as prey. Warning: if there is no prey left with a value above this, the animal will starve, even if it there are still other animals left it could have eaten.</p>
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakePreyStandards2} max={35} />
		<p>Cat</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catPreyStandards2} max={35} />
		
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="reproductive">
		<h1>Reproductive</h1>
		<h2>Rest Time</h2>
		<p>The time that each animal has to rest after reproducing.</p>
		<p>Mouse</p>
		<RangeSlider suffix="s" range float pips pipstep={5} all="label" bind:values={$miceReproductiveRestTime2} max={10} />
		<p>Snake</p>
		<RangeSlider range float suffix="s" pips pipstep={5} all="label" bind:values={$snakeReproductiveRestTime2} max={10} />
		<p>Cat</p>
		<RangeSlider suffix="s" range float pips pipstep={5} all="label" bind:values={$catReproductiveRestTime2} max={10} />
		<h2>Time between children</h2>
		<p>The time that each animal has to be alive for before it can have another child.</p>
		<p>Mouse</p>
		<RangeSlider suffix="s" range float pips pipstep={5} all="label" bind:values={$miceReproductiveRestTime2} max={20} />
		<p>Snake</p>
		<RangeSlider suffix="s" range float pips pipstep={5} all="label" bind:values={$snakeReproductiveRestTime2} max={20} />
		<p>Cat</p>
		<RangeSlider suffix="s" range float pips pipstep={5} all="label" bind:values={$catReproductiveRestTime2} max={20} />
		<h2>Attractiveness</h2>
		<p>For the male animals, this is how attractive they are to the females.</p>
		<p>Mouse</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceAttractiveness2} max={30} />
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeAttractiveness2} max={30} />
		<p>Cat</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catAttractiveness2} max={30} />
		<h2>Standards</h2>
		<p>For the female animals, this is the minimum attractiveness their mate has to be.</p>
		<p>Mouse</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$miceStandards2} max={30} />
		<p>Snake</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$snakeStandards2} max={30} />
		<p>Cat</p>
		<RangeSlider range float pips pipstep={5} all="label" bind:values={$catStandards2} max={30} />
	</div>
	<div class="spacer blackToWhite" />
	<div class="geneCatagory2" id="geneMutation">
		<h1>Genetic Mutation</h1>
		<h2>Gene Mutation Percentage</h2>
		<p>The chance an animal has to mutate.</p>
		<p>Mouse</p>
		<RangeSlider range suffix="%" float pips pipstep={10} all="label" bind:values={$miceReproductiveRestTime2} max={100} />
		<p>Snake</p>
		<RangeSlider range float pips suffix="%" pipstep={10} all="label" bind:values={$snakeReproductiveRestTime2} max={100} />
		<p>Cat</p>
		<RangeSlider range float pips suffix="%" pipstep={10} all="label" bind:values={$catReproductiveRestTime2} max={100} />
		<h2>Gene Mutation Amount</h2>
		<p>The amount a gene will mutate by, scales with the minimum and maximum values the parents have (at 0 it will increase by 0%, if it is 100% it will double the gene).</p>
		<p>Mouse</p>
		<RangeSlider suffix="%" range float pips pipstep={5} all="label" bind:values={$miceReproductiveRestTime2} max={30} />
		<p>Snake</p>
		<RangeSlider range suffix="%" float pips pipstep={5} all="label" bind:values={$snakeReproductiveRestTime2} max={30} />
		<p>Cat</p>
		<RangeSlider range float pips suffix="%" pipstep={5} all="label" bind:values={$catReproductiveRestTime2} max={30} />
	</div>
	<div class="spacer whiteToBlack" />
	<div class="geneCatagory1" id="camouflage">
		<h1>Camouflage</h1>
		<p>
			The higher the value, the less they blend in, so zero means they blend in perfectly to the background. Cats do not need camouflage since they are the top predator, and cannot be eaten by anything,
			therefore never evolved to be camouflage.
		</p>
		<h2>Mouse</h2>
		<RangeSlider
			range
			float
			pips
			pipstep={10}
			all="label"
			bind:values={$miceCamouflage2}
			max={60}
		/>
		<h2>Snake</h2>
		<RangeSlider
			range
			float
			pips
			pipstep={10}
			all="label"
			bind:values={$snakeCamouflage2}
			max={60}
		/>
	</div>
</body>

<style>
	:root {
		--range-range: #fb8500; /* active range bar background color */
		--range-handle: #fb8500; /* non-focussed handle color */
		--range-handle-focus: #fb8500; /* focussed handle color */
 		--range-handle-inactive: #0077b6; /* inactive handle color */
		 --range-range-inactive: #0077b6;
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
