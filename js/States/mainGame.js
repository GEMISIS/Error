function mainGame()
{
	modelCache = new Array();
	document.getElementById("score").style.display = "block";
	document.getElementById("help").style.display = "block";

	renderer.setClearColor(0, 1);
	scene.fog.color.setHex(0);
	scene.fog.density = 0.0285;

	camera.rotation.y += -Math.PI / 5;

	camera.far = 300;
	camera.updateProjectionMatrix();

	var mainFloor = new FloorPlane(1000, 1000, "checkerboard.jpg", 200, 200);
	mainFloor.create();

	var test = new Level();
	test.load("Levels/level1.json");

	var jumping = false;
	var player = new Cube(1, 1, 1, undefined, undefined, 1);
	player.create(3, 2, 3);

	player.cube.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
	    // `this` is the mesh with the event listener
	    // other_object is the object `this` collided with
	    // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
    	if(other_object.name !== undefined)
    	{
    		if(other_object.name == "dresses00")
    		{
    			other_object.model.remove();
    			score += 1;
    			document.getElementById("score").innerHTML = "Score: " + score;
    		}
    	}
	    jumping = false;
	});

	// Spot light
	/*
	var sunLight = new LightSource(Math.PI / 2, 5, 1000, 0xffffaa);
	sunLight.create(100, 50, 100,
					-50, 25, 0);

	var sunLight2 = new LightSource(Math.PI / 2, 5, 1000, 0xffffaa);
	sunLight2.create(50, 25, 0,
					50, 25, 0);
*/
	var sunLight = new DirectionalLight(1, 0xffffaa);
	sunLight.create(100, 100, -100);

	position = {x: 0, y: 3, z: 5};

	var speed = 10;
	var velocity = {x: 0, y: 0, z: 0};
	var angularVelocity = 0.025;

	var paused = false;

	setup = function()
	{
		sunLight.add();
		//sunLight2.add();

		player.add();

		test.add();

		mainFloor.add();
	};

	cleanup = function()
	{
		sunLight.remove();
		//sunLight2.remove();

		player.remove();
		test.remove();

		mainFloor.remove();
	};

	update = function()
	{
		if(!paused)
		{
			velocity.x = velocity.y = velocity.z = 0;
			if(keys.space && !jumping)
			{
				velocity.y += 10;
				jumping = true;
			}

			if(keys.up)
			{
				velocity.x = -Math.sin(camera.rotation.y) * speed;
				velocity.z = -Math.cos(camera.rotation.y) * speed;
			}
			if(keys.down)
			{
				velocity.x = Math.sin(camera.rotation.y) * speed;
				velocity.z = Math.cos(camera.rotation.y) * speed;
			}
			if(keys.left)
			{
				camera.rotation.y += angularVelocity;
				player.cube.y -= angularVelocity;
			}
			if(keys.right)
			{
				camera.rotation.y -= angularVelocity;
				player.cube.y += angularVelocity;
			}
			velocity.y += player.cube.getLinearVelocity().y;
			player.cube.setLinearVelocity(velocity);
			camera.position.set(player.cube.position.x, player.cube.position.y + 2, player.cube.position.z);
			scene.simulate(undefined, 1);
			collision = false;
		}
	}

	render = function()
	{
	};
	
	onKeyDown = function(event)
	{
		var keyCode = event.which;

		if(keyCode == 13)
		{
			paused = !paused;
			if(paused)
			{
				document.getElementById("paused").style.display = "block";
			}
			else
			{
				document.getElementById("paused").style.display = "none";
			}
		}
		if(keyCode == 27 && paused)
		{
			state = 0;
		}
	}
	setup();
}

