var santa, santaImg, gift, gift1, gift2, giftsgroup, giftsound, monstersound, bg, monster, monstergroup, monsterImg, monsterImg2, restart, restartImg;
var start, startImg, bg2, endSound;

var gamestate = 0;
var giftspicked = 0;
var monsterpicked = 0;

function preload(){
    bg = loadImage('images/bg.png');
    bg2 = loadImage('images/bg2.jpg');
    santaImg = loadImage('images/s.png');
    gift1 = loadImage('images/gift1.png');
    gift2 = loadImage('images/paper.png');
    monsterImg = loadImage('images/plastic.jpg');
    restartImg = loadImage('images/restart.png');
    startImg = loadImage('images/button.png');
    monsterImg2 = loadImage('images/fertilizer1.png');

    giftsound = loadSound('sounds/gift.mp3');
    monstersound = loadSound('sounds/monster.mp3');
    endSound = loadSound('sounds/end.mp3');
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    santa = createSprite(windowWidth/2,windowHeight/2,50,50);
    santa.addImage(santaImg);
    santa.scale = 0.12532;

    restart = createSprite(windowWidth/2 + 35, windowHeight/2 - 60, 50, 50);
    restart.addImage(restartImg);
    restart.scale = 0.6;

    start = createSprite(windowWidth/2 + 45, windowHeight/2 + 65, 50, 50);
    start.addImage(startImg);
    start.scale = 0.48;

    giftsgroup = createGroup();
    monstergroup = createGroup();
    
}

function draw(){
    background(255);

    if(gamestate != 1){
        imageMode(CENTER);
        image(bg,windowWidth/2,windowHeight/2, windowWidth, windowHeight);
        giftsound.stop();
    }

    if(gamestate != 1 && monstersound > 6){
        monstersound.stop();
    }

    if(gamestate != 2){
        endSound.stop();
    }

    if(gamestate != 0){
        start.visible = false;
    }

    if(gamestate == 0){
        restart.visible = false;
        santa.visible = false;
        start.visible = true;

        if(mousePressedOver(start) && gamestate == 0){
            gamestate = 1;
        }

        textSize(32);
        fill('green');
        text('Climate Game by Bhavin Shah and Arul', windowWidth/2 - 200, 50);

        textSize(32);
        fill('red');
        text('Rules', windowWidth/2 - 10, 150);

        textSize(25);
        fill('cyan');
        text('The objective of the game is to collect Biodegradable resources and to prevent Non-Biodegradable resources.', windowWidth/2 - 650, 200);
        text('If you collect 20 Biodegradable resources you will win and if the Non-Biodegradable resources attack you 5 times you will lose.', windowWidth/2 - 700, 250);
        text('Wherever you take the cursor, the Santa will move accordingly.', windowWidth/2 - 400, 300);
       
        textSize(32);
        fill('pink');
        text('Good Luck!', windowWidth/2 - 40, 350);

        push();
        stroke('brown');
        strokeWeight(4);
        line(windowWidth/2 - 250,60,windowWidth/2 + 415, 60);
        pop();
    }

    if(gamestate == 1){

        imageMode(CENTER);
        image(bg,windowWidth/2, windowHeight/2, windowWidth, windowHeight);

        restart.visible = false;
        santa.visible = true;
        santa.x = mouseX;
        santa.y = mouseY;

        spawnGifts();
        spawnMonsters();

        if(santa.isTouching(giftsgroup)){
            giftsgroup.destroyEach();
            giftspicked = giftspicked + 1;
            giftsound.play();
        }

        if(santa.isTouching(monstergroup)){
            monstergroup.destroyEach();
            monsterpicked = monsterpicked + 1;
            monstersound.play();
        }

        if(giftspicked >= 20){
            gamestate = 2;
        }

        if(monsterpicked > 4){
            endSound.play();
            gamestate = 2;
        }
    }

    if(gamestate == 2){
        
        restart.visible = true;
        
        santa.destroy();
        monstergroup.destroyEach();
        giftsgroup.destroyEach();

        if (mousePressedOver(restart)){
            Restart();
        }
    }

    if(gamestate == 2 && monsterpicked == 5){

        restart.x = windowWidth/2 + 35;
        restart.y = windowHeight/2 - 60;

        textSize(32);
        fill('pink');
        text('Game Over!', windowWidth/2 - 50, windowHeight/2);
        text('You Lose!', windowWidth/2 - 35, windowHeight/2 + 50); 
        text('Try again next time!', windowWidth/2 - 100, windowHeight/2 + 100);
    }

    if(gamestate == 2 && giftspicked == 20){

        restart.x = windowWidth/2 + 35;
        restart.y = windowHeight/2 - 60;

        textSize(32);
        fill('cyan');
        text('Game Over!', windowWidth/2 - 50, windowHeight/2);
        text('You Won!', windowWidth/2 - 30, windowHeight/2 + 50);
    }

    drawSprites();
   
    if(gamestate != 0){
        
        textSize(28);
        fill('red');
        text('Biodegredable Resources picked: ' + giftspicked, 30, 50);
        text('Non-Biodegredable resources picked: ' + monsterpicked, windowWidth - 520, 50);

    }
    
}

function Restart(){

    gamestate = 0;
    giftspicked = 0;
    monsterpicked = 0;
    santa.visible = true;

    santa = createSprite(windowWidth/2,windowHeight/2,50,50);
    santa.addImage(santaImg);
    santa.scale = 0.12532;;
   
}


function spawnMonsters(){

    if(World.frameCount % 70 === 0){
        var monster = createSprite(random(100,windowWidth - 100),0,50,50);

        var rand = Math.round(random(1,2));

        switch(rand){
            case 1: monster.addImage(monsterImg2)
                    monster.scale = 0.65;
            break;
            
            case 2: monster.addImage(monsterImg)
                    monster.scale = 0.235;
            break;
            
           }


        monster.velocityY = 8;
        monster.lifetime = 900;
        monstergroup.add(monster);
     }
  
  
    }
    
  
  function spawnGifts() {
    
    // To spawn the clouds after every 60th frame
   if (World.frameCount %  60 === 0 ){
        var gift = createSprite(random(100,windowWidth - 100),0,50,50);
        
        var rand = Math.round(random(1,2));

        switch(rand){
            case 1: gift.addImage(gift1)
                    gift.scale = 0.215;
            break;
            
            case 2: gift.addImage(gift2)
                    gift.scale = 0.31;
            break;
            
           }


        gift.velocityY = 7;
       
        gift.lifetime = 900;
        giftsgroup.add(gift);
     
  }
  }

  