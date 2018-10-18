//define canvas and context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");



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



//polynomial easing
function polyEase(value, max, power) {
    return Math.pow(value / max, power) * value;
}