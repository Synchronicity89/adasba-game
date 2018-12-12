//x, y, width, height
function rect(x, y, w, h) {
    return {
        x: x,
        y: y,
        w: w,
        h: h
    };
}

function rect90(x, y, w, h) {
    return {
        x: y,
        y: x,
        w: h,
        h: w
    };
}

function rotateRects(rects, x, y, angle) {
    var returnRects = [];
    for (var i = 0; rects.length > i; i++) {
        returnRects.push({
            x: rects[i].x - x,
            y: rects[i].y - y,
            angle: Math.atan2(rects[i].h, rects[i].w) + angle,
            magnitude: dist(rects[i].w, rects[i].h)
        }); 
    }
    returnRects2 = [];
    for (var i = 0; returnRects.length > i; i++) {
        returnRects2.push({
            x: Math.cos(Math.atan2(returnRects[i].y, returnRects[i].x) + angle) + x,
            y: Math.sin(Math.atan2(returnRects[i].y, returnRects[i].x) + angle) + y,
            w: Math.cos(returnRects[i].angle) * returnRects[i].magnitude,
            h: Math.sin(returnRects[i].angle) * returnRects[i].magnitude
        });
    }
    return returnRects2;
}

function charRects(char) {
    switch (char) {
        case "A":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 9, 3, 3),
                rect(6, 0, 3, 21)
            ];
        case "B":
            return [];
        case "C":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 6, 3),
                rect(3, 18, 6, 3)
            ]
        case "D":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 18, 3, 3),
                rect(6, 3, 3, 15)
            ];
        case "E":
            return [
                rect(3, 0, 6, 3),
                rect(0, 0, 3, 21),
                rect(3, 9, 6, 3),
                rect(3, 18, 6, 3)
            ]
        case "F":
            return [];
        case "G":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 6, 3),
                rect(3, 18, 6, 3),
                rect(6, 12, 3, 6)
            ];
        case "H":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 9, 3, 3),
            ];
        case "I":
            return [
                rect(0, 0, 9, 3),
                rect(3, 3, 3, 18),
                rect(0, 18, 9, 3)
            ];
        case "J":
            return [];
        case "K":
            return [];
        case "L":
            return [];
        case "M":
            return [];
        case "N":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 6, 3, 9),
            ];
        case "O":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 18, 3, 3),
                rect(6, 0, 3, 21)
            ];
        case "P":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 9, 3, 3),
                rect(6, 0, 3, 12)
            ];
        case "Q":
            return [];
        case "R":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 9, 3, 3),
                rect(6, 0, 3, 9),
                rect(6, 12, 3, 9)
            ];
        case "S":
            return [   
                rect(0, 0, 9, 3),
                rect(0, 3, 3, 6),
                rect(0, 9, 9, 3),
                rect(6, 12, 3, 6),
                rect(0, 18, 9, 3)
            ];
        case "T":
            return [
                rect(0, 0, 9, 3),
                rect(3, 3, 3, 18)
            ];
        case "U":
            return [];
        case "V":
            return [
                rect(0, 0, 3, 15),
                rect(3, 15, 3, 6),
                rect(6, 0, 3, 15)
            ];
        case "W":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 12, 3, 9),
            ];
        case "X":
            return [];
        case "Y":
            return [
                rect(0, 0, 3, 9),
                rect(3, 9, 3, 12),
                rect(6, 0, 3, 9)
            ];
        case "Z":
            return [];
        case " ":
            return [];
    }
}

function last() {
    return o[o.length - 1];
}

function simpleSquare(x, y, speed, decay, angle) {
    o.push(new rectEntity(x, y, [rect(0, 0, 8, 8)], (e) => {
        e.x += Math.cos(e.angle) * e.t / 25 * speed;
        e.y += Math.sin(e.angle) * e.t / 25 * speed;
        var mySize = Math.floor(decay * e.t / 45);
        e.rects[0] = rect(mySize, mySize, 8 - mySize * 2, 8 - mySize * 2);
        if (e.t > 180 / decay) {
            e.remove = true;
        }
    }));
    last().angle = angle
}

