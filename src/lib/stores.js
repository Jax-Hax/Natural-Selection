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