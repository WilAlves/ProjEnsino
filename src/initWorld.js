var world;

var b2Vec2 = Box2D.Common.Math.b2Vec2
        ,      b2BodyDef = Box2D.Dynamics.b2BodyDef
        ,      b2Body = Box2D.Dynamics.b2Body
        ,      b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        ,      b2World = Box2D.Dynamics.b2World
        ,      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        ,      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        ,      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
        ,      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
        ,      b2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
        ,      b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
        ,      b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ,      b2Fixture = Box2D.Dynamics.b2Fixture
        ,      b2AABB = Box2D.Collision.b2AABB
        ,      b2Color = Box2D.Common.b2Color;

var SCALE = 30;
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function init() {

 world = new b2World(new b2Vec2(0,10), true);

 var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite ( document.getElementById ("game").getContext ("2d"));
        debugDraw.SetDrawScale(SCALE);     //define scale
        debugDraw.SetFillAlpha(0.3);    //define transparency
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw); 
 initGame();
 window.setInterval(update,9000/60); 
}

window.setInterval(removeObjScheduledForRemoval, 1000/90);
document.body.addEventListener("keydown", keyset, false);

var moveLeft, moveRight;

function keyset(evt){
 //37: "left", 39: "right"
 if(evt.keyCode == 37){
  moveLeft = 1;
  moveRight = 0;
 }
 if(evt.keyCode == 39){
  moveLeft = 0;
  moveRight = 1;
 }   
}

var bricksScheduledForRemoval = Array();
var index = -1;

function removeObjScheduledForRemoval()
{
 for(var i = 0; i <= index; i++){
  world.DestroyBody(bricksScheduledForRemoval[i]); 
  bricksScheduledForRemoval[i] = null; 
 }
 bricksScheduledForRemoval = Array();
 index = -1;
}

function update() {  
 world.Step(1 / 60, 10, 10);
        world.ClearForces();
        context.clearRect(0, 0, canvas.width, canvas.height);
 world.DrawDebugData(); // comment to disable debugdraw
 
 //detect collision
 for (var c = world.GetContactList() ; c ; c = c.GetNext()){
  var body1 = c.GetFixtureA().GetBody();
       var body2 = c.GetFixtureB().GetBody(); 
  if((body1.GetUserData().name == "Bat" && body2.GetUserData().name == "Ball") ||(body1.GetUserData().name == "Ball" && body2.GetUserData().name == "Bat")){
   var ImpulseVec = new b2Vec2((Math.random() * 3), - (Math.random() * 5));
   var point = new b2Vec2((body2.GetWorldCenter().x),(body2.GetWorldCenter().y));
   body2.ApplyImpulse(ImpulseVec, point); 
  } 
  for (var i = 0; i < 3 ; i = i + 1)
  {
     for(var j = 0; j <= 9 ; j = j + 1)
     {
      if(body1.GetUserData().name == ("Brick" + j + i) && body2.GetUserData().name == "Ball") {
    bricksScheduledForRemoval[++index] = body1;
   }else if(body1.GetUserData().name == "Ball" && body2.GetUserData().name == ("Brick" + j + i)){
    bricksScheduledForRemoval[++index] = body2;
   }
      }
  }
 }
 
 // world redraw
 for (b = world.GetBodyList() ; b; b = b.GetNext()) {   
 // draw the static world objects
  if (b.GetType() == b2Body.b2_staticBody && b.GetUserData() != null){ 
   updateSkin(b);
  }
  if (b.GetType() == b2Body.b2_dynamicBody && b.GetUserData() != null) {     
   if(b.GetUserData().name == "Bat"){
    if(moveLeft){
     moveLeft = 0;  
     var ImpulseVec = new b2Vec2(-30,0);
     var point = new b2Vec2((b.GetWorldCenter().x ), (b.GetWorldCenter().y ));
     b.ApplyImpulse(ImpulseVec, point); 
    }
    if(moveRight){
     moveLeft = 0;  
     var ImpulseVec = new b2Vec2(30,0);
     var point = new b2Vec2((b.GetWorldCenter().x ), (b.GetWorldCenter().y ));
     b.ApplyImpulse(ImpulseVec, point); 
    }
   }
   updateSkin(b);
  }
 }  
}
