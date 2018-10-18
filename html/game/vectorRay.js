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
        // vRays.push({
        //     line: e,
        //     lineIndex: i,
        //     // start: simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x), lines),
        //     // end: simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x), lines),
        //     startplus: simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) + 0.001, lines),
        //     endplus: simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) + 0.001, lines),
        //     startminus: simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) + 0.001, lines),
        //     endminus: simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) + 0.001, lines)
        // });
        vRays.push(simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) + 0.001 + Math.PI * 2, lines, e, e.start));
        vRays.push(simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) + 0.001 + Math.PI * 2, lines, e, e.end));
        vRays.push(simpleRay(x, y, Math.atan2(e.start.y - y, e.start.x - x) - 0.001 + Math.PI * 2, lines, e, e.start));
        vRays.push(simpleRay(x, y, Math.atan2(e.end.y - y, e.end.x - x) - 0.001 + Math.PI * 2, lines, e, e.end));
    });
    //console.log(vRays);
    vRays.forEach(function (e) {
        if (e.lineIndex == undefined) {
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
    // for (var i = 0; vRays.length - 1 > i; i++) {
    //     for (var i2 = i; vRays.length - 1 > i2; i2++) {
    //         if (vRays[i].line === vRays[i2].line) {
    //             lineRanges.push({
    //                 start: vRays[i],
    //                 end: vRays[i2]
    //             });
    //         }
    //     }
    // }


    // for (var i = 0; lines.length > i; i++) {
    //     vRays2.push([]);
    // }
    // vRays.forEach(function (e) {
    //     vRays2[e.lineIndex].push(e);
    // });
    // vRays2.forEach(function (e) {
    //     e.sort(function (a, b) {
    //         if (a.dir != b.dir) {
    //             return a.dir - b.dir;
    //         } else {
    //             return 1;
    //         }
    //     });

    //     var lineRange = [];

    //     for (var i = 0; e.length > i; i++) {
    //         for (var i2 = i; e.length > i2; i2++) {
    //             if ((e[i].pointedTo != e[i2].pointedTo || (e[i].line === e[i2].pointedTo)) && ((e[i].line === e[i].pointedTo && e[i2].line === e[i2].pointedTo) || (e[i].dTIT <= e[i].dist && e[i2].dTIT <= e[i2].dist))) {
    //                 // if (lineRange.length > 0) {
    //                 //     if (e[i].dir > lineRange[lineRange.length - 1].end.dir) {
    //                 //         lineRange.push({
    //                 //             start: e[i],
    //                 //             end: e[i2]
    //                 //         });
    //                 //     } else {
    //                 //         lineRange[lineRange.length - 1].end = e[i];
    //                 //     }
    //                 // } else {
    //                 //     lineRange.push({
    //                 //         start: e[i],
    //                 //         end: e[i2]
    //                 //     });
    //                 // }
    //                 lineRange.push({
    //                     start: e[i],
    //                     end: e[i2]
    //                 });
    //             }
    //         }
    //     }

    //     lineRanges = lineRanges.concat(lineRange);
    //     // var valueToAdd = {
    //     //     start: 9999,
    //     //     starti: 0,
    //     //     end: -9999,
    //     //     endi: 0
    //     // };

    //     // for (var i = 0; lineRange.length > i; i++) {
    //     //     if (valueToAdd.start > lineRange[i].start.dir) {
    //     //         valueToAdd.start = lineRange[i].start.dir;
    //     //         valueToAdd.starti = i;
    //     //     }
    //     // }

    //     // for (var i = 0; lineRange.length > i; i++) {
    //     //     if (valueToAdd.end < lineRange[i].end.dir) {
    //     //         valueToAdd.end = lineRange[i].end.dir;
    //     //         valueToAdd.endi = i;
    //     //     }
    //     // }
    //     // for (var i = 0; lineRange.length > i; i++) {
    //     //     for (var i2 = i; lineRange.length > i2; i2++) {
    //     //         if (lineRange[i] != undefined && lineRange[i2] != undefined) {
    //     //             if (lineRange[i] != undefined && lineRange[i2] != undefined && between(lineRange[i2].start.dir, lineRange[i].start.dir, lineRange[i].end.dir) && !between(lineRange[i2].end.dir, lineRange[i].start.dir, lineRange[i].end.dir)) {
    //     //                 lineRange.push({
    //     //                     start: lineRange[i].start,
    //     //                     end: lineRange[i2].end
    //     //                 });
    //     //                 lineRange.splice(i2, 1);
    //     //                 lineRange.splice(i, 1);
    //     //             }
    //     //             if (lineRange[i] != undefined && lineRange[i2] != undefined && between(lineRange[i2].start.dir, lineRange[i].start.dir, lineRange[i].end.dir) && between(lineRange[i2].end.dir, lineRange[i].start.dir, lineRange[i].end.dir)) {
    //     //                 lineRange.splice(i2, 1);
    //     //             }
    //     //         } else {
    //     //             i = 0;
    //     //             i2 = 0;
    //     //         }
    //     //     }
    //     // }
    //     // if (lineRange[valueToAdd.starti] && lineRange[valueToAdd.endi]) {
    //     //     lineRanges.push({
    //     //         start: lineRange[valueToAdd.starti].start,
    //     //         end: lineRange[valueToAdd.endi].end
    //     //     });
    //     // }
    //     // for (var i = 0; lineRange.length > i; i++) {
    //     //     var lineRange2 = [];
    //     //     lineRange2.push(lineRange[i].start);
    //     //     lineRange2.push(lineRange[i].end);
    //     //     for (var i2 = i; lineRange.length > i2; i2++) {
    //     //         lineRange2.sort(function (a, b) {
    //     //             if (a.dir != b.dir) {
    //     //                 return a.dir - b.dir;
    //     //             } else {
    //     //                 return 1;
    //     //             }
    //     //         });
    //     //         if (between(lineRange[i2].dir, lineRange2[0].dir, lineRange2[lineRange2.length - 1].dir)) {

    //     //         }
    //     //     }
    //     // }
    //     //console.log(e);
    //     // if (e.length > 0) {
    //     //     for (var i = 0; e.length - 1 > i; i++) {
    //     //         lineRanges.push({
    //     //             start: e[i],
    //     //             end: e[i + 1]
    //     //         });
    //     //     }
    //     // }
    // });
    return lineRanges;
}