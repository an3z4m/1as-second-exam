<?php
// this is the first file to be visited
if(isset($_POST['fullName']) && isset($_POST['solution'])){
	$path = "uploads/".$_POST['fullName'].".json";
	//check for old work
	if(file_exists($path) ){
		$myfile = fopen("uploads/".$_POST['fullName'].".json", "r");// or die("Unable to open file!");
		$oldWork = fread($myfile,filesize($myfile));
		fclose($myfile);		
		echo $oldWork;
		//resume old work
	}else{
		//begin a new work
	}
}else{
	include("welcome.php");
}

?>