function initGame(){
	initBox();
//	initBat();
	initBricks();
	//initBall();
	initWords();
}

function initBox(){
	propertyList = new Object();

	var image = new Image();
	image.src = "image/borda.jpg";
	propertyList.skin = image;

	propertyList.density = 1.0;
	propertyList.friction = 0.5;
	propertyList.restitution = 0.1;
	propertyList.x = 0;
	propertyList.y = 20;
	propertyList.width = 27;
	propertyList.height = 0.3;
	propertyList.type = "StaticBody";
	propertyList.shape = "Box"
	propertyList.name = "Ground";
	ground = createRigidBody(propertyList);

	propertyList.x = 0;
	propertyList.y = 0;
	propertyList.width = 26.65;
	propertyList.height = 0.3;
	propertyList.name = "Roof";
	roof = createRigidBody(propertyList);

	propertyList.x = 0;
	propertyList.y = 0;
	propertyList.width = 0.3;
	propertyList.height = 20;
	propertyList.name = "rwall";
	rwall = createRigidBody(propertyList);

	propertyList.x = 26.65;
	propertyList.y = 0;
	propertyList.width = 0.3;
	propertyList.height = 20;
	propertyList.name = "lwall";
	lwall = createRigidBody(propertyList);
}

/*function initBat(){
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
	image.src = "image/monkey.jpg";
	propertyList.skin = image;
	propertyList.name = "Bat";
	bat = createRigidBody(propertyList); 
}*/
function initBall(){
	vpropertyList = new Object();
	propertyList.density = 1.0;
	propertyList.friction = 0.5;
	propertyList.restitution = 0.1;
	propertyList.x = 10.0;
	propertyList.y = 5.0;
	propertyList.width = 1.5;
	propertyList.height = 1.5;
	propertyList.type = "DynamicBody";
	propertyList.shape = "Box"
	var image = new Image();
	image.src = "image/nmaca.png";
	propertyList.skin = image;
	propertyList.name = "Ball";
	pendullumball = createRigidBody(propertyList);
	pendullumball = createRigidBody(propertyList);
	pendullumball = createRigidBody(propertyList);
	pendullumball = createRigidBody(propertyList);
}

function initBricks() {
	propertyList = new Object();
	propertyList.density = 10.0;
	propertyList.friction = 0.5;
	propertyList.restitution = 0.2;
	propertyList.width = 1.2;
	propertyList.height = 1.2;
	propertyList.type = "StaticBody";
	propertyList.shape = "Sphere"
	var image = new Image();
	image.src = "image/maca.png";
	propertyList.skin = image;
	var x = 8, y = 15;

	for(var j = 0; j < 2 ; j = j + 1)
	{
		propertyList.x = x;
		propertyList.y = y;
		propertyList.name = "Brick" + j;
		createRigidBody(propertyList);
		x = x + 10;
		//if ( (j % 2) == 1)image.src = "image/melancia.png";
	}
}

function initWords() {
	vpropertyList = new Object();

	propertyList.density = 1.0;
	propertyList.friction = 1.0;
	propertyList.restitution = 1.2;
	propertyList.width = 1.5;
	propertyList.height = 0.5;
	propertyList.type = "DynamicBody";
	propertyList.shape = "Box"
	for ( var i = 0; i < 4; i++ ) {
	var image = new Image();
	image.src = "image/"+i+".png";
	propertyList.skin = image;
	propertyList.name = "Ball";
	var pos;
		pos = Math.random() * 25;
		pos = Math.floor(pos+1);
		pos = parseInt(pos);
		console.log("x: "+pos);
		propertyList.x = pos;
		pos = Math.random() * 10;
		pos = Math.floor(pos);
		pos = parseInt(pos);
		console.log("y: "+pos);
		propertyList.y = pos;
		pendullumball = createRigidBody(propertyList);
	}
}
