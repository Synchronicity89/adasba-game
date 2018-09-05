var c = require('./config.json');

//copy by value function
exports.cBV = function(value) {
    return JSON.parse(JSON.stringify(value));
}

//pythagoras
exports.pythagoras = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

//clamp number to between two numbers
exports.clamp = function(value, min, max) {
    if (value > max) {
        return max;
    } else if (min > value) {
        return min;
    }
    return value;
}

//is JSON-able?
exports.isJSON = function(str) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false;
    }
    return true;
}

//tests if in rectangle
exports.inRect = function(x, y, w, h, x2, y2) {
    if (x2 > x && x2 < x + w && y2 > y && y2 < y + h) {
        return true;
    }
    return false;
}

//tests for player intersections
exports.pIntersect = function(clients, x, y, w, h) {
    for (var i = 0; clients.length > i; i++) {
        if (exports.inRect(x - c.playerW / 2, y - c.playerH / 2, w + c.playerW, h + c.playerH, clients[i].x, clients[i].y)) {
            return true;
        }
    }
    return false;
}