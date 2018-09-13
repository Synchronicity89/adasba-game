//define canvas and context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var c2 = document.getElementById("minimap");
var ctx2 = c2.getContext("2d");


//websocket stuff
//make websocket
var ws = new WebSocket('ws://50.39.110.171:42068');

//when websocket opens
ws.onopen = function () {
    console.log('Connected to server successfully.');
}

function startGame() {
    start.style.display = "none";
    nameInput.style.display = "none";
    c.style.display = "block";
    c2.style.display = "block";
    ws.send(JSON.stringify({ type: "inputName", name: nameInput.value }));
    setInterval(inputLoop, 50);
}

//the message the websocket sends
var msg = { players: [], you: 0, map: [], entities: [] }; 
//var raw = "";
var wsTime = 0;
var wsTime2 = 0;
var webSocketDelay = 0;

//when websocket sends a message
ws.onmessage = function (ev) {
    msg = JSON.parse(ev.data);
    //raw = ev.data;
    wsTime = new Date().getTime();
    webSocketDelay = wsTime - wsTime2;
    wsTime2 = new Date().getTime();
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

var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

var config = {
    tX: 100,
    tY: 100,
    pX: 50,
    pY: 50,
    mX: 250,
    mY: 250,
    ctrl: [
        "Use WASD to move.",
        "Left mouse to break blocks, right mouse to place blocks.",
        "Use the number keys to change the selected inventory slot.",
        "Press R to rotate certain blocks (such as conveyer belts)"
    ]
}

function imgRotate(context, img, x, y, w, h, d) {
    context.save();
    context.translate(x, y);
    context.rotate(d);
    context.drawImage(img, -w / 2, -w / 2, w, h);
    context.restore();
}

function defaultText(text, x, y, context) {
    context.lineWidth = 9;
    context.strokeStyle = "#333333";
    context.font = "24px Courier New";
    context.strokeText(text, x, y);
    context.strokeStyle = "#CCCCCC";
    context.lineWidth = 2;
    context.strokeText(text, x, y);
}