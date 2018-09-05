var Block = require('./block.js').Block;

var func = require('./func.js');

exports.Map = function(w, h, tx, ty, entities) {
    this.entities = entities;
    this.tx = tx;
    this.ty = ty;
    this.w = w;
    this.h = h;
    this.t = [];
    for (var i = 0; h > i; i++) {
        this.t.push([]);
        for (var i2 = 0; w > i2; i2++) {
            this.t[i].push(new Block(i2, i, this, this.entities));
        }
    }
    this.getBlock = function(x, y) {
        return this.t[func.clamp(y, 0, this.h - 1)][func.clamp(x, 0, this.w - 1)];
    }
    this.doToRect = function(x, y, w, h, tileFunction) {
        for (var i = func.clamp(x, 0, this.w - 1); func.clamp(w + x, 0, this.w - 1) > i; i++) {
            for (var i2 = func.clamp(y, 0, this.h - 1); func.clamp(h + y, 0, this.h - 1) > i2; i2++) {
                tileFunction(this.getBlock(i, i2), (i + 0.5) * this.tx, (i2 + 0.5) * this.ty);
            }
        }
    }
    this.getBlockFromCoords = function(x, y) {
        return this.getBlock(Math.floor(x / this.tx), Math.floor(y / this.ty));
    }
    this.doToRectFromCoords = function(x, y, w, h, tileFunction) {
        this.doToRect(Math.floor(x / this.tx), Math.floor(y / this.ty), Math.floor(w / this.tx), Math.floor(h / this.ty), tileFunction);
    }
}