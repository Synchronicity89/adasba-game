var p = {
    x: 192,
    y: 108,
    dx: 0,
    dy: 0
};

var l = 0;

function rayFan(x, y, dir, chunk, arr, bounce, draw, angle, number) {
  for (var i = 0; number > i; i++) {
    arr.push(ray(x, y, dir - angle / 2 + angle * (i / number) + Math.PI * 2, chunk, arr, bounce, draw));
  }
}

var shifts = [];

var noise = new ImageData(1920, 1080);
for (var i = 0; noise.data.length > i; i += 4) {
  var rand = Math.floor(Math.random() * 256);
  noise.data[i] = rand;
  noise.data[i + 1] = rand;
  noise.data[i + 2] = rand;
  noise.data[i + 3] = Math.floor(Math.pow(Math.random(), 3) * 48);
}


var tc = document.createElement("canvas");
var tctx = tc.getContext("2d");
tc.width = 384;
tc.height = 216;


var noisec = document.createElement("canvas");
var noisectx = noisec.getContext("2d");
noisec.width = 1920;
noisec.height = 1080;
noisectx.putImageData(noise, 0, 0);

var alt = Math.random();

var bakedRays = [];


function testCollidePoint(x, y, dx, dy, line) {
  var lineEq = twoPointsToSlopeIntercept(line.start.x, line.start.y, line.end.x, line.end.y);
  return ((lineEq.m * x + lineEq.b > y) == (lineEq.m * (x + dx) + lineEq.b <= y + dy) && 
  (between(x, line.start.x, line.end.x) || 
  between(y, line.start.y, line.end.y) || 
  between(x + dx, line.start.x, line.end.x) || 
  between(y + dy, line.start.y, line.end.y)))
}