function bar(direction, speed, decay) {
    switch (direction) {
        case 0:
            o.push(new rectEntity(player.x, 256, [rect(-8, 0, 16, 256)], (e) => {
                e.y -= e.t;
                e.y = clamp(e.y, 0, 256);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i2 * 8 - 8, e.y + i * 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
        case 1:
            o.push(new rectEntity(256, player.y, [rect(0, -8, 256, 16)], (e) => {
                e.x -= e.t;
                e.x = clamp(e.x, 0, 256);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i * 8, e.y + i2 * 8 - 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
        case 2:
            o.push(new rectEntity(player.x, -256, [rect(-8, 0, 16, 256)], (e) => {
                e.y += e.t;
                e.y = clamp(e.y, -256, 0);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i2 * 8 - 8, e.y + i * 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
        case 3:
            o.push(new rectEntity(-256, player.y, [rect(0, -8, 256, 16)], (e) => {
                e.x += e.t;
                e.x = clamp(e.x, -256, 0);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i * 8, e.y + i2 * 8 - 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
    }
}

function level() {
    if (tbetween(0, 48) && every(8)) {
        o.push(new rectEntity(player.x, 0, [
            rect(-1, 2, 2, -14),
            rect(-3, -2, 6, 2),
            rect(-5, -4, 2, 2),
            rect(3, -4, 2, 2)
        ], function (e) {
            e.y += e.t / 6;
            if (e.y > 256) {
                for (var i = 0; 14 > i; i++) {
                    o.push(new rectEntity(e.x, 256, [rect(0, 0, 8, 8)], (e) => {
                        e.x += Math.cos(e.angle) * e.t / 5;
                        e.y += Math.sin(e.angle) * e.t / 5;
                        var mySize = Math.floor(e.t / 5);
                        e.rects[0] = rect(mySize, mySize, 8 - mySize * 2, 8 - mySize * 2);
                        if (e.t > 20) {
                            e.remove = true;
                        }
                    }));
                    last().angle = i / 7 * Math.PI
                }
                e.remove = true;
            }
        }));
    }
    
    if (t == 66) {
        o.push(new rectEntity(0, player.y, [
            rect90(-1, 2, 2, -14),
            rect90(-3, -2, 6, 2),
            rect90(-5, -4, 2, 2),
            rect90(3, -4, 2, 2)
        ], function (e) {
            e.x += e.t / 6;
            if (e.x > 256) {
                for (var i = 0; 14 > i; i++) {
                    o.push(new rectEntity(e.x, 256, [rect(0, 0, 8, 8)], (e) => {
                        e.x += Math.cos(e.angle) * e.t / 5;
                        e.y += Math.sin(e.angle) * e.t / 5;
                        var mySize = Math.floor(e.t / 5);
                        e.rects[0] = rect(mySize, mySize, 8 - mySize * 2, 8 - mySize * 2);
                        if (e.t > 20) {
                            e.remove = true;
                        }
                    }));
                    last().angle = i / 7 * Math.PI
                }
                e.remove = true;
            }
        }));
    }

    if (tbetween(85, 123) && every(8)) {
        o.push(new rectEntity(player.x, 0, [
            rect(-1, 2, 2, -14),
            rect(-3, -2, 6, 2),
            rect(-5, -4, 2, 2),
            rect(3, -4, 2, 2)
        ], function (e) {
            e.y += e.t / 6;
            if (e.y > 256) {
                for (var i = 0; 14 > i; i++) {
                    o.push(new rectEntity(e.x, 256, [rect(0, 0, 8, 8)], (e) => {
                        e.x += Math.cos(e.angle) * e.t / 5;
                        e.y += Math.sin(e.angle) * e.t / 5;
                        var mySize = Math.floor(e.t / 5);
                        e.rects[0] = rect(mySize, mySize, 8 - mySize * 2, 8 - mySize * 2);
                        if (e.t > 20) {
                            e.remove = true;
                        }
                    }));
                    last().angle = i / 7 * Math.PI
                }
                e.remove = true;
            }
        }));
    }

    if (t == 152) {
        bar(0, 0.5, 12);
    }
    if (t == 180) {
        bar(1, 0.5, 12);
    }
    if (t == 208) {
        bar(2, 0.5, 12);
    }
    if (t == 227) {
        bar(3, 0.5, 12);
    }
    if (t == 246) {
        bar(0, 0.5, 12);
    }
    if (t == 265) {
        bar(3, 0.5, 12);
    }
    if (t == 284) {
        bar(0, 0.5, 12);
    }
    if (tbetween(303, 400) && every(5)) {
        bar(1, 0.5, 12);
    }
}

var audio = new Audio("the_world_revolving.mp3");
var startTime = new Date().getTime();

function preLoop() {
    var keyPressed = false;
    for (var i = 0; keys.length > i; i++) {
        if (keys[i] == true) {
            keyPressed = true;
        }
    }
    if (keyPressed) {
        audio.play();

        loop();
    } else {
        requestAnimationFrame(preLoop);
    }
}

preLoop();