function contains(text,patern){
	return typeof text.match(patern) !== 'undefined';
}

function isset(x){
	return typeof x !== 'undefined';
}

function isset(x){
	return typeof x !== 'undefined';
}
function getNumberOfElements(node,tagName){
		if(typeof node !== 'undefined'){
			//console.log(node);
			if(typeof node.getElementsByTagName(tagName) !== 'undefined'){
				return node.getElementsByTagName(tagName).length;
			}
		}
		return 0; 
}
function Quiz(question){
	this.question=question;
	this.options = [];
	this.solution = "";
	this.example = "";
	this.addOption = function(opt){ opt.quiz = this;  this.options.push(opt); };
	this.list = document.createElement("div");
	this.createView = function(){
		for(var i=0; i<this.options.length; i++){
			this.list.appendChild(this.options[i].getRow());
		}
	}
	this.verify;/* = function(){
		this.saveWork(); 
		for(var i=0; i<this.options.length; i++){
			this.options[i].verify();
		}
	}*/
	this.clearStyle = function(){
		for(var i=0; i<this.options.length; i++){
			this.options[i].setValideClass(false);
		}			
	}
	this.saveWork = function(){	this.solution = document.getElementById("editor").value; };
	this.showQuiz = function(){ 
		document.getElementById("quiz_text").innerHTML		= this.question;
		//document.getElementById("quiz_example").innerHTML	= this.example;
		document.getElementById("quiz_example").contentWindow.document.firstChild.innerHTML=this.example;
		document.getElementById("quiz_check").innerHTML='';
		document.getElementById("quiz_check").appendChild(this.list);
		//loadWork
		document.getElementById("editor").value = this.solution;
	}
}
function Option(opt,val="",fun=function(){ return false; }){
	this.quiz;
	this.opt = opt;
	this.val = val;
	this.coef  = 1;
	this.score = 0;
	this.check = fun;
	this.setValideClass = function(val){ if(val){ this.row.className='valide'; }else{ this.row.className=''; } }
	this.verify	= function(){ this.setValideClass(this.check()); };
	this.row 	 = document.createElement("div");
	this.appendColumns = function(){
		var tdOpt 	= document.createElement("div");  tdOpt.innerHTML = this.opt+':';
		var tdVal 	= document.createElement("div");  tdVal.innerHTML = this.val;
		var tdCoef = document.createElement("div");   tdCoef.innerHTML=this.coef+'ن';
		this.row.appendChild(tdOpt);
		this.row.appendChild(tdVal);
		this.row.appendChild(tdCoef);
	};
	this.appendColumns();
	this.getRow = function(){ return this.row; }
}
var quizes = [];

quizes.push(new Quiz("Create a simple page with yellow background which contains a two line paragraph, an hyperlink and a green text as shown in the example"));
quizes[0].addOption(new Option("Correct order of page elements","."));
quizes[0].addOption(new Option("Background Color","Yellow"));
quizes[0].addOption(new Option("Include a title","."));
quizes[0].addOption(new Option("Include a paraghraph","."));
quizes[0].addOption(new Option("Linebreak","."));
quizes[0].addOption(new Option("Hyperlink ","www.google.com"));
quizes[0].addOption(new Option("Green text","green"));



quizes[0].createView();
quizes[0].example = "<html><head> </head> <body bgcolor='yellow'> <h1>Exercice1</h1><p>first line is black<br/> <font color=green>second line is green </font></p><a href='http://www.google.com'>click here to visit Google</a> </body></html>";


function verifyExistance(container,tagName){
	if(getNumberOfElements(container,tagName)>0){
		var regex = new RegExp(".*<"+tagName+".*>.*<\/"+tagName+">.*",'i');
		return regex.test(container.innerHTML);
	}
	return false;
}

function elementExistsIn(innerHTML,tagName){
	var tmpDiv = document.createElement('div');
	tmpDiv.innerHTML = innerHTML;
	if(getNumberOfElements(tmpDiv,tagName)>0){
		var regex = new RegExp(".*<"+tagName+".*>.*<\/"+tagName+">.*",'i');
		return regex.test(innerHTML);
	}
	return false;
}