function gameLoop() {
  if (l % 100 == 0) {
    bakedRays = [];
    //rayFan(100, 64, Math.PI / 2, chunks, bakedRays, 3, { width: 8, hue: "#FFFFFF01" }, Math.PI / 1.2, 250);
    //rayFan(100, 64, Math.PI / 2, chunks, bakedRays, 3, { width: 8, hue: "#FFFFFF02" }, Math.PI / 1.2, 250);
  }


  alt = Math.random();
    // c.width = 192 * (1 + pyth(p.dx, p.dy) * 0.05);
    // c.height = 108 * (1 + pyth(p.dx, p.dy) * 0.05);
    // lc.width = 192 * (1 + pyth(p.dx, p.dy) * 0.05);
    // lc.height = 108 * (1 + pyth(p.dx, p.dy) * 0.05);
    // lc2.width = 192 * (1 + pyth(p.dx, p.dy) * 0.05);
    // lc2.height = 108 * (1 + pyth(p.dx, p.dy) * 0.05);
    // c2.width = 192 * (1 + pyth(p.dx, p.dy) * 0.05);
    // c2.height = 108 * (1 + pyth(p.dx, p.dy) * 0.05);
    l++
    p.x += p.dx;
    p.y += p.dy;
    if (k[83]) {
        p.dy += 0.7;
    }
    if (k[65]) {
        p.dx -= 0.25;
    }
    if (k[68]) {
        p.dx += 0.25;
    }

    p.dx *= 0.9;

    p.dy += 0.2;
    // (lineEq.m * p.x + lineEq.b > p.y) == (lineEq.m * (p.x + p.dx) + lineEq.b <= p.y + p.dy) && 
    //     (between(p.x, chunks[i].start.x, chunks[i].end.x) || 
    //     between(p.y, chunks[i].start.y, chunks[i].end.y) || 
    //     between(p.x + p.dx, chunks[i].start.x, chunks[i].end.x) || 
    //     between(p.y + p.dy, chunks[i].start.y, chunks[i].end.y))
    for (var i = 0; chunks.length > i; i++) {
      if (chunks[i].start.x == chunks[i].end.x) {
        chunks[i].end.x += 0.00001;
      }
      if (chunks[i].type == "solid") {
        //var lineEq = twoPointsToSlopeIntercept(chunks[i].start.x, chunks[i].start.y, chunks[i].end.x, chunks[i].end.y);
        if (testCollidePoint(p.x, p.y, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x, p.y - 12, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x + 6, p.y - 6, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x - 7, p.y - 6, p.dx, p.dy, chunks[i]) ||
        testCollidePoint(p.x + 6, p.y - 12, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x - 7, p.y - 12, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x + 6, p.y, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x - 7, p.y, p.dx, p.dy, chunks[i])) {
          if (k[87] && between(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI * 2, Math.PI / 2 * 1.5 - 0.1, Math.PI / 2 * 2.5 + 0.1)) {
            p.dy = -4.5;
          }
          p.x += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(p.dx);
          p.y += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(p.dy);
          //p.x -= p.dx;
          //p.y -= p.dy;
          p.dx += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
          p.dy += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
          //p.x -= p.dx;
          //p.y -= p.dy;
          //p.x -= Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 0.1;
          //p.y -= Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 0.1;
        }
      }
    }

    lctx.fillStyle = "#000000";
    lctx.fillRect(0, 0, lc.width, lc.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.translate(-p.x + c.width / 2, -p.y + c.height / 2);
    lctx.save();
    lctx.translate(-p.x + c.width / 2, -p.y + c.height / 2);
    lctx2.clearRect(0, 0, lc2.width, lc2.height);
    lctx2.save();
    lctx2.translate(-p.x + c.width / 2, -p.y + c.height / 2);
    
    ctx.save();
    ctx.translate(p.x / 2, p.y / 2);
    ctx.fillStyle = "#F2F2F2";
    ctx.fillRect(-1, -100, 1001, 101);
    ctx.fillRect(-100, -100, 101, 1000);
    renderAllTiles(backgroundTiles, clamp(Math.floor(p.x / 32) - 12, 0, 50), clamp(Math.floor(p.y / 32) - 12, 0, 50), Math.ceil(384 / 16), Math.ceil(216 / 16));
    ctx.restore();

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#00000088";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.restore();

    //renderAllTiles(map.tiles, clamp(Math.floor(p.x / 16) - 12, 0, 50), clamp(Math.floor(p.y / 16) - 12, 0, 50), Math.ceil(384 / 16), Math.ceil(216 / 16));
    ctx.drawImage(a.map, 0, 0);

    lctx.lineCap = "round";
    lctx.lineJoin = "round";
    lctx.globalCompositeOperation = "destination-out";
    var vrays = vecRay(p.x, p.y - 12, chunks);
    
    var grd = lctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 150);
    grd.addColorStop(0, "#FFFFFFFF");
    grd.addColorStop(1, "#FFFFFF00");
    lctx.fillStyle = grd;
    lctx.lineWidth = 1;
    lctx.beginPath();
    vrays.forEach(function (e) {
      lctx.lineTo(e.start.x, e.start.y);
      lctx.lineTo(e.end.x, e.end.y);
    });
    lctx.fill();

    //lctx.strokeStyle = "#FFFFFF44";
    var grd = lctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 150);
    grd.addColorStop(0, "#FFFFFF66");
    grd.addColorStop(1, "#FFFFFF00");
    lctx.strokeStyle = grd;
    lctx.lineWidth = 40;
    lctx.beginPath();
    vrays.forEach(function (e, i, v) {
      if (i != v.length - 1 && pyth(e.end.x, e.end.y, v[i + 1].start.x, v[i + 1].start.y) > 1) {
        for (var i2 = 0; 4 > i2; i2++) {
          lctx.stroke();
          lctx.lineWidth = i2 * 10 + 10;
        }
        lctx.beginPath();
      }
      lctx.moveTo(e.start.x, e.start.y);
      lctx.lineTo(e.end.x, e.end.y);
    });
    for (var i2 = 0; 4 > i2; i2++) {
      lctx.stroke();
      lctx.lineWidth = i2 * 10 + 10;
    }
    lctx.globalCompositeOperation = "normal";
    lctx.beginPath();
    lctx.fillStyle = "#00000099";
    lctx.arc(p.x, p.y - 12, 300, Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2) + Math.PI / 8, Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2) - Math.PI / 8);
    lctx.lineTo(p.x, p.y - 12);
    lctx.fill();

    // for (var i2 = 0; 2 > i2; i2++) {
    //     var rays = [];
    //     // for (var i = 0; 400 > i; i++) {
    //     //     rays.push(ray(p.x, p.y, i * Math.PI * 2 / 400, chunks, rays, 3, { width: 8 }));
    //     // }
    //     //for (var i = 0; 100 > i; i++) {
    //         //var angle = (i * Math.PI * 2 / 1200 + Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2) + 47 * Math.PI / 24) % (Math.PI * 2);
    //         //rays.push(ray(p.x, p.y, angle, chunks, rays, 3, { width: 6 }));
    //     //}
    //     rayFan(p.x, p.y - 4 - 7, Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2), chunks, rays, 4, { width: 3, hue: "#FFEAB206" }, Math.PI / 6, 150);
    //     rays = rays.concat(bakedRays);
    //     //for (var i = 0; 100 > i; i++) {
    //     //  rays.push(ray(300, 136, 1 * Math.PI / 4 + i * Math.PI * 2 / 300 + l / 100, chunks, rays, 10, { width: 12 }));
    //     //}

    //     //rayFan(500, 136, l / 63, chunks, rays, 3, { width: 12, hue: "#FFFFFF02" }, Math.PI / 1.3, 100);
    //     //rayFan(300, 136, l / 100, chunks, rays, 3, { width: 12, hue: "#FFFFFF02" }, Math.PI / 1.3, 100);
    //     //rayFan(100, 96, l / 37, chunks, rays, 3, { width: 12, hue: "#FFFFFF02" }, Math.PI / 1.3, 100);
    //     //for (var i = 0; 100 > i; i++) {
    //     //    rays.push(ray(100, 96, 1 * Math.PI / 4 + i * Math.PI * 2 / 300 + l / 37, chunks, rays, 10, { width: 12 }));
    //     //  }
    //     // for (var i = 0; 50 > i; i++) {
    //     //   rays.push(ray(350, 64, 1 * Math.PI / 4 + i * Math.PI * 2 / 200, chunks, rays, 10, { width: 40 }));
    //     // }

    //     if (i2 == 1) {
    //       var grd = lctx.createRadialGradient(p.x, p.y - 11, 0, p.x, p.y - 11, 30);
    //       grd.addColorStop(0, "#FFEAB244");
    //       grd.addColorStop(1, "#FFFFFF00");
    //     } else {
    //       var grd = lctx.createRadialGradient(p.x, p.y - 11, 0, p.x, p.y - 11, 30);
    //       grd.addColorStop(0, "#FFFFFF88");
    //       grd.addColorStop(1, "#FFFFFF00");
    //     }
    //     lctx.beginPath();
    //     lctx.fillStyle = grd;
    //     lctx.arc(p.x, p.y, 40, 0, Math.PI * 2);
    //     lctx.fill();


    //     for (var i = 0; rays.length > i; i++) {
    //         if (rays[i]) {
    //             if (i2 == 1) {
    //               lctx.strokeStyle = rays[i].draw.hue;
    //             }
    //             lctx.lineWidth = rays[i].draw.width;
    //             if (rays[i] && rays[i].x) {
    //                 lctx.beginPath();
    //                 lctx.moveTo(rays[i].sx, rays[i].sy);
    //                 if (rays[i].type != "reflect") {
    //                   lctx.lineTo(rays[i].x + Math.cos(rays[i].dir) * 12, rays[i].y + Math.sin(rays[i].dir) * 12);
    //                 } else {
    //                   lctx.lineTo(rays[i].x, rays[i].y);
    //                 }
    //                 lctx.stroke();
    //             }
    //         }
    //     }




    //     lctx.globalCompositeOperation = "normal";
    //     lctx = lc2.getContext("2d");
    //     lctx.lineWidth = 12;
    //     lctx.lineCap = "round";
    // }


    
    lctx = lc.getContext("2d");

    lctx.fillStyle = "#FFB20011";
    if (alt > 0.85) {
      doToRect(map.tiles, 0, 0, 50, 50, function(e, i, i2) {
        if (hasTile(e, a.gps) != false) {
          lctx.save();
          lctx.translate(i2 * 16 + 8, i * 16 + 8);
          lctx.rotate(e[hasTile(e, a.gps)].rotate);
          lctx.fillRect(-8, -2, 16, 4);
          lctx.restore();
        }
        if (hasTile(e, a.gpc) != false) {
          lctx.save();
          lctx.translate(i2 * 16 + 8, i * 16 + 8);
          lctx.rotate(e[hasTile(e, a.gpc)].rotate);
          lctx.fillRect(-8, -2, 10, 4);
          lctx.fillRect(-2, 2, 4, 6);
          lctx.restore();
        }
      });
    }

    ctx.drawImage(a.wheel, p.x - 8, p.y - 8 - 7);
    ctx.drawImage(a.body, p.x - 8, p.y - 8 - 7);
    ctx.save();
    ctx.translate(p.x, p.y - 4 - 7);
    ctx.rotate(Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2));
    ctx.drawImage(a.eye, -8, -8);
    ctx.restore();


    
    if (inRect(272, 192, 16, 16, p.x, p.y) && Math.random() > 0.5) {
      lctx.fillStyle = "#A5E7FF88";
      lctx.textAlign = "center";
      lctx.font = "12px FixedsysExcelsior301Regular";
      lctx.fillText("Warning: Security breached!", 272, 192);
    }

    if (inRect(592, 112, 16, 16, p.x, p.y) && Math.random() > 0.5) {
      lctx.fillStyle = "#A5E7FF88";
      lctx.textAlign = "center";
      lctx.font = "12px FixedsysExcelsior301Regular";
      lctx.fillText("To Activate Laser:", 592, 96);
      lctx.fillText("[LEFT_MOUSE_BUTTON]", 592, 112);
    }

    if (inRect(512, 80, 16, 16, p.x, p.y) && Math.random() > 0.5) {
      lctx.fillStyle = "#A5E7FF88";
      lctx.textAlign = "center";
      lctx.font = "12px FixedsysExcelsior301Regular";
      lctx.fillText("Enemy bots nearby!", 512, 80);
    }

    ctx.restore();
    lctx.restore();
    lctx2.restore();

     ctx.mozImageSmoothingEnabled = false;
     ctx.webkitImageSmoothingEnabled = false;
     ctx.msImageSmoothingEnabled = false;
     ctx.imageSmoothingEnabled = false;
    ctx.drawImage(lc, 0, 0, c.width, c.height);
    ctx.drawImage(lc2, 0, 0, c.width, c.height);

    var randRows = 0;
    var randWidth = 0;

    // var c = ctx.getImageData(0, 0, c.width, c.height);
    // var canvasData2 = new ImageData(c.width, c.height);


    if (Math.random() > 0.9) {
      shifts.push({
        start: Math.floor(Math.random() * c.height),
        end: Math.floor(Math.random() * c.height),
        shift: Math.floor(Math.random() * 4 - 1.5),
        move: Math.floor(Math.random() * 4 - 2)
      });
      if (shifts[shifts.length - 1].move == 0) {
        shifts[shifts.length - 1].move = Math.floor(Math.random()) * 2 - 1;
      }
    }


    for (var i = 0; shifts.length > i; i++) {
      shifts[i].start += shifts[i].move;
      shifts[i].end += shifts[i].move;
      ctx.drawImage(c, 0, shifts[i].start, c.width, shifts[i].end - shifts[i].start, shifts[i].shift, shifts[i].start, c.width, shifts[i].end - shifts[i].start);
      if (!between(shifts[i].start, 0, c.height) && !between(shifts[i].end, 0, c.height)) {
        shifts.splice(i, 1);
      }
    }

    ctx.drawImage(noisec, Math.floor(Math.random() * (noisec.width - c.width)), Math.floor(Math.random() * (noisec.height - c.height)), c.width, c.height, 0, 0, c.width, c.height);

    requestAnimationFrame(gameLoop);
}

//gameLoop();
