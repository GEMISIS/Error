var Wall = function(width, height, texture, tile_width, tile_height){
	this.width = width;
	this.height = height;
	this.texture = texture;
	this.tile_width = tile_width;
	this.tile_height = tile_height;
};

Wall.prototype.create = function(x, y, z, verticle) {
	if(this.texture !== undefined)
	{
		this.wallTexture = new THREE.ImageUtils.loadTexture('images/' + this.texture, THREE.UVMapping);
		this.wallTexture.wrapS = this.wallTexture.wrapT = THREE.RepeatWrapping; 
		if(this.tile_width !== undefined && this.tile_height !== undefined)
		{
			this.wallTexture.repeat.set(this.tile_width, this.tile_height);
		}
		else
		{
			this.wallTexture.repeat.set(1, 1);
		}
		this.wallTexture.anisotropy = renderer.getMaxAnisotropy();
		this.wallTexture.minFilter = this.wallTexture.magFilter = THREE.LinearMipMapFilter;
	}

	this.wallGeo = new THREE.BoxGeometry(this.width, this.height, 0.01);
	this.wallMaterial = new THREE.MeshPhongMaterial({ map: this.wallTexture, shininess: 0, side: THREE.DoubleSide} );
	this.wall = new Physijs.BoxMesh(this.wallGeo, this.wallMaterial, 0);

	this.wall.position.set(x, y, z);

	if(verticle !== undefined && verticle)
	{
		this.wall.rotation.y = -Math.PI / 2;
	}
	else
	{
		this.wall.rotation.y = Math.PI;
	}

	this.wall.receiveShadow = true;
	this.wall.castShadow = false;

	this.wallMaterial.ambient = this.wallMaterial.color;

	this.wallMaterial.needsUpdate = true;
};

Wall.prototype.setPosition = function(x, y, z)
{
	this.wall.position.set(x, y, z);
};

Wall.prototype.move = function(x, y, z)
{
	this.wall.position.x += x;
	this.wall.position.y += y;
	this.wall.position.z += z;
};

Wall.prototype.add = function()
{
	scene.add(this.wall);
};

Wall.prototype.remove = function()
{
	scene.remove(this.wall);
};

Wall.prototype.wall = function()
{
	return this.wall;
};
