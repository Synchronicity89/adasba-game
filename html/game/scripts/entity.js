function Entity() {
    this.x = 0;
    this.y = 0;
    this.init = function () {}
    this.death = function () {}
    this.frame = function () {}
    this.draw = function () {}
    this.hitbox = [];
}

function BasicEnemy(x, y, aggroDist) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.r = 0;
    this.hp = 30;
    this.aggroDist = aggroDist;
    this.engaged = false;
    this.init = function() {

    }
    this.death = function() {
        for (var i = 0; 30 > i; i++) {
            o.push(new Spark(this.x, this.y, Math.random() * 12 - 6, Math.random() * 12 - 6, Math.floor(Math.pow(Math.random() * 15, 2) + 25)));
        }
    }
    this.frame = function() {
        // if (pyth(this.x, this.y, p.x, p.y) < this.aggroDist) {
        //     this.aggroDist = 10000;
        //     this.dx -= Math.cos(Math.atan2(this.y - p.y, this.x - p.x)) * 0.15;
        //     this.dy -= Math.sin(Math.atan2(this.y - p.y, this.x - p.x)) * 0.15;
        // }
        if (this.engaged) {
            this.dx -= Math.cos(Math.atan2(this.y - p.y, this.x - p.x)) * 0.05;
            this.dy -= Math.sin(Math.atan2(this.y - p.y, this.x - p.x)) * 0.05;
        } else {
            var lineOfSight = [ray(this.x, this.y, Math.atan2(this.y - p.y, this.x - p.x), chunks, lineOfSight, 1, {})];
            if (lineOfSight[0] && lineOfSight[0].dist > pyth(this.x, this.y, p.x, p.y)) {
                this.engaged = true;
            }
        }


        if (pyth(this.x, this.y, p.x, p.y) < 20) {
            this.dx += Math.cos(Math.atan2(this.y - p.y, this.x - p.x)) * 0.25;
            this.dy += Math.sin(Math.atan2(this.y - p.y, this.x - p.x)) * 0.25;
            p.hp -= 1;
        }


        this.dx *= 0.99;
        this.dy *= 0.99;
        for (var i = 0; chunks.length > i; i++) {
            if (testCollidePoint(this.x, this.y, this.dx, this.dy, chunks[i])) {
                this.x += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * (Math.abs(this.dx) + 1);
                this.y += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * (Math.abs(this.dy) + 1);
                //this.x -= Math.cos(Math.atan2(this.dy, this.dx));
                //this.y -= Math.sin(Math.atan2(this.dy, this.dx));
                //this.dx *= -1;
                //this.dy *= -1;
                this.dx += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * (Math.abs(this.dx) + 1);
                this.dy += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * (Math.abs(this.dy) + 1);
                //if (l % 5 == 0) {
                //}
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        if (m.m[0]) {
            var lRay = [];
            lRay = laserray2(p.x, p.y - 12, Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x) + Math.PI * 2, chunks, lRay, 4, {}, [this]);
            for (var i = 0; lRay.length > i; i++) {
                if (lRay[i].enemy) {
                    this.hp--;
                    if (Math.random() > 0.5) {
                        o.push(new Spark(this.x, this.y, Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25)));
                    }
                }
            }
        }
        this.r += pyth(this.dx, this.dy) * 0.05;
    }
    this.hitbox = [
        {
            obstacleType: "circle",
            radius: 8,
            x: 0,
            y: 0
        }
    ];
    this.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = "#FF000077";
        ctx.fillRect(-10, 10, this.hp / 1.5, 4)

        ctx.rotate(this.r);
        ctx.drawImage(a.basicenemy, -8, -8);
        ctx.restore();
    }
}



