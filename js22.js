let model = {

	kokoj : {
		listTitles:[],
		listItems:[],
		listColor:[]
	},


	lstorage : JSON.parse(localStorage.getItem('list') ) ,



	while : function(){
		while(this.kokoj.listItems.length<this.kokoj.listTitles.length){
			this.kokoj.listItems.push([]);
			localStorage.setItem('list', JSON.stringify(this.kokoj));
			break;
		} 
	}


};





let control = {


	start : function(){

		if( model.lstorage==null || model.lstorage.listTitles.length === 0 ){

			localStorage.setItem('list' , JSON.stringify(model.kokoj) ) ;
			view.start();


		}else{

			model.kokoj = model.lstorage ;

		}

	},



	data: function(){

		if (!innn.value==''){

			kokoj.listTitles.push(innn.value);
			kokoj.listColor.push(colorid.value);
	
			localStorage.setItem('list', JSON.stringify(kokoj));
			lstorage = JSON.parse(localStorage.getItem('list') ) ;
	
		}
	
	},


	

	clickEvents : function(){
		document.addEventListener('click',function(e){

			if(e.target.tagName === 'P' && e.target.className === 'items'){
				view.itemEvent(model.kokoj , e)
			}


			if( e.target.className === 'close item' ){
				view.itemClose( model.kokoj , e );
			}


			if(e.target.className === 'name list'){
				view.listEvent(model.kokoj , e)
			}

			
			if( e.target.className === 'close list' ){
				view.listClose( model.kokoj , e );
			}
		
		});
	},


	changeEvents : function(){
		document.addEventListener('change',function(e){

			if ( e.target.parentElement.className === 'listt' && e.target.type === 'color' ){
				view.listColor( model.kokoj , e );
			}

		})
	},


	keydownEvents : function(){
		document.addEventListener('keydown',function(e){

			if ( e.target.className === 'style list' && e.keyCode === 13 && e.target.value.match(/\S/g).length != 0 ){

				view.listInputValue( model.kokoj , e );

			}

			if ( e.target.className === 'style name' && e.keyCode === 13 && e.target.value.match(/\S/g).length != 0 ){

				view.listNameEdit( model.kokoj , e );

			}

			if ( e.target.className === 'style item' && e.keyCode === 13 && e.target.value.match(/\S/g).length != 0 ){

				view.itemInputEdit( model.kokoj , e );

			}

		})
	},


	submitEvents : function(){
		document.addEventListener('submit',function(e){

			if ( e.target.className === 'NewList' && e.target.children[0].value.match(/\S/g).length != 0 ){

				view.addNewList( model.kokoj , e );
			}

		})
	},


	render : function(){
		view.html();
		this.start();
		model.while();
		view.list( model.kokoj );
		this.clickEvents();
		this.changeEvents();
		this.submitEvents();
		this.keydownEvents();
	}
};




