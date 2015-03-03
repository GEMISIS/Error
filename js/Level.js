var Level = function()
{
	this.walls = new Array();
	this.balls = new Array();
	this.models = new Array();
};

Level.prototype.load = function(levelFile)
{
	var walls = this.walls;
	var balls = this.balls;
	var models = this.models;

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", levelFile, false);
	rawFile.onreadystatechange = function()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var fileContents = rawFile.responseText;
				this.levelJson = JSON.parse(fileContents);

				for(var layer = 0;layer < this.levelJson.levelData.length;layer += 1)
				{
					walls[layer] = new Array();
					balls[layer] = new Array();
					models[layer] = new Array();
					var layerData = this.levelJson.levelData[layer];

					var offsetX = 0;
					var offsetY = 0;

					if(layerData.offsetX !== undefined)
					{
						offsetX = layerData.offsetX;
					}
					if(layerData.offsetY !== undefined)
					{
						offsetY = layerData.offsetY;
					}

					for(var y = 0; y < layerData.height; y += 1)
					{
						for(var x = 0; x < layerData.width; x += 1)
						{
							var tile = layerData.data[x + y * layerData.width];
							if(tile == 0)
							{
								var chance = Math.floor((Math.random() * 100) + 1);
								if(chance <= 10)
								{
									tile = 8;
								}
							}
							if(tile === 1)
							{
								walls[layer][walls[layer].length] = new Wall(10, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 10 + offsetX, 0, -y * 10 + 10 + offsetY, false);
							}
							if(tile === 2)
							{
								walls[layer][walls[layer].length] = new Wall(10, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 10 + offsetX, layer * 10, -y * 10 + 10 + offsetY, true);
							}
							if(tile === 3)
							{
								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 7.5 + offsetX, layer * 10, -y * 10 + 10 + offsetY, false);

								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 10 + offsetX, layer * 10, -y * 10 + 7.5 + offsetY, true);
							}
							if(tile === 4)
							{
								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 12.5 + offsetX, layer * 10, -y * 10 + 10 + offsetY, false);

								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 10 + offsetX, layer * 10, -y * 10 + 7.5 + offsetY, true);
							}
							if(tile === 5)
							{
								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 7.5 + offsetX, layer * 10, -y * 10 + 10 + offsetY, false);

								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 10 + offsetX, layer * 10, -y * 10 + 12.5 + offsetY, true);
							}
							if(tile === 6)
							{
								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 12.5 + offsetX, layer * 10, -y * 10 + 10 + offsetY, false);

								walls[layer][walls[layer].length] = new Wall(5, 10, "checkerboard.jpg", 1, 1);
								walls[layer][walls[layer].length - 1].create(x * 10 - 10 + offsetX, layer * 10, -y * 10 + 12.5 + offsetY, true);
							}
							if(tile === 7)
							{
								balls[layer][balls[layer].length] = new Sphere(1, 16, undefined, "checkerboard.jpg");
								balls[layer][balls[layer].length - 1].create(x * 10 + offsetX, 2 + layer * 10, -y * 10 + offsetY, true);
							}
							if(tile == 8)
							{
								//var testModel = new ObjModel("dresses00", 2, 4, -10, 1, 3, 0.5);
								//models[layer][models[layer].length] = new ObjModel("dresses00", x * 10 + offsetX, 2 + layer * 10, -y * 10 + offsetY, 
								//													1, 3, 0.5);
							}
						}
					}
				}
			}
		}
	}
	rawFile.send(null);
};

Level.prototype.add = function()
{
	for(var layer = 0;layer < this.walls.length; layer += 1)
	{
		for(var tile = 0;tile < this.walls[layer].length; tile += 1)
		{
			this.walls[layer][tile].add();
		}
	}
	for(var layer = 0;layer < this.balls.length; layer += 1)
	{
		for(var tile = 0;tile < this.balls[layer].length; tile += 1)
		{
			this.balls[layer][tile].add();
		}
	}
};

Level.prototype.remove = function()
{
	for(var layer = 0;layer < this.walls.length; layer += 1)
	{
		for(var tile = 0;tile < this.walls[layer].length; tile += 1)
		{
			this.walls[layer][tile].remove();
		}
	}
	for(var layer = 0;layer < this.balls.length; layer += 1)
	{
		for(var tile = 0;tile < this.balls[layer].length; tile += 1)
		{
			this.balls[layer][tile].remove();
		}
	}
	for(var layer = 0;layer < this.models.length; layer += 1)
	{
		for(var tile = 0;tile < this.models[layer].length; tile += 1)
		{
			if(this.models[layer][tile] !== undefined)
			{
				this.models[layer][tile].remove();
			}
		}
	}
};

