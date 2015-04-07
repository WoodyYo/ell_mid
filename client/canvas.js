document.glob = this;
var ctx = null;
var width = 500;
var height = 500;
var sheet = [];
var unit = 30;
var time = 0;
/* height/speed is the time a beet goes through the canvas*/
var norm_img;
var side_img;
var first = 0;
var clear;

function init_canvas() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	norm_img = new Image();
	norm_img.src = 'normal.jpg';
	side_img = new Image();
	side_img.src = 'side.jpg';
	clear = ctx.getImageData(0, 0, width, height);
	setTimeout(refresh, unit);
}
function refresh() {
	time += unit/100.0;
	ctx.putImageData(clear, 0, 0);
	for(var i = first; i < sheet.length; i++) {
		var cur = sheet[i];
		if(cur.show_time > time) break;
		if(cur.type) ctx.drawImage(side_img, 0, cur.y);
		else ctx.drawImage(norm_img, 0, cur.y);
		cur.step();
	}
	if(sheet[first].y > height+50) first++;

	setTimeout(refresh, unit);
}

function load_sheet(sheet_name) {
	var req = new XMLHttpRequest();
	req.overrideMimeType("application/json");
	req.open('GET', sheet_name, true);
	req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == "200") {
            var a = eval(req.responseText);
            for(var i = 0; i < a.length; i++) {
            	glob.sheet[i] = new Beet(a[i][0], a[i][1]);
            }
            init_canvas();
        }
    };
    req.send(null);
}