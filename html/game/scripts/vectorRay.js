function simpleVecRay(x, y, lines) {
    var lightRestrictions = [];
    for (var i = 0; lines.length > i; i++) {
        lightRestrictions.push({
            start: lines[i].start,
            startDir: Math.atan2(lines[i].start.y - y, lines[i].start.x - x),
            end: lines[i].end,
            endDir: Math.atan2(lines[i].end.y - y, lines[i].end.x - x)
        });
    }
    return lightRestrictions;
}

function vecRay(x, y, lines) {
    var vRays = [];
    var vRays2 = [];
    var lineRanges = [];
    lines.forEach(function (e, i) {
        vRays.push(simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) + 0.001 + Math.PI * 2, lines, e, e.start));
        vRays.push(simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) + 0.001 + Math.PI * 2, lines, e, e.end));
        vRays.push(simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) - 0.001 + Math.PI * 2, lines, e, e.start));
        vRays.push(simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) - 0.001 + Math.PI * 2, lines, e, e.end));
    });
    vRays.forEach(function (e) {
        if (e == undefined || e.lineIndex == undefined) {
            vRays.splice(e);
        }
    });


    vRays.sort(function (a, b) {
        if (a.dir != b.dir) {
            return a.dir - b.dir;
        } else {
            return 1;
        }
    });

    for (var i = 0; vRays.length > i; i++) {
        lineRanges.push({
            start: vRays[i],
            end: vRays[(i + 1) % vRays.length]
        })
    }
    return lineRanges;
}