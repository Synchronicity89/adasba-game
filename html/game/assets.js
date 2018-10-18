//stores all assets in an object
var a = {};

//"wsrc" function that creates an image with a source
function wsrc(src) {
    var img = new Image();
    img.src = src;
    return img;
}




//grey tile set
a.gt = wsrc("greytile.png");

a.gtb = wsrc("greytileborder.png");

a.gtcc = wsrc("greytilecornerconcave.png");

a.gtcv = wsrc("greytilecornerconvex.png");



//grey pipe set
a.gps = wsrc("greypipestraight.png");

a.gpc = wsrc("greypipecurved.png");



//orange pipe set
a.ops = wsrc("orangepipestraight.png");

a.opc = wsrc("orangepipecurved.png");



//grey strut set
a.gs = wsrc("greystrut.png");

a.gse = wsrc("greystrutend.png");



//crate deco set
a.c = wsrc("crate.png");



//the whole heccing map
a.map = wsrc("mapimage.png");


a.wheel = wsrc("playerimg/wheel.png");

a.body = wsrc("playerimg/body.png");

a.eye = wsrc("playerimg/eye.png");

aa = Object.values(a);

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

for (var i = 0; 2 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gps,
        rotate: i * Math.PI / 2
    }]);
}

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gpc,
        rotate: i * Math.PI / 2
    }]);
}

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gs,
        rotate: i * Math.PI / 2
    }]);
}

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.gse,
        rotate: i * Math.PI / 2
    }]);
}

for (var i = 0; 4 > i; i++) {
    aarr.push([{
        type: "tile",
        texture: a.c,
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
