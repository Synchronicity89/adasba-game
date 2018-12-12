//player info
var p = {
    x: 192,
    y: 108,
    dx: 0,
    dy: 0,
    mhp: 100,
    hp: -1
};

//player spawn point
var spawn = {
  x: 192,
  y: 108,
  dx: 0,
  dy: 0,
  mhp: 100,
  hp: 100
};

//global time variable
var l = 0;

//deprecated "ray fan" function
function rayFan(x, y, dir, chunk, arr, bounce, draw, angle, number) {
  for (var i = 0; number > i; i++) {
    arr.push(ray(x, y, dir - angle / 2 + angle * (i / number) + Math.PI * 2, chunk, arr, bounce, draw));
  }
}

//I don't remember this
function getLinesFromObjects(x, y) {
  var chunks3 = [];
    for (var i = 0; o.length > i; i++) {
      for (var i2 = 0; o[i].hitbox.length > i2; i2++) {
          if (o[i].hitbox[i2].obstacleType == "circle") {
              chunks3.push({
                  start: {
                      x: o[i].hitbox[i2].radius * Math.cos(Math.atan2(o[i].y - y, o[i].x - x) + 1 * Math.PI / 2) + o[i].x,
                      y: o[i].hitbox[i2].radius * Math.sin(Math.atan2(o[i].y - y, o[i].x - x) + 1 * Math.PI / 2) + o[i].y
                  },
                  end: {
                      x: o[i].hitbox[i2].radius * Math.cos(Math.atan2(o[i].y - y, o[i].x - x) + 3 * Math.PI / 2) + o[i].x,
                      y: o[i].hitbox[i2].radius * Math.sin(Math.atan2(o[i].y - y, o[i].x - x) + 3 * Math.PI / 2) + o[i].y
                  },
                  type: "solid",
                  ray: "solid",
                  enemy: true,
                  player: o[i].player
              });
          }
          if (o[i].hitbox[i2].obstacleType == "line") {
              chunks3.push({
                  start: {
                      x: o[i].hitbox[i2].start.x + o[i].x,
                      y: o[i].hitbox[i2].start.y + o[i].y
                  },
                  end: {
                      x: o[i].hitbox[i2].end.x + o[i].x + 0.0000001,
                      y: o[i].hitbox[i2].end.y + o[i].y + 0.0000001
                  },
                  type: "solid",
                  ray: "solid",
                  enemy: true,
                  player: o[i].player
              });
          }
      }
  }
  return chunks3;
}

//weird old television shifting effect
var shifts = [];

//load noise/static effect
var noise = new ImageData(1920, 1080);
for (var i = 0; noise.data.length > i; i += 4) {
  var rand = Math.floor(Math.random() * 256);
  noise.data[i] = rand;
  noise.data[i + 1] = rand;
  noise.data[i + 2] = rand;
  noise.data[i + 3] = Math.floor(Math.pow(Math.random(), 3) * 48);
}

//forgot
var tc = document.createElement("canvas");
var tctx = tc.getContext("2d");
tc.width = 384;
tc.height = 216;

//adds noise to canvas
var noisec = document.createElement("canvas");
var noisectx = noisec.getContext("2d");
noisec.width = 1920;
noisec.height = 1080;
noisectx.putImageData(noise, 0, 0);

var alt = Math.random();

var bakedRays = [];

//given a position and a velocity, does an object collide with a given line?
function testCollidePoint(x, y, dx, dy, line) {
  var lineEq = twoPointsToSlopeIntercept(line.start.x, line.start.y, line.end.x, line.end.y);
  return ((lineEq.m * x + lineEq.b > y) == (lineEq.m * (x + dx) + lineEq.b <= y + dy) && 
  (between(x, line.start.x, line.end.x) || 
  between(y, line.start.y, line.end.y) || 
  between(x + dx, line.start.x, line.end.x) || 
  between(y + dy, line.start.y, line.end.y)))
}

//tests for what "diagonal quadrant" of a square something is in (these quadrants are formed by connecting lines from the center of the square to the corners, creating isoceles triangles)
function diagonalSquareQuadrant(x, y) {
  if (y < -Math.abs(x - 0.5) + 0.5) {
    return 3;
  }
  if (y > Math.abs(x - 0.5) + 0.5) {
    return 1;
  }
  if (x > 0.5) {
    return 0;
  }
  return 2;
}

//load starting chunk
loadChunk(0, 0);

console.log(chunks);

