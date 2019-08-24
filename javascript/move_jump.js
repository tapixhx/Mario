window.onload=function(){
var x=2;
var y=500;
var limit=351; //y becomes 350 go to else statement
var jump_y=y-50;
var key,pos=0;
var down=false;
var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var background = new Image();
background.src="../image/background1.png";
background.onload=function(){
	ctx.drawImage(background,0,0);
}
var img=new Image();
img.onload=function()
{
  ctx.drawImage(img,x,y,100,100);
}
img.src="../image/mario.gif";
var Jump = function(){
    if(y > limit && !down){
        y-=150;
        console.log('jumping: ' + y);
    } 
    else{
    	down = true;
        y +=150;
        if(y > jump_y){
            clearInterval(jumping);
            down = false;
        }

    }
}
document.onkeydown=function(e)
{
  pos=1;
  key=e.keyCode;
}
// if(key==32)jumping=setInterval(Jump,10);
document.onkeyup=function(e){pos=0;}
setInterval(function()
{
	if(pos==0)return;
if(x<=canvas.width-100)
	if(key==39)x+=2;
if(x>=0)
	if(key==37)x-=2;
if(key==32)jumping=Jump();
	ctx.clearRect(x, y, canvas.width, canvas.height);
	ctx.drawImage(background,0,0); //draws background image again as it was vanishing from end.
    ctx.drawImage(img,x,y,100,100);
// if(y<=canvas.height-100) //for y-axis motion.
// 	if(key==40)y+=2;
// if(y>=0)
// 	if(key==38)y-=2;

// 	if((y<=canvas.height-100) && (y>=0))
// 	{
//   if(key==37)x-=2;
//   if(key==38)y-=2;
//   if(key==39)x+=2;
//   if(key==40)y+=2;
// }
    // canvas.width=canvas.width;  option : works same as above statement.
},5);
}