<script>
	import { sizeX } from '$lib/stores.js';
</script>

<body>
    <div class="flexCenter">
	<a href="/simulation/play"><button >Start Simulation</button></a>
</div>
	<div id="grid">
		<section>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex;
        vertical-align: top; font-size: 15px !important;"
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
						style="display: inline-flex;
        vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Sets the vertical size of the simulation</span>
				</div>
				<p>SizeY:</p>
				<input bind:value={$sizeX} />
			</div>
            
		</section>
		<section>
			<div class="gridItem">
				<div class="tooltip">
					<span
						style="display: inline-flex;
        vertical-align: top; font-size: 15px !important;"
						class="material-symbols-outlined"
					>
						help
					</span>

					<span class="tooltiptext">Tooltip text</span>
				</div>
				<p>SizeX:</p>
				<input bind:value={$sizeX} />
			</div>
		</section>
	</div>
</body>

<style>
	body {
		height: 100%;
	}
    .flexCenter{
        display: flex;
        padding-top: 2em;
        justify-content: center;
    }
	#grid {
		display: flex;
		align-items: center;
		justify-content: center;
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
		padding: 5px 0;
		border-radius: 6px;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		width: 120px;
		bottom: 100%;
		left: 50%;
		margin-left: -60px;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
