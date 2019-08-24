var move=document.getElementById('move');
var pos=0;
var height=270;
var id1;
// var id=setInterval(jump,1);
function movement(key){
	console.log("movement");
	if(key.keyCode==39){
		pos+=5;
		move.style.left=pos+'px';
		if(pos>=1000){
			pos-=5;
		}
	}
	if(key.keyCode==37){
		pos-=5;
		move.style.left=pos+'px';
		if(pos<=-5){
			pos+=5;
		}
	}
	if(key.keyCode==32){
		if(height<=265){
			clearInterval(id);
			id1=setInterval(fallback,1);
		}
		else{
			height-=150;
			move.style.top=height+'px';
		}
	}
	// if(key.keyCode==32){
	// 	if(height>=270){
	// 		clearInterval(id1);
	// 	}
	// 	else{
	// 		height+=150;
	// 		move.style.top=height+'px';
	// 	}
	// }
}
function jump(key){
	
	// console.log("s");
	// if(key.keyCode==32){
	// 	if(height<=265){
	// 		clearInterval(id);
	// 		id1=setInterval(fallback,1);
	// 	}
	// 	else{
	// 		height-=150;
	// 		move.style.top=height+'px';
	// 	}
	// }
}
function jumpback(key){
	if(key.keyCode==32){
		if(height>=270){
			clearInterval(id1);
		}
		else{
			height+=150;
			move.style.top=height+'px';
		}
	}
}
// document.onkeydown=movement;
document.onkeydown=movement;
document.onkeyup=jumpback;
// function jump(key){
// 	if(key.keyCode==13){
// 		if(!jumping){
// 			jumping=true;
// 			setTimeout(land, 1000);
// 		}
// 	}
// }
// if(jumping){
// 	y-=jumpheight;
// }
// function land(){
// 	jumping=false;
// }
// document.onkeydown=jump;
// var x=0;
// //selection of id path
// function start(){
// 	// if(key.keyCode==32)
// 		var x=0;
// 		var road=document.getElementById('path');
// 		road.style.backgroundPosition=x+'px';
// 		x=x-1;
// }