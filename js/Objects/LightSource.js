var LightSource = function(radius, instensity, distance, color){
	this.radius = Math.PI / 2;
	this.instensity = 1;
	this.distance = 200;
	this.color = 0xffffff;

	if(radius !== undefined)
	{
		this.radius = radius;
	}
	if(instensity !== undefined)
	{
		this.instensity = instensity;
	}
	if(distance !== undefined)
	{
		this.distance = distance;
	}
	if(color !== undefined)
	{
		this.color = color;
	}
};

LightSource.prototype.create = function(x, y, z, targetX, targetY, targetZ) {
	this.ambient = new THREE.AmbientLight(0x111111);
	this.light = new THREE.SpotLight( this.color, this.instensity, this.distance, this.radius, 100);

	this.light.position.set(x, y, z);
	this.light.target.position.set(targetX, targetY, targetZ);

	this.light.castShadow = true;

	this.light.shadowMapBias = 0.05;
	this.light.shadowDarkness = 0.8;

	this.light.shadowCameraNear = 1;
	this.light.shadowCameraFar = 5000;
	this.light.shadowCameraFov = 50;

	this.light.shadowMapWidth = 4096;
	this.light.shadowMapHeight = 4096;
};

LightSource.prototype.toggleDebug = function()
{
	this.light.shadowCameraVisible = !this.light.shadowCameraVisible;
}

LightSource.prototype.setTarget = function(x, y, z)
{
	this.light.target.position.set(x, y, z);
	this.light.updateMatrix();
	this.light.updateMatrixWorld();
};

LightSource.prototype.setPosition = function(x, y, z)
{
	this.light.position.set(x, y, z);
	this.light.updateMatrix();
	this.light.updateMatrixWorld();
};

LightSource.prototype.move = function(x, y, z)
{
	this.light.position.x += x;
	this.light.position.y += y;
	this.light.position.z += z;
	this.light.updateMatrix();
	this.light.updateMatrixWorld();
};

LightSource.prototype.add = function()
{
	scene.add(this.light);
	scene.add(this.ambient);
};

LightSource.prototype.remove = function()
{
	scene.remove(this.light);
	scene.remove(this.ambient);
};

LightSource.prototype.light = function()
{
	return this.light;
};