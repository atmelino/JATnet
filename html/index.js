function onload_function() {
	printlnMessage('messages', 'onload_status() in index.js');

	$('#container').load('home.html');
	document.title = 'JAT';

}


function linkClick(name)
{
	
	$('#container').load(name);


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

		
		//<li><a class='Screenshots'>Screenshots</a></li>

	});
}(jQuery));
