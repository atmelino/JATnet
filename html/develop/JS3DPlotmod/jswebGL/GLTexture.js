/*
 * This class represents the texture for the webGL plot.
 */
GLTexture = function(surfacePlot) {
	this.shaderTextureProgram = surfacePlot.shaderTextureProgram;
	this.currenShader = null;
	this.gl = surfacePlot.gl;
	this.setMatrixUniforms = surfacePlot.setMatrixUniforms;
	this.vertexTextureCoordBuffer = null;
	this.textureVertexPositionBuffer = null;
	this.textureVertexIndexBuffer = null;
	this.context2D = surfacePlot.context2D;
	this.texture;
	this.surfacePlot = surfacePlot;

	this.handleLoadedTexture = function(moonTexture) {
		// function handleLoadedTexture(moonTexture, gl) {

		// gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		// gl.bindTexture(gl.TEXTURE_2D, texture);
		// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		// texture.image);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
		// gl.LINEAR_MIPMAP_NEAREST);
		// gl.generateMipmap(gl.TEXTURE_2D);
		// gl.bindTexture(gl.TEXTURE_2D, null);

		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		this.gl.texImage2D(gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
		this.gl.bindTexture(gl.TEXTURE_2D, null);
	};

	this.initTextureBuffers = function() {

		moonTexture = this.gl.createTexture();
		moonTexture.image = new Image();
		moonTexture.image.onload = function() {
			printlnMessage('messages', 'image loaded');
			this.handleLoadedTexture(moonTexture);
			// handleLoadedTexture(moonTexture, this.gl);

		};

		moonTexture.image.src = "moon.gif";

		// Text texture vertices
		this.textureVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureVertexPositionBuffer);
		this.textureVertexPositionBuffer.itemSize = 3;
		this.textureVertexPositionBuffer.numItems = 4;
		this.shaderTextureProgram.textureCoordAttribute = this.gl.getAttribLocation(this.shaderTextureProgram,
				"aTextureCoord");
		this.gl.vertexAttribPointer(this.shaderTextureProgram.textureCoordAttribute,
				this.textureVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureVertexPositionBuffer);

		// Where we render the text.
		var texturePositionCoords = [ -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5 ];

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texturePositionCoords), this.gl.STATIC_DRAW);

		// Texture index buffer.
		this.textureVertexIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.textureVertexIndexBuffer);

		var textureVertexIndices = [ 0, 1, 2, 0, 2, 3 ];

		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(textureVertexIndices), this.gl.STATIC_DRAW);
		this.textureVertexIndexBuffer.itemSize = 1;
		this.textureVertexIndexBuffer.numItems = 6;

		// Text textures
		this.vertexTextureCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
		this.vertexTextureCoordBuffer.itemSize = 2;
		this.vertexTextureCoordBuffer.numItems = 4;
		this.gl.vertexAttribPointer(this.shaderTextureProgram.textureCoordAttribute,
				this.vertexTextureCoordBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);

		var textureCoords = [ 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0 ];

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
	};

	// printlnMessage('messages', 'GLTexture gl ' +
	// JSON.stringify(surfacePlot.gl));

	this.initTextureBuffers();

	this.texture = this.gl.createTexture();
};

GLTexture.prototype.draw = function() {

	// Enable blending for transparency.
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	this.gl.enable(this.gl.BLEND);
	this.gl.disable(this.gl.DEPTH_TEST);

	// Text
	this.currentShader = this.shaderTextureProgram;
	this.gl.useProgram(this.currentShader);

	// Enable the vertex arrays for the current shader.
	this.currentShader.vertexPositionAttribute = this.gl.getAttribLocation(this.currentShader, "aVertexPosition");
	this.gl.enableVertexAttribArray(this.currentShader.vertexPositionAttribute);
	this.currentShader.textureCoordAttribute = this.gl.getAttribLocation(this.currentShader, "aTextureCoord");
	this.gl.enableVertexAttribArray(this.currentShader.textureCoordAttribute);

	this.shaderTextureProgram.samplerUniform = this.gl.getUniformLocation(this.shaderTextureProgram, "uSampler");

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureVertexPositionBuffer);
	this.gl.vertexAttribPointer(this.currentShader.vertexPositionAttribute, this.textureVertexPositionBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	this.gl.vertexAttribPointer(this.currentShader.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
	this.gl.uniform1i(this.currentShader.samplerUniform, 0);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.textureVertexIndexBuffer);

	this.setMatrixUniforms(this.currentShader, this.surfacePlot.pMatrix, this.surfacePlot.mvMatrix);

	this.gl.drawElements(this.gl.TRIANGLES, this.textureVertexIndexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);

	// Disable blending for transparency.
	this.gl.disable(this.gl.BLEND);
	this.gl.enable(this.gl.DEPTH_TEST);

	// Disable the vertex arrays for the current shader.
	this.gl.disableVertexAttribArray(this.currentShader.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.currentShader.textureCoordAttribute);

};