function Spark(x, y, dx, dy, hp, hue) {
    if (hue == undefined) {
        this.hue = Math.random() * 45;
    } else {
        this.hue = hue;
    }
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.hp = hp;
    this.mhp = hp;
    this.init = function() {

    }
    this.death = function() {

    }
    this.frame = function() {
        for (var i = 0; chunks.length > i; i++) {
            if (testCollidePoint(this.x, this.y, this.dx, this.dy, chunks[i])) {
                this.hp = -1;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.dx += Math.random() * 2 - 1;
        this.dy += Math.random() * 2 - 1;
        this.dx *= 0.98;
        this.dy *= 0.98;
        this.dy += 0.3;
        this.hp--;
    }
    this.hitbox = [];
    this.draw = function() {
        //if (Math.random() > 0.5) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "hsl(" + this.hue + ", 100%, 75%, " + (this.hp / this.mhp) + ")";
            ctx.moveTo(this.x - this.dx * 2, this.y - this.dy * 2);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();

            lctx.globalCompositeOperation = "destination-out";
            lctx.beginPath();
            lctx.lineWidth = 8;
            lctx.strokeStyle = "#FFFFFF22";
            lctx.moveTo(this.x - this.dx * 2, this.y - this.dy * 2);
            lctx.lineTo(this.x, this.y);
            lctx.stroke();
            lctx.globalCompositeOperation = "normal";
        //}
    }
}


function simpleRedLaser(x, y, dir) {
    var lRay = laserray2(x, y, dir + Math.PI * 2, chunks, lRay, 4, {}, [
        {
            x: p.x,
            y: p.y - 8,
            hitbox: [
                {
                    obstacleType: "circle",
                    radius: 8,
                    x: 0,
                    y: 0
                }
            ]
        }
    ]);
    

    //if (this.t % 4 > 1) {
        ctx.strokeStyle = "#FF000011";
        for (var i2 = 0; 4 > i2; i2++) {
            ctx.lineWidth = i2 * 6 + 6;
            ctx.beginPath();
            for (var i = 0; lRay.length > i; i++) {
                ctx.lineTo(lRay[i].sx, lRay[i].sy);
                ctx.lineTo(lRay[i].x, lRay[i].y);
            }
            ctx.stroke();
        }

        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; lRay.length > i; i++) {
            ctx.lineTo(lRay[i].sx, lRay[i].sy);
            ctx.lineTo(lRay[i].x, lRay[i].y);
        }
        ctx.stroke();

        lctx.globalCompositeOperation = "destination-out";
        lctx.strokeStyle = "#FFFFFF44";
        for (var i2 = 0; 4 > i2; i2++) {
            lctx.lineWidth = i2 * 6 + 6;
            lctx.beginPath();
            for (var i = 0; lRay.length > i; i++) {
                lctx.lineTo(lRay[i].sx, lRay[i].sy);
                lctx.lineTo(lRay[i].x, lRay[i].y);
            }
            lctx.stroke();
        }
        lctx.globalCompositeOperation = "normal";
    //}
    if (lRay.length > 0) {
      var sparkSource = lRay[lRay.length - 1];
      o.push(new Spark(sparkSource.x + Math.cos(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), sparkSource.y + Math.sin(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25), Math.random() * 30 - 15));
    }
}

function simpleLaserDamage(x, y, dir) {
    var lRay = laserray2(x, y, dir + Math.PI * 2, chunks, lRay, 4, {}, [
        {
            x: p.x,
            y: p.y - 6,
            hitbox: [
                {
                    obstacleType: "circle",
                    radius: 6,
                    x: 0,
                    y: 0
                }
            ]
        }
    ]);
    if (lRay.length > 0 && lRay[lRay.length - 1].enemy) {
        p.hp -= 5;
    }
}


function SecurityLaser(x, y, f) {
    this.x = x;
    this.y = y;
    this.hp = 1;
    this.dir = 0;
    this.t = 0;
    this.init = function() {

    }
    this.death = function() {

    }
    this.frame = function() {
        this.t++;
        this.dir = f(l).dir;
        this.x = f(l).x;
        this.y = f(l).y;
        var lRay = laserray2(this.x, this.y, this.dir + Math.PI * 2, chunks, lRay, 4, {}, [
            {
                x: p.x,
                y: p.y - 9,
                hitbox: [
                    {
                        obstacleType: "circle",
                        radius: 5,
                        x: 0,
                        y: 0
                    }
                ]
            }
        ]);
        if (lRay.length > 0 && lRay[lRay.length - 1].enemy) {
            p.hp -= 5;
        }
        if (this.t % 30 == 0) {
            for (var i = 0; lRay.length > i; i++) {
                if (pyth(lRay[i].x, lRay[i].y, p.x, p.y) < 100) {
                    var audio = new Audio('sounds/laser.wav');
                    audio.volume = clamp(45 / pyth(this.x, this.y, p.x, p.y), 0, 1);
                    audio.play();
                }
            }
            // if (pyth(this.x, this.y, p.x, p.y) < 90) {
            //     var audio = new Audio('sounds/laser.wav');
            //     audio.volume = 20 / pyth(this.x, this.y, p.x, p.y);
            //     audio.play();
            // }
        }
    }
    this.draw = function() {
        imgRotate(a.securitylaser, this.x, this.y, 16, 16, this.dir);
        simpleRedLaser(this.x, this.y, this.dir);
    }
    this.hitbox = [];
}

function MessageDisplay(x, y, msg) {
    this.x = x;
    this.y = y;
    this.msg = msg;
    this.init = function() {

    }
    this.frame = function() {

    }
    this.draw = function() {
        if (inRect(this.x, this.y, 16, 16, p.x, p.y)) {
            lctx.fillStyle = "#A5E7FF88";
            lctx.textAlign = "center";
            lctx.font = "16px FixedsysExcelsior301Regular";
            for (var i = 0; this.msg.length > i; i++) {
                if (Math.random() > 0.5) {
                    lctx.fillText(this.msg[i], this.x + 8, this.y - this.msg.length * 16 + i * 16 + 16);
                }
            }
        }
        ctx.drawImage(a.alert, this.x, this.y);
    }
    this.death = function() {

    }
    this.hp = 66666;
    this.hitbox = [];
}

function CheckPoint(x, y) {
    this.x = x;
    this.y = y;
    this.init = function() {

    }
    this.frame = function() {
        if (k[83] && inRect(this.x, this.y, 16, 16, p.x, p.y)) {
            spawn.x = this.x;
            spawn.y = this.y;
        }
    }
    this.draw = function() {
        if (inRect(this.x, this.y, 16, 16, p.x, p.y)) {
            if (spawn.x == this.x && spawn.y == this.y) {
                lctx.fillStyle = "#b5ffa488";
                lctx.textAlign = "center";
                lctx.font = "16px FixedsysExcelsior301Regular";
                if (Math.random() > 0.5) {
                    lctx.fillText("Saved!", this.x + 8, this.y);
                }
            } else {
                lctx.fillStyle = "#ffa3a388";
                lctx.textAlign = "center";
                lctx.font = "16px FixedsysExcelsior301Regular";
                if (Math.random() > 0.5) {
                    lctx.fillText("Not Saved!", this.x + 8, this.y);
                }
            }
        }
        ctx.drawImage(a.checkpoint, this.x, this.y);
    }
    this.death = function() {

    }
    this.hp = 66666;
    this.hitbox = [];
}


function LevitateLaser(x, y, f) {
    this.x = x;
    this.y = y;
    this.hp = 1;
    this.dir = 0;
    this.t = 0;
    this.f = f;
    this.init = function() {

    }
    this.death = function() {

    }
    this.frameMove = function() {
        this.t++;
        this.dir = this.f(l).dir;
        this.x = this.f(l).x;
        this.y = this.f(l).y;
        var lRay = laserray2(this.x, this.y, this.dir + Math.PI * 2, chunks, lRay, 4, {}, [
            {
                x: p.x,
                y: p.y - 8,
                hitbox: [
                    {
                        obstacleType: "circle",
                        radius: 8,
                        x: 0,
                        y: 0
                    }
                ]
            }
        ]);
        if (lRay.length > 0 && lRay[lRay.length - 1].enemy) {
            p.dy -= 0.4;
            p.dy *= 0.9;
        }
    }
    this.frame = function() {

    }
    this.draw = function() {
        imgRotate(a.securitylaser, this.x, this.y, 16, 16, this.dir);
        var lRay = laserray2(this.x, this.y, this.dir + Math.PI * 2, chunks, lRay, 4, {}, [
            {
                x: p.x,
                y: p.y - 8,
                hitbox: [
                    {
                        obstacleType: "circle",
                        radius: 8,
                        x: 0,
                        y: 0
                    }
                ]
            }
        ]);
        

        //if (this.t % 4 > 1) {
            ctx.strokeStyle = "#0000FF11";
            for (var i2 = 0; 4 > i2; i2++) {
                ctx.lineWidth = i2 * 6 + 6;
                ctx.beginPath();
                for (var i = 0; lRay.length > i; i++) {
                    ctx.lineTo(lRay[i].sx, lRay[i].sy);
                    ctx.lineTo(lRay[i].x, lRay[i].y);
                }
                ctx.stroke();
            }

            ctx.strokeStyle = "#0000FF";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var i = 0; lRay.length > i; i++) {
                ctx.lineTo(lRay[i].sx, lRay[i].sy);
                ctx.lineTo(lRay[i].x, lRay[i].y);
            }
            ctx.stroke();

            lctx.globalCompositeOperation = "destination-out";
            lctx.strokeStyle = "#FFFFFF44";
            for (var i2 = 0; 4 > i2; i2++) {
                lctx.lineWidth = i2 * 6 + 6;
                lctx.beginPath();
                for (var i = 0; lRay.length > i; i++) {
                    lctx.lineTo(lRay[i].sx, lRay[i].sy);
                    lctx.lineTo(lRay[i].x, lRay[i].y);
                }
                lctx.stroke();
            }
            lctx.globalCompositeOperation = "normal";
        //}
        if (lRay.length > 0) {
          var sparkSource = lRay[lRay.length - 1];
          o.push(new Spark(sparkSource.x + Math.cos(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), sparkSource.y + Math.sin(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25), Math.random() * 30 + 215));
        }
    }
    this.hitbox = [];
}


