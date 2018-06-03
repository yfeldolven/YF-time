// the main idea here is i put all list names as values in listTitles in kokoj
// the isea is to to use dom to collect daata from inouts example
//if
let model = {

	// our main data belong to here
	kokoj : {
		listTitles:[],
		listItems:[],
		listColor:[]
	},

	// get the data from our localstorage
	lstorage : null ,


	// add array for evert list
	addItemArrays  : function(){
		while(this.kokoj.listItems.length<this.kokoj.listTitles.length){
			this.kokoj.listItems.push([]);
			localStorage.setItem('list', JSON.stringify(this.kokoj));
			break;
		} 
	}


};










































let control = {

	// checking if there is data or no
	start : function(){

		if( model.lstorage==null || model.lstorage.listTitles.length === 0 ){

			this.lstorage(false);
			view.start();


		}else{

			model.kokoj = model.lstorage ;

		}

	},

	ajax : function(){
		$.get("data.json", function(data, status){
			model.lstorage =  data ;
			model.kokoj = model.lstorage ;
			//console.log(  model.kokoj );
			control.render();
        });
	},

	// to update our localStorage after every change
	lstorage : function( noReload ){

		// $.PUT("data.json" , JSON.stringify(model.kokoj)  , function(){
		// 	console.log(model.kokoj);
		// 	JSON.stringify(model.kokoj) ;
		// 	//console.log(model.kokoj);
		// });

		// $.ajax({
		// 	url:"data.json",
		// 	type:"PUT",
		// 	data: model.kokoj ,
		// 	contentType:"application/json; charset=utf-8",
		// 	dataType:"json",
		// 	success: function(data, textStatus, jqXHR){
		// 		console.log(data);
		// 	}
		// });

		JSON.stringify( localStorage.setItem('list', model.kokoj) );
		

			window.location.reload(noReload);


	},


	
	// all click events are here
	// we use class name to know what is the target
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


	// all change events belong to here
	changeEvents : function(){
		document.addEventListener('change',function(e){


			// to change the color of the list
			if ( e.target.className === 'list color' ){

				view.listColor( model.kokoj , e );
				
			}

		})
	},


	// all keydown events are here
	keydownEvents : function(){
		document.addEventListener('keydown',function(e){

			// to add items to the list if it has real value not only space or tab
			if ( e.target.className === 'style list' && e.keyCode === 13 && e.target.value.match(/\S/g).length != 0 ){

				view.addItems( model.kokoj , e );

			}

			// editing the list name if it has real value not only space or tab
			if ( e.target.className === 'style name' && e.keyCode === 13 && e.target.value.match(/\S/g).length != 0 ){

				view.listNameEdit( model.kokoj , e );

			}

			// to edit items if it has real value not only space or tab
			if ( e.target.className === 'style item' && e.keyCode === 13 && e.target.value.match(/\S/g).length != 0 ){

				view.itemInputEdit( model.kokoj , e );

			}

		})
	},


	// here are all mouseover events
	mouseoverEvents : function(){

		document.addEventListener('mouseover',function(e){

			//to focus on inputs when just the mouse over instead of click everytime
			e.target.focus();
		});

	},


	// here all submit events belong to
	submitEvents : function(){

		document.addEventListener('submit',function(e){

			//to add new lists to the page if it has real value not only space or tab
			if ( e.target.className === 'NewList' && e.target.children[0].value.match(/\S/g).length != 0 ){

				view.addNewList( model.kokoj , e );
			}

		})

	},



	// to run the code of the page from modle or contorl or view
	// some of them must run in order be aware
	render : function(){
		view.html();
		//this.start();
		model.addItemArrays();
		view.list( model.kokoj );
		this.clickEvents();
		this.changeEvents();
		this.submitEvents();
		this.keydownEvents();
		this.mouseoverEvents();
		
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
			listColor.setAttribute('class','list color');
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
		console.log(  model.kokoj );
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

			control.lstorage();
	},


	listColor : function( list , e ){

		let lnum = e.target.parentElement.getAttribute('num');

		list.listColor[lnum] = e.target.value;
		e.target.parentElement.style.backgroundColor=list.listColor[lnum];

		// we not reload the page because we need the change event keep working while changing the colors
		control.lstorage( false );

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

		control.lstorage();
	},

	listClose : function(list , e){

		let lnum = e.target.parentElement.parentElement.getAttribute('num') ;

		list.listTitles.splice(lnum,1);
		list.listItems.splice(lnum,1);
		list.listColor.splice(lnum,1);

		control.lstorage();

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
	
		list.listItems[lnum][inum] = e.target.value;

		control.lstorage();
		
	},


	itemClose : function(list , e){

		let lnum = e.target.parentElement.parentElement.getAttribute('num'),
			inum = e.target.parentElement.id ;

		list.listItems[lnum].splice(inum,1);

		control.lstorage();

	},


	addItems : function( list , e ){

		let value= e.target.value,
			lnum = e.target.parentElement.getAttribute('num') ;

		list.listItems[lnum].push(value);

		control.lstorage();
  	}

};





control.ajax();