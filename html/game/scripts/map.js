function twoPointsToSlopeIntercept(x1, y1, x2, y2) {
  return { m: (y1 - y2) / (x1 - x2), b: -((y1 - y2) / (x1 - x2)) * x1 + y1 };
}

function drawTile(tile, x, y) {
    for (var i = 0; tile.length > i; i++) {
        if (tile[i].type == "tile") {
            if (tile[i].type !== a.gt) {
                ctx.save();
                ctx.translate(x * 16 + 8, y * 16 + 8);
                ctx.rotate(tile[i].rotate);
                ctx.drawImage(tile[i].texture, -8, -8);
                ctx.restore();
            } else {
                //ctx.save();
                //ctx.drawImage(tile[i].texture, x * 16, y * 16);
                //ctx.restore();
                ctx.fillStyle = "#F2F2F2";
                ctx.drawImage(x * 16, y * 16, 16, 16);
            }
                // ctx.save();
                // ctx.translate(x * 16 + 8, y * 16 + 8);
                // ctx.rotate(tile[i].rotate);
                // ctx.drawImage(aa[Math.floor((aa.length - 1) * Math.random())], -8, -8);
                // ctx.restore();
        }
     }
}

function drawTileAlt(tile, x, y) {
    // drawTile(tile, x, y);
    for (var i = 0; tile.length > i; i++) {
        if (tile[i].type == "tile") {
            if (tile[i].type !== a.gt) {
                ctx.save();
                ctx.translate(x * 16 + 8, y * 16 + 8);
                ctx.rotate(tile[i].rotate);
                if (tile[i].texture === a.gps) {
                    ctx.drawImage(a.ops, -8, -8);
                } else if (tile[i].texture === a.gpc) {
                    ctx.drawImage(a.opc, -8, -8);
                } else {
                    ctx.drawImage(tile[i].texture, -8, -8);
                }
                ctx.restore();
            } else {
                //ctx.save();
                //ctx.drawImage(tile[i].texture, x * 16, y * 16);
                //ctx.restore();
                ctx.fillStyle = "#F2F2F2";
                ctx.drawImage(x * 16, y * 16, 16, 16);
            }
        }
     }
}

function hasTile(block, tile) {
    var whatToReturn = false
    block.forEach(function (e, i) {
        if (e.texture === tile) {
            whatToReturn = i;
        }
    });
    return whatToReturn;
}

var map = {
    tiles: [],
    lines: [],
    events: []
};

for (var i = 0; 10 > i; i++) {
    map.lines.push([]);
    for (var i2 = 0; 10 > i2; i2++) {
        map.lines[i].push([]);
    }
}

for (var i = 0; 10 > i; i++) {
    map.events.push([]);
    for (var i2 = 0; 10 > i2; i2++) {
        map.events[i].push({
            load: function() {

            }
        });
    }
}

var mapEventTriggers = {
    bossOneComplete: false,
    thirtyFiveTogglePuzzleComplete: false
};

map.events[0][0].load = function () {
    o.push(new MessageDisplay(16, 400, ["Checkpoint Nearby", "Press [S] to Save!"]));
    o.push(new CheckPoint(32, 400));
    o.push(new BasicEnemy(300, 340, 130));
    o.push(new BasicEnemy(300, 280, 130));
    o.push(new SecurityLaser(159, 273, function (a) {
    //return (a / 50) % (Math.PI / 2) + Math.PI / 2;
    return { 
        dir: Math.PI / 4 * 3 + Math.sin(a / 100) * Math.PI / 4,
        x: 159,
        y: 273
    };
    }));

    o.push(new SecurityLaser(209, 401, function (a) {
        return {
            dir: Math.PI / 2 + 0.00001,
            x: 405 + Math.sin(a / 150) * 150,
            y: 401
        };
    }));

    o.push(new SecurityLaser(209, 401, function (a) {
        return {
            dir: 3 * Math.PI / 2 + 0.00001,
            x: 405 + Math.cos(a / 200 + Math.PI / 4) * 150,
            y: 479
        };
    }));

    o.push(new MessageDisplay(272, 192, ["Warning: Security Breached"]));
    o.push(new MessageDisplay(511, 80, ["Warning: Enemy Bots Engaged"]));
    o.push(new MessageDisplay(304, 336, ["Warning: Security Lasers Active"]));
}

