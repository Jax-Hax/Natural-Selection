<body>
	<section id="attentioncatcher">
		<h1>Evolution</h1>
		<p>
			How does it work? The goal of this is to get a hands on experience of how natural selection, and by extension evolution, works. To do that, you are going to be able to watch animals evolve in real time, and control what they do indirectly. Don't like how easy the cats have it? Change their speed to 3, or set the maximum hunger to 10. Click play to select genes, or just use the already selected ones for a good starting environment. If you want to know the behind the scenes of how it all works, go to the "How was this made?" section! Enjoy!
		</p>
		<a href="/simulation"><button> Play </button></a>
		<a href="/howitworks"><button> How was this made? </button></a>
	</section>
</body>

<style>
	body {
		min-height: 100%;
		overflow-x: hidden;
	}
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5vw 2vw 15vw 2vw;
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
		padding-bottom: 2em;
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
