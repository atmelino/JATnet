
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = '64px Arial';
	var s = '-10000         10000';
	canvas.width = context.measureText(s).width;
	canvas.height = Math.ceil(64 * 1.25);
	context.font = '64px Arial';
	context.fillStyle = "#FF0000";
	context.fillText(s, 0, 64);

	var tex = new THREE.Texture(canvas);
	tex.needsUpdate = true;

	var plane = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width * 10, canvas.height * 10), new THREE.MeshBasicMaterial({
		map : tex,
		color : 0xFFFFFF,
		opacity : 1
	}));
	plane.doubleSided = true;
	plane.position.set(0, -gridSize, 1.1 * gridSize);
	plane.rotation.x = -Math.PI / 2;
	//scene.add(plane);


function PHPtest()
{

	var thisIP="<?php echo $_SERVER['SERVER_ADDR'];?>";
    //alert("<?php echo $_SERVER['SERVER_ADDR'];?>");
    //alert(thisIP);

}


function redirect()
{

	var thisIP="<?php echo $_SERVER['SERVER_ADDR'];?>";
	newAddress="http://"+thisIP+":8080/JATServlet/JS3DPlot/JS3DPlot_orbit02.html";
	linkClick(newAddress);
}

// $('div.menu a').click(function() {
// // printlnMessage('messages',this.id);
// if (this.id == 'WebApps')
// linkClick('WebApps.php', 'Web Apps');
// else
// linkClick(this.id + '.html', 'JAT ' + this.id);
// // alert(this.href);
// return false;
// });

// $('.has-sub').click(function(e) {
// alert('clicked');
// e.preventDefault();
// $(this).parent().toggleClass('tap');
// });
// $('.myhome').click(function(e) {
// alert('clicked');
// linkClick('home.html', 'JAT');
// });
// $('.Documentation').click(function(e) {
// linkClick('Documentation.html', 'Documentation');
// });
// $('.Applications').click(function(e) {
// linkClick('Applications.html', 'Applications');
// });
// $('.WebApps').click(function(e) {
// linkClick('WebApps.html', 'Web Apps');
// });
// $('.Examples').click(function(e) {
// linkClick('Examples.html', 'Examples');
// });
// $('.Development').click(function(e) {
// linkClick('Development.html', 'Development');
// });
// $('.Testing').click(function(e) {
// linkClick('Testing.html', 'Testing');
// });
// $('.Licenses').click(function(e) {
// linkClick('Licenses.html', 'Licenses');
// });
// $('.Support').click(function(e) {
// linkClick('Support.html', 'Support');
// });
// $('.Screenshots').click(function(e) {
// linkClick('Screenshots.html', 'Screenshots');
// });

// <li><a class='Screenshots'>Screenshots</a></li>

