var FloorPlane = function(width, depth, texture, tile_width, tile_height)
{
	this.width = width;
	this.depth = depth;
	this.texture = texture;
	this.tile_width = tile_width;
	this.tile_height = tile_height;
};

FloorPlane.prototype.create = function()
{
	if(this.texture !== undefined)
	{
		this.floorTexture = new THREE.ImageUtils.loadTexture('images/' + this.texture, THREE.UVMapping);
		this.floorTexture.wrapS = this.floorTexture.wrapT = THREE.RepeatWrapping; 
		if(this.tile_width !== undefined && this.tile_height !== undefined)
		{
			this.floorTexture.repeat.set(this.tile_width, this.tile_height);
		}
		else
		{
			this.floorTexture.repeat.set(1, 1);
		}
		this.floorTexture.anisotropy = renderer.getMaxAnisotropy();
		this.floorTexture.minFilter = this.floorTexture.magFilter = THREE.LinearMipMapFilter;
	}

	this.planeGeo = new THREE.PlaneBufferGeometry(this.width, this.depth, 1, 1);
	this.planeMaterial = new THREE.MeshPhongMaterial({ map: this.floorTexture, shininess: 0, side: THREE.DoubleSide} );
	this.plane = new Physijs.BoxMesh(this.planeGeo, this.planeMaterial, 0);

	this.plane.position.set(0, 0, 0);
	this.plane.rotation.x = Math.PI / 2;

	this.plane.receiveShadow = true;
	this.plane.castShadow = false;

	this.planeMaterial.ambient = this.planeMaterial.color;
};

FloorPlane.prototype.setPosition = function(x, y, z)
{
	this.plane.position.set(x, y, z);
};

FloorPlane.prototype.move = function(x, y, z)
{
	this.plane.position.x += x;
	this.plane.position.y += y;
	this.plane.position.z += z;
};

FloorPlane.prototype.add = function()
{
	scene.add(this.plane);
};

FloorPlane.prototype.remove = function()
{
	scene.remove(this.plane);
};

FloorPlane.prototype.plane = function()
{
	return this.plane;
};