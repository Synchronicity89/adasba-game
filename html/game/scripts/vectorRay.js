//simple vector ray, currently unused
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

//complex vector ray, currently used
function vecRay(x, y, lines) {

    //results of all rays
    var vRays = [];
    var vRays2 = [];
    var lineRanges = [];

    //create rays to the left and right of each vertex of the line segments
    lines.forEach(function (e, i) {
        vRays.push(simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) + 0.001 + Math.PI * 2, lines, e, e.start));
        vRays.push(simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) + 0.001 + Math.PI * 2, lines, e, e.end));
        vRays.push(simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) - 0.001 + Math.PI * 2, lines, e, e.start));
        vRays.push(simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) - 0.001 + Math.PI * 2, lines, e, e.end));
    });

    //remove undefineds
    vRays.forEach(function (e) {
        if (e == undefined || e.lineIndex == undefined) {
            vRays.splice(e);
        }
    });

    //sort vector rays by direction
    vRays.sort(function (a, b) {
        if (a.dir != b.dir) {
            return a.dir - b.dir;
        } else {
            return 1;
        }
    });

    //eliminate the "center rays" of cases where three or more consecutive rays touch the same line
    if (vRays[0]) {
        var numTouchLine = 0;
        var whichLine = vRays[0].lineIndex;
        for (var i = 0; vRays.length > i; i++) {
            if (whichLine == vRays[i].lineIndex) {
                numTouchLine++;
            } else {
                var whichLine = vRays[i].lineIndex;
                if (numTouchLine > 2) {
                    for (var i2 = 0; numTouchLine - 2 > i2; i2++) {
                        vRays.splice(i - numTouchLine + 1, 1);
                    }
                    i = -1;
                }
                numTouchLine = 0;

            }
        }
    }

    //format data so it can be turned into a polyline
    for (var i = 0; vRays.length > i; i++) {
        lineRanges.push({
            start: vRays[i],
            end: vRays[(i + 1) % vRays.length]
        })
    }
    return lineRanges;
}