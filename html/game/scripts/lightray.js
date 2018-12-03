// var lc = document.createElement("canvas");

// var lctx = lc.getContext("2d");

// lc.width = c.width;
// lc.height = c.height;

// var lc2 = document.createElement("canvas");

// var lctx2 = lc2.getContext("2d");

// lc2.width = c.width;
// lc2.height = c.height;

function signTest(dir) {
    if (dir > Math.PI / 2 && dir < 3 * Math.PI / 2) {
        return -1;
    }
    return 1;
}

function ray(x, y, dir, chunk, arr, bounce, draw) {
    var bounces = bounce;
    if (bounce === undefined) {
        var bounces = 15;
    }
    var m = Math.tan(dir);
    var b = -m * x + y;
    var intersects = [];
    for (var i = 0; chunk.length > i; i++) {
        if (chunk[i].start.x == chunk[i].end.x) {
            chunk[i].end.x += 0.00001;
        }
        if (chunk[i].start.y == chunk[i].end.y) {
            chunk[i].end.y -= 0.00001;
        }
        var c = (chunk[i].start.y - chunk[i].end.y) / (chunk[i].start.x - chunk[i].end.x);
        var d = -((chunk[i].start.y - chunk[i].end.y) / (chunk[i].start.x - chunk[i].end.x)) * chunk[i].start.x + chunk[i].start.y;
        var xintersect = (b - d) / (c - m);
        if ((between(xintersect, chunk[i].start.x, chunk[i].end.x) && between(m * xintersect + b, chunk[i].start.y, chunk[i].end.y)) && (Math.sign(xintersect - x) == signTest((dir) % (Math.PI * 2)))) {
            if (chunk[i].ray == "solid" || chunk[i].ray == "reflect") {
                intersects.push({
                    dist: pyth(x, y, xintersect, m * xintersect + b),
                    sx: x,
                    sy: y,
                    x: xintersect,
                    y: m * xintersect + b,
                    type: chunk[i].ray,
                    line: chunk[i],
                    draw: draw,
                    dir: dir
                });
            }
        }
    }
    var minDist = 9999999;
    var minDistIndex = 0;
    for (var i = 0; intersects.length > i; i++) {
        if (intersects[i].dist < minDist) {
            minDist = intersects[i].dist;
            minDistIndex = i;
        }
    }
    if (intersects[minDistIndex]) {
        if (intersects[minDistIndex].type == "solid") {
            return intersects[minDistIndex];
        } else if (intersects[minDistIndex].type == "reflect") {
            if (bounces > 1) {
                arr.push(intersects[minDistIndex]); //Math.atan2(intersects[minDistIndex].line.start.y - intersects[minDistIndex].line.end.y, intersects[minDistIndex].line.start.x - intersects[minDistIndex].line.end.x)
                var lineAngle = Math.atan2(intersects[minDistIndex].line.start.y - intersects[minDistIndex].line.end.y, intersects[minDistIndex].line.start.x - intersects[minDistIndex].line.end.x);
                return ray(intersects[minDistIndex].x + Math.cos(lineAngle + Math.PI / 2) * 0.01, intersects[minDistIndex].y + Math.sin(lineAngle + Math.PI / 2) * 0.01, (2 * lineAngle + Math.PI * 4 - dir) % (2 * Math.PI), chunk, arr, bounces - 1, draw);
            }
        }
    } else {
        return {
            sx: x,
            sy: y,
            slope: dir,
            draw: draw
        }
    }
}

