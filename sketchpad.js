$(document).ready(function(){

	// Variables

	var	context = document.getElementById("canvas").getContext("2d");
	var	paint;
	var	clickX = [], clickY = [], clickDraw = [];

	var	colorBlack = "#191919";
	var	currentColor = colorBlack;
	var	clickedColor = [];

	var	mediumSize = 10;
	var	currentSize = mediumSize;
	var clickedSize = [];

	// Mouse down event

	$("#canvas").mousedown(function(e){

		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		paint = true; // record if the mouse button is held down
		addClick(mouseX, mouseY, false);
		redraw();

	});

	// Mouse up event

	$("#canvas").mouseup(function(e){

		paint = false;
		redraw();

	});

	// Mouse leave event if mouse goes off the canvas

	$("#canvas").mouseleave(function(e){

		paint = false;

	});

	// Mouse move event

	$("#canvas").mousemove(function(e){

		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}

	});

	// addClick function to save the click position

	function addClick(x, y, drawing){

		clickX.push(x);
		clickY.push(y);
		clickDraw.push(drawing);
		clickedColor.push(currentColor);
		clickedSize.push(currentSize);

	}

	// Clear the Canvas

	function clearCanvas(){

		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		context.canvas.width = context.canvas.width;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	}

	// redraw function to draw on canvas

	function redraw(){

		clearCanvas();

		context.lineJoin = "round";

		for(var i = 0; i < clickX.length; i++){

			context.beginPath();

			if(clickDraw[i] && i){
				context.moveTo(clickX[i-1], clickY[i-1]);
			}
			else {
				context.moveTo(clickX[i]-1, clickY[i]);
			}

			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.strokeStyle = clickedColor[i];
			context.lineWidth = clickedSize[i];
			context.stroke();

		} // end for loop

	}

	// Color Buttons

	$("button.colors").click(function(e){
		currentColor = $(this).data("color");
		$("#current-color").html($(this).text());
	});

	// Brush Size Buttons

	$("button.brushes").click(function(e){
		currentSize = $(this).data("brush");
		$("#current-size").html($(this).text());
	});

	// Eraser

	$("#eraser").click(function(e){
		currentColor = "#FFE0BD";
		$("#current-color").html($(this).text());
	});

	// Clear and Reset Canvas

	$("#reset").click(function(e){
		clickX = [];
		clickY = [];
		clickDraw = [];
		clickedColor = [];
		clickedSize = [];
		currentColor = colorBlack;
		currentSize = mediumSize;
		$("#current-color").html("Black");
		$("#current-size").html("&bull;&nbsp;Med");
		clearCanvas();
	});

}); // end $(document).ready()
