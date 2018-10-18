var p = {
    x: 192,
    y: 108,
    dx: 0,
    dy: 0
};



function gameLoop() {
    

    p.x += p.dx;
    p.y += p.dy;

    if (k[87]) {
        p.dy -= 0.7;
    }
    if (k[83]) {
        p.dy += 0.7;
    }
    if (k[65]) {
        p.dx -= 0.7;
    }
    if (k[68]) {
        p.dx += 0.7;
    }

    p.dx *= 0.92;
    p.dy *= 0.92;


    // for (var i = 0; chunks > i; i++) {
    //     if ()
    // }


    lctx.fillStyle = "#000000";
    lctx.fillRect(0, 0, lc.width, lc.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.translate(-p.x + 192, -p.y + 108);
    lctx.save();
    lctx.scale(0.25, 0.25);
    lctx.translate(-p.x + 192, -p.y + 108);




    renderAllTiles();
    lctx.globalCompositeOperation = "destination-out";
    lctx.strokeStyle = "#FFFFFF05";
    lctx.lineWidth = 12;
    lctx.lineCap = "round";
    for (var i2 = 0; 2 > i2; i2++) {
        var rays = [];
        for (var i = 0; 400 > i; i++) {
            rays.push(ray(p.x, p.y, i * Math.PI * 2 / 400, chunks, rays, 10, { width: 8 }));
        }
        for (var i = 0; 25 > i; i++) {
            var angle = (i * Math.PI * 2 / 600 + Math.atan2(m.y - winSize.y / 2, m.x - winSize.x / 2) + 95 * Math.PI / 48) % (Math.PI * 2);
            rays.push(ray(p.x, p.y, angle, chunks, rays, 10, { width: 16 }));
        }
        for (var i = 0; rays.length > i; i++) {
            lctx.lineWidth = rays[i].draw.width;
            if (rays[i] && rays[i].x) {
                lctx.beginPath();
                lctx.moveTo(rays[i].sx, rays[i].sy);
                lctx.lineTo(rays[i].x, rays[i].y);
                lctx.stroke();
                //lctx.fillRect(rays[i].x, rays[i].y, 3, 3)
            } else if (rays[i]) {
                lctx.beginPath();
                lctx.moveTo(rays[i].sx, rays[i].sy);
                lctx.lineTo(rays[i].sx + Math.cos(rays[i].slope) * 1000, rays[i].sy + Math.sin(rays[i].slope) * 1000);
                lctx.stroke();
            }
        }
        lctx.globalCompositeOperation = "normal";
    }

    ctx.restore();
    lctx.restore();
    lctx.globalCompositeOperation = "normal";
    // ctx.mozImageSmoothingEnabled = false;
    // ctx.webkitImageSmoothingEnabled = false;
    // ctx.msImageSmoothingEnabled = false;
    // ctx.imageSmoothingEnabled = false;
    //ctx.globalAlpha = 0.8;
    ctx.drawImage(lc, 0, 0, c.width, c.height);
    //ctx.globalAlpha = 1;
    requestAnimationFrame(gameLoop);
}

gameLoop();