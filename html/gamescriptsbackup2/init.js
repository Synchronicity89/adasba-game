//define canvas
var c = document.getElementById("canvas");

//get canvas context
var ctx = c.getContext("2d");



//mouse data
var m = { x: 0, y: 0, m: [false, false, false] };

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
    m.x = e.clientX * (1920 / winSize.x);
    m.y = e.clientY * (1080 / winSize.y);
}, false);



//mouse click input
document.addEventListener('mousedown', function (e) {
    m.m[e.which - 1] = true;
}, false);

document.addEventListener('mouseup', function (e) {
    m.m[e.which - 1] = false;
}, false);



//keys
var k = [];

//keyboard input
document.addEventListener('keydown', function (e) {
    k[e.keyCode] = true;
}, false);

document.addEventListener('keyup', function (e) {
    k[e.keyCode] = false;
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



//errors
