//define canvas
var c = document.getElementById("canvas");

//define canvas context
var ctx = c.getContext("2d");

//font size
ctx.font = "18px Courier";

//text alignment
ctx.textAlign = "center";

//mouse stuff
var m = { x: 0, y: 0, m: [false, false, false], md: [false, false, false] };

//mouse move
document.addEventListener("mousemove", function(e) {
    m.x = e.clientX * 1920 / window.innerWidth;
    m.y = e.clientY * 1080 / window.innerHeight;
}, false);

//mouse down
document.addEventListener("mousedown", function(e) {
    m.m[e.which - 1] = true;
    m.md[e.which - 1] = true;
}, false);

//mouse up
document.addEventListener("mouseup", function(e) {
    m.m[e.which - 1] = false;
    m.md[e.which - 1] = false;
}, false);

//keyboard stuff
var k = [];
var kD = [];

//key down
document.addEventListener("keydown", function(e) {
    k[e.keyCode] = true;
    kD[e.keyCode] = true;
}, false);

//key up
document.addEventListener("keyup", function(e) {
    k[e.keyCode] = false;
    kD[e.keyCode] = false;
}, false)

//to connect things together
var connectPath = [];

//input/output types
var iotypes = ["not", "or", "and"];

//current input/output type
var currentiotype = "not";

function maxPaths(gateType) {
    switch (gateType) {
        case "not":
            return 1;
        case "and":
            return 2;
        case "or":
            return 2;
        default:
            return 99999999;
    }
}

//multi-line text function
function multiLineText(x, y, txt) {
    ctx.fillStyle = "#555555";
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 1;
    for (var i = 0; txt.length > i; i++) {
        ctx.strokeText(txt[i], x, y + 29 + 18 * i);
        ctx.fillText(txt[i], x, y + 29 + 18 * i);
    }
}

//input/output type
function IO(x, y, type) {
    this.objtype = "io";
    this.x = x;
    this.y = y;
    this.type = type;
    this.paths = [];
    this.pathsToMe = [];
    switch (type) {
        case "not":
            this.stored = [undefined];
            this.logic = function() {
                if (this.stored[0] != undefined) {
                    for (var i = 0; this.paths.length > i; i++) {
                        b.push(new Bit(!this.stored[0].value, this, this.paths[i]));
                    }
                    this.stored = [undefined];
                }
            }
            break;
        case "or":
            this.stored = [undefined, undefined];
            this.logic = function() {
                if (this.stored[0] != undefined && this.stored[1] != undefined) {
                    for (var i = 0; this.paths.length > i; i++) {
                        b.push(new Bit(this.stored[0].value || this.stored[1].value, this, this.paths[i]));
                    }
                    this.stored = [undefined, undefined];
                }
            }
            break;
        case "and":
            this.stored = [undefined, undefined];
            this.logic = function() {
                if (this.stored[0] != undefined && this.stored[1] != undefined) {
                    for (var i = 0; this.paths.length > i; i++) {
                        b.push(new Bit(this.stored[0].value && this.stored[1].value, this, this.paths[i]));
                    }
                    this.stored = [undefined, undefined];
                }
            }
            break;
    }
    this.draw = function() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#555555";
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(this.x - 12, this.y - 12, 24, 24);
        ctx.strokeRect(this.x - 12, this.y - 12, 24, 24);
        ctx.lineWidth = 1;
        ctx.strokeText(this.type, this.x, this.y - 18);
    }
    this.drawLines = function() {
        ctx.setLineDash([15, 10]);
        for (var i = 0; this.paths.length > i; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.paths[i].x, this.paths[i].y);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }
}

//source type
function In(x, y, f, desc) {
    this.objtype = "in";
    this.x = x;
    this.y = y;
    this.f = f;
    this.stored = [];
    this.paths = [];
    this.pathsToMe = [];
    this.desc = desc;
    this.draw = function() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#555555";
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(this.x - 12, this.y - 12, 24, 24);
        ctx.strokeRect(this.x - 12, this.y - 12, 24, 24);
        ctx.lineWidth = 1;
        ctx.strokeText("in", this.x, this.y - 18);
        for (var i = 0; this.desc.length > i; i++) {
            ctx.strokeText(this.desc[i], this.x, this.y + 29 + 18 * i);
        }
    }
    this.drawLines = function() {
        ctx.setLineDash([15, 10]);
        for (var i = 0; this.paths.length > i; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.paths[i].x, this.paths[i].y);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }
}

//pythagorean distance function
function dist(x, y) {
    return Math.sqrt(x * x + y * y);
}

//clamps between two values
function clamp(value, min, max) {
    if (value > max) {
        return max;   
    } else if (value < min) {
        return min;
    }
    return value;
}

