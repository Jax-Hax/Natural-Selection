<script>
	import { Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import { onMount } from 'svelte';
	import { generations } from '$lib/stores';
	const labels = Array.from(Array($generations).keys()).map((num) => num + 1);
	const mouseData = {
		labels: labels,
		datasets: []
	};
	const snakeData = {
		labels: labels,
		datasets: []
	};
	const catData = {
		labels: labels,
		datasets: []
	};
	let mouseChart;
	let snakeChart;
	let catChart;
	function addMouseData(data2, name) {
		// @ts-ignore
		mouseData.datasets.push({
			label: name,
			data: data2,
			borderColor: getRandomColor(),
			lineTension: 0.3,
			pointBorderWidth: 10,
			pointHoverRadius: 5
		});
		mouseChart.update();
	}
	function addSnakeData(data2, name) {
		// @ts-ignore
		snakeData.datasets.push({
			label: name,
			data: data2,
			borderColor: getRandomColor(),
			lineTension: 0.3,
			pointBorderWidth: 10,
			pointHoverRadius: 5
		});
		snakeChart.update();
	}
	function addCatData(data2, name) {
		// @ts-ignore
		catData.datasets.push({
			label: name,
			data: data2,
			borderColor: getRandomColor(),
			lineTension: 0.3,
			pointBorderWidth: 10,
			pointHoverRadius: 5
		});
		catChart.update();
	}
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	onMount(() => {
		//mouse
		addMouseData(JSON.parse(localStorage.getItem('mouseSpeed')), 'speed');
		addMouseData(JSON.parse(localStorage.getItem('mouseCamouflage')), 'camouflage');
		addMouseData(JSON.parse(localStorage.getItem('mouseVisionDistance')), 'visionDistance');
		addMouseData(JSON.parse(localStorage.getItem('mouseMaxHunger')), 'maxHunger');
		addMouseData(JSON.parse(localStorage.getItem('mouseMinHunger')), 'minHunger');
		addMouseData(
			JSON.parse(localStorage.getItem('mouseHungerGainedFromResting')),
			'hungerGainedFromResting'
		);
		addMouseData(JSON.parse(localStorage.getItem('mouseRestTime')), 'restTime');
		addMouseData(
			JSON.parse(localStorage.getItem('mouseReproductiveRestTime')),
			'reproductiveRestTime'
		);
		addMouseData(
			JSON.parse(localStorage.getItem('mouseTimeAliveUntilReproduction')),
			'timeAliveUntilReproduction'
		);
		addMouseData(JSON.parse(localStorage.getItem('mouseGeneMutationChance')), 'geneMutationChance');
		addMouseData(JSON.parse(localStorage.getItem('mouseGeneMutationAmount')), 'geneMutationAmount');
		addMouseData(JSON.parse(localStorage.getItem('mouseStandards')), 'standards');
		addMouseData(JSON.parse(localStorage.getItem('mouseAttractiveness')), 'attractiveness');
		addMouseData(JSON.parse(localStorage.getItem('mouseFoodValue')), 'foodValue');
		//snake
		addSnakeData(JSON.parse(localStorage.getItem('snakeSpeed')), 'Speed');
addSnakeData(JSON.parse(localStorage.getItem('snakeCamouflage')), 'Camouflage');
addSnakeData(JSON.parse(localStorage.getItem('snakeVisionDistance')), 'VisionDistance');
addSnakeData(JSON.parse(localStorage.getItem('snakeMaxHunger')), 'MaxHunger');
addSnakeData(JSON.parse(localStorage.getItem('snakeMinHunger')), 'MinHunger');
addSnakeData(JSON.parse(localStorage.getItem('snakeRestTime')), 'RestTime');
addSnakeData(JSON.parse(localStorage.getItem('snakeReproductiveRestTime')), 'ReproductiveRestTime');
addSnakeData(JSON.parse(localStorage.getItem('snakeTimeAliveUntilReproduction')), 'TimeAliveUntilReproduction');
addSnakeData(JSON.parse(localStorage.getItem('snakeGeneMutationChance')), 'GeneMutationChance');
addSnakeData(JSON.parse(localStorage.getItem('snakeGeneMutationAmount')), 'GeneMutationAmount');
addSnakeData(JSON.parse(localStorage.getItem('snakeStandards')), 'Standards');
addSnakeData(JSON.parse(localStorage.getItem('snakeAttractiveness')), 'Attractiveness');
addSnakeData(JSON.parse(localStorage.getItem('snakeFoodValue')), 'FoodValue');
addSnakeData(JSON.parse(localStorage.getItem('snakeAggression')), 'Aggression');
addSnakeData(JSON.parse(localStorage.getItem('snakeStandardsForPrey')), 'StandardsForPrey');
		//cat
	});
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	ChartJS.defaults.color = 'black';
</script>

<body>
	<section id="attentioncatcher">
		<h1>Charts</h1>
		<h2>The simulation is over! Here are the results:</h2>
		<h2>Mouse</h2>
		<Line bind:chart={mouseChart} data={mouseData} style="background-color: #fff;" />
		<h2>Snake</h2>
		<Line bind:chart={snakeChart} data={snakeData} style="background-color: #fff;" />
		<h2>Cat</h2>
		<Line bind:chart={catChart} data={catData} style="background-color: #fff;" />
		<a href="/"><button>Back To Start</button></a>
	</section>
</body>

<style>
	body {
		overflow-x: hidden;
	}
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5vw 2vw 10vw 2vw;
		justify-content: center;
		color: white;
		gap: 1rem;
	}
	#attentioncatcher {
		background: linear-gradient(90deg, #1037a3, #0098fe);
	}
	#attentioncatcher h1 {
		font-size: 3.5rem;
		color: white;
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
	}
	#attentioncatcher button {
		background-color: #fb8500;
		border: -2px solid #fb8500;
		padding: 0.5em 2.5em;
		font-size: 2em;
	}
	#attentioncatcher button:hover {
		background-color: white; /* Green */
		color: #fb8500;
		border: -2px solid #fb8500; /* Green */
		margin-bottom: -2px;
	}
</style>
