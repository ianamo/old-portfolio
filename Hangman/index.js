// Initialize variables

var words = ['APPLE','REGAL','SEVERAL','SPECIAL','FUNNY','REGARDLESS','MANY','LACKLUSTER','GREAT','LENT','INCREDULOUS','WRY','PENNY','HOARD','DRAGON','FRESH','VEGETABLE','WHERE','MANIFOLD','SHORN','INGRATIATE']

var clueWord = words[Math.floor(Math.random()*words.length)];
var clueText = [];
var guessedLetters = []; // keep track of letters already used
var wrong = 1;
var gameOver = false;

for (var i = 0; i<clueWord.length; i++) {
	clueText.push("_");
}

// Functions

function checkLetter (char, wordArray) {
	var positions = [];
	for (var i=0;i<wordArray.length;i++) {
		if (wordArray[i] == char) {
			positions.push(i);
		}
	}
	return positions;
}

function updateClue(textArray) {
	$(".clue").text(textArray.join(""));	
}

// Game loop

updateClue(clueText);

if (gameOver == false){
	$(".key").click(function () {
		var letter = this.innerHTML;
		if (!(guessedLetters.includes(letter))) {
			guessedLetters.push(letter);
			console.log(guessedLetters)
			this.classList.add("disabled"); // only click once
			
			var matches = checkLetter(letter, clueWord);
			if(matches.length>0) {
				for (var i=0;i<matches.length;i++) {
					clueText[matches[i]] = clueWord[matches[i]];
				}
				if (clueText.join("") == clueWord){
					$(".key").addClass("disabled");
					$(".title").text("You win!")
					gameOver = true;
				}
				updateClue(clueText);
			} else {
				wrong++;
				var imagePath = "images/"+wrong+".png";
				$(".drawing").attr("src",imagePath);
				if (wrong >6) {
					$(".key").addClass("disabled");
					$(".clue").text(clueWord);
					$(".title").text("You lose!")
					gameOver = true;
				}
			}
		}
	});}