map.events[0][1].load = function () {
    o.push(new MessageDisplay(592, 112, ["To Activate Laser:", "[LEFT_MOUSE_BUTTON]"]));
}

for (var i = 0; 50 > i; i++) {
    map.tiles.push([]);
    for (var i2 = 0; 50 > i2; i2++) {
        map.tiles[i].push([{
            type: "none",
            texture: undefined
        }]);
    }
}

function lastObj(a, b) {
    if (a == undefined) {
        return o[o.length - 1];
    } else {
        return o[o.length - (b - a)];
    }
}

map.events[1][0].load = function () {
    o.push(new CheckPoint(480, 768));
    o.push(new SecurityLaser(432, 639, function (a) {
        return {
            dir: Math.PI / 4 * 7 + Math.sin(a / 60) * Math.PI / 4,
            x: 432,
            y: 639
        }
    }));

    o.push(new MessageDisplay(336, 1008, ["BLUE_LASER_FUNCTION:", "LEVITATE"]));

    o.push(new LevitateLaser(496, 1023, function (a) {
        return { 
            dir: Math.PI / 4 * 6 + Math.sin(a / 200) * Math.PI / 8,
            x: 496,
            y: 1023
        };
    }));
}

map.events[1][1].load = function () {
    o.push(new BasicEnemy(850, 712, 130));
    o.push(new BasicEnemy(900, 712, 130));
    o.push(new BasicEnemy(950, 712, 130));
    o.push(new BasicEnemy(1000, 712, 130));
}

map.events[1][2].load = function () {
    o.push(new SecurityLaser(1632, 879, function (a) {
        return {
            dir: 3 * Math.PI / 2 + 0.00001,
            x: 1632 + Math.sin(a / 350) * 150,
            y: 879
        };
    }));
    o.push(new SecurityLaser(1632, 879, function (a) {
        return {
            dir: 3 * Math.PI / 2 + 0.00001,
            x: 1632 + Math.sin(a / 350 + Math.PI * 1) * 150,
            y: 879
        };
    }));
    o.push(new SecurityLaser(1632, 737, function (a) {
        return {
            dir: 1 * Math.PI / 2 + 0.00001,
            x: 1632 + Math.sin(a / 350 + Math.PI * 0.5) * 150,
            y: 737
        };
    }));
    o.push(new SecurityLaser(1632, 737, function (a) {
        return {
            dir: 1 * Math.PI / 2 + 0.00001,
            x: 1632 + Math.sin(a / 350 + Math.PI * 1.5) * 150,
            y: 737
        };
    }));
    o.push(new MessageDisplay(1216, 912, ["Move box with laser."]));
    o.push(new MessageDisplay(1072, 768, ["HEAVY_DUTY_LASER:", "INSTANT_DEATH"]));
    o.push(new MessageDisplay(1152, 608, ["[S] to flip toggles."]));
    o.push(new MessageDisplay(1392, 912, ["Flip all to deactivate laser."]));
    o.push(new CheckPoint(1376, 912));
    o.push(new Box(1264, 912, 70))
    o.push(new Box(1360, 912, 70))
    o.push(new InstantDeathLaser(1312, 928, function(a) {
        return {
            dir: Math.PI * 1.4999,
            x: 1312,
            y: 927
        };
    }));
    for (var i = 0; 3 > i; i++) {
        o.push(new Toggle(1456 + 128 * i, 752, "On", "Off", function() {}, function () {}, true));
        lastObj().toggleTag2 = true;
        o.push(new Toggle(1520 + 128 * i, 800, "On", "Off", function() {}, function () {}, true));
        lastObj().toggleTag2 = true;
    }
    o.push(new InstantDeathLaser(1425, 936, function(a) {
        return {
            dir: 0,
            x: 1425,
            y: 936
        };
    }));
    lastObj().laserTag2 = true;
    for (var i = 0; 6 > i; i++) {
        o.push(new Toggle(1248 + 48 * i, 640, "1", "0", function() {}, function () {}));
        lastObj().toggleTag = true;
    }
    o.push(new InstantDeathLaser(1120, 783, function(a) {
        return {
            dir: Math.PI * 1.4999,
            x: 1120,
            y: 783
        };
    }));
    lastObj().laserTag = true;
}

