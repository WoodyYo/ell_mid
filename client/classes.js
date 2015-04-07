glob = document.glob;
speed = 250;
var Beet = function(time, type) {
	this.hit_time = time; //time = 100 => tenth second
	if(type == null) type = 0;
	this.type = type; // 0 for normal and 1 for side
	this.show_time = time - 10*glob.height/speed;
	this.y = 0;
}
Beet.prototype.step = function() {
	this.y += speed*glob.unit/1000;
}