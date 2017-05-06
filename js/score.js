var board = document.getElementById('score');
board.style.width = window.innerWidth/6;
board.style.height = parseInt(board.style.width)/1.53;

var sarray = document.getElementsByClassName('stext');
var indx = 0;
while(indx < sarray.length)
{
	sarray[indx].style.fontSize = parseInt(board.style.width)/20;
	indx++;
}

var sarray = document.getElementsByClassName('digital');
var indx = 0;
while(indx < sarray.length)
{
	sarray[indx].style.fontSize = parseInt(board.style.width)/6;
	indx++;
}

var breakline = document.getElementById('break');
breakline.style.position = "absolute";
var breaktop = parseInt(board.style.height)/2.15;
breakline.style.top = breaktop;
breakline.style.left = 0;
breakline.style.width = board.style.width;
breakline.style.height = "1px";

document.getElementById('time').style.letterSpacing = -parseInt(board.style.width)/70 + "pt";
document.getElementById('detailText').style.position = "absolute";
document.getElementById('detailText').style.top = window.innerHeight - 16;
document.getElementById('playType').style.top = window.innerHeight - 32;