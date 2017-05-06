function showText(theText, arg_size, arg_height, arg_font, arg_x, arg_y, arg_z, arg_color, scene, x_rot, y_rot, z_rot)				
{				
	var text3d = new THREE.TextGeometry( theText, {
		size: arg_size,
		height: arg_height,
		curveSegments: 2,
		font: arg_font
	});

				text3d.computeBoundingBox();
				var centerOffset = -0.55 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

				var textMaterial = new THREE.MeshBasicMaterial( { color: arg_color, overdraw: false } );
				text = new THREE.Mesh( text3d, textMaterial );
				if (z_rot == 0)
					text.position.x = arg_x + centerOffset;
				else
					text.position.x = arg_x;
				text.position.y = arg_y;
				if (z_rot == 0)
					text.position.z = arg_z;
				else if (z_rot > 0)
					text.position.z = arg_z - centerOffset;
				else
					text.position.z = arg_z + centerOffset;
					
				text.rotation.x = x_rot*(Math.PI/180);
				text.rotation.y = y_rot*(Math.PI/180);
				text.rotation.z = z_rot*(Math.PI/180);


				scene.add( text );

				return text;
				
}

