var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var p = {
    x: 0,
    y: 0
}

var lv = lvls[0];

function setLevel(lvl) {
    p = lvl.p;
    lv = lvl;
}

setLevel(lvls[0]);

function loop() {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, c.width, c.height);



    ctx.fillStyle = "#00FF00";
    ctx.fillRect(p.x * 16 + 4, p.y * 16 + 4, 8, 8);



    lv.tiles.forEach(function(e) {
        if (e.type == "default") {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#00FF00";
            ctx.strokeRect(e.x * 16 + 0.5, e.y * 16 + 0.5, 15, 15);
        } else if (e.type == "end") {
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#00FF00";
            ctx.strokeRect(e.x * 16, e.y * 16, 16, 16);
        }
    });

    requestAnimationFrame(loop);
}
loop();