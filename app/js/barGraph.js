
//creates bargraph inside element
function BarGraph(element) {

    // Private properties and methods
    var that = this;
	var clientHeight;
	var clientWidth;

	
	
	//canvas context used for drawing
	var ctx;

	var createCanvas = function(divName) {
		var div = document.getElementById(divName);
		var canvas = document.createElement('canvas');
		
		// get dimensions of parent element
		clientHeight=div.clientHeight;
		clientWidth = div.clientWidth;
		
		//set to parent dimensions
		canvas.width=clientWidth;
		canvas.height=clientHeight;
		
		canvas.style.position="absolute";
		
		//add to DOM
		div.appendChild(canvas);
		if (typeof G_vmlCanvasManager != 'undefined') {
			canvas = G_vmlCanvasManager.initElement(canvas);
		}

		return canvas.getContext("2d");
	}
	
	
	var evaluateBarColor = function(percentage) {
		var barColor=that.barColor;
		if(percentage >= that.barAlarmValue)
			barColor=that.barAlarmColor;
		else if(percentage >= that.barWarnValue)
			barColor=that.barWarnColor;
			
		return barColor;
	}
	
    // fills the canvas to the specified percentage
	// percent in decimal format
    var draw = function (percent) {
		
		//draw background
		ctx.fillStyle=that.fillColor;
		ctx.fillRect(0,0,clientWidth,clientHeight);
		
		var barcolor=evaluateBarColor(percent);
		
		if(that.isHorizontal) {
			var percentage = percent * clientWidth;
			ctx.fillStyle=barcolor;
			ctx.fillRect(0,0,percentage,clientHeight);
		}
		else
		{
			var percentage = percent * clientHeight;
			ctx.fillStyle=barcolor;
			ctx.fillRect(0,0,clientWidth,percentage);
		}		
		
		
    };
	
    // Update method sets the end bar array and starts the animation
    this.update = function (value) {
        draw(value);
    };
	
	
	    // Public properties and methods

	this.isHorizontal=true;
	this.fillColor ='#E0E0EB';
	this.barColor = "green";
	this.barWarnColor="yellow";
	this.barAlarmColor ="red";
	this.barWarnValue=.75;		//greater than this value means bar is yellow
	this.barAlarmValue=.88;		//greater than this value means bar is red
	
	
	ctx = createCanvas(element);
	
	return this
	
}