function simpleRay(x, y, dir, chunk, pointedTo, type2) {
    var m = Math.tan(dir);
    var b = -m * x + y;
    var intersects = [];
    for (var i = 0; chunk.length > i; i++) {
        if (chunk[i].start.x == chunk[i].end.x) {
            chunk[i].end.x += 0.00001;
        }
        if (chunk[i].start.y == chunk[i].end.y) {
            chunk[i].end.y += 0.00001;
        }
        var c = (chunk[i].start.y - chunk[i].end.y) / (chunk[i].start.x - chunk[i].end.x);
        var d = -((chunk[i].start.y - chunk[i].end.y) / (chunk[i].start.x - chunk[i].end.x)) * chunk[i].start.x + chunk[i].start.y;
        var xintersect = (b - d) / (c - m);
        if ((between(xintersect, chunk[i].start.x, chunk[i].end.x) && between(m * xintersect + b, chunk[i].start.y, chunk[i].end.y)) && (Math.sign(xintersect - x) == signTest((dir) % (Math.PI * 2)))) {
            if (chunk[i].ray == "solid" || chunk[i].ray == "reflect") {
                intersects.push({
                    dist: pyth(x, y, xintersect, m * xintersect + b),
                    //dTIT: pyth(x, y, type2.x, type2.y),
                    sx: x,
                    sy: y,
                    x: xintersect,
                    y: m * xintersect + b,
                    line: chunk[i],
                    type: chunk[i].ray,
                    lineIndex: i,
                    dir: dir,
                    //pointedTo: pointedTo,
                    //type2: type2
                });
            }
        }
    }
    var minDist = 9999999;
    var minDistIndex = 0;
    for (var i = 0; intersects.length > i; i++) {
        if (intersects[i].dist < minDist) {
            minDist = intersects[i].dist;
            minDistIndex = i;
        }
    }
    if (intersects[minDistIndex] != undefined) {
        if (intersects[minDistIndex].type == "solid" || intersects[minDistIndex].type == "reflect") {
            return intersects[minDistIndex];
        }
    } else {
        return {
            sx: x,
            sy: y,
            slope: dir
        }
    }
}

function laserray(x, y, dir, chunk, arr, bounce, draw, chunk2) {
    var bounces = bounce;
    if (bounce === undefined) {
        var bounces = 15;
    }
    var m = Math.tan(dir);
    var b = -m * x + y;
    var intersects = [];
    var chunk3 = [];
    chunk3 = chunk3.concat(chunk);
    for (var i = 0; chunk2.length > i; i++) {
        for (var i2 = 0; chunk2[i].hitbox.length > i2; i2++) {
            if (chunk2[i].hitbox[i2].obstacleType == "circle") {
                chunk3.push({
                    start: {
                        x: chunk2[i].hitbox[i2].radius * Math.cos(Math.atan2(chunk2[i].hitbox[i2].y - y, chunk2[i].hitbox[i2].x - x) - Math.PI / 2) + chunk2[i].x,
                        y: chunk2[i].hitbox[i2].radius * Math.sin(Math.atan2(chunk2[i].hitbox[i2].y - y, chunk2[i].hitbox[i2].x - x) - Math.PI / 2) + chunk2[i].y
                    },
                    end: {
                        x: chunk2[i].hitbox[i2].radius * Math.cos(Math.atan2(chunk2[i].hitbox[i2].y - y, chunk2[i].hitbox[i2].x - x) + Math.PI / 2) + chunk2[i].x,
                        y: chunk2[i].hitbox[i2].radius * Math.sin(Math.atan2(chunk2[i].hitbox[i2].y - y, chunk2[i].hitbox[i2].x - x) + Math.PI / 2) + chunk2[i].y
                    },
                    type: "solid",
                    ray: "solid",
                    enemy: true
                });
            }
        }
    }
    for (var i = 0; chunk3.length > i; i++) {
        if (chunk3[i].start.x == chunk3[i].end.x) {
            chunk3[i].end.x += 0.00001;
        }
        if (chunk3[i].start.y == chunk3[i].end.y) {
            chunk3[i].end.y -= 0.00001;
        }
        var c = (chunk3[i].start.y - chunk3[i].end.y) / (chunk3[i].start.x - chunk3[i].end.x);
        var d = -((chunk3[i].start.y - chunk3[i].end.y) / (chunk3[i].start.x - chunk3[i].end.x)) * chunk3[i].start.x + chunk3[i].start.y;
        var xintersect = (b - d) / (c - m);
        if ((between(xintersect, chunk3[i].start.x, chunk3[i].end.x) && between(m * xintersect + b, chunk3[i].start.y, chunk3[i].end.y)) && (Math.sign(xintersect - x) == signTest((dir) % (Math.PI * 2)))) {
            if (chunk3[i].ray == "solid" || chunk3[i].ray == "reflect") {
                intersects.push({
                    dist: pyth(x, y, xintersect, m * xintersect + b),
                    sx: x,
                    sy: y,
                    x: xintersect,
                    y: m * xintersect + b,
                    type: chunk3[i].ray,
                    line: chunk3[i],
                    draw: draw,
                    dir: dir,
                    enemy: chunk3[i].enemy
                });
            }
        }
    }
    var minDist = 9999999;
    var minDistIndex = 0;
    for (var i = 0; intersects.length > i; i++) {
        if (intersects[i].dist < minDist) {
            minDist = intersects[i].dist;
            minDistIndex = i;
        }
    }
    if (intersects[minDistIndex]) {
        if (intersects[minDistIndex].type == "solid") {
            return intersects[minDistIndex];
        } else if (intersects[minDistIndex].type == "reflect") {
            if (bounces > 1) {
                arr.push(intersects[minDistIndex]); //Math.atan2(intersects[minDistIndex].line.start.y - intersects[minDistIndex].line.end.y, intersects[minDistIndex].line.start.x - intersects[minDistIndex].line.end.x)
                var lineAngle = Math.atan2(intersects[minDistIndex].line.start.y - intersects[minDistIndex].line.end.y, intersects[minDistIndex].line.start.x - intersects[minDistIndex].line.end.x);
                return ray(intersects[minDistIndex].x + Math.cos(lineAngle + Math.PI / 2) * 0.01, intersects[minDistIndex].y + Math.sin(lineAngle + Math.PI / 2) * 0.01, (2 * lineAngle + Math.PI * 4 - dir) % (2 * Math.PI), chunk3, arr, bounces - 1, draw);
            }
        }
    } else {
        return {
            sx: x,
            sy: y,
            slope: dir,
            draw: draw
        }
    }
}

