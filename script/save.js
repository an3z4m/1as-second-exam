function save(){
	var form = document.getElementById("save");
	var input = document.getElementById("solution");
	input.value = JSON.stringify(stringifyMyWork());
	form.submit();
}

function stringifyMyWork(){
	var work_to_save = [];
	var fullName = document.getElementById("familyName").value+'_'+document.getElementById("firstName").value;
	work_to_save.push(timeOut);
	work_to_save.push(fullName);
	for(var i=0; i<quizes.length ;i++){
		work_to_save.push(quizes[i].solution);
	}
	return JSON.stringify(work_to_save);
}


var ajaxSave = function() {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("serverResponse").innerHTML = this.responseText;
			console.log(this.responseText);
		}
	};
	//	xmlhttp.open("GET", "save.php?fullName=verververv&solution=rrgerg" + stringifyMyWork(), true);
	xmlhttp.open("POST", "save.php", true);

	//	xmlhttp.send();	
	//Send the proper header information along with the request
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var fullName = document.getElementById("familyName").value+'_'+document.getElementById("firstName").value;
	xmlhttp.send("fullName="+fullName+"&solution="+stringifyMyWork());

}

window.setInterval(ajaxSave,1000*60);