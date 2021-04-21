var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png")
  obstacleImage = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    SpawnFood();
    SpawnObject();
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      player.scale += 0.05;
      score = score+2;
    }
    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
  }

  if(gameState === END){
    player.visible = false;
    foodGroup.destroyEach();
    textSize(30);
    fill(255);
    text("Game Over!", 200,200);
    obstacleGroup.destroyEach();
  }
  
  drawSprites();
}

function SpawnFood(){
  if(frameCount%80 === 0){
    console.log("message1")
    var banana = createSprite(600,250,40,10)
    banana.y = random(100,200)
    banana.addImage(bananaImage)
    banana.scale = 0.05
    banana.velocityX = -4
    banana.lifeTime = 300
    foodGroup.add(banana)
  }
}

function SpawnObject(){
  if(frameCount%300 === 0){
    var obstacle = createSprite(600,350,10,40)
    obstacle.y = random(200,300)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    obstacle.velocityX = -2
    obstacle.lifeTime = 250
    obstacleGroup.add(obstacle)
  }
}