import { writable } from 'svelte/store';

export let sizeX = writable(0);
export let sizeY = writable(0);
export let aggressiveness = writable(0);
export let hungerRate = writable(0);
export let maxFitness = writable(0);
