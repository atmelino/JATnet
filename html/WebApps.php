<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<script type="text/javascript">
function PHPtest()
{

	var thisIP="<?php echo $_SERVER['SERVER_ADDR'];?>";
    //alert("<?php echo $_SERVER['SERVER_ADDR'];?>");
    //alert(thisIP);

}


function redirect()
{

	var thisIP="<?php echo $_SERVER['SERVER_ADDR'];?>";
	newAddress="http://"+thisIP+":8080/JATServlet/JS3DPlot/JS3DPlot_orbit02.html";
	linkClick(newAddress);
}

</script>



</head>
<body>
	<table border="1" cellpadding="1" cellspacing="1" style="width: 500px;">
		<tbody>
			<tr>
				<td>
					<p>
						Orbit Viewer <a
							href="http://<?php echo $_SERVER['SERVER_ADDR'];?>:8080/JATServlet/JS3DPlot/JS3DPlot_orbit02.html"
							style="color: rgb(0, 98, 160); text-decoration: underline;"><img
							alt="" src="images/orbitViewer.png" style="width: 300px;" /> </a>
					</p>
				</td>
				<td></td>
			</tr>
		</tbody>
	</table>
	<p>
		<a href="http://<?php echo $_SERVER['SERVER_ADDR'];?>:8080/JATServlet"
			target="iframe_a">Web Apps</a>
	</p>
	<p>
		<a href="WebAppsDevelop.html" target="iframe_a">Web Apps Develop</a>
	</p>
	<p>
		<a href="javascript:void(0)"
			onclick="linkClick('WebAppsDevelop.html')">Orbit Viewer</a> <a
			href="javascript:void(0)" onclick="linkClick('WebAppsDevelop.html')">Web
			Apps Develop</a>
	</p>
	<button onclick="PHPtest()">PHP test</button>
	<button onclick="redirect()">redirect</button>



</body>
</html>
<?php




echo $_SERVER['SERVER_ADDR'];

?>
