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
		maxCatSpeed,
		minMiceHungerGainedFromResting,
		maxMiceHungerGainedFromResting,
		minMiceRestTime,
		maxMiceRestTime,
		minMiceReproductiveRestTime,
		maxMiceReproductiveRestTime,
		minMiceTimeAliveUntilReproduction,
		maxMiceTimeAliveUntilReproduction,
		minMiceGeneMutationChance,
		maxMiceGeneMutationChance,
		minMiceGeneMutationAmount,
		maxMiceGeneMutationAmount,
		minMiceStandards,
		maxMiceStandards,
		minMiceAttractiveness,
		maxMiceAttractiveness,
		minMiceFoodValue,
		maxMiceFoodValue,
		minMiceMinHunger,
		maxMiceMinHunger,
		minMiceMaxHunger,
		maxMiceMaxHunger,
		minMiceVision,
		maxMiceVision,
		minSnakeRestTime,
		maxSnakeRestTime,
		minSnakeReproductiveRestTime,
		maxSnakeReproductiveRestTime,
		minSnakeTimeAliveUntilReproduction,
		maxSnakeTimeAliveUntilReproduction,
		minSnakeGeneMutationChance,
		maxSnakeGeneMutationChance,
		minSnakeGeneMutationAmount,
		maxSnakeGeneMutationAmount,
		minSnakeStandards,
		maxSnakeStandards,
		minSnakeAttractiveness,
		maxSnakeAttractiveness,
		minSnakeMinHunger,
		maxSnakeMinHunger,
		minSnakeMaxHunger,
		maxSnakeMaxHunger,
		minSnakeVision,
		maxSnakeVision,
		minSnakePreyStandards,
		maxSnakePreyStandards,
		minSnakeAggression,
		maxSnakeAggression,
		minSnakeFoodValue,
		maxSnakeFoodValue,
		minCatRestTime,
		maxCatRestTime,
		minCatReproductiveRestTime,
		maxCatReproductiveRestTime,
		minCatTimeAliveUntilReproduction,
		maxCatTimeAliveUntilReproduction,
		minCatGeneMutationChance,
		maxCatGeneMutationChance,
		minCatGeneMutationAmount,
		maxCatGeneMutationAmount,
		minCatStandards,
		maxCatStandards,
		minCatAttractiveness,
		maxCatAttractiveness,
		minCatMinHunger,
		maxCatMinHunger,
		minCatMaxHunger,
		maxCatMaxHunger,
		minCatPreyStandards,
		maxCatPreyStandards,
		minCatAggression,
		maxCatAggression
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
	const miceReproductiveList = [];
	const snakesReproductiveList = [];
	const catsReproductiveList = [];
	function createScene(canvas) {
		engine = new BABYLON.Engine(canvas);
		scene = new BABYLON.Scene(engine);
		scene.clearColor = new BABYLON.Color3(0, 50, 75);
		camera = new BABYLON.UniversalCamera(
			'camera1',
			new BABYLON.Vector3(0, $sizeX / 4, -$sizeX),
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
				randBtwDecimals($minMiceVision, $maxMiceVision),
				randBtwNums($minMiceMaxHunger, $maxMiceMaxHunger),
				randBtwNums($minMiceMinHunger, $maxMiceMinHunger),
				Math.random() < 0.5,
				randBtwDecimals($minMiceHungerGainedFromResting, $maxMiceHungerGainedFromResting),
				randBtwDecimals($minMiceRestTime, $maxMiceRestTime),
				randBtwDecimals($minMiceReproductiveRestTime, $maxMiceReproductiveRestTime),
				randBtwDecimals($minMiceTimeAliveUntilReproduction, $maxMiceTimeAliveUntilReproduction),
				randBtwDecimals($minMiceGeneMutationChance, $maxMiceGeneMutationChance) / 100,
				randBtwDecimals($minMiceGeneMutationAmount, $maxMiceGeneMutationAmount),
				randBtwDecimals($minMiceStandards, $maxMiceStandards),
				randBtwDecimals($minMiceAttractiveness, $maxMiceAttractiveness),
				randBtwDecimals($minMiceFoodValue, $maxMiceFoodValue)
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
				randBtwDecimals($minSnakeSpeed, $maxSnakeSpeed),
				randBtwNums($minSnakeCamouflage, $maxSnakeCamouflage),
				randBtwDecimals($minSnakeVision, $maxSnakeVision),
				randBtwNums($minSnakeMaxHunger, $maxSnakeMaxHunger),
				randBtwNums($minSnakeMinHunger, $maxSnakeMinHunger),
				Math.random() < 0.5,
				randBtwDecimals($minSnakeRestTime, $maxSnakeRestTime),
				randBtwDecimals($minSnakeReproductiveRestTime, $maxSnakeReproductiveRestTime),
				randBtwDecimals($minSnakeTimeAliveUntilReproduction, $maxSnakeTimeAliveUntilReproduction),
				randBtwDecimals($minSnakeGeneMutationChance, $maxSnakeGeneMutationChance) / 100,
				randBtwDecimals($minSnakeGeneMutationAmount, $maxSnakeGeneMutationAmount),
				randBtwDecimals($minSnakeStandards, $maxSnakeStandards),
				randBtwDecimals($minSnakeAttractiveness, $maxSnakeAttractiveness),
				randBtwDecimals($minSnakeFoodValue, $maxSnakeFoodValue),
				randBtwDecimals($minSnakeAggression, $maxSnakeAggression),
				randBtwDecimals($minSnakePreyStandards, $maxSnakePreyStandards)
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
		snakeIDNum = $amSnakes;

		//cats
		for (let i = 0; i < $amCats; i++) {
			let cat = new Cat(
				randBtwNums(-$sizeX / 2, $sizeX / 2),
				randBtwNums(-$sizeY / 2, $sizeY / 2),
				randBtwDecimals($minCatSpeed, $maxCatSpeed),
				randBtwNums($minCatMaxHunger, $maxCatMaxHunger),
				randBtwNums($minCatMinHunger, $maxCatMinHunger),
				Math.random() < 0.5,
				randBtwDecimals($minCatRestTime, $maxCatRestTime),
				randBtwDecimals($minCatReproductiveRestTime, $maxCatReproductiveRestTime),
				randBtwDecimals($minCatTimeAliveUntilReproduction, $maxCatTimeAliveUntilReproduction),
				randBtwDecimals($minCatGeneMutationChance, $maxCatGeneMutationChance) / 100,
				randBtwDecimals($minCatGeneMutationAmount, $maxCatGeneMutationAmount),
				randBtwDecimals($minCatStandards, $maxCatStandards),
				randBtwDecimals($minCatAttractiveness, $maxCatAttractiveness),
				randBtwDecimals($minCatAggression, $maxCatAggression),
				randBtwDecimals($minCatPreyStandards, $maxCatPreyStandards)
			);
			const catShape = catMainModel.createInstance('cat' + i);
			catShape.position.x = cat.posX;
			catShape.position.y = 0.76;
			catShape.position.z = cat.posY;
			catShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			cat.model = catShape;
			cats.push(cat);
		}
		catIDNum = $amCats;
	}
	function checkEachMouse(translation) {
		for (let j = 0; j < mice.length; j++) {
			mouse = mice[j];
			mouse.canMove = true;
			translation.set(0, 0, 0);
			translation.z = deltaTime * mouse.speed;
			if (!mouse.isResting && !mouse.isReproductiveResting) {
				if (mouse.isBeingChased) {
					distanceBtwPoints = distBtwPoints(
						mouse.model.position.x,
						mouse.model.position.z,
						mouse.predator.model.position.x,
						mouse.predator.model.position.z
					);
					if (mouse.visionDistance >= distanceBtwPoints) {
						mouse.canMove = false;
						mouse.model.rotation.y = mouse.predator.model.rotation.y;
						mouse.model.locallyTranslate(translation);
						checkWallCollision(mouse);
					}
				} else if (mouse.lookingForMate) {
					if (mouse.hasMate) {
						mouse.canMove = false;
						if (
							mouse.mate.model.position.x <= mouse.model.position.x + 1 &&
							mouse.mate.model.position.x >= mouse.model.position.x - 1 &&
							mouse.mate.model.position.z <= mouse.model.position.z + 1 &&
							mouse.mate.model.position.z >= mouse.model.position.z - 1
						) {
							if (mouse.isFemale == true) {
								haveChild('mouse', mouse, mouse.mate);
							}
							mouse.hasMate = false;
							mouse.mate = undefined;
							mouse.lookingForMate = false;
							mouse.isReproductiveResting = true;
						} else {
							mouse.model.lookAt(mouse.mate.model.position);
							mouse.model.locallyTranslate(translation);
						}
					} else {
						//findMate
						if (!mouse.isFemale) {
							if (!mouse.onReproductiveList) {
								miceReproductiveList.push(mouse);
								mouse.onReproductiveList = true;
							}
						} else {
							for (let i = 0; i < miceReproductiveList.length; i++) {
								if (miceReproductiveList[i].attractiveness > mouse.standards) {
									mouse.mate = miceReproductiveList[i];
									mouse.hasMate = true;
									mouse.mate.hasMate = true;
									miceReproductiveList[i].mate = mouse;
									miceReproductiveList.splice(i, 1);
								}
							}
						}
					}
				} else {
					mouse.timeUntilReproduction -= deltaTime;
					if (mouse.timeUntilReproduction <= 0) {
						mouse.timeUntilReproduction = mouse.timeAliveUntilReproduction;
						mouse.lookingForMate = true;
					}
				}
				if (mouse.canMove) {
					//movement code
					if (mouse.turning) {
						mouse.hasAvoidedWall = false;
						desiredDirection = mouse.speed * deltaTime;
						mouse.turnAmount -= desiredDirection;
						if (mouse.turningLeft) {
							mouse.model.rotation.y -= desiredDirection;
						} else {
							mouse.model.rotation.y += desiredDirection;
						}
						if (mouse.turnAmount < 0) {
							mouse.turning = false;
						}
					} else {
						mouse.timerToTurning -= deltaTime;
						if (mouse.timerToTurning < 0) {
							mouse.turning = true;
							mouse.timerToTurning = Math.random() * 3;
							mouse.turnAmount = Math.random() * 1.57;
							if (Math.random() > 0.5) {
								mouse.turningLeft = true;
							} else {
								mouse.turningLeft = false;
							}
						}
					}
					mouse.model.locallyTranslate(translation);
					checkWallCollision(mouse);
					//end movement code
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
				if (mouse.currentHunger > mouse.maxHunger) {
					mouse.currentHunger = mouse.maxHunger;
				}
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

	function checkEachSnake(translation) {
		for (let j = 0; j < snakes.length; j++) {
			snake = snakes[j];
			snake.canMove = true;
			translation.set(0, 0, 0);
			translation.z = deltaTime * snake.speed;
			if (!snake.isResting && !snake.isReproductiveResting && !snake.isHuntingPrey) {
				if (snake.isBeingChased) {
					distanceBtwPoints = distBtwPoints(
						snake.model.position.x,
						snake.model.position.z,
						snake.predator.model.position.x,
						snake.predator.model.position.z
					);
					if (snake.visionDistance >= distanceBtwPoints) {
						snake.canMove = false;
						snake.model.rotation.y = snake.predator.rotation.y;
						snake.model.locallyTranslate(translation);
						checkWallCollision(snake);
					}
				} else if (snake.lookingForMate) {
					if (snake.hasMate) {
						snake.canMove = false;
						if (
							snake.mate.model.position.x <= snake.model.position.x + 1 &&
							snake.mate.model.position.x >= snake.model.position.x - 1 &&
							snake.mate.model.position.z <= snake.model.position.z + 1 &&
							snake.mate.model.position.z >= snake.model.position.z - 1
						) {
							if (snake.isFemale == true) {
								haveChild('snake', snake, snake.mate);
							}
							snake.hasMate = false;
							snake.mate = undefined;
							snake.lookingForMate = false;
							snake.isReproductiveResting = true;
						} else {
							snake.model.lookAt(snake.mate.model.position);
							snake.model.locallyTranslate(translation);
						}
					} else {
						//findMate
						if (!snake.isFemale) {
							if (!snake.onReproductiveList) {
								snakesReproductiveList.push(snake);
								snake.onReproductiveList = true;
							}
						} else {
							for (let i = 0; i < snakesReproductiveList.length; i++) {
								if (snakesReproductiveList[i].attractiveness > snake.standards) {
									snake.mate = snakesReproductiveList[i];
									snake.hasMate = true;
									snake.mate.hasMate = true;
									snakesReproductiveList[i].mate = snake;
									snakesReproductiveList.splice(i, 1);
								}
							}
						}
					}
				} else {
					snake.timeUntilReproduction -= deltaTime;
					if (snake.timeUntilReproduction <= 0) {
						snake.timeUntilReproduction = snake.timeAliveUntilReproduction;
						snake.lookingForMate = true;
					}
				}
				if (snake.canMove) {
					//movement code
					if (snake.turning) {
						snake.hasAvoidedWall = false;
						desiredDirection = snake.speed * deltaTime;
						snake.turnAmount -= desiredDirection;
						if (snake.turningLeft) {
							snake.model.rotation.y -= desiredDirection;
						} else {
							snake.model.rotation.y += desiredDirection;
						}
						if (snake.turnAmount < 0) {
							snake.turning = false;
						}
					} else {
						snake.timerToTurning -= deltaTime;
						if (snake.timerToTurning < 0) {
							snake.turning = true;
							snake.timerToTurning = Math.random() * 3;
							snake.turnAmount = Math.random() * 1.57;
							if (Math.random() > 0.5) {
								snake.turningLeft = true;
							} else {
								snake.turningLeft = false;
							}
						}
					}
					snake.model.locallyTranslate(translation);
					checkWallCollision(snake);
					//end movement code
				}
				if (snake.currentHunger < snake.minHunger) {
					snake.isLookingForPrey = true;
					console.log('lookingForPrey');
				} else {
					snake.currentHunger -= deltaTime;
				}
				if (snake.isLookingForPrey) {
					for (let i = 0; i < mice.length; i++) {
						if (mice[i].preyListValue >= snake.standardsForPrey && !mice[i].isBeingChased) {
							snake.prey = mice[i];
							snake.isHuntingPrey = true;
							snake.isLookingForPrey = false;
							snake.prey.isBeingChased = true;
							snake.prey.predator = snake;
						}
					}
				}
			} else if (!snake.isReproductiveResting && !snake.isHuntingPrey) {
				//resting countdown
				snake.restingCountdown -= deltaTime;
				if (snake.restingCountdown <= 0) {
					snake.restingCountdown = snake.restTime;
					snake.isResting = false;
				}
			} else if (!snake.isHuntingPrey) {
				//reproductive resting
				snake.reproductiveRestingCountdown -= deltaTime;
				if (snake.reproductiveRestingCountdown <= 0) {
					snake.reproductiveRestingCountdown = snake.reproductiveRestTime;
					snake.isReproductiveResting = false;
				}
			} else {
				//hunting prey
				if (
					snake.prey.model.position.x <= snake.model.position.x + 1 &&
					snake.prey.model.position.x >= snake.model.position.x - 1 &&
					snake.prey.model.position.z <= snake.model.position.z + 1 &&
					snake.prey.model.position.z >= snake.model.position.z - 1
				) {
					//eat prey
					snake.currentHunger += snake.prey.foodValue;
					snake.isHuntingPrey = false;
					snake.prey.model.dispose();
					for (let i = 0; i < mice.length; i++) {
						if ((mice[i] = snake.prey)) {
							if (mice[i].mate != undefined) {
								mice[i].mate.mate = undefined;
								mice[i].mate.hasMate = false;
							}
							mice[i] = null;
							mice.splice(i, 1);
						}
					}
					for (let i = 0; i < miceReproductiveList.length; i++) {
						if ((miceReproductiveList[i] = snake.prey)) {
							miceReproductiveList[i] = null;
							miceReproductiveList.splice(i, 1);
						}
					}
					if (snake.currentHunger > snake.maxHunger) {
						snake.currentHunger = snake.maxHunger;
					}
				} else {
					snake.model.lookAt(snake.prey.model.position);
					snake.model.locallyTranslate(translation);
				}
			}
		}
	}
	function checkWallCollision(animal) {
		if (!animal.hasAvoidedWall) {
			if (
				animal.model.position.x > $sizeX / 2 + 0.1 ||
				animal.model.position.x < -($sizeX / 2 - 0.1) ||
				animal.model.position.z > $sizeY / 2 + 0.1 ||
				animal.model.position.z < -($sizeY / 2 + 0.1)
			) {
				animal.model.rotation.y = -animal.model.rotation.y;
				animal.turning = false;
				animal.hasAvoidedWall = true;
				animal.timerToTurning = Math.random() + 3;
			}
		}
	}
	function haveChild(childType, female, male) {
		if (childType == 'mouse') {
			let mouse = new Mouse(
				female.model.position.x,
				female.model.position.z,
				childGeneCalculator(female.speed, male.speed, female, male),
				childGeneCalculator(female.camouflage, male.camouflage, female, male),
				childGeneCalculator(female.visionDistance, male.visionDistance, female, male),
				childGeneCalculator(female.maxHunger, male.maxHunger, female, male),
				childGeneCalculator(female.minHunger, male.minHunger, female, male),
				Math.random() < 0.5,
				childGeneCalculator(
					female.hungerGainedFromResting,
					male.hungerGainedFromResting,
					female,
					male
				),
				childGeneCalculator(female.restTime, male.restTime, female, male),
				childGeneCalculator(female.reproductiveRestTime, male.reproductiveRestTime, female, male),
				childGeneCalculator(
					female.timeAliveUntilReproduction,
					male.timeAliveUntilReproduction,
					female,
					male
				),
				childGeneCalculator(female.geneMutationChance, male.geneMutationChance, female, male),
				childGeneCalculator(female.geneMutationAmount, male.geneMutationAmount, female, male),
				childGeneCalculator(female.standards, male.standards, female, male),
				childGeneCalculator(female.attractiveness, male.attractiveness, female, male),
				childGeneCalculator(female.foodValue, male.foodValue, female, male)
			);
			const mouseShape = mouseMainModel.createInstance('mouse' + miceIDNum);
			miceIDNum += 1;
			mouseShape.position.x = mouse.posX;
			mouseShape.position.y = 0.38;
			mouseShape.position.z = mouse.posY;
			mouseShape.rotation.y = female.model.rotation.y;
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
		} else if (childType == 'snake') {
			//snake
		} else {
			//cat
		}
	}
	function childGeneCalculator(gene1, gene2, female, male) {
		if (Math.random() > 0.5) {
			return (
				randBtwNums(gene1, gene2) +
				(Math.random() > randBtwDecimals(female.geneMutationChance, male.geneMutationChance)
					? randBtwDecimals(female.geneMutationAmount, male.geneMutationAmount)
					: 0)
			);
		} else {
			const num =
				randBtwNums(gene1, gene2) -
				(Math.random() > randBtwDecimals(female.geneMutationChance, male.geneMutationChance)
					? randBtwDecimals(female.geneMutationAmount, male.geneMutationAmount)
					: 0);
			if (num > 0) {
				return num;
			} else {
				return randBtwNums(gene1, gene2);
			}
		}
	}
	function gameLoop(canvas) {
		createScene(canvas);
		makeFirstGeneration();
		const translation = new BABYLON.Vector3(0, 0, 0);
		var renderLoop = function () {
			deltaTime = scene.deltaTime ? scene.deltaTime / 1000 : 0;
			checkEachMouse(translation);
			checkEachSnake(translation);
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
			timeAliveUntilReproduction,
			geneMutationChance,
			geneMutationAmount,
			standards,
			attractiveness,
			foodValue
		) {
			this.model = undefined;
			this.foodValue = foodValue;
			this.isFemale = isFemale;
			this.restTime = restTime;
			this.turning = false;
			this.hasAvoidedWall = false;
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
			this.canMove = true;
			this.mate = undefined;
			this.isResting = false;
			this.onReproductiveList = false;
			this.lookingForMate = false;
			this.turningLeft = false;
			this.turnAmount = 1;
			this.hasMate = false;
			this.isBeingChased = false;
			this.timerToTurning = 2;
			this.visionDistance = visionDistance;
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.camouflage = camouflage;
			this.preyListValue = this.speed - this.camouflage / 10 + this.foodValue;
			this.standards = standards;
			this.attractiveness = attractiveness;
		}
	}
	class Snake {
		constructor(
			posX,
			posY,
			speed,
			camouflage,
			visionDistance,
			maxHunger,
			minHunger,
			isFemale,
			restTime,
			reproductiveRestTime,
			timeAliveUntilReproduction,
			geneMutationChance,
			geneMutationAmount,
			standards,
			attractiveness,
			foodValue,
			aggression,
			standardsForPrey
		) {
			this.model = undefined;
			this.foodValue = foodValue;
			this.isFemale = isFemale;
			this.restTime = restTime;
			this.isLookingForPrey = false;
			this.isHuntingPrey = false;
			this.turning = false;
			this.geneMutationChance = geneMutationChance;
			this.geneMutationAmount = geneMutationAmount;
			this.restingCountdown = this.restTime;
			this.reproductiveRestTime = reproductiveRestTime;
			this.reproductiveRestingCountdown = this.reproductiveRestTime;
			this.isReproductiveResting = false;
			this.timeUntilReproduction = timeAliveUntilReproduction;
			this.timeAliveUntilReproduction = timeAliveUntilReproduction;
			this.maxHunger = maxHunger;
			this.currentHunger = maxHunger;
			this.minHunger = minHunger;
			this.predator = undefined;
			this.canMove = true;
			this.mate = undefined;
			this.isResting = false;
			this.onReproductiveList = false;
			this.lookingForMate = false;
			this.turningLeft = false;
			this.turnAmount = 1;
			this.hasMate = false;
			this.isBeingChased = false;
			this.timerToTurning = 2;
			this.visionDistance = visionDistance;
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.camouflage = camouflage;
			this.preyListValue = this.speed - this.camouflage / 10 + this.foodValue;
			this.standards = standards;
			this.attractiveness = attractiveness;
			this.aggression = aggression;
			this.standardsForPrey = standardsForPrey;
			this.prey = undefined;
		}
	}
	class Cat {
		constructor(
			posX,
			posY,
			speed,
			maxHunger,
			minHunger,
			isFemale,
			restTime,
			reproductiveRestTime,
			timeAliveUntilReproduction,
			geneMutationChance,
			geneMutationAmount,
			standards,
			attractiveness,
			aggression,
			standardsForPrey
		) {
			this.model = undefined;
			this.isFemale = isFemale;
			this.restTime = restTime;
			this.turning = false;
			this.isLookingForPrey = false;
			this.isHuntingPrey = false;
			this.geneMutationChance = geneMutationChance;
			this.geneMutationAmount = geneMutationAmount;
			this.restingCountdown = this.restTime;
			this.reproductiveRestTime = reproductiveRestTime;
			this.reproductiveRestingCountdown = this.reproductiveRestTime;
			this.isReproductiveResting = false;
			this.timeUntilReproduction = timeAliveUntilReproduction;
			this.timeAliveUntilReproduction = timeAliveUntilReproduction;
			this.maxHunger = maxHunger;
			this.currentHunger = maxHunger;
			this.minHunger = minHunger;
			this.canMove = true;
			this.mate = undefined;
			this.isResting = false;
			this.onReproductiveList = false;
			this.lookingForMate = false;
			this.turningLeft = false;
			this.turnAmount = 1;
			this.hasMate = false;
			this.timerToTurning = 2;
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.standards = standards;
			this.attractiveness = attractiveness;
			this.aggression = aggression;
			this.standardsForPrey = standardsForPrey;
			this.prey = undefined;
		}
	}

	//Functions for things that are used often, but not a part of game function
	function hsv2rgb(h, s, v) {
		let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
		return [f(5), f(3), f(1)];
	}
	function distBtwPoints(xOne, yOne, xTwo, yTwo) {
		return Math.sqrt(Math.pow(xOne - xTwo, 2) + Math.pow(yOne - yTwo, 2));
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
