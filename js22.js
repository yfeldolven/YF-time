let model = {

	kokoj : {
		listTitles:[],
		listItems:[],
		listColor:[]
	},


	lstorage : JSON.parse(localStorage.getItem('list') ) ,



	addItemArrays  : function(){
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

	lstorage : function(){
		localStorage.setItem('list', JSON.stringify(model.kokoj));
		window.location.reload();
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



	mouseoverEvents : function(){
		document.addEventListener('mouseover',function(e){
			e.target.focus();
		});
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

			control.lstorage();
	},


	listColor : function( list , e ){

		let lnum = e.target.parentElement.getAttribute('num');

		list.listColor[lnum] = e.target.value;
		e.target.parentElement.style.backgroundColor=list.listColor[lnum];

		control.lstorage();

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
	
		list.listItems[lnum][inum]= e.target.value;

		control.lstorage();
		
	},


	itemClose : function(list , e){
		let lnum = e.target.parentElement.parentElement.getAttribute('num'),
			inum = e.target.parentElement.id ;

		list.listItems[lnum].splice(inum,1);

		control.lstorage();

	},


	listInputValue : function( list , e ){

		let value= e.target.value,
			lnum = e.target.parentElement.getAttribute('num') ;

		list.listItems[lnum].push(value);

		control.lstorage();
  	}

};





control.render();