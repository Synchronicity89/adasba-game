//contains all input
var input = { m: { x: 0, y: 0, m: [false, false, false] }, k: [], kD: [], s: 0, cQ: [] };

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
    if (msg.players.length > 0) {
        for (var i = 0; msg.players[msg.you].craftable.length > i; i++) {
            if (inRect(c.width - 100 + i * 100, 250 + i * 100, 100, 100, input.m.x, input.m.y)) {
                input.cQ.push(msg.players[msg.you].craftable[i].index);
            }
        }
    }
}, false);

//when mouse is lifted
document.addEventListener('mouseup', function(e) {
    input.m.m[e.which - 1] = false;
}, false);

//when key is pressed down
document.addEventListener('keydown', function(e) {
    input.k[e.keyCode] = true;
    if (input.kD[e.keyCode] == false) {
        input.kD[e.keyCode] = true;
    }
}, false);

//when key is lifted
document.addEventListener('keyup', function(e) {
    input.k[e.keyCode] = false;
    input.kD[e.keyCode] = false;
}, false);

function inputLoop() {
    if (msg.players.length > 0) {
        input.s = clamp(input.s, 0, msg.players[msg.you].inv.length);
    }
    //input.cQ.push(0);
    ws.send(JSON.stringify(input));
    input.cQ = [];
    for (var i = 0; input.kD.length > i; i++) {
        if (input.kD[i]) {
            input.kD[i] = 2;
        }
    }
}