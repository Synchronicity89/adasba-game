//The right, forward, and up directions in the local coordinate system respectively.
var ref = [
    new V3(1, 0, 0),
    new V3(0, 1, 0),
    new V3(0, 0, 1)
];

//All the points to be drawn on the screen.
var draw = [
    new V3(2.5, 2, 2),
    new V3(2.5, 2, 2.5),
    new V3(2.5, 2.5, 2),
    new V3(2.5, 2.5, 2.5),
    new V3(2, 2, 2),
    new V3(2, 2, 2.5),
    new V3(2, 2.5, 2),
    new V3(2, 2.5, 2.5)
];

//Rotate the reference points on three local axes.
function r_rotate(a) {
    for (var i = 0; ref.length > i; i++) {
        ref[i] = v_rotateaxis(ref[i], "xy", a.x);
        ref[i] = v_rotateaxis(ref[i], "xz", a.y);
        ref[i] = v_rotateaxis(ref[i], "yz", a.z);
    }
}

//Get all three transforms required based on reference points.
function r_getaxes() {
    var ref_copy = JSON.parse(JSON.stringify(ref));
    var axes = new V3(0, 0, 0);
    axes.x = Math.atan2(ref_copy[1].y, ref_copy[1].x);
    axes.y = Math.asin(ref_copy[1].z);
    ref_copy[0] = v_yawpitch(ref_copy[0], -axes.x, -axes.y);
    ref_copy[1] = v_yawpitch(ref_copy[1], -axes.x, -axes.y);
    ref_copy[2] = v_yawpitch(ref_copy[2], -axes.x, -axes.y);
    axes.z = Math.asin(ref_copy[0].z);
    // console.log(ref_copy);
    // console.log(axes);
    return axes;
}

//Transform points to be drawn.
function r_transformdraw(a, t) {
    var draw_copy = JSON.parse(JSON.stringify(draw));
    for (var i = 0; draw_copy.length > i; i++) {
        /*if (Math.random() > 0.99) {
            console.log("start");
            console.log(draw_copy[i]);
            draw_copy[i] = v_add(draw_copy[i], v_multiply(t, -1));
            console.log(a);
            console.log(draw_copy[i]);
            draw_copy[i] = v_yawpitch(draw_copy[i], -a.x, -a.y);
            console.log(draw_copy[i]);
            draw_copy[i] = v_add(draw_copy[i], t);
            console.log(draw_copy[i]);
        } else {*/
            draw_copy[i] = v_add(draw_copy[i], v_multiply(t, -1));
            draw_copy[i] = v_yawpitch(draw_copy[i], -a.x, -a.y);
            //draw_copy[i] = v_add(draw_copy[i], t);
        //}
    }
    return draw_copy;
}

//Get positions to draw stuff on the actual canvas.
function r_project(draw_data, viewx, viewy, a, m) {
    var projected = [];
    for (var i = 0; draw_data.length > i; i++) {
        projected.push({
            x: m * draw_data[i].x / draw_data[i].y + viewx / 2,
            y: m * draw_data[i].z / draw_data[i].y + viewy / 2
        });
    }
    for (var i = 0; projected.length > i; i++) {
        var temp = {
            x: v_rotate(projected[i].x - viewx / 2, projected[i].y - viewy / 2, a.z).x + viewx / 2,
            y: v_rotate(projected[i].x - viewx / 2, projected[i].y - viewy / 2, a.z).y + viewy / 2
        };
        projected[i] = temp;
    }
    return projected;
}