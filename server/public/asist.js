glob = document.glob;
speed = 250;
max_exist = 15;
var Beet = function(time, type) {
	this.hit_time = time; //time = 100 => tenth second
	if(type == null) type = 0;
	this.type = type; // 0 for normal and 1 for side
	this.show_time = time - 10*glob.height/speed;
	this.y = 0;
	this.is_hit = false;
	this.exist = max_exist;  //dissapear in max_exist steps
}
Beet.prototype.step = function() {
	this.y += speed*glob.unit/1000;
	if(this.is_hit) this.exist--;
}
Beet.prototype.hit = function() {
	this.is_hit = true;
}
Beet.prototype.alpha = function() {
	return this.exist*1.0/max_exist;
}
function load_sheet(sheet_name) {
	var req = new XMLHttpRequest();
	req.overrideMimeType("application/json");
	req.open('GET', sheet_name, true);
	req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == "200") {
			a = [];
            var a = eval(req.responseText);
            for(var i = 0; i < a.length; i++) {
            	glob.sheet[i] = new Beet(a[i][0], a[i][1]);
            }
			restart();
        }
    };
    req.send(null);
}
