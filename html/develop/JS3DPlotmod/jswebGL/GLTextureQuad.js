/*
 * This class represents the TextureQuad for the webGL plot.
 */
glTextureQuad = function(linePoints, surfacePlot) {
	this.shaderProgram = surfacePlot.shaderTextureProgram;
	this.gl = surfacePlot.gl;
	this.setMatrixUniforms = surfacePlot.setMatrixUniforms;
	this.cubeVertexPositionBuffer = null;
	this.cubeVertexTextureCoordBuffer = null;
	this.cubeVertexIndexBuffer = null;
	this.cubeTexture;
	this.surfacePlot = surfacePlot;

	this.initTexture = function(thisvar) {
		this.cubeTexture = this.gl.createTexture();
		this.cubeTexture.image = new Image();
		this.cubeTexture.image.onload = function() {
			thisvar.gl.pixelStorei(thisvar.gl.UNPACK_FLIP_Y_WEBGL, true);
			thisvar.gl.bindTexture(thisvar.gl.TEXTURE_2D, thisvar.cubeTexture);
			thisvar.gl.texImage2D(thisvar.gl.TEXTURE_2D, 0, thisvar.gl.RGBA, thisvar.gl.RGBA, thisvar.gl.UNSIGNED_BYTE,
					thisvar.cubeTexture.image);
			thisvar.gl.texParameteri(thisvar.gl.TEXTURE_2D, thisvar.gl.TEXTURE_MAG_FILTER, thisvar.gl.LINEAR);
			thisvar.gl.texParameteri(thisvar.gl.TEXTURE_2D, thisvar.gl.TEXTURE_MIN_FILTER,
					thisvar.gl.LINEAR_MIPMAP_NEAREST);
			thisvar.gl.generateMipmap(thisvar.gl.TEXTURE_2D);

			thisvar.gl.bindTexture(thisvar.gl.TEXTURE_2D, null);
		};

		this.cubeTexture.image.src = "moon.gif";
	};

	this.initTextureSphereBuffers = function() {

		this.cubeVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);

		factor =0.4;
		vertices = [];
		vertices = vertices.concat(0, -0.3	, 0);
		vertices = vertices.concat(1.0*factor, -1.0*factor, 0);
		vertices = vertices.concat(1.0*factor, 1.0*factor, 0);
		vertices = vertices.concat(-1.0*factor, 1.0*factor, 0);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		this.cubeVertexPositionBuffer.itemSize = 3;
		this.cubeVertexPositionBuffer.numItems = 4;

		this.cubeVertexTextureCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
		var textureCoords = [ 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, ];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
		this.cubeVertexTextureCoordBuffer.itemSize = 2;
		this.cubeVertexTextureCoordBuffer.numItems = 4;

		this.cubeVertexIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
		var cubeVertexIndices = [ 0, 1, 2, 0, 2, 3, ];
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);
		this.cubeVertexIndexBuffer.itemSize = 1;
		this.cubeVertexIndexBuffer.numItems = 6;

	};

	this.initTexture(this);
	this.initTextureSphereBuffers();
};

glTextureQuad.prototype.draw = function() {

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

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
	this.gl.vertexAttribPointer(this.currentShader.vertexPositionAttribute, this.cubeVertexPositionBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
	this.gl.vertexAttribPointer(this.currentShader.textureCoordAttribute, this.cubeVertexTextureCoordBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.activeTexture(this.gl.TEXTURE0);
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTexture);
	this.gl.uniform1i(this.currentShader.samplerUniform, 0);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
	this.setMatrixUniforms(this.currentShader, this.surfacePlot.pMatrix, this.surfacePlot.mvMatrix);
	this.gl.drawElements(this.gl.TRIANGLES, this.cubeVertexIndexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);

};
