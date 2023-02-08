var words = ['envelope','amazing','remarkable','evidence','lucrative','suspect','feigned','malevolent','harmonious','sympathetic','musical'];
let row = document.getElementById('word-row');
let entry = document.getElementById('entry-row');

var checker = require('check-word');
var dict = checker('en');

function newWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function initWord(str) {

  for (let i =0;i<str.length;i++) {
    
    let squareBox = document.createElement('div');
    squareBox.className = 'empty-box';
    let letterTile = document.createElement('div');
    letterTile.className = 'letter-box';
    letterTile.innerHTML = str[i];
    letterTile.id = i;
    letterTile.setAttribute("draggable","true");
    letterTile.setAttribute("ondragstart","drag(event)");    
    squareBox.appendChild(letterTile);
    row.appendChild(squareBox);
    
    let blank = document.createElement('div');
    blank.className = 'empty-box';
    entry.appendChild(blank);
  }
  allBlanks = document.querySelectorAll('.empty-box');
  for (let j = 0;j<allBlanks.length;j++){
    allBlanks[j].setAttribute("ondrop","drop(event)");
    allBlanks[j].setAttribute("ondragover","allowDrop(event)");
  }
}

function getWord() {
  let entryWord = "";
  let tiles = document.querySelectorAll('#entry-row .letter-box');
  for (let k =0;k<tiles.length;k++) {
    entryWord = entryWord + tiles[k].innerHTML;
  }
  return entryWord;
}

function logWord() {
  let wordGuessed = getWord();
  if (dict.check(wordGuessed) {
    clearTiles();
  }
  else {
    console.log("Word not found in dictionary");
  }
}

function clearRows () {
  while (row.firstChild) {
    row.removeChild(row.lastChild);
  }
  while (entry.firstChild) {
    entry.removeChild(entry.lastChild);
  }
}

function clearTiles() {
  let letterBoxes = document.querySelectorAll("#entry-row .empty-box");
  for (let n=0;n<letterBoxes.length;n++) {
    if (letterBoxes[n].firstChild){
    letterBoxes[n].removeChild(letterBoxes[n].firstChild);
    }
  }
}

function refresh() {
  clearRows();
  initWord(newWord());  
}


// drag & drop  functionality for tiles

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  console.log("drag commenced");
  console.log(ev.target.id);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
 const myDropper = document.getElementById(data);
 ev.target.appendChild(myDropper);
}



initWord(newWord());

const enterButton = document.getElementById('enter-btn');
enterButton.addEventListener('click', logWord);

const passButton = document.getElementById('pass-btn');
passButton.addEventListener('click', refresh);