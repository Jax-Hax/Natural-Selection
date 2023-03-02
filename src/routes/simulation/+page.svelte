<script>
	import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
	let current = 'mouse';
</script>

<body>
	<div class="flexCenter">
		<a href="/simulation/play" id="startButton"><button>Start Simulation</button></a>
	</div>
	controls: wasd or arrows to move, or both to go double times as fast, click to pan, scroll to zoom
	<div id="grid">
		<section>
			<h1>Basic</h1>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">The simulation will stop as soon as a child that is this generation is born.</span>
				</div>
				<p>Generations:</p>
				<input bind:value={$generations} />
			</div>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Amount of mice at the first generation</span>
				</div>
				<p>AmMice:</p>
				<input bind:value={$amMice} />
			</div>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Amount of snakes at the first generation</span>
				</div>
				<p>AmSnakes:</p>
				<input bind:value={$amSnakes} />
			</div>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Amount of cats at the first generation</span>
				</div>
				<p>AmCats:</p>
				<input bind:value={$amCats} />
			</div>
		</section>
		<section>
			<h1>Advanced</h1>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Sets the horizontal size of the simulation</span>
				</div>
				<p>SizeX:</p>
				<input bind:value={$sizeX} />
			</div>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Sets the vertical size of the simulation</span>
				</div>
				<p>SizeY:</p>
				<input bind:value={$sizeY} />
			</div>
			<h3 style="padding-bottom: 0.2em">Genes</h3>
			<button
				class:tab={current != 'mouse'}
				class:selected={current === 'mouse'}
				on:click={() => (current = 'mouse')}>Mouse</button
			>
			<button
				class:tab={current != 'snake'}
				class:selected={current === 'snake'}
				on:click={() => (current = 'snake')}>Snake</button
			>
			<button
				class:tab={current != 'cat'}
				class:selected={current === 'cat'}
				on:click={() => (current = 'cat')}>Cat</button
			>
			{#if current === 'mouse'}
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the speed at which the mouse moves</span>
					</div>
					<p>speed:</p>
					<input bind:value={$sizeX} />
				</div>
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the speed at which the mouse loses hunger.</span>
					</div>
					<p>fatigue:</p>
					<input bind:value={$sizeX} />
				</div>
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">The starting hunger of each new mouse.</span>
					</div>
					<p>maxHunger</p>
					<input bind:value={$sizeX} />
				</div>
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the vertical size of the simulation</span>
					</div>
					<p>sna:</p>
					<input bind:value={$sizeX} />
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top;"
							class="material-symbols-outlined"
						>
							sync
						</span>

						<span class="tooltiptext">Sets the same gene configuration on the other two animals</span>
					</div>
				</div>
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the vertical size of the simulation</span>
					</div>
					<p>sna:</p>
					<input bind:value={$sizeX} />
				</div>
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the vertical size of the simulation</span>
					</div>
					<p>sna:</p>
					<input bind:value={$sizeX} />
				</div>
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the vertical size of the simulation</span>
					</div>
					<p>sna:</p>
					<input bind:value={$sizeX} />
				</div>
			{:else if current === 'snake'}
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the vertical size of the simulation</span>
					</div>
					<p>sna:</p>
					<input bind:value={$sizeX} />
				</div>
			{:else}
				<div class="gridItem">
					<div class="tooltip">
						<span
							style="display: inline-flex; vertical-align: top; font-size: 15px !important;"
							class="material-symbols-outlined"
						>
							help
						</span>

						<span class="tooltiptext">Sets the vertical size of the simulation</span>
					</div>
					<p>ca</p>
					<input bind:value={$sizeX} />
				</div>
			{/if}
		</section>
	</div>
</body>

<style>
	body {
		height: 100%;
	}
	.selected {
		background-color: #fb8500;
		border: none;
		color: white;
		padding: 0.25em 1em;
		border-radius: 7px 7px 0 0;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.7rem;
		border: 1px solid #fb8500;
	}
	.tab {
		background-color: #0077b6;
		border: none;
		color: white;
		padding: 0.25em 1em;
		border-radius: 7px 7px 0 0;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.7rem;
		border: 1px solid #0077b6; /* Green */
	}
	.tab:hover {
		background-color: white; /* Green */
		color: #0077b6;
		border: 1px solid #0077b6; /* Green */
	}
	#startButton:hover {
		background-color: white; /* Green */
		box-shadow: 0 4px;
		color: #0077b6;
		border-radius: 19px;
		transform: translateY(-0.25em);
		transition: transform 0.25s;
		border: -2px solid #0077b6; /* Green */
		border-width: 1px;
		border-style: solid;
	}
	.flexCenter {
		display: flex;
		padding-top: 2em;
		justify-content: center;
	}
	#grid {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.gridItem p {
		display: inline;
	}
	.gridItem {
		padding: 1em;
	}
	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 1em;
		border-radius: 6px;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		top: -5px;
		right: 105%;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
