//the current level
var lv = {};

//player info
var p = {
    x: 960,
    y: 540,
    dx: 0,
    dy: 0,
    poslog: [],
    i: 0
}

//loop counter
var lc = 0;

//all objects on screen
var o = [];

//bullet
function PlayerBullet(x, y, dx, dy, dmg, hitbox, life) {
    this.x = x;
    this.y = y;
    this.type = "PlayerBullet";
    this.dx = dx;
    this.dy = dy;
    this.dmg = dmg;
    this.hitbox = hitbox;
    this.px = x;
    this.py = y;
    this.life = life;
    this.move = function() {
        this.px = this.x;
        this.py = this.y;
        this.x += this.dx;
        this.y += this.dy;
        this.life--;
        wrap(this);
    }
    this.draw = function(cx) {
        cx.beginPath();
        cx.moveTo(this.x, this.y);
        cx.lineTo(this.x - this.dx, this.y - this.dy);
        cx.lineWidth = 15;
        cx.strokeStyle = "White";
        cx.stroke();
        //cx.lineTo(this.px - this.dx / pyth(this.dx, this.dy) * 5, this.py - this.dy / pyth(this.dx, this.dy) * 5);
        cx.lineWidth = 5;
        cx.strokeStyle = hsla(Math.random() * 360, 100, Math.random() * 100, 1);
        cx.stroke();
    }
}



function EnemyBullet(x, y, dx, dy, dmg, hitbox, life, f) {
    this.x = x;
    this.y = y;
    this.type = "EnemyBullet";
    this.dx = dx;
    this.dy = dy;
    this.dmg = dmg;
    this.hitbox = hitbox;
    this.px = x;
    this.py = y;
    this.life = life;
    if (f != undefined) {
        this.f = f;
    } else {
        this.f = function() {};
    }
    this.move = function() {
        this.px = this.x;
        this.py = this.y;
        this.x += this.dx;
        this.y += this.dy;
        this.f();
        this.life--;
        wrap(this);
    }
    this.draw = function(cx) {
        cx.beginPath();
        cx.moveTo(this.x, this.y);
        cx.lineTo(this.x - this.dx, this.y - this.dy);
        cx.lineWidth = 20;
        cx.strokeStyle = "White";
        cx.stroke();
        //cx.lineTo(this.px - this.dx / pyth(this.dx, this.dy) * 5, this.py - this.dy / pyth(this.dx, this.dy) * 5);
        cx.lineWidth = 10;
        cx.strokeStyle = "Black";
        cx.stroke();
    }
}



function BasicEnemy() {
    this.hitbox = 20;
    this.hp = 50;
    this.type = "BasicEnemy";
    this.move = function () {
        this.dx += Math.cos(targetPlayer(this.x, this.y));
        this.dy += Math.sin(targetPlayer(this.x, this.y));
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.99;
        this.dy *= 0.99;
        this.timer++;
        if (Math.random() > 0.9) {
            o.push(new Particle(this.x, this.y, this.dx * -1 + Math.random() * 3 - 1.5, this.dy * -1 + Math.random() * 3 - 1.5, "grav", Math.random() * 15, Math.random() * 50 + 50));
        }
        wrap(this);
    }
    this.draw = function (cx) {
        cx.lineWidth = 5;
        cx.strokeStyle = "White";
        cx.fillStyle = "Black";
        cx.beginPath();
        cx.arc(this.x, this.y, this.hitbox, 0, Math.PI * 2);
        cx.fill();
        cx.stroke();
    }
    this.collide = function () {
        for (var i = 0; o.length > i; i++) {
            if (o[i].type == "PlayerBullet") {
                for (var i2 = 0; pyth(o[i].dx, o[i].dy) > i2; i2++) {
                    if (pyth(o[i].x - i2 * o[i].dx / pyth(o[i].dx, o[i].dy), o[i].y - i2 * o[i].dy / pyth(o[i].dx, o[i].dy), this.x, this.y) < this.hitbox) {
                        for (var i3 = 0; 15 > i3; i3++) {
                            o.push(new Particle(this.x + bR(20), this.y + bR(20), bR(50), bR(50), "grav", Math.random() * 10, Math.random() * 100 + 100));
                        }
                        this.hp -= o[i].dmg;
                        i2 = 9999999;
                        shake += 0.3;
                        o[i].life = -1;
                        this.dx += o[i].dx / 5;
                        this.dy += o[i].dy / 5;
                    }
                }
            }
        }
        if (this.hp < 0) {
            this.life = -1;
            shake += 1;
            for (var i3 = 0; 50 > i3; i3++) {
                o.push(new Particle(this.x + bR(20), this.y + bR(20), bR(100), bR(100), "grav", Math.random() * 10, Math.random() * 100 + 100));
            }
        }
    }
}




