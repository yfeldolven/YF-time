// element list
var listv=document.getElementById("list");
// innn the list name input
var innn= document.getElementById("input1");

var lstorage = JSON.parse(localStorage.getItem('list') ) ;

//add event listner on submit for add new list
document.getElementById("NewList").addEventListener('submit', dataaa ) ;



//cheching if there Names or writes it's embty
if (lstorage==null || Object.keys(lstorage.listTitles)==0){
	var p= document.createElement('p');
		p.textContent='The List Is Embty';
	listv.appendChild(p); 
	var kokoj={
		listTitles:{}
	}
} else {
	kokoj= JSON.parse(localStorage.getItem('list') ) ;
	listn(Object.keys(lstorage.listTitles));
}






//function for event listner will be Ajax later
function dataaa(e){
    if (!innn.value==''){
    	if (kokoj.listTitles[innn.value]==undefined){

		kokoj.listTitles[innn.value]=[];
		localStorage.setItem('list', JSON.stringify(kokoj));
		lstorage = JSON.parse(localStorage.getItem('list') ) ;
							}
                        }
                  }

// function to create list names depending on arry length
function listn(arryname){
	for (var i=0; i<arryname.length; i++){

		var span= document.createElement('span');
		var iinput=document.createElement('input');
		var pp= document.createElement('p');
		pp.textContent=arryname[i];
		iinput.setAttribute('type','text');

		

		var span3 = document.createElement("SPAN");
 		var txt2 = document.createTextNode("\u00D7");
 		span3.className = "close";
 		span3.appendChild(txt2);
 		pp.appendChild(span3);


 		span.setAttribute('class','listt');
		span.appendChild(pp);
		span.appendChild(iinput);


		span3.onclick = (function(i) {
		return function(){
        delete kokoj.listTitles[arryname[i]];
    	localStorage.setItem('list', JSON.stringify(kokoj)) 
        window.location.reload(); }
    	 })(i)


		listv.appendChild(span);

		itemss(span,arryname[i]);




		pp.onclick = (function(i) {
		return function(){
		var input3 = document.createElement("input");
		input3.setAttribute('type','text');
		input3.setAttribute('value',arryname[i]);
		input3.setAttribute('class','style');

		this.replaceWith(input3);

		input3.addEventListener("keydown",function(e){
			if(e.keyCode=== 13){
				kokoj.listTitles[input3.value] = kokoj.listTitles[arryname[i]];
				if(input3.value != arryname[i]){
				delete kokoj.listTitles[arryname[i]]; }
				localStorage.setItem('list', JSON.stringify(kokoj));
				window.location.reload();
			}
		})
        }
    	 })(i)




		iinput.addEventListener('keydown', function(e){
			if(e.keyCode==13){
			var vvalue= e.target.value;
			var kkkk= e.target.parentElement;
			var joik=e.target.parentElement.firstChild.firstChild.textContent;
			lstorage = JSON.parse(localStorage.getItem('list') ) ;

			if(kokoj.listTitles[joik]==null){
				kokoj.listTitles[joik]=[vvalue];
			} else {
			kokoj.listTitles[joik].push(vvalue);
			}


		    localStorage.setItem('list', JSON.stringify(kokoj));
		    lstorage = JSON.parse(localStorage.getItem('list') ) ;
	        window.location.reload();
  	        }
        });



    }    
}


		function itemss(parent,arryname){
		for (var s=0; s<lstorage.listTitles[arryname].length ;s++){
		var ssh= document.createElement('p');
		ssh.textContent=lstorage.listTitles[arryname][s];
		

		var span2 = document.createElement("SPAN");
 		var txt = document.createTextNode("\u00D7");
 		span2.className = "close";
 		span2.appendChild(txt);
 		ssh.appendChild(span2);

		parent.appendChild(ssh) ;    

		span2.onclick = (function(s) {
		return function(){
        kokoj.listTitles[arryname].splice(s,1);
    	localStorage.setItem('list', JSON.stringify(kokoj)) 
        window.location.reload(); }
    	 })(s)


    	
    	ssh.onclick = (function(s) {
		return function(){
		var input3 = document.createElement("input");
		input3.setAttribute('type','text');
		input3.setAttribute('value',kokoj.listTitles[arryname][s]);
		input3.setAttribute('class','style');

		this.replaceWith(input3);

		input3.addEventListener("keydown",function(e){
			if(e.keyCode=== 13){
				kokoj.listTitles[arryname][s]= e.target.value;
				localStorage.setItem('list', JSON.stringify(kokoj));
				window.location.reload();
			}
		})
        }
    	 })(s)
    	
		
		
	    }
		}


document.addEventListener('mouseover',function(e){

     switch(e.target.tagName){
     	case ('FORM') : e.target.querySelector("input").focus()
     	 break ;
     	case ('SPAN'): e.target.querySelector("span > input").focus()
     	 break ;
     	case('INPUT'): e.target.focus()
     	 break ;
     	default : 
     	 break;
     }
    
})

//console.log(e.target.tagName) //
//e.target.parentElement.parentElement.parentElement.querySelector("input").focus()

/*
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/