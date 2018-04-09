// element list
var listv=document.getElementById("list");
// innn the list name input
var innn= document.getElementById("input1"),
colorid = document.getElementById('colorid');

var lstorage = JSON.parse(localStorage.getItem('list') ) ;

//add event listner on submit for add new list
document.getElementById("NewList").addEventListener('submit', dataaa ) ;



//cheching if there Names or writes it's embty
if (lstorage==null || lstorage.listTitles.length==0){
	var p= document.createElement('p');
		p.textContent='The List Is Embty';
	listv.appendChild(p); 
	var kokoj={
		listTitles:[],
		listItems:[]
	}
	kokoj.color=lstorage.color;
	localStorage.setItem('list', JSON.stringify(kokoj));
	lstorage = JSON.parse(localStorage.getItem('list') ) ;
	document.body.style.backgroundColor=lstorage.color;


} else {
	kokoj= JSON.parse(localStorage.getItem('list') ) ;
	listn(lstorage.listTitles);
	document.body.style.backgroundColor=lstorage.color;
}


//page color
colorid.addEventListener('change',function(){
	kokoj.color=colorid.value;
	localStorage.setItem('list', JSON.stringify(kokoj));
	lstorage = JSON.parse(localStorage.getItem('list') ) ;
	document.body.style.backgroundColor=lstorage.color;
});



//function for event listner will be Ajax later
function dataaa(e){
    if (!innn.value==''){
		kokoj.listTitles.push(innn.value);
		localStorage.setItem('list', JSON.stringify(kokoj));
		lstorage = JSON.parse(localStorage.getItem('list') ) ;
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
		iinput.setAttribute('class','style');

		

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
        kokoj.listTitles.splice(i,1);
        kokoj.listItems.splice(i,1);

    	localStorage.setItem('list', JSON.stringify(kokoj)) 
        window.location.reload(); }
    	 })(i)


		listv.appendChild(span);




		pp.onclick = (function(i) {
		return function(){
		var input3 = document.createElement("input");
		input3.setAttribute('type','text');
		input3.setAttribute('value',arryname[i]);
		input3.setAttribute('class','style');

		this.replaceWith(input3);

		input3.addEventListener("keydown",function(e){
			if(e.keyCode=== 13){ 
				kokoj.listTitles[i]=input3.value;
				localStorage.setItem('list', JSON.stringify(kokoj));
				window.location.reload();
			}
		})
        }
    	 }(i))
    	
    	


		function itemInput(i){
			return function(){
			iinput.addEventListener('keydown', function(e){
			if(e.keyCode==13){
			var vvalue= e.target.value;
			lstorage = JSON.parse(localStorage.getItem('list') ) ;

			kokoj.listItems[i].push(vvalue);


		    localStorage.setItem('list', JSON.stringify(kokoj));
		    lstorage = JSON.parse(localStorage.getItem('list') ) ;
	        window.location.reload();
  	        }
  	        }
		  ); 
			}()
		} itemInput(i) ;   



		     itemss(span,i);


    }   
}

   

		function itemss(parent,arryname){
		    while(kokoj.listItems.length<kokoj.listTitles.length){
			kokoj.listItems.push([]);
			localStorage.setItem('list', JSON.stringify(kokoj));
				break;
		     } 
		for (var s=0; s<kokoj.listItems[arryname].length ;s++){
		var ssh= document.createElement('p');
		ssh.textContent=lstorage.listItems[arryname][s];
		

		var span2 = document.createElement("SPAN");
 		var txt = document.createTextNode("\u00D7");
 		span2.className = "close";
 		span2.appendChild(txt);
 		ssh.appendChild(span2);

		parent.appendChild(ssh) ;    

		span2.onclick = (function(s) {
		return function(){
        kokoj.listItems[arryname].splice(s,1);
    	localStorage.setItem('list', JSON.stringify(kokoj)) 
        window.location.reload(); }
    	 })(s)


    	
    	ssh.onclick = (function(s) {
		return function(){
		var input3 = document.createElement("input");
		input3.setAttribute('type','text');
		input3.setAttribute('value',kokoj.listItems[arryname][s]);
		input3.setAttribute('class','style');

		this.replaceWith(input3);

		input3.addEventListener("keydown",function(e){
			if(e.keyCode=== 13){
				kokoj.listItems[arryname][s]= e.target.value;
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