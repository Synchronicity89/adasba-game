var func = require('./func.js');

var bT = require('./block.js').blockTypes;

exports.Player = function(ws, x, y, userID, w, h, map, parent) {
    this.name = "Unnamed Player";
    this.ws = ws;
    this.map = map;
    this.parent = parent;
    this.tx = this.map.tx;
    this.ty = this.map.ty;
    this.ws.userID = userID;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = 0;
    this.dy = 0;
    this.fx = 0.9;
    this.fy = 0.9;
    this.accelx = 1;
    this.accely = 1;
    this.mhp = 1000;
    this.hp = 1000;
    this.inv = [];
    this.input = { m: { x: 0, y: 0, m: [false, false, false] }, k: [] };
    this.respondToInput = function() {
        var mOff = { x: this.input.m.x - 960 + this.x, y: this.input.m.y - 540 + this.y }
        if (this.input.k[87]) {
            this.dy -= this.accely;
        }
        if (this.input.k[83]) {
            this.dy += this.accely;
        }
        if (this.input.k[65]) {
            this.dx -= this.accelx;
        }
        if (this.input.k[68]) {
            this.dx += this.accelx;
        }
        if (func.pythagoras(mOff.x, mOff.y, this.x, this.y) < 300) {
            if (this.input.m.m[0]) {
                this.map.getBlockFromCoords(mOff.x, mOff.y).changeHP(-1);
            }
            if (this.input.m.m[2] && 
                !func.pIntersect(this.parent, Math.floor(mOff.x / this.tx) * this.tx, Math.floor(mOff.y / this.ty) * this.ty, this.tx, this.ty) && 
                this.hasInInv([{ item: "wall", quantity: 1 }]) &&
                this.map.getBlockFromCoords(mOff.x, mOff.y).blockType == "air") {
                this.map.getBlockFromCoords(mOff.x, mOff.y).switchTo(bT.wall);
                this.addToInv("wall", -1);
            }
        }
    }
    this.communicate = function(msgToSend) {
        if (this.ws.readyState = this.ws.OPEN) {
            this.ws.send(JSON.stringify(msgToSend));
        }
    }
    this.getData = function() {
        return { 
            x: this.x, 
            y: this.y, 
            dx: this.dx,
            dy: this.dy, 
            fx: this.fx, 
            fy: this.fy,
            accelx: this.accelx,
            accely: this.accely,
            mhp: this.mhp,
            hp: this.hp,
            inv: this.inv,
            input: this.input,
            name: this.name
        };
    }
    this.collide = function() {
        var thePlayer = this;
        this.map.doToRectFromCoords(this.x - this.w / 2, this.y - this.h / 2, this.x + this.w / 1, this.y + this.h / 1, function(tile, x, y) {
            if (tile.solid) {
                if (Math.abs(thePlayer.x - x) < thePlayer.w / 2 + thePlayer.tx / 2 && Math.abs(thePlayer.y - y) < thePlayer.h / 2 + thePlayer.ty / 2) {
                    if (Math.abs(thePlayer.x - x) > Math.abs(thePlayer.y - y)) {
                        thePlayer.dx *= -0.5;
                        thePlayer.x += thePlayer.dx;
                    } else {
                        thePlayer.dy *= -0.5;
                        thePlayer.y += thePlayer.dy;
                    }
                }
            }
        });
    }
    this.move = function() {
        this.dx *= this.fx;
        this.dy *= this.fy;
        for (var i = 0; 10 > i; i++) {
            this.x += this.dx / 10;
            this.y += this.dy / 10;
            this.collide();
        }
    }
    this.addToInv = function(item, quantity) {
        var isInInv = false;
        var invIndex = 0;
        for (var i = 0; this.inv.length > i; i++) {
            if (this.inv[i].item == item) {
                isInInv = true;
                invIndex = i;
            }
        }
        if (isInInv) {
            this.inv[invIndex].quantity += quantity;
        } else {
            this.inv.push({ item: item, quantity: quantity });
        }
    }
    this.hasInInv = function(itemList) {
        hasItems = 0;
        for (var i = 0; itemList.length > i; i++) {
            for (var i2 = 0; this.inv.length > i2; i2++) {
                if (!(itemList[i].item == this.inv[i2].item && itemList[i].quantity <= this.inv[i2].quantity)) {
                    return false;
                }
                if (itemList[i].item == this.inv[i2].item) {
                    hasItems++;
                }
            }
        }
        if (hasItems == itemList.length) {
            return true;
        }
        return false;
    }
}