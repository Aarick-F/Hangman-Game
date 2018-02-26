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
			guessedLetters = ""
			game = true;

	document.getElementById("displayBoard").innerText = "Oh S#@^! A shark is chasing you! Luckily for you, guessing the word a shark is thinking of paralyzes them! Guess the word!";
	document.getElementById("displayBoard").style.animation = "none";
	document.body.style.backgroundColor = "#FFF";
	document.getElementById("lettersGuessed").innerText = " ";
	document.getElementById("sprites").style.justifyContent = "space-between";
	document.getElementById("swimmer").style.opacity = "1";
	document.getElementById("shark").style.animation = "wave 1s linear infinite";
	document.getElementById("shark").style.marginLeft = "0px";
	document.getElementById("shark").style.transform = "scaleY(1)";
	picked = words[Math.floor(Math.random() * words.length)];

	for(let i = 0; i < picked.length; i++) {
		dashes.push("-");
		wordArray.push(picked[i]);
	}
	guesses = 9;
	document.getElementById("guessesLeft").innerText = guesses;
	document.getElementById("word").innerText = dashes.join("");
	// For cheaters :]
	console.log(picked);
	document.onkeyup = function(event) {
		if(event.keyCode >= 65 && event.keyCode <= 90) {
			let key = event.key.toUpperCase();
			for(let i = 0; i < wordArray.length; i++) {
				if(wordArray[i] === key && game === true) {
					dashes[i] = key;
					console.log(wordArray);
					document.getElementById("word").innerText = dashes.join("");
					if(dashes.indexOf("-") === -1) {
						// WIN CONDITION!
						win();
					}
				}
			}
			if(wordArray.indexOf(key) === -1 && game === true) {
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
						lose();
					}
				}
			}
		}
	}
}

function win() {
	wins++;
	game = false;
	document.getElementById("displayBoard").innerText = "Amazing! You stunned the shark and escaped! Click here to play again!";
	document.getElementById("displayBoard").style.animation = "wave 1s linear infinite";
	document.getElementById("shark").style.animation = "none";
	document.getElementById("shark").style.transform = "scaleY(-1)";
	document.getElementById("displayBoard").style.cursor = "pointer";
	document.getElementById("numWins").innerText = wins;
	document.body.style.backgroundColor = "#2F2";
	document.getElementById("displayBoard").addEventListener("click", function() {
		init();
	});
}

function lose() {
	losses++;
	game = false;
	document.getElementById("displayBoard").innerText = "Oh no! Looks like you got got. Click here to clean up the blood and try again.";
	document.getElementById("displayBoard").style.cursor = "pointer";
	document.getElementById("displayBoard").style.animation = "wave 1s linear infinite";
	document.getElementById("swimmer").style.opacity = "0";
	document.getElementById("shark").style.marginLeft = "80px";
	document.getElementById("shark").style.animation = "wave 0.1s linear infinite";
	document.body.style.backgroundColor = "#F22";
	document.getElementById("numLosses").innerText = losses;
	document.getElementById("displayBoard").addEventListener("click", function() {
		init();
	});
}