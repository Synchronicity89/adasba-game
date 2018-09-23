var func = require('./func.js');

var bT = require('./block.js').blockTypes;

var toBlock = require('./block.js').toBlock;

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
    this.input = { m: { x: 0, y: 0, m: [false, false, false] }, k: [], kD: [], s: 0, cQ: [] , mI: [] };
    this.defaultDir = 0;
    this.respondToInput = function() {
        this.delay1--;
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
        this.input.s = func.clamp(this.input.s, 0, this.inv.length - 1);
        if (func.pythagoras(mOff.x, mOff.y, this.x, this.y) < 300) {
            if (this.input.m.m[0]) {
                this.map.getBlockFromCoords(mOff.x, mOff.y).changeHP(-1);
            }
            if (this.input.m.m[2] && 
                !func.pIntersect(this.parent, Math.floor(mOff.x / this.tx) * this.tx, Math.floor(mOff.y / this.ty) * this.ty, this.tx, this.ty) && 
                this.hasInInv([{ item: this.inv[this.input.s].item, quantity: 1 }]) &&
                this.map.getBlockFromCoords(mOff.x, mOff.y).blockType == "air") {
                this.map.getBlockFromCoords(mOff.x, mOff.y).switchTo(toBlock(this.inv[this.input.s].item));
                this.addToInv(this.inv[this.input.s].item, -1);
                if (this.map.getBlockFromCoords(mOff.x, mOff.y).blockType == "belt") {
                    this.map.getBlockFromCoords(mOff.x, mOff.y).dir = this.defaultDir;
                }
            }
            if (this.input.kD[82] == true && this.map.getBlockFromCoords(mOff.x, mOff.y).blockType == "belt") {
                this.defaultDir++;
                this.defaultDir %= 4;
                this.map.getBlockFromCoords(mOff.x, mOff.y).dir++;
                this.map.getBlockFromCoords(mOff.x, mOff.y).dir %= 4;
            }
        }
        for (var i = 0; this.input.kD.length > i; i++) {
            this.input.kD[i] = false;
        }
        for (var i = 0; this.input.cQ.length > i; i++) {
            if (this.hasInInv(exports.recipes[this.input.cQ[i]].req)) {
                this.addToInv(exports.recipes[this.input.cQ[i]].res.item, exports.recipes[this.input.cQ[i]].res.quantity);
                this.removeMoreFromInv(exports.recipes[this.input.cQ[i]].req)
            }
        }
        this.input.cQ = [];
        for (var i = 0; this.input.mI.length > i; i++) {
            if (this.input.mI[i].type == "block") {
                this.map.getBlock(this.input.mI[i].x, this.input.mI[i].y).changeInv(this.input.mI[i].change);
            }
        }
        this.input.mI = [];
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
            name: this.name,
            craftable: this.craftable
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
    this.addMoreToInv = function(itemList) {
        for (var i = 0; itemList.length > i; i++) {
            this.addToInv(itemList[i].item, itemList[i].quantity);
        }
    }
    this.removeMoreFromInv = function(itemList) {
        for (var i = 0; itemList.length > i; i++) {
            this.addToInv(itemList[i].item, -itemList[i].quantity);
        }
    }
    this.hasInInv = function(itemList) {
        var hasItems = 0;
        for (var i = 0; itemList.length > i; i++) {
            for (var i2 = 0; this.inv.length > i2; i2++) {
                if (itemList[i].item == this.inv[i2].item && itemList[i].quantity <= this.inv[i2].quantity) {
                    hasItems++
                }
            }
        }
        if (hasItems == itemList.length) {
            return true;
        }
        return false;
    }
    this.craftable = [];
    this.getCraftList = function() {
        this.craftable = [];
        for (var i = 0; exports.recipes.length > i; i++) {
            if (this.hasInInv(exports.recipes[i].req)) {
                this.craftable.push(exports.recipes[i]);
            }
        }
    }
}

exports.recipes = [
    {
        req: [
            { item: "stone", quantity: 3 }
        ],
        res: { item: "belt", quantity: 1 },
        name: "belt",
        index: 0
    },
    {
        req: [
            { item: "stone", quantity: 10 }
        ],
        res: { item: "furnace", quantity: 1 },
        name: "furnace",
        index: 1
    }
];