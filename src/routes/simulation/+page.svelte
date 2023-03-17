<script>
	import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
	import ParamListBlack from '$components/ParamListBlack.svelte';
	let current = 'mouse';
	let params = [
		{
			name: 'This website!',
			bind: 'sizeX',
			description: 'A website for my small business.'
		}
	];
	let currentVar = 'current';
</script>

<body>
	<div class="firstScreen">
		<a href="/simulation/play" id="startButton"><button>Start Simulation</button></a>
	</div>

	<ParamListBlack>
		<h2>Hello!</h2>
		<p>This is a box. It can contain anything.</p>
	</ParamListBlack>
</body>
