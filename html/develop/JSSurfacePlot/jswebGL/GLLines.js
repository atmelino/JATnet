/*
 * This class represents the lines for the webGL plot.
 */
GLLines = function(data3D, surfacePlot){
    this.shaderProgram = surfacePlot.shaderAxesProgram;
    this.currenShader = null;
    this.gl = surfacePlot.gl;
    this.data3D = data3D;
    this.setMatrixUniforms = surfacePlot.setMatrixUniforms;
    this.axesVertexPositionBuffer = null;
    this.surfacePlot = surfacePlot;
    
    this.labels = [];
    
    this.initAxesBuffers = function(){
        var vertices = [];
        var axisExtent = 0.5;
        
        var axisOrigin = [-axisExtent, axisExtent, 0];
        var xAxisEndPoint = [axisExtent, axisExtent, 0];
        var yAxisEndPoint = [-axisExtent, -axisExtent, 0];
        var zAxisEndPoint = [-axisExtent, axisExtent, axisExtent * 2];
        
        var xAxisEndPoint2 = [axisExtent, -axisExtent, 0];
        var zAxisEndPoint2 = [-axisExtent, -axisExtent, axisExtent * 2];
        
        // X
        vertices = vertices.concat(yAxisEndPoint);
        vertices = vertices.concat(xAxisEndPoint2);
        
        // Y
        vertices = vertices.concat(xAxisEndPoint2);
        vertices = vertices.concat(xAxisEndPoint);
        
        // Z2
        vertices = vertices.concat(yAxisEndPoint);
        //vertices = vertices.concat(zAxisEndPoint2);
        
        
        var somePoint = [.5,.6,.7];
        vertices = vertices.concat(somePoint);

        var somePoint2 = [-.5,.6,.7];
        vertices = vertices.concat(somePoint2);
        
        
		printlnMessage('messages', 'vertices.length '+vertices.length);
     
        
        
        // Major axis lines.
        this.axesVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.axesVertexPositionBuffer);
        
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
        this.axesVertexPositionBuffer.itemSize = 3;
        this.axesVertexPositionBuffer.numItems = vertices.length / 3;
		printlnMessage('messages', 'vertices.length/3 '+vertices.length/3);
                                        
    };
    
    this.initAxesBuffers();
};

GLLines.prototype.draw = function(){
    this.currentShader = this.shaderProgram;
    this.gl.useProgram(this.currentShader);
    
    // Enable the vertex array for the current shader.
    this.currentShader.vertexPositionAttribute = this.gl.getAttribLocation(this.currentShader, "aVertexPosition");
    this.gl.enableVertexAttribArray(this.currentShader.vertexPositionAttribute);
    
    this.gl.uniform3f(this.currentShader.axesColour, 0.9, 0.0, 0.1); // Set the colour of the Major axis lines.
    // Major axis lines
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.axesVertexPositionBuffer);
    this.gl.vertexAttribPointer(this.currentShader.vertexPositionAttribute, this.axesVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    
    this.gl.lineWidth(20);
    this.setMatrixUniforms(this.currentShader, this.surfacePlot.pMatrix, this.surfacePlot.mvMatrix);
    this.gl.drawArrays(this.gl.LINES, 0, this.axesVertexPositionBuffer.numItems);

    //printlnMessage('messages', 'axesVertexPositionBuffer.numItems '+this.axesVertexPositionBuffer.numItems);
        
    // Render the axis labels.
    var numLabels = this.labels.length;
    
    // Enable the vertex array for the current shader.
    this.gl.disableVertexAttribArray(this.currentShader.vertexPositionAttribute);
    
};
