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
            this.inv = type.inv;
        }
    }
    this.switchToOverride = function(type) {
        this.blockType = type.blockType;
        this.mhp = type.mhp;
        this.hp = type.mhp;
        this.solid = type.solid;
        this.inv = type.inv;
    }
    this.switchToOre = function(type, quantity) {
        this.ore = type.oreType;
        this.oreQuantity = quantity;
        this.oreHP = type.mhp;
        this.oreMHP = type.mhp;
        this.oreSeed = func.cBV(Math.random());
    }
    this.getData = function() {
        return {
            x: this.x,
            y: this.y,
            blockType: this.blockType,
            mhp: this.mhp,
            hp: this.hp,
            solid: this.solid,
            ore: this.ore,
            oreQuantity: this.oreQuantity,
            oreHP: this.oreHP,
            oreMHP: this.oreMHP,
            oreSeed: this.oreSeed,
            dir: this.dir
        }
    }
    this.changeHP = function(hp) {
        this.hp += hp;
        this.oreHP += hp;
        if (this.hp <= 0) {
            this.switchTo(exports.blockTypes.air);
        }
        if (this.oreHP <= 0 && this.ore != "air") {
            this.entities.push(new Entity(this.x * this.map.tx + this.map.tx / 2, this.y * this.map.ty + this.map.ty / 2, "item", this.ore, eT.item));
            this.oreQuantity--;
            this.oreHP = this.oreMHP;
        }
        if (this.oreQuantity <= 0) {
            this.switchToOre(exports.oreTypes.air, 0);
        }
    }
    this.ore = "air";
    this.oreQuantity = 0;
    this.oreHP = 0;
    this.oreMHP = 0;
    this.oreSeed = func.cBV(Math.random());
    this.dir = 0;
    this.inv = undefined;
    this.changeInv = function(invChange) {
        if (this.inv != undefined) {
            for (var i = 0; invChange.length > i; i++) {
                for (var i2 = 0; this.inv.length > i2; i2++) {
                    if (invChange[i].name == this.inv[i2].name) {
                        if (invChange[i].item == this.inv[i2].item) {
                            this.inv[i2].quantity += invChange[i].quantity;
                            if (this.inv[i2].quantity <= 0) {
                                this.inv[i2].quantity = 0;
                                this.inv[i2].item = "none"
                            }
                        }
                    } else if (this.inv[i2].item == "none") {
                        this.inv[i2].quantity += invChange[i].quantity;
                        this.inv[i2].item = invChange[i].item;
                    }
                }
            }
        }
    }
}

exports.blockTypes = {
    air: {
        blockType: "air",
        mhp: 0,
        solid: false
    },
    stone: {
        blockType: "stone",
        mhp: 20,
        solid: true
    },
    belt: {
        blockType: "belt",
        mhp: 40,
        solid: false
    },
    unbreakable: {
        blockType: "unbreakable",
        mhp: Infinity,
        solid: true
    },
    iron: {
        blockType: "iron",
        mhp: 30,
        solid: true
    },
    furnace: {
        blockType: "furnace",
        mhp: 100,
        solid: true,
        inv: [
            {
                name: "smelt",
                item: "none",
                quantity: 0
            },
            {
                name: "fuel",
                item: "none",
                quantity: 0
            }
        ]
    }
};

exports.toBlock = function(str) {
    switch (str) {
        case "air":
            return exports.blockTypes.air;
            break;
        case "stone":
            return exports.blockTypes.stone;
            break;
        case "belt":
            return exports.blockTypes.belt;
            break;
        case "unbreakable":
            return exports.blockTypes.unbreakable;
            break;
        case "iron":
            return exports.blockTypes.iron;
            break;
        case "furnace":
            return exports.blockTypes.furnace;
            break;
    }
}

exports.oreTypes = {
    air: {
        oreType: "air",
        mhp: 0
    },
    stone: {
        oreType: "stone",
        mhp: 15
    },
    iron: {
        oreType: "iron",
        mhp: 25
    }
}