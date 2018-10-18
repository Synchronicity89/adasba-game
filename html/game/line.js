function getChannels(arr, x, y, w, h) {
    return {
        r: arr[(x + w * y) * 4],
        g: arr[(x + w * y) * 4 + 1],
        b: arr[(x + w * y) * 4 + 2],
        a: arr[(x + w * y) * 4 + 3]
    };
}

function imageDataFromImage(img, w, h) {
    var imagecanvas = document.createElement("canvas");
    var imagecontext = imagecanvas.getContext("2d");
    imagecanvas.width = w;
    imagecanvas.height = h;
    imagecontext.drawImage(img, 0, 0);
    return (imagecontext.getImageData(0, 0, w, h));
}

function linesFromImage(img, w, h, l) {
    var lines = [];
    var iLD = [];
    for (var i = 0; l > i; i++) {
        for (var i2 = i * h; (i + 1) * h > i2; i2 += 2) {
            for (var i3 = 0; w > i3; i3 += 2) {
                var px1 = getChannels(img, i3, i2, w, h);
                if (px1.a == 255) {
                    iLD.push({
                        id: px1.r + 256 * px1.g + 65536 * px1.b,
                        start: getChannels(img, i3 + 1, i2, w, h).r,
                        type: getChannels(img, i3, i2 + 1, w, h).r,
                        ray: getChannels(img, i3 + 1, i2 + 1, w, h).r,
                        coords: { x: i3 * 8, y: (i2 - i * h) * 8 }
                    });
                }
            }
        }
    }
    for (var i = 0; iLD.length > i; i++) {
        for (var i2 = 0; iLD.length > i2; i2++) {
            if (i > i2) {
                if (iLD[i].id == iLD[i2].id) {
                    var start;
                    var end;
                    var type;
                    var rayType;
                    if (iLD[i].start == 0) {
                        start = iLD[i].coords;
                        end = iLD[i2].coords;
                    } else {
                        start = iLD[i2].coords;
                        end = iLD[i].coords;                        
                    }
                    if (iLD[i].type == 0) {
                        type = "solid";
                    }
                    if (iLD[i].ray == 0) {
                        rayType = "solid";
                    }
                    lines.push({
                        start: start,
                        end: end,
                        type: type,
                        ray: rayType
                    });
                }
            }
        }
    }
    console.log(lines);
    return lines;
}

// var linemap = wsrc("linemap.png");
// // var linec = document.createElement("canvas");
// // var line
// linemap.onload = function() {
//     map.lines[0][0] = linesFromImage(imageDataFromImage(linemap, 102, 408).data, 102, 102, 4);
//     chunks = map.lines[0][0];
//     gameLoop();
// }

map.lines = JSON.parse('[[[{"start":{"x":384,"y":64},"end":{"x":32,"y":63.999999},"type":"solid","ray":"solid"},{"start":{"x":32,"y":64},"end":{"x":32,"y":128},"type":"solid","ray":"solid"},{"start":{"x":32,"y":128},"end":{"x":208,"y":128},"type":"solid","ray":"solid"},{"start":{"x":208,"y":128},"end":{"x":208,"y":208},"type":"solid","ray":"solid"},{"start":{"x":208,"y":208},"end":{"x":528,"y":208},"type":"solid","ray":"solid"},{"start":{"x":528,"y":208},"end":{"x":528,"y":112},"type":"solid","ray":"solid"},{"start":{"x":528,"y":112},"end":{"x":480,"y":112},"type":"solid","ray":"solid"},{"start":{"x":480,"y":112},"end":{"x":480,"y":96},"type":"solid","ray":"solid"},{"start":{"x":480,"y":96},"end":{"x":544,"y":96},"type":"solid","ray":"solid"},{"start":{"x":544,"y":96},"end":{"x":544,"y":128},"type":"solid","ray":"solid"},{"start":{"x":544,"y":128},"end":{"x":608,"y":128},"type":"solid","ray":"solid"},{"start":{"x":384,"y":160},"end":{"x":384,"y":64},"type":"solid","ray":"solid"},{"start":{"x":480,"y":160},"end":{"x":384,"y":160},"type":"solid","ray":"solid"},{"start":{"x":480,"y":144},"end":{"x":480,"y":160},"type":"solid","ray":"solid"},{"start":{"x":432,"y":144},"end":{"x":480,"y":144},"type":"solid","ray":"solid"},{"start":{"x":432,"y":64},"end":{"x":432,"y":144},"type":"solid","ray":"solid"},{"start":{"x":640,"y":64},"end":{"x":432,"y":64},"type":"solid","ray":"solid"},{"start":{"x":640,"y":208},"end":{"x":640,"y":64},"type":"solid","ray":"solid"},{"start":{"x":576,"y":208},"end":{"x":640,"y":208},"type":"solid","ray":"solid"},{"start":{"x":608,"y":128},"end":{"x":608,"y":176},"type":"solid","ray":"solid"},{"start":{"x":608,"y":176},"end":{"x":544,"y":176},"type":"solid","ray":"solid"},{"start":{"x":576,"y":224},"end":{"x":576,"y":208},"type":"solid","ray":"solid"},{"start":{"x":640,"y":224},"end":{"x":576,"y":224},"type":"solid","ray":"solid"},{"start":{"x":640,"y":288},"end":{"x":640,"y":224},"type":"solid","ray":"solid"},{"start":{"x":496,"y":288},"end":{"x":640,"y":288},"type":"solid","ray":"solid"},{"start":{"x":544,"y":176},"end":{"x":544,"y":256},"type":"solid","ray":"solid"},{"start":{"x":544,"y":256},"end":{"x":496,"y":256},"type":"solid","ray":"solid"}],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]]]');
chunks = map.lines[0][0];
setTimeout(function () {
    gameLoop();
}, 1000);