//contains all input
var input = { m: { x: 0, y: 0, m: [false, false, false] }, k: [], s: 0 };

//fill key array with keys
for (var i = 0; 256 > i; i++) {
    input.k.push(false);
}

//when mouse is moved
document.addEventListener('mousemove', function(e) {
    input.m.x = e.clientX * (c.width / window.innerWidth);
    input.m.y = e.clientY * (c.height / window.innerHeight);
}, false);

//when mouse is pressed down
document.addEventListener('mousedown', function(e) {
    input.m.m[e.which - 1] = true;
}, false);

//when mouse is lifted
document.addEventListener('mouseup', function(e) {
    input.m.m[e.which - 1] = false;
}, false);

//when key is pressed down
document.addEventListener('keydown', function(e) {
    input.k[e.keyCode] = true;
}, false);

//when key is lifted
document.addEventListener('keyup', function(e) {
    input.k[e.keyCode] = false;
}, false);

function inputLoop() {
    ws.send(JSON.stringify(input));
}