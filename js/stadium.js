/********************************

global variables
*********************************/
var characters = [];
var nCharacters = 0;
var ball;
var ground ;


/******************************************
	function name : addGround
	
	description   : Creates the ground in the scene 
	
	return        : mesh



*******************************************/


function addGround()
{

	var gt = THREE.ImageUtils.loadTexture( "../res/texture/grasslight-big.jpg" );
	var gg = new THREE.PlaneGeometry( 1000, 500 );
	var gm = new THREE.MeshLambertMaterial( { color: 0xffffff, map: gt } );

	ground = new THREE.Mesh( gg, gm );
	ground.rotation.x = - Math.PI / 2;
	ground.material.map.repeat.set( 64, 64 );
	ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
	ground.receiveShadow = true;
	ground.castShadow    = false;
	return ground;
}


/******************************************
	function name : addGround
	
	description   : Creates the ground in the scene 
	
	return        : mesh



*******************************************/


function addGround1()
{

	var gt = THREE.ImageUtils.loadTexture( "../res/texture/ground.jpg" );
	var gg = new THREE.PlaneGeometry( 1200, 600 );
	var gm = new THREE.MeshLambertMaterial( { color: 0xffffff, map: gt } );

	ground = new THREE.Mesh( gg, gm );
	ground.rotation.x = - Math.PI / 2;
	ground.material.map.repeat.set( 64, 64 );
	ground.position.y = -1;
	ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
	ground.receiveShadow = true;
	ground.castShadow    = false;
	return ground;
}




/******************************************
	function name : addGround
	
	description   : Creates the ground in the scene 
	
	return        : mesh



*******************************************/

function addLight()
{

	var light = new Array();

	for (var i = 0; i < 2; i++)
	{
	
		light[i] = new THREE.DirectionalLight( 0xffffff, 0.9 );
		
		if (0 == i)
		{
			light[i].position.set( 0, 800, -1300 );
		}	
		
		if (1 == i)
		{
				light[i].position.set( 0, 800, 1300 );
		}
		
		
		light[i].castShadow = true;
		scene.add(light[i]);
	
	}
}

/********************************************************************************

	function name : addSky
	
	description   : Creates the background and add it to the scene

	return        : void



***********************************************************************************/

function addSky(scene) {                                       //scene refrence 
									
				var vertexShader = document.getElementById( 'vertexShader' ).textContent;
				var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
			
			
				var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.25 );
				hemiLight.color.setHSV( 0.9, 0.5, 0.1 );
				hemiLight.groundColor.setHSV( 0.1, 0.45, 0.95 );
				hemiLight.position.y = canvasHeight;
				//scene.add( hemiLight );
			
			
				var uniforms = {
					topColor: 	 { type: "c", value: new THREE.Color( 0x000000 ) },
					bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
					offset:		 { type: "f", value: 400 },
					exponent:	 { type: "f", value: 0.6 }
				}
				uniforms.topColor.value.copy( hemiLight.color );

				//scene.fog.color.copy( uniforms.bottomColor.value );

				var skyGeo = new THREE.SphereGeometry( 3000, 111, 10 ); //set accoringly device to device
				var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

				var sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );							
									
}

/********************************************************************************

	function name : addFootBall
	
	description   : Creates the background and add it to the scene

	return        : void



***********************************************************************************/

function addFootBall( scene ) {

		var radius = 5;
		
		var geometry = new THREE.SphereGeometry( radius, 0 , 0 );
		var material = new THREE.MeshLambertMaterial( {color : 0xff0000});

		ball = new THREE.Mesh( geometry, material );
		ball.position.y = radius;
		ball.castshadow = true;
		ball.recieveshadow = false;
		scene.add( ball);
		ball.position.x = 150;
		
		
		// adding the lines 10 yard lines
		for (var i = -4; i <= 4; i++)
		{
			addLines(scene, 0xffffff , i*100   , 250);
		}
		
		for (i = -9; i < 9; i++)
		{
			if (i%2 == 0)
			{
				i++;
			}
			addLines(scene, 0x0000ff,  i*50   , 250);
		}
		
		for (i = -49; i < 50; i++)
		{
		
			if (i%5 == 0 || i%10 == 0)
			{
				i++;
			}
			addLines(scene, 0xffffff,  i*10   , 10);
		
		}
		
		// central circle
		
		for (i = 0 ; i < 2*(Math.PI); i += (Math.PI/360))
		{
				
				addLines(scene, 0xffffff, 25* Math.cos(i), 25 * Math.sin(i));
			
		}
		
		// adding poles to the ground
		
		addPoles(scene);
		
		// add text on ground
		addText(scene);
}

