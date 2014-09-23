
//creates bargraph inside element
function BarGraph(element) {

    // Private properties and methods
    var that = this;
	var clientHeight;
	var clientWidth;


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
		ctx.fillRect(0, 0, clientWidth, clientHeight);
		
	
		var barcolor=evaluateBarColor(percent);
		
		if(that.isHorizontal) {
			var percentage = percent * clientWidth;
			ctx.fillStyle=barcolor;
			ctx.fillRect(0, 0, percentage, clientHeight);
			ctx.strokeStyle = "black";
		    ctx.lineWidth = 1;
		    ctx.rect(0, 0, percentage, clientHeight)
		    ctx.stroke();
		}
		else
		{
			var percentage = percent * clientHeight;
			ctx.fillStyle=barcolor;
			ctx.fillRect(0, 0, clientWidth, percentage);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.rect(0, 0, clientWidth, percentage)
			ctx.stroke();
		}



        //paint border
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.rect(that.borderWidth / 2, that.borderWidth / 2, clientWidth - that.borderWidth , clientHeight - that.borderWidth );

        ctx.stroke();

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
	this.barAlarmValue = .88;		//greater than this value means bar is red
    this.borderWidth = 2;
	
	
	var ctx = createCanvas(element);
	
	return this
	
}