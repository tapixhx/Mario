var x=0, y=485;
var d=0;
var score=0,scoreCoins=0;
var minHeight=100;
var maxHeight=200;
var minWidth=40;
var maxWidth=80;
var minGap=300;
var maxGap=600;
var speedY=0;
var gap = RandomGap();
var x_velocity=0;
var y_velocity=0;
var loop;
var flag=true, jumping=false;

var myObstacles=[];

function startGame() {
    gameArea.start();
}       

function everyinterval(n) {
    if(gameArea.frame == n)
        return true;
    return false;
}

//for finding random gap between walls
function RandomGap() {
    return Math.floor(minGap + Math.random()*(maxGap-minGap));
}

//for creating walls and coins
function obstacle() {
    this.height = Math.floor(minHeight + Math.random()*(maxHeight-minHeight));
    this.width = Math.floor(minWidth + Math.random()*(maxWidth-minWidth));
    this.x=1350;
    this.y=gameArea.canvas.height - this.height;
    this.draw = function() {
        gameArea.context.fillStyle = "green";
        if(!(this.flag)) {
            img2 = new Image();
            img2.src="../images/tile.png"
            gameArea.context.drawImage(img2,384,16,16,16,this.x,this.y-200,50,50);
        }
        gameArea.context.fillRect(this.x,this.y,this.width,this.height);
    }
}

var gameArea = {
    left:false,
    right:false,
    up:false,

    canvas : document.getElementById("screen"),

    start : function() {
        this.context=this.canvas.getContext("2d");
        this.frame=0;
        this.interval = setInterval(this.updateGameArea, 5);
    },

    updateGameArea : function() {
        gameArea.clear();
        if(everyinterval(gap)) {
            myObstacles.push(new obstacle());
            gap = RandomGap();
            gameArea.frame=0;
        }
        background = new Image();
        background.src="../images/background1.png";
        gameArea.context.drawImage(background,0,0);
        for(i=0; i<myObstacles.length; i++) {
            score++;
            gameArea.context.font="30px Georgia";
            gameArea.context.fillStyle="red";
            gameArea.context.fillText("Score =",1150,50);
            gameArea.context.fillText(Math.floor(score/10),1250,50);
            myObstacles[i].x -= 1;
            myObstacles[i].draw();
            if (crashWith(myObstacles[i])) {
                gameArea.stop();
                return;
            }
            if(flag === true) {
                myObstacles[i].flag = true;
                scoreCoins++;
            }
            gameArea.context.fillText("Coins =",1150,100);
            gameArea.context.fillText(scoreCoins,1250,100);
        }
        img = new Image();
        img.src="../images/mario.gif";
        gameArea.context.drawImage(img,x,y,100,100);
        img1 = new Image();
        img1.src="../images/tile.png";
        for(i=0; i<1350; i=i+50) {
            gameArea.context.drawImage(img1,0,0,16,16,i,585,50,50);
        }
        gameArea.frame ++;
    },

    keyListener : function(event) {
        // console.log("keylistener");
        
        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode) {

            case 37:// left key
            // console.log("left");
            gameArea.left = key_state;
            break;
            case 32:// space bar
            // console.log("up");
            gameArea.up = key_state;
            break;
            case 38:// up key
            // console.log("up2");
            gameArea.up2 = key_state;
            break;
            case 39:// right key
            // console.log("right");
            gameArea.right = key_state;
            break;
        }
    },

    clear : function() {
        gameArea.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },

    stop : function() {
        clearInterval(this.interval);
        img = new Image();
        img.src="../images/mario.gif";
        gameArea.context.drawImage(img,x,y,100,100);
        img1 = new Image();
        img1.src="../images/tile.png";
        for(i=0; i<1350; i=i+50) {
            gameArea.context.drawImage(img1,0,0,16,16,i,585,50,50);
        }
        gameArea.context.font="100px Georgia";
        gameArea.context.fillStyle="red";
        gameArea.context.fillText("GAME OVER!!",350,317);
        gameArea.context.font="30px Georgia";
    },

    loop : function() {
        // console.log("loop");
        
        if (gameArea.up && jumping == false) {
            y_velocity -= 30;
            jumping = true;
        }
        if (gameArea.up2 && jumping == false) {
            y_velocity -= 50;
            jumping = true;
        }
        if(x>=30){  
            if (gameArea.left) {
                    x_velocity -= 0.5;
            }
        }
        if(x<=gameArea.canvas.width-120) {
            if (gameArea.right) {
                x_velocity += 0.5;
            }
        }
        y_velocity += 1.5;// gravity
        x += x_velocity;
        y += y_velocity;
        x_velocity *= 0.9;// friction
        y_velocity *= 0.9;// friction
          
        // if rectangle is falling below floor line
        if (y > 487) {
            jumping = false;
            y = 487;
            y_velocity = 0;
         }
         window.requestAnimationFrame(gameArea.loop);
    }
}
window.addEventListener("keydown", gameArea.keyListener)
window.addEventListener("keyup", gameArea.keyListener);
window.requestAnimationFrame(gameArea.loop);

function crashWith(otherobj) {
    var myleft = x+25;
    var myright = x + 75;
    var mytop = y;
    var mybottom = y + 100;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    flag = true;
    if ((mybottom < othertop) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    }
    if((myleft > otherright) || (mytop > otherbottom - (otherobj.height + 200)) || (myright < otherleft) || (mybottom < othertop - 250)) {
        flag=false;
    }
    return crash;
}