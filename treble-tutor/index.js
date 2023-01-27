var showNote = false;
var lastNote = null;

$('.key').click(function () 
	{ 
		if (this.value == 'c' && lastNote != 'c-note') {
			$('.note-line').toggleClass('hide');
		} else if (this.value != 'c' && lastNote == 'c-note') {
			$('.note-line').toggleClass('hide');	
		}

		if (showNote == false) {
			$('.note').toggleClass("hide");
			showNote = true;
		}
		if (lastNote == null) {
			lastNote = this.value + '-note';
			$('.note').toggleClass(this.value+'-note');
			var note = new Audio("sounds/"+this.value+'-note.mp3');
			note.play();
		} else {
			$('.note').toggleClass(lastNote);
			$('.note').toggleClass(this.value+'-note');
			note = new Audio("sounds/"+this.value+'-note.mp3');
			note.play();
			lastNote = this.value+'-note';
		}
		
});