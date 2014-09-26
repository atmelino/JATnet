function onload_function() {
	printlnMessage('messages', 'onload_status() in index.js');

	page = getCookie('page');
	title = getCookie('title');
	if (page == null) {
		page = 'home.html';
		title = 'JAT'
	}
	printlnMessage('messages', page + ' ' + title);

	// $('#container').load('home.html');
	// document.title = 'JAT';
	$('#container').load(page);
	document.title = title;

}

function linkClick(page, title) {

	$('#container').load(page);
	document.title = title;
	setCookie('page', page, 100);
	setCookie('title', title, 100);

}

// jQuery(document).ready(function() {
// $().jetmenu();
// });

(function($) {
	$(document).ready(function() {
		$('.has-sub').click(function(e) {
			alert('clicked');
			e.preventDefault();
			$(this).parent().toggleClass('tap');
		});
		$('.myhome').click(function(e) {
			linkClick('home.html', 'JAT');
		});
		$('.Documentation').click(function(e) {
			linkClick('Documentation.html', 'Documentation');
		});
		$('.Applications').click(function(e) {
			linkClick('Applications.html', 'Applications');
		});
		$('.Examples').click(function(e) {
			linkClick('Examples.html', 'Examples');
		});
		$('.Development').click(function(e) {
			linkClick('Development.html', 'Development');
		});
		$('.Testing').click(function(e) {
			linkClick('Testing.html', 'Testing');
		});
		$('.Licenses').click(function(e) {
			linkClick('Licenses.html', 'Licenses');
		});
		$('.Support').click(function(e) {
			linkClick('Support.html', 'Support');
		});
		$('.Screenshots').click(function(e) {
			linkClick('Screenshots.html', 'Screenshots');
		});

		// <li><a class='Screenshots'>Screenshots</a></li>

	});
}(jQuery));