map.events[1][2].frame = function () {
    var toggles = [];
    var toggleableLaser = undefined;
    for (var i = 0; o.length > i; i++) {
        if (o[i].toggleTag) {
            toggles.push(o[i]);
        }
        if (o[i].laserTag) {
            toggleableLaser = o[i];
        }
    }
    if (toggles.length == 6 &&
        toggles[0].state &&
        !toggles[1].state &&
        toggles[2].state &&
        !toggles[3].state &&
        toggles[4].state &&
        !toggles[5].state) {
        toggleableLaser.f = function (a) {
            return {
                dir: Math.PI * 0.49999,
                x: 1120,
                y: 783
            }
        }
    }
    var toggles = [];
    var toggleableLaser = undefined;
    for (var i = 0; o.length > i; i++) {
        if (o[i].toggleTag2) {
            toggles.push(o[i]);
        }
        if (o[i].laserTag2) {
            toggleableLaser = o[i];
        }
    }
    var containsTrue = false;
    for (var i = 0; toggles.length > i; i++) {
        if (toggles[i].state) {
            containsTrue = true;
        }
    }
    if (!containsTrue) {
        toggleableLaser.f = function (a) {
            return {
                dir: Math.PI,
                x: 1425,
                y: 936
            }
        }
    }
}

map.events[2][2].load = function () {
    o.push(new CheckPoint(1440, 1120));
    o.push(new MessageDisplay(1504, 1120, ["Stop.", "You've gone too far."]));
    o.push(new MessageDisplay(1568, 1120, ["You could have escaped.", "But you didn't."]));
    o.push(new MessageDisplay(1632, 1120, ["This ends now."]));
    if (!mapEventTriggers.bossOneComplete) {
        o.push(new InstantDeathLaser(1408, 1135, function () {
            return {
                dir: Math.PI * 1.4999,
                x: 1408,
                y: 1135
            };
        }));
        lastObj().removeWhenBossDies = true;
    }
}

var bossCounter = 0;

map.events[1][3].load = function () {
    o.push(new AreaRectEvent(1672, 1008, 328, 208, function () {
        bossCounter++;
    }, function () {
        o.push(new Boss1(1840, 1112));
        p.x += 16;
        o.push(new InstantDeathLaser(1680, 1135, function () {
            return {
                dir: Math.PI * 1.4999,
                x: 1680,
                y: 1135
            };
        }));
        lastObj().removeWhenBossDies = true;
        bossCounter = 0;
    }, function () {
    }, function () {
        
    }));
    lastObj().removeWhenBossDies = true;
}

map.events[2][1].load = function () {
    o.push(new LevitateLaser(992, 1375, function () {
        return {
            dir: Math.PI * 1.4999,
            x: 992,
            y: 1375
        };
    }));
    o.push(new LevitateLaser(544, 1487, function () {
        return {
            dir: Math.PI * 1.4999,
            x: 544,
            y: 1487
        };
    }));
}

map.events[3][0].load = function () {
    o.push(new LevitateLaser(152, 1663, function () {
        return {
            dir: Math.PI * 1.4999,
            x: 152,
            y: 1663
        };
    }));
}

