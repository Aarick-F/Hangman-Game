// Firstly, I need words that a shark might be thinking about.
const words = ["SNACK", "DINNER", "LUNCH", "MORSEL", "CHOMP",
							"TASTE", "CHASE", "DELICIOUS", "SCRUMPTIOUS", 
							"CRUNCH", "LUNCHEON", "MUNCH", "NIBBLE", "BITE",
							"SALTY", "GNAW", "GNASH", "THRASH", "HUNT",
							"TEETH", "SHRED", "DIVE", "FLOAT", "SPLASH",
							"APPETITE", "RAGE", "HUNGRY", "STARVING",
							"FAMISHED", "PECKISH", "BLOOD"];

const winMessage = "Amazing! You stunned the shark and escaped! Click here to play again!";
const loseMessage = "Oh no! Looks like you got got. Click here to clean up the blood and try again.";
const blood = "#F22";
const algae = "#2F2";

let wins = 0,
		losses = 0;

init();

function init() {
	let picked = "",
			guesses = 9,
			dashes = [],
			wordArray = [],
			guessedLetters = "",
			game = true;
	
	reset();
	picked = words[Math.floor(Math.random() * words.length)];

	for(let i = 0; i < picked.length; i++) {
		dashes.push("-");
		wordArray.push(picked[i]);
	}
	guesses = 9;
	document.getElementById("guessesLeft").innerText = guesses;
	document.getElementById("word").innerText = dashes.join("");
	// For cheaters :]
	console.log(picked + " --Shame on you. Didn't you know shark telepathy is super illegal?");
	document.onkeyup = function(event) {
		if(event.keyCode >= 65 && event.keyCode <= 90) {
			let key = event.key.toUpperCase();
			for(let i = 0; i < wordArray.length; i++) {
				if(wordArray[i] === key && game === true) {
					dashes[i] = key;
					document.getElementById("word").innerText = dashes.join("");
					if(dashes.indexOf("-") === -1) {
						// WIN CONDITION!
						gameOver(true, winMessage, algae);
					}
				}
			}
			if(wordArray.indexOf(key) === -1 && game === true) {
				let playerGuesses = document.getElementById("lettersGuessed").innerText;
				if(playerGuesses.indexOf(key) === -1) {
					document.getElementById("lettersGuessed").innerText += key
					if(guesses > 0) {
						guesses--;
						document.getElementById("guessesLeft").innerText = guesses;
						if(guesses <= 6) {
							document.getElementById("sprites").style.justifyContent = "space-around";
						}
						if(guesses <= 3) {
							document.getElementById("sprites").style.justifyContent = "center";
							document.getElementById("swimmer").style.animation = "wave 0.2s linear infinite";
						}
						if(guesses === 0) {
							// LOSE CONDITION!
							gameOver(false, loseMessage, blood);
						}
					}
				}
			}
		}
	}
}

function gameOver(end, message, color) {
	game = false;
	if(end) {
		wins++;
		document.getElementById("numWins").innerText = wins;
		document.getElementById("shark").style.animation = "none";
		document.getElementById("shark").style.transform = "scaleY(-1)";
		document.getElementById("numWins").innerText = wins;
	} else {
		losses++;
		document.getElementById("swimmer").style.opacity = "0";
		document.getElementById("shark").style.marginLeft = "80px";
		document.getElementById("shark").style.animation = "wave 0.1s linear infinite";
		document.getElementById("numLosses").innerText = losses;
	}
	document.body.style.backgroundColor = color;
	document.getElementById("displayBoard").innerText = message;
	document.getElementById("displayBoard").style.animation = "wave 1s linear infinite";
}

function reset() {
	document.body.style.backgroundColor = "#FFF";
	document.getElementById("displayBoard").innerText = "Oh S#@^! A shark is chasing you! Luckily for you, guessing the word a shark is thinking of paralyzes them! Guess the word!";
	document.getElementById("displayBoard").style.animation = "none";
	document.getElementById("displayBoard").addEventListener("click", init);
	document.getElementById("lettersGuessed").innerText = " ";
	document.getElementById("sprites").style.justifyContent = "space-between";
	document.getElementById("swimmer").style.opacity = "1";
	document.getElementById("swimmer").style.animation = "wave 1.5s linear infinite";
	document.getElementById("shark").style.animation = "wave 1s linear infinite";
	document.getElementById("shark").style.marginLeft = "0px";
	document.getElementById("shark").style.transform = "scaleY(1)";
}