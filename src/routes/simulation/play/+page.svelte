<script>
	import { onMount } from 'svelte';
	let el;
	onMount(() => {
		startGame(el);
	});
	import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
var engine, scene, camera, light, ground, mouse, cat, snake;
const mice = [];
const cats = [];//test
const snakes = [];
function createScene(canvas) {
	engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 50, 25);
	camera = new BABYLON.UniversalCamera(
		'camera1',
		new BABYLON.Vector3(0, 1, -$sizeY),
		scene
	);
	camera.attachControl(canvas, true);
	camera.checkCollisions = true;
	camera.speed = 1;
	camera.keysUp.push(87); // “w”
	camera.keysDown.push(83); // “s”
	camera.keysLeft.push(65); // “a”
	camera.keysRight.push(68); // “d”
	camera.inputs.addMouseWheel();
	light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -15), scene);
	light.intensity = 0.5;
	ground = BABYLON.MeshBuilder.CreateGround('ground', {
		height: 100 /*sizeX*/,
		width: 400 /*sizeY*/,
		subdivisions: 1
	});
	var groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
	groundMaterial.backFaceCulling = false;
	ground.material = groundMaterial;
}
function gameLoop(canvas) {
	createScene(canvas);
	var renderLoop = function () {
		scene.render();
	};
	engine.runRenderLoop(renderLoop);
	return scene;
}
const startGame = (canvas) => {
	gameLoop(canvas);
};
</script>

<body>
	<p></p>
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
