// Initialize variables

var words = ['APPLE','REGAL','SEVERAL','SPECIAL','FUNNY','REGARDLESS','MANY','LACKLUSTER','GREAT','LENT','INCREDULOUS','WRY','PENNY','HOARD','DRAGON','FRESH','VEGETABLE','WHERE','MANIFOLD','SHORN','INGRATIATE']

var clueWord = words[Math.floor(Math.random()*words.length)];
var clueText = [];
var wrong = 1;

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

$("button").click(function () {
	$("#"+this.innerHTML).attr("disabled",true); // only click once
	var matches = checkLetter(this.innerHTML, clueWord);
	if(matches.length>0) {
		for (i=0;i<matches.length;i++) {
			clueText[matches[i]] = clueWord[matches[i]];
		}
		updateClue(clueText);
		if (clueText.join("") == clueWord){
			$("button").attr("disabled",true);
			$(".title").text("You win!")
		}
	} else {
		wrong++;
		var imagePath = "images/"+wrong+".png";
		$(".drawing").attr("src",imagePath);
		if (wrong >6) {
			$("button").attr("disabled",true);
			$(".clue").text(clueWord);
			$(".title").text("You lose!")
		}
	}
});