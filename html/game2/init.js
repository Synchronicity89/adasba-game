//define canvas and context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//define canvas and context
var cbg = document.getElementById("canvasbg");
var ctxbg = cbg.getContext("2d");



//mouse position
var m = { x: 960, y: 540 };

//mouse pos event listener
c.addEventListener("mousemove", function(e) {
    m = { x: e.clientX, y: e.clientY };
}, false);



//whether mouse is down or not
var mD = [false, false, false];

//mouse down event listener
c.addEventListener("mousedown", function(e) {
    mD[e.which - 1] = true;
}, false);

//mouse up event listener
c.addEventListener("mouseup", function(e) {
    mD[e.which - 1] = false;
}, false);



//contains all keys
var k = [];
var kD = [];

//key down event listener
document.addEventListener("keydown", function(e) {
    k[e.keyCode] = true;
    if (k[e.keyCode] == false) {
        kD[e.keyCode] = true; 
    }
}, false);

//key up event listener
document.addEventListener("keyup", function(e) {
    k[e.keyCode] = false;
    kD[e.keyCode] = true;
}, false);



//pythagoras function
function pyth(x, y, x2, y2) {
    if (x2 == undefined && y2 == undefined) {
        return Math.sqrt(x * x + y * y);
    } else {
        return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    }
}



//generates a rectangle of stuff in the mandelbrot set
function mandelbrotRect(x, y, w, h, iterations, resx, resy) {
    var mData = [];
    for (var i = 0; resy > i; i++) {
    mData.push([]);
        for (var i2 = 0; resx > i2; i2++) {
            mData[i].push({
                iterations: 0,
                path: [{ x: 0, y: 0 }],
                in: true,
                pos: { x: x + i2 * (w / resx), y: y + i * (h / resy) }
            });
            for (var i3 = 0; iterations > i3 && Math.sqrt(Math.pow(mData[i][i2].path[mData[i][i2].path.length - 1].x, 2) + Math.pow(mData[i][i2].path[mData[i][i2].path.length - 1].y, 2)) < 2; i3++) {
                mData[i][i2].path.push({ 
                    x: Math.pow(mData[i][i2].path[i3].x, 2) - Math.pow(mData[i][i2].path[i3].y, 2) + mData[i][i2].pos.x,
                    y: 2 * mData[i][i2].path[i3].x * mData[i][i2].path[i3].y + mData[i][i2].pos.y
                });
                if (Math.sqrt(Math.pow(mData[i][i2].path[i3 + 1].x, 2) + Math.pow(mData[i][i2].path[i3 + 1].y, 2)) > 2) {
                    mData[i][i2].in = false;
                } else if (mData[i][i2].in) {
                    mData[i][i2].iterations++;
                }
            }
        }
    }
    return mData;
}



//"clamps" value between one and another
function clamp(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}



function hsla(h, s, l, a) {
    return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
}

function targetPlayer(x, y) {
    return Math.atan2(p.y - y, p.x - x);
}

function circleLine(lx1, ly1, lx2, ly2, cx, cy, cr) {
    var t1 = { lx: lx2 - lx1, ly: ly2 - ly1, cx: cx - lx1, cy: cy - ly1, cr: cr };
    var t2 = { ld: Math.atan2(t1.lx)}
}

function bR(mag) {
    return Math.random() * mag - mag / 2;
}

function inRect(x, y, w, h, x2, y2) {
    if (x2 > x && x2 < x + w && y2 > y && y2 < y + h) {
        return true;
    }
    return false;
}

function expEase(value, base) {
    return 1 - 1 / Math.pow(base, value);
}

function between(value, min, max) {
    if (value == clamp(value, min, max)) {
        return true;
    }
    return false;
}

function arrLoop(arr, f) {
    for (var i = 0; arr.length > i; i++) {
        f(arr[i]);
    }
}

function enemies() {
    var enemies2 = false
    arrLoop(o, function (e) {
        if (e.type2 == "Enemy") {
            enemies2 = true;
        }
    });
    return enemies2;
}

function wrap(obj) {
    if (obj.x > c.width) {
        obj.x = 0;
    }
    if (obj.y > c.height) {
        obj.y = 0;
    }
    if (obj.x < 0) {
        obj.x = c.width;
    }
    if (obj.y < 0) {
        obj.y = c.height;
    }
}