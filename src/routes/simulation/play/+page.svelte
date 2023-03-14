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
		minMiceVision,
		maxMiceVision,
		minMiceSpeed,
		maxMiceSpeed,
		minMiceMinHunger,
		maxMiceMinHunger,
		minMiceMaxHunger,
		maxMiceMaxHunger,
		minSnakeCamouflage,
		maxSnakeCamouflage,
		minSnakeSpeed,
		maxSnakeSpeed,
		minCatSpeed,
		maxCatSpeed
	} from '$lib/stores.js';
	//const sizeX = 100, sizeY = 100, amMice = 5;
	var engine,
		scene,
		camera,
		light,
		ground,
		mouse,
		cat,
		snake,
		mouseMainModel,
		snakeMainModel,
		catMainModel,
		distanceBtwPoints,
		deltaTime,
		miceIDNum,
		snakeIDNum,
		catIDNum,
		desiredDirection;
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
		mouseMainModel = BABYLON.MeshBuilder.CreateBox('mouseModel', {
			width: 1,
			height: 0.75,
			depth: 2
		});
		mouseMainModel.registerInstancedBuffer('color', 4);
		mouseMainModel.setEnabled(false);
		snakeMainModel = BABYLON.MeshBuilder.CreateBox('snakeModel', {
			width: 2,
			height: 1.5,
			depth: 7
		});
		snakeMainModel.registerInstancedBuffer('color', 4);
		snakeMainModel.setEnabled(false);
		catMainModel = BABYLON.MeshBuilder.CreateBox('catModel', {
			width: 2,
			height: 1.5,
			depth: 3
		});
		const catColor = new BABYLON.StandardMaterial('catMaterial', scene);
		catColor.diffuseColor = new BABYLON.Color3(0.557, 0.557, 0.557);
		catMainModel.material = catColor;
		catMainModel.setEnabled(false);
	}
	function makeFirstGeneration() {
		//mice
		for (let i = 0; i < $amMice; i++) {
			let mouse = new Mouse(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwDecimals($minMiceSpeed, $maxMiceSpeed),
				randBtwNums($minMiceCamouflage, $maxMiceCamouflage),
				randBtwNums($minMiceVision, $maxMiceVision),
				randBtwNums($minMiceMaxHunger, $maxMiceMaxHunger),
				randBtwNums($minMiceMinHunger, $maxMiceMinHunger),
				Math.random() < 0.5
			);
			const mouseShape = mouseMainModel.createInstance('mouse' + i);
			mouseShape.position.x = mouse.posX;
			mouseShape.position.y = 0.38;
			mouseShape.position.z = mouse.posY;
			mouseShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			//randomly changes the ground value by a certain amount using hsv, then converts to rgb
			var camouflageColor;
			if (Math.random() >= 0.5) {
				camouflageColor = hsv2rgb(121.29 - mouse.camouflage * 2, 1, 0.73);
			} else {
				camouflageColor = hsv2rgb(121.29 + mouse.camouflage * 2, 1, 0.73);
			}
			mouseShape.instancedBuffers.color = new BABYLON.Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			mouse.model = mouseShape;
			mice.push(mouse);
		}
		miceIDNum = $amMice;
		//snakes
		for (let i = 0; i < $amSnakes; i++) {
			let snake = new Snake(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwNums($minSnakeSpeed, $maxSnakeSpeed),
				randBtwNums($minSnakeCamouflage, $maxSnakeCamouflage)
			);
			const snakeShape = snakeMainModel.createInstance('snake' + i);
			snakeShape.position.x = snake.posX;
			snakeShape.position.y = 0.76;
			snakeShape.position.z = snake.posY;
			snakeShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			//randomly changes the ground value by a certain amount using hsv, then converts to rgb
			var camouflageColor;
			if (Math.random() >= 0.5) {
				camouflageColor = hsv2rgb(121.29 - snake.camouflage * 2, 1, 0.73);
			} else {
				camouflageColor = hsv2rgb(121.29 + snake.camouflage * 2, 1, 0.73);
			}
			snakeShape.instancedBuffers.color = new BABYLON.Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
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
			const catShape = catMainModel.createInstance('cat' + i);
			catShape.position.x = cat.posX;
			catShape.position.y = 0.76;
			catShape.position.z = cat.posY;
			catShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			cat.model = catShape;
			cats.push(cat);
		}
	}
	function checkEachMouse(translation) {
		for (let i = 0; i < mice.length; i++) {
			mouse = mice[i];
			translation.set(0,0,0);
			translation.z = deltaTime*mouse.speed;
			if (!mouse.isResting && !mouse.isReproductiveResting) {
				if (mouse.isBeingChased) {
					distanceBtwPoints = Math.sqrt(
						Math.pow(mouse.predator.pos.x - mouse.pos.x, 2) +
							Math.pow(mouse.predator.pos.x - mouse.pos.x, 2)
					);
					if (mouse.visionDistance >= distanceBtwPoints) {
						mouse.model.rotation.y = mouse.predator.rotation.y;
						mouse.model.locallyTranslate(translation)
					}
				} else if (mouse.lookingForMate) {
					if (mouse.hasMate) {
						if (mouse.mate.position == mouse.model.position) {
							if(mouse.isFemale == true){
								haveChild("mouse",mouse,mouse.mate);
							}
							mouse.hasMate = false;
							mouse.lookingForMate = false;
							mouse.isReproductiveResting = true;
						} else {
							//THIS WON't work since they will infinitely flip back and forth
							mouse.model.rotation.y = -mouse.mate.rotation.y;
			mouse.model.locallyTranslate(translation)
						}
					} else {
						//findMate
					}
				} else {
					mouse.timeUntilReproduction -= deltaTime;
					if (mouse.timeUntilReproduction <= 0) {
						mouse.timeUntilReproduction = mouse.timeAliveUntilReproduction;
						mouse.lookingForMate = true;
					}
					//movement code
					/*if(Math.random < 0.9*deltaTime){
					}*/
					desiredDirection = Math.random(1) * 1.57;
					if(Math.random() > 0.5){
						mouse.model.rotation.y += desiredDirection;
					}
					else{
						mouse.model.rotation.y -= desiredDirection;
					}
					translation.z = deltaTime*mouse.speed - desiredDirection;
								mouse.model.locallyTranslate(translation)
				}
				if (mouse.currentHunger < mouse.minHunger) {
					mouse.isResting = true;
				} else {
					mouse.currentHunger -= deltaTime;
				}
			} else if (!mouse.isReproductiveResting) {
				//resting countdown
				mouse.restingCountdown -= deltaTime;
				mouse.currentHunger += deltaTime * mouse.hungerGainedFromResting;
				if (mouse.restingCountdown <= 0) {
					mouse.restingCountdown = mouse.restTime;
					mouse.isResting = false;
				}
			} else {
				//reproductive resting
				mouse.reproductiveRestingCountdown -= deltaTime;
				if (mouse.reproductiveRestingCountdown <= 0) {
					mouse.reproductiveRestingCountdown = mouse.reproductiveRestTime;
					mouse.isReproductiveResting = false;
				}
			}
		}
	}
	function haveChild(childType, female, male){
		if(childType == "mouse"){
			let mouse = new Mouse(
				female.model.position.x,
				female.model.position.y,
				randBtwDecimals(female.speed, male.speed) + (Math.random() > randBtwDecimals(female.geneMutationChance,male.geneMutationChance) ? randBtwDecimals(female.geneMutationAmount,male.geneMutationAmount): 0),
				randBtwNums(female.camouflage, male.camouflage) + (Math.random() > randBtwDecimals(female.geneMutationChance,male.geneMutationChance) ? randBtwDecimals(female.geneMutationAmount,male.geneMutationAmount): 0),
				randBtwNums(female.visionDistance, male.visionDistance) + (Math.random() > randBtwDecimals(female.geneMutationChance,male.geneMutationChance) ? randBtwDecimals(female.geneMutationAmount,male.geneMutationAmount): 0),
				randBtwNums(female.maxHunger, male.maxHunger) + (Math.random() > randBtwDecimals(female.geneMutationChance,male.geneMutationChance) ? randBtwDecimals(female.geneMutationAmount,male.geneMutationAmount): 0),
				randBtwNums(female.minHunger, male.minHunger) + (Math.random() > randBtwDecimals(female.geneMutationChance,male.geneMutationChance) ? randBtwDecimals(female.geneMutationAmount,male.geneMutationAmount): 0),
				Math.random() < 0.5
			);
			const mouseShape = mouseMainModel.createInstance('mouse' + miceIDNum);
			miceIDNum += 1;
			mouseShape.position.x = mouse.posX;
			mouseShape.position.y = 0.38;
			mouseShape.position.z = mouse.posY;
			mouseShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			//randomly changes the ground value by a certain amount using hsv, then converts to rgb
			var camouflageColor;
			if (Math.random() >= 0.5) {
				camouflageColor = hsv2rgb(121.29 - mouse.camouflage * 2, 1, 0.73);
			} else {
				camouflageColor = hsv2rgb(121.29 + mouse.camouflage * 2, 1, 0.73);
			}
			mouseShape.instancedBuffers.color = new BABYLON.Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			mouse.model = mouseShape;
			mice.push(mouse);
		}
		else if(childType == "snake"){
			//snake
		}
		else{
			//cat
		}
	}
	function gameLoop(canvas) {
		createScene(canvas);
		makeFirstGeneration();
		const translation = new BABYLON.Vector3(0,0,0);
		var renderLoop = function () {
			deltaTime = scene.deltaTime ? scene.deltaTime/1000 : 0;
			checkEachMouse(translation);
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
		constructor(
			posX,
			posY,
			speed,
			camouflage,
			visionDistance,
			maxHunger,
			minHunger,
			isFemale,
			hungerGainedFromResting,
			restTime,
			reproductiveRestTime,
			timeUntilReproduction,
			timeAliveUntilReproduction,
			geneMutationChance,
			geneMutationAmount
		) {
			this.model = undefined;
			this.isFemale = isFemale;
			this.restTime = restTime;
			this.geneMutationChance = geneMutationChance;
			this.geneMutationAmount = geneMutationAmount;
			this.restingCountdown = this.restTime;
			this.reproductiveRestTime = reproductiveRestTime;
			this.reproductiveRestingCountdown = this.reproductiveRestTime;
			this.isReproductiveResting = false;
			this.hungerGainedFromResting = hungerGainedFromResting;
			this.timeUntilReproduction = timeAliveUntilReproduction;
			this.timeAliveUntilReproduction = timeAliveUntilReproduction;
			this.maxHunger = maxHunger;
			this.currentHunger = maxHunger;
			this.minHunger = minHunger;
			this.predator = undefined;
			this.mate = undefined;
			this.isResting = false;
			this.lookingForMate = false;
			this.hasMate = false;
			this.isBeingChased = false;
			this.visionDistance = visionDistance;
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.camouflage = camouflage;
			this.preyListValue = this.speed - this.camouflage;
			this.reproductiveListValue = 0;
		}
	}
	class Snake {
		constructor(posX, posY, speed, camouflage) {
			this.model = undefined;
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
			this.model = undefined;
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
