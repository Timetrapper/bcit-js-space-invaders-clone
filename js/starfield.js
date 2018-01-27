// Constants:
const STAR_MIN_SIZE = 4;

function Starfield() {
    this.fps = 30;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
	this.minSpeed = 15;
	this.maxSpeed = 30;
    this.stars = 80;
    this.intervalId = 0;
}

//  Initializes the starfield:
Starfield.prototype.initialize = function(div) {
    var self = this;
 
    //  Store div:
    this.containerDiv = div;
    self.width = 1000;
    self.height = 800;
 
    window.addEventListener('resize', function resize(event) {
        self.width = window.innerWidth;
        self.height = window.innerHeight;
        self.canvas.width = self.width;
        self.canvas.height = self.height;
        self.draw();
    });
 
    //  Create the canvas:
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // document.body.style.background = 'url(' + canvas.toDataURL() + ')';
};

// Start the starfield:
Starfield.prototype.start = function() {
    // Create stars:
    var stars = [];
    for (var i = 0; i < this.stars; i++) { // Create each star
        stars[i] = new Star(this.width, this.height, STAR_MIN_SIZE, 
            (Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed);
    }
    this.stars = stars;

    var self = this;
	//	Start the star creation timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

// Stop the starfield:
Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

// Update the starfield:
Starfield.prototype.update = function() {
    var deltaTime = 1 / this.fps; // How much time has passsed

    // Iterate through each star, and update its position:
    for (var i = 0; i < this.stars.length; i++) {
        var star = this.stars[i];
        star.y += deltaTime * star.speed;

        //  If the star has moved from the bottom of the screen, move to top:
        if(star.y > this.height) {
            this.stars[i] = new Star(this.width, 0 /*top*/, STAR_MIN_SIZE, 
                (Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed);
        }
    }
};

Starfield.prototype.draw = function() {
	// Get drawing context:
    var ctx = this.canvas.getContext("2d");
    /* Built-in object, with methods and properties for drawing */

	//	Draw the background:
 	ctx.fillStyle = '#000000'; // black
	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars:
	ctx.fillStyle = '#ffffff'; // white
	for (var i = 0; i < this.stars.length; i++) {
		var star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
};

// Create a star:
function Star(x, y, size, speed) {
    this.x = Math.random() * x;
    this.y = Math.random() * y; 
    this.size = Math.random() * size;
    this.speed = speed;
}