/********************************************************************************
	function : adding Lines
	
	description : add lines to the ground
	
	return       : void
**********************************************************************************/

function addLines(scene, color1, x, y, isCircle){

	var line;
	var geometry;
	var material = new THREE.LineBasicMaterial({
		wireframeLinewidth: 100,
        color: color1
    });
	
	geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x, 1, -y));
    geometry.vertices.push(new THREE.Vector3(x, 1,  y));
    line = new THREE.Line(geometry, material);

	scene.add(line);
	
	
}


/********************************************************************************

	function name : addPlayers
	
	description   : Creates the players and add it to the scene

	return        : void



***********************************************************************************/

function addPlayers(scene){
	
		var configOgro = {

					baseUrl: "ogro/",

					body: "ogrolight.js",
					skins: [ "gib.png", "darkam.png" ],
					weapons:  [ [ "weaponlight.js", "weapon.jpg" ] ],
					animations: {
						move: "run",
						idle: "stand",
						jump: "jump",
						attack: "attack",
						crouchMove: "cwalk",
						crouchIdle: "cstand",
						crouchAttach: "crattack"
					},

					walkSpeed: 50,
					crouchSpeed: 175

				};

				var nRows = 1;
				var nSkins = configOgro.skins.length;

				nCharacters = nSkins  * 11;

				for ( var i = 0; i < nCharacters; i ++ ) {

					var character = new THREE.MD2CharacterComplex();
					character.scale = 0.5;
					character.controls = controls;
					
					
					characters.push( character );

					

				}

				var baseCharacter = new THREE.MD2CharacterComplex();
				baseCharacter.scale = 1;

				baseCharacter.onLoadComplete = function () {

					var k = 0;

					for ( var j = 0; j < 2; j ++ ) {

						for ( var i = 0; i < 11; i ++ ) {

							var cloneCharacter = characters[ k ];

							cloneCharacter.shareParts( baseCharacter );

							cloneCharacter.enableShadows( true );

				
							cloneCharacter.setSkin( j );
							
							if ( j == 0)
							{
								cloneCharacter.bodyOrientation = Math.PI/2;
								cloneCharacter.root.position.x = -50;
								cloneCharacter.root.position.z = -225 + i*40;
								cloneCharacter.root.position.y = 12;
								text = ""+jsonObj.team[j].player[parseInt(i)].name;
								cloneCharacter.text = showText(text, 5, 1, "helvetiker", cloneCharacter.root.position.x, cloneCharacter.root.position.y + 20, cloneCharacter.root.position.z, 0xffffff, scene ,false);
								cloneCharacter.text.position.x = cloneCharacter.root.position.x;
								cloneCharacter.text.position.y = cloneCharacter.root.position.y + 20;
								cloneCharacter.text.position.z = cloneCharacter.root.position.z + 20;
								
							}
							else
							{
								cloneCharacter.bodyOrientation = -Math.PI/2;
								cloneCharacter.root.position.x = 50;
								cloneCharacter.root.position.z = -225 + i*40;
								cloneCharacter.root.position.y = 12;
								text = ""+jsonObj.team[j].player[parseInt(i)].name;
								cloneCharacter.text = showText(text, 5, 1, "helvetiker", cloneCharacter.root.position.x, cloneCharacter.root.position.y + 20, cloneCharacter.root.position.z, 0xffffff, scene, false);
								cloneCharacter.text.position.x = cloneCharacter.root.position.x;
								cloneCharacter.text.position.y = cloneCharacter.root.position.y + 20;
								cloneCharacter.text.position.z = cloneCharacter.root.position.z + 20;
								
							}

							
							
							scene.add( cloneCharacter.root );

							k ++;

						}

					}

					

				};

				baseCharacter.loadParts( configOgro );

			}
	


/**********************************************************************
		FUNCTION NAME : ADDPLOES
		
		DESCRIPTION   : THIS FUNCTION WILL DRAW THE POLES ON THE GROUND
		
		RETURN         : VOID


************************************************************************/


