/*
 * This class represents the lines for the webGL plot.
 */
GLLines = function(linePoints, surfacePlot) {
	this.shaderProgram = surfacePlot.shaderAxesProgram;
	this.currenShader = null;
	this.gl = surfacePlot.gl;
	this.linePoints = linePoints;
	this.setMatrixUniforms = surfacePlot.setMatrixUniforms;
	this.axesVertexPositionBuffer = null;
	this.surfacePlot = surfacePlot;

	this.initAxesBuffers = function() {

		//printlnMessage('messages', 'GLLines linePoints ' + JSON.stringify(linePoints));

		var vertices = [];
		// var i;

		for ( var i = 0; i < linePoints.length; i += 3) {

			// i=0;
			vertices = vertices.concat(linePoints[i + 0]);
			vertices = vertices.concat(linePoints[i + 1]);
			vertices = vertices.concat(linePoints[i + 2]);

			// i=3;
			vertices = vertices.concat(linePoints[i + 3]);
			vertices = vertices.concat(linePoints[i + 4]);
			vertices = vertices.concat(linePoints[i + 5]);
		}

		// i=3;
		// vertices = vertices.concat(linePoints[i+0]);
		// vertices = vertices.concat(linePoints[i+1]);
		// vertices = vertices.concat(linePoints[i+2]);
		//        
		// i=6;
		// vertices = vertices.concat(linePoints[i+0]);
		// vertices = vertices.concat(linePoints[i+1]);
		// vertices = vertices.concat(linePoints[i+2]);
		//        
		// i=6;
		// vertices = vertices.concat(linePoints[i+0]);
		// vertices = vertices.concat(linePoints[i+1]);
		// vertices = vertices.concat(linePoints[i+2]);
		//        
		// i=9;
		// vertices = vertices.concat(linePoints[i+0]);
		// vertices = vertices.concat(linePoints[i+1]);
		// vertices = vertices.concat(linePoints[i+2]);

		//printlnMessage('messages', 'GLLines vertices ' + JSON.stringify(vertices));

		// lines.
		this.axesVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.axesVertexPositionBuffer);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
		this.axesVertexPositionBuffer.itemSize = 3;
		this.axesVertexPositionBuffer.numItems = vertices.length / 3;

	};

	this.initAxesBuffers();
};

GLLines.prototype.draw = function() {
	this.currentShader = this.shaderProgram;
	this.gl.useProgram(this.currentShader);

	// Enable the vertex array for the current shader.
	this.currentShader.vertexPositionAttribute = this.gl.getAttribLocation(this.currentShader, "aVertexPosition");
	this.gl.enableVertexAttribArray(this.currentShader.vertexPositionAttribute);

	this.gl.uniform3f(this.currentShader.axesColour, 0.9, 0.0, 0.1); // Set
																		// the
																		// colour
																		// of
																		// the
																		// Major
																		// axis
																		// lines.
	// Major axis lines
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.axesVertexPositionBuffer);
	this.gl.vertexAttribPointer(this.currentShader.vertexPositionAttribute, this.axesVertexPositionBuffer.itemSize,
			this.gl.FLOAT, false, 0, 0);

	this.gl.lineWidth(2);
	this.setMatrixUniforms(this.currentShader, this.surfacePlot.pMatrix, this.surfacePlot.mvMatrix);
	this.gl.drawArrays(this.gl.LINES, 0, this.axesVertexPositionBuffer.numItems);

	// printlnMessage('messages', 'axesVertexPositionBuffer.numItems
	// '+this.axesVertexPositionBuffer.numItems);

	// Enable the vertex array for the current shader.
	this.gl.disableVertexAttribArray(this.currentShader.vertexPositionAttribute);

};