//game loop function that does all player and entitiy physics and everything
function gameLoop() {

  //get time to calculate frame lag (and skip frames if too slow)
  time1 = new Date().getTime();

  //useless and deprecated
  if (l % 100 == 0) {
    bakedRays = [];
  }

  //load all nearby chunks
  for (var i = clamp(Math.floor(p.y / 512) - 1, 0, 9); clamp(Math.floor(p.y / 512) + 2, 0, 9) > i; i++) {
    for (var i2 = clamp(Math.floor(p.x / 512) - 1, 0, 9); clamp(Math.floor(p.x / 512) + 2, 0, 9) > i2; i2++) {
      loadChunk(i2, i);
    }
  }

  //unload all irrelevant chunks every 50 frames
  if (l % 50 == 0) {
    unload();
  }

  //execute chunk frame functions (functions which happen every frame) for all loaded chunks
  for (var i = 0; loadedChunks.length > i; i++) {
    if (map.events[loadedChunks[i].y][loadedChunks[i].x].frame != undefined) {
      map.events[loadedChunks[i].y][loadedChunks[i].x].frame();
    }
  }

  alt = Math.random();

    //increment global time
    l++

    //move player by its velocity, then add to velocity via user input (wasd)
    p.x += p.dx;
    p.y += p.dy;
    if (k[83]) {
        //p.dy += 0.7;
    }
    if (!k[16]) {
      if (k[65]) {
          p.dx -= 0.25;
      }
      if (k[68]) {
          p.dx += 0.25;
      }
    } else {
      if (k[65]) {
        p.dx -= 0.4;
      }
      if (k[68]) {
          p.dx += 0.4;
      }
    }

    //function that allows player to be moved by another object without breaking the collision detection
    o.forEach(function(e) {
      if (e.frameMove) {
        e.frameMove();
      }
    });

    //exponential decay of x velocity
    p.dx *= 0.9;
    
    //gravity
    p.dy += 0.2;

    //collision detection
    for (var i = 0; chunks.length > i; i++) {
      if (chunks[i].start.x == chunks[i].end.x) {
        chunks[i].end.x += 0.00001;
      }
      if (chunks[i].type == "solid") {
        if (testCollidePoint(p.x, p.y, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x, p.y - 12, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x + 6, p.y - 6, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x - 7, p.y - 6, p.dx, p.dy, chunks[i]) ||
        testCollidePoint(p.x + 6, p.y - 12, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x - 7, p.y - 12, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x + 6, p.y, p.dx, p.dy, chunks[i]) || 
        testCollidePoint(p.x - 7, p.y, p.dx, p.dy, chunks[i])) {
          //console.log(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) % (Math.PI * 2));
          if ((k[87] || k[32]) && between((Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI * 2) % (Math.PI * 2), Math.PI * 0.75, Math.PI * 1.25)) {
            p.dy = -4.5;
          }


          if (pyth(p.dx, p.dy) > 3) {
            var audio = new Audio('sounds/collide.wav');
            audio.volume = clamp(pyth(p.dx, p.dy) / 7, 0, 1);
            audio.play();
          }

          p.x += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(p.dx);
          p.y += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(p.dy);

          p.dx += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
          p.dy += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
          
        }
      }
    }
    // for (var i = Math.floor(p.y / 16) - 1; Math.ceil(p.y / 16) + 1 > i; i++) {
    //   for (var i2 = Math.floor(p.x / 16) - 1; Math.ceil(p.x / 16) + 1 > i2; i2++) {
    //     if (cgrid[i][i2].state && inRect(i2 * 16 - 8, i * 16, 32, 32, p.x + p.dx, p.y + p.dy)) {
    //       console.log("a");
    //       var qd = diagonalSquareQuadrant((p.x - i2 * 16) / 16, (p.y - i * 16) / 16);
    //       console.log(qd);
    //       if (qd == 0) {
    //         p.x -= p.dx;
    //         p.dx *= -0.1;
    //       }
    //       if (qd == 1) {
    //         p.y -= p.dy;
    //         p.dy *= -0.1;
    //       }
    //       if (qd == 2) {
    //         p.x -= p.dx;
    //         p.dx *= -0.1;
    //       }
    //       if (qd == 3) {
    //         p.y -= p.dy;
    //         p.dy *= -0.1;
    //         if ((k[87] || k[32])) {
    //           p.dy = -6;
    //         }
    //       }
    //     }
    //   } 
    // }

    //movement function (not drawing) that occurs every frame for an entity
    o.forEach(function (e, i) {
      e.frame();
    });

    //kill entities
    for (var i = 0; o.length > i; i++) {
      if (o[i].hp < 0) {
        o[i].death();
        o.splice(i, 1);
        i--;
      }
    }

    //kill players
    if (p.hp < 0) {
      p = JSON.parse(JSON.stringify(spawn));
      loadedChunks = [];
      chunks = [];
      o = [];
    }

    //reset single-press keys
    for (var i = 0; kD.length > i; i++) {
      kD[i] = false;
    }



    //if the game is fine, render, but if the game is lagging, don't
    if (loopTime < 1000 / 60) {
      render();
    } else {
      loopTime = new Date().getTime() - time1;
      requestAnimationFrame(gameLoop);
    }
}

//gameLoop();
