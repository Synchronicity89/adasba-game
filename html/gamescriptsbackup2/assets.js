var a = {};

function wsrc(src) {
    var img = new Image();
    img.src = src;
    return img;
}

a.gt = wsrc("greytile.png");

a.gtb = wsrc("greytileborder.png");

a.gtcc = wsrc("greytilecornerconcave.png");

a.gtcv = wsrc("greytilecornerconvex.png");

a.gps = wsrc("greypipestraight.png");

a.gpc = wsrc("greypipecurved.png");

aarr = [];
//     a.gt,
//     a.gtb,
//     a.gtcc,
//     a.gtcv,
//     a.gps,
//     a.gpc
// ];

aarr.push([{
        type: "tile",
        texture: a.gt,
        rotate: 0
    }]);

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gtb,
        rotate: i * Math.PI / 2
    }]);
}

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gtcc,
        rotate: i * Math.PI / 2
    }]);
}

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gtcv,
        rotate: i * Math.PI / 2
    }]);
}

// for (var i = 0; 4 > i; i++) {
//     aarr.push([{
//         type: "tile",
//         texture: a.gt,
//         rotate: 0
//     },
//     {
//         type: "tile",
//         texture: a.gtcc,
//         rotate: i * Math.PI / 2
//     }])
// }