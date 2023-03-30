<body>
	<section id="attentioncatcher">
		<h1>Behind the scenes</h1>
		<h2>Development</h2>
		<p>
			This was made as part of the first Svelte Hackathon in about a month. I am a high school student, so I had to spend time in between homework and classes to work on it, which left me struggling to finish until the very end. I also realized that I would be out of town for the last week about 3 days before, so I needed to pick up the pace by a lot. Luckily, as you can tell, I finished and was able to submit on time. I just want to point out a few things as to explain the development process.
		</p>
		<h2>Why didn't you add XYZ?</h2>
		<p>There are two reasons for this, time and optimization. Either it made the game too laggy, which is a major concern when you are running dozens of fully simulated animals, or I just didn't have enough time to do it. There are a few things I wish I could've added, like more animals, better terrain (maybe even some sort of noise map for interesting generation), and more genes, but I just didn't have the time with only a couple weeks to do it.</p>
		<h1>How does it work?</h1>
		<p>Ok, on to the brains of the operation. I obviously cannot explain everything, as this was a multi-thousand lines of code project, so you should check out the source code <a href="https://github.com/Jax-Hax/Natural-Selection">here,</a> but I will explain most of it as best I can.</p>
		<h2>Starting out</h2>
		<p>To start, you first pick all of the genes you need, this screen was done with <a href="https://github.com/simeydotme/svelte-range-slider-pips">these</a> fantastic sliders, SvelteKit, and a vector image to cleanly merge the different genes. Once you enter the game, it will generate the amount of animals you specified, each with random genes between the ranges you set.</p>
		<p>It also adds a GUI on top, so that you can see what your animal is doing at the current time. There were many ways I wanted to expand this, like showing it's hunger on a slider, but my comptuer froze when I tried to do that, so I decided against it.</p>
		<h2>Logic</h2>
		<p>Every frame, it loops through each animal. Depending on the animal, it can do different things, but most are the same. It can have the following states:</p>
		<ol>
			<li>asd</li>
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
