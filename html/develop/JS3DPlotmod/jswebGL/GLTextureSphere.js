/*
 * This class represents the TextureSphere for the webGL plot.
 */
glTextureSphere = function(linePoints, surfacePlot) {
	this.shaderProgram = surfacePlot.shaderTextureProgram;
	this.gl = surfacePlot.gl;
	this.setMatrixUniforms = surfacePlot.setMatrixUniforms;
	this.moonVertexPositionBuffer;
	this.moonVertexNormalBuffer;
	this.moonVertexTextureCoordBuffer;
	this.moonVertexIndexBuffer;
	this.moonTexture;
	this.surfacePlot = surfacePlot;

	this.initTexture = function(thisvar) {
		this.moonTexture = this.gl.createTexture();
		this.moonTexture.image = new Image();
		this.moonTexture.image.onload = function() {
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

	this.initBuffers = function() {
		// var latitudeBands = 30;
		// var longitudeBands = 30;
		var latitudeBands = 2;
		var longitudeBands = 2;
		var radius = 1;

		var vertexPositionData = [];
		var normalData = [];
		var textureCoordData = [];
		var indexData = [];

		loop = false;
		loop = true;
		if (loop) {
			for ( var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
				var theta = latNumber * Math.PI / latitudeBands;
				var sinTheta = Math.sin(theta);
				var cosTheta = Math.cos(theta);

				for ( var longNumber = 0; longNumber <= longitudeBands; longNumber++) {

					// printlnMessage('messages', 'GLTextureSphere.js longnum '+
					// longNumber+' latnum '+latNumber);

					var phi = longNumber * 2 * Math.PI / longitudeBands;
					var sinPhi = Math.sin(phi);
					var cosPhi = Math.cos(phi);

					var x = cosPhi * sinTheta;
					var y = cosTheta;
					var z = sinPhi * sinTheta;
					var u = 1 - (longNumber / longitudeBands);
					var v = 1 - (latNumber / latitudeBands);

					normalData.push(x);
					normalData.push(y);
					normalData.push(z);
					textureCoordData.push(u);
					textureCoordData.push(v);
					vertexPositionData.push(radius * x);
					vertexPositionData.push(radius * y);
					vertexPositionData.push(radius * z);

					// printVectorArray('normal', normalData);
					// printlnMessage('messages','textureCoordData'+
					// textureCoordData);
					// printVectorArray('vertices', vertexPositionData);

				}
			}

			for ( var latNumber = 0; latNumber < latitudeBands; latNumber++) {
				for ( var longNumber = 0; longNumber < longitudeBands; longNumber++) {
					var first = (latNumber * (longitudeBands + 1)) + longNumber;
					var second = first + longitudeBands + 1;
					indexData.push(first);
					indexData.push(second);
					indexData.push(first + 1);

					indexData.push(second);
					indexData.push(second + 1);
					indexData.push(first + 1);
				}
			}

		} else {
			normalData = [ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 1.0, 0.0, -0.0,
					0.0, -1.0, 0.0, -0.0, -1.0, 0.0, 0.0, -1.0, -0.0 ];

			vertexPositionData = [];
			vertexPositionData = vertexPositionData.concat(0.0, 1.0, 0.0);
			vertexPositionData = vertexPositionData.concat(0.0, 1.0, 0.0);
			vertexPositionData = vertexPositionData.concat(0.0, 1.0, 0.0);
			vertexPositionData = vertexPositionData.concat(1.0, 0.0, 0.0);
			vertexPositionData = vertexPositionData.concat(-1.0, 0.0, 0.0);
			vertexPositionData = vertexPositionData.concat(1.0, 0.0, 0.0);
			vertexPositionData = vertexPositionData.concat(0.0, -1.0, 0.0);
			vertexPositionData = vertexPositionData.concat(0.0, -1.0, 0.0);
			vertexPositionData = vertexPositionData.concat(0.0, -1.0, 0.0);

			textureCoordData = [ 1, 1, 0.5, 1, 0, 1, 1, 0.5, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 0, 0, 0 ];

			indexData = [ 0, 3, 1, 3, 4, 1, 1, 4, 2, 4, 5, 2, 3, 6, 4, 6, 7, 4, 4, 7, 5, 7, 8, 5 ];

		}

		// printlnMessage('messages', 'GLTextureSphere.js vertexPositionData ' +
		// JSON.stringify(vertexPositionData));
		// printVectorArray('vertices', vertexPositionData);

		printArrayFormatted('normalData', normalData);
		printArrayFormatted('vertexPositionData', vertexPositionData);
		printlnMessage('messages', 'textureCoordData: ' + textureCoordData);
		printlnMessage('messages', 'indexData: ' + indexData);

		this.moonVertexNormalBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.moonVertexNormalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normalData), this.gl.STATIC_DRAW);
		this.moonVertexNormalBuffer.itemSize = 3;
		this.moonVertexNormalBuffer.numItems = normalData.length / 3;

		this.moonVertexTextureCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.moonVertexTextureCoordBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this.gl.STATIC_DRAW);
		this.moonVertexTextureCoordBuffer.itemSize = 2;
		this.moonVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

		this.moonVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.moonVertexPositionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), this.gl.STATIC_DRAW);
		this.moonVertexPositionBuffer.itemSize = 3;
		this.moonVertexPositionBuffer.numItems = vertexPositionData.length / 3;

		this.moonVertexIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.moonVertexIndexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), this.gl.STATIC_DRAW);
		this.moonVertexIndexBuffer.itemSize = 1;
		this.moonVertexIndexBuffer.numItems = indexData.length;
	};

	this.initTexture(this);
	this.initBuffers();

};

glTextureSphere.prototype.draw = function() {

	this.currentShader = this.shaderProgram;
	this.gl.useProgram(this.currentShader);

	this.currentShader.vertexPositionAttribute = this.gl.getAttribLocation(this.currentShader, "aVertexPosition");
	this.gl.enableVertexAttribArray(this.currentShader.vertexPositionAttribute);

	this.currentShader.textureCoordAttribute = this.gl.getAttribLocation(this.currentShader, "aTextureCoord");
	this.gl.enableVertexAttribArray(this.currentShader.textureCoordAttribute);

	this.currentShader.pMatrixUniform = this.gl.getUniformLocation(this.currentShader, "uPMatrix");
	this.currentShader.mvMatrixUniform = this.gl.getUniformLocation(this.currentShader, "uMVMatrix");
	this.currentShader.samplerUniform = this.gl.getUniformLocation(this.currentShader, "uSampler");

	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.moonVertexPositionBuffer);
	this.gl.vertexAttribPointer(this.currentShader.vertexPositionAttribute, this.moonVertexPositionBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.moonVertexTextureCoordBuffer);
	this.gl.vertexAttribPointer(this.currentShader.textureCoordAttribute, this.moonVertexTextureCoordBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.moonVertexNormalBuffer);
	this.gl.vertexAttribPointer(this.currentShader.vertexNormalAttribute, this.moonVertexNormalBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.activeTexture(this.gl.TEXTURE0);
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.moonTexture);
	this.gl.uniform1i(this.currentShader.samplerUniform, 0);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.moonVertexIndexBuffer);
	this.setMatrixUniforms(this.currentShader, this.surfacePlot.pMatrix, this.surfacePlot.mvMatrix);
	this.gl.drawElements(this.gl.TRIANGLES, this.moonVertexIndexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);

};