//bit type
function Bit(value, from, to) {
    this.objtype = "bit";
    this.from = from;
    this.to = to;
    this.value = value;
    this.x = from.x;
    this.y = from.y;
    this.destx = to.x;
    this.desty = to.y;
    this.dx = this.destx - this.x;
    this.dy = this.desty - this.y;
    this.alive = true;
    this.move = function() {
        this.x += 7 * Math.cos(Math.atan2(this.dy, this.dx));
        this.y += 7 * Math.sin(Math.atan2(this.dy, this.dx));
        if (dist(this.x - this.destx, this.y - this.desty) < 8) {
            if (this.to.objtype != "out") {
                this.to.stored[this.to.pathsToMe.indexOf(this.from)] = this;
            } else {
                this.to.stored.push(this);
            }
            this.alive = false;
        }
    }
    this.draw = function() {
        ctx.strokeStyle = "#555555";
        if (this.value) {
            ctx.fillStyle = "#555555";
        } else {
            ctx.fillStyle = "#DDDDDD";
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.lineWidth = 1;
        if (this.value) {
            ctx.strokeText(1, this.x, this.y - 15);
        } else {
            ctx.strokeText(0, this.x, this.y - 15);
        }
    }
}

function Out(x, y, f, desc) {
    this.objtype = "out";
    this.x = x;
    this.y = y;
    this.f = f;
    this.desc = desc;
    this.stored = [];
    this.paths = [];
    this.pathsToMe = [];
    this.score = 0;
    this.draw = function() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#555555";
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(this.x - 12, this.y - 12, 24, 24);
        ctx.strokeRect(this.x - 12, this.y - 12, 24, 24);
        ctx.fillStyle = "#555555";
        ctx.fillRect(this.x - 12, this.y - 12, 24 * this.score, 24);
        ctx.lineWidth = 1;
        ctx.strokeText("out", this.x, this.y - 18);
        for (var i = 0; this.desc.length > i; i++) {
            ctx.strokeText(this.desc[i], this.x, this.y + 29 + 18 * i);
        }
    }
    this.drawLines = function() {
        ctx.setLineDash([15, 10]);
        for (var i = 0; this.paths.length > i; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.paths[i].x, this.paths[i].y);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }
}

function TXT(x, y, txt) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.draw = function() {
        multiLineText(this.x, this.y, this.txt);
    }
}

function SlideshowTXT(x, y, txt) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.index = 0;
    this.draw = function() {
        multiLineText(this.x, this.y, this.txt[this.index]);
        if (kD[39]) {
            this.index = clamp(this.index + 1, 0, this.txt.length - 1);
        }
        if (kD[37]) {
            this.index = clamp(this.index - 1, 0, this.txt.length - 1);
        }
    }
}

//increments every frame
var l = 0;

//ingame objects (excluding bits)
var o = [];

//bits
var b = [];

//text/deco
var t = [];

//current level
var currentLevel = 7;

//whether the thing is being "tested" or not
var testing = false;

var bitCounter = 0;

var bitDelay = 15;

var releaseBit = false;

levels[currentLevel].load();

