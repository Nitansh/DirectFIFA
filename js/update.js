/******************* global varibles ******************/
var quarterTime = 900;
var time = quarterTime;
var quarter = 1;
var ballPossession;
var matchDetails;
var goalFlag = false;
var touchbackFlag = false;
var extrapointFlag = false;
var mtopcFlag = false;
var mfgFlag = false;
var tInterval = 200;
// variable true for front otherwise false
var cameraBackFront = 1;
var angleInterval = 0;
var yAngle = 0;


var ballControl = {

	isGoingLeft   : false,
	isGoingRight  : false,
	isGoingUp     : false,
	isGoingDown   : false,
	isComingNear  : false,
	isGoingFar    : false

};

var ballVelocity = {

	x : 0.1,
	y : 0.1,
	z : 1

};
/**** for cam focus *****/
var focus   ;

/*** json info ***/
var jsonObj ;

/**********************************
	function name : update 
	
	description   : update the scene
	
	return        : void


***********************************/


function update () {

	updateCameraPos();
	if (jsonObj.playbyplay.plays.play.length)
	{
		updateBall();
		updatePlayer();
		if(frames%(tInterval/10) == 0)
		{
			if (time >= 0)
			{
				updateTime();
			}
		}
		
		if(frames%tInterval == 0)
		{
			if (jsonObj.playbyplay.plays.play.length)
			{
				if (frames != 0)
					jsonObj.playbyplay.plays.play.shift();
				calculateSpeed();
				updateScoreboard();
			}
		}
	}
	//updateText();
	//readFromJson();
	
	if (undefined != focus)	
		camera.lookAt(focus.position);
}


/*****************************************************************

	function name : updateCameraPos
	
	description   : update the camera position accordingly

	return         : void

*******************************************************************/	

function updateCameraPos () {


	if ( controls.moveBackward ){
		
		if ( camera.position.z < 300 ){
			camera.position.z += ( 1 + acc);
			
			if (camera.position.z > 300)
			{
				camera.position.z = 300;
			}
			
		}
		
	}else if ( controls.moveForward ){
		
		
		if ( camera.position.z > -150 ){
			camera.position.z -= ( 1 + acc);
			
			if (camera.position.z < -150)
			{
				camera.position.z = -150;
			}
		}
		
	}else if ( controls.moveLeft ){
		
		if ( camera.position.x > -500 ){
			camera.position.x -= (( 1 + acc));
		}
		
	}else if ( controls.moveRight ){

		if ( camera.position.x < 500 ){
			camera.position.x += ( 1 + acc);
		}
		
	}

}

/*****************************************************

	function name : updateBall
	
	description   : moves the ball accordingly

	return        : void
******************************************************/

