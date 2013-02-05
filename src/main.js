var game = document.getElementById("game");
var ctx = game.getContext("2d");
var world;

function init() {
	var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

	var world = new b2World(/* gravity */ new b2Vec2(0, 10), /* allow sleep */ true);
	var SCALE = 32.0;

//create floor boundary
	var roof = new Entity();
	roof.x = 2.0;
	roof.y = 2.0;
	roof.width = 800.0;
	roof.height = 10.0;
	roof.setupBody(world, BodyType.Static, ShapeType.Polygon);
	roof.setRestitution(1.0);

//create floor boundary
	var floor = new Entity();
	floor.x = 2.0;
	floor.y = 600.0;
	floor.width = 800.0;
	floor.height = 10.0;
	floor.setupBody(world, BodyType.Static, ShapeType.Polygon);
	floor.setRestitution(1.0);

//create left boundary
	var left = new Entity();
	left.x = 2.0;
	left.y = 10.0;
	left.width = 10.0;
	left.height = 600.0;
	left.setupBody(world, BodyType.Static, ShapeType.Polygon);
	left.setRestitution(1.0);

//create right boundary
	var right = new Entity();
	right.x = 800.0;
	right.y = 10.0;
	right.width = 10.0;
	right.height = 600.0;
	right.setupBody(world, BodyType.Static, ShapeType.Polygon);
	right.setRestitution(1.0);

//create some objects
	var object = new Entity();
	for (var i = 0; i < 5; ++i) {
		object.x = (Math.random() * 10) * SCALE;
		object.y = (Math.random() * 10) * SCALE;
		if (Math.random() > 0.5) {
			object.width = (Math.random() * SCALE) + (0.1 * SCALE);
			object.height = (Math.random() * SCALE) + (0.1 * SCALE);
			object.setupBody(world, BodyType.Dynamic, ShapeType.Polygon);
		} else {
			object.radius = (Math.random() * SCALE) + (0.1 * SCALE);
			object.setupBody(world, BodyType.Dynamic, ShapeType.Circle);
		}
	}

//setup debug draw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("game").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.8);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	window.setInterval(update, 1000 / 60);

//mouse
	var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
	var canvasPosition = getElementPosition(document.getElementById("game"));

	document.addEventListener("mousedown", function(e) {
		isMouseDown = true;
		handleMouseMove(e);
		document.addEventListener("mousemove", handleMouseMove, true);
	}, true);

	document.addEventListener("mouseup", function() {
		document.removeEventListener("mousemove", handleMouseMove, true);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;
	}, true);

	function handleMouseMove(e) {
		mouseX = (e.clientX - canvasPosition.x) / 30;
		mouseY = (e.clientY - canvasPosition.y) / 30;
	};

	function getBodyAtMouse() {
		mousePVec = new b2Vec2(mouseX, mouseY);
		var aabb = new b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

// Query the world for overlapping shapes.
		selectedBody = null;
		world.QueryAABB(getBodyCB, aabb);
		return selectedBody;
	}

	function getBodyCB(fixture) {
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
				selectedBody = fixture.GetBody();
				return false;
			}
		}
	   return true;
	}

	function update() {
		if (isMouseDown && (!mouseJoint)) {
			var body = getBodyAtMouse();
			if (body) {
				var md = new b2MouseJointDef();
				md.bodyA = world.GetGroundBody();
				md.bodyB = body;
				md.target.Set(mouseX, mouseY);
				md.collideConnected = true;
				md.maxForce = 300.0 * body.GetMass();
				mouseJoint = world.CreateJoint(md);
				body.SetAwake(true);
			}
		}

		if (mouseJoint) {
			if (isMouseDown) {
				mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
			} else {
				world.DestroyJoint(mouseJoint);
				mouseJoint = null;
			}
		}
		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();
	}

	function getElementPosition(element) {
		var elem=element, tagname="", x=0, y=0;
		while ((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
			y += elem.offsetTop;
			x += elem.offsetLeft;
			tagname = elem.tagName.toUpperCase();

			if (tagname == "BODY")
				elem=0;

			if (typeof(elem) == "object") {
				if (typeof(elem.offsetParent) == "object")
					elem = elem.offsetParent;
			}
		}

		return {x: x, y: y};
	}
};
