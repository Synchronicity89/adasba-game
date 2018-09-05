//define canvas and context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");



//websocket stuff
//make websocket
var ws = new WebSocket('ws://50.39.110.171:42068');

//when websocket opens
ws.onopen = function () {
    console.log('Connected to server successfully.');
    setInterval(inputLoop, 50);
}

//the message the websocket sends
var msg = { players: [], you: 0, map: [], entities: [] }; 

//when websocket sends a message
ws.onmessage = function (ev) {
    msg = JSON.parse(ev.data);
}



//copy by value function
function cBV(value) {
    return JSON.parse(JSON.stringify(value));
}

//pythagoras
function pythagoras(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

//clamp number to between two numbers
function clamp(value, min, max) {
    if (value > max) {
        return max;
    } else if (min > value) {
        return min;
    }
    return value;
}

//lowers the "resolution" of a number
function truncate(number, res) {
    return Math.floor(number / res) * res;
}

//tests if in rectangle
function inRect(x, y, w, h, x2, y2) {
    if (x2 > x && x2 < x + w && y2 > y && y2 < y + h) {
        return true;
    }
    return false;
}