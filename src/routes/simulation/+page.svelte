<script>
	import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
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

	<div class="geneCatagory">
		<h1>Starting Animals</h1>
	</div>
</body>
