minHeight=50;
maxHeight=150;
minWidth=40;
maxWidth=80;
minGap=300;
maxGap=600;
gap = RandomGap();

var myObstacles=[];

function startGame() {
    gameArea.start();
}       

function everyinterval(n) {
    if(gameArea.frame == n)
        return true;
    return false;
}

function RandomGap() {
    return Math.floor(minGap + Math.random()*(maxGap-minGap));
}

function obstacle() {
    this.height = Math.floor(minHeight + Math.random()*(maxHeight-minHeight));
    this.width = Math.floor(minWidth + Math.random()*(maxWidth-minWidth));
    this.x=1350;
    this.y=gameArea.canvas.height - this.height;
    this.draw = function() {
        gameArea.context.fillRect(this.x,this.y,this.width,this.height);
        // fillRect.style="color:red";
    }
}

var gameArea = {
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.width = 1350;
        this.canvas.height = 635;
        this.context=this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
        for(i=0; i<myObstacles.length; i++) {
            myObstacles[i].x -= 1;
            myObstacles[i].draw();
        }
        gameArea.frame += 1;
        
    },

    clear : function() {
        // console.log("clear");
        gameArea.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    
    stop : function() {
        
    }
}