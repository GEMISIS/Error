function mainMenu()
{
	document.getElementById("paused").style.display = "none";
	document.getElementById("score").style.display = "none";
	document.getElementById("help").style.display = "none";

	scene.fog.color.setHex(0);
	scene.fog.density = 0.00075;
	camera.far = 100000;
	camera.updateProjectionMatrix();
	camera.position.set(0, 0, 600);
	camera.rotation.set(0, 0, 0);

	renderer.setClearColor(0x000000, 1);

	var selection = 0;
	var selectionScale = 1;
	var scaleAmount = 0.01;

	score = 0;
	document.getElementById("score").innerHTML = "Score: " + score;

	// Creates title text
	{
		var textMaterial = new THREE.MeshBasicMaterial( { color: 0x990000, overdraw: 0.5 } );

		var titleText = "Error";
		var titleProperties = {size: 80, height: 20, curveSegments: 2, font: "helvetiker"};

		var titleTextGeometry = new THREE.TextGeometry( titleText, titleProperties);

		titleTextGeometry.computeBoundingBox();
		var centerOffset = -0.5 * ( titleTextGeometry.boundingBox.max.x - titleTextGeometry.boundingBox.min.x );

		var title = new THREE.Mesh( titleTextGeometry, textMaterial );

		title.position.set(centerOffset, 140.0, 0);
		title.rotation.set(Math.PI / 8, 0, 0);
	}

	// Creates help text
	{
		var textMaterial = new THREE.MeshBasicMaterial( { color: 0x3A3A3A, overdraw: 0.5 } );

		var helpText = "Press Enter to Start!";
		var helpProperties = {size: 80, height: 12, curveSegments: 2, font: "helvetiker"};

		var helpTextGeometry = new THREE.TextGeometry( helpText, helpProperties);

		helpTextGeometry.computeBoundingBox();
		var help = new THREE.Mesh( helpTextGeometry, textMaterial );

		help.position.set(-300, 125, -900);
		help.rotation.set(0, 0, Math.PI / 8);

		helpTextGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(
			(helpTextGeometry.boundingBox.max.x - helpTextGeometry.boundingBox.min.x) / -2, 
			(helpTextGeometry.boundingBox.max.y - helpTextGeometry.boundingBox.min.y) / -2, 
			(helpTextGeometry.boundingBox.max.z - helpTextGeometry.boundingBox.min.z) / -2));
	}

	// Creates play text
	{
		var textMaterial = new THREE.MeshBasicMaterial( { color: 0x662222, overdraw: 0.5 } );

		var playText = "Play";
		var playProperties = {size: 80, height: 20, curveSegments: 2, font: "helvetiker"};

		var playTextGeometry = new THREE.TextGeometry( playText, playProperties);

		playTextGeometry.computeBoundingBox();
		var play = new THREE.Mesh( playTextGeometry, textMaterial );

		play.position.set(0, 0, 0);
		play.rotation.set(0, 0, 0);

		playTextGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(
			(playTextGeometry.boundingBox.max.x - playTextGeometry.boundingBox.min.x) / -2, 
			(playTextGeometry.boundingBox.max.y - playTextGeometry.boundingBox.min.y) / -2, 
			(playTextGeometry.boundingBox.max.z - playTextGeometry.boundingBox.min.z) / -2));
	}
	// Creates about text
	{
		var textMaterial = new THREE.MeshBasicMaterial( { color: 0x662222, overdraw: 0.5 } );

		var aboutText = "My Website";
		var aboutProperties = {size: 80, height: 20, curveSegments: 2, font: "helvetiker"};

		var aboutTextGeometry = new THREE.TextGeometry( aboutText, aboutProperties);

		aboutTextGeometry.computeBoundingBox();
		var about = new THREE.Mesh( aboutTextGeometry, textMaterial );

		about.position.set(0, -300.0, 0);
		about.rotation.set(0, 0, 0);

		aboutTextGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(
			(aboutTextGeometry.boundingBox.max.x - aboutTextGeometry.boundingBox.min.x) / -2, 
			(aboutTextGeometry.boundingBox.max.y - aboutTextGeometry.boundingBox.min.y) / -2, 
			(aboutTextGeometry.boundingBox.max.z - aboutTextGeometry.boundingBox.min.z) / -2));
	}

	setup = function()
	{
		group = new THREE.Group();
		group.add( title );
		group.add(help);
		group.add(play);
		group.add(about);

		scene.add( group );
	};

	cleanup = function()
	{
		scene.remove(group);
		group.remove( title );
		group.remove(help);
		group.remove(play);
		group.remove(about);

		delete group;
		delete title;
		delete help;
		delete play;
		delete about;
	};

	var defaultScale = 0.75;
	var distance = -400;
	update = function()
	{
		play.position.z = distance * 1.75;
		about.position.z = distance * 1.75;
		about.position.y = -300;

		selectionScale += scaleAmount;
		if(selectionScale <= 0.75 || selectionScale >= 1.25)
		{
			scaleAmount *= -1;
		}

		switch(selection)
		{
			case 0:
			play.position.z = selectionScale * distance;
			break;
			case 1:
			about.position.y = -200;
			about.position.z = selectionScale * distance;
			break;
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
			switch(selection)
			{
				case 0:
				state = 1;
				return;
				case 1:
				window.open("http://www.geraldmcalister.com");
				break;
			}
		}

		if(keyCode == 38 || keyCode == 87)
		{
			selection -= 1;
			selectionScale = defaultScale;
			scaleAmount = 0.01;
		}
		if(keyCode == 40 || keyCode == 83)
		{
			selection += 1;
			selectionScale = defaultScale;
			scaleAmount = 0.01;
		}

		if(selection < 0)
		{
			selection = 1;
		}
		if(selection > 1)
		{
			selection = 0;
		}
	}

	setup();
}

