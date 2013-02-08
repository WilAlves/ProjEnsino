function createRigidBody(propList){

 var fixDef = new b2FixtureDef;
        fixDef.density = propList.density;
        fixDef.friction = propList.friction;
        fixDef.restitution = propList.restitution;
        var bodyDef = new b2BodyDef;

 if(propList.type == "StaticBody"){
     bodyDef.type = b2Body.b2_staticBody;
 }

 if(propList.type == "DynamicBody"){
  bodyDef.type = b2Body.b2_dynamicBody;
 }

 if(propList.shape == "Box"){
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(propList.width, propList.height);
 }

 if(propList.shape == "Sphere"){
  fixDef.shape = new b2CircleShape(propList.width)
 }
 
 bodyDef.position.x = propList.x;
 bodyDef.position.y = propList.y;
 rbData = new Object();
 rbData.name = propList.name;
 rbData.width = propList.width;
 rbData.height = propList.height;
 rbData.skin = propList.skin;
 bodyDef.userData = rbData;

 var rigidbody = world.CreateBody(bodyDef).CreateFixture(fixDef);
 return rigidbody;

}

function updateSkin(b)
{

 var pos = b.GetPosition();    
 context.save();
 context.translate(b.GetWorldCenter().x * SCALE,b.GetWorldCenter().y * SCALE);
 context.rotate(b.GetAngle());
 width = b.GetUserData().width * SCALE;
 height = b.GetUserData().height * SCALE;
context.drawImage(b.GetUserData().skin, -width, -height, (width)*2, (height)*2);
 
 
    context.restore();
}