let view ={
	html : function(){
		let form = document.createElement('form'),
			textInput = document.createElement('input'),
			colorInput = document.createElement('input'),
			addListInput =  document.createElement('input'),
			listDiv =  document.createElement('div'),
			fragmant = document.createDocumentFragment();


		textInput.setAttribute('type','text');
		colorInput.setAttribute('type','color');
		addListInput.setAttribute('type','submit');

		textInput.setAttribute('value','Name Your List');
		colorInput.setAttribute('value','#aaaaaa');
		addListInput.setAttribute('value','Add New List');

		form.setAttribute('id','NewList');
		textInput.setAttribute('id','input1');
		colorInput.setAttribute('id','colorid');

		listDiv.setAttribute('id','list');
		listDiv.setAttribute('class','list');
		form.setAttribute('class','NewList');


		form.appendChild(textInput);
		form.appendChild(colorInput);
		form.appendChild(addListInput);
		fragmant.appendChild(form);
		fragmant.appendChild(listDiv);
		document.body.appendChild(fragmant);

	},

	start : function(){
		let listEmpty = document.createElement('p'),
			listDiv = document.getElementById('list');

		listEmpty.textContent = 'The List Is Empty ' ;

		listDiv.appendChild(listEmpty);
	},
	
	
	list : function( list ){
		for (var i=0; i<list.listTitles.length; i++){
			let theList = document.createElement('span'),
			listColor = document.createElement('input'),
			mainInput =document.createElement('input'),
			listName = document.createElement('p'),
			close = document.createElement('SPAN'),
			closeIcon = document.createTextNode('\u00D7');


			listColor.setAttribute( 'type' , 'color' );
			listName.textContent = list.listTitles[i];
			listName.setAttribute( 'class' , 'name list' );
			mainInput.setAttribute( 'type' , 'text' );
			mainInput.setAttribute( 'class' , 'style list' );
	
			
			close.className = 'close list';
			close.appendChild(closeIcon);
			listName.appendChild(close);
	
	
			theList.setAttribute('class','listt');
			theList.setAttribute('num', i );
			theList.appendChild(listColor);
			theList.appendChild(listName);
			theList.appendChild(mainInput);
	
			listColor.setAttribute('value' , list.listColor[i] );
			theList.style.backgroundColor = list.listColor[i];
		
			this.items(theList , list , i);
		} 
	},


	items : function( parent , list , num ){

		for ( let s=0; s < list.listItems[num].length ; s++ ){
			let item = document.createElement('p'),
				itemClose = document.createElement('SPAN'),
				itemCloseTxt = document.createTextNode('\u00D7');


			item.textContent = list.listItems[num][s];
			item.setAttribute('class','items');
			item.setAttribute('id',s);


	 		itemClose.className = 'close item';
	 		itemClose.appendChild(itemCloseTxt);
	 		item.appendChild(itemClose);

			parent.appendChild(item) ;
			


		}
		document.getElementById('list').appendChild(parent);
	},

	addNewList : function( list , e ){

			list.listTitles.push(e.target.children[0].value);
			list.listColor.push(e.target.children[1].value);

			// i want remove this down to be in control
			localStorage.setItem('list', JSON.stringify(list));
	},


	listColor : function( list , e ){
		let lnum = e.target.parentElement.getAttribute('num');

		list.listColor[lnum] = e.target.value;
		e.target.parentElement.style.backgroundColor=list.listColor[lnum];

		// i want remove this down to be in control
		localStorage.setItem('list',JSON.stringify(list));
	},


	listEvent : function(list , e){
		let editInput = document.createElement('input'),
			lnum = e.target.parentElement.getAttribute('num');

			editInput.setAttribute('type','text');
			editInput.setAttribute('value',list.listTitles[lnum]);
			editInput.setAttribute('class','style name');

			e.target.replaceWith(editInput);

	},

	listNameEdit : function( list , e ){
		let lnum = e.target.parentElement.getAttribute('num');

		list.listTitles[lnum] = e.target.value;

		// i want remove this down to be in control
		localStorage.setItem('list', JSON.stringify(list));
		window.location.reload();
	},

	listClose : function(list , e){
		let lnum = e.target.parentElement.parentElement.getAttribute('num') ;
				list.listTitles.splice(lnum,1);
				list.listItems.splice(lnum,1);
				list.listColor.splice(lnum,1);

				// i want remove this down to be in control
				localStorage.setItem('list', JSON.stringify(list)) ;
				window.location.reload(); 
	},


	itemEvent : function(list , e){
		let editInput = document.createElement('input');
			lnum = e.target.parentElement.getAttribute('num'),
			inum = e.target.id ;

		editInput.setAttribute('type','text');
		editInput.setAttribute('value',list.listItems[lnum][inum]);
		editInput.setAttribute('class','style item');
		editInput.setAttribute('id', inum );


		e.target.replaceWith(editInput);

	},

	itemInputEdit : function( list , e ){

		let lnum = e.target.parentElement.getAttribute('num'),
			inum = e.target.id ;
	
		list.listItems[lnum][inum]= e.target.value;

		// i want remove this down to be in control
		localStorage.setItem('list', JSON.stringify(list));
		window.location.reload();
		
	},


	itemClose : function(list , e){
		let lnum = e.target.parentElement.parentElement.getAttribute('num'),
			inum = e.target.parentElement.id ;

		list.listItems[lnum].splice(inum,1);
		// i want remove this down to be in control
		localStorage.setItem('list', JSON.stringify(list)); 
		window.location.reload(); 
	},


	listInputValue : function( list , e ){

		let value= e.target.value,
			lnum = e.target.parentElement.getAttribute('num') ;

		list.listItems[lnum].push(value);

		// i want remove this down to be in control
		localStorage.setItem('list', JSON.stringify(list));
	    window.location.reload();
  	}

};





