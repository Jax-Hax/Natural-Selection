import { writable } from 'svelte/store';

export let generations = writable(10);
export let amMice = writable(10);
export let amSnakes = writable(10);
export let amCats = writable(10);
export let sizeX = writable(100);
export let sizeY = writable(100);
//export let aggressiveness = writable(0);
//export let hungerRate = writable(0);
//export let maxFitness = writable(0);
export let minMiceCamouflage = writable(2);
export let maxMiceCamouflage = writable(50);
export let minMiceSpeed = writable(3);
export let maxMiceSpeed = writable(5);
export let minMiceVision = writable(10);
export let maxMiceVision = writable(20);
export let minSnakeCamouflage = writable(2);
export let maxSnakeCamouflage = writable(50);
export let minSnakeSpeed = writable(3);
export let maxSnakeSpeed = writable(5);
export let minCatSpeed = writable(3);
export let maxCatSpeed = writable(5);
export let minMiceMinHunger = writable(3);
export let maxMiceMinHunger = writable(7);
export let minMiceMaxHunger = writable(20);
export let maxMiceMaxHunger = writable(50);
