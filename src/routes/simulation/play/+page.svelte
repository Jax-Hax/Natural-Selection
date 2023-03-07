<script>
	import { onMount } from 'svelte';
	let el;
	onMount(() => {
		startGame(el);
	});
	import * as BABYLON from '@babylonjs/core/Legacy/legacy';
	import { sizeX, sizeY, generations, amMice, amSnakes, amCats, minMiceCamouflage, maxMiceCamouflage} from '$lib/stores.js';
	//const sizeX = 100, sizeY = 100, amMice = 5;
	var engine, scene, camera, light, ground, mouse, cat, snake;
	var mouseColor;
	const mice = [];
	const snakes = [];
	const cats = [];
	function createScene(canvas) {
		engine = new BABYLON.Engine(canvas);
		scene = new BABYLON.Scene(engine);
		scene.clearColor = new BABYLON.Color3(0, 50, 75);
		camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 15, -$sizeY), scene);
		camera.attachControl(canvas, true);
		camera.checkCollisions = true;
		camera.speed = 1;
		camera.keysUp.push(87); // “w”
		camera.keysDown.push(83); // “s”
		camera.keysLeft.push(65); // “a”
		camera.keysRight.push(68); // “d”
		camera.inputs.addMouseWheel();
		light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -15), scene);
		light.intensity = 0.8;
		ground = BABYLON.MeshBuilder.CreateGround('ground', {
			height: $sizeX,
			width: $sizeY,
			subdivisions: 1
		});
		var groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
		groundMaterial.diffuseColor = new BABYLON.Color3(0, 0.737, 0.016);

		groundMaterial.backFaceCulling = false;
		ground.material = groundMaterial;
		mouseColor = new BABYLON.StandardMaterial('mouseMaterial', scene);
		mouseColor.diffuseColor = new BABYLON.Color3(1, 0, 1);
	}
	function makeFirstGeneration() {
		for (let i = 0; i < $amMice; i++) {
			let mouse = new Mouse(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwNums,
				10
			);
			const box = BABYLON.MeshBuilder.CreateBox('box', { width: 2, height: 1.5, depth: 3 });
			box.position.x = mouse.posX;
			box.position.y = 0.76;
			box.position.z = mouse.posY;
			box.material = mouseColor;
			mice.push(mouse);
		}
	}
	function randBtwNums(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}
	function gameLoop(canvas) {
		createScene(canvas);
		makeFirstGeneration();
		var renderLoop = function () {
			scene.render();
		};
		engine.runRenderLoop(renderLoop);

		window.addEventListener('resize', function () {
			engine.resize();
		});
		return scene;
	}
	const startGame = (canvas) => {
		gameLoop(canvas);
	};
	class Mouse {
		constructor(posX, posY, speed, camouflage) {
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.camouflage = camouflage;
			this.preyListValue = this.speed - this.camouflage;
			this.reproductiveListValue = 0;
		}
	}
</script>

<body>
	<p />
	<canvas
		style="width: 100%;
    height: 100%;
    touch-action: none;"
		bind:this={el}
	/>
</body>

<style>
	body {
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	* {
		color: white;
	}
</style>
