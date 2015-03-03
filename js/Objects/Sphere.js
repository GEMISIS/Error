var Sphere = function(radius, slices, color, texture, mass){
	this.radius = 1;
	this.slices = 200;
	this.mass = 1;
	if(radius != undefined)
	{
		this.radius = radius;
	}
	if(slices != undefined)
	{
		this.slices = slices;
	}
	if(color != undefined)
	{
		this.color = color;
	}
	if(texture != undefined)
	{
		this.texture = texture;
	}
	if(mass != undefined)
	{
		this.mass = mass;
	}
};

Sphere.prototype.create = function(x, y, z, enableLighting, tile_width, tile_height) {
	if(this.texture !== undefined)
	{
		this.sphereTexture = new THREE.ImageUtils.loadTexture('images/' + this.texture, THREE.UVMapping);
		this.sphereTexture.wrapS = this.sphereTexture.wrapT = THREE.RepeatWrapping; 
		if(tile_width !== undefined && tile_height !== undefined)
		{
			this.sphereTexture.repeat.set(tile_width, tile_width);
		}
		else
		{
			this.sphereTexture.repeat.set(1, 1);
		}
		this.sphereTexture.anisotropy = renderer.getMaxAnisotropy();
		this.sphereTexture.minFilter = this.sphereTexture.magFilter = THREE.LinearMipMapFilter;
		
		if(enableLighting !== undefined && enableLighting)
		{
			this.sphereMaterial = new THREE.MeshPhongMaterial({ map: this.sphereTexture, side: THREE.DoubleSide} );
		}
		else
		{
			this.sphereMaterial = new THREE.MeshBasicMaterial({ map: this.sphereTexture, side: THREE.DoubleSide} );
		}
	}
	else if(this.color !== undefined)
	{
		if(enableLighting !== undefined && enableLighting)
		{
			this.sphereMaterial = new THREE.MeshPhongMaterial({ color: this.color, side: THREE.DoubleSide} );
		}
		else
		{
			this.sphereMaterial = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide} );
		}
	}
	else
	{
		if(enableLighting !== undefined && enableLighting)
		{
			this.sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide} );
		}
		else
		{
			this.sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide} );
		}
	}

	this.sphereGeo = new THREE.SphereGeometry( this.radius, this.slices, this.slices );
	this.sphere = new Physijs.SphereMesh(this.sphereGeo, this.sphereMaterial, this.mass);

	this.sphereMaterial.ambient = this.sphereMaterial.color;

	this.sphere.position.set(x, y, z);
	if(enableLighting !== undefined && enableLighting)
	{
		this.sphere.castShadow = true;
		this.sphere.receiveShadow = false;
	}
};

Sphere.prototype.setPosition = function(x, y, z)
{
	this.sphere.position.set(x, y, z);
};

Sphere.prototype.move = function(x, y, z)
{
	this.sphere.position.x += x;
	this.sphere.position.y += y;
	this.sphere.position.z += z;
};

Sphere.prototype.setRotation = function(x, y, z)
{
	this.sphere.rotation.set(x, y, z);
};

Sphere.prototype.rotate = function(x, y, z)
{
	this.sphere.rotation.x += x;
	this.sphere.rotation.y += y;
	this.sphere.rotation.z += z;
};

Sphere.prototype.add = function()
{
	scene.add(this.sphere);
};

Sphere.prototype.remove = function()
{
	scene.remove(this.sphere);
};

Sphere.prototype.sphere = function()
{
	return this.sphere;
};