function laserray2(x, y, dir, chunk, arr, bounce, draw, chunk2) {
    var returnArray = [];
    var bounces = bounce;
    if (bounce === undefined) {
        var bounces = 15;
    }
    for (var i3 = 0; bounce > i3; i3++) {
        var m = Math.tan(dir);
        var b = -m * x + y;
        var intersects = [];
        var chunk3 = [];
        chunk3 = chunk3.concat(chunk);
        for (var i = 0; chunk2.length > i; i++) {
            for (var i2 = 0; chunk2[i].hitbox.length > i2; i2++) {
                if (chunk2[i].hitbox[i2].obstacleType == "circle") {
                    chunk3.push({
                        start: {
                            x: chunk2[i].hitbox[i2].radius * Math.cos(Math.atan2(chunk2[i].y - y, chunk2[i].x - x) + 1 * Math.PI / 2) + chunk2[i].x,
                            y: chunk2[i].hitbox[i2].radius * Math.sin(Math.atan2(chunk2[i].y - y, chunk2[i].x - x) + 1 * Math.PI / 2) + chunk2[i].y
                        },
                        end: {
                            x: chunk2[i].hitbox[i2].radius * Math.cos(Math.atan2(chunk2[i].y - y, chunk2[i].x - x) + 3 * Math.PI / 2) + chunk2[i].x,
                            y: chunk2[i].hitbox[i2].radius * Math.sin(Math.atan2(chunk2[i].y - y, chunk2[i].x - x) + 3 * Math.PI / 2) + chunk2[i].y
                        },
                        type: "solid",
                        ray: "solid",
                        enemy: true,
                        player: chunk2[i].player
                    });
                }
                if (chunk2[i].hitbox[i2].obstacleType == "line") {
                    chunk3.push({
                        start: {
                            x: chunk2[i].hitbox[i2].start.x + chunk2[i].x,
                            y: chunk2[i].hitbox[i2].start.y + chunk2[i].y
                        },
                        end: {
                            x: chunk2[i].hitbox[i2].end.x + chunk2[i].x,
                            y: chunk2[i].hitbox[i2].end.y + chunk2[i].y
                        },
                        type: "solid",
                        ray: "solid",
                        enemy: true,
                        player: chunk2[i].player
                    });
                }
            }
        }
        for (var i = 0; chunk3.length > i; i++) {
            if (chunk3[i].start.x == chunk3[i].end.x) {
                chunk3[i].end.x += 0.00001;
            }
            if (chunk3[i].start.y == chunk3[i].end.y) {
                chunk3[i].end.y -= 0.00001;
            }
            var c = (chunk3[i].start.y - chunk3[i].end.y) / (chunk3[i].start.x - chunk3[i].end.x);
            var d = -((chunk3[i].start.y - chunk3[i].end.y) / (chunk3[i].start.x - chunk3[i].end.x)) * chunk3[i].start.x + chunk3[i].start.y;
            var xintersect = (b - d) / (c - m);
            if ((between(xintersect, chunk3[i].start.x, chunk3[i].end.x) && between(m * xintersect + b, chunk3[i].start.y, chunk3[i].end.y)) && (Math.sign(xintersect - x) == signTest((dir) % (Math.PI * 2)))) {
                if (chunk3[i].ray == "solid" || chunk3[i].ray == "reflect") {
                    intersects.push({
                        dist: pyth(x, y, xintersect, m * xintersect + b),
                        sx: x,
                        sy: y,
                        x: xintersect,
                        y: m * xintersect + b,
                        type: chunk3[i].ray,
                        line: chunk3[i],
                        draw: draw,
                        dir: dir,
                        enemy: chunk3[i].enemy,
                        player: chunk3[i].player
                    });
                }
            }
        }
        var minDist = 9999999;
        var minDistIndex = 0;
        for (var i = 0; intersects.length > i; i++) {
            if (intersects[i].dist < minDist) {
                minDist = intersects[i].dist;
                minDistIndex = i;
            }
        }
        if (intersects[minDistIndex]) {
            if (intersects[minDistIndex].type == "solid") {
                returnArray.push(intersects[minDistIndex]);
                return returnArray;
            } else if (intersects[minDistIndex].type == "reflect") {
                if (bounces > 1) {
                    returnArray.push(intersects[minDistIndex]); //Math.atan2(intersects[minDistIndex].line.start.y - intersects[minDistIndex].line.end.y, intersects[minDistIndex].line.start.x - intersects[minDistIndex].line.end.x)
                    var lineAngle = Math.atan2(intersects[minDistIndex].line.start.y - intersects[minDistIndex].line.end.y, intersects[minDistIndex].line.start.x - intersects[minDistIndex].line.end.x);
                    x = intersects[minDistIndex].x + Math.cos(lineAngle + Math.PI / 2) * 0.01;
                    y = intersects[minDistIndex].y + Math.sin(lineAngle + Math.PI / 2) * 0.01;
                    dir = (2 * lineAngle + Math.PI * 4 - dir) % (2 * Math.PI);
                    //return ray(intersects[minDistIndex].x + Math.cos(lineAngle + Math.PI / 2) * 0.01, intersects[minDistIndex].y + Math.sin(lineAngle + Math.PI / 2) * 0.01, (2 * lineAngle + Math.PI * 4 - dir) % (2 * Math.PI), chunk3, arr, bounces - 1, draw);
                } else {
                    returnArray.push(intersects[minDistIndex]);
                    return returnArray;
                }
            }
        } else {
            return {
                sx: x,
                sy: y,
                slope: dir,
                draw: draw
            }
        }
    }
}