control.render();











// // element list
// var listv=document.getElementById('list');
// // innn the list name input
// var innn= document.getElementById('input1'),
// 	colorid = document.getElementById('colorid');

// var lstorage = JSON.parse(localStorage.getItem('list') ) ,
// 	kokoj = lstorage;

//add event listner on submit for add new list
//document.getElementById('NewList').addEventListener('submit', dataaa ) ;



//cheching if there Names or writes it's embty
// if (lstorage==null || lstorage.listTitles.length==0){
// 	var p= document.createElement('p');
// 	p.textContent='The List Is Embty';
// 	listv.appendChild(p); 
// 	kokoj={
// 		listTitles:[],
// 		listItems:[],
// 		listColor:[]
// 	};

// } else {
// 	kokoj= JSON.parse(localStorage.getItem('list') ) ;


	//listn(lstorage.listTitles);



//function for event listner will be Ajax later
// function dataaa(e){
// 	if (!innn.value==''){
// 		kokoj.listTitles.push(innn.value);
// 		kokoj.listColor.push(colorid.value);

// 		localStorage.setItem('list', JSON.stringify(kokoj));
// 		lstorage = JSON.parse(localStorage.getItem('list') ) ;

// 	}

// }



// // function to create list names depending on arry length
// function listn(arryname){ 
// 	for (var i=0; i<arryname.length; i++){

// 		var span= document.createElement('span');
// 		var colorls= document.createElement('input');
// 		colorls.setAttribute('type','color');
// 		var iinput=document.createElement('input');
// 		var pp= document.createElement('p');
// 		pp.textContent=arryname[i];
// 		iinput.setAttribute('type','text');
// 		iinput.setAttribute('class','style');

		

// 		var span3 = document.createElement('SPAN');
// 		var txt2 = document.createTextNode('\u00D7');
// 		span3.className = 'close';
// 		span3.appendChild(txt2);
// 		pp.appendChild(span3);


// 		span.setAttribute('class','listt');
// 		span.appendChild(colorls);
// 		span.appendChild(pp);
// 		span.appendChild(iinput);


// 		//change color
// 		colorls.addEventListener('change',(function(i){
// 			return function(){
// 				kokoj.listColor[i]=this.value;
// 				localStorage.setItem('list',JSON.stringify(kokoj));
// 				lstorage = JSON.parse(localStorage.getItem('list') ) ;
// 				this.parentElement.style.backgroundColor=lstorage.listColor[i];
// 			}; 
// 		} )(i) );


// 		// remove list
// 		span3.addEventListener('click' , (function(i) {
// 			return function(){
// 				kokoj.listTitles.splice(i,1);
// 				kokoj.listItems.splice(i,1);
// 				kokoj.listColor.splice(i,1);

// 				localStorage.setItem('list', JSON.stringify(kokoj)) ;
// 				window.location.reload(); 
// 			};
// 		} )(i)  ) ;

// 		colorls.setAttribute('value',lstorage.listColor[i]);
// 		span.style.backgroundColor=lstorage.listColor[i];

// 		listv.appendChild(span);


// 		pp.addEventListener('click' ,(function(i) {
// 			return function(){
// 				var input3 = document.createElement('input');
// 				input3.setAttribute('type','text');
// 				input3.setAttribute('value',arryname[i]);
// 				input3.setAttribute('class','style');

// 				this.replaceWith(input3);

// 				input3.addEventListener('keydown',function(e){
// 					if(e.keyCode=== 13){ 
// 						kokoj.listTitles[i]=input3.value;
// 						localStorage.setItem('list', JSON.stringify(kokoj));
// 						window.location.reload();
// 					}
// 		    });
// 			};
//     	 }(i) )  );
    	
    	


// 		function itemInput(i){
// 			return function(){
// 				iinput.addEventListener('keydown', function(e){
// 					if(e.keyCode==13){
// 						var vvalue= e.target.value;
// 						lstorage = JSON.parse(localStorage.getItem('list') ) ;

// 						kokoj.listItems[i].push(vvalue);


// 		    localStorage.setItem('list', JSON.stringify(kokoj));
// 		    lstorage = JSON.parse(localStorage.getItem('list') ) ;
// 	        window.location.reload();
//   	        }
//   	        }
// 		  ); 
// 			}();
// 		} itemInput(i) ;   



