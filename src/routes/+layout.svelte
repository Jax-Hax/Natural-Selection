<html lang="en">
	<style>
		* {
			margin: 0;
			padding: 0;
			font-family: 'Arsenal', sans-serif;
		}
		
		h1,
		h2,
		button {
			font-family: 'Open Sans', sans-serif;
		}
		button {
		background-color: #0077b6;
		border: none;
		color: white;
		padding: 0.75em 2em;
		border-radius: 19px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1rem;
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
		h1{
			font-size: 3.5rem;
		letter-spacing: -3px;
		}
		</style>
</html>
<slot />
