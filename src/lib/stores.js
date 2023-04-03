import { writable } from 'svelte/store';

export let generations = writable(3);
export let amMice = writable(30);
export let amSnakes = writable(30);
export let amCats = writable(30);
export let sizeX = writable(150);
export let sizeY = writable(150);
export let minMiceCamouflage = writable(2);
export let maxMiceCamouflage = writable(50);
export let minMiceSpeed = writable(3);
export let maxMiceSpeed = writable(5);
export let minSnakeCamouflage = writable(2);
export let maxSnakeCamouflage = writable(50);
export let minSnakeSpeed = writable(10);
export let maxSnakeSpeed = writable(11);
export let minCatSpeed = writable(8);
export let maxCatSpeed = writable(8);
//mice genes
export let minMiceMinHunger = writable(5);
export let maxMiceMinHunger = writable(10);
export let minMiceMaxHunger = writable(15);
export let maxMiceMaxHunger = writable(20);
export let minMiceVision = writable(15);
export let maxMiceVision = writable(25);
export let minMiceHungerGainedFromResting = writable(5);
export let maxMiceHungerGainedFromResting = writable(7);
export let minMiceRestTime = writable(1);
export let maxMiceRestTime = writable(1);
export let minMiceReproductiveRestTime = writable(1);
export let maxMiceReproductiveRestTime = writable(1);
export let minMiceTimeAliveUntilReproduction = writable(1);
export let maxMiceTimeAliveUntilReproduction = writable(1);
export let minMiceGeneMutationChance = writable(3);
export let maxMiceGeneMutationChance = writable(5);
export let minMiceGeneMutationAmount = writable(3);
export let maxMiceGeneMutationAmount = writable(5);
export let minMiceAttractiveness = writable(8);
export let maxMiceAttractiveness = writable(10);
export let minMiceStandards = writable(3);
export let maxMiceStandards = writable(5);
export let minMiceFoodValue = writable(5);
export let maxMiceFoodValue = writable(10);
//snake genes
export let minSnakeMinHunger = writable(5);
export let maxSnakeMinHunger = writable(10);
export let minSnakeMaxHunger = writable(15);
export let maxSnakeMaxHunger = writable(20);
export let minSnakeVision = writable(10);
export let maxSnakeVision = writable(20);
export let minSnakeRestTime = writable(1);
export let maxSnakeRestTime = writable(1);
export let minSnakeReproductiveRestTime = writable(1);
export let maxSnakeReproductiveRestTime = writable(1);
export let minSnakeTimeAliveUntilReproduction = writable(1);
export let maxSnakeTimeAliveUntilReproduction = writable(1);
export let minSnakeGeneMutationChance = writable(3);
export let maxSnakeGeneMutationChance = writable(5);
export let minSnakeGeneMutationAmount = writable(3);
export let maxSnakeGeneMutationAmount = writable(5);
export let minSnakeAttractiveness = writable(8);
export let maxSnakeAttractiveness = writable(10);
export let minSnakeStandards = writable(3);
export let maxSnakeStandards = writable(5);
export let minSnakeAggression = writable(3);
export let maxSnakeAggression = writable(5);
export let minSnakePreyStandards = writable(1);
export let maxSnakePreyStandards = writable(1);
export let minSnakeFoodValue = writable(5);
export let maxSnakeFoodValue = writable(10);
//Cat genes
export let minCatMinHunger = writable(3);
export let maxCatMinHunger = writable(5);
export let minCatMaxHunger = writable(10);
export let maxCatMaxHunger = writable(15);
export let minCatRestTime = writable(6);
export let maxCatRestTime = writable(10);
export let minCatReproductiveRestTime = writable(3);
export let maxCatReproductiveRestTime = writable(5);
export let minCatTimeAliveUntilReproduction = writable(3);
export let maxCatTimeAliveUntilReproduction = writable(5);
export let minCatGeneMutationChance = writable(3);
export let maxCatGeneMutationChance = writable(5);
export let minCatGeneMutationAmount = writable(3);
export let maxCatGeneMutationAmount = writable(5);
export let minCatAttractiveness = writable(8);
export let maxCatAttractiveness = writable(10);
export let minCatStandards = writable(3);
export let maxCatStandards = writable(5);
export let minCatAggression = writable(3);
export let maxCatAggression = writable(5);
export let minCatPreyStandards = writable(1);
export let maxCatPreyStandards = writable(1);
