function makeGrid(scene, zUp, gridSize) {

	var gridXZ = new THREE.GridHelper(gridSize, gridSize / 2);
	gridXZ.setColors(new THREE.Color(colourNameToHex("gray"), new THREE.Color(colourNameToHex("gray"))));
	gridXZ.position.set(0, -gridSize, 0);
	// gridXZ.position.set(-gridSize / 2, -gridSize, -gridSize);
	scene.add(gridXZ);

	var gridXY = new THREE.GridHelper(gridSize, gridSize / 2);
	gridXY.position.set(0, 0, -gridSize);
	// gridXY.position.set(gridSize, gridSize, -gridSize);
	gridXY.rotation.x = Math.PI / 2;
	gridXY.setColors(new THREE.Color(colourNameToHex("gray"), new THREE.Color(colourNameToHex("gray"))));
	scene.add(gridXY);

	var gridYZ = new THREE.GridHelper(gridSize, gridSize / 2);
	gridYZ.position.set(-gridSize, 0, 0);
	gridYZ.rotation.z = Math.PI / 2;
	gridYZ.setColors(new THREE.Color(colourNameToHex("gray"), new THREE.Color(colourNameToHex("gray"))));
	scene.add(gridYZ);

	makeLabel(-gridSize, 1.2 * gridSize, -gridSize, -gridSize, -Math.PI / 2,0,0);
	makeLabel("x [km]", 1.2 *gridSize, -gridSize, 0,  -Math.PI / 2,0,0);
	makeLabel(gridSize, 1.2 *gridSize, -gridSize, gridSize, -Math.PI / 2,0,0);

	makeLabel(-gridSize, -gridSize, -gridSize, 1.2 * gridSize, -Math.PI / 2, 0, Math.PI / 2);
	makeLabel("y [km]", 0, -gridSize, 1.2 * gridSize, -Math.PI / 2, 0, Math.PI / 2);
	makeLabel(gridSize, gridSize, -gridSize, 1.2 * gridSize, -Math.PI / 2, 0, Math.PI / 2);

	makeLabel(-gridSize, -1.2 * gridSize, -gridSize, gridSize, 0,0,0);
	makeLabel("z [km]", -1.2 *gridSize, 0, gridSize,  0,0,0);
	makeLabel(gridSize, -1.2 *gridSize, gridSize, gridSize, 0,0,0);

}

function makeLabel(text, xpos, ypos, zpos, xrot, yrot, zrot) {

	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = '64px Arial';
	var s = '-10000         10000';
	// console.log(''+context1.measureText(s).width);
	canvas1.width = context1.measureText(text).width;
	canvas1.height = Math.ceil(64 * 1.25);
	context1.font = '64px Arial';
	context1.fillStyle = "#505050";
	// context1.fillText('50', 0, 300);
	context1.fillText(text, 0, 64);

	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1)
	texture1.needsUpdate = true;

	var material1 = new THREE.MeshBasicMaterial({
		map : texture1,
		side : THREE.DoubleSide
	});
	material1.transparent = true;

	// var mesh1 = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000),
	// material1);
	var mesh1 = new THREE.Mesh(new THREE.PlaneGeometry(canvas1.width * 15, canvas1.height * 15), material1);
	mesh1.position.set(xpos, ypos, zpos);
	mesh1.rotation.x = xrot;
	mesh1.rotation.y = yrot;
	mesh1.rotation.z = zrot;
	scene.add(mesh1);

}
