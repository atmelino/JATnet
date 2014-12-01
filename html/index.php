<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>JAT</title>

<link rel="stylesheet" type="text/css" href="JATstyle.css">


<script type="text/JavaScript" src="lib/jquery-2.1.1.js"></script>
<script type="text/JavaScript" src="index.js"></script>
<script type="text/JavaScript" src="functions.js"></script>
<script type="text/JavaScript" src="menu.js"></script>
<script type="text/javascript" src="lib/three.min.js"></script>
<script type="text/javascript" src="lib/d3.js"></script>
<script type="text/javascript" src="lib/elegansMod.js"></script>


</head>
<body onload="onload_function()">

	<div id="menuheader">
		<?php include("menu.html"); ?>
	</div>
	<div id="status">
		<?php include("status.html"); ?>
	</div>

	<div ID='mainarea' style="display: table;">

		<div id='messagesDiv'>
			<textarea id="messages" style="width: 90%;"></textarea>
			<!-- cols=60 rows=10 -->
		</div>
		<div id='container'></div>

	</div>
	<!-- end of mainarea -->


</body>
</html>
