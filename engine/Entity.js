
var SCALE = 32.0;

var Entity = function()
{
	this.__x = 0.0;
	this.__y = 0.0;
	this.__r = 0.0;
	this.__w = 0.0;
	this.__h = 0.0;
}

Entity.prototype.setupBody = function(world, type, shape)
{
	var fixDef = new Box2D.Dynamics.b2FixtureDef;
	if (shape === ShapeType.Polygon) {
		fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
		fixDef.shape.SetAsBox(this.__w / SCALE, this.__h / SCALE);
	} else {
		fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(this.__r / SCALE);
	}

	var bodyDef = new Box2D.Dynamics.b2BodyDef;
	bodyDef.position.Set(this.__x / SCALE, this.__y / SCALE);
	switch(type) {
	case BodyType.Static:
		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		break;
	case BodyType.Dynamic:
		bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		break;
	case BodyType.Knematic:
		bodyDef.type = Box2D.Dynamics.b2Body.b2_knematicBody;
		break;
	}

	this.body = world.CreateBody(bodyDef);
	this.fixture = this.body.CreateFixture(fixDef);
}

Entity.prototype.setRestitution = function(val) { this.fixture.SetRestitution(val); }
Entity.prototype.setFriction = function(val) { this.fixture.SetFriction(val); }
Entity.prototype.setDensity = function(val) { this.fixture.SetDensity(val); }

// Define x position as property
Object.defineProperty(Entity.prototype, "x", {
	get: function() { return this.__x; },
	set: function(val) { this.__x = val; }
});

// Define y position as property
Object.defineProperty(Entity.prototype, "y", {
	get: function() { return this.__y; },
	set: function(val) { this.__y = val; }
});

// Define entity radius as property
Object.defineProperty(Entity.prototype, "radius", {
	get: function() { return this.__r; },
	set: function(val) { this.__r = val; }
});

// Define entity width as property
Object.defineProperty(Entity.prototype, "width", {
	get: function() { return this.__w; },
	set: function(val) { this.__w = val; }
});

// Define entity height as property
Object.defineProperty(Entity.prototype, "height", {
	get: function() { return this.__h; },
	set: function(val) { this.__h = val; }
});
