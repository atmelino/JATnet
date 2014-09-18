function onload_function() {
	printlnMessage('messages', 'onload_status() in index.js');

	$('#container').load('home.html');
	document.title = 'JAT';

}

//jQuery(document).ready(function() {
//	$().jetmenu();
//});


(function($) {
	$(document).ready(function() {
		$('.has-sub').click(function(e) {
			alert('clicked');
			e.preventDefault();
			$(this).parent().toggleClass('tap');
		});
		$('.myhome').click(function(e) {
			$('#container').load('home.html');
			document.title = 'JAT';
			//alert('home clicked');
		});
		$('.Documentation').click(function(e) {
			$('#container').load('Documentation.html');
			document.title = 'Documentation';
		});
		$('.Applications').click(function(e) {
			$('#container').load('Applications.html');
			document.title = 'Applications';
		});
		$('.Examples').click(function(e) {
			$('#container').load('Examples.html');
			document.title = 'Examples';
		});

		
		//<li><a class='Screenshots'>Screenshots</a></li>
		//<li><a class='Support'>Support</a></li>
		//<li><a class='Development'>Development</a></li>
		//<li><a class='Testing'>Testing</a></li>
		//<li><a class='Licenses'>Licenses</a></li>

	});
}(jQuery));
