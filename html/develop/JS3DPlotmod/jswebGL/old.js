


	this.moonTexture;

	this.testMessage = "hello";
	this.cubeVertexPositionBuffer;
	this.cubeVertexTextureCoordBuffer;
	this.cubeVertexIndexBuffer;

this.drawSceneLines = function() {

		this.mvPushMatrix(this);

		this.gl.useProgram(this.shaderProgram);

		// Enable the vertex arrays for the current shader.
		this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		this.shaderProgram.vertexNormalAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
		this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		mat4.perspective(5, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, [ 0.0, -0.1, -19.0 ]);
		mat4.multiply(this.mvMatrix, this.rotationMatrix);

		// Disable the vertex arrays for the current shader.
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

		// this.glLines.draw();

		// code from initLinesBuffers in GLLines.js
		var linesVertexPositionBuffer = null;
		var vertices = [];
		vertices = vertices.concat(0, 0, 0);
		vertices = vertices.concat(1, 0, 0);
		vertices = vertices.concat(1, 0, 0);
		vertices = vertices.concat(.5, .6, 2.3);
		vertices = vertices.concat(.5, .6, 2.3);
		vertices = vertices.concat(0, 0, .4);
		vertices = vertices.concat(0, 0, .4);
		vertices = vertices.concat(0.3, 0.3, .4);

		if (this.once) {
			printlnMessage('messages', 'JSSurfacePlot.js drawSceneLines vertices:' + JSON.stringify(vertices));
			// printlnMessage('messages', 'JSSurfacePlot.js drawSceneLines
			// vertices
			// length: ' + vertices.length);
			this.once = false;
		}
		linesVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, linesVertexPositionBuffer);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
		linesVertexPositionBuffer.itemSize = 3;
		linesVertexPositionBuffer.numItems = vertices.length / 3;
		// end code from initLinesBuffers in GLLines.js

		// code from draw in GLLines.js
		this.gl.useProgram(this.shaderAxesProgram);

		// Enable the vertex array for the current shader.
		this.shaderAxesProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderAxesProgram,
				"aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderAxesProgram.vertexPositionAttribute);

		// Set the colour of the lines.
		this.gl.uniform3f(this.shaderAxesProgram.axesColour, 0.9, 0.0, 0.1);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, linesVertexPositionBuffer);
		this.gl.vertexAttribPointer(this.shaderAxesProgram.vertexPositionAttribute, linesVertexPositionBuffer.itemSize,
				this.gl.FLOAT, false, 0, 0);

		this.gl.lineWidth(2);
		this.setMatrixUniforms(this.shaderAxesProgram, this.pMatrix, this.mvMatrix);
		this.gl.drawArrays(this.gl.LINES, 0, linesVertexPositionBuffer.numItems);

		// Enable the vertex array for the current shader.
		this.gl.disableVertexAttribArray(this.shaderAxesProgram.vertexPositionAttribute);
		// end code from draw in GLLines.js

		this.mvPopMatrix(this);
	};

	this.drawSceneMoon = function() {

		this.mvPushMatrix(this);

		this.gl.useProgram(this.shaderProgram);

		// Enable the vertex arrays for the current shader.
		this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		this.shaderProgram.vertexNormalAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
		this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		mat4.perspective(5, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, [ 0.0, -0.1, -19.0 ]);
		mat4.multiply(this.mvMatrix, this.rotationMatrix);

		// Disable the vertex arrays for the current shader.
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

		var cubeVertexPositionBuffer;
		var cubeVertexTextureCoordBuffer;
		var cubeVertexIndexBuffer;

		cubeVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
		vertices = [ -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, ];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		cubeVertexPositionBuffer.itemSize = 3;
		cubeVertexPositionBuffer.numItems = 4;

		cubeVertexTextureCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
		var textureCoords = [ 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, ];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
		cubeVertexTextureCoordBuffer.itemSize = 2;
		cubeVertexTextureCoordBuffer.numItems = 4;

		cubeVertexIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
		var cubeVertexIndices = [ 0, 1, 2, 0, 2, 3, ];
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);
		cubeVertexIndexBuffer.itemSize = 1;
		cubeVertexIndexBuffer.numItems = 6;

		// code from lesson05
		this.gl.useProgram(this.shaderTextureProgram);

		this.shaderTextureProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderTextureProgram, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderTextureProgram.vertexPositionAttribute);

		this.shaderTextureProgram.textureCoordAttribute = this.gl.getAttribLocation(this.shaderTextureProgram, "aTextureCoord");
		this.gl.enableVertexAttribArray(this.shaderTextureProgram.textureCoordAttribute);

		this.shaderTextureProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uPMatrix");
		this.shaderTextureProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uMVMatrix");
		this.shaderTextureProgram.samplerUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uSampler");

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
		this.gl.vertexAttribPointer(this.shaderTextureProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, this.gl.FLOAT,
				false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
		this.gl.vertexAttribPointer(this.shaderTextureProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, this.gl.FLOAT,
				false, 0, 0);

		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.moonTexture);
		this.gl.uniform1i(this.shaderTextureProgram.samplerUniform, 0);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
		//setMatrixUniforms();
		this.setMatrixUniforms(this.shaderTextureProgram, this.pMatrix, this.mvMatrix);
		this.gl.drawElements(this.gl.TRIANGLES, cubeVertexIndexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);

		
		this.glLines.draw();
		this.glAxes.draw();
		this.glSurface.draw();

		this.mvPopMatrix(this);
	};
	this.drawSceneMoonFirst = function() {

		this.mvPushMatrix(this);

		this.gl.useProgram(this.shaderProgram);

		// Enable the vertex arrays for the current shader.
		this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		this.shaderProgram.vertexNormalAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
		this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
		this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		mat4.perspective(5, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
		mat4.identity(this.mvMatrix);

		mat4.translate(this.mvMatrix, [ 0.0, -0.1, -19.0 ]);

		mat4.multiply(this.mvMatrix, this.rotationMatrix);

		// Disable the vertex arrays for the current shader.
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
		this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

		var cubeVertexPositionBuffer;
		var cubeVertexTextureCoordBuffer;
		var cubeVertexIndexBuffer;

		cubeVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
		vertices = [ -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, ];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		cubeVertexPositionBuffer.itemSize = 3;
		cubeVertexPositionBuffer.numItems = 4;

		cubeVertexTextureCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
		var textureCoords = [ 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, ];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
		cubeVertexTextureCoordBuffer.itemSize = 2;
		cubeVertexTextureCoordBuffer.numItems = 4;

		cubeVertexIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
		var cubeVertexIndices = [ 0, 1, 2, 0, 2, 3, ];
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);
		cubeVertexIndexBuffer.itemSize = 1;
		cubeVertexIndexBuffer.numItems = 6;

		// code from lesson05
		this.gl.useProgram(this.shaderTextureProgram);

		this.shaderTextureProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderTextureProgram, "aVertexPosition");
		this.gl.enableVertexAttribArray(this.shaderTextureProgram.vertexPositionAttribute);

		this.shaderTextureProgram.textureCoordAttribute = this.gl.getAttribLocation(this.shaderTextureProgram, "aTextureCoord");
		this.gl.enableVertexAttribArray(this.shaderTextureProgram.textureCoordAttribute);

		this.shaderTextureProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uPMatrix");
		this.shaderTextureProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uMVMatrix");
		this.shaderTextureProgram.samplerUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uSampler");

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);

		mat4.identity(this.mvMatrix);

		mat4.translate(this.mvMatrix, [ 0.0, 0.0, -5.0 ]);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
		this.gl.vertexAttribPointer(this.shaderTextureProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, this.gl.FLOAT,
				false, 0,	 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
		this.gl.vertexAttribPointer(this.shaderTextureProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, this.gl.FLOAT,
				false, 0, 0);

		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.moonTexture);
		this.gl.uniform1i(this.shaderTextureProgram.samplerUniform, 0);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
		//setMatrixUniforms();
		this.setMatrixUniforms(this.shaderTextureProgram, this.pMatrix, this.mvMatrix);
		this.gl.drawElements(this.gl.TRIANGLES, cubeVertexIndexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);

		this.mvPopMatrix(this);
	};

	this.initTexture(this);
	
	
	this.initTexture = function(thisvar) {
		this.moonTexture = this.gl.createTexture();
		this.moonTexture.image = new Image();
		this.moonTexture.image.onload = function() {
			// printlnMessage('messages', 'JSSurfacePlot.js GLText2 image
			// loaded');
			// printlnMessage('messages', thisvar);
			// printlnMessage('messages', thisvar.testMessage);

			thisvar.gl.pixelStorei(thisvar.gl.UNPACK_FLIP_Y_WEBGL, true);
			thisvar.gl.bindTexture(thisvar.gl.TEXTURE_2D, thisvar.moonTexture);
			thisvar.gl.texImage2D(thisvar.gl.TEXTURE_2D, 0, thisvar.gl.RGBA, thisvar.gl.RGBA, thisvar.gl.UNSIGNED_BYTE,
					thisvar.moonTexture.image);
			thisvar.gl.texParameteri(thisvar.gl.TEXTURE_2D, thisvar.gl.TEXTURE_MAG_FILTER, thisvar.gl.LINEAR);
			thisvar.gl.texParameteri(thisvar.gl.TEXTURE_2D, thisvar.gl.TEXTURE_MIN_FILTER,
					thisvar.gl.LINEAR_MIPMAP_NEAREST);
			thisvar.gl.generateMipmap(thisvar.gl.TEXTURE_2D);

			thisvar.gl.bindTexture(thisvar.gl.TEXTURE_2D, null);
		};

		this.moonTexture.image.src = "moon.gif";
	};
	// self.drawSceneLines();
	//self.drawSceneMoonFirst();
	//self.drawSceneMoon();

	this.initTextureSphereBuffers();

	
	
