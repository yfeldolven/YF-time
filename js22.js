// element list
var listv=document.getElementById("list");
// innn the list name input
var innn= document.getElementById("input1");
innn.focus();

var lstorage = JSON.parse(localStorage.getItem('list') ) ;



//add event listner on submit for add new list
document.getElementById("NewList").addEventListener('submit', dataaa ) ;



//cheching if there Names or writes it's embty
if (lstorage==null){
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

		kokoj.listTitles[innn.value]=[];

		var span= document.createElement('span');
		var iinput=document.createElement('input');
		var pp= document.createElement('p');
		pp.textContent=innn.value;
		iinput.setAttribute('type','text');
		span.setAttribute('class','listt');
		span.appendChild(pp);
		span.appendChild(iinput);
		listv.appendChild(span);

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
		span.setAttribute('class','listt');
		span.appendChild(pp);
		span.appendChild(iinput);
		listv.appendChild(span);

		sdd(span,arryname[i]);

    }    
}

function sdd(parent,arryname){
	for (var s=0; s<lstorage.listTitles[arryname].length ;s++){
		var ssh= document.createElement('p');
		ssh.textContent=lstorage.listTitles[arryname][s];
		parent.appendChild(ssh) ;
		
	}
}


listv.addEventListener('keydown', function(e){
	if(e.keyCode==13){
	var vvalue= e.target.value;
	var kkkk= e.target.parentElement;
	var joik=e.target.parentElement.firstChild.textContent;
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



/*
listv.addEventListener('keydown', itemss );

function itemss(){

for (var i=0 ; i<kokoj.listTitles.length ; i++){
	(function (i){

	var mm=document.getElementById("l"+i);
	mm.addEventListener('keydown', function(e){
		if ( e.keyCode == 13 ) {
			var nnn=document.getElementById("l"+i).value;
				titleItems[i].push(nnn);
				for (var j=0; j < titleItems.length ; j++){
				
				
					document.getElementById("v"+i).innerHTML =  "<p>"+titleItems[i][j]+"</p>";
	
					window.console.log(titleItems[i]);
				}//end for loop
									}// end if
																			 });
	}(i));
                           }//end of first foor loop
						   					 } // end of list function

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