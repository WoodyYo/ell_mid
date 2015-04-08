document.glob = this;
var ctx = null;
var width = 200;
var border = 100;
var height = 400;
var sheet = [];
var unit = 30;
var time = 0;
/* height/speed is the time a beet goes through the canvas*/
var img_h = img_w = 50;
var max_ex = 12;
var excellent = 0;
var norm_img;
var side_img;
var excellent_img;
var first = 0;
var clear;
var timer;
var hit_range = 40;
var score = 0;

function init_canvas() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = width;
	canvas.height = height+border;
	ctx = canvas.getContext('2d');
	norm_img = new Image();
	norm_img.src = 'normal.jpg';
	side_img = new Image();
	side_img.src = 'side.jpg';
	excellent_img = new Image();
	excellent_img.src = 'excellent.png';
	ctx.moveTo(0, height);
	ctx.lineTo(width, height);
	ctx.stroke();
	clear = ctx.getImageData(0, 0, width, height+border);
	canvas.onclick = function() {
		hit(1);
	}
}
function restart() {
	clearTimeout(timer);
	first = 0;
	time = 0;
	score = 0;
	document.getElementById('score').innerHTML = '0';
	document.getElementById('time').innerHTML = '0:00';
	refresh();
}
function refresh() {
	time += unit/100.0;
	ctx.putImageData(clear, 0, 0);
	for(var i = first; i < sheet.length; i++) {
		var cur = sheet[i];
		if(cur.show_time > time) break;
		var img, alpha = cur.alpha();
		if(cur.type) img = side_img;
		else img = norm_img;
		ctx.globalAlpha = alpha;
		var w = img_w/alpha, h = img_h/alpha;
		if(alpha > 0) ctx.drawImage(img, (width-w)/2, cur.y-h/2, w, h);
		cur.step();
	}
	if(first == sheet.length) return;

	if(sheet[first].y > height+border+50) first++;

	if(excellent > 0) {
		var w = 500.0/excellent, h = 300/excellent;
		ctx.globalAlpha = excellent/max_ex;
		ctx.drawImage(excellent_img, (width-w)/2, height-h/2, w, h);
		excellent--;
	}

	var sec = Math.floor(time/10);
	var min = Math.floor(sec/60);
	sec = sec%60;
	document.getElementById('time').innerHTML = min+':'+sec;

	timer = setTimeout(refresh, unit);
}
function hit(type) {
	var err, cur, i;
	for(i = first; i < sheet.length; i++) {
		cur = sheet[i];
		if(cur.is_hit) continue;  //already hit
		if(height + hit_range < cur.y) continue;  //miss
		if(height > cur.y + hit_range) return;  //no bother
		break;
	}
	if(i == sheet.length) return;
	if(cur.type != type) return;
		
	err = cur.y - height;
	if(err < 0) err = -err;

	cur.hit();
	score += 10;
	if(err < 15) {
		excellent = max_ex;
		score += 20;
	}
	document.getElementById('score').innerHTML = score;
}
