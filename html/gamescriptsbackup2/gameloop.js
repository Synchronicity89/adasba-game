var p = {
    x: 192,
    y: 108,
    dx: 0,
    dy: 0
};

var l = 0;

function gameLoop() {
    l++

    p.x += p.dx;
    p.y += p.dy;

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
    //p.dy *= 0.98;

    p.dy += 0.2;

    for (var i = 0; chunks.length > i; i++) {
      if (chunks[i].start.x == chunks[i].end.x) {
        chunks[i].end.x += 0.00000001;
      }
      if (chunks[i].type == "solid") {
        var lineEq = twoPointsToSlopeIntercept(chunks[i].start.x, chunks[i].start.y, chunks[i].end.x, chunks[i].end.y);
        if ((lineEq.m * p.x + lineEq.b > p.y) == (lineEq.m * (p.x + p.dx) + lineEq.b <= p.y + p.dy) && (between(p.x, chunks[i].start.x, chunks[i].end.x) || between(p.y, chunks[i].start.y, chunks[i].end.y))) {
          p.x += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(p.dx);
          p.y += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(p.dy);
          //p.x -= p.dx;
          //p.y -= p.dy;
          p.dx += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
          p.dy = 0//+= Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 0.01;
          //p.x -= p.dx;
          //p.y -= p.dy;
          //p.x -= Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 0.1;
          //p.y -= Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 0.1;
          if (k[87] && Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) >= 2 * Math.PI / 2 - 0.01) {
              p.dy = -7;
          }
        }
      }
    }
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
    lctx.translate(-p.x + 192, -p.y + 108);
    lctx2.clearRect(0, 0, lc2.width, lc2.height);
    lctx2.save();
    lctx2.translate(-p.x + 192, -p.y + 108);



    renderAllTiles();
    lctx.globalCompositeOperation = "destination-out";
    lctx.strokeStyle = "#FFFFFF10";
    lctx.lineWidth = 12;
    lctx.lineCap = "round";
    lctx = lc.getContext("2d");
    for (var i2 = 0; 2 > i2; i2++) {
        var rays = [];
        // for (var i = 0; 400 > i; i++) {
        //     rays.push(ray(p.x, p.y, i * Math.PI * 2 / 400, chunks, rays, 3, { width: 8 }));
        // }
        for (var i = 0; 100 > i; i++) {
            var angle = (i * Math.PI * 2 / 1200 + Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2) + 47 * Math.PI / 24) % (Math.PI * 2);
            rays.push(ray(p.x, p.y, angle, chunks, rays, 3, { width: 6 }));
        }
        for (var i = 0; 100 > i; i++) {
          rays.push(ray(300, 136, 1 * Math.PI / 4 + i * Math.PI * 2 / 300 + l / 100, chunks, rays, 10, { width: 12 }));
        }
        for (var i = 0; 100 > i; i++) {
            rays.push(ray(100, 96, 1 * Math.PI / 4 + i * Math.PI * 2 / 300 + l / 37, chunks, rays, 10, { width: 12 }));
          }
        // for (var i = 0; 50 > i; i++) {
        //   rays.push(ray(350, 64, 1 * Math.PI / 4 + i * Math.PI * 2 / 200, chunks, rays, 10, { width: 40 }));
        // }
        for (var i = 0; rays.length > i; i++) {
            if (rays[i]) {
                lctx.lineWidth = rays[i].draw.width;
                if (rays[i] && rays[i].x) {
                    lctx.beginPath();
                    lctx.moveTo(rays[i].sx, rays[i].sy);
                    lctx.lineTo(rays[i].x + Math.cos(rays[i].dir) * 12, rays[i].y + Math.sin(rays[i].dir) * 12);
                    lctx.stroke();
                    //lctx.fillRect(rays[i].x, rays[i].y, 3, 3)
                }// } else if (rays[i]) {
                //     lctx.beginPath();
                //     lctx.moveTo(rays[i].sx, rays[i].sy);
                //     lctx.lineTo(rays[i].sx + Math.cos(rays[i].slope) * 100, rays[i].sy + Math.sin(rays[i].slope) * 100);
                //     lctx.stroke();
                // }
            }
        }
        lctx.globalCompositeOperation = "normal";
        lctx = lc2.getContext("2d");
            lctx.strokeStyle = "#FFF1BF06";
            lctx.lineWidth = 12;
            lctx.lineCap = "round";
    }
    lctx = lc.getContext("2d");
    // ctx.fillStyle = "Red";
    // for (var i = 0; rays.length > i; i++) {
    //     if (rays[i]) {
    //         ctx.fillRect(rays[i].sx, rays[i].sy, 1, 1);
    //         ctx.fillRect(rays[i].x, rays[i].y, 1, 1);
    //     }
    // }

    ctx.restore();
    lctx.restore();
    lctx2.restore();
    lctx.globalCompositeOperation = "normal";
    // ctx.mozImageSmoothingEnabled = false;
    // ctx.webkitImageSmoothingEnabled = false;
    // ctx.msImageSmoothingEnabled = false;
    // ctx.imageSmoothingEnabled = false;
    ctx.drawImage(lc, 0, 0, c.width, c.height);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(lc2, 0, 0, c.width, c.height);
    ctx.globalAlpha = 1;
    requestAnimationFrame(gameLoop);
}

gameLoop();
