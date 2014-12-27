function makeGrid(scene, zUp) {




	var gridXZ = new THREE.GridHelper(gridSize, gridSize / 2);
	gridXZ.setColors(new THREE.Color(colourNameToHex("gray"), new THREE.Color(colourNameToHex("gray"))));
	gridXZ.position.set(0, -gridSize, 0);
	//gridXZ.position.set(-gridSize / 2, -gridSize, -gridSize);
	scene.add(gridXZ);

	var gridXY = new THREE.GridHelper(gridSize, gridSize / 2);
	gridXY.position.set(0, 0, -gridSize);
	//gridXY.position.set(gridSize, gridSize, -gridSize);
	gridXY.rotation.x = Math.PI / 2;
	gridXY.setColors(new THREE.Color(colourNameToHex("gray"), new THREE.Color(colourNameToHex("gray"))));
	scene.add(gridXY);

	var gridYZ = new THREE.GridHelper(gridSize, gridSize / 2);
	gridYZ.position.set(-gridSize, 0, 0);
	gridYZ.rotation.z = Math.PI / 2;
	gridYZ.setColors(new THREE.Color(colourNameToHex("gray"), new THREE.Color(colourNameToHex("gray"))));
	scene.add(gridYZ);

	
	
	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	ctx.font = '64px Arial';
	var s = '-10000         10000';
	c.width = ctx.measureText(s).width;
	c.height = Math.ceil(64 * 1.25);
	ctx.font = '64px Arial';
	ctx.fillStyle = "#FF0000";
	ctx.fillText(s, 0, 64);

	var tex = new THREE.Texture(c);
	tex.needsUpdate = true;

	var plane = new THREE.Mesh(new THREE.PlaneGeometry(c.width*10, c.height*10), new THREE.MeshBasicMaterial({
		map : tex,
		color : 0xFFFFFF,
		opacity : 1
	}));
	plane.doubleSided = true;
	plane.position.set(0,-gridSize, 1.1*gridSize);
	plane.rotation.x = -Math.PI / 2;
	scene.add(plane);

	


}