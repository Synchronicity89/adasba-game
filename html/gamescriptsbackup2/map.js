function twoPointsToSlopeIntercept(x1, y1, x2, y2) {
  return { m: (y1 - y2) / (x1 - x2), b: -((y1 - y2) / (x1 - x2)) * x1 + y1 };
}

function drawTile(tile, x, y) {
    for (var i = 0; tile.length > i; i++) {
        if (tile[i].type == "tile") {
            ctx.save();
            ctx.translate(x * 16 + 8, y * 16 + 8);
            ctx.rotate(tile[i].rotate);
            ctx.drawImage(tile[i].texture, -8, -8);
            ctx.restore();
        }
     }
}

var map = {
    tiles: [],
    lines: []
};

for (var i = 0; 10 > i; i++) {
    map.lines.push([]);
    for (var i2 = 0; 10 > i2; i2++) {
        map.lines[i].push([]);
    }
}

map.lines[0][0].push({
    start: { x: 384, y: 64 },
    end: { x: 0, y: 64 },
    type: "solid",
    ray: "solid"
});

map.lines[0][0].push({
    start: { x: 32, y: 64 },
    end: { x: 32, y: 128 },
    type: "solid",
    ray: "solid"
});

map.lines[0][0].push({
    start: { x: 0, y: 128 },
    end: { x: 208, y: 128 },
    type: "solid",
    ray: "solid"
});

map.lines[0][0].push({
    start: { x: 208, y: 208 },
    end: { x: 384, y: 208 },
    type: "solid",
    ray: "solid"
});

map.lines[0][0].push({
    start: { x: 208, y: 128 },
    end: { x: 208, y: 208 },
    type: "solid",
    ray: "solid"
});

// map.lines[0][0].push({
//     start: { x: 240, y: 180 },
//     end: { x: 280, y: 140 },
//     type: "solid",
//     ray: "reflect"
// });

// map.lines[0][0].push({
//     start: { x: 208.001, y: 128 },
//     end: { x: 208.001, y: 208 },
//     type: "none",
//     ray: "reflect"
// });

// map.lines[0][0].push({
//     start: { x: 208, y: 207.999 },
//     end: { x: 288, y: 207.999 },
//     type: "none",
//     ray: "reflect"
// });

map.lines[0][0].push({
    start: { x: 384, y: 208 },
    end: { x: 384, y: 64 },
    type: "solid",
    ray: "solid"
});

var chunks = map.lines[0][0];

for (var i = 0; 50 > i; i++) {
    map.tiles.push([]);
    for (var i2 = 0; 50 > i2; i2++) {
        map.tiles[i].push([{
            type: "none",
            texture: undefined
        }]);
    }
}


function doToRect(arr, x, y, w, h, f) {
    for (var i = y; y + h > i; i++) {
        for (var i2 = x; x + w > i2; i2++) {
            f(arr[i][i2], i, i2);
        }
    }
}

var mapImg = new Image();
mapImg.src = "map.png";
var mapCanvas = document.createElement("canvas");
var mapContext = mapCanvas.getContext("2d");
mapImg.onload = function() {
    mapCanvas.width = 50;
    mapCanvas.height = 200;
    mapContext.drawImage(mapImg, 0, 0);
    var mapDrawData = mapContext.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
    doToRect(map.tiles, 0, 0, 50, 50, function (e, i, i2) {
        for (var i3 = 0; 4 > i3; i3++) {
            var checkIndex = 4 * (i2 + mapCanvas.width * i) + i3 * 4 * (mapCanvas.width * 50);
            if (mapDrawData.data[checkIndex + 3] == 255) {
                //console.log(aarr[mapDrawData.data[4 * (i2 + mapCanvas.width * i) + 0]]);
                map.tiles[i][i2] = map.tiles[i][i2].concat(aarr[Math.floor(mapDrawData.data[checkIndex] / 32) + Math.floor(mapDrawData.data[checkIndex + 1] / 4)]);
            }
        }
    });
    console.log(map.tiles);
}




// doToRect(map.tiles, 0, 0, 32, 4, function (e) {
//     e.push({
//         type: "tile",
//         texture: a.gt,
//         rotate: 0
//     });
// });

// doToRect(map.tiles, 0, 8, 13, 9, function (e) {
//     e.push({
//         type: "tile",
//         texture: a.gt,
//         rotate: 0
//     });
// });

// doToRect(map.tiles, 0, 13, 32, 12, function (e) {
//     e.push({
//         type: "tile",
//         texture: a.gt,
//         rotate: 0
//     });
// });

// doToRect(map.tiles, 0, 3, 32, 1, function (e) {
//     e.push({
//         type: "tile",
//         texture: a.gtb,
//         rotate: Math.PI * 3 / 2
//     });
// });

// doToRect(map.tiles, 0, 8, 13, 1, function (e) {
//     e.push({
//         type: "tile",
//         texture: a.gtb,
//         rotate: Math.PI / 2
//     });
// });

// doToRect(map.tiles, 13, 13, 12, 1, function (e) {
//     e.push({
//         type: "tile",
//         texture: a.gtb,
//         rotate: Math.PI / 2
//     });
// });



function renderAllTiles() {
    for (var i = 0; map.tiles.length > i; i++) {
        for (var i2 = 0; map.tiles[i].length > i2; i2++) {
            drawTile(map.tiles[i][i2], i2, i);
        }
    }
}

setTimeout(renderAllTiles, 200);
