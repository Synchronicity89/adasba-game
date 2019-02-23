var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var player = {
    pos: new V3(0, 0, 0),
    d: new V3(0, 0, 0)
};

//contains all keys
var k = [];
var kD = [];

//key down event listener
document.addEventListener("keydown", function(e) {
    k[e.keyCode] = true;
    if (k[e.keyCode] == false) {
        kD[e.keyCode] = true; 
    }
}, false);

//key up event listener
document.addEventListener("keyup", function(e) {
    k[e.keyCode] = false;
    kD[e.keyCode] = true;
}, false);

var m = { x: 960, y: 540 };

document.addEventListener('mousemove', function (e) {
    m.x = e.clientX;
    m.y = e.clientY;
}, false);

function loop() {
    if (k[87]) {
        player.d = v_add(player.d, v_multiply(ref[1], 0.01));
    }
    if (k[83]) {
        player.d = v_add(player.d, v_multiply(ref[1], -0.01));
    }
    if (k[68]) {
        player.d.x += 0.01;
    }
    if (k[65]) {
        player.d.x -= 0.01;
    }
    if (k[32]) {
        player.d.z -= 0.01;
    }
    if (k[16]) {
        player.d.z += 0.01;
    }

    player.pos = v_add(player.d, player.pos);

    player.d = v_multiply(player.d, 0.96);


    ctx.clearRect(0, 0, c.width, c.height);

    r_rotate(new V3(
        (m.x - c.width / 2) / 100000, 
        (m.y - c.height / 2) / 100000, 
        0
    ));

    var e_rotate = r_getaxes();
    console.log(e_rotate);
    var positions = r_project(r_transformdraw(e_rotate, player.pos), c.width, c.height, e_rotate, 500);

    positions.forEach(function (e) {
        ctx.fillRect(e.x, e.y, 3, 3);
    });

    requestAnimationFrame(loop);
}

loop();