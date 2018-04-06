// // element list
// var listv=document.getElementById("list");
// // innn the list name input
// var input1= document.getElementById("input1");
// //input1.focus();

// //console.log(input1.focus()==true);

// input1.onfocus= function (e) {


// }
// var hh=800;
    
// window.onscroll= function(){

// console.log( ( (window.pageYOffset/hh)  *100).toFixed() > 80);
// console.log( window.clientHieght  ); //window.pageYOffset );

// }

var myVar = setInterval(myTimer, 500);

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}