function updateBall(){
	ball.rotation.x += 10*(Math.PI/180);
	ball.rotation.y += 10*(Math.PI/180);
	ball.rotation.z += 10*(Math.PI/180);

	ball.position.z +=   ballVelocity.z;
	if ( focus === ball)
	{	
		camera.position.z += ballVelocity.z;
	}
		
	var moveType = jsonObj.playbyplay.plays.play[0]['play-type'];
	if (moveType == "Made Field Goal")
	{
		goalFlag = true;
	}
	else if (moveType == "Touchback")
	{
		touchbackFlag = true;
	}
	else if (moveType == "Made Extra Point")
	{
		extrapointFlag = true;
	}
	else if (moveType == "Missed Two Point Conversion")
	{
		mtopcFlag = true;
	}
	else if (moveType == "Missed Field Goal")
	{
		mfgFlag = true;
	}

	/****************************utsav********************************/	
	yAngle += angleInterval;
	if (jsonObj.playbyplay.plays.play[0]['possession'] == jsonObj.playbyplay.meta.team[0].alias)
	{
		if (ball.position.y < 5)
		{
			timeInAir = 0;
			ball.position.y = 5;
		}
	
		ball.position.x +=   ballVelocity.x;
		if ( focus === ball)
		{	
			camera.position.x += ballVelocity.x;
		}
		
		if (moveType == "Kickoff" || moveType == "Kick Off Return"){
			ball.position.y = 100 * Math.sin(yAngle) + 5;
			if (ball.position.y < 5)
			{
				ball.position.y = 5;
			}
		}
	}
	else
	{
		ball.position.x -=   ballVelocity.x;
		if ( focus === ball)
		{	
			camera.position.x -= ballVelocity.x;
		}
		if (moveType == "Kickoff" || moveType == "Kick Off Return"){
			ball.position.y = 100 * Math.sin(yAngle) + 5;		
			if (ball.position.y < 5)
			{
				ball.position.y = 5;
			}
		}

	}
		
/***************utsav ends*********************************************/	
	
	/*************write possession of the ball**************/
	scene.remove(ballPossession);
	var text = jsonObj.playbyplay.plays.play[0]['possession'];
	if (jsonObj.playbyplay.plays.play[0]['possession'] == jsonObj.playbyplay.meta.team[0].alias)
	var color = jsonObj.playbyplay.meta.team[0]['foreground-color'];
	else
	color = jsonObj.playbyplay.meta.team[1]['foreground-color'];
	ballPossession = showText(text, 4, 1, "helvetiker", ball.position.x, ball.position.y + 6, ball.position.z, parseInt("0x" + color), scene,  0, 0, 0);			
}

/******************************************************
	function name : updatePlayer
	
	descrption    : update the playerMovement

	return        : void

********************************************************/

function updatePlayer(){
				var delta = clock.getDelta();

				for ( var i = 0; i < nCharacters; i ++ ) {

					characters[ i ].update( delta );

				}

}


/****************************** JSON CODE **********************************/
/*function jugad()
	{
		var files = document.getElementById('files').files;
		
		
		
		console.log(files[0]);
		file = files[0];
		
		
		readBlob(0, file.size);
		
	//	for (var i = 0; i < 3 ; i++)		
	//		readBlob(i*25 ,  (i+1)*25);
	}
	
	function readBlob(opt_startByte, opt_stopByte) {

    
    
    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			txt = evt.target.result;
			
			console.log(txt);
			var obj = JSON.parse(txt);
			
			ballControl.isGoingLeft   = ("true"==obj.isGoingLeft) ;
			ballControl.isGoingRight  = ("true"==obj.isGoingRight) ;
			ballControl.isGoingUp     = ("true"==obj.isGoingUp) ;
			ballControl.isGoingDown   = ("true"==obj.isGoingDown) ;
			ballControl.isComingNear  = ("true"==obj.isComingNear) ;
			ballControl.isGoingFar    = ("true"==obj.isGoingFar) ;
			
			
			ballVelocity.x            = parseInt(obj.xSpeed);
			ballVelocity.y            = parseInt(obj.ySpeed);
			ballVelocity.z            = parseInt(obj.zSpeed);
			
			
			console.log(ballVelocity.x);
			

			
			}
		};

		start = opt_startByte;
		stop =  opt_stopByte ;

		
		
		var blob = file.slice(start, stop );
		reader.readAsBinaryString(blob);
	}
 */
 
/********************************************************
	function    : updateBallViaJson
	
	description : will update the ball position accoring to the json input
				  and will call when we click update button

	return      : void

*********************************************************/


 function updateBallViaJson(){
 

 
	
	ballControl.isGoingLeft   = ("true"==jsonObj.ballPosition.isGoingLeft) ;
	ballControl.isGoingRight  = ("true"==jsonObj.ballPosition.isGoingRight) ;
	ballControl.isGoingUp     = ("true"==jsonObj.ballPosition.isGoingUp) ;
	ballControl.isGoingDown   = ("true"==jsonObj.ballPosition.isGoingDown) ;
	ballControl.isComingNear  = ("true"==jsonObj.ballPosition.isComingNear) ;
	ballControl.isGoingFar    = ("true"==jsonObj.ballPosition.isGoingFar) ;
			
		
	ballVelocity.x            = parseInt(jsonObj.ballPosition.xSpeed);
	ballVelocity.y            = parseInt(jsonObj.ballPosition.ySpeed);
	ballVelocity.z            = parseInt(jsonObj.ballPosition.zSpeed);
	
	
}	

