var monkey, monkeyAnimation, munkie;
var bananaImage;
var stoneImage;
var backgroundd, backgroundImage;
var ground;
var BananaGroup;
var StoneGroup;

var score;

function preload(){
 bananaImage = loadImage("banana.png");
 stoneImage = loadImage("stone.png");
 munkie = loadImage("munkie.png");
 backgroundImage = loadImage("jungle.png");
  
monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(400, 400);
  background("white")
  
  backgroundd = createSprite(200, 200, 400, 400);
  
  backgroundd.addImage(backgroundImage);
  backgroundd.scale = 2;
  
  monkey = createSprite(50,350,30,40);
  monkey.addAnimation("monkey_running", monkeyAnimation);
  monkey.scale = 0.2;
  
  ground = createSprite(200, 390, 400, 10);
  ground.visible = false;
  
  BananaGroup = new Group();
  StoneGroup = new Group();
  
  score = 0;
  
  textSize(35);
  textFont("Agency FB");
  fill("white");
}

function draw() {
  
    console.log(monkey.y);
  
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.collide(ground);
    
    backgroundd.velocityX = -5;
  
    if (backgroundd.x < 0) {
     backgroundd.x = backgroundd.width/2;
    }
  
    if (keyWentDown("space")) {
      monkey.velocityY = -15;
    }
    
    if (monkey.isTouching(BananaGroup)) {
      score = score + 2;
      BananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(StoneGroup)) {
      monkey.scale = 0.1;
    }
    
    spawnBananas();
    spawnStones(); 
    
    switch(score){
      case 10: monkey.scale = 0.25;
        break;
        
      case 20: monkey.scale = 0.3;
        break;
      case 30: monkey.scale = 0.35;
        break;
      case 40: monkey.scale = 0.4;
        break;
      default: break;
    }
  
  drawSprites();
  text("Score: " + score, 20, 40);
}

function spawnBananas(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,         random(220, 270), 20, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.035;
    banana.lifetime = 80;
    BananaGroup.add(banana);
  }
}

function spawnStones(){
  if (frameCount % 300 === 0) {
    var stone = createSprite(400, 350, 50, 20);
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -5 - frameCount/1200;
    stone.lifetime = 200;
    StoneGroup.add(stone);
  }
}