// 		itemss(span,i);
// 	},


// 	items : function itemss(parent,arryname){
// 		    while(kokoj.listItems.length<kokoj.listTitles.length){
// 		kokoj.listItems.push([]);
// 		localStorage.setItem('list', JSON.stringify(kokoj));
// 		break;
// 		     } 

// 	for (var s=0; s<kokoj.listItems[arryname].length ;s++){
// 		var ssh= document.createElement('p');
// 		ssh.textContent=lstorage.listItems[arryname][s];
// 		ssh.setAttribute('class','items');
// 		ssh.setAttribute('id',s);

// 		var span2 = document.createElement('SPAN');
//  		var txt = document.createTextNode('\u00D7');
//  		span2.className = 'close';
//  		span2.appendChild(txt);
//  		ssh.appendChild(span2);

// 		parent.appendChild(ssh) ;    
    	

//     	function events(s){
// 			return function(){
			
//   	    ssh.addEventListener('click',function(e){

//   		switch(e.target.tagName){


//      	case ('P') : 
//      	var input3 = document.createElement('input');
// 						input3.setAttribute('type','text');
// 						input3.setAttribute('value',kokoj.listItems[arryname][s]);
// 						input3.setAttribute('class','style items');
// 						input3.setAttribute('id',s);

// 						this.replaceWith(input3);

// 						input3.addEventListener('keydown',function(e){
// 							if(e.keyCode=== 13){
// 								kokoj.listItems[arryname][s]= e.target.value;
// 								localStorage.setItem('list', JSON.stringify(kokoj));
// 								window.location.reload();
// 							}
// 						});
//      	 break ;


//      	case('SPAN'): 
//      	kokoj.listItems[arryname].splice(s,1);
//     	localStorage.setItem('list', JSON.stringify(kokoj)); 
// 						window.location.reload(); 
//      	 break ;


//      	default:  
//      	 break;
// 					} 
// 				});

// 			}(); } events(s) ;

	
		
// 	    }
// }

// }

   

// function itemss(parent,arryname){
// 		    while(kokoj.listItems.length<kokoj.listTitles.length){
// 		kokoj.listItems.push([]);
// 		localStorage.setItem('list', JSON.stringify(kokoj));
// 		break;
// 		     } 

// 	for (var s=0; s<kokoj.listItems[arryname].length ;s++){
// 		var ssh= document.createElement('p');
// 		ssh.textContent=lstorage.listItems[arryname][s];
// 		ssh.setAttribute('class','items');
// 		ssh.setAttribute('id',s);

// 		var span2 = document.createElement('SPAN');
//  		var txt = document.createTextNode('\u00D7');
//  		span2.className = 'close';
//  		span2.appendChild(txt);
//  		ssh.appendChild(span2);

// 		parent.appendChild(ssh) ;    
    	

//     	function events(s){
// 			return function(){
			
//   	    ssh.addEventListener('click',function(e){

//   		switch(e.target.tagName){


//      	case ('P') : 
//      	var input3 = document.createElement('input');
// 						input3.setAttribute('type','text');
// 						input3.setAttribute('value',kokoj.listItems[arryname][s]);
// 						input3.setAttribute('class','style items');
// 						input3.setAttribute('id',s);

// 						this.replaceWith(input3);

// 						input3.addEventListener('keydown',function(e){
// 							if(e.keyCode=== 13){
// 								kokoj.listItems[arryname][s]= e.target.value;
// 								localStorage.setItem('list', JSON.stringify(kokoj));
// 								window.location.reload();
// 							}
// 						});
//      	 break ;


//      	case('SPAN'): 
     	// kokoj.listItems[arryname].splice(s,1);
    	// localStorage.setItem('list', JSON.stringify(kokoj)); 
		// 				window.location.reload(); 
//      	 break ;


//      	default:  
//      	 break;
// 					} 
// 				});

// 			}(); } events(s) ;

	
		
// 	    }
// }


document.addEventListener('mouseover',function(e){
	e.target.focus();
});


// // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById('myBtn');

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName('close')[0];

// // When the user clicks on the button, open the modal 
// btn.onclick = function() {
// 	modal.style.display = 'block';
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
// 	modal.style.display = 'none';
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
// 	if (event.target == modal) {
// 		modal.style.display = 'none';
// 	}
// };