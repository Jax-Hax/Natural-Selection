<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		Engine,
		Scene,
		Color3,
		Color4,
		UniversalCamera,
		Vector3,
		HemisphericLight,
		MeshBuilder,
		StandardMaterial,
		Mesh
	} from '@babylonjs/core';
	import { AdvancedDynamicTexture, Button } from '@babylonjs/gui/2D';
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
	let canvas;
	onMount(() => {
		startGame(canvas);
	});
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
	//gene graph lists
	let mouseCamouflageArr = [];
	function createScene(canvas) {
		engine = new Engine(canvas);
		scene = new Scene(engine);
		scene.clearColor = new Color3(0, 50, 75);
		camera = new UniversalCamera('camera1', new Vector3(0, $sizeY / 4, -$sizeY), scene);
		camera.attachControl(canvas, true);
		camera.checkCollisions = true;
		camera.speed = 1;
		camera.keysUp.push(87); // “w”
		camera.keysDown.push(83); // “s”
		camera.keysLeft.push(65); // “a”
		camera.keysRight.push(68); // “d”
		camera.inputs.addMouseWheel();
		light = new HemisphericLight('light', new Vector3(5, 50, -10), scene);
		light.intensity = 0.8;
		ground = MeshBuilder.CreateGround('ground', {
			height: $sizeY,
			width: $sizeX,
			subdivisions: 1
		});
		const groundColor = new StandardMaterial('groundColor', scene);
		groundColor.diffuseColor = new Color3(0, 0.737, 0.016);
		groundColor.backFaceCulling = false;
		ground.material = groundColor;
		mouseMainModel = MeshBuilder.CreateBox('mouseModel', {
			width: 1,
			height: 0.75,
			depth: 2
		});
		mouseMainModel.registerInstancedBuffer('color', 4);
		mouseMainModel.setEnabled(false);
		snakeMainModel = MeshBuilder.CreateBox('snakeModel', {
			width: 2,
			height: 1.5,
			depth: 7
		});
		snakeMainModel.registerInstancedBuffer('color', 4);
		snakeMainModel.setEnabled(false);
		catMainModel = MeshBuilder.CreateBox('catModel', {
			width: 2,
			height: 1.5,
			depth: 3
		});
		const catColor = new StandardMaterial('catMaterial', scene);
		catColor.diffuseColor = new Color3(0.557, 0.557, 0.557);
		catMainModel.material = catColor;
		catMainModel.setEnabled(false);
		//MAKE GENE ARRAY
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
				randBtwDecimals($minMiceGeneMutationAmount, $maxMiceGeneMutationAmount) / 100,
				randBtwDecimals($minMiceStandards, $maxMiceStandards),
				randBtwDecimals($minMiceAttractiveness, $maxMiceAttractiveness),
				randBtwDecimals($minMiceFoodValue, $maxMiceFoodValue),
				1
			);
			addGenesToChart(mouse, 'mouse');
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
			mouseShape.instancedBuffers.color = new Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			mouse.model = mouseShape;
			createGUI(mouse, i);
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
				randBtwDecimals($minSnakeGeneMutationAmount, $maxSnakeGeneMutationAmount) / 100,
				randBtwDecimals($minSnakeStandards, $maxSnakeStandards),
				randBtwDecimals($minSnakeAttractiveness, $maxSnakeAttractiveness),
				randBtwDecimals($minSnakeFoodValue, $maxSnakeFoodValue),
				randBtwDecimals($minSnakeAggression, $maxSnakeAggression),
				randBtwDecimals($minSnakePreyStandards, $maxSnakePreyStandards),
				1
			);
			addGenesToChart(snake, 'snake');
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
			snakeShape.instancedBuffers.color = new Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			snake.model = snakeShape;
			createGUI(snake, i);
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
				randBtwDecimals($minCatGeneMutationAmount, $maxCatGeneMutationAmount) / 100,
				randBtwDecimals($minCatStandards, $maxCatStandards),
				randBtwDecimals($minCatAttractiveness, $maxCatAttractiveness),
				randBtwDecimals($minCatAggression, $maxCatAggression),
				randBtwDecimals($minCatPreyStandards, $maxCatPreyStandards),
				1
			);
			addGenesToChart(cat, 'cat');
			const catShape = catMainModel.createInstance('cat' + i);
			catShape.position.x = cat.posX;
			catShape.position.y = 0.76;
			catShape.position.z = cat.posY;
			catShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			cat.model = catShape;
			createGUI(cat, i);
			cats.push(cat);
		}
		catIDNum = $amCats;
	}
	function addGenesToChart(animal, animalType) {
		if (animalType == 'mouse') {
			if (mouseCamouflageArr[animal.generation - 1] != undefined) {
				mouseCamouflageArr[animal.generation - 1][0] += 1;
				mouseCamouflageArr[animal.generation - 1][1] += animal.camouflage;
			} else {
				mouseCamouflageArr[animal.generation - 1] = [1, animal.camouflage];
			}
		} else if (animalType == 'snake') {
		} else {
		}
	}
	function convertGeneArraysToData() {
		localStorage.setItem('camouflage', JSON.stringify(mouseCamouflageArr.map(([a, b]) => b / a)));
	}
	function createGUI(animal, i) {
		//init gui
		var plane = MeshBuilder.CreatePlane('plane' + i, { height: 4, width: 4 });
		plane.parent = animal.model;
		plane.position.y = 2;
		plane.billboardMode = Mesh.BILLBOARDMODE_ALL;
		var advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane, 1024, 1024, false);
		//make ui
		var genderButton = Button.CreateSimpleButton('but1', animal.isFemale ? 'Female' : 'Male');
		genderButton.width = 0.5;
		genderButton.height = 0.2;
		genderButton.color = 'white';
		genderButton.fontSize = 100;
		genderButton.background = animal.isFemale ? '#510080' : '#0077b6';
		genderButton.isReadOnly = true;
		genderButton.cornerRadius = 50;
		advancedTexture.addControl(genderButton);
		var stateButton = Button.CreateSimpleButton('but1', 'Wandering');
		stateButton.width = 0.5;
		stateButton.top = '-200px';
		stateButton.height = 0.2;
		stateButton.color = 'white';
		stateButton.fontSize = 100;
		stateButton.background = 'green';
		stateButton.isReadOnly = true;
		stateButton.cornerRadius = 50;
		advancedTexture.addControl(stateButton);
		animal.stateButton = stateButton;
	}
	function checkEachMouse(translation) {
		for (let j = 0; j < mice.length; j++) {
			mouse = mice[j];
			mouse.canMove = true;
			translation.set(0, 0, 0);
			translation.z = deltaTime * mouse.speed;
			if (!mouse.isResting && !mouse.isReproductiveResting) {
				if (mouse.isBeingChased && mouse.predator != null) {
					distanceBtwPoints = distBtwPoints(
						mouse.model.position.x,
						mouse.model.position.z,
						mouse.predator.model.position.x,
						mouse.predator.model.position.z
					);
					if (mouse.visionDistance >= distanceBtwPoints) {
						mouse.canMove = false;
						mouse.model.lookAt(mouse.predator.model.position);
						mouse.model.rotation.y += 3.14;
						mouse.model.locallyTranslate(translation);
						checkWallCollision(mouse);
						if (!mouse.runningState && mouse.stateButton != undefined) {
							mouse.stateButton.textBlock.text = 'Running';
							mouse.stateButton.background = 'red';
							mouse.runningState = true;
						}
					}
				} else if (mouse.lookingForMate) {
					if (mouse.hasMate) {
						if (mouse.mate != null) {
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
								if (mouse.stateButton != undefined) {
									mouse.stateButton.textBlock.text = 'Mating';
									mouse.stateButton.background = '#e09109';
								}
							}
						} else {
							mouse.hasMate = false;
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
									mouse.mate.onReproductiveList = false;
									miceReproductiveList[i].mate = mouse;
									miceReproductiveList.splice(i, 1);
									break;
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
					if (!mouse.isBeingChased && !mouse.isLookingForMate) {
						if (mouse.stateButton != undefined) {
							mouse.stateButton.textBlock.text = 'Wandering';
							mouse.stateButton.background = 'green';
						}
					}
					//movement code
					if (mouse.turning) {
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
				if (mouse.currentHunger < mouse.minHunger && !mouse.isResting) {
					mouse.isResting = true;
				} else {
					mouse.currentHunger -= deltaTime;
				}
			} else if (!mouse.isReproductiveResting) {
				//resting countdown
				if (mouse.stateButton != undefined) {
					mouse.stateButton.textBlock.text = 'Resting';
					mouse.stateButton.background = '#00bd68';
				}
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
				if (mouse.stateButton != undefined) {
					mouse.stateButton.textBlock.text = 'Resting';
					mouse.stateButton.background = '#c30cc9';
				}
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
				if (snake.isBeingChased && snake.predator != null) {
					distanceBtwPoints = distBtwPoints(
						snake.model.position.x,
						snake.model.position.z,
						snake.predator.model.position.x,
						snake.predator.model.position.z
					);
					if (snake.visionDistance >= distanceBtwPoints) {
						snake.canMove = false;
						snake.model.lookAt(snake.predator.model.position);
						snake.model.rotation.y += 3.14;
						snake.model.locallyTranslate(translation);
						checkWallCollision(snake);
						if (!snake.runningState && snake.stateButton != undefined) {
							snake.stateButton.textBlock.text = 'Running';
							snake.stateButton.background = 'red';
							snake.runningState = true;
						}
					}
				} else if (snake.lookingForMate) {
					if (snake.hasMate) {
						snake.canMove = false;
						if (snake.mate != null) {
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
								if (snake.stateButton != undefined) {
									snake.stateButton.textBlock.text = 'Resting';
									snake.stateButton.background = '#c30cc9';
								}
							} else {
								snake.model.lookAt(snake.mate.model.position);
								snake.model.rotation.x = 0;
								snake.model.rotation.z = 0;
								snake.model.locallyTranslate(translation);
								if (snake.stateButton != undefined) {
									snake.stateButton.textBlock.text = 'Mating';
									snake.stateButton.background = '#e09109';
								}
							}
						} else {
							snake.hasMate = false;
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
									snake.mate.onReproductiveList = false;
									if (snake.stateButton != undefined) {
										snake.stateButton.textBlock.text = 'Mating';
										snake.stateButton.background = '#e09109';
									}
									snakesReproductiveList[i].mate = snake;
									snakesReproductiveList.splice(i, 1);
									break;
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
					if (!snake.isBeingChased && !snake.isLookingForMate) {
						if (snake.stateButton != undefined) {
							snake.stateButton.textBlock.text = 'Wandering';
							snake.stateButton.background = 'green';
						}
					}
					if (snake.turning) {
						desiredDirection = (snake.speed / 5) * deltaTime;
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
				if (snake.currentHunger - snake.aggression < snake.minHunger && !snake.isHuntingPrey) {
					snake.isLookingForPrey = true;
				}
				snake.currentHunger -= deltaTime;
				if (snake.isLookingForPrey) {
					for (let i = 0; i < mice.length; i++) {
						if (mice[i].preyListValue >= snake.standardsForPrey && !mice[i].isBeingChased) {
							snake.prey = mice[i];
							snake.isHuntingPrey = true;
							snake.isLookingForPrey = false;
							snake.prey.isBeingChased = true;
							snake.prey.runningState = false;
							snake.prey.predator = snake;
							break;
						}
					}
				}
			} else if (!snake.isReproductiveResting && !snake.isHuntingPrey) {
				//resting countdown
				if (snake.stateButton != undefined) {
					snake.stateButton.textBlock.text = 'Resting';
					snake.stateButton.background = '#00bd68';
				}
				snake.restingCountdown -= deltaTime;
				if (snake.restingCountdown <= 0) {
					snake.restingCountdown = snake.restTime;
					snake.isResting = false;
				}
			} else if (!snake.isHuntingPrey) {
				//reproductive resting
				if (snake.stateButton != undefined) {
					snake.stateButton.textBlock.text = 'Resting';
					snake.stateButton.background = '#c30cc9';
				}
				snake.reproductiveRestingCountdown -= deltaTime;
				if (snake.reproductiveRestingCountdown <= 0) {
					snake.reproductiveRestingCountdown = snake.reproductiveRestTime;
					snake.isReproductiveResting = false;
				}
			} else {
				snake.currentHunger -= deltaTime;
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
					snake.isResting = true;
					snake.prey.model.dispose();
					mice.splice(mice.indexOf(snake.prey), 1);
					snake.prey = null;
					if (snake.currentHunger > snake.maxHunger) {
						snake.currentHunger = snake.maxHunger;
					}
				} else {
					snake.model.lookAt(snake.prey.model.position);
					snake.model.rotation.x = 0;
					snake.model.rotation.z = 0;
					snake.model.locallyTranslate(translation);
					if (snake.stateButton != undefined) {
						snake.stateButton.textBlock.text = 'Hunting';
						snake.stateButton.background = '#0a0063';
					}
				}
			}
			if (snake.currentHunger <= 0) {
				snake.model.dispose();
				snakes.splice(snakes.indexOf(snake), 1); /*
				if (snake.mate != undefined) {
					snake.mate.mate = undefined;
					snake.mate.hasMate = false;
				}
				if(snake.predator != undefined){
					snake.predator.isHuntingPrey = false;
					snake.predator.prey = undefined;
				}*/
				snake = null;
			}
		}
	}
	function checkEachCat(translation) {
		for (let j = 0; j < cats.length; j++) {
			cat = cats[j];
			cat.canMove = true;
			translation.set(0, 0, 0);
			translation.z = deltaTime * cat.speed;
			if (!cat.isResting && !cat.isReproductiveResting && !cat.isHuntingPrey) {
				if (cat.lookingForMate) {
					if (cat.hasMate) {
						cat.canMove = false;
						if (cat.mate != null) {
							if (
								cat.mate.model.position.x <= cat.model.position.x + 1 &&
								cat.mate.model.position.x >= cat.model.position.x - 1 &&
								cat.mate.model.position.z <= cat.model.position.z + 1 &&
								cat.mate.model.position.z >= cat.model.position.z - 1
							) {
								if (cat.isFemale == true) {
									haveChild('cat', cat, cat.mate);
								}
								cat.hasMate = false;
								cat.mate = undefined;
								cat.lookingForMate = false;
								cat.isReproductiveResting = true;
								if (cat.stateButton != undefined) {
									cat.stateButton.textBlock.text = 'Resting';
									cat.stateButton.background = '#c30cc9';
								}
							} else {
								cat.model.lookAt(cat.mate.model.position);
								cat.model.rotation.x = 0;
								cat.model.rotation.z = 0;
								cat.model.locallyTranslate(translation);
								if (cat.stateButton != undefined) {
									cat.stateButton.textBlock.text = 'Mating';
									cat.stateButton.background = '#e09109';
								}
							}
						} else {
							cat.hasMate = false;
						}
					} else {
						//findMate
						if (!cat.isFemale) {
							if (!cat.onReproductiveList) {
								catsReproductiveList.push(cat);
								cat.onReproductiveList = true;
							}
						} else {
							for (let i = 0; i < catsReproductiveList.length; i++) {
								if (catsReproductiveList[i].attractiveness > cat.standards) {
									cat.mate = catsReproductiveList[i];
									cat.hasMate = true;
									cat.mate.hasMate = true;
									cat.mate.onReproductiveList = false;
									if (cat.stateButton != undefined) {
										cat.stateButton.textBlock.text = 'Mating';
										cat.stateButton.background = '#e09109';
									}
									catsReproductiveList[i].mate = cat;
									catsReproductiveList.splice(i, 1);
									break;
								}
							}
						}
					}
				} else {
					cat.timeUntilReproduction -= deltaTime;
					if (cat.timeUntilReproduction <= 0) {
						cat.timeUntilReproduction = cat.timeAliveUntilReproduction;
						cat.lookingForMate = true;
					}
				}
				if (cat.canMove) {
					//movement code
					if (!cat.isBeingChased && !cat.isLookingForMate) {
						if (cat.stateButton != undefined) {
							cat.stateButton.textBlock.text = 'Wandering';
							cat.stateButton.background = 'green';
						}
					}
					if (cat.turning) {
						desiredDirection = (cat.speed / 5) * deltaTime;
						cat.turnAmount -= desiredDirection;
						if (cat.turningLeft) {
							cat.model.rotation.y -= desiredDirection;
						} else {
							cat.model.rotation.y += desiredDirection;
						}
						if (cat.turnAmount < 0) {
							cat.turning = false;
						}
					} else {
						cat.timerToTurning -= deltaTime;
						if (cat.timerToTurning < 0) {
							cat.turning = true;
							cat.timerToTurning = Math.random() * 3;
							cat.turnAmount = Math.random() * 1.57;
							if (Math.random() > 0.5) {
								cat.turningLeft = true;
							} else {
								cat.turningLeft = false;
							}
						}
					}
					cat.model.locallyTranslate(translation);
					checkWallCollision(cat);
					//end movement code
				}
				if (cat.currentHunger - cat.aggression < cat.minHunger && !cat.isHuntingPrey) {
					cat.isLookingForPrey = true;
				}
				cat.currentHunger -= deltaTime;
				if (cat.isLookingForPrey) {
					for (let i = 0; i < snakes.length; i++) {
						if (snakes[i].preyListValue >= cat.standardsForPrey && !snakes[i].isBeingChased) {
							cat.prey = snakes[i];
							cat.isHuntingPrey = true;
							cat.isLookingForPrey = false;
							cat.prey.isBeingChased = true;
							cat.prey.runningState = false;
							cat.prey.predator = cat;
							break;
						}
					}
				}
			} else if (!cat.isReproductiveResting && !cat.isHuntingPrey) {
				//resting countdown
				if (cat.stateButton != undefined) {
					cat.stateButton.textBlock.text = 'Resting';
					cat.stateButton.background = '#00bd68';
				}
				cat.restingCountdown -= deltaTime;
				if (cat.restingCountdown <= 0) {
					cat.restingCountdown = cat.restTime;
					cat.isResting = false;
				}
			} else if (!cat.isHuntingPrey) {
				//reproductive resting
				if (cat.stateButton != undefined) {
					cat.stateButton.textBlock.text = 'Resting';
					cat.stateButton.background = '#c30cc9';
				}
				cat.reproductiveRestingCountdown -= deltaTime;
				if (cat.reproductiveRestingCountdown <= 0) {
					cat.reproductiveRestingCountdown = cat.reproductiveRestTime;
					cat.isReproductiveResting = false;
				}
			} else {
				cat.currentHunger -= deltaTime;
				//hunting prey
				console.log('hunting prey');
				if (
					cat.prey.model.position.x <= cat.model.position.x + 1 &&
					cat.prey.model.position.x >= cat.model.position.x - 1 &&
					cat.prey.model.position.z <= cat.model.position.z + 1 &&
					cat.prey.model.position.z >= cat.model.position.z - 1
				) {
					//eat prey
					cat.currentHunger += cat.prey.foodValue;
					cat.isHuntingPrey = false;
					cat.isResting = true;
					cat.prey.model.dispose();
					snakes.splice(snakes.indexOf(cat.prey), 1);
					cat.prey = null;
					if (cat.currentHunger > cat.maxHunger) {
						cat.currentHunger = cat.maxHunger;
					}
				} else {
					cat.model.lookAt(cat.prey.model.position);
					cat.model.rotation.x = 0;
					cat.model.rotation.z = 0;
					if (cat.stateButton != undefined) {
						cat.stateButton.textBlock.text = 'Hunting';
						cat.stateButton.background = '#0a0063';
					}
					cat.model.locallyTranslate(translation);
				}
			}
			if (cat.currentHunger <= 0) {
				cat.model.dispose();
				cats.splice(cats.indexOf(cat), 1);
				cat = null;
			}
		}
	}
	function checkWallCollision(animal) {
		if (animal.model.position.x > $sizeX / 2) {
			animal.model.position.x = $sizeX / 2;
			if (!animal.isBeingChased) {
				animal.model.rotation.y = 4.71 + randBtwDecimals(-0.5, 0.5);
			}
		} else if (animal.model.position.x < -$sizeX / 2) {
			animal.model.position.x = -$sizeX / 2;
			if (!animal.isBeingChased) {
				animal.model.rotation.y = 1.57 + randBtwDecimals(-0.5, 0.5);
			}
		}
		if (animal.model.position.z > $sizeY / 2) {
			animal.model.position.z = $sizeY / 2;
			if (!animal.isBeingChased) {
				animal.model.rotation.y = 3.14 + randBtwDecimals(-0.5, 0.5);
			}
		} else if (animal.model.position.z < -$sizeY / 2) {
			animal.model.position.z = -$sizeY / 2;
			if (!animal.isBeingChased) {
				animal.model.rotation.y = randBtwDecimals(-0.5, 0.5);
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
				childGeneCalculator(female.foodValue, male.foodValue, female, male),
				female.generation > male.generation ? female.generation + 1 : male.generation + 1
			);
			addGenesToChart(mouse, 'mouse');
			if (mouse.generation > $generations) {
				gameEnd();
			}
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
			mouseShape.instancedBuffers.color = new Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			mouse.model = mouseShape;
			createGUI(mouse, miceIDNum);
			mice.push(mouse);
		} else if (childType == 'snake') {
			let snake = new Snake(
				female.model.position.x,
				female.model.position.z,
				childGeneCalculator(female.speed, male.speed, female, male),
				childGeneCalculator(female.camouflage, male.camouflage, female, male),
				childGeneCalculator(female.visionDistance, male.visionDistance, female, male),
				childGeneCalculator(female.maxHunger, male.maxHunger, female, male),
				childGeneCalculator(female.minHunger, male.minHunger, female, male),
				Math.random() < 0.5,
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
				childGeneCalculator(female.foodValue, male.foodValue, female, male),
				childGeneCalculator(female.aggression, male.aggression, female, male),
				childGeneCalculator(female.standardsForPrey, male.standardsForPrey, female, male),
				female.generation > male.generation ? female.generation + 1 : male.generation + 1
			);
			addGenesToChart(snake, 'snake');
			if (snake.generation > $generations) {
				gameEnd();
			}
			const snakeShape = snakeMainModel.createInstance('snake' + snakeIDNum);
			snakeShape.position.x = snake.posX;
			snakeShape.position.y = 0.76;
			snakeShape.position.z = snake.posY;
			snakeIDNum++;
			snakeShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			//randomly changes the ground value by a certain amount using hsv, then converts to rgb
			var camouflageColor;
			if (Math.random() >= 0.5) {
				camouflageColor = hsv2rgb(121.29 - snake.camouflage * 2, 1, 0.73);
			} else {
				camouflageColor = hsv2rgb(121.29 + snake.camouflage * 2, 1, 0.73);
			}
			snakeShape.instancedBuffers.color = new Color4(
				camouflageColor[0],
				camouflageColor[1],
				camouflageColor[2],
				1
			);
			snake.model = snakeShape;
			createGUI(snake, snakeIDNum);
			snakes.push(snake);
		} else {
			//cat
			let cat = new Cat(
				female.model.position.x,
				female.model.position.z,
				childGeneCalculator(female.speed, male.speed, female, male),
				childGeneCalculator(female.maxHunger, male.maxHunger, female, male),
				childGeneCalculator(female.minHunger, male.minHunger, female, male),
				Math.random() < 0.5,
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
				childGeneCalculator(female.aggression, male.aggression, female, male),
				childGeneCalculator(female.standardsForPrey, male.standardsForPrey, female, male),
				female.generation > male.generation ? female.generation + 1 : male.generation + 1
			);
			addGenesToChart(cat, 'cat');
			if (cat.generation > $generations) {
				gameEnd();
			}
			const catShape = catMainModel.createInstance('cat' + catIDNum);
			catShape.position.x = cat.posX;
			catIDNum++;
			catShape.position.y = 0.76;
			catShape.position.z = cat.posY;
			catShape.rotation.y = randBtwDecimals(-3.14, 3.14);
			cat.model = catShape;
			createGUI(cat, catIDNum);
			cats.push(cat);
		}
	}
	function gameEnd() {
		convertGeneArraysToData();
		window.location.href = '/simulation/end';
	}
	function childGeneCalculator(gene1, gene2, female, male) {
		const startGene = randBtwDecimals(gene1, gene2);
		if (Math.random() > 0.5) {
			return (
				startGene +
				(Math.random() > randBtwDecimals(female.geneMutationChance, male.geneMutationChance)
					? randBtwDecimals(female.geneMutationAmount, male.geneMutationAmount) * startGene
					: 0)
			);
		} else {
			const num =
				startGene -
				(Math.random() > randBtwDecimals(female.geneMutationChance, male.geneMutationChance)
					? randBtwDecimals(female.geneMutationAmount, male.geneMutationAmount) * startGene
					: 0);
			if (num > 0) {
				return num;
			} else {
				return startGene;
			}
		}
	}
	function gameLoop(canvas) {
		createScene(canvas);
		makeFirstGeneration();
		const translation = new Vector3(0, 0, 0);
		var renderLoop = function () {
			deltaTime = scene.deltaTime ? scene.deltaTime / 1000 : 0;
			checkEachMouse(translation);
			checkEachSnake(translation);
			checkEachCat(translation);
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
			foodValue,
			generation
		) {
			this.generation = generation;
			this.model = undefined;
			this.stateButton = undefined;
			this.foodValue = foodValue;
			this.isFemale = isFemale;
			this.restTime = restTime;
			this.turning = false;
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
			this.runningState = false;
			this.speed = speed;
			this.camouflage = camouflage;
			this.preyListValue = this.speed - this.camouflage / 20 + this.foodValue;
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
			standardsForPrey,
			generation
		) {
			this.generation = generation;
			this.model = undefined;
			this.runningState = false;
			this.stateButton = undefined;
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
			this.preyListValue = this.speed - this.camouflage / 20 + this.foodValue;
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
			standardsForPrey,
			generation
		) {
			this.generation = generation;
			this.model = undefined;
			this.stateButton = undefined;
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
		bind:this={canvas}
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
