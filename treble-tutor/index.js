let showNote = false;
let lastNote = null;

function playNote(noteStr) {
	const note = new Audio("sounds/"+noteStr+'.mp3');
	note.play();
}

$('.key').click(function () 
	{ 
		const thisNote = this.value + '-note';
		
		if ((thisNote == 'c-note' || lastNote=='c-note')&&(thisNote!==lastNote))  { // if we're playing the c note -- or we have played it, and we're playing something else -- we need to make the little line appear or go away
			$('.note-line').toggleClass('hide');
		} 

		if (!showNote) { // note div remains hidden until first note is played
			$('.note').toggleClass("hide");
			showNote = true;
		}

		lastNote && $('.note').toggleClass(lastNote); // if there is a last note, make it go away 
		$('.note').toggleClass(thisNote);
		playNote(thisNote);
		lastNote = thisNote;
});


//
//
 