/**********************************************************************
	function name :changeCameraFocus
	
	description   : change the camera focus accordingly to the input

	
	return        : void

***********************************************************************/
/****************** var for cam focus since we want to retain the values ***/
var camFocusVar = 0;
function changeCameraFocus(){


	switch (camFocusVar){

	case 0 :{

		focus = ball;
		break;
	}

	case 1 :{

		focus = characters[0].root;
		cameraSetter();
		break;
	}

	case 2 :{

		focus = characters[1].root;
		cameraSetter();
		break;
	}

	case 3 :{

		focus = characters[2].root;
		cameraSetter();
	
		break;
	}

	case 4 :{
		focus = characters[3].root;
		cameraSetter();
		break;
	}
	case 5 :{
		focus = characters[4].root;
		cameraSetter();
		break;
	}
	case 6 :{
		focus = characters[5].root;
		cameraSetter();
		break;
	}
	case 7 :{
		focus = characters[6].root;
		cameraSetter();
		break;
	}
	case 8 :{
		focus = characters[7].root;
		cameraSetter();
		break;
	}
	case 9 :{
		focus = characters[8].root;
		cameraSetter();
		break;
	}
	case 10 :{
		cameraSetter();
		focus = characters[9].root;
	
		break;
	}
	case 11 :{
		focus = characters[10].root;
		cameraSetter();
		break;
	}
	case 12 :{
		focus = characters[11].root;
		cameraSetter();
		break;
	}
	case 13 :{
		focus = characters[12].root;
		cameraSetter();
		break;
	}
	case 14 :{
		focus = characters[13].root;
		cameraSetter();
		break;
	}
	case 15 :{
		focus = characters[14].root;
		cameraSetter();
		break;
	}
	case 16 :{
		focus = characters[15].root;
		cameraSetter();
		break;
	}
	case 17 :{
		focus = characters[16].root;
		cameraSetter();
		break;
	}
	case 18 :{
		focus = characters[17].root;
		cameraSetter();
		break;
	}
	case 19 :{
		focus = characters[18].root;
		cameraSetter();
		break;
	}
	case 20 :{
		focus = characters[19].root;
		cameraSetter();
		
		break;
	}
	case 21 :{
		focus = characters[20].root;
		cameraSetter();
		break;
	}
	case 22 :{
		cameraSetter();
		focus = characters[21].root;
		
		break;
	}
	default : {

		camFocusVar = 0;
		break;
	}

	}
	
}


/*******************************
	function    : cameraSetter
	
	description :

	return       : void

***********************************/	

function cameraSetter(){

				camera.position.x = focus.position.x + 100;
				camera.position.y = focus.position.y + 20;
				camera.position.z = focus.position.z + 50;


}
/********************************************
	function name : parsingJson
	
	description   : update the team name , and more info
	
	return        : void


*********************************************/


function pasringJson(filePath){


    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",filePath,false);
    xmlhttp.send(null); 
    var fileContent = xmlhttp.responseText;
	jsonObj = JSON.parse(fileContent);

	
}

/******************************************************
	function     : updateMatchMetadata
	
	description  : it will update the match metadata
	
	return       : void



********************************************************/

function updateMatchMetadata(){

	for (var i = 1; i <= 2; i++)
	{
		document.getElementById("team"+i).innerHTML = ""+jsonObj.team[i-1].name;
	}
	
	for (i = 0; i < 11; i++)
	{
		
		document.getElementById("player"+ (i+1) +"_t1").innerHTML = ""+jsonObj.team[0].player[parseInt(i)].name;
		document.getElementById("player"+ (i+1) +"_t2").innerHTML = ""+jsonObj.team[1].player[parseInt(i)].name;

	}

}

