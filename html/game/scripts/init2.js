//define canvas
var c = document.getElementById("canvas");

//get canvas context
var ctx = c.getContext("2d");

//define canvas
var c2 = document.getElementById("canvas2");

//get canvas context
var ctx2 = c2.getContext("2d");



//mouse data
var m = { x: 0, y: 0, m: [false, false, false], mD: [false, false, false] };

//resize
var winSize = { x: window.innerWidth, y: window.innerHeight };
window.addEventListener('resize', function (e) {
    winSize = { x: window.innerWidth, y: window.innerHeight };
}, false);

//mouse move input
// document.addEventListener('mousemove', function (e) {
//     if (winSize.x >= winSize.y * (16 / 9)) {
//         m.x = (e.clientX - (winSize.x - winSize.y * (16 / 9)) / 2) * (1920 / (winSize.y * (16 / 9)));
//         m.y = e.clientY * (1920 / (winSize.y * (16 / 9)));
//     } else {
//         m.y = (e.clientY - (winSize.y - winSize.x * (9 / 16)) / 2) * (1080 / (winSize.x * (9 / 16)));
//         m.x = e.clientX * (1080 / (winSize.x * (9 / 16)));
//     }
// }, false);
document.addEventListener('mousemove', function (e) {
    m.x = e.clientX * (384 / winSize.x);
    m.y = e.clientY * (216 / winSize.y);
}, false);



//mouse click input
document.addEventListener('mousedown', function (e) {
    m.m[e.which - 1] = true;
    if (m.mD[e.which - 1] == false) {
        m.mD[e.which - 1] = true;
    }
}, false);

document.addEventListener('mouseup', function (e) {
    m.m[e.which - 1] = false;
    m.mD[e.which - 1] = true;
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


//"clamps" value between one and another
function clamp(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}



//tests if between two values
function between(value, min, max) {
    if (max > min) {
        if (value == clamp(value, min, max)) {
            return true;
        }
    } else {
        if (value == clamp(value, max, min)) {
            return true;
        }
    }
    return false;
}



//pythagoras function
function pyth(x, y, x2, y2) {
    if (x2 == undefined && y2 == undefined) {
        return Math.sqrt(x * x + y * y);
    } else {
        return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    }
}



//is a point inside of a rectangle?
function inRect(x, y, w, h, x2, y2) {
    if (x2 > x && x2 < x + w && y2 > y && y2 < y + h) {
        return true;
    }
    return false;
}


//is a point inside or on the border of a rectangle?
function inclusiveInRect(x, y, w, h, x2, y2) {
    if (x2 >= x && x2 <= x + w && y2 >= y && y2 <= y + h) {
        return true;
    }
    return false;
}



//rotate an image
function imgRotate(img, x, y, w, h, d) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(d);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
}