/**************************************************
	global varibles
***************************************************/
var acc = 0;


var controls = {

				moveForward: false,
				moveBackward: false,
				moveLeft: false,
				moveRight: false

			};

var cameraZOffset = 250;
var cameraYOffset = 40;
/*******************************
	function name : onKeyDown
	
	description   : controls the camera movement in the scene
	
	return        : void

********************************/

function onKeyDown ( event ) {

	switch( event.keyCode ) {

		case 38: /*up*/
		case 87: /*W*/
		{
			acc += 1/2;
			controls.moveForward = true; 
			break;
		}
		case 40: /*down*/
		case 83: /*S*/ 	 
		{
			acc += 1/2;
			controls.moveBackward = true; 
			break;
		}
		case 37: /*left*/
		case 65: /*A*/ 
		{
			acc += 1/2;
			controls.moveLeft = true; 
			break;
		}
		case 39: /*right*/
		case 68: /*D*/ 
		{
			acc += 1/2;
			controls.moveRight = true; 
			break;
		}
		//case 67: /*C*/     controls.crouch = true; break;
		//case 32: /*space*/ controls.jump = true; break;
		//case 17: /*ctrl*/  controls.attack = true; break;

	}

}

/*******************************
	function name : onKeyUp
	
	description   : controls the camera movement in the scene
	
	return        : void

********************************/

function onKeyUp ( event ) {
	console.log("key up detected");
	switch( event.keyCode ) {

		case 38: /*up*/
		case 87: /*W*/ 
		{
			acc = 0;
			controls.moveForward = false; 
			break;
		}
		case 40: /*down*/
		case 83: /*S*/
		{
			acc = 0;
			controls.moveBackward = false;
			break;
		}
		case 37: /*left*/
		case 65: /*A*/ 	 
		{
			acc = 0;
			controls.moveLeft = false;
			break;
		}
		case 39: /*right*/
		case 68: /*D*/ 	  
		{
			acc = 0;
			controls.moveRight = false; 
			break;
		}
		//case 67: /*C*/     controls.crouch = false; break;
		//case 32: /*space*/ controls.jump = false; break;
		//case 17: /*ctrl*/  controls.attack = false; break;

	}

}
/*******************************************************************************
	camera controls

********************************************************************************/

function frontCamera1(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z + cameraZOffset;
		camera.position.y = cameraYOffset;
		camera.position.x = ball.position.x;
		cameraBackFront = 1;
	}
}

function backCamera1(){

	//if (camera != undefined && ball != undefined)
	{
		camera.position.z = ball.position.z - cameraZOffset;
		camera.position.y  = cameraYOffset;
		camera.position.x = ball.position.x;
		cameraBackFront = 2;
	}
}
function sideCamera1(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z ;
		camera.position.x = ball.position.x + cameraZOffset;
		camera.position.y  = cameraYOffset;
		cameraBackFront = 3;
	}
}
function backSideCamera1(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z ;
		camera.position.x = ball.position.x - cameraZOffset;
		camera.position.y  = cameraYOffset;
		cameraBackFront = 4;
	}
}
function frontCamera2(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z + cameraZOffset;
		camera.position.y = cameraZOffset;
		camera.position.x = ball.position.x;
		cameraBackFront = 5;
	}
}
function backCamera2(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z - cameraZOffset;
		camera.position.y  = cameraYOffset * 5;
		camera.position.x = ball.position.x;
		cameraBackFront = 6;
	}
}
function sideCamera2(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z ;
		camera.position.x = ball.position.x + cameraZOffset;
		camera.position.y  = cameraYOffset * 5;
		cameraBackFront = 7;
	}
}
function backSideCamera2(){

	//if (camera != undefinded && ball != undefined)
	{
		camera.position.z = ball.position.z ;
		camera.position.x = ball.position.x - cameraZOffset;
		camera.position.y  = cameraYOffset * 5;
		cameraBackFront = 8;
		
	}
}

