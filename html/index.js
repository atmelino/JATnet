function onload_function() {
	// printlnMessage('messages', 'index.js: onload_function()');

	root_path = window.location.pathname;
	// printlnMessage('messages', 'index.js: root path ' + root_path);

	page = getCookie('page');
	title = getCookie('title');
	//printlnMessage('messages', 'index.js: from cookies: ' + page + ' ' + title);
	if (page == null) {
		page = 'home.html';
		title = 'JAT';
	}

	$('#iframe_a').attr('src', page);
	// $('#iframe_a').attr('src', 'Applications.html');

	// $('#container').load('home.html');
	// document.title = 'JAT';
	// $('#container').load(page);
	document.title = title;

}

(function($) {
	$(document).ready(function() {

		$('#iframe_a').load(function() {
			// printlnMessage('messages', 'index.js: ' +
			// this.contentWindow.location);

			full_path = this.contentWindow.location.href;
			//printlnMessage('messages', 'index.js: full path ' + full_path);

			var pathArrayStr = this.contentWindow.location + '';
			pathArray = pathArrayStr.split('/');
			page = pathArray[pathArray.length - 1];
			// printlnMessage('messages', 'index.js: ' + pathArrayStr);
			// printlnMessage('messages', 'index.js: ' + pathArrayStr + 'test');
			// printlnMessage('messages', 'index.js: ' + pathArray);
			// printlnMessage('messages', 'index.js: ' + page);

			setCookie('page', full_path, 100);
			// setCookie('page', page, 100);
			// setCookie('title', title, 100);

			page = getCookie('page');
			//printlnMessage('messages', 'index.js: saved to cookies: ' + page);

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

function linkClick(page, title) {

	$('#container').load(page);
	document.title = title;
	setCookie('page', page, 100);
	setCookie('title', title, 100);

}

function redirect() {
	printlnMessage('messages', 'index.js: redirect()');
	$('#iframe_a').attr('src', 'Applications.html');
	// document.getElementById('iframe_a').src = 'Applications.html';
}
