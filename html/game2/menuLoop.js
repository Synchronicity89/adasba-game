//menu data
var menu = { i: 0, x: 0, y: 0, dx: 0, dy: 0 };



//menu background
var menubg = [];
for (var i = 0; 200 > i; i++) {
    var randomNumber = Math.round(Math.random() * 1000 + 100);
    menubg.push({
       x: Math.random() * 2000,
       y: Math.random() * 1000,
       dx: Math.random() * 3 - 1.5,
       dy: Math.random() * 3 - 1.5,
       parallax: 22 - (i / 10),
       l: randomNumber,
       ml: randomNumber
    });
}



//initialize the game menu
function menuInit() {
    menu.i = 0;
    menuLoop();
}



//tests if mouse is over an icon
function testMouseOverIcon(icon) {
    if (pyth(m.x - menu.x, m.y - menu.y, icon.loc.x, icon.loc.y) < icon.loc.r) {
        return true;
    }
    return false;
}






//game menu loop
function menuLoop() {
    //clear canvas
    ctx.fillStyle = "#00000044"
    ctx.fillRect(0, 0, 1920, 1080);



    //change line stroke and text settings
    ctx.lineWidth = 5;
    ctx.strokeStyle = "White";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.font = "24px Roboto Mono";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";


    //background
    ctx.lineWidth = 10;
    for (var i = 0; menubg.length > i; i++) {
        ctx.globalAlpha = 1;
        if (menubg[i].ml - 50 < menubg[i].l) {
            ctx.globalAlpha = (menubg[i].ml - menubg[i].l) / 50;
        }
        if (menubg[i].l < 50) {
            ctx.globalAlpha = menubg[i].l / 50;
        }
        ctx.strokeStyle = hsla(0, 0, (30 - (menubg[i].parallax * (30 / 22))), 1);
        ctx.save();
        ctx.translate(menu.x / menubg[i].parallax, menu.y / menubg[i].parallax);
        ctx.beginPath();
        ctx.arc(menubg[i].x, menubg[i].y, 50 / menubg[i].parallax, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

    }

    for (var i = 0; menubg.length > i; i++) {
        ctx.globalAlpha = 1;
        if (menubg[i].ml - 50 < menubg[i].l) {
            ctx.globalAlpha = (menubg[i].ml - menubg[i].l) / 50;
        }
        if (menubg[i].l < 50) {
            ctx.globalAlpha = menubg[i].l / 50;
        }
        ctx.save();
        ctx.translate(menu.x / menubg[i].parallax, menu.y / menubg[i].parallax);
        ctx.beginPath();
        ctx.arc(menubg[i].x, menubg[i].y, 50 / menubg[i].parallax, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();


        menubg[i].x += menubg[i].dx / menubg[i].parallax;
        menubg[i].y += menubg[i].dy / menubg[i].parallax;

        menubg[i].l--;
        if (menubg[i].l < 0) {
            var randomNumber = Math.round(Math.random() * 1000 + 100)
            menubg.splice(i, 1);
            menubg.push({
                x: Math.random() * 2000,
                y: Math.random() * 1000,
                dx: Math.random() * 3 - 1.5,
                dy: Math.random() * 3 - 1.5,
                parallax: Math.random() * 20 + 2,
                l: randomNumber,
                ml: randomNumber
             });
        }
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = "White";

    //move to match location
    ctx.save()
    ctx.translate(menu.x, menu.y);


    ctx.lineWidth = 5;
    


    //draw all menu icons
    for (var i = 0; mIcons.length > i; i++) {

        //set grow/shrink animation
        if (testMouseOverIcon(mIcons[i])) {
            mIcons[i].loc.anim = mIcons[i].loc.r + 15;
        } else {
            mIcons[i].loc.anim = mIcons[i].loc.r;
        }

        //change size of circle through the power of derivatives!
        if (mIcons[i].loc.anim - 0.5 > mIcons[i].loc.ar) {
            mIcons[i].loc.dr += 0.3;
        } else if (mIcons[i].loc.anim + 0.5 < mIcons[i].loc.ar) {
            mIcons[i].loc.dr -= 0.3;
        } else {
            mIcons[i].loc.dr *= 0.7;
        }

        //apply grow/shrink speed and then friction
        mIcons[i].loc.ar += mIcons[i].loc.dr;
        mIcons[i].loc.dr *= 0.96;

        //draw the map icon
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(mIcons[i].loc.x, mIcons[i].loc.y, mIcons[i].loc.ar, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        //fill level name text
        ctx.lineWidth = 3;
        ctx.strokeStyle = "White";
        ctx.strokeText(mIcons[i].name, mIcons[i].loc.x, mIcons[i].loc.y - mIcons[i].loc.ar - 10);



        //set text animation
        if (testMouseOverIcon(mIcons[i])) {
            mIcons[i].loc.anim = mIcons[i].loc.r + 15;
        } else {
            mIcons[i].loc.anim = mIcons[i].loc.r;
        }


    }

    //reset transforms
    ctx.restore();



    //if mouse is near the edge of the screen, move the screen
    if (m.x > 3 * c.width / 4) {
        menu.dx -= 6 * ((m.x - 3 * c.width / 4) / c.width);
    } 
    if (m.x < c.width / 4) {
        menu.dx += 6 * (c.width / 4 - m.x) / c.width;
    } 
    if (m.y > 3 * c.height / 4) {
        menu.dy -= 6 * ((m.y - 3 * c.height / 4) / c.height);
    } 
    if (m.y < c.height / 4) {
        menu.dy += 6 * (c.height / 4 - m.y) / c.height;
    } 

    //add menu velocity to menu pos
    menu.x += menu.dx;
    menu.y += menu.dy;

    //dampen menu velocity (like friction)
    menu.x *= 0.92;
    menu.y *= 0.92;

    //game menu fade in
    if (menu.i < 100) {
        menu.dx = 0;
        menu.dy = 0;
        ctx.fillStyle = "hsla(0, 0%, 0%, " + (1 - menu.i / 100) + ")";
        ctx.fillRect(0, 0, c.width, c.height);
    }
    menu.i++;

    for (var i = 0; mIcons.length > i; i++) {
        //test if clicking on menu icon
        if (testMouseOverIcon(mIcons[i]) && mD[0]) {
            startLvl(mIcons[i].lvl);
            return;
        }
    }
    requestAnimationFrame(menuLoop);
}

menuInit();