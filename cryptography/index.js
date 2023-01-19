// variables

var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var spacing = 0; // counter to ensure space is inserted every five characters
var decode = false;

// functions

function getIndex (c, str) {
	var indices = [];
	for (var i = 0; i<str.length;i++){
		if (c == str[i]){
			return i;
		}
	}
	return false;
}

function encodeRot13 (str) {
	crypText = []
	for (i=0;i<str.length;i++){
		index = getIndex(str[i],alpha);
		index += 13;
		if (index >25) {
			index -= 26;
		}
		crypText.push(alpha[index]);
	}
	return crypText.join("");
}

function decodeRot13 (str){
	crypText = []
	for (var i=0;i<str.length;i++){
		index = getIndex(str[i],alpha);
		index -= 13;
		if (index <0) {
			index += 26;
		}
		crypText.push(alpha[index]);
	}
	return crypText.join("");
}

function toAlphaUpcase(str) { // strip everything but letters, turn letters upper case
	var output = [];
	for (var i=0;i<str.length;i++) {
		if (alpha.includes(str[i].toUpperCase())) {
			output.push(str[i].toUpperCase());
		}
	}
	return output.join("");
}

function addSpace (str, n){ // adds a space at intervals of n
	var newText = [];
	for (var i =0; i<str.length;i++) {
		newText.push(str[i]);
		if ((i+1)%n==0){
			newText.push(" ");
		}
	}
	return newText.join("");

}

// website interface

$('.decode-toggle').click(function() {
	decode = !decode;
	spacing = 0; // reset count
	var str = $('.display-text').text();
	if (decode == false) {
		$('.display-text').text(addSpace(encodeRot13(toAlphaUpcase(str)),5));
	} else {
		$('.display-text').text(addSpace(decodeRot13(toAlphaUpcase(str)),5));
	}
	//this.classList.toggle("toggle-press");
	$('.label').toggleClass("toggle-press");
})

$(".letter-button").click(function () {
	if (decode==false){
		if (spacing ==0) {
			$(".display-text").text(encodeRot13(this.innerHTML));
			spacing++;
		} else {
			$(".display-text").append(encodeRot13(this.innerHTML));
			spacing++;
			if (spacing%5==0) {
				$(".display-text").append(" ");
			}
		}
	} else {
		if (spacing ==0) {
			$(".display-text").text(decodeRot13(this.innerHTML));
			spacing++;
		} else {
			$(".display-text").append(decodeRot13(this.innerHTML));
			spacing++;
			if (spacing%5==0) {
				$(".display-text").append(" ");
			}
		}

	}

});

$(".copy").click(function() {
	navigator.clipboard.writeText($(".display-text").text());
	this.classList.toggle("toggle-press");
	setTimeout(() => {this.classList.toggle("toggle-press");},"100");
	$('.display-text').text("TEXT COPIED");
});

$(".paste").click(function() {
	spacing=0;
	if (decode==false){
		var text = prompt("Enter text to be encoded/decoded...")
		text = encodeRot13(toAlphaUpcase(text));
		$('.display-text').text(addSpace(text,5));
	}
	else {
		var text = prompt("Enter text to be encoded/decoded...")
		text = encodeRot13(toAlphaUpcase(text));
		$('.display-text').text(addSpace(text,5));
	}

});

$(".clr-btn").click(function() {$('.display-text').text(""); spacing=0;});

$(document).keydown(function (event) {
	if (alpha.includes(event.key.toUpperCase())) {
		var myKey = event.key;
		myKey = myKey.toUpperCase();
		$("#"+myKey).toggleClass('toggle-press');
		setTimeout(() => {$('#'+myKey).toggleClass('toggle-press');},"100");
		if (decode==false){
			if (spacing ==0) {
				$(".display-text").text(encodeRot13(myKey));
				spacing++;
			} else {
				$(".display-text").append(encodeRot13(myKey));
				spacing++;
				if (spacing%5==0) {
					$(".display-text").append(" ");
				}
			}
		} else {
			if (spacing ==0) {
				$(".display-text").text(decodeRot13(myKey));
				spacing++;
			} else {
				$(".display-text").append(decodeRot13(myKey));
				spacing++;
				if (spacing%5==0) {
					$(".display-text").append(" ");
				}
			}

		}
	}
});

