<script>
	import { onMount } from 'svelte';
	import { createScene } from './scene.js';
	/**
	 * @type {HTMLCanvasElement}
	 */
	let el;
	onMount(() => {
		createScene(el);
	});
</script>

<body>
	<canvas style="width: 100%;
    height: 100%;
    touch-action: none;" bind:this={el} />
</body>

<style>
	body {
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
    *{
        color: white;
    }
</style>
