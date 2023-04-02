<script>
	import { Line } from 'svelte-chartjs';
	import { camouflage } from '$lib/chartdata.js';
  
	import {
	  Chart as ChartJS,
	  Title,
	  Tooltip,
	  Legend,
	  LineElement,
	  LinearScale,
	  PointElement,
	  CategoryScale,
	} from 'chart.js';
	import { onMount } from 'svelte';
	let chartData = {
    labels: [],
    datasets: [
      {
        label: 'Data Set 1',
        data: [],
        fill: false,
        borderColor: 'red',
        tension: 0.1
      }
    ]
  };
  let chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  let chartRef;
  onMount(() => {
    chartRef.update();
  });
	function addData(data) {
    chartData.datasets.push({
      label: `Data Set ${chartData.datasets.length + 1}`,
      data: data,
      fill: false,
      borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`,
      tension: 0.1
    });
    chartData.labels = Array.from(Array(data.length).keys());
    chartRef.update();
  }
	ChartJS.register(
	  Title,
	  Tooltip,
	  Legend,
	  LineElement,
	  LinearScale,
	  PointElement,
	  CategoryScale
	);
	addData(camouflage);
  </script>  
<body>
	<section id="attentioncatcher">
		<h1>Charts</h1>
		<h2>The simulation is over! Here are the results:</h2>
		<Line data={camouflage} options={chartOptions} bind:ref={chartRef}  />
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
