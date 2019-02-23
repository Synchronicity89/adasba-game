//stores all assets in an object
var a = {};

//"wsrc" function that creates an image with a source
function wsrc(src) {
    var img = new Image();
    img.src = src;
    return img;
}




//grey tile set
a.gt = wsrc("tiles/greytile.png");

a.gtb = wsrc("tiles/greytileborder.png");

a.gtcc = wsrc("tiles/greytilecornerconcave.png");

a.gtcv = wsrc("tiles/greytilecornerconvex.png");



//grey pipe set
a.gps = wsrc("tiles/greypipestraight.png");

a.gpc = wsrc("tiles/greypipecurved.png");



//orange pipe set
a.ops = wsrc("tiles/orangepipestraight.png");

a.opc = wsrc("tiles/orangepipecurved.png");



//grey strut set
a.gs = wsrc("tiles/greystrut.png");

a.gse = wsrc("tiles/greystrutend.png");



//crate deco set
a.c = wsrc("tiles/crate.png");



//the whole heccing map
a.map = wsrc("mapimage.png");

a.foreground = wsrc("foregroundtest.png");



a.wheel = wsrc("playerimg/wheel.png");

a.body = wsrc("playerimg/body.png");

a.eye = wsrc("playerimg/eye.png");



a.basicenemy = wsrc("entities/enemybot.png");

a.securitylaser = wsrc("entities/securitylaser.png");

a.block = wsrc("entities/block.png");

a.alert = wsrc("tiles/alert.png");

a.checkpoint = wsrc("tiles/checkpoint.png");

a.toggle = wsrc("tiles/toggle.png");

a.boss1 = wsrc("entities/boss1.png");

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
