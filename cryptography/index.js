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

function encodeRot13 (char) {
	index = getIndex(char,alpha);
	index += 13;
	if (index >25) {
		index -= 26;
	}
	return alpha[index];
}

function decodeRot13 (char){
	index = getIndex(char,alpha);
	index -= 13;
	if (index <0) {
		index += 26;
	}
	return alpha[index];
}

function toAlpha(str) { // strip everything but letters
	var output = [];
	for (i=0;i<str.length;i++) {
		if (alpha.includes(str[i].toUpperCase())) {
			output.push(str[i]);
		}
	}
	return output.join("");
}

// website interface

$('.decode-toggle').click(function() {
	decode = !decode;
	spacing = 0; // reset count
	$('.display-text').text("CRYPTO TEXT...");
	this.classList.toggle("toggle-press");
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
	var text = toAlpha(prompt("Text to be encoded/decoded: "));
	$('.display-text').text("");
	if (decode == false){
		for (var i =0;i<text.length;i++){
			$('.display-text').append(encodeRot13(text[i].toUpperCase()));
			if ((i+1)%5==0){
				$('.display-text').append(" ");
			}
		}
	} else {
		for (var i =0;i<text.length;i++){
			$('.display-text').append(decodeRot13(text[i].toUpperCase()));
			if ((i+1)%5==0){
				$('.display-text').append(" ");
			}
		}
	}

});

