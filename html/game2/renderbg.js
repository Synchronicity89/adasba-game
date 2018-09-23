var bg = [];
for (var i = 0; 200 > i; i++) {
    var randomNumber = Math.round(Math.random() * 1000 + 100);
    bg.push({
       x: Math.random() * 1920,
       y: Math.random() * 1080,
       dx: Math.random() * 3 - 1.5,
       dy: Math.random() * 3 - 1.5,
       parallax: 22 - (i / 10),
       l: randomNumber,
       ml: randomNumber
    });
}

function renderbg() {
    ctxbg.save();
    ctxbg.translate(Math.random() * shake * 50, Math.random() * shake * 50);
    ctxbg.fillRect(0, 0, cbg.width, cbg.height);
    ctxbg.fillStyle = "Black";
    ctxbg.lineWidth = 10;
    for (var i = 0; bg.length > i; i++) {
        ctxbg.globalAlpha = 1;
        if (bg[i].ml - 50 < bg[i].l) {
            ctxbg.globalAlpha = (bg[i].ml - bg[i].l) / 50;
        }
        if (bg[i].l < 50) {
            ctxbg.globalAlpha = bg[i].l / 50;
        }
        ctxbg.strokeStyle = hsla(0, 0, (20 - (bg[i].parallax * (20 / 22))), 1);
        ctxbg.save();
        ctxbg.translate(25 * -ri / bg[i].parallax, 0);
        ctxbg.beginPath();
        ctxbg.arc(bg[i].x, bg[i].y, 50 / bg[i].parallax, 0, Math.PI * 2);
        ctxbg.stroke();
        ctxbg.restore();

    }





    for (var i = 0; bg.length > i; i++) {
        ctxbg.globalAlpha = 1;
        if (bg[i].ml - 50 < bg[i].l) {
            ctxbg.globalAlpha = (bg[i].ml - bg[i].l) / 50;
        }
        if (bg[i].l < 50) {
            ctxbg.globalAlpha = bg[i].l / 50;
        }
        ctxbg.save();
        ctxbg.translate(25 * -ri / bg[i].parallax, 0);
        ctxbg.beginPath();
        ctxbg.arc(bg[i].x, bg[i].y, 50 / bg[i].parallax, 0, Math.PI * 2);
        ctxbg.fill();
        ctxbg.restore();

        bg[i].dx += (Math.random() - 0.5) * shake * 20 / bg[i].parallax;
        bg[i].dy += (Math.random() - 0.5) * shake * 20 / bg[i].parallax;
        bg[i].x += (Math.random() - 0.5) * shake * 70 / bg[i].parallax;
        bg[i].y += (Math.random() - 0.5) * shake * 70 / bg[i].parallax;
        bg[i].x += bg[i].dx / bg[i].parallax;
        bg[i].y += bg[i].dy / bg[i].parallax;

        bg[i].l--;
        if (bg[i].l < 0) {
            var randomNumber = Math.round(Math.random() * 1000 + 100);
            var randomParallax = Math.random() * 20 + 2
            bg.splice(i, 1);
            bg.push({
                x: Math.random() * 1920 + 25 * ri / randomParallax + 250,
                y: Math.random() * 1080,
                dx: Math.random() * 3 - 1.5,
                dy: Math.random() * 3 - 1.5,
                parallax: randomParallax,
                l: randomNumber,
                ml: randomNumber
             });
        }
    }
    ctxbg.globalAlpha = 1;
    ctxbg.restore();
}