function onload_function() {
	printlnMessage('messages', 'onload_status() in index.js');

	page = getCookie('page');
	title = getCookie('title');
	if (page == null) {
		page = 'home.html';
		title = 'JAT'
	}
	printlnMessage('messages', page+' '+title);

	// $('#container').load('home.html');
	// document.title = 'JAT';
	$('#container').load(page);
	document.title = title;

}

function linkClick(page,title) {

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
			//$('#container').load('home.html');
			//document.title = 'JAT';
			page='home.html';
			title='JAT';
			$('#container').load(page);
			document.title = title;
			setCookie('page', page, 100);
			setCookie('title', title, 100);

			// alert('home clicked');
		});
		$('.Documentation').click(function(e) {
			//$('#container').load('Documentation.html');
			page='Documentation.html';
			title='Documentation';
			$('#container').load(page);
			document.title = title;
			setCookie('page', page, 100);
			setCookie('title', title, 100);
		});
		$('.Applications').click(function(e) {
			linkClick('Applications.html','Applications');
			//$('#container').load('Applications.html');
			//document.title = 'Applications';
		});
		$('.Examples').click(function(e) {
			$('#container').load('Examples.html');
			document.title = 'Examples';
		});
		$('.Development').click(function(e) {
			$('#container').load('Development.html');
			document.title = 'Development';
		});
		$('.Testing').click(function(e) {
			$('#container').load('Testing.html');
			document.title = 'Testing';
		});
		$('.Licenses').click(function(e) {
			$('#container').load('Licenses.html');
			document.title = 'Licenses';
		});
		$('.Support').click(function(e) {
			$('#container').load('Support.html');
			document.title = 'Support';
		});
		$('.Screenshots').click(function(e) {
			$('#container').load('Screenshots.html');
			document.title = 'Screenshots';
		});

		// <li><a class='Screenshots'>Screenshots</a></li>

	});
}(jQuery));
