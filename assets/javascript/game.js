// Firstly, I need words that a shark might be thinking about.
const words = ["SNACK", "DINNER", "LUNCH", "MORSEL", "CHOMP",
							"TASTE", "CHASE", "DELICIOUS", "SCRUMPTIOUS", 
							"CRUNCH", "LUNCHEON", "MUNCH", "NIBBLE", "BITE",
							"SALTY", "GNAW", "GNASH", "THRASH", "HUNT"];

// Now, I need to have a word picked from that array of words
// and have the screen update to show the length of the word in dashes
// -------------------------------------------------------------------

let thought = getWord(),
		guesses = 9,
		wins = 0,
		losses = 0,
		guessedLetters = " ";

updateBoard(thought, wins, losses, guesses, guessedLetters);

// Great, now that those are working, time to listen for input 
// Any time a key is pressed, things in this function will run.
document.onkeyup = function(event) {
	let key = event.key.toUpperCase();
	if(thought.indexOf(key) === -1) {
		if(guesses > 0) {
			guesses--;
			if(guesses <= 6) {
				document.getElementById("sprites").style.justifyContent = "space-around";
			}
			if(guesses <= 3) {
				document.getElementById("sprites").style.justifyContent = "center";
			}
			if(guesses === 0) {
				document.getElementById("swimmer").style.opacity = "0";
				document.body.style.backgroundColor = "#F22";
				updateBoard(thought, wins, losses, guesses, key);
			}
			updateBoard(thought, wins, losses, guesses, key);
		}
	}
}

// Function definitions below
// ----------------------------------------------------------------

function getWord() {
	let pickedWord = words[Math.floor(Math.random() * words.length)];
	return pickedWord;
}

function updateBoard(word, w, l, g, letter) {
	let hiddenWord = "";
	for(let i = 0; i < word.length; i++) {
		hiddenWord += "-";
	}
	document.getElementById("word").innerText = hiddenWord;
	document.getElementById("numWins").innerText = w;
	document.getElementById("numLosses").innerText = l;
	document.getElementById("guessesLeft").innerText = g;
	document.getElementById("lettersGuessed").innerText += letter;
	console.log(hiddenWord);
}