function onload_function() {
	printlnMessage('messages', 'onload_status() in index.js');

	$('#container').load('home.html');
	document.title = 'JAT';

}