map.events[3][3].load = function () {
    o.push(new SecurityLaser(1456, 1553, function (a) {
        return {
            dir: Math.PI * 0.4999,
            x: 1456 + 280 * Math.sin(a / 300),
            y: 1553
        };
    }));
    o.push(new SecurityLaser(1456, 1553, function (a) {
        return {
            dir: Math.PI * 0.4999,
            x: 1456 + 280 * Math.sin(a / 300 + Math.PI),
            y: 1553
        };
    }));
    o.push(new SecurityLaser(1456, 1553, function (a) {
        return {
            dir: Math.PI * 1.4999,
            x: 1456 + 280 * Math.sin(a / 300 + Math.PI * 0.5),
            y: 2031
        };
    }));
    o.push(new SecurityLaser(1456, 1553, function (a) {
        return {
            dir: Math.PI * 1.4999,
            x: 1456 + 280 * Math.sin(a / 300 + Math.PI * 1.5),
            y: 2031
        };
    }));
    o.push(new SecurityLaser(1456, 1553, function (a) {
        return {
            dir: Math.PI,
            x: 1775,
            y: 1792 + 192 * Math.sin(a / 600 + Math.PI)
        };
    }));
    for (var i = 0; 5 > i; i++) {
        for (var i2 = 0; 7 > i2; i2++) {
            o.push(new Toggle(1216 + i2 * 80, 1616 + i * 80, "1", "0", function () {}, function () {}, true));
            lastObj().toggleTag3 = true;
        }
    }
    lastObj(0, 35).x -= 16;
    lastObj(6, 35).x -= 16;
    lastObj(11, 35).x -= 16;
    lastObj(23, 35).x -= 16;
    lastObj(28, 35).x -= 16;
    lastObj(32, 35).x -= 16;
    lastObj(34, 35).x -= 16;
}

map.events[3][3].frame = function () {
    var togglemap = [
        true, false, false, false, true, false, true, 
        true, false, false, false, true, false, true, 
        false, false, false, false, false, false, false, 
        true, false, true, false, true, false, false, 
        true, false, true, false, true, true, true
    ];
    var toggleCondition = true;
    var toggles = [];
    for (var i = 0; o.length > i; i++) {
        if (o[i].toggleTag3) {
            toggles.push(o[i]);
        }
    }
    for (var i = 0; toggles.length == 35 && toggles.length > i; i++) {
        toggleCondition = toggleCondition && (toggles[i].state == togglemap[i]);
    }
    if (toggleCondition) {
        console.log("a");
    }
}

function doToRect(arr, x, y, w, h, f) {
    for (var i = y; y + h > i; i++) {
        for (var i2 = x; x + w > i2; i2++) {
            f(arr[i][i2], i, i2);
        }
    }
}

var getjson = new XMLHttpRequest();

getjson.open("GET", "map2.json");

getjson.send();

getjson.onload = function() {
    map.tiles = importMap(getjson.responseText).tiles;
}



var backgroundTiles = [];

var getjson2 = new XMLHttpRequest();

getjson2.open("GET", "background.json");

getjson2.send();

getjson2.onload = function() {
    backgroundTiles = importMap(getjson2.responseText).tiles;
}



function renderAllTiles(whatMap, x, y, w, h) {
    // if (alt > 0.85) {
    //     for (var i = 0; whatMap.length > i; i++) {
    //         for (var i2 = 0; whatMap[i].length > i2; i2++) {
    //             drawTileAlt(whatMap[i][i2], i2, i);
    //         }
    //     }
    // } else {
    //     for (var i = 0; whatMap.length > i; i++) {
    //         for (var i2 = 0; whatMap[i].length > i2; i2++) {
    //             drawTile(whatMap[i][i2], i2, i);
    //         }
    //     }
    // }
    if (alt > 0.85) {
        doToRect(whatMap, x, y, w, h, function (e, i, i2) {
            drawTileAlt(e, i2, i);
        });
    } else {
        doToRect(whatMap, x, y, w, h, function (e, i, i2) {
            drawTile(e, i2, i);
        });
    }
}

setTimeout(renderAllTiles, 200);