function getAllBoxes() {
    var boxes = [];
    for (var i = 0; o.length > i; i++) {
        if (o[i].box) {
            boxes.push(o[i]);
        }
    }
    return boxes;
}


function Box(x, y, r) {
    this.box = true;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.bx = x;
    this.by = y;
    this.r = r;
    this.hp = 1;
    this.init = function() {

    }
    this.death = function() {

    }
    this.frame = function() {
        if (pyth(this.x, this.y, this.bx, this.by) > r) {
            for (var i = 0; 20 > i; i++) {
                o.push(new Spark(this.x, this.y, Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25), Math.random() * 60 + 155));
            }
            this.x = this.bx;
            this.y = this.by;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (m.m[0]) {
            var lRay = [];
            lRay = laserray2(p.x, p.y - 12, Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x) + Math.PI * 2, chunks, lRay, 4, {}, [this]);
            for (var i = 0; lRay.length > i; i++) {
                if (lRay[i].enemy) {
                    this.dx += Math.cos(lRay[i].dir) * 0.45;
                    this.dy += Math.sin(lRay[i].dir) * 0.45;
                    if (Math.random() > 0.5) {
                        o.push(new Spark(this.x, this.y, Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25)));
                    }
                }
            }
        }
        this.dx *= 0.87;
        this.dy *= 0.87;
        for (var i = 0; chunks.length > i; i++) {
            if (chunks[i].type == "solid" && testCollidePoint(this.x, this.y, this.dx, this.dy, chunks[i])) {
                this.x += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(this.dx);
                this.y += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * Math.abs(this.dy);
      
                this.dx += Math.cos(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
                this.dy += Math.sin(Math.atan2(chunks[i].start.y - chunks[i].end.y, chunks[i].start.x - chunks[i].end.x) + Math.PI / 2) * 1;
            }
        }
    }
    this.draw = function() {
        ctx.drawImage(a.block, this.x - 8, this.y - 8);
        if (Math.random() > 0.5) {
            ctx.strokeStyle = "#00FFFF25";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(this.bx, this.by, this.r, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    this.hitbox = [
        {
            obstacleType: "line",
            start: {
                x: -8,
                y: -8
            },
            end: {
                x: -8,
                y: 8
            }
        },
        {
            obstacleType: "line",
            start: {
                x: -8,
                y: 8
            },
            end: {
                x: 8,
                y: 8
            }
        },
        {
            obstacleType: "line",
            start: {
                x: 8,
                y: 8
            },
            end: {
                x: 8,
                y: -8
            }
        },
        {
            obstacleType: "line",
            start: {
                x: 8,
                y: -8
            },
            end: {
                x: -8,
                y: -8
            }
        }
    ];
}

function InstantDeathLaser(x, y, f) {
    this.x = x;
    this.y = y;
    this.hp = 1;
    this.dir = 0;
    this.t = 0;
    this.f = f;
    this.init = function() {

    }
    this.death = function() {

    }
    this.frame = function() {
        this.t++;
        this.dir = this.f(l).dir;
        this.x = this.f(l).x;
        this.y = this.f(l).y;
        var lRay = laserray2(this.x, this.y, this.dir + Math.PI * 2, chunks, lRay, 4, {}, [
            {
                x: p.x,
                y: p.y - 8,
                hitbox: [
                    {
                        obstacleType: "circle",
                        radius: 8,
                        x: 0,
                        y: 0
                    }
                ],
                player: true
            }
        ].concat(getAllBoxes()));
        if (lRay.length > 0 && lRay[lRay.length - 1].player) {
            p.hp = -1;
        }
    }
    this.draw = function() {
        imgRotate(a.securitylaser, this.x, this.y, 16, 16, this.dir);
        var lRay = laserray2(this.x, this.y, this.dir + Math.PI * 2, chunks, lRay, 4, {}, [
            {
                x: p.x,
                y: p.y - 8,
                hitbox: [
                    {
                        obstacleType: "circle",
                        radius: 8,
                        x: 0,
                        y: 0
                    }
                ],
                player: true
            }
        ].concat(getAllBoxes()));
        

        //if (this.t % 4 > 1) {
            ctx.strokeStyle = "#FF000011";
            for (var i2 = 0; 4 > i2; i2++) {
                ctx.lineWidth = i2 * 9 + 9;
                ctx.beginPath();
                for (var i = 0; lRay.length > i; i++) {
                    ctx.lineTo(lRay[i].sx, lRay[i].sy);
                    ctx.lineTo(lRay[i].x, lRay[i].y);
                }
                ctx.stroke();
            }

            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (var i = 0; lRay.length > i; i++) {
                ctx.lineTo(lRay[i].sx, lRay[i].sy);
                ctx.lineTo(lRay[i].x, lRay[i].y);
            }
            ctx.stroke();

            lctx.globalCompositeOperation = "destination-out";
            lctx.strokeStyle = "#FFFFFF44";
            for (var i2 = 0; 4 > i2; i2++) {
                lctx.lineWidth = i2 * 9 + 9;
                lctx.beginPath();
                for (var i = 0; lRay.length > i; i++) {
                    lctx.lineTo(lRay[i].sx, lRay[i].sy);
                    lctx.lineTo(lRay[i].x, lRay[i].y);
                }
                lctx.stroke();
            }
            lctx.globalCompositeOperation = "normal";
        //}
        if (lRay.length > 0) {
          var sparkSource = lRay[lRay.length - 1];
          for (var i = 0; 3 > i; i++) {
            o.push(new Spark(sparkSource.x + Math.cos(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), sparkSource.y + Math.sin(Math.atan2(sparkSource.sy - sparkSource.y, sparkSource.sx - sparkSource.x)), Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25), Math.random() * 30 - 15));
          }
        }
    }
    this.hitbox = [];
}

function Toggle(x, y, trueStatement, falseStatement, fFalse, fTrue, state) {
    this.x = x;
    this.y = y;
    if (state == undefined) {
        this.state = false;
    } else {
        this.state = state;
    }
    this.hp = 1;
    this.init = function () {

    }
    this.death = function () {

    }
    this.frame = function() {
        if (kD[83] && inRect(this.x, this.y, 16, 16, p.x, p.y)) {
            this.state = !this.state;
            var audio = new Audio('sounds/button.wav');
            audio.play();
        }
    }
    this.draw = function() {
        //if (inRect(this.x, this.y, 16, 16, p.x, p.y)) {
            if (this.state) {
                lctx.fillStyle = "#b5ffa488";
                lctx.textAlign = "center";
                lctx.font = "16px FixedsysExcelsior301Regular";
                if (Math.random() > 0.5) {
                    lctx.fillText(trueStatement, this.x + 8, this.y);
                }
            } else {
                lctx.fillStyle = "#ffa3a388";
                lctx.textAlign = "center";
                lctx.font = "16px FixedsysExcelsior301Regular";
                if (Math.random() > 0.5) {
                    lctx.fillText(falseStatement, this.x + 8, this.y);
                }
            }
        //}
        ctx.drawImage(a.toggle, this.x, this.y);
    }
    this.hitbox = [];
}

function AreaRectEvent(x, y, w, h, f, fIn, fOut, fDraw) {
    this.f = f;
    this.fIn = fIn;
    this.fOut = fOut;
    this.fDraw = fDraw;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hp = 1;
    this.frame = function () {
        if (inRect(this.x, this.y, this.w, this.h, p.x, p.y)) {
            this.f();
        }
        if (!inRect(this.x, this.y, this.w, this.h, p.x, p.y) && inRect(this.x, this.y, this.w, this.h, p.x + p.dx, p.y + p.dy)) {
            this.fIn();
        }
        if (inRect(this.x, this.y, this.w, this.h, p.x, p.y) && !inRect(this.x, this.y, this.w, this.h, p.x + p.dx, p.y + p.dy)) {
            this.fOut();
        }
    }
    this.init = function () {

    }
    this.death = function () {

    }
    this.draw = function () {
        if (inRect(this.x, this.y, this.w, this.h, p.x, p.y)) {
            this.fDraw();
        }
    }
    this.hitbox = [];
}

function FluorescentSpark(x, y, dx, dy, hp) {
    this.fluorescentSpark = true;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.hp = hp;
    this.mhp = hp;
    this.collided = false;
    this.frame = function () {
        for (var i = 0; chunks.length > i; i++) {
            if (testCollidePoint(this.x, this.y, this.dx, this.dy, chunks[i])) {
                this.collided = true;
            }
        }
        if (this.collided) {
            this.hp -= 10;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.99;
        this.dy *= 0.99;
        this.dy += 0.003;
        this.hp--;
    }
    this.init = function () {

    }
    this.death = function () {

    }
    this.draw = function () {
        ctx.fillStyle = "rgba(153, 255, 204, " + (0.05 * this.hp / this.mhp) + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.hp * 0.08, 0, Math.PI * 2);
        ctx.fill();
        lctx.globalCompositeOperation = "destination-out";
        lctx.fillStyle = "rgba(255, 255, 255, " + (0.2 * this.hp / this.mhp) + ")";
        lctx.beginPath();
        lctx.arc(this.x, this.y, this.hp * 0.08, 0, Math.PI * 2);
        lctx.fill();
        lctx.globalCompositeOperation = "normal";
    }
    this.hitbox = [];
}

function SonarPing(x, y, dir) {
    this.x = x;
    this.y = y;
    this.bx = x;
    this.by = y;
    this.dx = Math.cos(dir) * 8;
    this.dy = Math.sin(dir) * 8;
    this.dir = dir;
    this.hp = 50;
    var collided = false;
    var collidefade = 6;
    this.frame = function () {
        var chunks4 = chunks.concat(getLinesFromObjects(this.x, this.y));
        for (var i = 0; chunks4.length > i; i++) {
            if (testCollidePoint(this.x, this.y, this.dx * 1, this.dy * 1, chunks4[i])) {
                collided = true;
            }
        }
        if (collided) {
            collidefade--;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.hp--;
        if (collidefade < 0) {
            this.hp = -1;
        }
    }
    this.init = function () {

    }
    this.death = function () {
        if (Math.random() > 0.8) {
            //o.push(new FluorescentSpark(this.x - this.dx, this.y - this.dy, Math.random() * 4 - 2, Math.random() * 4 - 2, 150 + Math.random() * 150));
        }
    }
    this.draw = function () {
        if (collidefade > 1) {
            ctx.lineCap = "butt";
            ctx.lineWidth = 3;
            ctx.fillStyle = "rgba(153, 255, 204, " + (0.2 * collidefade / 6) + ")";
            ctx.beginPath();
            //ctx.arc(this.bx, this.by, pyth(this.x, this.y, this.bx, this.by), this.dir - Math.PI / 100, this.dir + Math.PI / 100);
            ctx.arc(this.x, this.y, pyth(this.x, this.y, this.bx, this.by) / 20, 0, Math.PI * 2);
            ctx.fill();

            lctx.lineCap = "butt";
            lctx.lineWidth = 3;
            lctx.globalCompositeOperation = "destination-out";
            lctx.fillStyle = "rgba(255, 255, 255, " + (0.6 * collidefade / 6) + ")";
            lctx.beginPath();
            //lctx.arc(this.bx, this.by, pyth(this.x, this.y, this.bx, this.by), this.dir - Math.PI / 100, this.dir + Math.PI / 100);
            lctx.arc(this.x, this.y, pyth(this.x, this.y, this.bx, this.by) / 20, 0, Math.PI * 2);
            lctx.fill();
            lctx.globalCompositeOperation = "normal";
        }
    }
    this.hitbox = [];
}

function Boss1(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.hp = 2500;
    this.t = 200;
    this.attack = 2;
    this.goToCenter = false;
    this.ldir1 = 0;
    this.ldir2 = 0;
    this.tdir = 0;
    this.dtdir = 0;
    this.lt = 0;
    this.frame = function () {
        this.lt++;
        if (this.t < 0) {
            this.attack = Math.floor(Math.random() * 4);
            if (this.attack == 0) {
                this.t = 150;
            }
            if (this.attack == 1) {
                this.t = 500;
            }
            if (this.attack == 2) {
                this.t = 200;
            }
            if (this.attack == 3) {
                this.t = 300;
            }
        }
        if (this.attack == 0) {
            if (!this.goToCenter) {
                if (this.t > 149) {
                    this.dx = Math.cos(Math.atan2(p.y - this.y, p.x - this.x)) * 6;
                    this.dy = Math.sin(Math.atan2(p.y - this.y, p.x - this.x)) * 6;
                }
                this.x += this.dx;
                this.y += this.dy;
                if (inRect(this.x - 16, this.y - 16, 32, 32, p.x, p.y)) {
                    p.hp -= 15;
                }
                if (!inRect(1696, 1024, 288, 176, this.x, this.y)) {
                    this.goToCenter = true;
                }
            } else {
                if (pyth(1840, 1112, this.x, this.y) < 32) {
                    this.goToCenter = false;
                    this.dx = Math.cos(Math.atan2(p.y - this.y, p.x - this.x)) * 6;
                    this.dy = Math.sin(Math.atan2(p.y - this.y, p.x - this.x)) * 6;
                }
            }
        }
        if (this.attack == 1) {
            this.goToCenter = true;
            if (this.t > 449) {
                this.tdir = Math.atan2(p.y - this.y, p.x - this.x);
                this.dtdir = (this.tdir - Math.PI / 2) / -300;
            }
            this.ldir1 = this.tdir + Math.PI / 24 * (this.t / 40 + 1) + Math.sin(this.lt / 30) * (this.t / 350 + 0.2);
            this.ldir2 = this.tdir - Math.PI / 24 * (this.t / 40 + 1) + Math.sin(this.lt / 30) * (this.t / 350 + 0.2);
            this.tdir += this.dtdir;
            if (between(this.t, 20, 400)) {
                simpleLaserDamage(this.x, this.y, this.ldir1);
                simpleLaserDamage(this.x, this.y, this.ldir2);
            }
        }
        if (this.attack == 2) {
            this.goToCenter = true;
            if (between(this.t, 20, 150)) {
                simpleLaserDamage(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2);
                simpleLaserDamage(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2 + 0.5 * Math.PI);
                simpleLaserDamage(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2 + Math.PI);
                simpleLaserDamage(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2 + 1.5 * Math.PI);
            }
            if (this.t % 100 == 50) {
                o.push(new BasicEnemy(this.x, this.y, 1000));
            }
        }
        if (this.attack == 3) {
            if (this.t > 299) {
                this.tdir = Math.PI * 2 * Math.random();
            }
            if (between(this.t, 20, 250) && this.t % 37 > 15) {
                simpleLaserDamage(this.x, this.y, this.t / 30 + this.tdir);
            }
        }
        if (this.goToCenter) {
            this.x += (1840 - this.x) * 0.05;
            this.y += (1112 - this.y) * 0.05;
            if (pyth(1840, 1112, this.x, this.y) < 10) {
                this.goToCenter = false;
            }
        }
        if (inRect(this.x - 16, this.y - 16, 32, 32, p.x, p.y)) {
            p.hp -= 15;
        }
        this.t--;
        if (m.m[0]) {
            var lRay = [];
            lRay = laserray2(p.x, p.y - 12, Math.atan2(m.y - 216 / 2 + 12 - moveShift.y, m.x - 384 / 2 - moveShift.x) + Math.PI * 2, chunks, lRay, 4, {}, [this]);
            for (var i = 0; lRay.length > i; i++) {
                if (lRay[i].enemy) {
                    this.hp--;
                    if (Math.random() > 0.5) {
                        o.push(new Spark(this.x, this.y, Math.random() * 8 - 4, Math.random() * 8 - 4, Math.floor(Math.pow(Math.random() * 15, 2) + 25)));
                    }
                }
            }
        }
    }
    this.init = function () {

    }
    this.death = function () {
        for (var i = 0; o.length > i; i++) {
            if (o[i].removeWhenBossDies) {
                o.splice(i, 1);
            }
        }
        mapEventTriggers.bossOneComplete = true;
    }
    this.draw = function () {
        ctx.drawImage(a.boss1, this.x - 16, this.y - 16);
        imgRotate(a.securitylaser, this.x, this.y, 16, 16, Math.atan2(p.y - this.y, p.x - this.x));
        if (this.attack == 1 && Math.random() < Math.pow(Math.sin(Math.PI * this.t / 450), 0.2)) {
            simpleRedLaser(this.x, this.y, this.ldir1);
            simpleRedLaser(this.x, this.y, this.ldir2);
        }
        if (this.attack == 2 && Math.random() < Math.pow(Math.sin(Math.PI * this.t / 200), 0.2)) {
            simpleRedLaser(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2);
            simpleRedLaser(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2 + 0.5 * Math.PI);
            simpleRedLaser(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2 + Math.PI);
            simpleRedLaser(this.x, this.y, (150 - this.t) / 950 * Math.PI * 2 + 1.5 * Math.PI);
        }
        if (this.attack == 3 && Math.random() < Math.pow(Math.sin(Math.PI * this.t / 300), 0.2) && this.t % 37 > 15) {
            simpleRedLaser(this.x, this.y, this.t / 30 + this.tdir);
        }
        ctx.fillStyle = "#FF000077";
        ctx.fillRect(this.x - 20, this.y + 24, this.hp / 67.5, 4)
    }
    this.hitbox = [
        {
            obstacleType: "line",
            start: {
                x: -16,
                y: -16
            },
            end: {
                x: -16,
                y: 16
            }
        },
        {
            obstacleType: "line",
            start: {
                x: -16,
                y: 16
            },
            end: {
                x: 16,
                y: 16
            }
        },
        {
            obstacleType: "line",
            start: {
                x: 16,
                y: 16
            },
            end: {
                x: 16,
                y: -16
            }
        },
        {
            obstacleType: "line",
            start: {
                x: 16,
                y: -16
            },
            end: {
                x: -16,
                y: -16
            }
        }
    ];
}

function Gun(x, y, range, angle) {
    this.range = range;
    this.angle = angle;
    this.x = x;
    this.y = y;
}
