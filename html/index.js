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
			//alert('home clicked');
		});
		$('.documentation').click(function(e) {
			$('#container').load('documentation.html');
		});

	});
}(jQuery));
