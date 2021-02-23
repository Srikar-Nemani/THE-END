var monkey , monkey_running
var banana ,bananaImage
var ground
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survival_time = 0;
var score = 0;
var count = 0;
var gameState = "play";

var invisG;

function preload(){
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png")
  
  obstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");

}

function setup() {
  createCanvas(450,450);
  
  
  ground = createSprite(225,420,450,10);
  ground.velocityX = -3;
  ground.addImage(backgroundImage);
  ground.x = ground.width/2;
  
  invisG = createSprite(225,420,450,10);
  invisG.visible = false;
  
  
  
  
  monkey = createSprite(200,365,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  
  
  bananaGroup = createGroup();
  bananaGroup2 = createGroup();
  obstaclesGroup = createGroup();
  
  
  
}

function draw() {
  
  background("black");
  
  if(gameState === "play"){
    camera.position.x=monkey.x;
    camera.position.y=monkey.y;
   
  if(ground.x<200){
    ground.x = ground.width/2;
  }
  if(keyDown("space")&&monkey.y>140){
    monkey.velocityY = -15;
  }
     if (ground.x < 0){
   ground.x = ground.width/2;
  }
    
    if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
   score = score + 1;
 }
  
   if(monkey.isTouching(bananaGroup2)){
  bananaGroup2.destroyEach();
  score = score + 2;
 }

  if(monkey.isTouching(obstaclesGroup)){
 monkey.scale = 0.09;
 count = count + 1;
  obstaclesGroup.destroyEach();
 }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
      default: break;
  }
   Food();
   Obstacles();
survival_time = survival_time+Math.round(getFrameRate()/62);
   monkey.velocityY = monkey.velocityY + 1;
    
   if(count >= 3){
   gameState = "end";
  }
}

  monkey.collide(invisG);

 if(gameState === "end"){
   monkey.visible = false
   ground.visible = false
   bananaGroup2.setLifetimeEach(0);
   bananaGroup.setLifetimeEach(0);
   obstaclesGroup.setLifetimeEach(0);
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",100,225);
   textSize(25);
   fill("orange");
   stroke("orange");
   text("Press R To Restart The Game",57,325);
    if(keyDown("R")){
      reset();
    }
 }

  drawSprites();
 
  fill("white");
  stroke("white");
  textSize(22);
  text("SURVIVAL TIME :- " + survival_time,200,35);
  text("DEATHS:" + count, 120,75);
  text("SCORE - "+ score,40,35);
}

function Food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(450,220,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 90;
    bananaGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
  
    
}

function Obstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(450,378,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.16;
    obstacle.lifetime = 76;
    obstaclesGroup.add(obstacle);
    monkey.depth = obstacle.depth + 1;
  }
}

function reset(){
  gameState = "play";
  monkey.visible = true
  Background.visible = true
  score = 0;
  count = 0;
  survival_time = 0;
}