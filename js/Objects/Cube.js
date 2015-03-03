var Cube = function(width, height, depth, color, texture, mass){
	this.width = 1;
	this.height = 1;
	this.depth = 1;

	this.mass = 1;

	if(width != undefined)
	{
		this.width = width;
	}
	if(height != undefined)
	{
		this.height = height;
	}
	if(depth != undefined)
	{
		this.depth = depth;
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

Cube.prototype.create = function(x, y, z, enableLighting, tile_width, tile_height) {
	if(this.texture !== undefined)
	{
		this.cubeTexture = new THREE.ImageUtils.loadTexture('images/' + this.texture, THREE.UVMapping);
		this.cubeTexture.wrapS = this.cubeTexture.wrapT = THREE.RepeatWrapping; 
		if(tile_width !== undefined && tile_height !== undefined)
		{
			this.cubeTexture.repeat.set(tile_width, tile_width);
		}
		else
		{
			this.cubeTexture.repeat.set(1, 1);
		}
		this.cubeTexture.anisotropy = renderer.getMaxAnisotropy();
		this.cubeTexture.minFilter = this.cubeTexture.magFilter = THREE.LinearMipMapFilter;
		
		if(enableLighting !== undefined && enableLighting)
		{
			this.cubeMaterial = new THREE.MeshPhongMaterial({ map: this.cubeTexture, side: THREE.DoubleSide} );
		}
		else
		{
			this.cubeMaterial = new THREE.MeshBasicMaterial({ map: this.cubeTexture, side: THREE.DoubleSide} );
		}
	}
	else if(this.color !== undefined)
	{
		if(enableLighting !== undefined && enableLighting)
		{
			this.cubeMaterial = new THREE.MeshPhongMaterial({ color: this.color, side: THREE.DoubleSide} );
		}
		else
		{
			this.cubeMaterial = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide} );
		}
	}
	else
	{
		if(enableLighting !== undefined && enableLighting)
		{
			this.cubeMaterial = new THREE.MeshPhongMaterial({ transparent: true, side: THREE.DoubleSide} );
		}
		else
		{
			this.cubeMaterial = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide} );
		}
	}

	this.cubeGeo = new THREE.BoxGeometry(this.width, this.height, this.depth, 1, 1, 1);
	this.cube = new Physijs.BoxMesh(this.cubeGeo, this.cubeMaterial, this.mass);

	this.cubeMaterial.ambient = this.cubeMaterial.color;

	this.cube.position.set(x, y, z);
	if(enableLighting !== undefined && enableLighting)
	{
		this.cube.castShadow = true;
		this.cube.receiveShadow = false;
	}
};

Cube.prototype.setPosition = function(x, y, z)
{
	this.cube.position.set(x, y, z);
};

Cube.prototype.move = function(x, y, z)
{
	this.cube.position.x += x;
	this.cube.position.y += y;
	this.cube.position.z += z;
};

Cube.prototype.setRotation = function(x, y, z)
{
	this.cube.rotation.set(x, y, z);
};

Cube.prototype.rotate = function(x, y, z)
{
	this.cube.rotation.x += x;
	this.cube.rotation.y += y;
	this.cube.rotation.z += z;
};

Cube.prototype.add = function()
{
	scene.add(this.cube);
};

Cube.prototype.remove = function()
{
	scene.remove(this.cube);
};

Cube.prototype.cube = function()
{
	return this.cube;
};