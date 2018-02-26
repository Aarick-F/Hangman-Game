// Firstly, I need words that a shark might be thinking about.
const words = ["SNACK", "DINNER", "LUNCH", "MORSEL", "CHOMP",
							"TASTE", "CHASE", "DELICIOUS", "SCRUMPTIOUS", 
							"CRUNCH", "LUNCHEON", "MUNCH", "NIBBLE", "BITE",
							"SALTY", "GNAW", "GNASH", "THRASH", "HUNT"];

let wins = 0,
		losses = 0;

init();

function init() {
	let picked = "",
		guesses = 9,
		dashes = [],
		wordArray = [],
		guessedLetters = "";
	document.getElementById("displayBoard").innerText = "Oh S#@^! A shark is chasing you! Luckily for you, guessing the word a shark is thinking of paralyzes them! Guess the word!";
	document.body.style.backgroundColor = "#FFF";
	document.getElementById("lettersGuessed").innerText = " ";
	document.getElementById("sprites").style.justifyContent = "space-between";
	document.getElementById("swimmer").style.opacity = "1";
	document.getElementById("shark").style.marginLeft = "0px";
	picked = words[Math.floor(Math.random() * words.length)];

	for(let i = 0; i < picked.length; i++) {
		dashes.push("-");
		wordArray.push(picked[i]);
	}
	guesses = 9;
	document.getElementById("guessesLeft").innerText = guesses;
	document.getElementById("word").innerText = dashes.join("");
	console.log(picked);
	console.log(wordArray);

	let foundLetters = [];

	document.onkeyup = function(event) {
		let key = event.key.toUpperCase();
		for(let i = 0; i < wordArray.length; i++) {
			if(wordArray[i] === key) {
				foundLetters.push(i);
				dashes[i] = key;
				console.log(wordArray);
				console.log(foundLetters);
				document.getElementById("word").innerText = dashes.join("");
				if(foundLetters.length === wordArray.length) {
					// WIN CONDITION!
					wins++;
					document.getElementById("displayBoard").innerText = "Amazing! You stunned the shark and escaped! Click here to play again!";
					document.getElementById("displayBoard").style.cursor = "pointer";
					document.getElementById("numWins").innerText = wins;
					document.body.style.backgroundColor = "#2F2";
					document.getElementById("displayBoard").addEventListener("click", function() {
						init();
					});
				}
			}
		}
		if(wordArray.indexOf(key) === -1) {
			document.getElementById("lettersGuessed").innerText += key
			if(guesses > 0) {
				guesses--;
					document.getElementById("guessesLeft").innerText = guesses;
				if(guesses <= 6) {
					document.getElementById("sprites").style.justifyContent = "space-around";
				}
				if(guesses <= 3) {
					document.getElementById("sprites").style.justifyContent = "center";
				}
				if(guesses === 0) {
					// LOSE CONDITION!
					losses++;
					document.getElementById("displayBoard").innerText = "Oh no! Looks like you got got. Click here to clean up the blood and try again.";
					document.getElementById("displayBoard").style.cursor = "pointer";
					document.getElementById("swimmer").style.opacity = "0";
					document.getElementById("shark").style.marginLeft = "80px";
					document.body.style.backgroundColor = "#F22";
					document.getElementById("displayBoard").addEventListener("click", function() {
						init();
					});
				}
			}
		}
		console.log(foundLetters);
	}
}