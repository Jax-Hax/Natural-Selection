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
	function addMouseData(data2, name, color) {
		// @ts-ignore
		mouseData.datasets.push({
			label: name,
			data: data2,
			borderColor: color,
			lineTension: 0.3,
			pointBorderWidth: 10,
			pointHoverRadius: 5
		});
		mouseChart.update();
	}
	function addSnakeData(data2, name, color) {
		// @ts-ignore
		snakeData.datasets.push({
			label: name,
			data: data2,
			borderColor: color,
			lineTension: 0.3,
			pointBorderWidth: 10,
			pointHoverRadius: 5
		});
		snakeChart.update();
	}
	function addCatData(data2, name, color) {
		// @ts-ignore
		catData.datasets.push({
			label: name,
			data: data2,
			borderColor: color,
			lineTension: 0.3,
			pointBorderWidth: 10,
			pointHoverRadius: 5
		});
		catChart.update();
	}
	onMount(() => {
		addMouseData(JSON.parse(localStorage.getItem('mouseCamouflage')), 'camouflage', 'red');
		addSnakeData(JSON.parse(localStorage.getItem('mouseCamouflage')),'camouflage','red');
		addCatData(JSON.parse(localStorage.getItem('mouseCamouflage')),'camouflage','red');
	});
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	ChartJS.defaults.color = '#ffffff';
</script>

<body>
	<section id="attentioncatcher">
		<h1>Charts</h1>
		<h2>The simulation is over! Here are the results:</h2>
		<h2>Mouse</h2>
		<Line bind:chart={mouseChart} data={mouseData} />
		<h2>Snake</h2>
		<Line bind:chart={snakeChart} data={snakeData} />
		<h2>Cat</h2>
		<Line bind:chart={catChart} data={catData} />
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
