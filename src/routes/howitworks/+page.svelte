<body>
	<section id="attentioncatcher">
		<h1>Development</h1>
		<p>
			This was made as the submission to the AP Computer Science Principles Create Project. I started on Febuary 24th, 2023, and finished on April 14th, 2023.
		</p>
		<h1>How does it work?</h1>
		<p>While I obviously cannot explain everything, as this was a multi-thousand lines of code project (you should check out the source code <a href="https://github.com/Jax-Hax/Natural-Selection">here</a> if you want to learn more), but I will explain most of it as best I can.</p>
		<h2>Starting out</h2>
		<p>To start, you first pick all of the genes you need, this screen was done with <a href="https://github.com/simeydotme/svelte-range-slider-pips">these</a> fantastic sliders, SvelteKit, and a vector image I made to cleanly merge the different genes. Once you enter the game, it will generate the amount of animals you specified, each with random genes between the ranges you set.</p>
		<p>It also adds a GUI on top, so that you can see what your animal is doing at the current time. There were many ways I wanted to expand this, like showing it's hunger on a slider, but my computer froze when I tried to do that, so I decided against it.</p>
		<h2>Logic</h2>
		<p>Every frame, it loops through each animal. Depending on the animal, it can do different things, but most are the same. It can have the following states:</p>
		<ol>
			<li>Hunting: The cats hunt the snakes, which hunt the mice, that eat grass. They look for the prey with the highest food value, that gives them the most hunger back.</li>
			<li>Mating: Each animal will look through it's partners and pick the one that has the attractiveness that is above it's standards.</li>
			<li>Resting: The animals will rest after eating prey and mating, and they sit in place, which is bad if they are being chased by a predator.</li>
			<li>Movement: The animals are just wandering aimlessly, not moving outside of the width and length bounds of the ground.</li>
		</ol>
		<a href="/"><button> Return </button></a>
	</section>
</body>

<style>
	body {
		overflow-x: hidden;
	}
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5vw 2vw 10vw 2vw;
		justify-content: center;
		color: white;
		gap: 1rem;
	}
	#attentioncatcher {
		background: linear-gradient(90deg, #1037a3, #0098fe);
	}
	#attentioncatcher h1 {
		font-size: 3.5rem;
		color: white;
	}
	button:hover {
		background-color: white; /* Green */
		box-shadow: 0 4px;
		color: #0077b6;
		transform: translateY(-0.25em);
		transition: transform 0.25s;
		border: -2px solid #0077b6; /* Green */
		border-width: 1px;
		border-style: solid;
	}
	#attentioncatcher p {
		color: white;
		font-size: 1.5rem;
	}
	li{
		font-size: 1.5rem;
	}
	#attentioncatcher button {
		background-color: #fb8500;
		border: -2px solid #fb8500;
		padding: 0.5em 2.5em;
		font-size: 2em;
	}
	#attentioncatcher button:hover {
		background-color: white; /* Green */
		color: #fb8500;
		border: -2px solid #fb8500; /* Green */
		margin-bottom: -2px;
	}
</style>
