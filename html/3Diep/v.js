function V3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function v_add(a, b) {
    return new V3(a.x + b.x, a.y + b.y, a.z + b.z);
}

function v_multiply(a, b) {
    return new V3(a.x * b, a.y * b, a.z * b);
}

function v_dist(a) {
    return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
}

function v_dist2(a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function v_normalize(a) {
    return v_multiply(a, 1 / v_dist(a));
}

function v_rotate(x, y, r) {
    return {
        x: x * Math.cos(r) - y * Math.sin(r),
        y: y * Math.cos(r) + x * Math.sin(r)
    };
}

function v_yawpitch(a, yaw, pitch) {
    var temp = new V3(v_rotate(a.x, a.y, yaw).x, v_rotate(a.x, a.y, yaw).y, a.z);
    var tempMag = v_dist2(temp.x, temp.y);
    var tempZ = v_rotate(tempMag, temp.z, pitch).y;
    var tempDir = Math.atan2(temp.y, temp.x);
    tempMag = v_rotate(tempMag, temp.z, pitch).x;
    return new V3(tempMag * Math.cos(tempDir), tempMag * Math.sin(tempDir), tempZ);
    //return new V3(v_rotate(a.x, a.y, yaw).x * Math.sin(pitch), v_rotate(a.x, a.y, yaw).y * Math.sin(pitch), Math.cos(pitch));
}

function v_rotateaxis(a, axis, r) {
    switch (axis) {
        case "xy":
            return new V3(v_rotate(a.x, a.y, r).x, v_rotate(a.x, a.y, r).y, a.z);
        case "xz":
            return new V3(v_rotate(a.x, a.z, r).x, a.y, v_rotate(a.x, a.z, r).y);
        case "yz":
            return new V3(a.x, v_rotate(a.y, a.z, r).x, v_rotate(a.y, a.z, r).y);
    }
}