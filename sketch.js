const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var bg_image
var balloon
var bubbleImg
var cutButton
var food
var bunnyImg, bunny
var star
var rope1,rope2
var shelf
let engine;
var bubble
let world;
var fruit, fruit_con
var blinking,eating, sad

function preload(){
bg_image = loadImage("background.png")
balloon = loadImage("balloon.png")
bubbleImg = loadImage("bubble.png")
cutButton = loadImage("cut_btn.png")
food = loadImage("melon.png")
blinking = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eating = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
star = loadImage("star.png")


blinking.play = true
eating.play = true
sad.play = true
eating.looping = false
sad.looping = false
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  bubble = createSprite(320,530,30,30)
  bubble.addImage(bubbleImg)
  bubble.scale = 0.1
  eating.frameDelay = 20
  blinking.frameDelay = 20
  bunny = createSprite(250,78,40,30)
  bunny.addAnimation("blinking",blinking)
  bunny.addAnimation("eating",eating)
  bunny.addAnimation("sad",sad)
  bunny.changeAnimation("blinking")
  bunny.scale = 0.2
  
  var fruit_options = {
    restitution:0.95
  }
  fruit = Bodies.circle(100,400,15,fruit_options)
  World.add(world,fruit)

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  shelf = new ground(250,150,100,10);
  Ground = new ground(250,765,800,10)

  btn1 = createImg("cut_btn.png")
  btn1.position(230,330)
  btn1.size(40,40)
  btn1.mouseClicked(drop2)
  
  btn2 = createImg("cut_btn.png")
  btn2.position(50,450)
  btn2.size(40,40)
  btn2.mouseClicked(drop)
  
}

function draw() 
{
  background(bg_image);
  push()
  imageMode(CENTER)
  if(fruit!=null){
  fruit_image = image(food,fruit.position.x,fruit.position.y, 70,70)
  }
  pop()
 
  Engine.update(engine);
  
  rope.show()
  rope2.show()
  shelf.show()

  if(collide(fruit,bubble,80)){
    engine.world.gravity.y  = - 1
    bubble.position.x = fruit.position.x 
    bubble.position.y = fruit.position.y 
  }
  if(collide(fruit,bunny,80)){
    
    
    bubble.visible = false
    
    rope.break()
    World.remove(world,fruit)
    fruit = null
    bunny.changeAnimation("eating")
    
   
  }
  
  

  drawSprites();

}
function collide(body,sprite,x){
  if(body!=null){
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(distance<=x){
      return true
    }
    else{
      return false
    }

  }

}

function drop(){
  rope2.break()
  con2.dettach()
  con2 = null

}
function drop2(){
  rope.break()
  con.dettach()
  con = null

}