/****************************************************************************
	function name : updateText
	
	description   : update the text position
	
	return        : void

*****************************************************************************/

function updateText(){

	for (var j = 1; j <= 2; j++)
	{
		for (var i = 1; i <= 11; i ++)
		{
		
			console.log(i*j);
			
			console.log("--------");
		
			var dot = (characters[ (i *  j) ].text.position ).dot( camera.position);
			var lengthA = (characters[ (i *  j) ].text.position ).length();
			var lengthB = ( camera.position).length();
			// Now to find the angle
			var theta = Math.acos( dot / (lengthA * lengthB) );
		}
	}



}

/****************************************************************************
	function name : updateScoreboard
	
	description   : update the score and time on board
	
	return        : void

*****************************************************************************/
function updateScoreboard()
{
	var down, qtr, home, togo, guests, color, playtype;
	down = jsonObj.playbyplay.plays.play[0].down;
	if (null == down) { down = "0"; }
	document.getElementById('sdown').innerHTML = down;

	home = jsonObj.playbyplay.plays.play[0]['home-score-before'];
	if (null == home) { home = "0"; }
	document.getElementById('shome').innerHTML = home;

	guests = jsonObj.playbyplay.plays.play[0]['away-score-before'];
	if (null == guests) { guests = "0"; }
	document.getElementById('sguests').innerHTML = guests;
	
	var text = jsonObj.playbyplay.plays.play[0].details;
	if (null == text) { text = "Details"; }
	document.getElementById('detailText').innerHTML = text;

	playtype = jsonObj.playbyplay.plays.play[0]['play-type'];
	if (null == playtype) { text = "Play Type"; }
	document.getElementById('playType').innerHTML = playtype;
	
	if(playtype == "Made Field Goal")
	{
		document.getElementById('stogo').innerHTML = "Goal";
	}
	else
	{
		document.getElementById('stogo').innerHTML = "";
	}
}

/****************************************************************************
	function name : updateTime
	
	description   : update the time and quarter on scoreboard
	
	return        : void

*****************************************************************************/
function updateTime()
{
	if (time == 0)
	{
		quarter++;
		time = quarterTime;
		if (quarter == 5)
		{
			quarter = 4;
			document.getElementById('stime').innerHTML = "Times<br>Up !!";
			time = -10;
			return 0;
		}
		document.getElementById('sqtr').innerHTML = quarter;
	}

	var stime;
	stime = parseInt(time/60);
	stime = stime + ":";
	stime = stime + time%60;
	document.getElementById('stime').innerHTML = stime;
	if (null == stime) { stime = "15:00"; }
	time--;
	
}

/****************************************************************************
	function name : showTeamname
	
	description   : show team name on board and ground
	
	return        : void

*****************************************************************************/
function showTeamname()
{
	var hometeam = jsonObj.playbyplay.meta.team[0]['sportsticker-id'];
	if (null == hometeam) { hometeam = "HOME"; }
	document.getElementById('hometeam').innerHTML = hometeam;
	var color = jsonObj.playbyplay.meta.team[0]['foreground-color'];
	document.getElementById('hometeam').style.color = "#" + color;
	document.getElementById('shome').style.color = "#" + color;

	var guestteam = jsonObj.playbyplay.meta.team[1]['sportsticker-id'];
	if (null == guestteam) { guestteam = "GUESTS"; }
	document.getElementById('guestteam').innerHTML = guestteam;
	color = jsonObj.playbyplay.meta.team[1]['foreground-color'];
	document.getElementById('guestteam').style.color = "#" + color;
	document.getElementById('sguests').style.color = "#" + color;
	
	var	text = jsonObj.playbyplay.meta.team[0]['sportsticker-id'];
	color = jsonObj.playbyplay.meta.team[0]['foreground-color'];
	showText(text, 30, 1, "helvetiker", -550, 1, 0, parseInt("0x" + color), scene, -90, 0, -90);

	var	text = jsonObj.playbyplay.meta.team[1]['sportsticker-id'];
	color = jsonObj.playbyplay.meta.team[1]['foreground-color'];
	showText(text, 30, 1, "helvetiker", 550, 1, 0, parseInt("0x" + color), scene, -90, 0, 90);

}



