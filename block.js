var func = require('./func.js');

var Entity = require('./entity.js').Entity;

var eT = require('./entity.js').entityTypes;

exports.Block = function (x, y, map, entities) {
    this.entities = entities;
    this.map = map;
    this.x = x;
    this.y = y;
    this.blockType = "air";
    this.mhp = 0;
    this.hp = 0;
    this.solid = false;
    this.switchTo = function(type) {
        if ((this.blockType == "air" || type.blockType == "air") && this.blockType != type.blockType) {
            if (this.blockType != "air" && type.blockType == "air") {
                this.entities.push(new Entity(this.x * this.map.tx + this.map.tx / 2, this.y * this.map.ty + this.map.ty / 2, "item", this.blockType, eT.item));
            }
            this.blockType = type.blockType;
            this.mhp = type.mhp;
            this.hp = type.mhp;
            this.solid = type.solid;
        }
    }
    this.getData = function() {
        return {
            x: this.x,
            y: this.y,
            blockType: this.blockType,
            mhp: this.mhp,
            hp: this.hp,
            solid: this.solid
        }
    }
    this.ore = "air";
    this.oreQuantity = 0;
    this.oreHP = 0;
}

exports.blockTypes = {
    air: {
        blockType: "air",
        mhp: 0,
        solid: false
    },
    wall: {
        blockType: "wall",
        mhp: 30,
        solid: true
    }
};

exports.oreTypes = {
    air: {
        oreType: "air",
        mhp: 0
    },
    wall: {
        oreType: "wall",
        mhp: 15
    }
}