quizes[0].verify = function(){
	this.clearStyle();
	this.saveWork();
	
	//var tmpDiv = document.createElement('div');
	//tmpDiv.innerHTML = this.solution;
	
	//verify html syntax
	var regex = /<html>.*<body.*bgcolor.*>.*<\/body><\/html>/i;
	//var regex = /<html><head>.*<\/head><body>.*<\/body><\/html>/i;
	this.options[0].setValideClass(regex.test(this.solution));
	
	var tmpBody = document.getElementById("viewer").contentWindow.document.body;
	//verify body background color
	this.options[1].setValideClass(isset(tmpBody.attributes['bgcolor']));
	
	//verify heading existance
	var heading_included = false;
	var i = 1;
	while(!heading_included && i<=6){
		heading_included = 	elementExistsIn(this.solution,'h'+i);
		i++;
	}
	this.options[2].setValideClass(heading_included);
	//verify paragraph existance
	this.options[3].setValideClass(elementExistsIn(this.solution,'p'));
	//verify line return
	this.options[4].setValideClass(getNumberOfElements(tmpBody,'br')>0);
	//verify link existance	
	this.options[5].setValideClass(elementExistsIn(this.solution,'a'));
	//verify font existance
	this.options[6].setValideClass(elementExistsIn(this.solution,'font'));

};



quizes.push(new Quiz("Include an image named logo.png in the center of page with 400px height and 200px width"));
quizes[1].addOption(new Option("Image included correctly ","."));
quizes[1].addOption(new Option("Image source","logo.png"));
quizes[1].addOption(new Option("Image position ","center"));
quizes[1].addOption(new Option("Image height ","200 px"));
quizes[1].addOption(new Option("Image width ","400 px"));
quizes[1].createView();
quizes[1].example = "<center><img src=logo.png height=200px width=400px align=center ></img></center>";
quizes[1].verify = function(){
	this.clearStyle();
	this.saveWork();

	var tmpDiv = document.createElement('div');
	tmpDiv.innerHTML = this.solution;
	//verify image existance

	if(getNumberOfElements(tmpDiv,'img')==1){
		this.options[0].setValideClass(true);
		
		var tmpImg = tmpDiv.getElementsByTagName('img')[0];

		//verify image source		
		if(isset(tmpImg.attributes['src']) && tmpImg.attributes['src'].value == 'logo.png'){
			this.options[1].setValideClass(true);
		}
		
		//verify image height
		if(isset(tmpImg.attributes['height']) && tmpImg.attributes['height'].value.match(200)){
			this.options[3].setValideClass(true);
		}

		//verify image width		
		if(isset(tmpImg.attributes['width']) && tmpImg.attributes['width'].value.match(400)){
			this.options[4].setValideClass(true);
		}
	
		//check image position
		if(isset(tmpImg.attributes['align']) && tmpImg.attributes['align'].value.match('center')){
			this.options[2].setValideClass(true);
		}else if(getNumberOfElements(tmpDiv,'center')==1){
			if(getNumberOfElements(tmpDiv.getElementsByTagName('center')[0],'img')==1){ this.options[2].setValideClass(true); }
		}
	
	}
};

quizes.push(new Quiz("أنشئ جدولا من سطرين و ثلاث أعمدة و ارتفاع 150 بيكسل و عرض 300 بيكسل كما في المثال"));

//quizes[0].addOption(new Option("","الإنشاء الصحيح للجدول"));
quizes[2].example = "<table style='text-align:center; margin:auto;' border=1 height=150px width=300px align=center ><tr><td>A</td> <td>B</td> <td>C</td></tr><tr><td>1</td> <td>2</td> <td>3</td></tr></table>";

quizes[2].addOption(new Option("الإدراج الصحيح للجدول","."));
quizes[2].addOption(new Option("عدد الأسطر","سطرين"));
quizes[2].addOption(new Option("عدد الأعمدة","3 أعمدة"));
quizes[2].addOption(new Option("إطار الجدول","1 بيكسل"));
quizes[2].addOption(new Option("ارتفاع الجدول","150 بيكسل"));
quizes[2].addOption(new Option("عرض الجدول ","300 بيكسل"));

quizes[2].createView();

quizes[2].verify = function(){
	this.clearStyle();
	//loading solution
	var tmpDiv = document.createElement('div');
	tmpDiv.innerHTML = this.solution;
	
	//check table existance
	if(getNumberOfElements(tmpDiv,'table')==1){
		this.options[0].setValideClass(true);
		
		//check table rows number
		var tmpTable = tmpDiv.getElementsByTagName('table')[0];
		if(getNumberOfElements(tmpTable,'tr') == 2){
			this.options[1].setValideClass(true);
			
			//check table columns number
			var tmpTr = tmpDiv.getElementsByTagName('tr');
			if(getNumberOfElements(tmpTr[0],'td')==3 && getNumberOfElements(tmpTr[1],'td')==3){
				this.options[2].setValideClass(true);
			}
		}		
		//check table border width
		this.options[3].setValideClass(isset(tmpTable.attributes['border']));
		
		//check table height
		this.options[4].setValideClass(isset(tmpTable.attributes['height']));
		
		//check table width
		this.options[5].setValideClass(isset(tmpTable.attributes['width']));
	}
};
