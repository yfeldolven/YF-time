// get the List names
var cc=JSON.parse( localStorage.getItem('list'));
// element list
var listv=document.getElementById("list");
// innn the list input
var innn= document.getElementById("tester");
// list item input
var itemin='';
// get items of lists
var ii=JSON.parse( localStorage.getItem('items'));

//add event listner on submit for add new list
document.getElementById("NewList").addEventListener('submit', dataaa ) ;
//cheching if there Names or writes it's embty
if (cc==null){
	listv.textContent = 'The List Is Embty' }
else {listn(cc);
} ;




//function for event listner will be Ajax later
function dataaa(e){
	if (cc==null){
	innn= document.getElementById("tester").value;
	if (!innn==''){localStorage.setItem('list', JSON.stringify([innn]));
	cc=JSON.parse( localStorage.getItem('list'));
	listn(cc);}
	e.preventDefault();
	 }

	else {
	innn= document.getElementById("tester").value;
	if (!innn==''){cc.push(innn);
	localStorage.setItem('list', JSON.stringify(cc));
	listn(cc); }
	e.preventDefault(); }
};

// function to create list names depending on arry length
function listn(arryname){
	for (var n='', nnn=[], i=0; i<arryname.length; i++){
		nnn.push([]);
		localStorage.setItem('items', JSON.stringify(nnn));

	if(i%2===0){ 
		n += '<span class="listt"> '+cc[i]+'<input type="text" /></span>';
		listv.addEventListener('keydown', itemss)
	else{ 
		n += '<span class="listt2"> '+cc[i]+'<input type="text" /></span>';
	listv.innerHTML = n;
        }
     }
//add event listener on click enter when add items to lists
    //listv.addEventListener('keydown', itemss);
}

function arrylen(arryname){
var len= arryname.length;
}


function itemss(e){
     			if (e.keyCode == 13  ) { 
					var len = cc.length;
				 // if(){ 
					// if (ii==null){
					// itemin=event.target.value;
					// if (!itemin==''){localStorage.setItem('items', JSON.stringify([[itemin]]));
					// ii=JSON.parse( localStorage.getItem('items'));}
					// for (var n='',i=0; i<ii.length; i++){
					// } 
					// e.preventDefault();
					//  }

											// else {
							//itemin= event.target.value;
							//alert("g"+i) ;
							itemin= document.getElementById(0).value;
							if (!itemin==''){ii[0].push(itemin);
							localStorage.setItem('items', JSON.stringify(ii));
							for (var n='',i=0; i<ii.length; i++){
							 }} 
							e.preventDefault(); //} 
						 // }
						   }
						   }

	listv.innerHTML = n;
               }

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