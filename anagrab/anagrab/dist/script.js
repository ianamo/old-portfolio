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