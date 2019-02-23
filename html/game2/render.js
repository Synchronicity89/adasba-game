var ri = 0;

var shake = 0;



function render() {

    //render fading background
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000000FF";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = "normal";


    renderbg();



    
    for (var i = 0; p.poslog.length - 1 > i; i++) {
        ctx.strokeStyle = "hsla(0, 0%, 100%, 1)";
        ctx.lineWidth = i + 1;
        ctx.beginPath();
        ctx.moveTo(p.poslog[i].x, p.poslog[i].y);
        ctx.lineTo(p.poslog[i + 1].x, p.poslog[i + 1].y);
        ctx.stroke();
    }
    ctx.strokeStyle = hsla(Math.random() * 360, 100, Math.random() * 100, 1);
    for (var i = 10; p.poslog.length - 1 > i; i++) {

        ctx.lineWidth = i - 9;
        ctx.beginPath();
        ctx.moveTo(p.poslog[i].x, p.poslog[i].y);
        ctx.lineTo(p.poslog[i + 1].x, p.poslog[i + 1].y);
        ctx.stroke();
    }


    ctx.lineWidth = 5;
    //ctx.fillStyle = "Black";
    ctx.strokeStyle = "White";
    ctx.fillStyle = hsla(Math.random() * 360,100, Math.random() * 100, 1);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(Math.atan2(p.dy, p.dx));
    ctx.beginPath();
    ctx.moveTo(-22, -22);
    ctx.lineTo(22, 0);
    ctx.lineTo(-22, 22);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    for (var i = 0; o.length > i; i++) {
        if (o[i].type == "Particle") {
            o[i].draw(ctx);
        }
    }

    for (var i = 0; o.length > i; i++) {
        if (o[i].type == "PlayerBullet") {
            o[i].draw(ctx);
        }
        if (o[i].type == "EnemyBullet") {
            o[i].draw(ctx);
        }
        if (o[i].type == "BasicEnemy") {
            o[i].draw(ctx);
        }
    }
    for (var i = 0; o.length > i; i++) {
        if (o[i].type == "MsgBox") {
            o[i].draw(ctx);
        }
    }






    ctx.lineWidth = 5;

    if (ri < 100) {
        ctx.fillStyle = hsla(0, 0, 0, 1 - ri / 100);
        ctx.fillRect(0, 0, c.width, c.height);
    }
    ri++;
    shake *= 0.9;
}