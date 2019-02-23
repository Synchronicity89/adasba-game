var lc = document.createElement("canvas");

var lctx = lc.getContext("2d");

lc.width = c.width / 4;
lc.height = c.height / 4;

function signTest(dir) {
    if (dir > Math.PI / 2 && dir < 3 * Math.PI / 2) {
        return -1;
    }
    return 1;
}

function ray(x, y, dir, chunk, arr, bounce, draw) {
    var bounces = bounce;
    if (bounce == undefined) {
        var bounces = 15;
    }
    var m = Math.tan(dir);
    var b = -m * x + y;
    var intersects = [];
    for (var i = 0; chunk.length > i; i++) {
        if (chunk[i].start.x == chunk[i].end.x) {
            chunk[i].end.x += 0.000001;
        }
        var c = (chunk[i].start.y - chunk[i].end.y) / (chunk[i].start.x - chunk[i].end.x);
        var d = -((chunk[i].start.y - chunk[i].end.y) / (chunk[i].start.x - chunk[i].end.x)) * chunk[i].start.x + chunk[i].start.y;
        var xintersect = (b - d) / (c - m);
        if (between(xintersect, chunk[i].start.x, chunk[i].end.x) && Math.sign(xintersect - x) == signTest((dir) % (Math.PI * 2))) {
            if (chunk[i].ray == "solid" || chunk[i].ray == "reflect") {
                intersects.push({
                    dist: pyth(x, y, xintersect, m * xintersect + b),
                    sx: x,
                    sy: y,
                    x: xintersect,
                    y: m * xintersect + b,
                    type: chunk[i].ray,
                    line: chunk[i],
                    draw: draw
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
            if (bounces > 0) {
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