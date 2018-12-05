moveShift2 = {
  x: 0,
  y: 0
};

moveShift = {
  x: 0,
  y: 0
};

var generateLightPaths = true;

var generateFluorescence = false;

var generateSonarPings = false;

var cameraDisplay = document.createElement("canvas");
var cameraContext = cameraDisplay.getContext("2d");

var loopTime = 0;

var time1 = 0;
var time2 = 0;

function render() {
    //movement shift based on player velocity
    moveShift2.x += p.dx;
    moveShift2.y += p.dy;
    moveShift2.x -= Math.cos(Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x)) * pyth(192, 108, m.x, m.y) * 0.1;
    moveShift2.y -= Math.sin(Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x)) * pyth(192, 108, m.x, m.y) * 0.1;
    moveShift2.x *= 0.9;
    moveShift2.y *= 0.9;

    moveShift.x = moveShift2.x// - Math.cos(Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x)) * 20;
    moveShift.y = moveShift2.y// - Math.sin(Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x)) * 20;

    //clear canvases
    lctx.fillStyle = "#000000";
    lctx.fillRect(0, 0, lc.width, lc.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height);

    //translate canvases to center player
    ctx.save();
    ctx.translate(-p.x + c.width / 2 + moveShift.x, -p.y + c.height / 2 + moveShift.y);
    lctx.save();
    lctx.translate(-p.x + c.width / 2 + moveShift.x, -p.y + c.height / 2 + moveShift.y);
    
    //render background
    if (backgroundTiles) {
      ctx.save();
      ctx.translate(p.x / 2 - moveShift.x / 2, p.y / 2 - moveShift.y / 2);
      ctx.fillStyle = "#F2F2F2";
      ctx.fillRect(-1, -100, 1001, 101);
      ctx.fillRect(-100, -100, 101, 1000);
      ctx.drawImage(a.map, 0, 0);
      //renderAllTiles(backgroundTiles, clamp(Math.floor(p.x / 32) - 12, 0, 50), clamp(Math.floor(p.y / 32) - 12, 0, 50), Math.ceil(384 / 16), Math.ceil(216 / 16));
      ctx.restore();
    }

    //darken background
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#000000CC";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.restore();

    //draw all tiles
    //renderAllTiles(map.tiles, clamp(Math.floor(p.x / 16) - 12, 0, 50), clamp(Math.floor(p.y / 16) - 12, 0, 50), Math.ceil(384 / 16), Math.ceil(216 / 16));
    ctx.drawImage(a.map, p.x - c.width / 2 - moveShift.x, p.y - c.height / 2 - moveShift.y, 384, 216, p.x - c.width / 2 - moveShift.x, p.y - c.height / 2 - moveShift.y, 384, 216);
    //ctx.drawImage(a.map, 0, 0);

    //set line settings to make endings round
    lctx.lineCap = "round";
    lctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    //setup light layer canvas to remove stuff
    lctx.globalCompositeOperation = "destination-out";

    if (generateLightPaths) {

      //rays emmitted from player in all directions
      var vrays = vecRay(p.x, p.y - 12, chunks);

      //make visible space fully visible
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

      //illuminate visible tiles
      var grd = lctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 180);
      grd.addColorStop(0, "#FFFFFF66");
      grd.addColorStop(1, "#FFFFFF00");
      lctx.strokeStyle = grd;
      lctx.lineWidth = 40;
      lctx.beginPath();
      vrays.forEach(function (e, i, v) {
        if (i != v.length - 1 && pyth(e.end.x, e.end.y, v[i + 1].start.x, v[i + 1].start.y) > 1) {
          for (var i2 = 0; 2 > i2; i2++) {
            lctx.stroke();
            lctx.lineWidth = i2 * 20 + 20;
          }
          lctx.beginPath();
        }
        lctx.moveTo(e.start.x, e.start.y);
        lctx.lineTo(e.end.x, e.end.y);
      });
      for (var i2 = 0; 2 > i2; i2++) {
        lctx.stroke();
        lctx.lineWidth = i2 * 20 + 20;
      }

    }
  

    //laser
    if (m.m[0] && l % 4 < 2) {
        var laser = laserray2(p.x, p.y - 12, Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x) + Math.PI * 2, chunks, laser, 4, {}, o);

        ctx.strokeStyle = "#9000FF11";
        for (var i2 = 0; 4 > i2; i2++) {
            ctx.lineWidth = i2 * 6 + 6;
            ctx.beginPath();
            for (var i = 0; laser.length > i; i++) {
                ctx.lineTo(laser[i].sx, laser[i].sy);
                ctx.lineTo(laser[i].x, laser[i].y);
            }
            ctx.stroke();
        }

        ctx.strokeStyle = "#9000FFBB";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; laser.length > i; i++) {
            ctx.lineTo(laser[i].sx, laser[i].sy);
            ctx.lineTo(laser[i].x, laser[i].y);
        }
        ctx.stroke();

        lctx.strokeStyle = "#FFFFFF44";
        for (var i2 = 0; 4 > i2; i2++) {
            lctx.lineWidth = i2 * 6 + 6;
            lctx.beginPath();
            for (var i = 0; laser.length > i; i++) {
                lctx.lineTo(laser[i].sx, laser[i].sy);
                lctx.lineTo(laser[i].x, laser[i].y);
            }
            lctx.stroke();
        }
        if (laser.length > 0) {
          var sparkSource = laser[laser.length - 1];
          o.push(new Spark(sparkSource.x + Math.cos(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), sparkSource.y + Math.sin(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25), 250 + Math.random() * 50));
          if (generateFluorescence) {
            o.push(new FluorescentSpark(sparkSource.x + Math.cos(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), sparkSource.y + Math.sin(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, Math.random() * 300 + 300));
          }
        }
    }

    if (generateSonarPings && l % 13 == 0) {
      for (var i = 0; 100 > i; i++) {
        o.push(new SonarPing(p.x, p.y - 12, i * Math.PI * 0.02 + 0.03));
      }
    }

    //darken light layer to illuminate only small arc of light (like a flash light)
    lctx.globalCompositeOperation = "normal";
    lctx.beginPath();
    lctx.fillStyle = "#00000099";
    lctx.arc(p.x, p.y - 12, 300, Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x) + Math.PI / 8, Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x) - Math.PI / 8);
    lctx.lineTo(p.x, p.y - 12);
    lctx.fill();

        
    lctx = lc.getContext("2d");

    //draw camera
    //ctx.drawImage(cameraDisplay, 288, 561);

    //orange overlay for pipes
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

    //draw player
    ctx.drawImage(a.wheel, p.x - 8, p.y - 8 - 7);
    ctx.drawImage(a.body, p.x - 8, p.y - 8 - 7);
    ctx.save();
    ctx.translate(p.x, p.y - 4 - 7);
    ctx.rotate(Math.atan2(m.y - 1080 / 2, m.x - 1920 / 2));
    ctx.drawImage(a.eye, -8, -8);
    ctx.restore();

    //draw player hp
    ctx.fillStyle = "#9000FF88";
    ctx.fillRect(p.x - 10, p.y - 20, p.hp / 5, 4);

    //draw entities
    o.forEach(function (e) {
      //if (pyth(e.x, e.y, p.x + moveShift.x, p.y + moveShift.y) < 400) {
        e.draw();
      //}
    });

    //end translation of layers
    ctx.restore();
    lctx.restore();

    //disable image smoothing, and draw light canvas layers on main canvas.
     ctx.mozImageSmoothingEnabled = false;
     ctx.webkitImageSmoothingEnabled = false;
     ctx.msImageSmoothingEnabled = false;
     ctx.imageSmoothingEnabled = false;
    // ctx.drawImage(lc, 0, 0, c.width, c.height);
    // ctx.drawImage(lc2, 0, 0, c.width, c.height);

    var randRows = 0;
    var randWidth = 0;

    //create new set of shifting layers
    if (Math.random() > 0.98) {
      var rnum = Math.random();
      shifts.push({
        start: Math.floor(rnum * c.height),
        end: Math.floor(rnum * c.height + Math.random() * 25 + 15),
        shift: Math.floor(Math.random() * 8 - 3.5),
        move: Math.floor(Math.random() * 4 - 2)
      });
      if (shifts[shifts.length - 1].move == 0) {
        shifts[shifts.length - 1].move = Math.floor(Math.random()) * 2 - 1;
      }
    }

    //shift layers
    for (var i = 0; shifts.length > i; i++) {
      shifts[i].start += shifts[i].move;
      shifts[i].end += shifts[i].move;
      ctx.drawImage(c, 0, shifts[i].start, c.width, shifts[i].end - shifts[i].start, shifts[i].shift, shifts[i].start, c.width, shifts[i].end - shifts[i].start);
      if (!between(shifts[i].start, 0, c.height) && !between(shifts[i].end, 0, c.height)) {
        shifts.splice(i, 1);
      }
    }

    // ctx.fillStyle = "White";
    // for (var i = 0; loadedChunks.length > i; i++) {
    //   ctx.fillText(loadedChunks[i].x, 150, 40 + 10 * i);
    //   ctx.fillText(loadedChunks[i].y, 170, 40 + 10 * i);
    // }

    //draw noise effect
    ctx.drawImage(noisec, Math.floor(Math.random() * (noisec.width - c.width)), Math.floor(Math.random() * (noisec.height - c.height)), c.width, c.height, 0, 0, c.width, c.height);
    cameraContext.drawImage(c, 160 + moveShift.x, 90 + moveShift.y - 8, 64, 36, 0, 0, 64, 36);

        //render foreground
        ctx.save();
        ctx.translate(-p.x * 2 + moveShift.x * 2, -p.y * 2 + moveShift.y * 2);
        ctx.fillStyle = "Black";
        //ctx.fillRect(-300, 100 + 380 * i2, 21, 2000);
        for (var i2 = 0; 8 > i2; i2++) {
        ctx.fillRect(-301, 180 + 340 * i2, 4501, 20);
          for (var i = 0; 25 > i; i++) {
            if (Math.abs(p.x * 2 - moveShift.x * 2 - i * 200) < 400) { 
              ctx.drawImage(a.foreground, i * 200, 200 + 340 * i2);
            }
          }
        }
        //renderAllTiles(backgroundTiles, clamp(Math.floor(p.x / 32) - 12, 0, 50), clamp(Math.floor(p.y / 32) - 12, 0, 50), Math.ceil(384 / 16), Math.ceil(216 / 16));
        ctx.restore();
    
    loopTime = new Date().getTime() - time1;
    
    requestAnimationFrame(gameLoop);
}