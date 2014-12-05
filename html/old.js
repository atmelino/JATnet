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

