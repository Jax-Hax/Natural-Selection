<script>
	import { onMount } from 'svelte';
	let el;
	onMount(() => {
		startGame(el);
	});
	import * as BABYLON from '@babylonjs/core/Legacy/legacy';
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
		maxCatSpeed
	} from '$lib/stores.js';
	//const sizeX = 100, sizeY = 100, amMice = 5;
	var engine, scene, camera, light, ground, mouse, cat, snake,mouseMainModel;
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
		light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(5, 50, -10), scene);
		light.intensity = 0.8;
		ground = BABYLON.MeshBuilder.CreateGround('ground', {
			height: $sizeX,
			width: $sizeY,
			subdivisions: 1
		});
		const groundColor = new BABYLON.StandardMaterial('groundColor', scene);
		groundColor.diffuseColor = new BABYLON.Color3(0, 0.737, 0.016);

		groundColor.backFaceCulling = false;
		ground.material = groundColor;
		mouseMainModel = BABYLON.MeshBuilder.CreateBox('box', { width: 1, height: 0.75, depth: 2 });
		mouseMainModel.registerInstancedBuffer("color", 4);
		mouseMainModel.setEnabled(false);
	}
	function makeFirstGeneration() {
		//mice
		for (let i = 0; i < $amMice; i++) {
			let mouse = new Mouse(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwNums($minMiceSpeed, $maxMiceSpeed),
				randBtwNums($minMiceCamouflage, $maxMiceCamouflage)
			);
			const mouseShape = new BABYLON.InstancedMesh("mouse-" + i, mouseMainModel);
			mouseShape.position.x = mouse.posX;
			mouseShape.position.y = 0.38;
			mouseShape.position.z = mouse.posY;
			mouseShape.rotation.y = randBtwDecimals(-3.14,3.14);
			//randomly changes the ground value by a certain amount using hsv, then converts to rgb
			if (Math.random() >= 0.5) {
				var camouflageColor = hsv2rgb(121.29 - mouse.camouflage * 2, 1, 0.73);
			} else {
				var camouflageColor = hsv2rgb(121.29 + mouse.camouflage * 2, 1, 0.73);
			}
			const mouseColor = new BABYLON.StandardMaterial('mouseMaterial', scene);
			mouseColor.diffuseColor = new BABYLON.Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			mouseShape.instancedBuffers.color = mouseColor;
			mouse.model = mouseShape;
			mice.push(mouse);
		}
		//snakes
		for (let i = 0; i < $amSnakes; i++) {
			let snake = new Snake(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwNums($minSnakeSpeed, $maxSnakeSpeed),
				randBtwNums($minSnakeCamouflage, $maxSnakeCamouflage)
			);
			const snakeShape = BABYLON.MeshBuilder.CreateBox('box', { width: 2, height: 1.5, depth: 7 });
			snakeShape.position.x = snake.posX;
			snakeShape.position.y = 0.76;
			snakeShape.position.z = snake.posY;
			snakeShape.rotation.y = randBtwDecimals(-3.14,3.14);
			//randomly changes the ground value by a certain amount using hsv, then converts to rgb
			if (Math.random() >= 0.5) {
				var camouflageColor = hsv2rgb(121.29 - snake.camouflage * 2, 1, 0.73);
			} else {
				var camouflageColor = hsv2rgb(121.29 + snake.camouflage * 2, 1, 0.73);
			}
			const snakeColor = new BABYLON.StandardMaterial('mouseMaterial', scene);
			snakeColor.diffuseColor = new BABYLON.Color3(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2]
			);
			snakeShape.material = snakeColor;
			snake.model = snakeShape;
			snakes.push(snake);
		}
		//cats
		for (let i = 0; i < $amCats; i++) {
			let cat = new Cat(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwNums($minCatSpeed, $maxCatSpeed)
			);
			const catShape = BABYLON.MeshBuilder.CreateBox('box', { width: 2, height: 1.5, depth: 3 });
			catShape.position.x = cat.posX;
			catShape.position.y = 0.76;
			catShape.position.z = cat.posY;
			catShape.rotation.y = randBtwDecimals(-3.14,3.14);
			const catColor = new BABYLON.StandardMaterial('catMaterial', scene);
			catColor.diffuseColor = new BABYLON.Color3(0.557,0.557,0.557);
			catShape.material = catColor;
			cat.model = catShape;
			cats.push(cat);
		}
	}
	function checkEachMouse(){
		for (let i = 0; i < mice.length; i++) {
			mice[i].model.position.x = 100;
		}
	}
	function gameLoop(canvas) {
		createScene(canvas);
		makeFirstGeneration();
		var renderLoop = function () {
			checkEachMouse();
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
		set model(model) {
    this.model = model;
  }
	}
	class Snake {
		constructor(posX, posY, speed, camouflage) {
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.camouflage = camouflage;
			this.preyListValue = this.speed - this.camouflage;
			this.reproductiveListValue = 0;
		}
	}
	class Cat {
		constructor(posX, posY, speed) {
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.reproductiveListValue = 0;
		}
	}

	//Functions for things that are used often, but not a part of game function
	function hsv2rgb(h, s, v) {
		let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
		return [f(5), f(3), f(1)];
	}
	function randBtwNums(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}
	function randBtwDecimals(min, max) {
		return Math.random() * (max - min) + min;
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
