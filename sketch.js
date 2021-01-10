//Create variables here
var dog,dogImg;
var happyDog;
var database;
var foodS = 20;
var foodStock;
var x=20;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  database=firebase.database();

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if (keyDown(UP_ARROW)) {
  //  writeStock(foodS);
    dog.addImage(happyDog);
  
}
  else{
    dog.addImage(dogImg);
  }
  
  drawSprites();
  //add styles here
  textSize(40);
  fill("white");
  stroke("red");
  text("Food Remaining: "+foodS,70,450);
  textSize(20);
  text("Press UP_ARROW to feed the dog Milk",10,50);

}

function readStock(data) {
  foodS = data.val();
}
function writePosition(x) {
  if(x >=1){
    x=x-1;
  }
  else if(x<=0){
     x=0;
  }

  database.ref('Food').update({
    Food:x
  });
  }
  function showError() {
    console.log("Error in writing to the database");
}