function addPoles(scene){

	
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
		
		
		
        var cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material);
		cylinder1.position.set(560, 50, 25);
        cylinder1.overdraw = true;
		scene.add(cylinder1);

		var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2,  100, 5, 5, false), material);
		cylinder2.position.set(560, 50, -25);
        cylinder2.overdraw = true;
		scene.add(cylinder2);
		
		 var cylinder11 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material);
		cylinder11.position.set(560, 50, 250);
        cylinder11.overdraw = true;
		scene.add(cylinder11);

		var cylinder12 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material);
		cylinder12.position.set(560, 50, -250);
        cylinder12.overdraw = true;
		scene.add(cylinder12);
		
		 var cylinder13 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material);
		cylinder13.position.set(500, 50, -250);
        cylinder13.overdraw = true;
		scene.add(cylinder13);

		var cylinder14 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material);
		cylinder14.position.set(500, 50, 250);
        cylinder14.overdraw = true;
		scene.add(cylinder14);
		
		
		var cylinder5 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 50, 5, 5, false), material);
		cylinder5.rotation.x += Math.PI/2;
		cylinder5.position.set(560, 20, 0);
        cylinder5.overdraw = true;
		scene.add(cylinder5);
		
		
		var material1 = new THREE.MeshLambertMaterial({
            color: 0xff000 
		});
		
		
		
		var cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material1);
		cylinder3.position.set(-560, 50, 25);
        cylinder3.overdraw = true;
		scene.add(cylinder3);

		var cylinder4 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material1);
		cylinder4.position.set(-560, 50, -25);
        cylinder4.overdraw = true;
		scene.add(cylinder4);
		

		var cylinder6 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 50, 5, 5, false), material1);
		cylinder6.rotation.x += Math.PI/2;
		cylinder6.position.set(-560, 20, 0);
        cylinder6.overdraw = true;
		
		scene.add(cylinder6);
		
		

		var cylinder21 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material1);
		cylinder21.position.set(-560, 50, 250);
        cylinder21.overdraw = true;
		scene.add(cylinder21);

		var cylinder22 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material1);
		cylinder22.position.set(-560, 50, -250);
        cylinder22.overdraw = true;
		scene.add(cylinder22);
		
		 var cylinder23 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material1);
		cylinder23.position.set(-500, 50, -250);
        cylinder23.overdraw = true;
		scene.add(cylinder23);

		var cylinder24 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 100, 5, 5, false), material1);
		cylinder24.position.set(-500, 50, 250);
        cylinder24.overdraw = true;
		scene.add(cylinder24);
		
}

function addText(scene)
{
	var text;
	text = "50";
	showText(text, 25, 1, "helvetiker", 0, 1, -200, 0xffffff, scene, -90, 0, 0);
	text = "40";
	showText(text, 25, 1, "helvetiker", -100, 1, -200, 0xffffff, scene, -90, 0, 0);
	text = "30";
	showText(text, 25, 1, "helvetiker", -200, 1, -200, 0xffffff, scene,  -90, 0, 0);
	text = "20";
	showText(text, 25, 1, "helvetiker", -300, 1, -200, 0xffffff, scene,  -90, 0, 0);
	text = "10";
	showText(text, 25, 1, "helvetiker", -400, 1, -200, 0xffffff, scene,  -90, 0, 0);
	text = "40";
	showText(text, 25, 1, "helvetiker", 100, 1, -200, 0xffffff, scene,  -90, 0, 0);
	text = "30";
	showText(text, 25, 1, "helvetiker", 200, 1, -200, 0xffffff, scene,  -90, 0, 0);
	text = "20";
	showText(text, 25, 1, "helvetiker", 300, 1, -200, 0xffffff, scene,  -90, 0, 0);
	text = "10";
	showText(text, 25, 1, "helvetiker", 400, 1, -200, 0xffffff, scene,  -90, 0, 0);

	text = "50";
	showText(text, 25, 1, "helvetiker", 0, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "40";
	showText(text, 25, 1, "helvetiker", -100, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "30";
	showText(text, 25, 1, "helvetiker", -200, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "20";
	showText(text, 25, 1, "helvetiker", -300, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "10";
	showText(text, 25, 1, "helvetiker", -400, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "40";
	showText(text, 25, 1, "helvetiker", 100, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "30";
	showText(text, 25, 1, "helvetiker", 200, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "20";
	showText(text, 25, 1, "helvetiker", 300, 1, 200, 0xffffff, scene,  -90, 0, 0);
	text = "10";
	showText(text, 25, 1, "helvetiker", 400, 1, 200, 0xffffff, scene,  -90, 0, 0);
}
