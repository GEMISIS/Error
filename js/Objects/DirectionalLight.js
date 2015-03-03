var DirectionalLight = function(instensity, color){
	this.instensity = 1;
	this.color = 0xffffff;

	if(instensity !== undefined)
	{
		this.instensity = instensity;
	}
	if(color !== undefined)
	{
		this.color = color;
	}
};

DirectionalLight.prototype.create = function(x, y, z) {
	this.ambient = new THREE.AmbientLight(0x111111 & this.color);
	this.light = new THREE.DirectionalLight(this.color, this.instensity);

	this.light.position.set(x, y, z);

	this.light.castShadow = true;

	this.light.shadowDarkness = 0.8;

	this.light.shadowCameraNear = 3;
	this.light.shadowCameraFar = 4000;
	this.light.shadowCameraFov = 50;

	this.light.shadowMapWidth = 2048;
	this.light.shadowMapHeight = 2048;
};

DirectionalLight.prototype.toggleDebug = function()
{
	this.light.shadowCameraVisible = !this.light.shadowCameraVisible;
}

DirectionalLight.prototype.setTarget = function(x, y, z)
{
	this.light.target.position.set(x, y, z);
	this.light.updateMatrix();
	this.light.updateMatrixWorld();
};

DirectionalLight.prototype.setPosition = function(x, y, z)
{
	this.light.position.set(x, y, z);
	this.light.updateMatrix();
	this.light.updateMatrixWorld();
};

DirectionalLight.prototype.move = function(x, y, z)
{
	this.light.position.x += x;
	this.light.position.y += y;
	this.light.position.z += z;
	this.light.updateMatrix();
	this.light.updateMatrixWorld();
};

DirectionalLight.prototype.add = function()
{
	scene.add(this.light);
	scene.add(this.ambient);
};

DirectionalLight.prototype.remove = function()
{
	scene.remove(this.light);
	scene.remove(this.ambient);
};

DirectionalLight.prototype.light = function()
{
	return this.light;
};