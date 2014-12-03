function onload_function() {
	printlnMessage('messages', 'onload_status() in index.js');

	page = getCookie('page');
	title = getCookie('title');
	if (page == null) {
		page = 'home.html';
		title = 'JAT';
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


// play the funky music white boy
function do_the_click(url) {
	alert(url);
}

(function($) {
	$(document).ready(function() {

		$('div.menu a').click(function() {
			//printlnMessage('messages',this.id);
			linkClick(this.id+'.html', 'JAT '+this.id);
			//alert(this.href);
			//do_the_click(this.href);
			return false;
		});

		$('.has-sub').click(function(e) {
			alert('clicked');
			e.preventDefault();
			$(this).parent().toggleClass('tap');
		});
		// $('.myhome').click(function(e) {
		// alert('clicked');
		// linkClick('home.html', 'JAT');
		//		});
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
		//		});

		// <li><a class='Screenshots'>Screenshots</a></li>

	});
}(jQuery));
