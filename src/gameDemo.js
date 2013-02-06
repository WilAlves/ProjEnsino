function initGame(){
 initBox();
 initBat();
 initBricks();
 initBall();
}
function initGame2(){
 initBox();
 initPendullum();
 initBasket();
}
function initBox(){
 propertyList = new Object();
 propertyList.density = 1.0;
 propertyList.friction = 0.5;
 propertyList.restitution = 0.1;
 propertyList.x = 10;
 propertyList.y = 14;
 propertyList.width = 10;
 propertyList.height = 1;
 propertyList.type = "StaticBody";
 propertyList.shape = "Box"
 var image = new Image();
// image.src = "image/border.jpg";
 propertyList.skin = image;
 propertyList.name = "Ground";
 ground = createRigidBody(propertyList);
 propertyList.x = 10;
 propertyList.y = 0;
 propertyList.width = 10;
 propertyList.height = 0.3;
 propertyList.name = "Roof";
 roof = createRigidBody(propertyList);
 propertyList.x = 0;
 propertyList.y = 0;
 propertyList.width = 0.4;
 propertyList.height = 14;
 propertyList.name = "rwall";
 rwall = createRigidBody(propertyList);
 propertyList.x = 20;
 propertyList.y = 0;
 propertyList.name = "lwall";
 lwall = createRigidBody(propertyList);
}

function initBat(){
 //create Basket
 propertyList = new Object();
 propertyList.density = 10.0;
 propertyList.friction = 0.5;
 propertyList.restitution = 0.2;
 propertyList.x = 10;
 propertyList.y = 13;
 propertyList.width = 1.5;
 propertyList.height = .8;
 propertyList.type = "DynamicBody";
 propertyList.shape = "Box"
 var image = new Image();
// image.src = "image/monkey.jpg";
 propertyList.skin = image;
 propertyList.name = "Bat";
 bat = createRigidBody(propertyList); 
}
function initBall(){
 propertyList = new Object();
 propertyList.density = 1.0;
 propertyList.friction = 0.5;
 propertyList.restitution = 0.1;
 propertyList.x = 10.0;
 propertyList.y = 5.0;
 propertyList.width = 1.5;
 propertyList.height = 1.5;
 propertyList.type = "DynamicBody";
 propertyList.shape = "Sphere"
 var image = new Image();
// image.src = "image/ball.png";
 propertyList.skin = image;
 propertyList.name = "Ball";
 pendullumball = createRigidBody(propertyList);
}

function initBricks() {
 propertyList = new Object();
 propertyList.density = 10.0;
 propertyList.friction = 0.5;
 propertyList.restitution = 0.2;
 propertyList.width = 0.7;
 propertyList.height = 0.5;
 propertyList.type = "StaticBody";
 propertyList.shape = "Box"
 var image = new Image();
// image.src = "image/banana.jpg";
 propertyList.skin = image;
 var x = 1, y = 1;
 for (var i = 0; i < 3 ; i = i + 1)
 {
  for(var j = 0; j <= 9 ; j = j + 1)
  {
   propertyList.x = x;
   propertyList.y = y;
   propertyList.name = "Brick" + j + i;
   createRigidBody(propertyList);
   x = x + 2;
  }
  y = y + 0.9;
  x = 1;
 }
}
