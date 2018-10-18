var p = {
    x: -15,
    y: 700,
    dx: 12,
    dy: 0,
    r: 0,
    ground: false
};

var scroll = {
    d: 0,
    y: 0
}

var level = {
    s: [
        {
            t: "line",
            s: { x: 1000, y: 900},
            e: { x: 1128, y: 900}
        },
        {
            t: "line",
            s: { x: 1400, y: 800},
            e: { x: 1528, y: 800}
        },
        {
            t: "line",
            s: { x: 1800, y: 700},
            e: { x: 1928, y: 700}
        }
    ],
    f: [{
        xmin: 0,
        xmax: 2500,
        initf: function() {
            window.pxs = [];
            for (var i = 0; 32 > i; i++) {
                for (var i2 = 0; 30 > i2; i2++) {
                    if (Math.random() > Math.sqrt(i2 / 30)) {
                        window.pxs.push({ x: i * 4 + 1000, y: i2 * 4 + 900, a: i2 / 30, p: Math.random() * 5 + 16 - i2 / 2 });
                    }
                }
            }
            for (var i = 0; 32 > i; i++) {
                for (var i2 = 0; 30 > i2; i2++) {
                    if (Math.random() > Math.sqrt(i2 / 30)) {
                        window.pxs.push({ x: i * 4 + 1400, y: i2 * 4 + 800, a: i2 / 30, p: Math.random() * 5 + 16 - i2 / 2 });
                    }
                }
            }
            for (var i = 0; 32 > i; i++) {
                for (var i2 = 0; 30 > i2; i2++) {
                    if (Math.random() > Math.sqrt(i2 / 30)) {
                        window.pxs.push({ x: i * 4 + 1800, y: i2 * 4 + 700, a: i2 / 30, p: Math.random() * 5 + 16 - i2 / 2 });
                    }
                }
            }
        },
        f: function() {
            window.pxs.forEach(function (e) {
                ctx.fillStyle = "hsla(0, 0%, 0%, " + (1 - e.a) + ")";
                ctx.fillRect(e.x, e.y + polyEase(clamp(1300 - p.x, 0, 1300), 1300, e.p), 4, 4);
            })
            //ctx.fillRect(1000, 900, 100, 50);
            //ctx.fillRect(1400, 800, 128, 64);
            //ctx.fillRect(1800, 700, 128, 64);
        }
    }]
};

var lv = level;

function loop() {
    p.x += p.dx;
    p.y += p.dy;
    p.dy += 1;
    p.ground = false;

    if (p.y > 1000) {
        p.ground = true;
        p.y = 1001;
    }

    lv.s.forEach(function(e) {
        if (e.t == "line") {
            if (between(p.x, e.s.x - 25, e.e.x + 25) && between(p.y, e.s.y - 25, e.e.y + 25)) {
                p.ground = true;
                p.y = e.s.y - 25;
            }
        }
    });

    if (p.ground != false) {
        p.r *= 0.5;
        p.dy = 0;
        if (mD[0]) {
            p.dy = -18;
        }
    } else {
        p.r = (p.r + 0.1) % (Math.PI / 2);
    }



    if (p.y - scroll.y > 720) {
        scroll.y += Math.abs(p.dy);
    } else if (p.y - scroll.y < 360) {
        scroll.y -= Math.abs(p.dy);
    } /*else {
        scroll.d *= 0.5;
    }
    scroll.y += scroll.d;*/


    ctx.clearRect(0, 0, c.width, c.height);

    ctx.save();
    ctx.translate(300-p.x, -scroll.y);





    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();


    // lv.s.forEach(function(e) {
    //     if (e.t == "line") {
    //         ctx.beginPath();
    //         ctx.moveTo(e.s.x, e.s.y);
    //         ctx.lineTo(e.e.x, e.e.y);
    //         ctx.stroke();
    //     }
    // });

    lv.f.forEach(function (e) {
        if (p.x < e.xmin && p.x + p.dx >= e.xmin) {
            e.initf();
        }
        if (between(p.x, e.xmin, e.xmax)) {
            e.f();
        }
    })


    ctx.restore();
    requestAnimationFrame(loop);
}
loop();