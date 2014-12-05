function onload_function() {
	// printlnMessage('messages', 'index.js: onload_function()');

	page = getCookie('page');
	title = getCookie('title');
	if (page == null) {
		page = 'home.html';
		title = 'JAT';
	}
	printlnMessage('messages', 'index.js: from cookies: ' + page + ' ' + title);

	// $('#iframe_a').attr('src', page);
	//$('#iframe_a').attr('src', 'Applications.html');
	$('#iframe_a').attr('src', page);

	// $('#container').load('home.html');
	// document.title = 'JAT';
	// $('#container').load(page);
	document.title = title;

}

function redirect() {
	printlnMessage('messages', 'index.js: redirect()');
	$('#iframe_a').attr('src', 'Applications.html');
	// document.getElementById('iframe_a').src = 'Applications.html';
}

function linkClick(page, title) {

	$('#container').load(page);
	document.title = title;
	setCookie('page', page, 100);
	setCookie('title', title, 100);

}

(function($) {
	$(document).ready(function() {

		$('#iframe_a').load(function() {
			// printlnMessage('messages', 'index.js: ' +
			// this.contentWindow.location);

			var pathArrayStr = this.contentWindow.location + '';
			// printlnMessage('messages', 'index.js: ' + pathArrayStr);
			// printlnMessage('messages', 'index.js: ' + pathArrayStr + 'test');
			pathArray = pathArrayStr.split('/');
			// printlnMessage('messages', 'index.js: ' + pathArray);
			page = pathArray[pathArray.length - 1];
			printlnMessage('messages', 'index.js: ' + page);
			setCookie('page', page, 100);
			//	setCookie('title', title, 100);

		});

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

	});
}(jQuery));
