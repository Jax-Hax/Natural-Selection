<script>
	import { onMount } from 'svelte';
	let el;
	onMount(() => {
		startGame(el);
	});
	import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
//const sizeX = 100, sizeY = 100, amMice = 5;
var engine, scene, camera, light, ground, mouse, cat, snake;
const mice = [];
const cats = [];
const snakes = [];
function createScene(canvas) {
	engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 50, 75);
	camera = new BABYLON.UniversalCamera(
		'camera1',
		new BABYLON.Vector3(0, 15, -$sizeY),
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
		height: $sizeX,
		width: $sizeY,
		subdivisions: 1
	});
	var groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
	groundMaterial.backFaceCulling = false;
	ground.material = groundMaterial;
}
function makeFirstGeneration(){
	for (let i = 0; i < amMice.length; i++) {
		let mouse = new Mouse(10, 10, 1);
		const mouse2 = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 1.5, depth: 3})
		addMouseToIntervalList();
	}
}
function addMouseToIntervalList(Mouse mouse){

}
function gameLoop(canvas) {
	createScene(canvas);
	makeFirstGeneration();
	var renderLoop = function () {
		scene.render();
	};
	engine.runRenderLoop(renderLoop);
	
window.addEventListener("resize", function () {
        engine.resize();
      });
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