function ProjectileEnemy() {
    this.hitbox = 40;
    this.hp = 50;
    this.type = "BasicEnemy";
    this.move = function () {
        if (pyth(this.x, this.y, p.x, p.y) > 400) {
            this.dx += Math.cos(targetPlayer(this.x, this.y)) * 0.6;
            this.dy += Math.sin(targetPlayer(this.x, this.y)) * 0.6;
        } else {
            this.dx -= Math.cos(targetPlayer(this.x, this.y)) * 0.6;
            this.dy -= Math.sin(targetPlayer(this.x, this.y)) * 0.6;
        }
        if (pyth(this.x, this.y, p.x, p.y) > 350 && pyth(this.x, this.y, p.x, p.y) < 450) {
            this.dx += Math.cos(targetPlayer(this.x, this.y) + Math.PI / 2) * 1;
            this.dy += Math.sin(targetPlayer(this.x, this.y) + Math.PI / 2) * 1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.985;
        this.dy *= 0.985;
        this.timer++;
        if (Math.random() > 0.9) {
            o.push(new Particle(this.x, this.y, this.dx * -1 + Math.random() * 3 - 1.5, this.dy * -1 + Math.random() * 3 - 1.5, "grav", Math.random() * 15, Math.random() * 50 + 50));
        }
        if (this.timer % 12 == 0) {
            o.push(new EnemyBullet(this.x, this.y, Math.cos(Math.atan2(p.y - this.y, p.x - this.x)), Math.sin(Math.atan2(p.y - this.y, p.x - this.x)), 25, 10, 120, function () {
                // this.dx += Math.cos(Math.atan2(this.dy, this.dx));
                // this.dy += Math.sin(Math.atan2(this.dy, this.dx));
                if (pyth(this.dx, this.dy) < 25) {
                    this.dx *= 1.05;
                    this.dy *= 1.05;
                }
            }));
        }
        wrap(this);
    }
    this.draw = function (cx) {
        // cx.lineWidth = 5;
        // cx.strokeStyle = "White";
        // cx.fillStyle = "Black";
        // cx.beginPath();
        // cx.arc(this.x, this.y, this.hitbox, 0, Math.PI * 2);
        // cx.fill();
        // cx.stroke();
        cx.lineWidth = 5;
        cx.fillStyle = "Black";
        cx.strokeStyle = "White";
        cx.save();
        cx.translate(this.x, this.y);
        cx.rotate(Math.atan2(this.dy, this.dx));
        cx.beginPath();
        cx.moveTo(-25, -25);
        cx.lineTo(15, 0);
        cx.lineTo(-25, 25);
        cx.closePath();
        cx.fill();
        cx.stroke();
        cx.restore();
    }
    this.collide = function () {
        for (var i = 0; o.length > i; i++) {
            if (o[i].type == "PlayerBullet") {
                for (var i2 = 0; pyth(o[i].dx, o[i].dy) > i2; i2++) {
                    if (pyth(o[i].x - i2 * o[i].dx / pyth(o[i].dx, o[i].dy), o[i].y - i2 * o[i].dy / pyth(o[i].dx, o[i].dy), this.x, this.y) < this.hitbox) {
                        for (var i3 = 0; 15 > i3; i3++) {
                            o.push(new Particle(this.x + bR(20), this.y + bR(20), bR(50), bR(50), "grav", Math.random() * 10, Math.random() * 100 + 100));
                        }
                        this.hp -= o[i].dmg;
                        i2 = 9999999;
                        shake += 0.3;
                        o[i].life = -1;
                        this.dx += o[i].dx / 5;
                        this.dy += o[i].dy / 5;
                    }
                }
            }
        }
        if (this.hp < 0) {
            this.life = -1;
            shake += 1;
            for (var i3 = 0; 50 > i3; i3++) {
                o.push(new Particle(this.x + bR(20), this.y + bR(20), bR(100), bR(100), "grav", Math.random() * 10, Math.random() * 100 + 100));
            }
        }
    }
}




function Particle(x, y, dx, dy, type, r, life) {
    this.type = "Particle";
    this.type2 = type;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.maxlife = Math.floor(life);
    this.life = Math.floor(life);
    if (type == "grav") {
        this.move = function () {
            this.x += this.dx;
            this.y += this.dy;
            for (var i = 0; o.length > i; i++) {
                if (o[i] != this && o[i].type == "Particle") {
                    this.dx -= ((this.maxlife - this.life) / this.maxlife) * clamp(Math.cos(Math.atan2(this.y - o[i].y, this.x - o[i].x)) * 3000 / Math.pow(pyth(this.x, this.y, o[i].x, o[i].y), 2), -1, 1);
                    this.dy -= ((this.maxlife - this.life) / this.maxlife) * clamp(Math.sin(Math.atan2(this.y - o[i].y, this.x - o[i].x)) * 3000 / Math.pow(pyth(this.x, this.y, o[i].x, o[i].y), 2), -1, 1);
                    // if (pyth(this.x, this.y, o[i].x, o[i].y) < this.r + o[i].r && this.maxlife - this.life > 10) {
                    //     this.dx -= 10 * Math.cos(Math.atan2(this.y - o[i].y, this.x - o[i].x));
                    //     this.dy -= 10 * Math.sin(Math.atan2(this.y - o[i].y, this.x - o[i].x));
                    // }
                }
            }
            if (!inRect(0, 0, 1920, 1080, this.x, this.y)) {
                this.life = 0;
            }
            this.life--;
        }
        this.draw = function (cx) {
            cx.globalAlpha = this.life / this.maxlife;
            cx.lineWidth = 5;
            cx.strokeStyle = "#555555";
            cx.fillStyle = "Black";
            cx.beginPath();
            cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            cx.fill();
            cx.stroke();
            cx.globalAlpha = 1;
        }
    }
}



function Enemy(x, y, dx, dy, type) {
    this.timer = 1;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.move = type.move;
    this.draw = type.draw;
    this.collide = type.collide;
    this.hitbox = type.hitbox;
    this.hp = type.hp;
    this.type = type.type;
    this.type2 = "Enemy"
}



function MsgBox(x, y, txt, death) {
    this.death = death;
    this.type = "MsgBox";
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.start = lc;
    var longestString = 0;
    for (var i = 0; txt.length > i; i++) {
        if (txt[i].length > longestString) {
            longestString = txt[i].length;
        }
    }
    this.w = longestString * 16;
    this.h = txt.length * 28 + 17;
    this.txt2 = [""];
    this.i = 0;
    this.i2 = 0;
    this.timer = 0;
    this.draw = function (cx) {
        cx.fillStyle = "Black";
        cx.strokeStyle = "White";
        cx.textAlign = "left";
        cx.lineWidth = 5;
        cx.beginPath();
        cx.rect(this.x + this.w / 2 - expEase(this.timer, 1.2) * this.w / 2, this.y + this.h / 2 - expEase(this.timer, 1.2) * this.h / 2, expEase(this.timer, 1.2) * this.w, expEase(this.timer, 1.2) * this.h);
        cx.fill();
        cx.stroke();
        cx.lineWidth = 3;
        if (expEase(this.timer, 1.2) > 0.99 && this.i < this.txt.length && this.i2 < this.txt[this.i].length) {
            this.txt2[this.i] = this.txt2[this.i].concat(this.txt[this.i].charAt(this.i2));
            this.i2++;
            if (this.txt2[this.i] == this.txt[this.i]) {
                this.txt2.push("");
                this.i++
                this.i2 = 0;
            }
        }
        for (var i = 0; this.txt2.length > i; i++) {
            cx.strokeText(this.txt2[i], this.x + 8, this.y + i * 28 + 30);
        }
        if (lc > this.death) {
            this.life = -1;
        }
        this.timer++;
    }
}



// for (var i = 0; 10 > i; i++) {
//     o.push(new Enemy(100, i * 100, 0, 0, new BasicEnemy()))
// }

//starts the level
function startLvl(lvl) {
    lc = 0;
    lv = lvl;



    p = {
        x: 960,
        y: 540,
        dx: 0,
        dy: 0,
        poslog: [],
        i: 0
    }



    gameLoop();
}

function gameLoop() {

    arrLoop(lv.f, function (e) {
        if (between(lc, e.start, e.end)) {
            e.f();
        }
    });

    p.poslog.push({ x: p.x, y: p.y, dx: p.dx, dy: p.dy });

    if (p.poslog.length > pyth(p.dx, p.dy) * 2.5) {
        p.poslog.splice(0, 2);
    }

    if (k[87]) {
        p.dy--;
    }

    if (k[83]) {
        p.dy++;
    }

    if (k[65]) {
        p.dx--;
    }

    if (k[68]) {
        p.dx++;
    }

    if (mD[0] && p.i < 0) {
        p.i = 12;
        shake += 0.2;
        o.push(new PlayerBullet(p.x, p.y, 70 * Math.cos(Math.atan2(m.y - p.y, m.x - p.x)), 70 * Math.sin(Math.atan2(m.y - p.y, m.x - p.x)), 25, 2.5, 30));
    }
    p.i--;



    for (var i = 0; o.length > i; i++) {
        if (o[i].type == "PlayerBullet") {
            o[i].move();
        }
        if (o[i].type == "EnemyBullet") {
            o[i].move();
        }
        if (o[i].type == "BasicEnemy") {
            o[i].move();
            o[i].collide();
        }
        if (o[i].type == "Particle") {
            o[i].move();
        }
    }



    for (var i = 0; o.length > i; i++) {
        if (o[i].life < 0) {
            o.splice(i, 1);
        }
    }



    p.x += p.dx;
    p.y += p.dy;
    p.dx *= 0.9;
    p.dy *= 0.9;
    wrap(p);



    render();
    for (var i = 0; kD.length > i; i++) {
        if (kD[i] == true) {
            console.log(i);
            kD[i] = 2;
        }
    }
    lc++;
    requestAnimationFrame(gameLoop);
}