/****************************************************************************
	function name : calculateSpeed
	
	description   : calculate speed according to next position
	
	return        : void

*****************************************************************************/
function calculateSpeed()
{
	var playtype;
	var xDist;
	xDist = parseInt(jsonObj.playbyplay.plays.play[0].yardsx);
	xDist *= 10;
	ballVelocity.x = xDist/tInterval;
	
	var zDist;
	if (jsonObj.playbyplay.plays.play[0].direction == "L")
	{
		zDist = Math.random() * (-250 - ball.position.z);
		ballVelocity.z = zDist/tInterval;
	}
	else if (jsonObj.playbyplay.plays.play[0].direction == "R")
	{
		zDist = Math.random() * (250 - ball.position.z);
		ballVelocity.z = zDist/tInterval;
	}
	else
	{
		playtype = jsonObj.playbyplay.plays.play[0]['play-type'];
		if (playtype == "Made Field Goal")
		{
			zDist = 0 - ball.position.z;
			if (ball.position.x >= 0)
			{
				ballVelocity.z = zDist/(560 - ball.position.x) * 10;
			}
			else
			{
				ballVelocity.z = zDist/(560 + ball.position.x) * 10;
			}
		}
		else
		{
			ballVelocity.z = 0;
		}
	}

	var plType = jsonObj.playbyplay.plays.play[0]['play-type'];
	if (plType == "Kickoff" ||plType == "Kick Off Return" )
	{
		angleInterval = (Math.PI / 2 * 90) / (tInterval * 10 * 4);
	}

	yAngle = 0;
	
	/************************ for miscleanous cases ball needed to be set to a particular location *************/
	
	if (goalFlag)
	{
		setnewballPosition(150);
		goalFlag = false;
	}
	if (touchbackFlag)
	{
		setnewballPosition(200);
		touchbackFlag = false;
	}
	if (extrapointFlag)
	{
		setnewballPosition(150);
		extrapointFlag = false;
	}
	if (mtopcFlag)
	{
		setnewballPosition(150);
		mtopcFlag = false;
	}
	if (mfgFlag)
	{
		console.log(jsonObj.playbyplay.plays.play[0]['yardline']);
		setnewballPosition(130);
		mfgFlag = false;
	}
}

/****************************************************
	function name : setnewballPosition
	
	description   : set the ball posittion accordingly
	
	return        : void

*****************************************************/


function setnewballPosition(pos)
{
		if (jsonObj.playbyplay.plays.play[0]['possession'] == jsonObj.playbyplay.meta.team[0].alias)
		{
			ball.position.x = -pos;
			ball.position.z = 0;
			
		}
		else
		{
			ball.position.x = pos;
			ball.position.z = 0;
			
		}
		
		updateCameraPosAfterBallReset();
}

/****************************************************
	function name : updateCameraPosAfterBallReset()

	description   : update the position of the camera according to the ball reset took place
	
	return        : void

*****************************************************/

function updateCameraPosAfterBallReset(){

	switch (cameraBackFront){
	
		case 1:{
			frontCamera1();
			break;
		}
		case 2:{
			backCamera1();
			break;
		}
		case 3:{
			sideCamera1();
			break;
		}
		case 4:{
			backSideCamera1();
			break;
		}
		case 5:{
			frontCamera2();
			break;
		}
		case 6:{
			backCamera2();		
			break;
		}
		case 7:{
			sideCamera2();
			break;
		}
		case 8:{
			backSideCamera2();
			break;
		}
	
	}

}