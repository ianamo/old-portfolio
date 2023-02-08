// Variables

convertMode = false;

// General Functions

function surroundStr (txt1, txt2, myStr, pos, len) {
    str = myStr.toString();
    var returnStr = (str.slice(0, pos) + txt1 + str.slice(pos,(pos+len)) + txt2 + (str.slice((pos+len),str.length)));

    return (returnStr);
}

function cutText (str, pos, len) {
    str = str.toString();
    str = str.slice(0,pos) + str.slice((pos+len),str.length);
    return (str);
}

function insertText (str,txt,pos) {
    str = str.toString();
    str = str.slice(0,pos) + txt + str.slice(pos,str.length);
    return str;
}

function returnMatches (mainStr, matchStr) { // return the starting position of all matches for str
    var places = [];
    var len = matchStr.length;

    for (var i =0; (i+len)<mainStr.length;i++) {
        var strSlice = mainStr.slice(i,(i+len));
        if (strSlice == matchStr) {
            places.push(i);
        }
    }
    return places;
}

function loadHighlightText(curr, m,text) {
  var highlightText = surroundStr("<span class='highlight'>","</span>",text,m[curr],3);
  document.getElementById("mu-theorems").innerHTML = highlightText;  
}

// Button functions

$('.rule-button-1').click(function(){
  if (convertMode == false) {
  var current = 0;
  muText = $(".mu-theorems").text();
  var matches = returnMatches(muText,'iii');

  loadHighlightText(current,matches,muText);
  convertMode = true;
  } else {
    current++;
    loadHighlightText(current,matches,muText);
  }
});

$('.highlight').click(function () {
    muText = cutText(muText,matches[current],3)
    $('.mu-theorems').text(muText);
    convertMode = false;
    current = 0;
});

$('.rule-button-2').click(function(){
  var str = $('#mu-theorems').text();
  var firstChar = str[0];
  var rest = str.slice(1,str.length);
  rest = rest + rest;
  $('#mu-theorems').text(firstChar+rest);
  
});

$('.rule-button-3').click(function () {
    var str = $('#mu-theorems').text();
    if (str[str.length-1] == 'i'){
    $('#mu-theorems').append('u');
    }
  });

$('.rule-button-4').click(function() {
    // some behavior so user knows we're waiting
    $('.rule-button-4').toggleClass('btn-waiting'); 
  });