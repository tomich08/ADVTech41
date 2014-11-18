// JavaScript Document

var myCanvas = document.getElementById("myCanvas");
			
//this var chooses the rendering context and its built-in drawing functions.
var ctx = myCanvas.getContext("2d");
var x=200;
var y=200;



//invoke a function to make a particle
setInterval(function(){draw()},33);

//set up an empty array to store all our particles
var particles = [];

//generate 50 particles
for(var i=0; i<50; i++){
	//make a particle and add it to the array
	particles.push(new create_particle());
	
		
}

/**
* this method makes a new particle
* each rolls up its own x,y pos; velocity
* and color
*/
function create_particle(){
	//each gets a random x,y position:
	this.x = Math.random()*500;
	this.y = Math.random()*500;
	//random speed & direction
	//subtract half the max, so some get neg #
	this.vx = Math.random()*20-10;	
	this.vy = Math.random()*20-10;
	//random size
	this.radius = Math.random()*20+20;	
	//random color
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color = "rgba("+r+","+g+","+b+",.5)"
	
}

/**
* this method draws one white circle 
* displaced a little more each time
*/

function draw(){
	ctx.globalCompositeOperation="source-over";
	//paint the canvas with a black rectangle
	//covers all circles made previously
	ctx.fillStyle = "rgba(0,0,0,.5)";
	ctx.fillRect(0,0,500,500);
	//blend the particles with the background
	ctx.globalCompositeOperation="lighter";
	for(var t=0; t<particles.length; t++){
	//make a reference to the current particle as we loop
	var p = particles[t];	
	//draw a circular path
	ctx.beginPath();
	//specify a fill
	var gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius);
	//at the very center, it'll be white
	gradient.addColorStop(0,"white");
	//the whiteness ends 40% of the way out 
	gradient.addColorStop(0.4,"white");
	//then abruptly become its random color
	gradient.addColorStop(0.4,p.color);
	//which blends out to black
	gradient.addColorStop(1,"black");
	ctx.fillStyle = gradient;
	//make the circle
	ctx.arc(p.x,p.y,p.radius,Math.PI*2,false);
	ctx.fill();	
	//set up x,y so next time it moves a bit
	p.x+=p.vx;
	p.y+=p.vy;
	
	//if a particle is off the edge of the canvas, reset x or y to just off the opposite edge 
	if(p.x<-50)p.x=550;
	if(p.y<-50)p.y=550;
	if(p.x>550)p.x=-50;
	if(p.y>550)p.y=-50;
	}//end LOOP THROUGH ALL 50 PARTICLES
}