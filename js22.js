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
	lstorage : JSON.parse(localStorage.getItem('list') ) ,


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

			localStorage.setItem('list' , JSON.stringify(model.kokoj) ) ;
			view.start();


		}else{

			model.kokoj = model.lstorage ;

		}

	},

	// to update our localStorage after every change
	lstorage : function( noReload ){

		if ( noReload === true ){

			localStorage.setItem('list', JSON.stringify(model.kokoj));

		} else {

			localStorage.setItem('list', JSON.stringify(model.kokoj));

			//window.location.reload();

		}

	},


	
	// all click events are here
	// we use class name to know what is the target
	clickEvents : function(){
		document.addEventListener('click',function(e){

			if(e.target.tagName === 'P' && e.target.className === 'items'){
				view.itemInput(model.kokoj , e)
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
			if ( e.target.className === 'style list' && e.keyCode === 13 && e.target.value.match(/\S/g)  ){

				view.addItems( model.kokoj , e );

			}

			// editing the list name if it has real value not only space or tab
			if ( e.target.className === 'style name' && e.keyCode === 13 && e.target.value.match(/\S/g)  ){

				view.listNameEdit( model.kokoj , e );

			}

			// to edit items if it has real value not only space or tab
			if ( e.target.className === 'style item' && e.keyCode === 13 && e.target.value.match(/\S/g) ){

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
			if ( e.target.className === 'NewList' && e.target.children[0].value.match(/\S/g) ){

				view.addNewList( model.kokoj , e );

				e.preventDefault();
			}

			e.preventDefault();

		})

	},



	// to run the code of the page from modle or contorl or view
	// some of them must run in order be aware
	render : function(){
		view.html();
		this.start();
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

			this.items(

				this.listElement(
					this.listNameElement( list.listTitles[i] ),
					i ,
					list.listColor[i]
				),

				list ,

				i
			);

		} 
	},



	items : function( parent , list , num ){

		for ( let s=0; s < list.listItems[num].length ; s++ ){

			parent.appendChild(
				this.itemElement(
				num ,
				s ,
				list.listItems[num][s]
				)
			);
			
		}

		document.getElementById('list').appendChild(parent);
	},



	addNewList : function( list , e ){
		let listDiv = document.getElementById('list') ;

		list.listTitles.push(e.target.children[0].value);

		list.listItems.push([]);

		list.listColor.push(e.target.children[1].value);


		if( listDiv.children[0].tagName == 'P' ){
			listDiv.children[0].remove();
		}

		listDiv.appendChild(

			this.listElement(

				this.listNameElement(e.target.children[0].value),

				list.listTitles.length-1 ,

				e.target.children[1].value
			)
		);


		control.lstorage(true);

		e.target.children[0].value = '' ;

	},




	listColor : function( list , e ){

		let lnum = e.target.parentElement.getAttribute('num');

		list.listColor[lnum] = e.target.value;
		e.target.parentElement.style.backgroundColor=list.listColor[lnum];

		// we not reload the page because we need the change event keep working while changing the colors
		control.lstorage( noReload = true );

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
		
		e.target.replaceWith(
			this.listNameElement(
				e.target.value
			)
		);

		control.lstorage(true);
	},



	listClose : function(list , e){

		let lnum = e.target.parentElement.parentElement.getAttribute('num') ;

		list.listTitles.splice(lnum,1) ;
		list.listItems.splice(lnum,1) ;
		list.listColor.splice(lnum,1) ;

		control.lstorage(true);

		e.target.parentElement.parentElement.remove();
		this.updateNumAttr();

		control.start();

	},

	updateNumAttr : function(){
		let numsAttr = document.querySelectorAll('.listt');
		for (let n = 0 ; n < numsAttr.length ; n++ ){
			numsAttr[n].setAttribute( 'num' , n ) ;
			//console.log( numsAttr[n] );
		}
	},




	itemInput : function(list , e){

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
		
		e.target.replaceWith(
			this.itemElement(
				lnum , 
				inum ,
				e.target.value
			)
		);
		
		control.lstorage(true);
		
	},



	itemClose : function(list , e){

		let lnum = e.target.parentElement.parentElement.getAttribute('num'),
			inum = e.target.parentElement.id ,
			span = e.target.parentElement.parentElement ;

		list.listItems[lnum].splice( inum , 1 );

		control.lstorage(true);

		e.target.parentElement.remove();

		this.updateIdAttr( span );

	},



	updateIdAttr : function( span ){

		let numsAttr = span.querySelectorAll('.items');

		for (let n = 0 ; n < numsAttr.length ; n++ ){

			numsAttr[n].setAttribute( 'id' , n ) ;

		}
	},




	addItems : function( list , e ){

		let value= e.target.value,
			lnum = e.target.parentElement.getAttribute('num') ;
		

		e.target.parentElement.appendChild(
			this.itemElement(
				lnum ,
				list.listItems[lnum].length ,
				value 
			) 
		);

		list.listItems[lnum].push(value);
		e.target.value = '' ;

		control.lstorage(true);
	  },




	  itemElement : function( lnumNum , inumNum , value , parent ){
		let lnum = lnumNum ,
			inum = inumNum ,
			item = document.createElement('p'),
			itemClose = document.createElement('SPAN'),
			itemCloseTxt = document.createTextNode('\u00D7');

		item.textContent = value ;
		item.setAttribute('class','items');
		item.setAttribute('id', inum );


		itemClose.className = 'close item';
		itemClose.appendChild(itemCloseTxt);
		item.appendChild(itemClose);

		return item ;

	  },




	  listNameElement : function( name ){
		let listName = document.createElement('p'),
			close = document.createElement('SPAN'),
			closeIcon = document.createTextNode('\u00D7');

		listName.textContent = name;
		listName.setAttribute( 'class' , 'name list' );

		close.className = 'close list';
		close.appendChild(closeIcon);
		listName.appendChild(close);

		return listName ;
	  },




	  listElement : function ( name , Num , color) {

		let theList = document.createElement('span'),
		listColor = document.createElement('input'),
		mainInput =document.createElement('input');


		listColor.setAttribute( 'type' , 'color' );
		listColor.setAttribute('class','list color');
		mainInput.setAttribute( 'type' , 'text' );
		mainInput.setAttribute( 'class' , 'style list' );


		theList.setAttribute('class','listt');
		theList.setAttribute('num', Num );

		theList.appendChild(listColor);
		theList.appendChild(name);
		theList.appendChild(mainInput);

		listColor.setAttribute('value' , color );
		theList.style.backgroundColor = color ;

		return theList ;

	  }

};





control.render();