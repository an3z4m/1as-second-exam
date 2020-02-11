
<?php

	//var_dump($_GET);
//$ip = $_SERVER['REMOTE_ADDR'];
if(isset($_POST['fullName']) && isset($_POST['solution'])){
	$path = "uploads/".$_POST['fullName'].".json";
	//check for old work
	if(file_exists($path) ){
		$myfile = fopen("uploads/".$_POST['fullName'].".json", "r");// or die("Unable to open file!");
		$oldWork = fread($myfile,filesize($myfile));
		fclose($myfile);		
		echo $oldWork;
	}else{
		$myfile = fopen("uploads/".$_POST['fullName'].".json", "w+");// or die("Unable to open file!");
		fwrite($myfile, $_POST['solution']);
		fclose($myfile);		
		echo 1;
	}
}else{
	echo 0;
}
//$myfile = fopen("ip.txt", "aw") or die("Unable to open file!");
//fwrite($myfile, "_".$ip."_");
?>