var ObjModel = function(modelName, x, y, z, width, height, depth, mass)
{
	this.loader = new THREE.OBJMTLLoader();

	var temp = this;

	var modelLoaded = function(object, materials)
	{
		temp.object = object;
		temp.object.position.set(x, y, z);
		scene.add(temp.object);

		var sphereMass = 1;
		if(mass !== undefined)
		{
			sphereMass = mass;
		}
		temp.box = new Physijs.SphereMesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshLambertMaterial({ opacity: 0, transparent: true, color: 0xff0000 }), sphereMass);
		temp.box.position.set(x, y, z);
		temp.box.name = modelName;
		temp.box.model = temp;
		temp.box.addEventListener( 'update', function() {
			//temp.object.rotation.set(temp.box.rotation.x, temp.box.rotation.y, temp.box.rotation.z);
			temp.object.position.set(temp.box.position.x + width * 1.5, temp.box.position.y + height * 0.75, temp.box.position.z - depth * 1.5);
		});
		scene.add(temp.box);

		if(modelCache !== undefined && modelCache[modelName] === undefined)
		{
			modelCache[modelName] = object.clone();
		}
	};
	if(modelCache !== undefined && modelCache[modelName] !== undefined)
	{
		modelLoaded(modelCache[modelName], null);
	}
	else
	{
		this.loader.load("models/" + modelName + ".obj", "models/" + modelName + ".mtl", modelLoaded);
	}
};

ObjModel.prototype.setPosition = function(x, y, z)
{
	this.object.position.set(x, y, z);
};

ObjModel.prototype.move = function(x, y, z)
{
	this.object.position.x += x;
	this.object.position.y += y;
	this.object.position.z += z;
};

ObjModel.prototype.setRotation = function(x, y, z)
{
	this.object.rotation.set(x, y, z);
};

ObjModel.prototype.rotate = function(x, y, z)
{
	this.object.rotation.x += x;
	this.object.rotation.y += y;
	this.object.rotation.z += z;
};

ObjModel.prototype.add = function()
{
};

ObjModel.prototype.remove = function()
{
	if(this.object !== undefined)
	{
		scene.remove(this.object);
	}
	if(this.box !== undefined)
	{
		scene.remove(this.box);
	}
};

ObjModel.prototype.model = function()
{
	return this.object;
};

