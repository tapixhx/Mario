var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var x=2;
var y=500;
var x_velocity=0;
var y_velocity=0;
var loop;
var jumping=false;
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
var controller = {

    left:false,
    right:false,
    up:false,
    keyListener:function(event) {

        var key_state = (event.type == "keydown")?true:false;//if true controller works on switch

        switch(event.keyCode) {

            case 37:// left key
            console.log("left");
            controller.left = key_state;
            break;
            case 32:// space bar
            console.log("up");
            controller.up = key_state;
            break;
            case 39:// right key
            console.log("right");
            controller.right = key_state;
            break;
        }
    }
};

loop = function() {

  if (controller.up && jumping == false) {

        y_velocity -= 30;
        jumping = true;
    }
  if(x>=30){  
  if (controller.left) {

        x_velocity -= 0.5;
    }
    }
  if(x<=canvas.width-120){
  if (controller.right) {

        x_velocity += 0.5;
    }
    }

  y_velocity += 1.5;// gravity
  x += x_velocity;
  y += y_velocity;
  x_velocity *= 0.9;// friction
  y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (y > 500 - 100) {

        jumping = false;
        y = 500 - 100;
        y_velocity = 0;
    }

  // if rectangle is going off the left of the screen
  // if (img.x < -32) {

  //   img.x = 320;

  // } else if (img.x > 320) {// if rectangle goes past right boundary

  //   img.x = -32;

  // }
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(background,0,0); //draws background image again as it was vanishing from end.
    ctx.drawImage(img,x,y,100,100);
    window.requestAnimationFrame(loop);
};
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);