//define canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");



//time variable
var t = 0;



//resize window
window.addEventListener("resize", function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);



//match dimensions to begin with
c.width = window.innerWidth;
c.height = window.innerHeight;



var data1 = {};

var data2 = {};



//contains all math demos
var maths = [
    function () {
        ctx.font = "24px Courier";
        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, 1920, 1080);

        

        var h = [];

        var f = [];

        for (var i = 0; 20 > i; i++) {
            for (var i2 = 0; i > i2; i2++) {
                if (h.indexOf(1 / i * i2) == -1) {
                    h.push(1 / i * i2);
                    f.push(i);
                }
            }
        }



        var a = ((t / 12000) % 1) * 4320 * 16;

        ctx.save();
        ctx.translate(0, -a + 540);

        ctx.strokeStyle = "#BBBBBB";
        ctx.font = "192px Courier";
        ctx.textAlign = "center";
        for (var i = 0; h.length > i; i++) {
            ctx.lineWidth = 20;
            ctx.strokeText(f[i], 960, 4320 * 16 * h[i] + 7)
        }
        ctx.textAlign = "left";
        ctx.restore();


        ctx.font = "24px Courier";



        a = ((t / 12000) % 1) * Math.PI * 2;

        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#333333"
        for (var i = 0; 128 > i; i++) {
            ctx.beginPath();
            //ctx.arc(960 + Math.cos(i * a) * i * 4, 540 + Math.sin(i * a) * i * 4, 3, 0, Math.PI * 2);
            ctx.moveTo(960 + Math.cos(i * a) * i * 4, 540 + Math.sin(i * a) * i * 4, 3, 0, Math.PI * 2);
            ctx.lineTo(960 + Math.cos(i * (a + 0.0005)) * i * 4, 540 + Math.sin(i * (a + 0.0005)) * i * 4, 3, 0, Math.PI * 2);
            ctx.stroke();
        }

        a = ((t / 12000) % 1) * 4320;

        ctx.save();
        ctx.translate(0, -a + 540);

        ctx.beginPath();
        ctx.moveTo(0, a);
        ctx.lineTo(200, a);
        ctx.stroke();
        
        ctx.fillStyle = "#333333"

        for (var i = 0; h.length > i; i++) {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 4320 * h[i]);
            ctx.lineTo((24 - f[i]) * 12, 4320 * h[i]);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeText(f[i], (24 - f[i]) * 12, 4320 * h[i] + 7)
        }

        ctx.restore();

        ctx.lineWidth = 1;
        ctx.strokeText("Harmonic pattern in polar equation where rotation is proportional to magnitude.", 10, 1070);
    },
    function () {
        ctx.font = "24px Courier";
        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, 1920, 1080);

        a = t / 600 * Math.PI * 2;

        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#333333"
        for (var i = 0; 128 > i; i++) {
            ctx.beginPath();
            //ctx.arc(960 + Math.cos(i * a) * i * 4, 540 + Math.sin(i * a) * i * 4, 3, 0, Math.PI * 2);
            ctx.moveTo(960 + Math.cos(i / 64 * Math.PI) * 500, 540 + Math.sin(i / 64 * Math.PI) * 500);
            ctx.lineTo(960 + Math.cos(i * a / 64 * Math.PI) * 500, 540 + Math.sin(i * a / 64 * Math.PI) * 500);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(960, 540, 500, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeText("Applying scale factors to angles to create shapes in the cardioid family.", 10, 1070);
    },
    function () {
        function mandelbrotRect(x, y, w, h, iterations, resx, resy) {
            var mData = [];
            for (var i = 0; resy > i; i++) {
            mData.push([]);
                for (var i2 = 0; resx > i2; i2++) {
                    mData[i].push({
                        iterations: 0,
                        path: [{ x: 0, y: 0 }],
                        in: true,
                        pos: { x: x + i2 * (w / resx), y: y + i * (h / resy) }
                    });
                    for (var i3 = 0; iterations > i3 && Math.sqrt(Math.pow(mData[i][i2].path[mData[i][i2].path.length - 1].x, 2) + Math.pow(mData[i][i2].path[mData[i][i2].path.length - 1].y, 2)) < 2; i3++) {
                        mData[i][i2].path.push({ 
                            x: Math.pow(mData[i][i2].path[i3].x, 2) - Math.pow(mData[i][i2].path[i3].y, 2) + mData[i][i2].pos.x,
                            y: 2 * mData[i][i2].path[i3].x * mData[i][i2].path[i3].y + mData[i][i2].pos.y
                        });
                        if (Math.sqrt(Math.pow(mData[i][i2].path[i3 + 1].x, 2) + Math.pow(mData[i][i2].path[i3 + 1].y, 2)) > 2) {
                            mData[i][i2].in = false;
                        } else if (mData[i][i2].in) {
                            mData[i][i2].iterations++;
                        }
                    }
                }
            }
            return mData;
        }


        ctx.fillStyle = "#EEEEEE22";
        ctx.fillRect(0, 0, 1920, 1080);

        ctx.fillStyle = "#333333";

        var mb = mandelbrotRect(-2 + (t / 10000) % 1, -2 + (t / 10000) % 1, 4, 4, 128, 16, 16);
        for (var i = 0; mb.length > i; i++) {
            for (var i2 = 0; mb.length > i2; i2++) {
                mb[i][i2].path.forEach(function (e) {
                    ctx.fillRect(e.x * 500 + 960, e.y * 500 + 540, 1, 1);
                });
            }
        }

        ctx.font = "24px Courier";
        ctx.strokeStyle = "#333333"
        ctx.lineWidth = 1;
        ctx.strokeText("Visualizing paths on the mandelbrot set.", 10, 1070);
    },
    function () {
        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, 1920, 1080);

        a = t / 200 * Math.PI * 2;

        ctx.strokeStyle = "#BBBBBB";
        ctx.font = "144px Courier";
        ctx.lineWidth = 10;
        ctx.strokeText("sin()", 1300, 580);
        ctx.strokeText("cos()", 760, 250);

        
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#333333"
        ctx.beginPath();
        for (var i = 0; 512 > i; i++) {
            ctx.lineTo(1110 + i * 4, 540 + Math.sin(i / 16 + a) * 150);
        }
        ctx.stroke();

        ctx.beginPath();
        for (var i = 0; 256 > i; i++) {
            ctx.lineTo(960 + Math.cos(i / 16 + a) * 150, 390 - i * 4, );
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(960, 540, 150, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(960, 540);
        ctx.lineTo(960 + Math.cos(a) * 150, 540 + Math.sin(a) * 150);
        ctx.lineTo(1110, 540 + Math.sin(a) * 150);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(960 + Math.cos(a) * 150, 540 + Math.sin(a) * 150);
        ctx.lineTo(960 + Math.cos(a) * 150, 390);
        ctx.stroke();

        ctx.font = "24px Courier";
        ctx.lineWidth = 1;
        ctx.strokeText("What do sine and cosine even mean?", 10, 1070);
    },
    function () {
        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, 1920, 1080);

        var x = Math.cos(t / 200) * 500 + 540;
        var y = Math.sin(t / 200) * 500 + 540;

        ctx.fillStyle = "#333333";
        for (var i = 0; 30 > i; i++) {
            for (var i2 = 0; i > i2; i2++) {
                for (var i3 = 0; i > i3; i3++) {
                    var rectSize = 55 + Math.sin((i + i2 * 2 + i3 * 2 + t / 4) / 10) * 25;
                    ctx.fillRect(1080 / i * i2 + 420 + x / i, 1080 / i * i3 + y / i, rectSize / i, rectSize / i);
                }
            }
        }

        ctx.font = "24px Courier";
        ctx.lineWidth = 1;
        ctx.strokeText("It looks 3d... but it's just grids of squares", 10, 1070);
    },
    function () {
        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, 1920, 1080);

        var a = t / 100;

        var positions = [];

        var path = [];

        positions.push({
            x: 560,
            y: 540
        });

        for (var i = 0; 15 > i; i++) {
            positions.push({
                x: positions[i].x + Math.cos(a * (i * 2 + 2)) * (200 / (i * 2 + 2)),
                y: positions[i].y + Math.sin(a * (i * 2 + 2)) * (200 / (i * 2 + 2))
            });
        }

        for (var i = 0; 400 > i; i++) {
            path.push([]);
            path[i].push({
                x: 960,
                y: 540
            });
            for (var i2 = 0; 15 > i2; i2++) {
                path[i].push({
                    x: path[i][i2].x + Math.cos((a + i / 20) * (i2 * 2 + 2)) * (200 / (i2 * 2 + 2)),
                    y: path[i][i2].y + Math.sin((a + i / 20) * (i2 * 2 + 2)) * (200 / (i2 * 2 + 2))
                });
            }
        }

        ctx.lineJoin = "round";
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#BBBBBB";
        for (var i = 0; positions.length > i; i++) {
            ctx.beginPath();
            ctx.arc(positions[i].x, positions[i].y, (200 / (i * 2 + 1)), 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineTo(positions[14].x, positions[14].y);
        for (var i = 0; path.length > i; i++) {
            ctx.lineTo(1000 + 3 * i, path[i][14].y);
        }
        ctx.stroke();

        positions = [];

        path = [];

        positions.push({
            x: 560,
            y: 540
        });

        for (var i = 0; 15 > i; i++) {
            positions.push({
                x: positions[i].x + Math.cos(a * (i * 2 + 1)) * (200 / (i * 2 + 1)),
                y: positions[i].y + Math.sin(a * (i * 2 + 1)) * (200 / (i * 2 + 1))
            });
        }

        for (var i = 0; 400 > i; i++) {
            path.push([]);
            path[i].push({
                x: 960,
                y: 540
            });
            for (var i2 = 0; 15 > i2; i2++) {
                path[i].push({
                    x: path[i][i2].x + Math.cos((a + i / 20) * (i2 * 2 + 1)) * (200 / (i2 * 2 + 1)),
                    y: path[i][i2].y + Math.sin((a + i / 20) * (i2 * 2 + 1)) * (200 / (i2 * 2 + 1))
                });
            }
        }

        ctx.lineJoin = "round";
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#333333";
        for (var i = 0; positions.length > i; i++) {
            ctx.beginPath();
            ctx.arc(positions[i].x, positions[i].y, (200 / (i * 2 + 1)), 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineTo(positions[14].x, positions[14].y);
        for (var i = 0; path.length > i; i++) {
            ctx.lineTo(1000 + 3 * i, path[i][14].y);
        }
        ctx.stroke();

        ctx.font = "24px Courier";
        ctx.lineWidth = 1;
        ctx.strokeText("Visualization of fourier transform that creates a square wave and a sawtooth wave", 10, 1070);
    },
    function () {
        
        function grid(s, x, y) {
            ctx.beginPath();
            for (var i = 0; 1080 / s > i; i++) {
                ctx.lineTo(i * s * 2, -s);
                ctx.lineTo(i * s * 2, 1080 + s);
                ctx.lineTo(i * s * 2 + s, 1080 + s);
                ctx.lineTo(i * s * 2 + s, -s);
            }
            ctx.stroke();
            ctx.beginPath();
            for (var i = 0; 1920 / s > i; i++) {
                ctx.lineTo(-s, i * s * 2);
                ctx.lineTo(1920 + s, i * s * 2);
                ctx.lineTo(1920 + s, i * s * 2 + s);
                ctx.lineTo(-s, i * s * 2 + s);
            }
            ctx.stroke();
        }


        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, 1920, 1080);

        var a = t / 100;

        var a2 = Math.sin(a) * 6 + 20;

        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#333333";
        
        grid(20, 0, 0);
        grid(a2, 0, 0);

        ctx.font = "24px Courier";
        ctx.lineWidth = 1;
        ctx.fillRect(5, 1050, 1000, 30);
        ctx.strokeText("Interference patterns of squares.", 10, 1070);
    }
];



//keyboard input
var k = [];

//if key is pressed down
document.addEventListener("keydown", function (e) {
    k[e.keyCode] = true;
}, false);

//if key is lifted
document.addEventListener("keyup", function (e) {
    k[e.keyCode] = false;
}, false);



var velocity = 0;



var xposition = 0;



function clamp(value, min, max) {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}



//loop function
function loop() {

    if (k[37]) {
        velocity--;
    }

    if (k[39]) {
        velocity++;
    }

    xposition += velocity;

    if (clamp(xposition, 0, maths.length * 1920 - 1920) != xposition) {
        xposition = clamp(xposition, 0, maths.length * 1920 - 1920);
        velocity = 0;
    }

    velocity *= 0.99;

    ctx.save();
    ctx.scale(c.width / 1920, c.height / 1080);
    ctx.translate(-xposition + 1920 * clamp(Math.ceil((xposition - 1920) / 1920), 0, maths.length - 1), 0);


    maths[clamp(Math.ceil((xposition - 1920) / 1920), 0, maths.length - 1)]();

    ctx.translate(1920, 0);

    maths[clamp(Math.ceil((xposition) / 1920), 0, maths.length - 1)]();


    ctx.restore();


    //increment timer
    t++;

    //call loop function again (so it loops obviously)
    requestAnimationFrame(loop);
}

//start initial looping
loop();