//in-game loop function (called every 60th of a second)
function loop() {
    if (k[49]) {
        currentiotype = iotypes[0];
    }
    if (k[50]) {
        currentiotype = iotypes[1];
    }
    if (k[51]) {
        currentiotype = iotypes[2];
    }
    if (kD[84]) {
        testing = !testing;
    }
    if (testing) {
        bitDelay--;
        if (bitDelay < 0 && b.length == 0) {
            releaseBit = true;
            bitDelay = 15;
        } else if (b.length != 0) {
            bitDelay = 15;
        }
    } else {
        b = [];
        bitCounter = 0;
        bitDelay = 15;
        releaseBit = false;
        for (var i = 0; o.length > i; i++) {
            if (o[i].objtype == "out") {
                o[i].score = 0;
            }
        }
    }

    ctx.lineWidth = 2;
    ctx.lineDashOffset = -l / 6;
    ctx.fillStyle = "#DDDDDD";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#555555";

    ctx.setLineDash([5, 5]);

    ctx.strokeStyle = "#BBBBBB";
    ctx.beginPath();
    for (var i = 0; 1080 / 50 > i; i++) {
        ctx.lineTo(i * 100, -50);
        ctx.lineTo(i * 100, 1130);
        ctx.lineTo(i * 100 + 50, 1130);
        ctx.lineTo(i * 100 + 50, -50);
    }
    ctx.stroke();
    ctx.beginPath();
    for (var i = 0; 1920 / 50 > i; i++) {
        ctx.lineTo(-50, i * 100);
        ctx.lineTo(1970, i * 100);
        ctx.lineTo(1970, i * 100 + 50);
        ctx.lineTo(-50, i * 100 + 50);
    }
    ctx.stroke();

    ctx.strokeStyle = "#555555";

    ctx.lineDashOffset = -l / 2;

    ctx.setLineDash([10, 10]);

    ctx.strokeRect(Math.floor(m.x / 50 + 0.5) * 50 - 25, Math.floor(m.y / 50 + 0.5) * 50 - 25, 50, 50);

    for (var i = 0; o.length > i; i++) {
        o[i].drawLines();
    }

    ctx.setLineDash([15, 10]);
    ctx.beginPath();
    if (connectPath.length == 1) {
        ctx.moveTo(connectPath[0].x, connectPath[0].y);
        ctx.lineTo(Math.floor(m.x / 50 + 0.5) * 50, Math.floor(m.y / 50 + 0.5) * 50);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    for (var i = 0; t.length > i; i++) {
        t[i].draw();
    }

    for (var i = 0; o.length > i; i++) {
        switch (o[i].objtype) {
            case "io":
                o[i].draw();
                o[i].logic();
                break;
            case "in":
                o[i].f(o[i].paths);
                o[i].draw();
                break;
            case "out":
                o[i].score = o[i].f(o[i].stored);
                o[i].draw();
        }
    }

    for (var i = 0; b.length > i; i++) {
        b[i].move();
        b[i].draw();
    }

    for (var i = 0; b.length > i; i++) {
        if (!b[i].alive) {
            b.splice(i, 1);
            i--;
        }
    }
    if (!testing) {
        if (m.md[0]) {
            var isAlreadyThere = false;
            var thereIndex = 0;
            for (var i = 0; o.length > i; i++) {
                if (o[i].x == Math.floor(m.x / 50 + 0.5) * 50 && o[i].y == Math.floor(m.y / 50 + 0.5) * 50) {
                    isAlreadyThere = true;
                    thereIndex = i;
                }
            }
            if (!isAlreadyThere) {
                connectPath = [];
                o.push(new IO(Math.floor(m.x / 50 + 0.5) * 50, Math.floor(m.y / 50 + 0.5) * 50, currentiotype));
            } else {
                connectPath.push(o[thereIndex]);
            }

            if (connectPath.length > 1) {
                if (connectPath[0] !== connectPath[1] && connectPath[1].pathsToMe.length < maxPaths(connectPath[1].type)) {
                    connectPath[0].paths.push(connectPath[1]);
                    connectPath[1].pathsToMe.push(connectPath[0]);
                    connectPath = [];
                } else {
                    connectPath.pop();
                }
            }
        }

        if (m.md[2]) {
            
            connectPath = [];

            var isAlreadyThere = false;
            var thereIndex = 0;
            for (var i = 0; o.length > i; i++) {
                if (o[i].x == Math.floor(m.x / 50 + 0.5) * 50 && o[i].y == Math.floor(m.y / 50 + 0.5) * 50) {
                    isAlreadyThere = true;
                    thereIndex = i;
                }
            }
            if (isAlreadyThere && o[thereIndex].objtype == "io") {
                for (var i = 0; o.length > i; i++) {
                    for (var i2 = 0; o[i].paths.length > i2; i2++) {
                        if (o[i].paths[i2] === o[thereIndex]) {
                            for (var i3 = 0; o[i].paths[i2].pathsToMe > i3; i3++) {
                                if (o[i].paths[i2].pathsToMe[i3] == o[i]) {
                                    o[i].paths[i2].pathsToMe.splice(i3, 1);
                                }
                            }
                            o[i].paths.splice(i2, 1);
                        }
                    }
                }
                o.splice(thereIndex, 1);
            }
        }
    }

    ctx.textAlign = "left";
    ctx.font = "36px Courier";
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);

    var currentiotypeindex = iotypes.indexOf(currentiotype);

    ctx.strokeRect(5, 5 + 40 * currentiotypeindex, 200, 40);

    ctx.setLineDash([0, 0]);

    ctx.strokeText("1 - not", 10, 35);
    ctx.strokeText("2 - or", 10, 75);
    ctx.strokeText("3 - and", 10, 115);

    ctx.textAlign = "center"
    ctx.font = "18px Courier";

    var placepos = {
        x: Math.floor(m.x / 50 + 0.5) * 50,
        y: Math.floor(m.y / 50 + 0.5) * 50
    };

    ctx.globalAlpha = 0.5;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#555555";
    ctx.fillStyle = "#DDDDDD";
    ctx.fillRect(placepos.x - 12, placepos.y - 12, 24, 24);
    ctx.strokeRect(placepos.x - 12, placepos.y - 12, 24, 24);
    ctx.lineWidth = 1;
    ctx.strokeText(currentiotype, placepos.x, placepos.y - 18);

    ctx.globalAlpha = 1;

    var complete = true;

    for (var i = 0; o.length > i; i++) {
        if (o[i].objtype == "out" && o[i].score != 1) {
            complete = false;
        }
    }

    if (complete) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#555555";
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(405, 40, 1100, 140);
        ctx.strokeRect(405, 40, 1100, 140);
        ctx.fillStyle = "#555555";
        ctx.font = "72px Courier";
        ctx.fillText("Level Complete!", 960, 100);
        ctx.fillText("Press ENTER to Continue.", 960, 160);
        ctx.font = "18px Courier";
        if (kD[13]) {
            b = [];
            o = [];
            t = [];

            testing = false;
            currentLevel++;
            levels[currentLevel].load();
        }
    }

    l++;

    m.md = [false, false, false];

    for (var i = 0; 256 > i; i++) {
        kD[i] = false;
    }

    if (releaseBit) {
        releaseBit = false;
        bitCounter++;
    }

    //repeat loop
    requestAnimationFrame(loop);
}

//initiate loop
loop();